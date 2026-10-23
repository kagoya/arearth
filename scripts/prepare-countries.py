"""Usage: python scripts/prepare-countries.py downloaded-ne_50m_admin_0_countries.geojson"""
import json,sys,pathlib,math
src=json.load(open(sys.argv[1]));out=[]
def simplify(ring,tol=.08):
 if len(ring)<=4:return ring
 # Radial-distance reduction retains small islands and important bends.
 keep=[ring[0]]
 for p in ring[1:-1]:
  if math.hypot(p[0]-keep[-1][0],p[1]-keep[-1][1])>=tol:keep.append(p)
 keep.append(ring[-1]);return keep if len(keep)>=4 else ring
for f in src['features']:
 p=f['properties'];geo=f['geometry'];polys=geo['coordinates'] if geo['type']=='MultiPolygon' else [geo['coordinates']]
 common={'CHN':'中国','KOR':'韓国','PRK':'北朝鮮','TWN':'台湾','USA':'アメリカ','THA':'タイ','MNG':'モンゴル','ZAF':'南アフリカ'}
 out.append(dict(id='country-'+p['ADM0_A3'].lower(),name=common.get(p['ADM0_A3'],p['NAME_JA'] or p['NAME_EN']),en=p['NAME_EN'],lat=p['LABEL_Y'],lon=p['LABEL_X'],rank=p['LABELRANK'],rings=[[[round(v,3) for v in pt] for pt in simplify(poly[0])] for poly in polys]))
pathlib.Path('countries.js').write_text('// Natural Earth 1:50m Admin 0 Countries, public domain.\n// https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-0-countries-2/\nexport const countries='+json.dumps(out,ensure_ascii=False,separators=(',',':'))+';\n')
print(len(out),'country/region labels')
