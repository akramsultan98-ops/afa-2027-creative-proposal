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
  .hero-bottom>span{display:none!important}
  .storyboard>div{color:var(--white)}
  .storyboard b{color:var(--white)}
  .storyboard small{color:rgba(255,255,255,.55)}
  .reveal{will-change:transform,opacity}
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
  .visual-library{background:var(--cream);color:var(--ink);padding:clamp(80px,10vw,150px) 7vw}
  .visual-library .library-head{display:grid;grid-template-columns:1fr 1fr;gap:5vw;align-items:end;margin-bottom:60px}
  .visual-library .library-head h2{font-size:clamp(52px,7vw,112px);line-height:.9;letter-spacing:-.05em;margin:12px 0 0;color:var(--ink)}
  .visual-library .library-head h2 em{font-style:normal;color:var(--green2)}
  .visual-library .library-head p{max-width:520px;color:var(--muted);font-size:18px;line-height:1.55;margin:0 0 8px}
  .library-group{margin-top:70px}
  .library-group h3{font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:var(--green2);margin:0 0 22px}
  .library-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}
  .library-card{margin:0;background:#f7f9f5;border:1px solid rgba(11,33,22,.1);overflow:hidden}
  .library-card .art-frame{background:#e3e9e2;display:flex;align-items:center;justify-content:center;min-height:220px;padding:18px}
  .library-card.dark-art .art-frame{background:#0b2116}
  .library-card img{display:block;width:100%;height:auto;max-height:760px;object-fit:contain;object-position:center}
  .library-card figcaption{display:flex;justify-content:space-between;gap:20px;padding:14px 16px 16px;border-top:1px solid rgba(11,33,22,.08);font-size:11px;letter-spacing:.12em;text-transform:uppercase}
  .library-card figcaption span:first-child{color:var(--green2)}
  .library-card figcaption span:last-child{color:var(--ink);text-align:right}
  @media(min-width:1000px){.library-grid .library-card:first-child{grid-column:span 2}.library-grid .library-card:first-child .art-frame{padding:30px 12vw}}
  @media(max-width:700px){
    .hero-media{width:58vw;height:auto;aspect-ratio:4/5}
    .dna-gallery img,.world-mosaic figure img,.world-mosaic .world-main img{height:auto;aspect-ratio:16/9}
    .identity-art img{max-height:350px}
    .visual-library{padding:70px 5vw}
    .visual-library .library-head{grid-template-columns:1fr;gap:25px}
    .library-grid{grid-template-columns:1fr}
    .library-grid .library-card:first-child{grid-column:auto}
  }
`;
document.head.appendChild(fixes);

// Complete proposal visual library: every supplied artwork is presented at its native ratio.
// This mirrors the visual pages in the source proposal so no approved design is lost in the HTML experience.
(function buildVisualLibrary(){
  const main=document.querySelector('main');
  if(!main || document.querySelector('.visual-library')) return;
  const footer=document.querySelector('.final-footer');
  const section=document.createElement('section');
  section.id='visual-library';
  section.className='visual-library';
  section.dataset.nav='Visual Applications';
  const groups=[
    {title:'Event Visual Applications',pages:Array.from({length:9},(_,i)=>i+5)},
    {title:'Environmental & 3D Applications',pages:Array.from({length:15},(_,i)=>i+14)},
    {title:'Closing Artwork',pages:[29]}
  ];
  const titles={
    5:'Core visual application',6:'Event application',7:'Agricultural macro / visual mood',8:'Identity application',9:'Outdoor / digital application',10:'Event collateral',11:'Communication application',12:'Event collateral',13:'Event application',
    14:'Main stage',15:'Stage view',16:'Stage detail',17:'Stage / conference environment',18:'Arrival / Gate 01',19:'Arrival / Gate 02',20:'Registration area',21:'Registration detail',22:'Sponsor feature wall',23:'Side screen',24:'Exhibitor wall',25:'Meeting room',26:'Exhibition booth — view 01',27:'Exhibition booth — view 02',28:'Directional sign',29:'Closing / thank you'
  };
  const makeCard=(p)=>{
    const figure=document.createElement('figure');
    figure.className='library-card reveal'+([14,15,16,17,18,19,22,23,24,25,26,27,28].includes(p)?' dark-art':'');
    figure.innerHTML=`<div class="art-frame"><img src="assets/visuals/page-${String(p).padStart(2,'0')}.jpg" alt="AFA 2027 — ${titles[p]||'proposal visual'}" loading="lazy"></div><figcaption><span>PAGE ${String(p).padStart(2,'0')}</span><span>${titles[p]||'AFA 2027 visual application'}</span></figcaption>`;
    return figure;
  };
  section.innerHTML=`<div class="library-head"><div><div class="eyebrow green">COMPLETE VISUAL SYSTEM</div><h2>Every approved visual.<br><em>Fully represented.</em></h2></div><p>The proposal artwork is carried into the digital experience as complete compositions. Nothing is cropped, substituted or reduced to a decorative thumbnail.</p></div>`;
  groups.forEach(group=>{
    const wrap=document.createElement('div');wrap.className='library-group';
    wrap.innerHTML=`<h3>${group.title}</h3>`;
    const grid=document.createElement('div');grid.className='library-grid';
    group.pages.forEach(p=>grid.appendChild(makeCard(p)));
    wrap.appendChild(grid);section.appendChild(wrap);
  });
  if(footer) footer.parentNode.insertBefore(section,footer); else main.appendChild(section);
  section.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  updateChrome();
})();
