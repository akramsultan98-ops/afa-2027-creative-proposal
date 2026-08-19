const cursor=document.querySelector('.cursor-glow');
cursor?.remove();

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const drawer=document.querySelector('.nav-drawer');
const menu=document.querySelector('.menu-btn');
const close=document.querySelector('.drawer-close');
const nav=document.getElementById('drawer-nav');
const sections=[...document.querySelectorAll('main section[data-nav]')];
sections.forEach((s,i)=>{if(!s.id)s.id='section-'+i;const a=document.createElement('a');a.href='#'+s.id;a.textContent=String(i+1).padStart(2,'0')+'  '+s.dataset.nav;nav?.appendChild(a)});
menu?.addEventListener('click',()=>{drawer?.classList.add('open');drawer?.setAttribute('aria-hidden','false')});
close?.addEventListener('click',()=>{drawer?.classList.remove('open');drawer?.setAttribute('aria-hidden','true')});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>drawer?.classList.remove('open')));
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)nav?.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-40% 0px -50% 0px'});
sections.forEach(s=>io.observe(s));

const progress=document.querySelector('.scroll-progress span');
const pageNow=document.querySelector('.page-count b');
function updateChrome(){const max=document.documentElement.scrollHeight-innerHeight;const pct=max>0?(scrollY/max)*100:0;if(progress)progress.style.width=pct+'%';let current=1;sections.forEach((s,i)=>{const r=s.getBoundingClientRect();if(r.top<=innerHeight*.45)current=i+1});if(pageNow)pageNow.textContent=String(current).padStart(2,'0')}
window.addEventListener('scroll',updateChrome,{passive:true});
window.addEventListener('resize',updateChrome);

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
.site-header{mix-blend-mode:difference}
.site-header .brand img{mix-blend-mode:normal}
.site-header .header-center,.site-header .menu-btn{mix-blend-mode:normal}
.hero-bottom>span{display:none!important}
.storyboard>div,.storyboard b{color:var(--white)}
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

.visual-library{background:var(--cream);color:var(--ink);padding:clamp(90px,9vw,150px) 5vw 130px}
.visual-library .library-head{display:grid;grid-template-columns:1.15fr .85fr;gap:6vw;align-items:end;margin-bottom:72px;max-width:1600px;margin-left:auto;margin-right:auto}
.visual-library .library-head h2{font-size:clamp(54px,6.5vw,112px);line-height:.9;letter-spacing:-.05em;margin:12px 0 0;color:var(--ink)}
.visual-library .library-head h2 em{font-style:normal;color:var(--green2)}
.visual-library .library-head p{max-width:620px;color:var(--muted);font-size:18px;line-height:1.55;margin:0 0 8px}
.library-group{margin:82px auto 0;max-width:1600px}
.library-group h3{font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:var(--green2);margin:0 0 24px}
.library-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px}
.library-card{margin:0;background:#f7f9f5;border:1px solid rgba(11,33,22,.12);overflow:hidden;opacity:1!important;transform:none!important}
.library-card .art-frame{background:#e3e9e2;display:flex;align-items:center;justify-content:center;padding:0;min-height:0}
.library-card.dark-art .art-frame{background:#0b2116}
.library-card img{display:block;width:100%;height:auto;max-height:none;object-fit:contain;object-position:center}
.library-card figcaption{display:flex;justify-content:space-between;gap:20px;padding:15px 18px 17px;border-top:1px solid rgba(11,33,22,.08);font-size:11px;letter-spacing:.12em;text-transform:uppercase;background:var(--cream)}
.library-card figcaption span:first-child{color:var(--green2)}
.library-card figcaption span:last-child{color:var(--ink);text-align:right}
.library-group:first-of-type .library-grid .library-card:first-child{grid-column:span 2}
.library-group:nth-of-type(2) .library-grid .library-card:first-child{grid-column:span 2}
.visual-library .eyebrow{color:var(--green2)}

.library-mode .site-header .brand{opacity:0;visibility:hidden;pointer-events:none}
.library-mode .site-header .header-center{opacity:.75}

@media(max-width:900px){
.visual-library{padding:72px 4vw 100px}
.visual-library .library-head{grid-template-columns:1fr;gap:24px;margin-bottom:55px}
.library-grid{grid-template-columns:1fr;gap:22px}
.library-group:first-of-type .library-grid .library-card:first-child,.library-group:nth-of-type(2) .library-grid .library-card:first-child{grid-column:auto}
.library-card figcaption{padding:13px 14px}
}
@media(max-width:700px){
.hero-media{width:58vw;height:auto;aspect-ratio:4/5}
.dna-gallery img,.world-mosaic figure img,.world-mosaic .world-main img{height:auto;aspect-ratio:16/9}
.identity-art img{max-height:350px}
.visual-library .library-head h2{font-size:clamp(46px,13vw,72px)}
.visual-library .library-head p{font-size:15px}
.library-card figcaption{font-size:9px;gap:10px}
}
`;
document.head.appendChild(fixes);

(function buildVisualLibrary(){
 const main=document.querySelector('main');
 if(!main||document.querySelector('.visual-library'))return;
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
 const titles={5:'Core visual application',6:'Event visual design',7:'Color palette + typography',8:'Identity applications',9:'Event visual application',10:'Event collateral',11:'Communication application',12:'Event collateral',13:'Event application',14:'Main stage',15:'Stage view',16:'Stage detail',17:'Stage / conference environment',18:'Arrival / Gate 01',19:'Arrival / Gate 02',20:'Registration area',21:'Registration detail',22:'Sponsor feature wall',23:'Side screen',24:'Exhibitor wall',25:'Meeting room',26:'Exhibition booth — view 01',27:'Exhibition booth — view 02',28:'Directional sign',29:'Closing / thank you'};
 function makeCard(p){const figure=document.createElement('figure');figure.className='library-card'+([14,15,16,17,18,19,22,23,24,25,26,27,28].includes(p)?' dark-art':'');figure.innerHTML=`<div class="art-frame"><img src="assets/visuals/page-${String(p).padStart(2,'0')}.jpg" alt="AFA 2027 — ${titles[p]||'proposal visual'}" loading="lazy"></div><figcaption><span>PAGE ${String(p).padStart(2,'0')}</span><span>${titles[p]||'AFA 2027 visual application'}</span></figcaption>`;return figure;}
 section.innerHTML=`<div class="library-head"><div><div class="eyebrow green">COMPLETE VISUAL SYSTEM</div><h2>Every approved visual.<br><em>Fully represented.</em></h2></div><p>Every supplied proposal artwork is presented as a complete composition, at its natural ratio, with no crop, stretch, overlay or artificial fade.</p></div>`;
 groups.forEach(group=>{const wrap=document.createElement('div');wrap.className='library-group';wrap.innerHTML=`<h3>${group.title}</h3>`;const grid=document.createElement('div');grid.className='library-grid';group.pages.forEach(p=>grid.appendChild(makeCard(p)));wrap.appendChild(grid);section.appendChild(wrap);});
 if(footer)footer.parentNode.insertBefore(section,footer);else main.appendChild(section);
 sections.push(section);
 io.observe(section);
 const libraryObserver=new IntersectionObserver(entries=>entries.forEach(e=>{document.body.classList.toggle('library-mode',e.isIntersecting)}),{threshold:.12});
 libraryObserver.observe(section);
 section.querySelectorAll('img').forEach(img=>img.addEventListener('load',updateChrome,{once:true}));
 updateChrome();
})();

updateChrome();