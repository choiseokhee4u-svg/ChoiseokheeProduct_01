const KAKAO_API_KEY = '14302bcc718209aaa470793e426fbb2a';
if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) Kakao.init(KAKAO_API_KEY);

// Dynamically loaded script data (P_DATA, TEN_GODS_DATA, etc.) will be available here

const E = { WOOD: { img: '🌳', c: '#4ade80' }, FIRE: { img: '🔥', c: '#f87171' }, EARTH: { img: '⛰️', c: '#fbbf24' }, METAL: { img: '🔔', c: '#e2e8f0' }, WATER: { img: '🌊', c: '#60a5fa' } };
const EM = { '甲': 'WOOD', '乙': 'WOOD', '丙': 'FIRE', '丁': 'FIRE', '戊': 'EARTH', '己': 'EARTH', '庚': 'METAL', '辛': 'METAL', '壬': 'WATER', '癸': 'WATER', '寅': 'WOOD', '卯': 'WOOD', '巳': 'FIRE', '午': 'FIRE', '辰': 'EARTH', '戌': 'EARTH', '丑': 'EARTH', '未': 'EARTH', '申': 'METAL', '酉': 'METAL', '亥': 'WATER', '子': 'WATER' };

let uName = '', fType = 'today', curDm = '', curPd = null, curTheme = 'base', gender = 'M', userInput = {};
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


function getDetailedPersonality(stem, branch, monthBranch) {
    const base = P_DATA[stem] || P_DATA['甲'];
    const brMod = BRANCH_MODIFIERS_DATA[branch] || { k: '', d: '' };
    const season = SEASON_MODIFIERS_DATA[monthBranch] || '계절의';
    return {
        summary: `${season} ${brMod.d}`,
        desc: `너는 <strong>${season} 에너지</strong>를 타고난 <strong>${stem}(${ELEMENT_NAMES_DATA[EM[stem]]})</strong>일세.<br> ${brMod.d} 성향(${brMod.k})이 더해져, ${base.base.split('.')[0]} 특징이 보이니 참고하게.`
    };
}

function updateQuest() {
    if (!curDm) return;
    const now = new Date();
    let targetStem = '';
    let timeLabel = '';
    const s = Solar.fromYmd(now.getFullYear(), now.getMonth() + 1, now.getDate());
    const l = s.getLunar();
    const bz = l.getEightChar();
    if (fType === 'today') {
        targetStem = bz.getDayGan().toString();
        timeLabel = "오늘의 신탁";
    } else if (fType === 'week') {
        targetStem = bz.getMonthGan().toString();
        timeLabel = "이번 주 신탁";
    } else {
        targetStem = bz.getYearGan().toString();
        timeLabel = "올해의 신탁";
    }
    const uEl = STEM_EL[curDm];
    const tEl = STEM_EL[targetStem];
    let relType = '';
    if (uEl === tEl) relType = 'same';
    else if (GENERATING[uEl] === tEl) relType = 'output';
    else if (OVERCOMING[uEl] === tEl) relType = 'i_control';
    else if (OVERCOMING[tEl] === uEl) relType = 'control_me';
    else if (GENERATING[tEl] === uEl) relType = 'input';
    const isYang = (s) => ['甲', '丙', '戊', '庚', '壬'].includes(s);
    const samePol = isYang(curDm) === isYang(targetStem);
    const godKey = REL_MAP[relType][samePol ? 0 : 1];
    const god = TEN_GODS_DATA[godKey];
    document.getElementById('questTxt').innerHTML = `<span style="font-size:0.9rem; color:var(--cyan); display:block; margin-bottom:4px;">[${timeLabel}: ${god.name}]</span> ${god.desc}<br> <span style="font-size:0.8rem; color:var(--txt2); margin-top:6px; display:block;">🔑 새겨들을 단어: ${god.keywords.join(', ')}</span>`;
}

function analyze() {
    uName = document.getElementById('userName').value.trim() || '애동';
    let y, mo, d, h, mi;
    const tab = document.querySelector('.tab-row button.on').dataset.tab;
    if (tab === 'quick') {
        const v = document.getElementById('quickDate').value.trim();
        if (!/^\d{8}$/.test(v)) { alert('생년월일 8자를 바르게 입력해야지!'); return }
        y = +v.slice(0, 4); mo = +v.slice(4, 6); d = +v.slice(6, 8);
    } else {
        y = +yS.value; mo = +mS.value; d = +dS.value;
    }
    if (mo < 1 || mo > 12 || d < 1 || d > 31) { alert('날짜가 이상하구나. 다시 보아라.'); return }
    if (document.getElementById('unknownTime').checked) {
        h = 12; mi = 0;
    } else {
        const ap = document.getElementById('selAmpm').value;
        let hh = +hS.value;
        mi = +minS.value;
        if (ap === 'PM' && hh !== 12) hh += 12;
        if (ap === 'AM' && hh === 12) hh = 0;
        h = hh;
    }
    
    document.getElementById('inputSection').style.display = 'none';
    document.getElementById('loading').style.display = 'flex';
    
    setTimeout(() => {
        try {
            if (typeof Solar === 'undefined') throw new Error('Solar library not loaded');
            calc(y, mo, d, h, mi);
            document.getElementById('loading').style.display = 'none';
            document.getElementById('result').style.display = 'block';
            window.scrollTo(0, 0);
        } catch (e) {
            console.error(e);
            document.getElementById('loading').style.display = 'none';
            alert('신령님께서 노하셨다. 잠시 후 다시 시도해 보거라.');
            location.reload();
        }
    }, 1000);
}

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
    const basePd = P_DATA[curDm] || P_DATA['甲'];
    const brMod = BRANCH_MODIFIERS_DATA[dZ] || { k: '', d: '', love: '', money: '', work: '' };
    curPd = {
        base: basePd.base + "<br><br>👉 <strong>네 발 밑의 기운 (" + dZ + "):</strong> " + brMod.d,
        love: basePd.love + "<br><br>💖 <strong>애정의 향방:</strong> " + brMod.love,
        money: basePd.money + "<br><br>💰 <strong>재물의 흐름:</strong> " + brMod.money,
        work: basePd.work + "<br><br>💼 <strong>세상살이와 명예:</strong> " + brMod.work,
        advice: basePd.advice
    };
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
    const detail = getDetailedPersonality(dG, dZ, mZ);
    document.getElementById('sajuMsg').innerHTML = detail.desc;
    const myEl = STEM_EL[curDm] || 'WOOD';
    const bestEl = GENERATING[myEl], worstEl = OVERCOMING[myEl];
    const bestStem = ELEMENT_STEM[bestEl], worstStem = ELEMENT_STEM[worstEl];
    document.getElementById('bestMatch').innerHTML = `${bestStem} 일간 - ${ELEMENT_NAMES_DATA[bestEl]}의 기운을 가진 사람`;
    document.getElementById('worstMatch').innerHTML = `${worstStem} 일간 - ${ELEMENT_NAMES_DATA[worstEl]}의 기운을 가진 사람`;
    let mn = 9, wk = 'WATER';
    for (const [k, v] of Object.entries(cnt)) if (v < mn) { mn = v; wk = k }
    ['n0', 'n1', 'n2', 'n3'].forEach(id => document.getElementById(id).innerText = uName);
    
    document.querySelector('.hero .sec-title').innerHTML = `✨ <span class="nm" id="n1">${uName}</span>님의 신령님이 점지한 너의 본체`;
    document.getElementById('soulC').innerText = curDm;
    document.getElementById('soulT').innerText = "";
    document.getElementById('genderBadge').innerText = gender === 'M' ? '🙋‍♂️ 남자 (양)' : '🙋‍♀️ 여자 (음)';
    curTheme = 'base';
    document.querySelectorAll('.theme-tabs button').forEach((b, i) => b.classList.toggle('on', i === 0));
    updateTheme();
    
    const statCard = document.getElementById('statChart').parentElement;
    statCard.querySelector('.sec-title').innerHTML = `📜 <span class="nm" id="n2">${uName}</span>님의 신령님이 내려주신 오행 기운`;
    
    const ch = document.getElementById('statChart'); ch.innerHTML = '';
    ['WOOD', 'FIRE', 'EARTH', 'METAL', 'WATER'].forEach(k => {
        const e = E[k], c = cnt[k], pc = (c / 8) * 100;
        ch.innerHTML += `<div class="stat-row"><span class="element-icon">${e.img}</span><div class="stat-track"><div class="stat-fill" style="background:${e.c}" data-w="${pc}%"></div></div><span class="stat-n">${c}</span></div>`;
    });
    setTimeout(() => document.querySelectorAll('.stat-fill').forEach(b => b.style.width = b.dataset.w), 100);
    const lk = LK_DATA[wk], le = E[wk];
    const genderTip = gender === 'M' ? '스스로 길을 개척해야 복이 온다' : '주변의 도움을 귀하게 여겨야 복이 온다';
    document.getElementById('luckBox').innerHTML = `<div class="luck-dot" style="background:${le.c};color:${le.c}"></div><div class="luck-info"><strong>${lk.c}</strong><span>${lk.i} | ${genderTip}</span></div>`;
    updateQuest();
    document.getElementById('sajuMbti').innerHTML = `${curDm}`;
    document.getElementById('soulT').innerHTML = ``;
}
function shareKakao() { if (typeof Kakao === 'undefined' || !Kakao.isInitialized()) { alert('카카오 SDK 초기화 필요'); return } Kakao.Share.sendDefault({ objectType: 'feed', content: { title: `[용한점집 달의 신당] ${uName}님에게 신령님이 내린 점괘`, description: `타고난 운명은 [${curDm}]... 과연 그 뜻은?`, imageUrl: 'https://choiseokhee4u-svg.github.io/ChoiseokheeProduct_01/images/Fire.png', link: { mobileWebUrl: 'https://choiseokhee4u-svg.github.io/ChoiseokheeProduct_01/', webUrl: 'https://choiseokhee4u-svg.github.io/ChoiseokheeProduct_01/' } }, buttons: [{ title: '내 점괘 확인하기', link: { mobileWebUrl: 'https://choiseokhee4u-svg.github.io/ChoiseokheeProduct_01/', webUrl: 'https://choiseokhee4u-svg.github.io/ChoiseokheeProduct_01/' } }] }) }

window.addEventListener('scroll', () => {
    const indicator = document.querySelector('.scroll-down-indicator');
    if (indicator) {
        indicator.style.opacity = '0';
    }
}, { once: true });

function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert("링크가 복사되었습니다!");
    }).catch(err => {
        console.error('클립보드 복사 실패:', err);
        alert("링크 복사에 실패했습니다.");
    });
}
