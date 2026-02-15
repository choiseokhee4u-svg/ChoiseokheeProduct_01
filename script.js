const KAKAO_API_KEY = '14302bcc718209aaa470793e426fbb2a';
if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) Kakao.init(KAKAO_API_KEY);
const P = {
    '甲': { mbti: 'ENTJ', base: "남 밑에선 죽어도 일 못 함. 본인이 다 맞다고 생각함. 똥고집 부리다가 망해도 '역시 내 탓이 아님' 시전. 근데 리더십은 있어서 다들 욕하면서 따라감.", love: "연애에서도 내가 리드해야 직성이 풀림. 데이트 코스? 당연히 내가 정함. 상대방 의견? '응 그래 근데 여기 가자'. 밀당 같은 거 안 함. 대신 본인도 엄청 퍼줌.", money: "돈 벌 줄은 아는데 쓸 줄도 앎. 큰 그림 그리다가 세금 폭탄 맞기도 함. 투자? 본인 판단 믿고 올인하는 타입. 성공하면 천재, 실패하면 빚더미.", work: "본인이 팀장 아니면 불만 터짐. 상사 밑에서 '예예' 하는 거 체질적으로 못함. 어차피 사업하거나 최소 임원 해야 함.", advice: "고집 좀 그만 부리세요. 남 말도 가끔 맞습니다." },
    '乙': { mbti: 'ISFP', base: "어디 던져도 살아남음. 강한 놈한텐 찰싹, 약한 놈한텐 쿨함. 멘탈 갈대긴 한데 뿌리가 콘크리트. 절대 안 죽음. 생존왕임.", love: "눈치로 밀당함. 상대방 반응 보면서 적절히 밀고 당기는데, 가끔 너무 눈치 봐서 지침. '뭐 먹고 싶어?' '아무거나~' 이러다 진짜 아무거나 시켜주면 삐침.", money: "실속파임. 티 안 나게 알뜰하게 모음. 세일이다 싶으면 일단 사재기. 근데 가끔 가성비에 눈 멀어서 필요 없는 것도 삼.", work: "적응력 甲. 어디서든 분위기 파악 빠름. 다만 승진 경쟁에선 밀릴 수 있음. 가끔 의견 좀 내세요.", advice: "여기저기 붙는 것도 능력인데 박쥐짓은 적당히." },
    '丙': { mbti: 'ESFP', base: "본인이 주인공 아니면 병 남. 칭찬하면 간 쓸개 빼줌. 오지랖 태평양. 근데 돌아서면 까먹음. 단순함 끝판왕.", love: "좋아하면 온 세상에 광고함. SNS에 럽스타 폭격. 질투도 화끈함. 관심 안 주면 '나 싫어해?' 집착 모드 돌입.", money: "번 만큼 씀. 통장이 롤러코스터. 허세 지출 많음. 남 보기 좋은 곳에 돈 씀. 카드값 폭탄 주의.", work: "발표, PT 체질임. 무대에서 빛남. 다만 팩트체크 안 하고 분위기로 가다가 털림. 디테일 좀 챙기세요.", advice: "남 신경 끌 시간에 본인 앞가림부터." },
    '丁': { mbti: 'INFJ', base: "겉은 천사, 속은 데스노트. 한번 삐지면 10년 뒤에 복수함. 새벽 감성 글 올리고 아침에 이불 킥.", love: "겉쿨속따. 표현 안 하는데 속으론 24시간 생각 중. 헌신형이라 퍼주는데 정작 표현 못해서 손해봄.", money: "꼼꼼히 모으는 스타일. 가계부 쓰고 예산 짬. 근데 좋아하는 사람한텐 지갑이 열림. 선물 폭탄.", work: "묵묵히 일하는데 티를 안 내서 공로 뺏김. 셀프 PR 좀 하세요. 가만히 있으면 아무도 몰라요.", advice: "혼자 소설 쓰지 말고 말로 하세요." },
    '戊': { mbti: 'ESTJ', base: "속을 알 수 없음. 좋은지 싫은지 말 안 함. 그냥 있음. 고집 전교 1등. 건드리면 산사태.", love: "안정적 연애 추구. 한번 사귀면 오래감. 근데 변화가 없어서 상대방 지루해함. 이벤트 좀 해요.", money: "안전한 재테크. 부동산, 적금 좋아함. 리스크 싫어함. 근데 좋은 기회도 귀찮아서 놓침.", work: "조직의 버팀목. 신뢰감 있음. 다만 변화에 느려서 뒤처질 수 있음. 새로운 거 배우세요.", advice: "표현 안 하면 아무도 몰라요. 말 좀 하세요." },
    '己': { mbti: 'ISFJ', base: "착한 척하는데 계산기 최강. 내 사람한텐 퍼주고 남이면 국물도 없음. 답정너.", love: "연애도 계산적. 손해 볼 연애 안 함. 근데 한번 진심 주면 올인. 그 진심까지 오래 걸림.", money: "돈 관리 신. 노후대비 완벽. 20대부터 연금 듦. 근데 너무 아껴서 인색해 보일 수 있음.", work: "실무 능력 좋음. 불필요한 일 안 함. 다만 티 안 내서 인정 못 받음. 어필하세요.", advice: "착한 척 적당히. 계산기 소리 다 들려요." },
    '庚': { mbti: 'ESTP', base: "입만 열면 팩폭. '살쪘어?'를 '건강 걱정돼서'로 포장. 뒤끝은 없는데 앞끝이 쩔어서 멘탈 가루 만듦.", love: "직진형. 좋으면 바로 고백. 밀당 없음. 근데 연애 중에도 직설적이라 상처 줌. 필터링 좀.", money: "한방 스타일. 크게 벌거나 크게 잃거나. 손절 타이밍 못 잡아서 고집 부리다 더 잃음.", work: "추진력 甲. 근데 상사랑 충돌 많음. 본인이 대장 해야 스트레스 안 받음. 창업 고려하세요.", advice: "그 입 좀 다무세요. 팩트가 다 정의는 아닙니다." },
    '辛': { mbti: 'INTP', base: "자기애 최강. 내가 제일 소중. 남이 건드리면 극혐. 칼날 같은 말투. 깔끔 떠는데 방은 더러움.", love: "이상형 기준 높음. 아무나 안 만남. 한번 빠지면 집착. 모든 것 체크함. 믿음 가지세요.", money: "꼼꼼 재테크. 포트폴리오 잘 짬. 근데 명품 좋아해서 자존심 소비도 있음.", work: "디테일 장인. 완성도 높음. 근데 완벽주의라 스트레스. 남 일에 간섭 말고 본인 일만.", advice: "남 지적 전에 거울부터. 님도 완벽 아님." },
    '壬': { mbti: 'ENTP', base: "머리 회전 빠름. 근데 잔머리. 스케일 크게 노는데 마무리 안 됨. 속을 모르겠는 음흉함이 매력.", love: "자유로운 연애. 구속하면 도망감. 썸만 100개. 진심 꽂히면 로맨틱한데 그게 언제일지 모름.", money: "스케일 큰 투자 좋아함. 근데 허황된 것도 많음. 친구 사업 투자하다 날리기도. 현실적으로.", work: "아이디어맨. 기획 기가 막힘. 근데 실행력 부족. 실행력 있는 파트너 찾으세요.", advice: "잔머리 굴리다 자기 꾀에 넘어갑니다." },
    '癸': { mbti: 'INFP', base: "망상으로 우주 정복. 실행력 제로. 감정 롤러코스터. 근데 아이디어는 미침. 천재성.", love: "머릿속으론 로맨틱 극치. 현실은 아무것도 안 함. 상상 속에서 연애하고 이별함. 움직이세요.", money: "전략은 잘 짜는데 실행 안 함. '이번 달부터 적금'하고 6개월째. 자동이체 걸어놓으세요.", work: "브레인스토밍 빛남. 근데 그 다음이 없음. 누가 끌어줘야 빛나는 타입.", advice: "생각 그만하고 일단 시작하세요." }
};
// Ten Gods (Ship-seong) Logic for Dynamic Fortune
const TEN_GODS = {
    'Bi-gyeon': { name: '비견(比肩)', keywords: ['자존감', '경쟁', '독립'], desc: '나와 같은 기운이 들어오는 시기입니다. 주관이 뚜렷해지고 자신감이 넘치지만, 고집이 세져 주변과 마찰이 생길 수 있습니다. 경쟁보다는 협력을 택하세요.' },
    'Geop-jae': { name: '겁재(劫財)', keywords: ['승부욕', '지출', '도전'], desc: '경쟁심이 불타오르는 시기입니다. 의외의 지출이나 손재수가 있을 수 있으니 지갑을 닫으세요. 하지만 승부수를 띄우기엔 좋은 날입니다.' },
    'Sik-sin': { name: '식신(食神)', keywords: ['표현', '여유', '먹을복'], desc: '의식주가 풍요로워지는 시기입니다. 창의력이 솟아나고 말솜씨가 좋아집니다. 맛있는 것을 먹거나 취미 생활을 즐기기에 완벽합니다.' },
    'Sang-gwan': { name: '상관(傷官)', keywords: ['언변', '반항', '아이디어'], desc: '기존의 틀을 깨고 싶은 욕구가 강해집니다. 톡톡 튀는 아이디어로 주목받지만, 말실수(구설수)를 조심해야 합니다.' },
    'Pyeon-jae': { name: '편재(偏財)', keywords: ['횡재수', '유흥', '큰돈'], desc: '예상치 못한 돈이 들어오거나 나갈 수 있는 시기입니다. 사업적 수완이 좋아지고 유흥을 즐기고 싶어집니다. 로또 한 장 사보세요!' },
    'Jeong-jae': { name: '정재(正財)', keywords: ['성실', '저축', '안정'], desc: '꼼꼼하고 현실적인 판단력이 좋아집니다. 차곡차곡 재물을 모으기에 좋습니다. 계획적인 소비와 투자가 빛을 발합니다.' },
    'Pyeon-gwan': { name: '편관(偏官)', keywords: ['책임', '스트레스', '카리스마'], desc: '책임감이 무거워지고 스트레스를 받을 수 있습니다. 하지만 난관을 극복하면 큰 명예를 얻을 수 있는 시기입니다. 건강 관리에 유의하세요.' },
    'Jeong-gwan': { name: '정관(正官)', keywords: ['승진', '명예', '원칙'], desc: '공명정대하고 바른 생활을 하게 되는 시기입니다. 직장에서능력을 인정받거나 합격운이 따릅니다. 원칙을 지키면 복이 옵니다.' },
    'Pyeon-in': { name: '편인(偏印)', keywords: ['직관', '눈치', '고독'], desc: '눈치가 빨라지고 직관력이 예리해집니다. 남들이 못 보는 것을 보지만, 생각이 너무 많아 우울해질 수도 있습니다. 명상이나 공부가 잘 됩니다.' },
    'Jeong-in': { name: '정인(正印)', keywords: ['인정', '학업', '귀인'], desc: '주변의 도움과 인정을 받는 사랑스러운 시기입니다. 문서운이 좋고 공부나 계약에 유리합니다. 윗사람에게 예쁨을 받습니다.' }
};

// Mapping: User's Element + Current Element -> Ten God
// [User Stem] -> { [Current Stem]: TenGodKey }
// Simplification for prototype: Mapping based on Element Relationship
// Same Element (Wood-Wood): Bi-gyeon/Geop-jae
// Generating Output (Wood-Fire): Sik-sin/Sang-gwan
// Being Controlled (Wood-Metal): Pyeon-gwan/Jeong-gwan
// Controlling (Wood-Earth): Pyeon-jae/Jeong-jae
// Generating Input (Wood-Water): Pyeon-in/Jeong-in
const REL_MAP = {
    same: ['Bi-gyeon', 'Geop-jae'],
    output: ['Sik-sin', 'Sang-gwan'],
    control_me: ['Pyeon-gwan', 'Jeong-gwan'],
    i_control: ['Pyeon-jae', 'Jeong-jae'],
    input: ['Pyeon-in', 'Jeong-in']
};
const E = { WOOD: { img: 'images/Wood.png', c: '#4ade80' }, FIRE: { img: 'images/Fire.png', c: '#f87171' }, EARTH: { img: 'images/Earth.png', c: '#fbbf24' }, METAL: { img: 'images/Metal.png', c: '#e2e8f0' }, WATER: { img: 'images/Water.png', c: '#60a5fa' } };
const EM = { '甲': 'WOOD', '乙': 'WOOD', '丙': 'FIRE', '丁': 'FIRE', '戊': 'EARTH', '己': 'EARTH', '庚': 'METAL', '辛': 'METAL', '壬': 'WATER', '癸': 'WATER', '寅': 'WOOD', '卯': 'WOOD', '巳': 'FIRE', '午': 'FIRE', '辰': 'EARTH', '戌': 'EARTH', '丑': 'EARTH', '未': 'EARTH', '申': 'METAL', '酉': 'METAL', '亥': 'WATER', '子': 'WATER' };
const LK = { WOOD: { c: '🌿 그린/민트', i: '식물, 동쪽 산책' }, FIRE: { c: '🔴 레드/퍼플', i: '캔들, 햇빛' }, EARTH: { c: '🟡 옐로우', i: '도자기' }, METAL: { c: '⚪ 화이트/실버', i: '쥬얼리' }, WATER: { c: '🔵 블랙/네이비', i: '물 많이 마시기' } };
// 천간→오행 / 상생상극 궁합
const STEM_EL = { '甲': 'WOOD', '乙': 'WOOD', '丙': 'FIRE', '丁': 'FIRE', '戊': 'EARTH', '己': 'EARTH', '庚': 'METAL', '辛': 'METAL', '壬': 'WATER', '癸': 'WATER' };
const GENERATING = { WOOD: 'WATER', FIRE: 'WOOD', EARTH: 'FIRE', METAL: 'EARTH', WATER: 'METAL' }; // 나를 도와주는
const OVERCOMING = { WOOD: 'METAL', FIRE: 'WATER', EARTH: 'WOOD', METAL: 'FIRE', WATER: 'EARTH' }; // 나를 극하는
const ELEMENT_STEM = { WOOD: '甲', FIRE: '丙', EARTH: '戊', METAL: '庚', WATER: '壬' };
const ELEMENT_COLORS = { WOOD: { bg: '#10b981', t: '#fff' }, FIRE: { bg: '#ef4444', t: '#fff' }, EARTH: { bg: '#eab308', t: '#1f2937' }, METAL: { bg: '#f8fafc', t: '#374151' }, WATER: { bg: '#1e1b4b', t: '#c4b5fd' } };
const ELEMENT_NAMES = { WOOD: '목(木)', FIRE: '화(火)', EARTH: '토(土)', METAL: '금(金)', WATER: '수(水)' };
let uName = '', fType = 'today', curDm = '', curPd = null, curTheme = 'base', gender = 'M';
let userMbti = ''; // Store tested MBTI
const trailCanvas = document.getElementById('trailCanvas'), tCtx = trailCanvas.getContext('2d'); let particles = [];
function resizeTrail() { trailCanvas.width = innerWidth; trailCanvas.height = innerHeight } resizeTrail(); addEventListener('resize', resizeTrail);
class Particle { constructor(x, y, b = false) { this.x = x; this.y = y; this.size = b ? Math.random() * 6 + 3 : Math.random() * 4 + 2; this.color = ['#00FFFF', '#E0B0FF', '#FFFFFF'][Math.floor(Math.random() * 3)]; this.alpha = 1; this.decay = b ? .03 : .02; const a = Math.random() * Math.PI * 2, s = b ? Math.random() * 4 + 2 : Math.random() + .5; this.vx = Math.cos(a) * s; this.vy = Math.sin(a) * s } update() { this.x += this.vx; this.y += this.vy; this.alpha -= this.decay; this.size *= .96 } draw() { tCtx.save(); tCtx.globalAlpha = this.alpha; tCtx.fillStyle = this.color; tCtx.shadowBlur = 15; tCtx.shadowColor = this.color; tCtx.beginPath(); tCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2); tCtx.fill(); tCtx.restore() } isAlive() { return this.alpha > 0 } }
function animateTrail() { tCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height); particles = particles.filter(p => p.isAlive()); particles.forEach(p => { p.update(); p.draw() }); requestAnimationFrame(animateTrail) } animateTrail();
let lastT = 0; document.addEventListener('mousemove', e => { const n = Date.now(); if (n - lastT > 30) { for (let i = 0; i < 3; i++)particles.push(new Particle(e.clientX, e.clientY)); lastT = n } });
document.addEventListener('touchstart', e => { const t = e.touches[0]; for (let i = 0; i < 15; i++)particles.push(new Particle(t.clientX, t.clientY, true)) });
document.querySelectorAll('.fortune-sel button').forEach(b => b.onclick = () => { document.querySelectorAll('.fortune-sel button').forEach(x => x.classList.remove('on')); b.classList.add('on'); fType = b.dataset.t; updateQuest() });
document.querySelectorAll('.gender-sel button').forEach(b => b.onclick = () => { document.querySelectorAll('.gender-sel button').forEach(x => x.classList.remove('on')); b.classList.add('on'); gender = b.dataset.g });
document.querySelectorAll('.tab-row button').forEach(b => b.onclick = () => { document.querySelectorAll('.tab-row button').forEach(x => x.classList.remove('on')); document.querySelectorAll('.tab-c').forEach(x => x.classList.remove('on')); b.classList.add('on'); document.getElementById('tab-' + b.dataset.tab).classList.add('on') });
document.querySelectorAll('.theme-tabs button').forEach(b => b.onclick = () => { document.querySelectorAll('.theme-tabs button').forEach(x => x.classList.remove('on')); b.classList.add('on'); curTheme = b.dataset.th; updateTheme() });
const yS = document.getElementById('selYear'), mS = document.getElementById('selMonth'), dS = document.getElementById('selDay'), hS = document.getElementById('selHour'), minS = document.getElementById('selMinute');
for (let y = new Date().getFullYear(); y >= 1920; y--)yS.innerHTML += `<option value="${y}">${y}</option>`;
for (let m = 1; m <= 12; m++)mS.innerHTML += `<option value="${m}">${m}월</option>`;
for (let d = 1; d <= 31; d++)dS.innerHTML += `<option value="${d}">${d}</option>`;
for (let h = 1; h <= 12; h++)hS.innerHTML += `<option value="${h}">${h}시</option>`;
for (let m = 0; m < 60; m++)minS.innerHTML += `<option value="${m}">${String(m).padStart(2, '0')}분</option>`;
document.getElementById('unknownTime').onchange = e => { const t = document.getElementById('timeInputs'); t.style.opacity = e.target.checked ? '.4' : '1'; t.style.pointerEvents = e.target.checked ? 'none' : 'auto' };
function updateTheme() { if (!curPd) return; const k = { base: 'base', love: 'love', money: 'money', work: 'work' }; document.getElementById('storyBox').innerHTML = curPd[k[curTheme]] || curPd.base; document.getElementById('adviceTxt').innerHTML = curPd.advice }
// Advanced Saju Logic: Modifiers (Extended)
const BRANCH_MODIFIERS = {
    '子': { k: '창의적', d: '생각이 깊고 비밀이 많음.', love: '상대방의 마음을 깊이 헤아리지만, 속마음을 잘 드러내지 않아 오해를 사기도 합니다.', money: '돈을 숨겨두는 재주가 있어 비상금을 잘 만듭니다.', work: '기획이나 아이디어 분야에서 두각을 나타냅니다.' },
    '丑': { k: '성실함', d: '묵묵히 자신의 길을 감.', love: '한번 사랑하면 끝까지 책임지려 하는 진국입니다. 다만 표현이 서툴 수 있습니다.', money: '꾸준히 저축하여 티끌 모아 태산으로 부자가 됩니다.', work: '반복적인 일도 끈기 있게 해내어 신뢰를 얻습니다.' },
    '寅': { k: '활동적', d: '추진력이 강하고 리더십 있음.', love: '좋아하면 앞뒤 안 가리고 직진하는 불도저 스타일입니다.', money: '큰 돈을 벌 기회를 잘 포착하지만, 씀씀이도 큽니다.', work: '새로운 프로젝트를 시작하는 데 탁월한 능력이 있습니다.' },
    '卯': { k: '섬세함', d: '다정하고 인정이 많음.', love: '상대방을 세심하게 챙겨주는 로맨티시스트입니다.', money: '실속 있게 돈을 잘 굴리며, 낭비를 싫어합니다.', work: '디테일을 요하는 일이나 사람을 상대하는 일에 능합니다.' },
    '辰': { k: '이상적', d: '포부가 크고 꿈을 쫓음.', love: '영화 같은 로맨스를 꿈꾸며, 상대방에게 멋진 모습을 보여주려 합니다.', money: '스케일이 큰 투자를 좋아하며, 대박을 노립니다.', work: '리더십이 있고 조직을 이끄는 힘이 있습니다.' },
    '巳': { k: '현실적', d: '계산이 빠르고 실속을 챙김.', love: '상대의 조건과 현실적인 면을 꼼꼼히 따져보고 만납니다.', money: '정보 수집 능력이 뛰어나 재테크에 밝습니다.', work: '일처리가 빠르고 정확하며, 협상에 능합니다.' },
    '午': { k: '열정적', d: '화려하고 나서기를 좋아함.', love: '화려하고 열정적인 연애를 즐기며, 인기 만점입니다.', money: '폼생폼사라 돈을 시원하게 쓰지만, 버는 능력도 좋습니다.', work: '주목받는 일을 좋아하며, 홍보나 영업에서 빛을 발합니다.' },
    '未': { k: '온화함', d: '참을성이 많으나 고집 있음.', love: '따뜻하게 감싸주지만, 은근히 고집이 세서 꺾지 않습니다.', money: '안전한 자산을 선호하며, 확실하지 않으면 지갑을 열지 않습니다.', work: '사람들과의 조화를 중시하며, 중재자 역할을 잘합니다.' },
    '申': { k: '다재다능', d: '임기응변이 뛰어나고 재주가 많음.', love: '유머러스하고 재치 있어 이성에게 인기가 많습니다.', money: '다양한 수단으로 돈을 벌며, 수단이 좋습니다.', work: '문제 해결 능력이 뛰어나 어떤 상황에서도 살아남습니다.' },
    '酉': { k: '예리함', d: '완벽주의적이고 깔끔함.', love: '눈이 높고 까다롭지만, 내 사람에게는 완벽하게 잘해줍니다.', money: '10원 한 장도 허투루 쓰지 않는 꼼꼼한 관리자입니다.', work: '전문성이 필요한 일이나 분석적인 업무에 적합합니다.' },
    '戌': { k: '충직함', d: '신의를 지키고 방어적임.', love: '한 사람만 바라보는 해바라기 같은 연애를 합니다.', money: '재물을 지키는 능력이 탁월하여 돈이 잘 새지 않습니다.', work: '책임감이 강하여 맡은 일은 반드시 완수합니다.' },
    '亥': { k: '지혜로움', d: '포용력이 넓고 유연함.', love: '모든 것을 이해해주고 받아주는 바다 같은 마음씨를 가졌습니다.', money: '먹을 복이 있어 살면서 돈 걱정은 크게 안 합니다.', work: '통찰력이 있어 큰 흐름을 읽는 일에 능합니다.' }
};

const SEASON_MODIFIERS = {
    '寅': '초봄의', '卯': '봄의', '辰': '늦봄의',
    '巳': '초여름의', '午': '여름의', '未': '늦여름의',
    '申': '초가을의', '酉': '가을의', '戌': '늦가을의',
    '亥': '초겨울의', '子': '겨울의', '丑': '늦겨울의'
};

function getDetailedPersonality(stem, branch, monthBranch) {
    const base = P[stem] || P['甲'];
    const brMod = BRANCH_MODIFIERS[branch] || { k: '', d: '' };
    const season = SEASON_MODIFIERS[monthBranch] || '계절의';

    // Construct dynamic personality text
    return {
        summary: `${season} ${brMod.d}`,
        desc: `당신은 <strong>${season} 에너지</strong>를 타고난 <strong>${stem}(${ELEMENT_NAMES[EM[stem]]})</strong>입니다.<br>
                       ${brMod.d} 성향(${brMod.k})이 더해져, ${base.base.split('.')[0]} 특징이 있습니다.`
    };
}

function updateQuest() {
    if (!curDm) return;
    // Calculate Ten Gods
    const now = new Date();
    let targetStem = '';
    let timeLabel = '';

    // Using Solar/Lunar library to get current stems
    // Note: In real app, consider strict lunar calendar logic. Here using simple conversion.
    const s = Solar.fromYmd(now.getFullYear(), now.getMonth() + 1, now.getDate());
    const l = s.getLunar();
    const bz = l.getEightChar();

    if (fType === 'today') {
        targetStem = bz.getDayGan().toString();
        timeLabel = "오늘의 운세";
    } else if (fType === 'week') {
        // Saju doesn't have 'week', using Month Stem (Wol-un) as proxy for short-term flow
        targetStem = bz.getMonthGan().toString();
        timeLabel = "이번 달(주간) 운세";
    } else {
        targetStem = bz.getYearGan().toString();
        timeLabel = "올해의 운세";
    }

    // Determine Relationship
    const uEl = STEM_EL[curDm]; // User Element
    const tEl = STEM_EL[targetStem]; // Target Element (Time)

    let relType = '';

    // Simplification: Standard 10 Gods Logic
    // 1. Compare Element (Same, Output, Wealth, Control, Input)
    // 2. Compare Polarity (Yin/Yang)

    if (uEl === tEl) relType = 'same';
    else if (GENERATING[uEl] === tEl) relType = 'output'; // I generate -> Output (Sik-Sang)
    else if (OVERCOMING[uEl] === tEl) relType = 'i_control'; // I overcome -> Wealth (Jae-Seong)
    else if (OVERCOMING[tEl] === uEl) relType = 'control_me'; // It overcomes me -> Officer (Gwan-Seong)
    else if (GENERATING[tEl] === uEl) relType = 'input'; // It generates me -> Resource (In-Seong)

    // Polarity Check
    const isYang = (s) => ['甲', '丙', '戊', '庚', '壬'].includes(s);
    const samePol = isYang(curDm) === isYang(targetStem);

    const godKey = REL_MAP[relType][samePol ? 0 : 1];
    const god = TEN_GODS[godKey];

    document.getElementById('questTxt').innerHTML = `
                <span style="font-size:0.9rem; color:var(--cyan); display:block; margin-bottom:4px;">[${timeLabel}: ${god.name}]</span>
                ${god.desc}<br>
                <span style="font-size:0.8rem; color:var(--txt2); margin-top:6px; display:block;">🔑 키워드: ${god.keywords.join(', ')}</span>
             `;
}
function analyze() { uName = document.getElementById('userName').value.trim() || '익명'; let y, mo, d, h, mi; const tab = document.querySelector('.tab-row button.on').dataset.tab; if (tab === 'quick') { const v = document.getElementById('quickDate').value.trim(); if (!/^\d{8}$/.test(v)) { alert('8자리 숫자로 입력!'); return } y = +v.slice(0, 4); mo = +v.slice(4, 6); d = +v.slice(6, 8) } else { y = +yS.value; mo = +mS.value; d = +dS.value } if (mo < 1 || mo > 12 || d < 1 || d > 31) { alert('날짜 확인!'); return } if (document.getElementById('unknownTime').checked) { h = 12; mi = 0 } else { const ap = document.getElementById('selAmpm').value; let hh = +hS.value; mi = +minS.value; if (ap === 'PM' && hh !== 12) hh += 12; if (ap === 'AM' && hh === 12) hh = 0; h = hh } document.getElementById('inputSection').style.display = 'none'; document.getElementById('loading').style.display = 'flex'; setTimeout(() => { try { if (typeof Solar === 'undefined') throw new Error('Solar library not loaded'); calc(y, mo, d, h, mi) } catch (e) { console.error(e); alert('죄송합니다. 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.'); location.reload() } finally { document.getElementById('loading').style.display = 'none' } }, 1500) }
function calc(y, mo, d, h, mi) {
    const s = Solar.fromYmdHms(y, mo, d, h, mi, 0), l = s.getLunar(), bz = l.getEightChar();
    const yG = bz.getYearGan().toString(), yZ = bz.getYearZhi().toString();
    const mG = bz.getMonthGan().toString(), mZ = bz.getMonthZhi().toString();
    const dG = bz.getDayGan().toString(), dZ = bz.getDayZhi().toString();
    const tG = bz.getTimeGan().toString(), tZ = bz.getTimeZhi().toString();
    const p = [yG, yZ, mG, mZ, dG, dZ, tG, tZ];
    const cnt = { WOOD: 0, FIRE: 0, EARTH: 0, METAL: 0, WATER: 0 };
    p.forEach(c => { const e = EM[c]; if (e) cnt[e]++ });
    curDm = dG;
    const basePd = P[curDm] || P['甲'];
    const brMod = BRANCH_MODIFIERS[dZ] || { k: '', d: '', love: '', money: '', work: '' };
    // Merge Base + Modifier for Dynamic Tabs
    curPd = {
        base: basePd.base + "<br><br>👉 <strong>지지의 영향 (" + dZ + "):</strong> " + brMod.d,
        love: basePd.love + "<br><br>💖 <strong>연애 스타일:</strong> " + brMod.love,
        money: basePd.money + "<br><br>💰 <strong>재물 운용:</strong> " + brMod.money,
        work: basePd.work + "<br><br>💼 <strong>직업/사회:</strong> " + brMod.work,
        advice: basePd.advice,
        mbti: basePd.mbti
    };
    // 만세력 4기둥 렌더링
    const pillars = [
        { label: '시주', stem: tG, branch: tZ },
        { label: '일주', stem: dG, branch: dZ },
        { label: '월주', stem: mG, branch: mZ },
        { label: '년주', stem: yG, branch: yZ }
    ];
    let pillarsHTML = '';
    pillars.forEach(pil => {
        const sEl = EM[pil.stem] || 'EARTH', bEl = EM[pil.branch] || 'EARTH';
        const sC = ELEMENT_COLORS[sEl], bC = ELEMENT_COLORS[bEl];
        pillarsHTML += `<div class="pillar"><span class="pillar-label">${pil.label}</span><div class="stem" style="background:${sC.bg};color:${sC.t}">${pil.stem}</div><div class="branch" style="background:${bC.bg};color:${bC.t}">${pil.branch}</div></div>`;
    });
    document.getElementById('pillarsBox').innerHTML = pillarsHTML;
    document.getElementById('pillarsBox').innerHTML = pillarsHTML;

    // Generate Dynamic Message
    const detail = getDetailedPersonality(dG, dZ, mZ);
    document.getElementById('sajuMsg').innerHTML = `당신의 사주를 분석한 결과, 타고난 기질은 <strong>${detail.summary} ${ELEMENT_NAMES[EM[dG]]}</strong>입니다.`;
    // Also update the main text box with richer description if needed, or keep the specific 'storyBox' updated
    // For now, let's update the 'storyBox' content dynamically too? 
    // Actually, let's inject the dynamic description into the intro message for maximum effect.
    document.getElementById('sajuMsg').innerHTML += `<br><span style="font-size:0.9rem; color:var(--txt2); font-weight:normal; display:block; margin-top:8px;">${detail.desc}</span>`;
    // 궁합: 상생상극
    const myEl = STEM_EL[curDm] || 'WOOD';
    const bestEl = GENERATING[myEl], worstEl = OVERCOMING[myEl];
    const bestStem = ELEMENT_STEM[bestEl], worstStem = ELEMENT_STEM[worstEl];
    const bestMbti = P[bestStem]?.mbti || 'ENTP', worstMbti = P[worstStem]?.mbti || 'ESTP';
    document.getElementById('bestMatch').innerHTML = `${bestStem} (${bestMbti}) - ${ELEMENT_NAMES[bestEl]}의 기운`;
    document.getElementById('worstMatch').innerHTML = `${worstStem} (${worstMbti}) - ${ELEMENT_NAMES[worstEl]}의 기운`;
    // 기존 결과 표시
    let mn = 9, wk = 'WATER';
    for (const [k, v] of Object.entries(cnt)) if (v < mn) { mn = v; wk = k }
    document.getElementById('result').style.display = 'block';
    ['n0', 'n1', 'n2', 'n3'].forEach(id => document.getElementById(id).innerText = uName);
    document.getElementById('soulC').innerText = curDm;
    document.getElementById('soulT').innerText = curPd.mbti;
    // document.getElementById('mbtiBadge').innerText = curPd.mbti; // Removed: element does not exist
    document.getElementById('genderBadge').innerText = gender === 'M' ? '🙋‍♂️ 남자 (양)' : '🙋‍♀️ 여자 (음)';
    curTheme = 'base';
    document.querySelectorAll('.theme-tabs button').forEach((b, i) => b.classList.toggle('on', i === 0));
    updateTheme();
    const ch = document.getElementById('statChart'); ch.innerHTML = '';
    ['WOOD', 'FIRE', 'EARTH', 'METAL', 'WATER'].forEach(k => {
        const e = E[k], c = cnt[k], pc = (c / 8) * 100;
        ch.innerHTML += `<div class="stat-row"><img src="${e.img}" alt="${ELEMENT_NAMES[k]}"><div class="stat-track"><div class="stat-fill" style="background:${e.c}" data-w="${pc}%"></div></div><span class="stat-n">${c}</span></div>`;
    });
    setTimeout(() => document.querySelectorAll('.stat-fill').forEach(b => b.style.width = b.dataset.w), 100);
    const lk = LK[wk], le = E[wk];
    const genderTip = gender === 'M' ? '행동력을 높여보세요' : '직관을 믿어보세요';
    document.getElementById('luckBox').innerHTML = `<div class="luck-dot" style="background:${le.c};color:${le.c}"></div><div class="luck-info"><strong>${lk.c}</strong><span>${lk.i} | ${genderTip}</span></div>`;
    updateQuest(); // Initial update

    // Trigger Mini Popup after a delay
    setTimeout(() => {
        if (!userMbti && document.getElementById('result').style.display === 'block') {
            const popup = document.getElementById('mbtiMiniPopup');
            popup.classList.add('show');
        }
    }, 3500); // Show popup after 3.5s reading time

    // MBTI 비교 표시 (Logic Refined) : UI Simplified
    document.getElementById('sajuMbti').innerHTML = `${curDm}`;

    // Comparison Text Logic for Modal (Future use) & Soul Text
    if (userMbti) {
        let cTxt = "";
        if (curPd.mbti === userMbti) {
            cTxt = "<br><span style='font-size:0.85rem; color:var(--cyan); font-weight:700'>😲 소름! 본캐랑 부캐가 똑같네요!</span><br><span style='font-size:0.75rem; color:var(--txt2)'>타고난 대로 잘 살고 계시군요.</span>";
        } else {
            const diffCount = (curPd.mbti[0] !== userMbti[0]) + (curPd.mbti[1] !== userMbti[1]) + (curPd.mbti[2] !== userMbti[2]) + (curPd.mbti[3] !== userMbti[3]);
            if (diffCount >= 3) {
                cTxt = `<br><span style='font-size:0.85rem; color:var(--pink); font-weight:700'>😱 헐! 타고난 거랑 완전 딴판인데요?</span><br><span style='font-size:0.75rem; color:var(--txt2)'>사회생활 하느라 고생이 많으시네요..</span>`;
            } else {
                cTxt = `<br><span style='font-size:0.85rem; color:var(--yellow); font-weight:700'>🤔 음.. 현실 타협 좀 하셨군요?</span><br><span style='font-size:0.75rem; color:var(--txt2)'>타고난 성향(${curPd.mbti})과 조금 다르네요.</span>`;
            }
        }
        document.getElementById('soulT').innerHTML = cTxt;

    } else {
        // Reset comparison text
        document.getElementById('soulT').innerHTML = "";
    }
}

// MBTI Test Logic
const questions = [
    { t: "EI", q: "친구가 갑자기 '지금 나와!'라고 한다면?", a: [{ t: "E", v: "오 꿀잼ㅋ 바로 나감" }, { t: "I", v: "아... 기 빨리는데 핑계 댈까?" }] },
    { t: "EI", q: "파티에서 모르는 사람이 말을 걸면?", a: [{ t: "E", v: "오 반가워요! (바로 인스타 맞팔)" }, { t: "I", v: "(어색한 미소) 아 예... (도망갈 각 잰다)" }] },
    { t: "EI", q: "일주일 동안 집 밖에 안 나가기 가능?", a: [{ t: "E", v: "절대 불가. 벽이랑 대화할 듯" }, { t: "I", v: "천국 아님? 넷플릭스 정주행 개꿀" }] },

    { t: "SN", q: "멍 때릴 때 무슨 생각 해?", a: [{ t: "S", v: "배고프다, 저녁 뭐 먹지" }, { t: "N", v: "좀비가 나타나면 어디로 튀지?" }] },
    { t: "SN", q: "여행 갈 때 계획은?", a: [{ t: "S", v: "맛집 리스트, 동선 체크 완벽" }, { t: "N", v: "일단 가서 느낌 오는 대로~" }] }, // This is actually J/P usually but fitting S/N context of concrete vs abstract
    { t: "SN", q: "영화를 볼 때 더 중요한 건?", a: [{ t: "S", v: "배우 연기, 영상미, 현실 고증" }, { t: "N", v: "숨겨진 의미, 감독의 메시지, 세계관" }] },

    { t: "TF", q: "친구가 차 사고 났다고 전화하면?", a: [{ t: "T", v: "보험 불렀어? 다친 덴 없고?" }, { t: "F", v: "헐 괜찮아??! 많이 놀랐지 ㅠㅠ" }] },
    { t: "TF", q: "친구가 '나 우울해서 머리 잘랐어'라고 하면?", a: [{ t: "T", v: "얼마 줬어? 잘 어울리네" }, { t: "F", v: "무슨 일 있었어? 왜 우울해 ㅠㅠ" }] },
    { t: "TF", q: "회의 중 내 의견이 반박당하면?", a: [{ t: "T", v: "아 그런가? 논리적으로 맞네 (수긍)" }, { t: "F", v: "아... (마상 입음, 집 가서 이불킥)" }] },

    { t: "JP", q: "2주 뒤 여행, 지금 내 상태는?", a: [{ t: "J", v: "숙소 예약 완료, 엑셀로 일정 정리 중" }, { t: "P", v: "비행기 표는 끊었나? 아 몰라 그때 가서" }] },
    { t: "JP", q: "책상 위 상태는?", a: [{ t: "J", v: "각 잡혀 있음. 물건 제자리" }, { t: "P", v: "카오스 그 자체. 근데 어디 뭐 있는진 앎" }] },
    { t: "JP", q: "약속 시간 1시간 전, 친구가 '30분 늦을 듯'이라 한다면?", a: [{ t: "J", v: "아... 내 계획 다 꼬이는데 (짜증)" }, { t: "P", v: "오 개꿀ㅋ 나도 천천히 가야지" }] }
];

let qIdx = 0;
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

const MBTI_DESC = {
    'ISTJ': "현실주의자 그 자체. 약속 시간 1분 늦으면 손절각. 겉으론 꼰대 같아 보이지만 책임감 하나는 우주 최강. 계획 틀어지면 고장남.",
    'ISFJ': "착한 척하는데 속으로 욕하고 있음. 남 챙겨주는 척하면서 내 사람 챙김. 뒤끝 쩔어서 3년 전 일도 기억함.",
    'INFJ': "겉으론 웃는데 속으론 인류 멸망 시나리오 씀. 남 눈치 보느라 피곤함. 도덕적인 척하지만 속으론 제일 음흉할 수도.",
    'INTJ': "인간 혐오자. 멍청한 사람 보면 화남. 혼자 있는 게 제일 좋음. 계획한 대로 안 되면 세상 무너짐.",
    'ISTP': "만사가 귀찮음. 효율충. 남한테 관심 없음. 영혼 없다는 소리 자주 들음. 근데 뭐 하나 꽂히면 무서움.",
    'ISFP': "침대 성애자. 약속 취소되면 기뻐함. 착한데 우유부단함. 거절 못해서 호구 잡힘. 갬성 충만.",
    'INFP': "망상 전문가. 유리 멘탈. 혼자 있는 거 좋은데 외로운 건 싫음. 착한데 가끔 흑화하면 무서움.",
    'INTP': "논리왕. 말싸움하면 절대 안 짐. 공감 능력 제로. 팩폭 하다가 친구 다 떠나감. 방구석 아인슈타인.",
    'ESTP': "스릴 중독자. 내일은 없다. 일단 저지르고 봄. 말이 행동보다 빠름. 팩폭러. 남 눈치 안 봄.",
    'ESFP': "관종 그 자체. 사람 만나는 게 에너지 충전. 분위기 메이커. 진지한 거 딱 질색. 카드값 폭탄 주의.",
    'ENFP': "댕댕이 인간형. 리액션 혜자. 금사빠. 감정 기복 롤러코스터. 머릿속에 꽃밭 있음. 뒷마무리 안 됨.",
    'ENTP': "논쟁 즐기는 변태. 남 골탕 먹이는 거 좋아함. 아이디어 뱅크. 고집 셈. 자기애 폭발.",
    'ESTJ': "젊은 꼰대. 일 중독자. 감정팔이 극혐. 리더 하고 싶어 함. 잔소리 대마왕. 융통성 제로.",
    'ESFJ': "오지랖 대마왕. 남 챙기는 게 낙. 칭찬 안 해주면 삐짐. 뒷담화 좋아함. 분위기 못 맞추면 못 참음.",
    'ENFJ': "평화주의자. 남들 싸우면 말려야 함. 오글거리는 멘트 장인. 멘탈 약함. 남 돕다가 내 코가 석자.",
    'ENTJ': "독재자 기질. 일 못하는 사람 극혐. 목표 달성 위해선 수단 방법 안 가림. 워커홀릭. 공감 능력 부족."
};

function startMbtiTest() {
    // 정보 입력 확인 Logic 추가
    const name = document.getElementById('userName').value.trim();
    if (!name) {
        alert('이름을 먼저 입력해주세요! 😅');
        document.getElementById('userName').focus();
        return;
    }

    const tab = document.querySelector('.tab-row button.on').dataset.tab;
    let isValidDate = false;

    if (tab === 'quick') {
        const v = document.getElementById('quickDate').value.trim();
        if (/^\d{8}$/.test(v)) {
            isValidDate = true;
        }
    } else {
        // Detail tab validation generally assumed valid via selects, but good to check context
        isValidDate = true;
    }

    if (!isValidDate) {
        alert('생년월일을 먼저 입력해주세요! 📅');
        if (tab === 'quick') document.getElementById('quickDate').focus();
        return;
    }

    // 모든 정보가 있으면 테스트 시작
    document.getElementById('mbtiModal').style.display = 'flex';
    qIdx = 0;
    scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    showQuestion();
}

function closeMbtiTest() {
    if (confirm('테스트를 그만두시겠습니까? 기록은 저장되지 않습니다.')) {
        document.getElementById('mbtiModal').style.display = 'none';
    }
}

function showQuestion() {
    const q = questions[qIdx];
    const qBox = document.getElementById('qBox');
    document.getElementById('qNum').innerText = `${qIdx + 1} / ${questions.length}`;
    document.getElementById('mbtiBar').style.width = `${((qIdx + 1) / questions.length) * 100}%`;

    qBox.innerHTML = `
                <div class="q-card">
                    <p class="q-text">${q.q}</p>
                    <button class="opt-btn" onclick="answer('${q.a[0].t}')">A. ${q.a[0].v}</button>
                    <button class="opt-btn" onclick="answer('${q.a[1].t}')">B. ${q.a[1].v}</button>
                </div>
            `;
}

function answer(type) {
    scores[type]++;
    qIdx++;
    if (qIdx < questions.length) {
        showQuestion();
    } else {
        finishTest();
    }
}

function finishTest() {
    const r =
        (scores.E >= scores.I ? 'E' : 'I') +
        (scores.S >= scores.N ? 'S' : 'N') +
        (scores.T >= scores.F ? 'T' : 'F') +
        (scores.J >= scores.P ? 'J' : 'P');
    userMbti = r;
    document.getElementById('mbtiModal').style.display = 'none';

    // Show Result Modal
    const desc = MBTI_DESC[r] || "알 수 없는 유형";
    let compMsg = "";

    if (curPd) {
        const sajuM = curPd.mbti;
        if (sajuM) {
            if (sajuM === r) {
                compMsg = `😲 <strong>소름!</strong> 타고난 운명(${sajuM})과 현재 성격이 완벽하게 일치합니다! 본캐와 부캐가 하나시네요.`;
            } else {
                compMsg = `🤔 타고난 운명은 <strong>${sajuM}</strong>인데, 실제로는 <strong>${r}</strong>로 살고 계시네요! 사회생활 하느라 성격이 좀 바뀌셨나요?`;
            }
        }
    } else {
        compMsg = "사주 결과를 먼저 보면 비교 분석도 해드려요!";
    }

    document.getElementById('resMbtiTitle').innerText = r;
    document.getElementById('resMbtiDesc').innerText = desc;
    document.getElementById('resCompareTxt').innerHTML = compMsg;
    document.getElementById('mbtiResultModal').style.display = 'flex';

    // Update Main Result View if visible
    if (document.getElementById('result').style.display === 'block') {
        analyze();
    }
}

function closeMbtiResult() {
    document.getElementById('mbtiResultModal').style.display = 'none';
}
function shareKakao() { if (typeof Kakao === 'undefined' || !Kakao.isInitialized()) { alert('카카오 SDK 초기화 필요'); return } Kakao.Share.sendDefault({ objectType: 'feed', content: { title: `${uName}님의 영혼 캐릭터는 [${curDm}]!`, description: curPd ? curPd.mbti + ' - ' + curPd.base.slice(0, 40) + '...' : '사주 분석 해보세요!', imageUrl: 'https://choiseokhee4u-svg.github.io/Saju_TheMoon/images/Fire.png', link: { mobileWebUrl: 'https://choiseokhee4u-svg.github.io/Saju_TheMoon/', webUrl: 'https://choiseokhee4u-svg.github.io/Saju_TheMoon/' } }, buttons: [{ title: '내 운명 확인하기', link: { mobileWebUrl: 'https://choiseokhee4u-svg.github.io/Saju_TheMoon/', webUrl: 'https://choiseokhee4u-svg.github.io/Saju_TheMoon/' } }] }) }
