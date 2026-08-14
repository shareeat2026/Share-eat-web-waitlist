/* Share Eat! web analytics — one file, loaded by every page.
 *
 * SETUP (one line): paste your PostHog Project API key below.
 * Find it in PostHog → Settings → Project → "Project API Key" (starts with phc_).
 * If your project is on EU Cloud, also change HOST to https://eu.i.posthog.com.
 * Until a real key is pasted, this file does nothing at all.
 *
 * What it tracks on every page, with no per-page wiring:
 *   $pageview            – every visit, automatic (UTM params captured too)
 *   whatsapp_click       – any link to wa.me / api.whatsapp.com, with an
 *                          `intent` guessed from the prefilled message
 *   app_download_click   – any link to the App Store or Play Store
 *   scroll_depth         – 25 / 50 / 75 / 100% of the page, once each
 *   js_error             – first 3 uncaught errors, for us developers
 * The Harga game pages additionally call seTrack() for game events.
 */
(function () {
  var KEY = 'phc_B5RBnX9x9hcRa4ehsqPjbbUoxNRGJ8JPj4ysu5yYDziK';
  var HOST = 'https://us.i.posthog.com';

  window.seTrack = function () {};
  if (KEY.indexOf('PASTE') !== -1) return;

  /* Official PostHog snippet */
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags setPersonProperties opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

  posthog.init(KEY, {
    api_host: HOST,
    /* Anonymous events only: 4x cheaper on the shared 1M/month quota, and no
       cookie-consent-grade profiling. Same-device return visits still count. */
    person_profiles: 'identified_only',
    /* Explicit named events only — autocapture would flood the shared project
       with generic click events from both app and web. */
    autocapture: false,
    capture_pageview: true,
    capture_pageleave: true
  });

  window.seTrack = function (name, props) {
    try { posthog.capture(name, props || {}, { transport: 'sendBeacon' }); } catch (e) {}
  };

  /* One delegated listener covers every WhatsApp and store link on any page.
     Capture phase + sendBeacon so the event survives same-tab navigation. */
  document.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.href || '';
    var props = {
      page: location.pathname,
      link_text: (a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80)
    };
    if (href.indexOf('wa.me') !== -1 || href.indexOf('api.whatsapp.com') !== -1) {
      props.intent = waIntent(href);
      window.seTrack('whatsapp_click', props);
    } else if (href.indexOf('apps.apple.com') !== -1) {
      props.store = 'app_store';
      window.seTrack('app_download_click', props);
    } else if (href.indexOf('play.google.com') !== -1) {
      props.store = 'play_store';
      window.seTrack('app_download_click', props);
    }
  }, true);

  /* Which conversation a WhatsApp tap starts, read from the prefilled text.
     Keyword order matters: the price-submission text also mentions the Index. */
  function waIntent(href) {
    var text = '';
    try { text = decodeURIComponent((href.split('text=')[1] || '').split('&')[0]).toLowerCase(); } catch (e) {}
    if (text.indexOf('price') !== -1 && text.indexOf('index') !== -1) return 'price_submission';
    if (text.indexOf('campaign') !== -1) return 'campaign_enquiry';
    if (text.indexOf('f%26b') !== -1 || text.indexOf('f&b') !== -1 || text.indexOf('restaurant') !== -1 || text.indexOf('creators in') !== -1) return 'restaurant_enquiry';
    return 'general';
  }

  /* Scroll depth: 25/50/75/100, once per pageview. Short pages that need no
     scrolling send nothing, so the numbers stay honest. */
  var seenDepth = {};
  var scrollQueued = false;
  function checkDepth() {
    scrollQueued = false;
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    var pct = (window.pageYOffset || doc.scrollTop || 0) / max * 100;
    [25, 50, 75, 100].forEach(function (mark) {
      if (pct >= mark && !seenDepth[mark]) {
        seenDepth[mark] = true;
        window.seTrack('scroll_depth', { depth: mark, page: location.pathname });
      }
    });
  }
  window.addEventListener('scroll', function () {
    if (!scrollQueued) { scrollQueued = true; setTimeout(checkDepth, 400); }
  }, { passive: true });

  /* Uncaught errors, capped so a render loop can't flood the quota. */
  var errCount = 0;
  window.addEventListener('error', function (e) {
    if (errCount >= 3) return;
    errCount++;
    window.seTrack('js_error', {
      message: String(e.message || '').slice(0, 200),
      source: String(e.filename || '').slice(0, 120),
      line: e.lineno || 0,
      page: location.pathname
    });
  });
})();
