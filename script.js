var LOGO={w:'logo-wordmark.jpg',f:'logo-full.jpg'};document.querySelectorAll("img[data-logo]").forEach(function(i){i.src=LOGO[i.dataset.logo]});
(function(){
var bg=document.getElementById('bg'),fx=document.getElementById('fx'),b=bg.getContext('2d'),f=fx.getContext('2d'),
W,H,dpr=Math.min(devicePixelRatio||1,2),m={x:innerWidth*.7,y:innerHeight*.4},sp=[],last=0,
rm=matchMedia('(prefers-reduced-motion:reduce)').matches,cols=['#fff0c4','#e3bd6a','#c9973a','#8f6516'];
function rs(){W=innerWidth;H=innerHeight;[bg,fx].forEach(function(k){k.width=W*dpr;k.height=H*dpr});b.setTransform(dpr,0,0,dpr,0,0);f.setTransform(dpr,0,0,dpr,0,0)}
rs();addEventListener('resize',rs);

/* floating marketing icons */
var P={
 heart:function(c,s){c.moveTo(0,s*.7);c.bezierCurveTo(-s*1.3,-s*.2,-s*.6,-s*1.1,0,-s*.4);c.bezierCurveTo(s*.6,-s*1.1,s*1.3,-s*.2,0,s*.7)},
 play:function(c,s){c.roundRect(-s,-s*.7,s*2,s*1.4,s*.35);c.moveTo(-s*.25,-s*.3);c.lineTo(s*.4,0);c.lineTo(-s*.25,s*.3);c.closePath()},
 chat:function(c,s){c.roundRect(-s,-s*.8,s*2,s*1.3,s*.35);c.moveTo(-s*.4,s*.5);c.lineTo(-s*.6,s*.95);c.lineTo(0,s*.5)},
 star:function(c,s){for(var i=0;i<10;i++){var r=i%2?s*.45:s,a=i*Math.PI/5-Math.PI/2;c[i?'lineTo':'moveTo'](Math.cos(a)*r,Math.sin(a)*r)}c.closePath()},
 chart:function(c,s){c.rect(-s*.9,0,s*.4,s*.8);c.rect(-s*.2,-s*.4,s*.4,s*1.2);c.rect(s*.5,-s*.9,s*.4,s*1.7)},
 cam:function(c,s){c.roundRect(-s,-s*.6,s*2,s*1.4,s*.3);c.moveTo(s*.45,s*.1);c.arc(0,s*.1,s*.45,0,7);c.moveTo(-s*.5,-s*.6);c.lineTo(-s*.3,-s*.9);c.lineTo(s*.3,-s*.9);c.lineTo(s*.5,-s*.6)},
 bell:function(c,s){c.moveTo(-s*.8,s*.5);c.quadraticCurveTo(-s*.5,s*.2,-s*.5,-s*.3);c.arc(0,-s*.3,s*.5,Math.PI,0);c.quadraticCurveTo(s*.5,s*.2,s*.8,s*.5);c.closePath();c.moveTo(s*.2,s*.8);c.arc(0,s*.8,s*.2,0,7)}
};
var K=['heart','play','chat','star','chart','cam','bell'],I=[],i;
for(i=0;i<16;i++)I.push({t:K[i%7],x:Math.random(),y:Math.random()*1.6,s:16+Math.random()*26,d:.3+Math.random()*.9,r:Math.random()*6,v:(Math.random()-.5)*.004,c:i%3,ox:0,oy:0,ph:Math.random()*6});
function draw(t,sy){
 b.clearRect(0,0,W,H);
 var px=m.x/W-.5,py=m.y/H-.5;
 I.forEach(function(o){
  var s=o.s*(W<700?.7:1),x=o.x*W-px*70*o.d,y=((o.y*H-sy*o.d*.5)%(H*1.6)+H*1.6)%(H*1.6)-H*.3+Math.sin(t*.6+o.ph)*14-py*50*o.d;
  var dx=x-m.x,dy=y-m.y,dist=Math.hypot(dx,dy)||1,push=dist<170?(170-dist)/170*50:0;
  o.ox+=(dx/dist*push-o.ox)*.08;o.oy+=(dy/dist*push-o.oy)*.08;
  var g=b.createLinearGradient(-s,-s,s,s),a=o.c;
  g.addColorStop(0,['#b8862b','#e3bd6a','#8f6516'][a]);g.addColorStop(1,['#e3bd6a','#8f6516','#b8862b'][a]);
  b.save();b.translate(x+o.ox,y+o.oy);b.rotate(o.r+t*o.v*20+px*.5);b.globalAlpha=.16+.34*Math.min(1,o.d);
  b.beginPath();P[o.t](b,s);b.shadowColor='#c9973a';b.shadowBlur=14;b.fillStyle='rgba(201,151,58,.1)';b.fill('evenodd');
  b.strokeStyle=g;b.lineWidth=1.8;b.stroke();b.restore()})
}
function loop(ts){
 draw(ts/1000,scrollY);f.clearRect(0,0,W,H);
 for(var i=sp.length-1;i>=0;i--){var p=sp[i];p.l-=.018;if(p.l<=0){sp.splice(i,1);continue}
  p.x+=p.vx;p.y+=p.vy;p.vy+=.02;p.r+=p.sp;f.save();f.translate(p.x,p.y);f.rotate(p.r);f.globalAlpha=Math.min(1,p.l);f.fillStyle=p.c;
  f.beginPath();f.moveTo(0,-p.s);f.lineTo(p.s*.28,0);f.lineTo(0,p.s);f.lineTo(-p.s*.28,0);f.closePath();f.fill();
  f.rotate(Math.PI/2);f.beginPath();f.moveTo(0,-p.s*.7);f.lineTo(p.s*.2,0);f.lineTo(0,p.s*.7);f.lineTo(-p.s*.2,0);f.closePath();f.fill();f.restore()}
 requestAnimationFrame(loop)
}
function burst(x,y,n){for(var i=0;i<n;i++){var a=Math.random()*6.28,v=1+Math.random()*3.5;sp.push({x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:1.2,s:4+Math.random()*9,r:0,sp:.08,c:cols[i%4]})}}
addEventListener('pointermove',function(e){m.x=e.clientX;m.y=e.clientY;if(rm)return;var n=performance.now();if(n-last<28)return;last=n;
 for(var i=0;i<2;i++)sp.push({x:m.x,y:m.y,vx:(Math.random()-.5)*1.4,vy:Math.random()*-.8,l:1,s:3+Math.random()*7,r:Math.random()*3,sp:(Math.random()-.5)*.1,c:cols[Math.random()*4|0]})});
document.addEventListener('pointerdown',function(e){burst(e.clientX,e.clientY,18)});

/* tilt cards */
function tilt(el){
 el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  el.style.setProperty('--mx',x*100+'%');el.style.setProperty('--my',y*100+'%');
  if(!rm)el.style.transform='perspective(800px) rotateY('+(x-.5)*9+'deg) rotateX('+(.5-y)*9+'deg)'});
 el.addEventListener('pointerleave',function(){el.style.transform=''})}
document.querySelectorAll('.tilt').forEach(tilt);

/* reveal + counters */
var rio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');rio.unobserve(e.target)}})},{threshold:.12});
var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;cio.unobserve(e.target);
 var el=e.target,n=+el.dataset.n,s=performance.now();(function u(t){var k=Math.min((t-s)/1800,1);el.textContent=Math.round(n*(1-Math.pow(1-k,3)))+(n>=98?'%':n==3?'x':'+');if(k<1)requestAnimationFrame(u)})(s)})},{threshold:.6});
function watch(){document.querySelectorAll('.rv:not(.in)').forEach(function(e){rio.observe(e)});document.querySelectorAll('[data-n]').forEach(function(e){cio.observe(e)})}
watch();

/* page transitions: they play on every navigation click */
var pt=document.getElementById('pt'),cur='home',busy=false,VIEWS=['home','work','packages','team'];
function viewOf(id){var t=document.getElementById(id);if(t){var v=t.closest('.view');if(v)return v.id.slice(2)}return VIEWS.indexOf(id)>0?id:'home'}
function show(v,id){
 cur=v;VIEWS.forEach(function(k){document.getElementById('v-'+k).classList.toggle('on',k==v)});
 document.querySelectorAll('nav a[data-v]').forEach(function(a){a.classList.toggle('on',a.dataset.v==v)});
 var t=id?document.getElementById(id):null;if(t&&t.classList.contains('view'))t=null;
 document.documentElement.style.scrollBehavior='auto';scrollTo(0,t?t.getBoundingClientRect().top+scrollY-100:0);document.documentElement.style.scrollBehavior='';watch()}
function go(id){
 var v=viewOf(id);try{history.replaceState(null,'','#'+id)}catch(e){}
 if(busy)return;busy=true;
 if(rm){show(v,id);busy=false;return}
 pt.className='in';burst(W/2,H/2,36);setTimeout(function(){burst(W*.3,H/2,22);burst(W*.7,H/2,22)},550);
 setTimeout(function(){show(v,id);pt.className='out'},1300);
 setTimeout(function(){pt.className='';busy=false},2150)}
document.addEventListener('click',function(e){var a=e.target.closest('a[href^="#"]');if(!a)return;e.preventDefault();go(a.getAttribute('href').slice(1)||'top')});
if(location.hash.length>1){var h0=location.hash.slice(1);show(viewOf(h0),h0)}
var lw=document.querySelector('.lw');
addEventListener('pointermove',function(e){if(rm||!lw)return;var x=e.clientX/W-.5,y=e.clientY/H-.5;lw.style.transform='perspective(900px) rotateY('+x*12+'deg) rotateX('+-y*12+'deg)'});

/* contact */
document.getElementById('f').addEventListener('submit',function(e){e.preventDefault();document.getElementById('ok').textContent='Thank you. We will contact you within one working day.';e.target.reset()});

/* shared helpers */
var CAM='<svg viewBox="0 0 48 48" width="38" height="38" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="5" y="12" width="38" height="28" rx="5"/><circle cx="24" cy="26" r="7"/><path d="M17 12l3-5h8l3 5"/></svg>',
 IG='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>';
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e}
function link(u){return /^https?:\/\//i.test(u)?u:'https://'+u}
function load(k,d){try{var v=JSON.parse(localStorage.getItem(k)||'null');return v==null?d:v}catch(e){return d}}
function put(k,v,out){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){out.textContent='Saved for this visit only. Browser storage is full or blocked.'}}
function readImg(file,z,cb){var u=URL.createObjectURL(file),im=new Image();im.onload=function(){var c=document.createElement('canvas'),s=Math.min(im.width,im.height);c.width=c.height=z;c.getContext('2d').drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,z,z);URL.revokeObjectURL(u);cb(c.toDataURL('image/jpeg',.82))};im.src=u}

/* team page */
var tg=document.getElementById('tg'),img='',ed=-1,pick=-1,tok=document.getElementById('tok'),
 team=load('velora_team2',null)||[{n:'Rushikesh Chandanpat',r:'Founder · Cinematographer · Editor',b:'',p:''},{n:'Rugved Futane',r:'Co-founder · Graphic designer',b:'',p:''},{n:'Sujant Boharapi',r:'Client outreach executive',b:'',p:''},{n:'Arya Paithankar',r:'',b:'',p:''},{n:'Shravani Prasad',r:'',b:'',p:''}];
function renderTeam(){
 tg.textContent='';team.forEach(function(t,i){
  var c=el('div','card tilt'),pb=el('button','pw'),p;pb.type='button';pb.setAttribute('aria-label','Add or change photo of '+t.n);
  if(t.p){p=el('img','pf');p.src=t.p;p.alt=t.n}else{p=el('div','pf ph');p.innerHTML=CAM+'<span>Add photo</span>'}
  pb.appendChild(p);pb.onclick=function(){pick=i;document.getElementById('tpk').click()};
  c.append(pb,el('h3','',t.n),el('p','role',t.r||'Role to be added'),el('p','',t.b||'Bio to be added.'));
  if(t.l){var a=el('a','',' Profile');a.href=link(t.l);a.target='_blank';a.rel='noopener';a.style.cssText='display:block;margin-top:10px;color:#e3bd6a;font-weight:500';c.appendChild(a)}
  var eb=el('button','btn sm','Edit details');eb.type='button';eb.onclick=function(){edit(i)};c.appendChild(eb);
  var x=el('button','x','×');x.type='button';x.setAttribute('aria-label','Remove '+t.n);x.onclick=function(){if(confirm('Remove '+t.n+' from the team page?')){team.splice(i,1);put('velora_team2',team,tok);renderTeam()}};c.appendChild(x);
  tilt(c);tg.appendChild(c)})}
function edit(i){var t=team[i];ed=i;img='';
 document.getElementById('tn').value=t.n;document.getElementById('tr').value=t.r;document.getElementById('tb').value=t.b;document.getElementById('ti').value=t.l||'';
 var pv=document.getElementById('prev');if(t.p){pv.src=t.p;pv.hidden=false}else pv.hidden=true;
 document.getElementById('tsub').textContent='Save changes';tok.textContent='Editing '+t.n+'. Add a role and bio, then save.';
 document.getElementById('tf').scrollIntoView({behavior:'smooth',block:'center'})}
renderTeam();
document.getElementById('tpk').addEventListener('change',function(e){var fl=e.target.files[0];e.target.value='';if(!fl||pick<0)return;
 readImg(fl,520,function(d){team[pick].p=d;put('velora_team2',team,tok);renderTeam();burst(W/2,H/2,24)})});
document.getElementById('tp').addEventListener('change',function(e){var fl=e.target.files[0];if(!fl)return;
 readImg(fl,520,function(d){img=d;var pv=document.getElementById('prev');pv.src=d;pv.hidden=false})});
document.getElementById('tf').addEventListener('submit',function(e){
 e.preventDefault();var o={n:document.getElementById('tn').value.trim(),r:document.getElementById('tr').value.trim(),b:document.getElementById('tb').value.trim(),l:document.getElementById('ti').value.trim(),p:img};
 if(ed>=0){o.p=img||team[ed].p;team[ed]=o}else team.push(o);
 var msg=ed>=0?'Saved. The changes are now on the page.':'Posted. The new member is now on the page.';
 ed=-1;put('velora_team2',team,tok);renderTeam();burst(W/2,H/2,30);e.target.reset();img='';document.getElementById('prev').hidden=true;document.getElementById('tsub').textContent='Save to team page';tok.textContent=msg});

/* work page: instagram posts */
var posts=load('velora_posts',[]),igp=load('velora_igp',''),wg=document.getElementById('wg'),wok=document.getElementById('wok'),pimg='';
function renderPosts(){
 wg.textContent='';
 posts.forEach(function(p,i){
  var c=el('div','card ig-card tilt'),a=el('a','');a.href=link(p.l);a.target='_blank';a.rel='noopener';
  var im=el('img','post');im.src=p.p;im.alt=p.c||'Instagram post';a.appendChild(im);
  var cap=el('div','pcap'),v=el('span','vi');v.innerHTML=IG+' View on Instagram';cap.append(el('p','',p.c||'Instagram post'),v);a.appendChild(cap);c.appendChild(a);
  var x=el('button','x','×');x.type='button';x.setAttribute('aria-label','Remove post');x.onclick=function(){if(confirm('Remove this post?')){posts.splice(i,1);put('velora_posts',posts,wok);renderPosts()}};c.appendChild(x);
  tilt(c);wg.appendChild(c)});
 var n=Math.max(6,Math.ceil((posts.length+1)/3)*3)-posts.length;
 for(var k=0;k<n;k++){var sl=el('button','slot');sl.type='button';sl.innerHTML=IG.replace('width="18" height="18" fill','width="30" height="30" fill')+'<span>Your Instagram post will appear here</span>';sl.onclick=function(){go('addpost')};wg.appendChild(sl)}
 var gp=document.getElementById('igp');gp.hidden=!igp;if(igp)gp.href=link(igp)}
renderPosts();
document.getElementById('wp').addEventListener('change',function(e){var fl=e.target.files[0];if(!fl)return;
 readImg(fl,640,function(d){pimg=d;var pv=document.getElementById('wprev');pv.src=d;pv.hidden=false})});
document.getElementById('addpost').addEventListener('submit',function(e){
 e.preventDefault();if(!pimg){wok.textContent='Please choose the post image first.';return}
 posts.unshift({p:pimg,l:document.getElementById('wl').value.trim(),c:document.getElementById('wc').value.trim()});
 var pi=document.getElementById('wi').value.trim();if(pi){igp=pi;put('velora_igp',igp,wok)}
 put('velora_posts',posts,wok);renderPosts();burst(W/2,H/2,30);e.target.reset();pimg='';document.getElementById('wprev').hidden=true;wok.textContent='Added. The post is now on the work page.'});
requestAnimationFrame(loop)
})();
