let isScriptDataLoaded = false;
document.addEventListener('scriptDataLoaded', () => {
    isScriptDataLoaded = true;
    initScript();
});

function initScript() {

// Dynamic data will be loaded into these global variables by script_data.js
// P_DATA, TEN_GODS_DATA, BRANCH_MODIFIERS_DATA, SEASON_MODIFIERS_DATA, LK_DATA, ELEMENT_NAMES_DATA

const REL_MAP = {
    same: ['Bi-gyeon', 'Geop-jae'],
    output: ['Sik-sin', 'Sang-gwan'],
    control_me: ['Pyeon-gwan', 'Jeong-gwan'],
    i_control: ['Pyeon-jae', 'Jeong-jae'],
    input: ['Pyeon-in', 'Jeong-in']
};
const E = { WOOD: { img: '🌳', c: '#4ade80' }, FIRE: { img: '🔥', c: '#f87171' }, EARTH: { img: '⛰️', c: '#fbbf24' }, METAL: { img: '🔔', c: '#e2e8f0' }, WATER: { img: '🌊', c: '#60a5fa' } };
const EM = { '甲': 'WOOD', '乙': 'WOOD', '丙': 'FIRE', '丁': 'FIRE', '戊': 'EARTH', '己': 'EARTH', '庚': 'METAL', '辛': 'METAL', '壬': 'WATER', '癸': 'WATER', '寅': 'WOOD', '卯': 'WOOD', '巳': 'FIRE', '午': 'FIRE', '辰': 'EARTH', '戌': 'EARTH', '丑': 'EARTH', '未': 'EARTH', '申': 'METAL', '酉': 'METAL', '亥': 'WATER', '子': 'WATER' };
const STEM_EL = { '甲': 'WOOD', '乙': 'WOOD', '丙': 'FIRE', '丁': 'FIRE', '戊': 'EARTH', '己': 'EARTH', '庚': 'METAL', '辛': 'METAL', '壬': 'WATER', '癸': 'WATER' };
const GENERATING = { WOOD: 'WATER', FIRE: 'WOOD', EARTH: 'FIRE', METAL: 'EARTH', WATER: 'METAL' };
const OVERCOMING = { WOOD: 'METAL', FIRE: 'WATER', EARTH: 'WOOD', METAL: 'FIRE', WATER: 'EARTH' };
const ELEMENT_STEM = { WOOD: '甲', FIRE: '丙', EARTH: '戊', METAL: '庚', WATER: '壬' };
const ELEMENT_COLORS = { WOOD: { bg: '#10b981', t: '#fff' }, FIRE: { bg: '#ef4444', t: '#fff' }, EARTH: { bg: '#eab308', t: '#1f2937' }, METAL: { bg: '#f8fafc', t: '#374151' }, WATER: { bg: '#1e1b4b', t: '#c4b5fd' } };


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

function updateTheme() {
    if (!curPd) return;
    const k = { base: 'base', love: 'love', money: 'money', work: 'work' };
    document.getElementById('storyBox').innerHTML = curPd[k[curTheme]] || curPd.base;
    document.getElementById('adviceTxt').innerHTML = curPd.advice;
}

function getDetailedPersonality(stem, branch, monthBranch) {
    const base = P_DATA[stem] || P_DATA['甲'];
    const brMod = BRANCH_MODIFIERS_DATA[branch] || { k: '', d: '' };
    const season = SEASON_MODIFIERS_DATA[monthBranch] || translations.season_default; // Use translated default
    return {
        summary: `${season} ${brMod.d}`,
        desc: `너는 <strong>${season} ${translations.energy_text}</strong>를 타고난 <strong>${stem}(${ELEMENT_NAMES_DATA[EM[stem]]})</strong>일세.<br> ${brMod.d} ${translations.tendency_text}(${brMod.k})이 더해져, ${base.base.split('.')[0]} ${translations.characteristics_text}이니 참고하게.`
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
        timeLabel = translations.today_oracle; // Use translated string
    } else if (fType === 'week') {
        targetStem = bz.getMonthGan().toString();
        timeLabel = translations.week_oracle; // Use translated string
    } else {
        targetStem = bz.getYearGan().toString();
        timeLabel = translations.year_oracle; // Use translated string
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
    document.getElementById('questTxt').innerHTML = `<span style="font-size:0.9rem; color:var(--cyan); display:block; margin-bottom:4px;">[${timeLabel}: ${god.name}]</span> ${god.desc}<br> <span style="font-size:0.8rem; color:var(--txt2); margin-top:6px; display:block;">🔑 ${translations.keywords_text}: ${god.keywords.join(', ')}</span>`;
}

function analyze() {
    if (!isScriptDataLoaded) {
        alert(translations.alert_loading_data); // Use translated message
        return;
    }

    uName = document.getElementById('userName').value.trim() || translations.default_name; // Use translated default name
    let y, mo, d, h, mi;
    const tab = document.querySelector('.tab-row button.on').dataset.tab;
    if (tab === 'quick') {
        const v = document.getElementById('quickDate').value.trim();
        if (!/^\d{8}$/.test(v)) { alert(translations.alert_birthdate_format); return }
        y = +v.slice(0, 4); mo = +v.slice(4, 6); d = +v.slice(6, 8);
    } else {
        y = +yS.value; mo = +mS.value; d = +dS.value;
    }
    if (mo < 1 || mo > 12 || d < 1 || d > 31) { alert(translations.alert_invalid_date); return }
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
            alert(translations.alert_analysis_error);
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
        base: basePd.base + `<br><br>👉 <strong>${translations.underfoot_energy_text} (${dZ}):</strong> ` + brMod.d, // Use translated string
        love: basePd.love + `<br><br>💖 <strong>${translations.love_fortune_text}:</strong> ` + brMod.love, // Use translated string
        money: basePd.money + `<br><br>💰 <strong>${translations.wealth_flow_text}:</strong> ` + brMod.money, // Use translated string
        work: basePd.work + `<br><br>💼 <strong>${translations.career_honor_text}:</strong> ` + brMod.work, // Use translated string
        advice: basePd.advice
    };
    const pillars = [
        { label: translations.pillar_label_time, stem: tG, branch: tZ }, // Use translated string
        { label: translations.pillar_label_day, stem: dG, branch: dZ },   // Use translated string
        { label: translations.pillar_label_month, stem: mG, branch: mZ }, // Use translated string
        { label: translations.pillar_label_year, stem: yG, branch: yZ }    // Use translated string
    ];
    let pillarsHTML = '';
    pillars.forEach(pil => {
        const sEl = EM[pil.stem] || 'EARTH', bEl = EM[pil.branch] || 'EARTH';
        const sC = ELEMENT_COLORS[sEl], bC = ELEMENT_COLORS[bEl];
        pillarsHTML += `<div class="pillar"><span class="pillar-label">${pil.label}</span><div class="stem" style="background:${sC.bg};color:${sC.t}">${pil.stem}</div><div class="branch" style="background:${bC.bg};color:${bC.t}">${bC.t ? pil.branch : ''}</div></div>`;
    });
    document.getElementById('pillarsBox').innerHTML = pillarsHTML;
    const detail = getDetailedPersonality(dG, dZ, mZ);
    document.getElementById('sajuMsg').innerHTML = detail.desc;
    const myEl = STEM_EL[curDm] || 'WOOD';
    const bestEl = GENERATING[myEl], worstEl = OVERCOMING[myEl];
    const bestStem = ELEMENT_STEM[bestEl], worstStem = ELEMENT_STEM[worstEl];
    document.getElementById('bestMatch').innerHTML = `${bestStem} ${translations.stem_text} - ${ELEMENT_NAMES_DATA[bestEl]}${translations.element_energy_text}`; // Use translated strings
    document.getElementById('worstMatch').innerHTML = `${worstStem} ${translations.stem_text} - ${ELEMENT_NAMES_DATA[worstEl]}${translations.element_energy_text}`; // Use translated strings
    let mn = 9, wk = 'WATER';
    for (const [k, v] of Object.entries(cnt)) if (v < mn) { mn = v; wk = k }
    ['n0', 'n1', 'n2', 'n3'].forEach(id => document.getElementById(id).innerText = uName);
    
    document.querySelector('.hero .sec-title').innerHTML = `✨ <span class="nm" id="n1">${uName}</span>${translations.soul_body_text}`; // Use translated string
    document.getElementById('soulC').innerText = curDm;
    document.getElementById('soulT').innerText = "";
    document.getElementById('genderBadge').innerText = gender === 'M' ? translations.gender_male_text : translations.gender_female_text; // Use translated strings
    curTheme = 'base';
    document.querySelectorAll('.theme-tabs button').forEach((b, i) => b.classList.toggle('on', i === 0));
    updateTheme();
    
    const statCard = document.getElementById('statChart').parentElement;
    statCard.querySelector('.sec-title').innerHTML = `📜 <span class="nm" id="n2">${uName}</span>${translations.five_elements_text}`; // Use translated string
    
    const ch = document.getElementById('statChart'); ch.innerHTML = '';
    ['WOOD', 'FIRE', 'EARTH', 'METAL', 'WATER'].forEach(k => {
        const e = E[k], c = cnt[k], pc = (c / 8) * 100;
        ch.innerHTML += `<div class="stat-row"><span class="element-icon">${e.img}</span><div class="stat-track"><div class="stat-fill" style="background:${e.c}" data-w="${pc}%"></div></div><span class="stat-n">${c}</span></div>`;
    });
    setTimeout(() => document.querySelectorAll('.stat-fill').forEach(b => b.style.width = b.dataset.w), 100);
    const lk = LK_DATA[wk], le = E[wk];
    const genderTip = gender === 'M' ? translations.male_luck_tip : translations.female_luck_tip; // Use translated strings
    document.getElementById('luckBox').innerHTML = `<div class="luck-dot" style="background:${le.c};color:${le.c}"></div><div class="luck-info"><strong>${lk.c}</strong><span>${lk.i} | ${genderTip}</span></div>`;
    updateQuest();
    document.getElementById('sajuMbti').innerHTML = `${curDm}`;
    document.getElementById('soulT').innerHTML = ``;
}
function shareKakao() {
    if (typeof Kakao === 'undefined' || !Kakao.isInitialized()) {
        alert(translations.alert_kakao_sdk_error);
        return;
    }
    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: `${translations.kakao_share_title_prefix} ${uName}${translations.kakao_share_title_suffix}`,
            description: `${translations.kakao_share_desc_prefix} [${curDm}]${translations.kakao_share_desc_suffix}`,
            imageUrl: 'https://choiseokhee4u-svg.github.io/ChoiseokheeProduct_01/images/Fire.png',
            link: {
                mobileWebUrl: 'https://choiseokhee4u-svg.github.io/ChoiseokheeProduct_01/',
                webUrl: 'https://choiseokhee4u-svg.github.io/ChoiseokheeProduct_01/'
            }
        },
        buttons: [
            {
                title: translations.kakao_share_button_title,
                link: {
                    mobileWebUrl: 'https://choiseokheesite01.github.io/ChoiseokheeProduct_01/',
                    webUrl: 'https://choiseokheesite01.github.io/ChoiseokheeProduct_01/'
                }
            }
        ]
    });
}

window.addEventListener('scroll', () => {
    const indicator = document.querySelector('.scroll-down-indicator');
    if (indicator) {
        indicator.style.opacity = '0';
    }
}, { once: true });

function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert(translations.alert_link_copied);
    }).catch(err => {
        console.error('클립보드 복사 실패:', err);
        alert(translations.alert_link_copy_failed);
    });
}
