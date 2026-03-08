/* ═══════════════════════════════════════════════════════════
   APNA DHABA — script.js (Clean Stable Version)
═══════════════════════════════════════════════════════════ */

'use strict';


/* ═══════════════════════════════════════════════════════════
   1. PRELOADER
═══════════════════════════════════════════════════════════ */

(function initPreloader(){

document.body.style.overflow='hidden';

const flameWrap=document.getElementById('lottie-flame');

if(flameWrap){

const player=document.createElement('lottie-player');

player.src='animation/Fire animation.json';
player.background='transparent';
player.speed='1';
player.loop=true;
player.autoplay=true;

player.style.width='120px';
player.style.height='120px';

flameWrap.appendChild(player);

}

window.addEventListener('load',()=>{

setTimeout(()=>{

const pre=document.getElementById('preloader');

if(pre){

pre.classList.add('hide');

setTimeout(()=>{

pre.remove();
document.body.style.overflow='';

const heroBg=document.getElementById('heroBg');
if(heroBg) heroBg.classList.add('loaded');

},700);

}

},3000);

});

})();


/* ═══════════════════════════════════════════════════════════
   2. NAVBAR
═══════════════════════════════════════════════════════════ */

(function initNavbar(){

const navbar=document.getElementById('navbar');
const toggle=document.getElementById('navToggle');
const menu=document.getElementById('navMenu');
const btt=document.getElementById('btt');

window.addEventListener('scroll',()=>{

if(navbar)
navbar.classList.toggle('scrolled',window.scrollY>70);

if(btt)
btt.classList.toggle('show',window.scrollY>400);

},{passive:true});

if(toggle && menu){

toggle.addEventListener('click',()=>{

toggle.classList.toggle('open');
menu.classList.toggle('open');

document.body.style.overflow=
menu.classList.contains('open')?'hidden':'';

});

}

if(menu){

menu.querySelectorAll('a').forEach(link=>{

link.addEventListener('click',()=>{

if(toggle) toggle.classList.remove('open');

menu.classList.remove('open');
document.body.style.overflow='';

});

});

}

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener('click',e=>{

const target=document.querySelector(anchor.getAttribute('href'));

if(!target) return;

e.preventDefault();

window.scrollTo({
top:target.offsetTop-80,
behavior:'smooth'
});

});

});

if(btt){

btt.addEventListener('click',()=>{
window.scrollTo({top:0,behavior:'smooth'});
});

}

})();


/* ═══════════════════════════════════════════════════════════
   3. SIMPLE AOS
═══════════════════════════════════════════════════════════ */

(function initAOS(){

const items=document.querySelectorAll('[data-aos]');
if(!items.length) return;

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add('aos-animate');
observer.unobserve(entry.target);

}

});

},{threshold:0.12});

items.forEach(el=>observer.observe(el));

})();


/* ═══════════════════════════════════════════════════════════
   4. STEAM ANIMATION CONTROL
═══════════════════════════════════════════════════════════ */

(function initSteam(){

const section=document.querySelector('.dishes-section');
if(!section) return;

const steamEls=document.querySelectorAll('.steam');

const observer=new IntersectionObserver(entries=>{

const visible=entries[0].isIntersecting;

steamEls.forEach(el=>{
el.style.animationPlayState=visible?'running':'paused';
});

});

observer.observe(section);

steamEls.forEach(el=>{

el.style.animationDelay=(Math.random()*2)+'s';
el.style.animationDuration=(2+Math.random()*1.5)+'s';

});

})();


/* ═══════════════════════════════════════════════════════════
   5. GALLERY LIGHTBOX
═══════════════════════════════════════════════════════════ */

const lbImages=[

{src:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200',caption:'Authentic Indian Cuisine'},
{src:'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=1200',caption:'Kitchen Activity'},
{src:'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=1200',caption:'Dal Makhani'},
{src:'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=1200',caption:'Butter Chicken'}

];

let lbCurrent=0;

const lb=document.getElementById('lightbox');
const lbWrap=document.getElementById('lbImgWrap');
const lbCaption=document.getElementById('lbCaption');

function renderLb(){

const item=lbImages[lbCurrent];

if(lbWrap)
lbWrap.innerHTML=`<img src="${item.src}" alt="${item.caption}">`;

if(lbCaption)
lbCaption.textContent=item.caption;

}

function openLightbox(index){

lbCurrent=index;
renderLb();

if(lb){
lb.classList.add('open');
document.body.style.overflow='hidden';
}

}

function closeLightbox(){

if(lb){
lb.classList.remove('open');
document.body.style.overflow='';
}

}

function lbNext(){

lbCurrent=(lbCurrent+1)%lbImages.length;
renderLb();

}

function lbPrev(){

lbCurrent=(lbCurrent-1+lbImages.length)%lbImages.length;
renderLb();

}

if(lb){

lb.addEventListener('click',e=>{
if(e.target===lb) closeLightbox();
});

}

document.addEventListener('keydown',e=>{

if(!lb || !lb.classList.contains('open')) return;

if(e.key==='ArrowRight') lbNext();
if(e.key==='ArrowLeft') lbPrev();
if(e.key==='Escape') closeLightbox();

});

window.openLightbox=openLightbox;


/* ═══════════════════════════════════════════════════════════
   6. DISH CARD HOVER EFFECT
═══════════════════════════════════════════════════════════ */

const dishCards=document.querySelectorAll('.dish-card');

if(dishCards.length){

dishCards.forEach(card=>{

card.addEventListener('mousemove',e=>{

const rect=card.getBoundingClientRect();

const x=(e.clientX-rect.left)/rect.width-0.5;
const y=(e.clientY-rect.top)/rect.height-0.5;

card.style.transform=
`translateY(-10px) rotateY(${x*6}deg) rotateX(${-y*4}deg)`;

});

card.addEventListener('mouseleave',()=>{
card.style.transform='';
});

});

}


/* ═══════════════════════════════════════════════════════════
   7. HERO PARALLAX
═══════════════════════════════════════════════════════════ */

const hero=document.querySelector('.hero');

if(hero){

hero.addEventListener('mousemove',e=>{

const x=(e.clientX/window.innerWidth)-0.5;
const y=(e.clientY/window.innerHeight)-0.5;

document.querySelectorAll('.floater').forEach((el,i)=>{

const depth=(i+1)*12;

el.style.transform=
`translateX(${x*depth}px) translateY(${-y*depth}px)`;

});

});

}


/* ═══════════════════════════════════════════════════════════
   8. COUNTER ANIMATION
═══════════════════════════════════════════════════════════ */

function animateCount(el,target,suffix){

let current=0;
const step=Math.ceil(target/50);

const timer=setInterval(()=>{

current=Math.min(current+step,target);

el.textContent=current+suffix;

if(current>=target) clearInterval(timer);

},25);

}

const stat=document.querySelector('.av-stat-pill .pill-num');

if(stat){

const observer=new IntersectionObserver(entries=>{

if(entries[0].isIntersecting){

animateCount(stat,25,'+');
observer.disconnect();

}

});

observer.observe(stat);

}


/* ═══════════════════════════════════════════════════════════
   9. HERO BACKGROUND ROTATION
═══════════════════════════════════════════════════════════ */

const heroImages=[

'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1800',
'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=1800',
'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=1800'

];

let heroIndex=0;

const heroBg=document.getElementById('heroBg');

if(heroBg){

setInterval(()=>{

heroIndex=(heroIndex+1)%heroImages.length;

heroBg.style.opacity='0';

setTimeout(()=>{

heroBg.src=heroImages[heroIndex];
heroBg.style.opacity='1';

},600);

},6000);

}


console.log('%c🔥 Apna Dhaba','font-size:2rem;color:#E8771A;font-weight:bold');
console.log('%cAuthentic Highway Dhaba · Narhe, Pune','color:#F5A623');