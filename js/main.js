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

// V4 visual correction layer: contrast, adaptive header, image framing, and exact footer branding treatment.
const fixes=document.createElement('style');
fixes.textContent=`
  .cursor-glow{display:none!important}

  .section.dark{background:var(--forest);color:var(--white)}
  .section.dark .two-col-head>p{color:rgba(255,255,255,.58)}
  .section.dark .section-index{color:rgba(255,255,255,.55)}
  .section.dark .eyebrow{color:rgba(255,255,255,.58)}
  .section.dark h2,.section.dark h3,.section.dark strong{color:var(--white)}
  .section.dark h2 span,.section.dark h2 em{color:var(--green)}
  .section.dark .flow-card h3,.section.dark .journey-step strong{color:var(--white)}
  .section.dark .flow-card p,.section.dark .journey-step p{color:rgba(255,255,255,.58)}

  .section.light,.section.light h2,.section.light h3,.section.light strong{color:var(--ink)}
  .section.light p{color:var(--muted)}
  .section.light .mega-title span,.section.light h2 span{color:var(--green2)}
  .section.light .eyebrow.green{color:var(--green2)}
  .event-world .world-mosaic figcaption span,.event-world .world-mosaic figcaption small{color:var(--ink)}
  .event-world .world-mosaic figcaption small{color:var(--muted)}
  .identity-notes span{color:var(--ink)}
  .identity-notes p{color:var(--muted)}
  .production .two-col-head>p,.digital .two-col-head>p{color:var(--muted)}

  .site-header{mix-blend-mode:difference}
  .site-header .brand img{mix-blend-mode:normal}
  .site-header .header-center,.site-header .menu-btn{mix-blend-mode:normal}

  /* Paradigm is a real vector lockup and appears only in the final footer. */
  .paradigm-lockup{display:inline-flex;align-items:center;line-height:0;color:inherit;text-decoration:none}
  .paradigm-lockup .paradigm-logo{display:block;width:185px;height:auto}
  .final-footer .paradigm-lockup{filter:none}
  .hero-bottom>span{display:none!important}

  .storyboard>div{color:var(--white)}
  .storyboard b{color:var(--white)}
  .storyboard small{color:rgba(255,255,255,.55)}
  .reveal{will-change:transform,opacity}

  /* Show complete artwork and preserve each source ratio. */
  .hero-media{height:auto;aspect-ratio:4/5;display:flex;align-items:center;justify-content:center;background:#08170e;overflow:hidden}
  .hero-media img{width:100%;height:100%;object-fit:contain;object-position:center}
  .story-visual img{height:auto;aspect-ratio:auto;object-fit:contain;background:#dfe9df}
  .dna-gallery figure{background:#0d2619}
  .dna-gallery img{height:auto;aspect-ratio:16/9;object-fit:contain;object-position:center;background:#0d2619}
  .identity-art{overflow:hidden}
  .identity-art img{height:auto;max-height:500px;object-fit:contain;object-position:center}
  .key-visual{background:#0d2619}
  .key-visual img{height:auto;max-height:none;object-fit:contain;object-position:center}
  .world-mosaic figure{background:#dfe9df}
  .world-mosaic figure img,.world-mosaic .world-main img{height:auto;aspect-ratio:16/9;object-fit:contain;object-position:center;background:#dfe9df}
  .digital-card.image-card img{object-fit:contain;object-position:center;background:#0d2619}
  @media(max-width:650px){
    .hero-media{width:58vw;height:auto;aspect-ratio:4/5}
    .dna-gallery img,.world-mosaic figure img,.world-mosaic .world-main img{height:auto;aspect-ratio:16/9}
    .identity-art img{max-height:350px}
    .paradigm-lockup .paradigm-logo{width:145px}
  }
`;
document.head.appendChild(fixes);

function paradigmMarkup(){return `<span class="paradigm-lockup" aria-label="Paradigm Capital Group"><img class="paradigm-logo" src="assets/logo/paradigm-capital-group.svg" alt="Paradigm Capital Group"></span>`}

document.querySelectorAll('.final-footer>span:first-child').forEach(el=>el.outerHTML=paradigmMarkup());
