# Analytics backlog — deferred ideas to discuss

What is already live (see `analytics.js`): pageviews on every page, `game_started`,
`game_completed` (with score/rank/percentile), `share_result_click`, `whatsapp_click`
(every wa.me link, any page), `app_download_click` (App Store / Play Store links).

Everything below is **not built yet**. Each item says what it measures, why an
investor would care, and roughly how much work it is.

## 1. Viral-loop / k-factor tracking  — small effort, biggest investor payoff
Add `?utm_source=share` to the `shareeat.io/harga` link inside the shared card
image and share text. PostHog then shows how many visits arrive from shares, so
you can state "every 100 players bring in N new visitors" — the one number that
proves a viral loop. Costs one line in the share text and one line on the card.

## 2. Deep quiz engagement events — small effort
- `guess_made` per round (dish, state, how far off, hit/miss)
- `play_again_click` (the "Play again →" button)
- completion rate falls out automatically: `game_completed / game_started`
Shows engagement depth ("players average 4.7 rounds, 62% replay"), not just counts.

## 3. Share outcome split — small effort
Today we count the button press. Also worth counting: share sheet **completed** vs
cancelled (the `done('Shared')` path), image long-press saves (contextmenu on the
preview image), and clipboard fallback. Turns "share clicks" into "shares that
actually happened".

## 4. Price submissions to the Index — small effort
Count clicks on "Submit to the Index on WhatsApp" separately from other WhatsApp
clicks (it already carries distinct link text, so a PostHog filter may be enough).
User-submitted price data is your moat — investors love a self-feeding dataset.

## 5. Audience-side split — filter only, no code
The drawer has "Are you a restaurant?" vs "Are you a creator?" — the
`whatsapp_click` / `app_download_click` events already carry `link_text`, so a
dashboard breakdown proves you attract both sides of the marketplace.

## 6. Returning visitors & retention — config decision, no code
Currently events are anonymous (cheap, no consent worries). If we call
`posthog.identify()` for repeat players we get true retention curves and
cross-visit funnels, at the cost of 4x event pricing and heavier privacy footprint.
Discuss when traffic justifies it.

## 7. Session replay — one config flag
PostHog can record anonymized sessions of people playing the game. Not an investor
metric, but the fastest way to find where players drop off. Adds script weight.

## 8. Investor one-pager dashboard — medium effort
A private page (or PostHog shared-dashboard link) with the headline numbers
pre-formatted for the pitch deck: visits, plays, completion %, shares, k-factor,
WhatsApp conversations started, app downloads clicked, geo split (Klang Valley %).

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
