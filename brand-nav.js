/* Share Eat! shared nav behaviour.
   Builds the phone drawer from whatever the nav already contains, so a page
   only has to get its links right once. Matches The Harga Index pattern:
   hamburger on the right, dark panel slides in, scrim closes it. */
(function(){
  function build(){
    var nav = document.querySelector('nav');
    var right = nav && nav.querySelector('.nav-right');
    if(!nav || !right || document.querySelector('.nv-drawer')) return;

    var burger = document.createElement('button');
    burger.className = 'nv-burger';
    burger.setAttribute('aria-label','Open menu');
    burger.setAttribute('aria-expanded','false');
    burger.innerHTML = '<span></span>';
    nav.appendChild(burger);

    var drawer = document.createElement('div');
    drawer.className = 'nv-drawer';
    drawer.setAttribute('role','dialog');
    drawer.setAttribute('aria-modal','true');

    var logo = nav.querySelector('.logo img');
    var head = '<div class="nv-head">' +
      (logo ? '<img src="'+logo.getAttribute('src')+'" alt="Share Eat!">' : '<span></span>') +
      '<button class="nv-close" aria-label="Close menu">&times;</button></div>';

    var links = '';
    Array.prototype.forEach.call(right.children, function(el){
      var href = el.getAttribute('href');
      if(!href) return;
      var isBtn = el.classList.contains('nv-btn');
      links += '<a class="' + (isBtn ? 'nv-p-btn' : '') + '" href="' + href + '"' +
        (el.getAttribute('target') ? ' target="'+el.getAttribute('target')+'" rel="noopener"' : '') +
        '>' + el.textContent.trim() + (isBtn ? '' : '<span aria-hidden="true">&rsaquo;</span>') + '</a>';
    });

    var tag = document.querySelector('.se-band-t');
    var tail = '<div class="nv-p-tag">' + (tag ? tag.textContent : "Discovery shouldn't be expensive.") + '</div>';

    drawer.innerHTML = '<div class="nv-scrim"></div><div class="nv-panel">' + head + links + tail + '</div>';
    document.body.appendChild(drawer);
    document.documentElement.classList.add('nv-ready');

    function open(){
      drawer.classList.add('on');
      document.body.classList.add('nv-open');
      burger.setAttribute('aria-expanded','true');
    }
    function close(){
      drawer.classList.remove('on');
      document.body.classList.remove('nv-open');
      burger.setAttribute('aria-expanded','false');
    }
    burger.addEventListener('click', open);
    drawer.querySelector('.nv-scrim').addEventListener('click', close);
    drawer.querySelector('.nv-close').addEventListener('click', close);
    /* an in-page jump should close the panel, an external one can just leave */
    Array.prototype.forEach.call(drawer.querySelectorAll('a'), function(a){
      a.addEventListener('click', function(){ setTimeout(close, 60); });
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && drawer.classList.contains('on')) close();
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
