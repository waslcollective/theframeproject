// Turns content/blog/*.md into posts.json (runs automatically on Netlify). No dependencies.
const fs=require('fs'),path=require('path');
const dir=path.join(__dirname,'content','blog');
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const safe=u=>/^(https?:|mailto:|\/|images\/|#)/.test(u)?u:'#';
function inline(s){s=esc(s);
 s=s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g,(m,a,u)=>'<img src="'+safe(u)+'" alt="'+a+'">');
 s=s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,(m,a,u)=>'<a href="'+safe(u)+'">'+a+'</a>');
 return s.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/(^|[^*])\*([^*]+)\*/g,'$1<em>$2</em>');}
function md(body){return body.split(/\n\s*\n/).map(b=>{b=b.trim();if(!b)return'';
 let m=/^(#{1,3})\s+(.*)$/.exec(b);if(m)return'<h2>'+inline(m[2])+'</h2>';
 if(/^[-*]\s/.test(b))return'<ul>'+b.split('\n').map(l=>'<li>'+inline(l.replace(/^[-*]\s+/,''))+'</li>').join('')+'</ul>';
 if(/^>\s?/.test(b))return'<blockquote>'+inline(b.replace(/^>\s?/gm,''))+'</blockquote>';
 return'<p>'+inline(b).replace(/\n/g,'<br>')+'</p>';}).join('\n');}
function parse(txt){const m=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(txt);if(!m)return null;const d={};
 m[1].split(/\r?\n/).forEach(l=>{const k=/^(\w+):\s*(.*)$/.exec(l);if(!k)return;let v=k[2].trim();
  if(/^".*"$/.test(v)){try{v=JSON.parse(v)}catch(e){v=v.slice(1,-1)}}else if(/^'.*'$/.test(v))v=v.slice(1,-1).replace(/''/g,"'");d[k[1]]=v;});
 return{d,body:m[2]};}
const posts=[];
if(fs.existsSync(dir))fs.readdirSync(dir).filter(f=>f.endsWith('.md')).forEach(f=>{
 const p=parse(fs.readFileSync(path.join(dir,f),'utf8'));if(!p)return;
 posts.push({slug:f.replace(/\.md$/,''),title:p.d.title||'Untitled',date:p.d.date||'',author:p.d.author||'',summary:p.d.summary||'',image:p.d.image||'',html:md(p.body)});});
posts.sort((a,b)=>String(b.date).localeCompare(String(a.date)));
fs.writeFileSync(path.join(__dirname,'posts.json'),JSON.stringify(posts));
console.log('posts.json written with '+posts.length+' post(s)');
