document.documentElement.classList.add('js');
document.getElementById('yr').textContent=new Date().getFullYear();

/* revelar ao rolar */
(function(){
  var els=document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  els.forEach(function(e){io.observe(e)});
})();

/* filtro da galeria */
var figs=[].slice.call(document.querySelectorAll('#mas figure'));
document.querySelectorAll('.filters button').forEach(function(b){
  b.addEventListener('click',function(){
    document.querySelectorAll('.filters button').forEach(function(x){x.classList.remove('on')});
    b.classList.add('on');
    var f=b.dataset.f;
    figs.forEach(function(g){g.classList.toggle('hide',f!=='all'&&g.dataset.c!==f)});
  });
});

/* lightbox */
(function(){
  var lb=document.getElementById('lb'),img=lb.querySelector('img'),list=[],i=0;
  function visible(){return [].slice.call(document.querySelectorAll('[data-lb]')).filter(function(f){return !f.classList.contains('hide')})}
  function show(){var t=list[i].querySelector('img');img.src=t.src;img.alt=t.alt}
  function open(f){list=visible();i=list.indexOf(f);if(i<0)return;show();lb.classList.add('open');document.body.style.overflow='hidden'}
  function close(){lb.classList.remove('open');document.body.style.overflow=''}
  function step(d){i=(i+d+list.length)%list.length;show()}
  document.querySelectorAll('[data-lb]').forEach(function(f){f.addEventListener('click',function(){open(f)})});
  lb.querySelector('.x').onclick=close;
  lb.querySelector('.p').onclick=function(e){e.stopPropagation();step(-1)};
  lb.querySelector('.n').onclick=function(e){e.stopPropagation();step(1)};
  lb.addEventListener('click',function(e){if(e.target===lb)close()});
  document.addEventListener('keydown',function(e){
    if(!lb.classList.contains('open'))return;
    if(e.key==='Escape')close();
    if(e.key==='ArrowLeft')step(-1);
    if(e.key==='ArrowRight')step(1);
  });
})();

/* menu do celular */
(function(){
  var nav=document.querySelector('.nav'),btn=document.querySelector('.menu-btn');
  if(!nav||!btn)return;
  function set(o){nav.classList.toggle('open',o);btn.setAttribute('aria-expanded',o?'true':'false');btn.setAttribute('aria-label',o?'Fechar menu':'Abrir menu')}
  btn.addEventListener('click',function(){set(!nav.classList.contains('open'))});
  nav.querySelectorAll('ul a').forEach(function(a){a.addEventListener('click',function(){set(false)})});
  document.addEventListener('click',function(e){if(!nav.contains(e.target))set(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
  window.addEventListener('resize',function(){if(window.innerWidth>900)set(false)});
})();

/* deslizar o dedo para trocar de foto no lightbox */
(function(){
  var lb=document.getElementById('lb'),x0=null,y0=null;
  lb.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
  lb.addEventListener('touchend',function(e){
    if(x0===null)return;
    var dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;
    if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5){lb.querySelector(dx<0?'.n':'.p').click()}
  },{passive:true});
})();
