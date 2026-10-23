import math,struct,json,pathlib
root=pathlib.Path(__file__).parent/'assets'; chunks=[]; views=[]; access=[]
def add(data,target=None):
 off=sum(map(len,chunks)); pad=(-len(data))%4; chunks.append(data+b'\0'*pad); v={'buffer':0,'byteOffset':off,'byteLength':len(data)}
 if target:v['target']=target
 views.append(v);return len(views)-1
def acc(data,typ,component,count,mn=None,mx=None):
 v=add(data,34963 if typ=='SCALAR' else 34962);a={'bufferView':v,'componentType':component,'count':count,'type':typ}
 if mn:a.update(min=mn,max=mx)
 access.append(a);return len(access)-1
p=[];n=[];uv=[];idx=[];w=128;h=64
for j in range(h+1):
 t=math.pi*j/h
 for i in range(w+1):
  a=2*math.pi*i/w;x=-math.sin(t)*math.cos(a);y=math.cos(t);z=math.sin(t)*math.sin(a)
  p.extend([x*.15,y*.15,z*.15]);n.extend([x,y,z]);uv.extend([i/w,j/h])
for j in range(h):
 for i in range(w):
  a=j*(w+1)+i;b=a+w+1;idx.extend([a,b,a+1,a+1,b,b+1])
f=lambda v:struct.pack('<%sf'%len(v),*v)
pa=acc(f(p),'VEC3',5126,len(p)//3,[-.15]*3,[.15]*3);na=acc(f(n),'VEC3',5126,len(n)//3);ua=acc(f(uv),'VEC2',5126,len(uv)//2);ia=acc(struct.pack('<%sH'%len(idx),*idx),'SCALAR',5123,len(idx));im=add((root/'earth.jpg').read_bytes())
g={'asset':{'version':'2.0','generator':'Earth AR'},'scene':0,'scenes':[{'nodes':[0]}],'nodes':[{'mesh':0}],'meshes':[{'primitives':[{'attributes':{'POSITION':pa,'NORMAL':na,'TEXCOORD_0':ua},'indices':ia,'material':0}]}],'materials':[{'pbrMetallicRoughness':{'baseColorTexture':{'index':0},'metallicFactor':0,'roughnessFactor':.85},'doubleSided':False}],'textures':[{'source':0}],'images':[{'bufferView':im,'mimeType':'image/jpeg'}],'buffers':[{'byteLength':sum(map(len,chunks))}],'bufferViews':views,'accessors':access}
s=json.dumps(g,separators=(',',':')).encode();s+=b' '*((-len(s))%4);b=b''.join(chunks);out=struct.pack('<III',0x46546c67,2,12+8+len(s)+8+len(b))+struct.pack('<II',len(s),0x4e4f534a)+s+struct.pack('<II',len(b),0x004e4942)+b;(root/'earth.glb').write_bytes(out)
