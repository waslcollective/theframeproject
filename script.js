(function(){
var C={},posts=[],STAR='<svg class="st" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 2 62 24 85 15 76 38 98 50 76 62 85 85 62 76 50 98 38 76 15 85 24 62 2 50 24 38 15 15 38 24Z" fill="none" stroke="currentColor" stroke-width="7"/></svg>';
var FILES=['site','home','edition','outcomes','interventions','exploria','guzur','team','blog_page'];
function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function E(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function get(p){return p.split('.').reduce(function(o,k){return o==null?o:o[k]},C)}
function paras(box,t){box.textContent='';String(t||'').split(/\n\s*\n/).forEach(function(s){if(s.trim())box.appendChild(E('p',null,s.trim()))})}
function bind(){
 $$('[data-c]').forEach(function(e){var v=get(e.dataset.c);if(v==null||v===''){e.hidden=true;return}e.hidden=false;if('p' in e.dataset)paras(e,v);else e.textContent=v});
 $$('[data-img]').forEach(function(e){var v=get(e.dataset.img);if(v)e.src=v;else e.hidden=true});
 $('.band').innerHTML=STAR+STAR+STAR}
function card(cls,href,title,text,cta,img){var a=E('a','card '+cls);a.href=href;var d=E('div');if(img){var im=E('img');im.src=img;im.alt='';d.appendChild(im)}d.appendChild(E('h3',null,title));if(text)d.appendChild(E('p',null,text));a.appendChild(d);if(cta)a.appendChild(E('b',null,cta));return a}
function renderLists(){
 var ol=$('#phases');ol.textContent='';(C.home.phases||[]).forEach(function(p,i){var li=E('li'),n=E('div','num');n.innerHTML=STAR;n.appendChild(E('span',null,i+1));li.appendChild(n);var d=E('div');d.appendChild(E('h3',null,p.title));d.appendChild(E('p',null,p.tagline));li.appendChild(d);ol.appendChild(li)});
 var tl=$('#timeline');tl.textContent='';(C.edition.timeline||[]).forEach(function(t){var li=E('li');li.appendChild(E('h3',null,t.title));if(t.dates)li.appendChild(E('p',null,t.dates));if(t.text)li.appendChild(E('p',null,t.text));tl.appendChild(li)});
 var ul=$('#outcomes');ul.textContent='';(C.outcomes.items||[]).forEach(function(o){var li=E('li');li.appendChild(E('b',null,o.number));var a=E('a','lnk');a.href=o.slug==='interventions'?'#/first-edition/interventions':'#/first-edition/outcome/'+o.slug;a.appendChild(E('span',null,o.title));li.appendChild(a);ul.appendChild(li)});
 var I=C.interventions,ic=$('#int-cards');ic.textContent='';['exploria','guzur','robit'].forEach(function(k){ic.appendChild(card('','#/first-edition/interventions/'+k,I[k+'_name'],I[k+'_card'],I[k+'_cta']))});
 var ac=$('#artist-cards');ac.textContent='';(C.exploria.artists||[]).forEach(function(a){ac.appendChild(card('pcard','#/artist/'+a.slug,a.name,a.years,'Open page',a.image))});
 var pc=$('#post-cards');pc.textContent='';if(!posts.length)pc.appendChild(E('p','note','No posts yet.'));posts.forEach(function(p){pc.appendChild(card('pcard','#/blog/'+p.slug,p.title,p.summary,fmt(p.date),p.image))});
 var mb=$('#members');mb.textContent='';(C.team.members||[]).forEach(function(m){var d=E('div','pc');if(m.image){var im=E('img');im.src=m.image;im.alt=m.name;d.appendChild(im)}d.appendChild(E('h3',null,m.name));if(m.role)d.appendChild(E('p',null,m.role));if(m.bio)d.appendChild(E('p',null,m.bio));mb.appendChild(d)});
 $('#tm-h').hidden=!(C.team.members||[]).length;
 var pt=$('#partners');pt.textContent='';(C.team.partners||[]).forEach(function(m){var d=E('div','pc');if(m.logo){var l=E('div','lg'),im=E('img');im.src=m.logo;im.alt=m.name;l.appendChild(im);d.appendChild(l)}d.appendChild(E('h3',null,m.name));if(m.role)d.appendChild(E('p',null,m.role));pt.appendChild(d)})}
function fmt(d){var x=new Date(d);return isNaN(x)?'':x.toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}
var r=0,i=0;
function gzInit(){var tabs=$('#gz-tabs');tabs.textContent='';(C.guzur.routes||[]).forEach(function(rt,k){var b=E('button',null,rt.name);b.onclick=function(){r=k;i=0;gz()};tabs.appendChild(b)});r=0;i=0;gz()}
function gz(){var rt=(C.guzur.routes||[])[r];if(!rt)return;var st=rt.stops||[],s=st[i]||{};
 $$('#gz-tabs button').forEach(function(b,k){b.setAttribute('aria-pressed',k===r)});
 var box=$('#gz-plan');box.textContent='';
 if(C.guzur.floor_plan){var im=E('img');im.src=C.guzur.floor_plan;im.alt='Museum floor plan';box.appendChild(im)}else box.appendChild(E('div','empty','Floor plan: upload it in the admin page'));
 var NS='http://www.w3.org/2000/svg',sv=document.createElementNS(NS,'svg');sv.setAttribute('viewBox','0 0 100 100');sv.setAttribute('preserveAspectRatio','none');
 var pl=document.createElementNS(NS,'polyline');pl.setAttribute('points',st.map(function(p){return p.x+','+p.y}).join(' '));pl.setAttribute('fill','none');pl.style.stroke='var(--rust)';pl.setAttribute('stroke-width','3');pl.setAttribute('stroke-dasharray','6 5');pl.setAttribute('vector-effect','non-scaling-stroke');sv.appendChild(pl);box.appendChild(sv);
 st.forEach(function(p,k){var b=E('button','pt'+(k===i?' cur':''),k+1);b.style.left=p.x+'%';b.style.top=p.y+'%';b.setAttribute('aria-label','Stop '+(k+1)+': '+p.title);b.onclick=function(){i=k;gz()};box.appendChild(b)});
 var art=$('#gz-art');art.textContent='';if(s.image){var a=E('img','aw');a.src=s.image;a.alt=s.title||'';art.appendChild(a)}else art.appendChild(E('div','art','Artwork image'));
 $('#gz-t').textContent=s.title||'';$('#gz-a').textContent=s.artist||'';$('#gz-m').textContent=rt.name+', stop '+(i+1)+' of '+st.length;
 var au=$('#gz-au');if(s.audio){au.src=s.audio;au.hidden=false;$('#gz-noau').hidden=true}else{au.removeAttribute('src');au.hidden=true;$('#gz-noau').hidden=false}
 paras($('#gz-x'),s.text);$('#gz-p').disabled=i===0;$('#gz-n').textContent=i===st.length-1?'Finish tour':'Next';$('#gz-done').style.display='none'}
$('#gz-p').onclick=function(){if(i>0){i--;gz()}};
$('#gz-n').onclick=function(){var n=(C.guzur.routes[r].stops||[]).length;if(i<n-1){i++;gz()}else{gz();$('#gz-done').style.display='block'}};
var P={'/':'home','/first-edition':'ed','/first-edition/interventions':'int','/first-edition/interventions/exploria':'exploria','/first-edition/interventions/guzur':'guzur','/first-edition/interventions/robit':'robit','/blog':'blog','/team':'team'};
function find(a,s){return (a||[]).filter(function(x){return x.slug===s})[0]}
function route(){var h=location.hash.replace('#','')||'/',p=P[h],m;
 if(m=/^\/first-edition\/outcome\/([\w-]+)$/.exec(h)){var o=find(C.outcomes.items,m[1]);if(o){p='outcome';$('#oc-t').textContent=o.title;paras($('#oc-d'),o.summary);var L=$('#oc-l');L.hidden=!o.link;$('#oc-s').hidden=!!o.link;if(o.link)L.href=o.link}}
 else if(m=/^\/artist\/([\w-]+)$/.exec(h)){var a=find(C.exploria.artists,m[1]);if(a){p='artist';$('#ar-n').textContent=a.name;$('#ar-y').textContent=a.years||'';var im=$('#ar-i');im.hidden=!a.image;if(a.image)im.src=a.image;paras($('#ar-b'),a.bio);paras($('#ar-f'),a.findings);paras($('#ar-s'),a.sources);['f','s'].forEach(function(k){var v=a[k==='f'?'findings':'sources'];$('#ar-'+k).hidden=$('#ar-'+k+'h').hidden=!v})}}
 else if(m=/^\/blog\/([\w-]+)$/.exec(h)){var q=find(posts,m[1]);if(q){p='post';$('#po-t').textContent=q.title;$('#po-m').textContent=[q.author,fmt(q.date)].filter(Boolean).join(' · ');var pi=$('#po-i');pi.hidden=!q.image;if(q.image)pi.src=q.image;$('#po-b').innerHTML=q.html}}
 p=p||'home';
 $$('[data-page]').forEach(function(e){e.classList.toggle('on',e.dataset.page===p)});
 var n={home:'home',ed:'ed',int:'ed',outcome:'ed',exploria:'ed',artist:'ed',guzur:'ed',robit:'ed',blog:'blog',post:'blog',team:'team'}[p];
 $$('[data-nav]').forEach(function(x){x.dataset.nav===n?x.setAttribute('aria-current','page'):x.removeAttribute('aria-current')});
 $$('[data-sub]').forEach(function(x){x.dataset.sub===p?x.setAttribute('aria-current','page'):x.removeAttribute('aria-current')});
 window.scrollTo(0,0)}
function theme(){var T=C.site.theme||{},R=document.documentElement.style,M={color_bg:'--cream',color_soft:'--paper',color_dark:'--navy',color_accent:'--rust',color_teal:'--teal',color_gold:'--mustard',color_sand:'--sand'},seen={};
 Object.keys(M).forEach(function(k){if(/^#[0-9a-f]{3,8}$/i.test(T[k]||''))R.setProperty(M[k],T[k])});
 [['font_ui','--font-ui','system-ui,sans-serif','Bricolage Grotesque'],['font_serif','--font-serif','Georgia,serif','Newsreader']].forEach(function(f){var n=T[f[0]];if(!n||!/^[\w ]+$/.test(n))return;R.setProperty(f[1],'"'+n+'",'+f[2]);if(n!==f[3]&&!seen[n]){seen[n]=1;var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family='+n.replace(/ /g,'+')+':wght@400;700&display=swap';document.head.appendChild(l)}})}
function forms(){
 $$('form.nf').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var ok=$('.ok',f),S=C.site;
  function show(m,c){ok.style.background=c;ok.textContent=m;ok.style.display='block'}
  if(!S.form_access_key){show('Forms are not connected yet. The site owner needs to add the form key in the admin page.','var(--rust)');return}
  var fd=new FormData(f);fd.append('access_key',S.form_access_key);fd.append('subject',f.dataset.subject||'FRAME website form');
  fetch(S.form_endpoint||'https://api.web3forms.com/submit',{method:'POST',body:fd}).then(function(x){return x.json()}).then(function(j){if(j.success===false)throw 0;show(S.form_success,'var(--teal)');f.reset()}).catch(function(){show('Something went wrong. Please try again later.','var(--rust)')})})});
 $('#rb-tabs').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;$$('#rb-tabs button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});$('#rb-mentor').hidden=b.dataset.f!=='mentor';$('#rb-student').hidden=b.dataset.f!=='student'})}
Promise.all(FILES.map(function(f){return fetch('content/'+f+'.json').then(function(x){return x.json()}).then(function(j){C[f]=j})}))
.then(function(){return fetch('posts.json').then(function(x){return x.ok?x.json():[]}).catch(function(){return[]})})
.then(function(p){posts=p;theme();bind();renderLists();gzInit();forms();addEventListener('hashchange',route);route()})
.catch(function(){document.body.insertAdjacentHTML('afterbegin','<p style="padding:2rem">Could not load the site content. If you opened this file directly, run it through a web server or upload it to your host.</p>')});
})();
