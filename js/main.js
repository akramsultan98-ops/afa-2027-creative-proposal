const cursor=document.querySelector('.cursor-glow');
// Cursor glow intentionally removed: the proposal uses a clean, editorial pointer.
cursor?.remove();

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const drawer=document.querySelector('.nav-drawer');
const menu=document.querySelector('.menu-btn');
const close=document.querySelector('.drawer-close');
const nav=document.getElementById('drawer-nav');
const sections=[...document.querySelectorAll('main section[data-nav]')];
sections.forEach((s,i)=>{const a=document.createElement('a');if(!s.id)s.id='section-'+i;a.href='#'+s.id;a.textContent=String(i+1).padStart(2,'0')+'  '+s.dataset.nav;nav?.appendChild(a)});
menu?.addEventListener('click',()=>{drawer.classList.add('open');drawer.setAttribute('aria-hidden','false')});
close?.addEventListener('click',()=>{drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true')});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>drawer.classList.remove('open')));
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){nav?.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-40% 0px -50% 0px'});sections.forEach(s=>io.observe(s));
window.addEventListener('scroll',()=>{document.documentElement.style.setProperty('--scroll',window.scrollY)});

const progress=document.querySelector('.scroll-progress span');
const pageNow=document.querySelector('.page-count b');
function updateChrome(){const max=document.documentElement.scrollHeight-innerHeight;const pct=max>0?(scrollY/max)*100:0;if(progress)progress.style.width=pct+'%';let current=1;sections.forEach((s,i)=>{const r=s.getBoundingClientRect();if(r.top<=innerHeight*.45)current=i+1});if(pageNow)pageNow.textContent=String(current).padStart(2,'0')}
window.addEventListener('scroll',updateChrome,{passive:true});window.addEventListener('resize',updateChrome);updateChrome();

// V4 visual correction layer: contrast, adaptive header, and restrained branding.
const fixes=document.createElement('style');
fixes.textContent=`
  /* Remove the old green mouse halo completely */
  .cursor-glow{display:none!important}

  /* Dark sections were using .dark without a background rule, causing white-on-light failures. */
  .section.dark{background:var(--forest);color:var(--white)}
  .section.dark .two-col-head>p{color:rgba(255,255,255,.58)}
  .section.dark .section-index{color:rgba(255,255,255,.55)}
  .section.dark .eyebrow{color:rgba(255,255,255,.58)}
  .section.dark h2,.section.dark h3,.section.dark strong{color:var(--white)}
  .section.dark h2 span,.section.dark h2 em{color:var(--green)}
  .section.dark .flow-card h3,.section.dark .journey-step strong{color:var(--white)}
  .section.dark .flow-card p,.section.dark .journey-step p{color:rgba(255,255,255,.58)}

  /* Keep all light surfaces genuinely dark in typography. */
  .section.light,.section.light h2,.section.light h3,.section.light strong{color:var(--ink)}
  .section.light p{color:var(--muted)}
  .section.light .mega-title span,.section.light h2 span{color:var(--green2)}
  .section.light .eyebrow.green{color:var(--green2)}
  .event-world .world-mosaic figcaption span,.event-world .world-mosaic figcaption small{color:var(--ink)}
  .event-world .world-mosaic figcaption small{color:var(--muted)}
  .identity-notes span{color:var(--ink)}
  .identity-notes p{color:var(--muted)}
  .production .two-col-head>p,.digital .two-col-head>p{color:var(--muted)}

  /* Header adapts automatically over both dark and light sections. */
  .site-header{mix-blend-mode:difference}
  .site-header .brand img{mix-blend-mode:normal}
  .site-header .header-center,.site-header .menu-btn{mix-blend-mode:normal}

  /* Paradigm lockup: green, compact, closer to the proposal cover treatment. */
  .paradigm-lockup{display:inline-flex;align-items:center;gap:12px;color:var(--green);text-decoration:none}
  .paradigm-lockup .p-mark{width:28px;height:28px;display:grid;place-items:center}
  .paradigm-lockup .p-mark svg{width:28px;height:28px;display:block}
  .paradigm-lockup .p-word{display:flex;flex-direction:column;line-height:.92;text-align:left}
  .paradigm-lockup .p-word b{font:700 15px var(--display);letter-spacing:.18em;color:currentColor}
  .paradigm-lockup .p-word small{font:600 6px var(--sans);letter-spacing:.24em;color:currentColor;margin-top:4px}
  .hero-bottom .paradigm-lockup{color:var(--green)}
  .final-footer .paradigm-lockup{color:var(--green)}

  /* Better legibility for storyboard and other dark editorial panels. */
  .storyboard>div{color:var(--white)}
  .storyboard b{color:var(--white)}
  .storyboard small{color:rgba(255,255,255,.55)}

  /* Prevent faded reveal states from reading like broken contrast during load. */
  .reveal{will-change:transform,opacity}
`;
document.head.appendChild(fixes);

function paradigmMarkup(){return `<span class="paradigm-lockup" aria-label="Paradigm Capital Group"><span class="p-mark"><svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M2 6h6v20H2zM10 6h5l6 7v13h-6V15l-5-5zm12 0h8v20h-6V13l-2-2zM10 6l6 7 6-7h6l-8 9-4-4-4 4-8-9z"/></svg></span><span class="p-word"><b>PARADIGM</b><small>CAPITAL GROUP</small></span></span>`}

document.querySelectorAll('.hero-bottom>span').forEach(el=>el.outerHTML=paradigmMarkup());
document.querySelectorAll('.final-footer>span:first-child').forEach(el=>el.outerHTML=paradigmMarkup());
