# Analytics backlog — deferred ideas to discuss

## Live (see `analytics.js` and `harga/index.html`)

**First pass, 14 Aug 2026:** pageviews on every page, `game_started`,
`game_completed` (score/rank/percentile), `share_result_click`, `whatsapp_click`
(every wa.me link, any page), `app_download_click` (App Store / Play Store links).

**Second pass, 14 Aug 2026** (was items 1–4 below, plus developer extras):

- **Viral loop / k-factor** — shared cards and share text now point to
  `shareeat.io/challenge`, a redirect that lands on `/harga` with
  `utm_source=share`. Visits from shares show up as their own channel in PostHog.
- **Deep quiz events** — `guess_made` per round (round, dish, state, stat,
  guess vs actual, how far off, hit/miss) and `play_again_click`.
- **Share outcome split** — `share_completed` / `share_cancelled` with a
  `method` property (image / text / download / clipboard), and
  `share_image_longpress` on the preview card (fires on desktop right-click and
  Android long-press; iOS long-press saves stay invisible to us).
- **WhatsApp intent** — every `whatsapp_click` now carries an `intent`:
  `price_submission`, `restaurant_enquiry`, `campaign_enquiry`, or `general`,
  read from the prefilled message. Price submissions to the Index are countable.
- **Behavior extras** — `scroll_depth` (25/50/75/100% on every page),
  `fold_opened` (which data sections get opened), `menu_opened`,
  `map_dish_selected` (which dish people explore), `price_check_used` (the
  "what did you last pay" slider value — user-contributed price data!), and
  `js_error` for us developers (first 3 uncaught errors per page).

Everything below is **not built yet**. Each item says what it measures, why an
investor would care, and roughly how much work it is.

## 5. Audience-side split — filter only, no code
The drawer has "Are you a restaurant?" vs "Are you a creator?" — the
`whatsapp_click` events now carry both `link_text` and `intent`, so a
dashboard breakdown proves you attract both sides of the marketplace.

## 6. Returning visitors & retention — config decision, no code
Currently events are anonymous (cheap, no consent worries). If we call
`posthog.identify()` for repeat players we get true retention curves and
cross-visit funnels, at the cost of 4x event pricing and heavier privacy footprint.
Discuss when traffic justifies it.

## 7. Session replay — one config flag
PostHog can record anonymized sessions of people playing the game. Not an investor
metric, but the fastest way to find where players drop off. Adds script weight.

## 8. Investor one-pager dashboard — SHIPPED 14 Aug 2026
Live at `shareeat.io/investors/` (noindex, unlinked): headline tiles, 30-day
visitors/plays trend, landing-to-share funnel, WhatsApp intents, score
distribution. Refreshed daily by `.github/workflows/investor-stats.yml`, which
needs the `POSTHOG_API_KEY` repo secret (a PostHog *personal* API key). Still
possible later: geo split (Klang Valley %) once there is enough traffic.

## 9. Meta Pixel on the Harga pages — copy-paste
Every page has the Pixel except `harga/index.html` and `harga/about.html`. If you
ever run Meta ads to the game, add it there too (and fire `fbq('track','Contact')`
on its WhatsApp links like restaurant.html does).

## 10. Cloudflare Web Analytics as a backup layer — dashboard toggle, no code
Free, cookieless pageview counts from the Cloudflare dashboard (Analytics → Web
Analytics → enable for shareeat.io). No custom events, but it's an independent
second source for "how many people visit" that ad-blockers rarely block — useful
for sanity-checking PostHog numbers in front of investors.

## 11. App Store attribution — small effort, Apple-side
Append a campaign token (`?ct=harga&pt=...&mt=8`) to the App Store links so
App Store Connect reports how many *installs* (not just clicks) came from the
website vs the game. Clicks are ours to count; installs need this.

## 12. Cross-platform funnel (web → app) — later, needs both sides
Since web events land in the same PostHog project as the Share Eat app, a shared
device/user identity (e.g. deep link with a code, or login on both) would let one
funnel show: played Harga game → downloaded app → signed up as creator. The
holy-grail investor chart; needs app-side work too.
