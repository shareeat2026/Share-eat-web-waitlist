/* Pulls aggregate web metrics from PostHog and writes investors/stats.json.
 * Runs in GitHub Actions (see .github/workflows/investor-stats.yml).
 * Needs POSTHOG_API_KEY — a *personal* API key (secret), not the public phc_ key.
 * Only aggregates ever leave PostHog; no per-user data lands in the repo.
 */
import { writeFileSync } from 'node:fs';

const HOST = 'https://us.posthog.com';
const PROJECT_TOKEN = 'phc_B5RBnX9x9hcRa4ehsqPjbbUoxNRGJ8JPj4ysu5yYDziK';
const KEY = process.env.POSTHOG_API_KEY;
if (!KEY) { console.error('POSTHOG_API_KEY is not set'); process.exit(1); }

const auth = { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' };

async function getProjectId() {
  const r = await fetch(`${HOST}/api/projects/`, { headers: auth });
  if (!r.ok) throw new Error(`projects list: ${r.status} ${await r.text()}`);
  const list = (await r.json()).results || [];
  const hit = list.find(p => p.api_token === PROJECT_TOKEN) || list[0];
  if (!hit) throw new Error('no PostHog project visible to this key');
  return hit.id;
}

async function hogql(projectId, query) {
  const r = await fetch(`${HOST}/api/projects/${projectId}/query`, {
    method: 'POST', headers: auth,
    body: JSON.stringify({ query: { kind: 'HogQLQuery', query } }),
  });
  if (!r.ok) throw new Error(`query failed: ${r.status} ${await r.text()}\n${query}`);
  return (await r.json()).results || [];
}

/* Smoke tests out; pageviews restricted to the real site so local test
   harnesses never count. */
const CLEAN = `properties.smoke_test is null and distinct_id != 'smoke-test-claude'`;
const WEB_PV = `event = '$pageview' and properties.$host = 'shareeat.io'`;

const projectId = await getProjectId();

const totalsRows = await hogql(projectId, `
  select
    countIf(${WEB_PV})                                        as pageviews,
    uniqIf(distinct_id, ${WEB_PV})                            as visitors,
    countIf(event = 'game_started')                           as game_started,
    countIf(event = 'game_completed')                         as game_completed,
    countIf(event = 'share_result_click')                     as share_clicks,
    countIf(event = 'share_completed')                        as shares_completed,
    countIf(${WEB_PV} and properties.utm_source = 'share')    as share_visits,
    countIf(event = 'whatsapp_click')                         as whatsapp_clicks,
    countIf(event = 'app_download_click')                     as app_downloads,
    countIf(event = 'price_check_used')                       as price_checks
  from events where ${CLEAN}`);

const daily = await hogql(projectId, `
  select toDate(timestamp) as d,
    uniqIf(distinct_id, ${WEB_PV})     as visitors,
    countIf(${WEB_PV})                 as pageviews,
    countIf(event = 'game_started')    as plays
  from events
  where timestamp >= now() - interval 30 day and ${CLEAN}
  group by d order by d`);

const intents = await hogql(projectId, `
  select coalesce(toString(properties.intent), 'general') as intent, count() as n
  from events where event = 'whatsapp_click' and ${CLEAN}
  group by intent order by n desc`);

const scores = await hogql(projectId, `
  select toInt(coalesce(toString(properties.score), '0')) as score, count() as n
  from events where event = 'game_completed' and ${CLEAN}
  group by score order by score`);

const t = totalsRows[0] || [];
const stats = {
  generated: new Date().toISOString(),
  totals: {
    pageviews: t[0] || 0, visitors: t[1] || 0,
    game_started: t[2] || 0, game_completed: t[3] || 0,
    share_clicks: t[4] || 0, shares_completed: t[5] || 0,
    share_visits: t[6] || 0, whatsapp_clicks: t[7] || 0,
    app_downloads: t[8] || 0, price_checks: t[9] || 0,
  },
  daily: daily.map(r => ({ d: String(r[0]).slice(0, 10), visitors: r[1], pageviews: r[2], plays: r[3] })),
  intents: intents.map(r => ({ intent: r[0], n: r[1] })),
  scores: scores.map(r => ({ score: r[0], n: r[1] })),
};

writeFileSync('investors/stats.json', JSON.stringify(stats, null, 2) + '\n');
console.log('wrote investors/stats.json:', JSON.stringify(stats.totals));
