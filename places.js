import {countries} from './countries.js?v=7';
import {tourismData} from './tourism-data.js?v=7';
import {heritageData} from './heritage-data.js?v=7';
const capitals = [
['tokyo','東京','日本','Tokyo Japan Nippon とうきょう にほん','capital',35.6762,139.6503,'日本の首都。東アジア、日本列島の本州に位置します。'],
['seoul','ソウル','韓国','Seoul Korea そうる かんこく','capital',37.5665,126.9780,'朝鮮半島の北西部、漢江沿いに位置する首都。'],
['beijing','北京','中国','Beijing China ぺきん ちゅうごく','capital',39.9042,116.4074,'中国北部に位置する首都。故宮や天安門で知られます。'],
['bangkok','バンコク','タイ','Bangkok Thailand ばんこく','capital',13.7563,100.5018,'チャオプラヤー川沿いに広がるタイの首都。'],
['hanoi','ハノイ','ベトナム','Hanoi Vietnam はのい','capital',21.0278,105.8342,'ベトナム北部、紅河デルタに位置する首都。'],
['delhi','ニューデリー','インド','New Delhi India にゅーでりー','capital',28.6139,77.2090,'インド北部に位置する首都。'],
['singapore','シンガポール','シンガポール','Singapore しんがぽーる','capital',1.3521,103.8198,'マレー半島の南端に位置する都市国家。'],
['london','ロンドン','イギリス','London United Kingdom UK England ろんどん','capital',51.5074,-0.1278,'テムズ川沿いに位置するイギリスの首都。'],
['paris','パリ','フランス','Paris France ぱり','capital',48.8566,2.3522,'フランス北部、セーヌ川沿いに位置する首都。'],
['berlin','ベルリン','ドイツ','Berlin Germany べるりん','capital',52.5200,13.4050,'ドイツ北東部に位置する首都。'],
['rome','ローマ','イタリア','Rome Italy ろーま','capital',41.9028,12.4964,'イタリア半島中部に位置する首都。'],
['madrid','マドリード','スペイン','Madrid Spain まどりーど','capital',40.4168,-3.7038,'イベリア半島の中央部に位置するスペインの首都。'],
['athens','アテネ','ギリシャ','Athens Greece あてね','capital',37.9838,23.7275,'ギリシャ南部に位置する首都。'],
['moscow','モスクワ','ロシア','Moscow Russia もすくわ','capital',55.7558,37.6173,'ロシア西部、モスクワ川沿いに位置する首都。'],
['ankara','アンカラ','トルコ','Ankara Turkey Türkiye あんから','capital',39.9334,32.8597,'アナトリア半島の内陸部に位置するトルコの首都。'],
['cairo','カイロ','エジプト','Cairo Egypt かいろ','capital',30.0444,31.2357,'ナイル川沿いに位置するエジプトの首都。'],
['nairobi','ナイロビ','ケニア','Nairobi Kenya ないろび','capital',-1.2921,36.8219,'赤道のすぐ南、東アフリカの高原に位置する首都。'],
['rabat','ラバト','モロッコ','Rabat Morocco らばと','capital',34.0209,-6.8416,'アフリカ北西部、大西洋に面するモロッコの首都。'],
['washington','ワシントンD.C.','アメリカ','Washington DC United States USA 米国 わしんとん','capital',38.9072,-77.0369,'アメリカ東海岸、ポトマック川沿いに位置する首都。'],
['ottawa','オタワ','カナダ','Ottawa Canada おたわ','capital',45.4215,-75.6972,'オンタリオ州東部に位置するカナダの首都。'],
['mexico','メキシコシティ','メキシコ','Mexico City めきしこ','capital',19.4326,-99.1332,'メキシコ中央部の高原に位置する首都。'],
['brasilia','ブラジリア','ブラジル','Brasilia Brazil ぶらじりあ','capital',-15.7939,-47.8828,'ブラジル内陸部に建設された計画都市で、同国の首都。'],
['buenosaires','ブエノスアイレス','アルゼンチン','Buenos Aires Argentina ぶえのすあいれす','capital',-34.6037,-58.3816,'ラプラタ川の河口に面するアルゼンチンの首都。'],
['canberra','キャンベラ','オーストラリア','Canberra Australia きゃんべら','capital',-35.2809,149.1300,'シドニーとメルボルンの間の内陸部に位置する首都。'],
['wellington','ウェリントン','ニュージーランド','Wellington New Zealand うぇりんとん','capital',-41.2865,174.7762,'ニュージーランド北島の南端に位置する首都。'],
].map(([id,name,country,aliases,type,lat,lon,description])=>({id,name,country,aliases,type,lat,lon,description}));

const countryById=new Map(countries.map(c=>[c.id,c]));
const countryNames=ids=>ids.map(id=>countryById.get(id)?.name||id).join('・');
const kinds={ancient:'歴史のある場所',monument:'記念する建物',sacred:'お寺や教会など',beach:'海辺',waterfall:'滝',cave:'どうくつ',volcanic:'山や火山',natural:'自然の見どころ',tower:'タワー',structure:'建物や橋',castle:'お城',military:'歴史のある場所',abandoned:'昔の建物',macabre:'歴史のある場所',museum:'博物館',garden:'庭や公園',leisure:'楽しむ場所'};
export const attractions=tourismData.map(([qid,name,en,countryId,lat,lon,kind])=>({id:'tourist-'+qid,qid,name,en,countryId,country:countryNames([countryId]),aliases:en,type:'landmark',lat,lon,description:`${countryNames([countryId])}にある${kinds[kind]||'見どころ'}です。`,source:`https://www.wikidata.org/wiki/${qid}`}));
export const heritage=heritageData.map(([unescoId,name,en,countryIds,lat,lon,year,category,qid,components,coordinateSource])=>({id:'heritage-'+unescoId,unescoId,qid,name,en,countryIds,country:countryNames(countryIds),aliases:en,type:'heritage',lat,lon,year,category,components,coordinateSource,description:`${year}年に世界遺産に登録された${({Cultural:'文化遺産',Natural:'自然遺産',Mixed:'複合遺産'})[category]}です。${components>1?'いくつかの場所からなるため、代表の1か所を表示しています。':''}`,source:`https://whc.unesco.org/en/list/${unescoId}/`}));
export const points=[...capitals,...attractions,...heritage];
const readings={'日本':'にほん にっぽん','中国':'ちゅうごく','韓国':'かんこく','台湾':'たいわん','北朝鮮':'きたちょうせん','南アフリカ':'みなみあふりか','富士山':'ふじさん','清水寺':'きよみずでら','金閣寺':'きんかくじ','姫路城':'ひめじじょう','万里の長城':'ばんりのちょうじょう','エッフェル塔':'えっふぇるとう'};
export const places=[...countries.map(p=>({...p,type:'country',country:p.name,aliases:p.en,description:'国や地域の名前を表示する場所です。首都の場所とはちがいます。'})),...points];
export const normalize=s=>String(s).normalize('NFKC').toLowerCase().replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60)).replace(/[・\s.。ー\-]/g,'');
const searchIndex=new Map(places.map(p=>[p.id,normalize([p.name,p.country,p.aliases,readings[p.name]||'',...p.country.split('・').map(c=>readings[c]||'')].join(' '))]));
export function findPlaces(query='',type='all'){const q=normalize(query);return places.filter(p=>(type==='all'||p.type===type)&&searchIndex.get(p.id).includes(q));}
export function position(lat,lon,r=.15){const a=lat*Math.PI/180,b=lon*Math.PI/180;return [r*Math.cos(a)*Math.cos(b),r*Math.sin(a),-r*Math.cos(a)*Math.sin(b)];}
