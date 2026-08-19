const cursor=document.querySelector('.cursor-glow');
window.addEventListener('pointermove',e=>{if(cursor){cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'}});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const drawer=document.querySelector('.nav-drawer');
const menu=document.querySelector('.menu-btn');
const close=document.querySelector('.drawer-close');
const nav=document.getElementById('drawer-nav');
const sections=[...document.querySelectorAll('main section[data-nav]')];
sections.forEach((s,i)=>{const a=document.createElement('a');a.href='#'+(s.id||'');if(!s.id)s.id='section-'+i;a.href='#'+s.id;a.textContent=String(i+1).padStart(2,'0')+'  '+s.dataset.nav;nav.appendChild(a)});
menu?.addEventListener('click',()=>{drawer.classList.add('open');drawer.setAttribute('aria-hidden','false')});
close?.addEventListener('click',()=>{drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true')});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>drawer.classList.remove('open')));
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){nav?.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-40% 0px -50% 0px'});sections.forEach(s=>io.observe(s));
window.addEventListener('scroll',()=>{document.documentElement.style.setProperty('--scroll',window.scrollY)});

const progress=document.querySelector('.scroll-progress span');
const pageNow=document.querySelector('.page-count b');
function updateChrome(){const max=document.documentElement.scrollHeight-innerHeight;const pct=max>0?(scrollY/max)*100:0;if(progress)progress.style.width=pct+'%';let current=1;sections.forEach((s,i)=>{const r=s.getBoundingClientRect();if(r.top<=innerHeight*.45)current=i+1});if(pageNow)pageNow.textContent=String(current).padStart(2,'0')}
window.addEventListener('scroll',updateChrome,{passive:true});window.addEventListener('resize',updateChrome);updateChrome();
