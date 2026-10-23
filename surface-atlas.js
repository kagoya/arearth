import {countries} from './countries.js?v=surface-4';
import {points} from './places.js?v=surface-4';
export const ATLAS_WIDTH=4096, ATLAS_HEIGHT=2048;
export function surfacePlaces(mode='all',selected){const list=[...countries.map(p=>({...p,type:'country'}))];if(mode!=='countries')list.push(...points.filter(p=>mode==='all'||p.type==='capital'));return list;}
const xy=(lat,lon)=>[(lon+180)/360*ATLAS_WIDTH,(90-lat)/180*ATLAS_HEIGHT];
// Lay out labels in map coordinates. Thin leader lines keep labels off their exact locations.
export function labelLayout(ctx,mode='all',selected){const boxes=[],labels=[],list=surfacePlaces(mode,selected);list.sort((a,b)=>(a.type==='country'?0:1)-(b.type==='country'?0:1)||(a.rank??9)-(b.rank??9));
 const intersects=(a,b)=>a.x<b.x+b.w+4&&a.x+a.w+4>b.x&&a.y<b.y+b.h+3&&a.y+a.h+3>b.y;
 for(const p of list){const size=p.type==='country'?Math.max(15,25-(p.rank??6)*1.35):p.type==='capital'?14:13;ctx.font=`${p.type==='country'?600:500} ${size}px sans-serif`;const scaleX=Math.min(1.9,1/Math.max(.5,Math.cos(p.lat*Math.PI/180))),w=ctx.measureText(p.name).width*scaleX+8,h=size+6,[ax,ay]=xy(p.lat,p.lon);let chosen;
  const offsets=[[0,p.type==='country'?0:-h*.9]];for(let r=14;r<=230;r+=14){const n=Math.max(8,Math.round(2*Math.PI*r/18));for(let j=0;j<n;j++){const angle=j/n*2*Math.PI;offsets.push([Math.cos(angle)*r,Math.sin(angle)*r]);}}
  for(const [dx,dy] of offsets){const box={x:Math.min(ATLAS_WIDTH-w-2,Math.max(2,ax+dx-w/2)),y:Math.min(ATLAS_HEIGHT-h-2,Math.max(2,ay+dy-h/2)),w,h};if(!boxes.some(other=>intersects(box,other))){chosen=box;break;}}
  // No names are dropped: a rare dense island cluster uses a farther callout.
  if(!chosen){for(let y=20;y<ATLAS_HEIGHT-h;y+=h+5){for(let x=Math.max(2,ax-400);x<Math.min(ATLAS_WIDTH-w,ax+400);x+=w+6){const box={x,y,w,h};if(!boxes.some(other=>intersects(box,other))){chosen=box;break;}}if(chosen)break;}}
  if(!chosen)chosen={x:Math.max(2,ax-w/2),y:ay,w,h};boxes.push(chosen);labels.push({...p,size,scaleX,ax,ay,x:chosen.x+w/2,y:chosen.y+h/2,box:chosen});
 }return labels;
}
export function drawAtlas(ctx,image,mode='all',selected){ctx.drawImage(image,0,0,ATLAS_WIDTH,ATLAS_HEIGHT);ctx.lineWidth=.8;ctx.strokeStyle='#c9e0ed70';
 for(const c of countries)for(const ring of c.rings){ctx.beginPath();let prev;for(const [lon,lat] of ring){const [x,y]=xy(lat,lon);if(!prev||Math.abs(x-prev[0])>ATLAS_WIDTH/2)ctx.moveTo(x,y);else ctx.lineTo(x,y);prev=[x,y];}ctx.stroke();}
 const labels=labelLayout(ctx,mode,selected);
 for(const p of labels){const color=p.type==='country'?'#ffffff':p.type==='capital'?'#baffdd':'#ffd17d';if(Math.hypot(p.x-p.ax,p.y-p.ay)>p.size){ctx.strokeStyle=color+'b0';ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(p.ax,p.ay);ctx.lineTo(p.x,p.y);ctx.stroke();}
 if(p.type!=='country'){ctx.beginPath();ctx.fillStyle=color;ctx.arc(p.ax,p.ay,1.8,0,2*Math.PI);ctx.fill();}}
 for(const p of labels){ctx.save();ctx.translate(p.x,p.y);ctx.scale(p.scaleX,1);ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`${p.type==='country'?600:500} ${p.size}px sans-serif`;ctx.lineJoin='round';ctx.strokeStyle='#061421';ctx.lineWidth=p.type==='country'?3.6:3;ctx.strokeText(p.name,0,0);ctx.fillStyle=p.id===selected?.id?'#ff9fe1':p.type==='country'?'#fff':p.type==='capital'?'#baffdd':'#ffd17d';ctx.fillText(p.name,0,0);ctx.restore();}
 if(selected){const [x,y]=xy(selected.lat,selected.lon);ctx.strokeStyle='#ff9fe1';ctx.lineWidth=1.4;ctx.beginPath();ctx.arc(x,y,4,0,2*Math.PI);ctx.stroke();}return labels;
}
export async function atlasImage(image,mode,selected){await document.fonts.ready;const canvas=document.createElement('canvas');canvas.width=ATLAS_WIDTH;canvas.height=ATLAS_HEIGHT;const labels=drawAtlas(canvas.getContext('2d'),image,mode,selected);const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error('atlas encoding failed')),'image/jpeg',.95));return {bytes:new Uint8Array(await blob.arrayBuffer()),canvas,labels};}
