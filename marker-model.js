// Bake all names into the Earth's surface image. No floating pins or nameplates:
// all labels survive USDZ export as part of the StandardMaterial's base texture.
export function makeSurfaceGlobe(base,jpeg){
 const dv=new DataView(base),jl=dv.getUint32(12,true),g=JSON.parse(new TextDecoder().decode(new Uint8Array(base,20,jl))),oldLength=dv.getUint32(20+jl,true),old=new Uint8Array(base,28+jl,oldLength),texture=new Uint8Array(Math.ceil(jpeg.byteLength/4)*4);texture.set(jpeg);
 const view=g.bufferViews.length;g.bufferViews.push({buffer:0,byteOffset:oldLength,byteLength:jpeg.byteLength});g.images=[{bufferView:view,mimeType:'image/jpeg'}];g.textures=[{source:0}];g.materials[0].pbrMetallicRoughness.baseColorTexture={index:0};g.buffers[0].byteLength=oldLength+texture.length;
 const json=new TextEncoder().encode(JSON.stringify(g)),jsonLength=Math.ceil(json.length/4)*4,total=28+jsonLength+oldLength+texture.length,out=new Uint8Array(total),head=new DataView(out.buffer);head.setUint32(0,0x46546c67,true);head.setUint32(4,2,true);head.setUint32(8,total,true);head.setUint32(12,jsonLength,true);head.setUint32(16,0x4e4f534a,true);out.fill(32,20,20+jsonLength);out.set(json,20);head.setUint32(20+jsonLength,oldLength+texture.length,true);head.setUint32(24+jsonLength,0x004e4942,true);out.set(old,28+jsonLength);out.set(texture,28+jsonLength+oldLength);return out;
}
