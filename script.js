window.isScriptDataLoaded = false;

function onScriptDataLoaded() {
    window.isScriptDataLoaded = true;
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkShareParams);
    } else {
        checkShareParams();
    }
}

// Initialize Time/Date Options immediately
function initOptions() {
    const yS = document.getElementById('selYear'), mS = document.getElementById('selMonth'), dS = document.getElementById('selDay'), hS = document.getElementById('selHour'), minS = document.getElementById('selMinute');

    // Clear previous if any
    if (yS) yS.innerHTML = ''; if (mS) mS.innerHTML = ''; if (dS) dS.innerHTML = ''; if (hS) hS.innerHTML = ''; if (minS) minS.innerHTML = '';

    for (let y = new Date().getFullYear(); y >= 1920; y--) if (yS) yS.innerHTML += `<option value="${y}">${y}</option>`;
    for (let m = 1; m <= 12; m++) if (mS) mS.innerHTML += `<option value="${m}">${m}월</option>`;
    for (let d = 1; d <= 31; d++) if (dS) dS.innerHTML += `<option value="${d}">${d}</option>`;

    const phS = document.getElementById('partnerHour');
    if (phS) phS.innerHTML = '';
    for (let h = 1; h <= 12; h++) {
        const opt = `<option value="${h}">${h}시</option>`;
        if (hS) hS.innerHTML += opt;
        if (phS) phS.innerHTML += opt;
    }

    const pmS = document.getElementById('partnerMinute');
    if (pmS) pmS.innerHTML = '';
    for (let m = 0; m < 60; m++) {
        const o = `<option value="${m}">${String(m).padStart(2, '0')}분</option>`;
        if (minS) minS.innerHTML += o;
        if (pmS) pmS.innerHTML += o;
    }

    const ut = document.getElementById('unknownTime');
    if (ut) ut.onchange = e => {
        const t = document.getElementById('timeInputs');
        if (t) {
            t.style.opacity = e.target.checked ? '.4' : '1';
            t.style.pointerEvents = e.target.checked ? 'none' : 'auto';
        }
    };

    const put = document.getElementById('partnerUnknownTime');
    if (put) put.onchange = e => {
        const sel = document.querySelector('#partnerInput .grid-2-1');
        if (sel) {
            sel.style.opacity = e.target.checked ? '.4' : '1';
            sel.style.pointerEvents = e.target.checked ? 'none' : 'auto';
        }
    };

    // Reveal body
    document.body.classList.add('loaded');
}

// Register initOptions FIRST so it runs before checkShareParams
document.addEventListener('DOMContentLoaded', initOptions);

// Check if data is already loaded (sync)
if (window.P_DATA) {
    onScriptDataLoaded();
} else {
    // Wait for event (async)
    document.addEventListener('scriptDataLoaded', onScriptDataLoaded);
}

// Global Variables
let uName = '', fType = 'today', curDm = '', curPd = null, curTheme = 'base', gender = 'M', userInput = {};

// Global Variables for Partner
let pGender = 'M';

// Constants
const REL_MAP = {
    same: ['Bi-gyeon', 'Geop-jae'],
    output: ['Sik-sin', 'Sang-gwan'],
    control_me: ['Pyeon-gwan', 'Jeong-gwan'],
    i_control: ['Pyeon-jae', 'Jeong-jae'],
    input: ['Pyeon-in', 'Jeong-in']
};
const E = {
    WOOD: { img: 'images/icon_wood.svg', c: '#4ade80' },
    FIRE: { img: 'images/icon_fire.svg', c: '#f87171' },
    EARTH: { img: 'images/icon_earth.svg', c: '#fbbf24' },
    METAL: { img: 'images/icon_metal.svg', c: '#e2e8f0' },
    WATER: { img: 'images/icon_water.svg', c: '#60a5fa' }
};
const EM = { '甲': 'WOOD', '乙': 'WOOD', '丙': 'FIRE', '丁': 'FIRE', '戊': 'EARTH', '己': 'EARTH', '庚': 'METAL', '辛': 'METAL', '壬': 'WATER', '癸': 'WATER', '寅': 'WOOD', '卯': 'WOOD', '巳': 'FIRE', '午': 'FIRE', '辰': 'EARTH', '戌': 'EARTH', '丑': 'EARTH', '未': 'EARTH', '申': 'METAL', '酉': 'METAL', '亥': 'WATER', '子': 'WATER' };
const STEM_EL = { '甲': 'WOOD', '乙': 'WOOD', '丙': 'FIRE', '丁': 'FIRE', '戊': 'EARTH', '己': 'EARTH', '庚': 'METAL', '辛': 'METAL', '壬': 'WATER', '癸': 'WATER' };
const GENERATING = { WOOD: 'WATER', FIRE: 'WOOD', EARTH: 'FIRE', METAL: 'EARTH', WATER: 'METAL' };
const OVERCOMING = { WOOD: 'METAL', FIRE: 'WATER', EARTH: 'WOOD', METAL: 'FIRE', WATER: 'EARTH' };
const ELEMENT_STEM = { WOOD: '甲', FIRE: '丙', EARTH: '戊', METAL: '庚', WATER: '壬' };
const ELEMENT_COLORS = { WOOD: { bg: '#10b981', t: '#fff' }, FIRE: { bg: '#ef4444', t: '#fff' }, EARTH: { bg: '#eab308', t: '#1f2937' }, METAL: { bg: '#f8fafc', t: '#374151' }, WATER: { bg: '#1e1b4b', t: '#c4b5fd' } };
const CHARACTER_TITLES = {
    '甲': { emoji: '🐯', title: '숲속의 호랑이', desc: '어디를 가든 대장! 카리스마 넘치는 리더' },
    '乙': { emoji: '🐱', title: '들판의 고양이', desc: '유연하고 다정하지만 강인한 생존력' },
    '丙': { emoji: '🦁', title: '초원의 사자', desc: '화려하고 당당! 모든 시선을 사로잡는 주인공' },
    '丁': { emoji: '🦊', title: '달빛의 여우', desc: '영리하고 신비로운 매력의 소유자' },
    '戊': { emoji: '🐻', title: '산중의 곰', desc: '듬직하고 믿음직! 자타공인 든든한 존재' },
    '己': { emoji: '🐰', title: '달토끼', desc: '따뜻하고 인정 많은 다정다감의 화신' },
    '庚': { emoji: '🦅', title: '하늘의 독수리', desc: '의리의 전사! 불의를 보면 참지 못하는 정의파' },
    '辛': { emoji: '🦢', title: '보석 위의 백조', desc: '우아하고 완벽주의! 세련된 감각의 소유자' },
    '壬': { emoji: '🐲', title: '깊은 바다의 용', desc: '자유롭고 창의적! 끝없는 가능성의 소유자' },
    '癸': { emoji: '🦌', title: '새벽의 사슴', desc: '순수하고 감성적! 보이지 않는 곳을 비추는 빛' }
};
const LUCKY_ITEMS = {
    WOOD: { color: '🟢 초록', number: 3, direction: '동쪽', food: '녹색 채소/샐러드', action: '산책하기 🌳', colorHex: '#4ade80' },
    FIRE: { color: '🔴 빨강', number: 7, direction: '남쪽', food: '매콤한 음식/커피', action: '햇볕 쬐기 ☀️', colorHex: '#f87171' },
    EARTH: { color: '🟡 노랑', number: 5, direction: '중앙', food: '고구마/견과류', action: '맨발 걷기 🏞️', colorHex: '#fbbf24' },
    METAL: { color: '⚪ 흰색', number: 9, direction: '서쪽', food: '배/무/요거트', action: '심호흡하기 🧘', colorHex: '#e2e8f0' },
    WATER: { color: '🔵 파랑', number: 1, direction: '북쪽', food: '해산물/검은콩', action: '물 많이 마시기 💧', colorHex: '#60a5fa' }
};


// Event Listeners (Global)
function initEventListeners() {
    document.querySelectorAll('.fortune-sel button').forEach(b => b.onclick = () => { document.querySelectorAll('.fortune-sel button').forEach(x => x.classList.remove('on')); b.classList.add('on'); fType = b.dataset.t; updateQuest() });
    document.querySelectorAll('.gender-sel button').forEach(b => b.onclick = () => { document.querySelectorAll('.gender-sel button').forEach(x => x.classList.remove('on')); b.classList.add('on'); gender = b.dataset.g });

    // Partner Gender Selection
    const pGenderBtns = document.querySelectorAll('#partnerGenderSel button');
    if (pGenderBtns.length > 0) {
        pGenderBtns.forEach(b => b.onclick = () => {
            pGenderBtns.forEach(x => x.classList.remove('on'));
            b.classList.add('on');
            pGender = b.dataset.g;
        });
    }

    document.querySelectorAll('.tab-row button').forEach(b => b.onclick = () => { document.querySelectorAll('.tab-row button').forEach(x => x.classList.remove('on')); document.querySelectorAll('.tab-c').forEach(x => x.classList.remove('on')); b.classList.add('on'); document.getElementById('tab-' + b.dataset.tab).classList.add('on') });
    document.querySelectorAll('.theme-tabs button').forEach(b => b.onclick = () => { document.querySelectorAll('.theme-tabs button').forEach(x => x.classList.remove('on')); b.classList.add('on'); curTheme = b.dataset.th; updateTheme() });
}
document.addEventListener('DOMContentLoaded', initEventListeners);

// Functions
function updateTheme() {
    if (!curPd) return;
    const k = { base: 'base', love: 'love', money: 'money', work: 'work' };
    document.getElementById('storyBox').innerHTML = curPd[k[curTheme]] || curPd.base;
    document.getElementById('adviceTxt').innerHTML = curPd.advice;
}

function getDetailedPersonality(stem, branch, monthBranch) {
    const base = window.P_DATA[stem] || window.P_DATA['甲'];
    const brMod = window.BRANCH_MODIFIERS_DATA[branch] || { k: '', d: '' };
    const season = window.SEASON_MODIFIERS_DATA[monthBranch] || window.translations.season_default;
    return {
        summary: `${season} ${brMod.d}`,
        desc: (() => {
            let desc = window.translations.desc_template_1
                .replace('{season}', season)
                .replace('{energy}', window.translations.energy_text)
                .replace('{stem}', stem)
                .replace('{element}', window.ELEMENT_NAMES_DATA[EM[stem]]);

            let desc2 = window.translations.desc_template_2
                .replace('{branch_desc}', brMod.d)
                .replace('{tendency}', window.translations.tendency_text)
                .replace('{branch_keyword}', brMod.k)
                .replace('{base_desc}', base.base.split('.')[0])
                .replace('{characteristics}', window.translations.characteristics_text);

            return desc + desc2;
        })()
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
        timeLabel = window.translations.today_oracle;
    } else if (fType === 'week') {
        targetStem = bz.getMonthGan().toString();
        timeLabel = window.translations.week_oracle;
    } else {
        targetStem = bz.getYearGan().toString();
        timeLabel = window.translations.year_oracle;
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
    const god = window.TEN_GODS_DATA[godKey];
    document.getElementById('questTxt').innerHTML = `<span style="font-size:0.9rem; color:var(--cyan); display:block; margin-bottom:4px;">[${timeLabel}: ${god.name}]</span> ${god.desc}<br> <span style="font-size:0.8rem; color:var(--txt2); margin-top:6px; display:block;">🔑 ${window.translations.keywords_text}: ${god.keywords.join(', ')}</span>`;
}

function analyze() {
    if (!window.isScriptDataLoaded) {
        alert(window.translations && window.translations.alert_loading_data ? window.translations.alert_loading_data : "데이터를 불러오는 중입니다...");
        return;
    }

    // Compatibility Mode Check
    const partnerInput = document.getElementById('partnerInput');
    const isCompat = partnerInput && partnerInput.style.display !== 'none';
    let pName = '', pY, pM, pD, pH, pMi;

    if (isCompat) {
        pName = document.getElementById('partnerName').value.trim() || '그분';
        const pv = document.getElementById('partnerBirth').value.trim();
        if (!/^\d{8}$/.test(pv)) { alert("상대방 생년월일 8자리를 입력해주세요."); return; }
        pY = +pv.slice(0, 4); pM = +pv.slice(4, 6); pD = +pv.slice(6, 8);
        if (pM < 1 || pM > 12 || pD < 1 || pD > 31) { alert("상대방 생년월일이 올바르지 않습니다."); return; }

        if (document.getElementById('partnerUnknownTime').checked) {
            pH = 12; pMi = 0;
        } else {
            const pa = document.getElementById('partnerAmpm').value;
            let phh = +document.getElementById('partnerHour').value;
            pMi = +document.getElementById('partnerMinute').value;
            if (pa === 'PM' && phh !== 12) phh += 12;
            if (pa === 'AM' && phh === 12) phh = 0;
            pH = phh;
        }
    }

    uName = document.getElementById('userName').value.trim() || window.translations.default_name;
    let y, mo, d, h, mi;
    const tab = document.querySelector('.tab-row button.on').dataset.tab;
    if (tab === 'quick') {
        const v = document.getElementById('quickDate').value.trim();
        if (!/^\d{8}$/.test(v)) { alert(window.translations.alert_birthdate_format); return }
        y = +v.slice(0, 4); mo = +v.slice(4, 6); d = +v.slice(6, 8);
    } else {
        const yS = document.getElementById('selYear'), mS = document.getElementById('selMonth'), dS = document.getElementById('selDay');
        y = +yS.value; mo = +mS.value; d = +dS.value;
    }
    if (mo < 1 || mo > 12 || d < 1 || d > 31) { alert(window.translations.alert_invalid_date); return }
    if (document.getElementById('unknownTime').checked) {
        h = 12; mi = 0;
    } else {
        const hS = document.getElementById('selHour'), minS = document.getElementById('selMinute');
        const ap = document.getElementById('selAmpm').value;
        let hh = +hS.value;
        mi = +minS.value;
        if (ap === 'PM' && hh !== 12) hh += 12;
        if (ap === 'AM' && hh === 12) hh = 0;
        h = hh;
    }

    // Store data for sharing
    window.shareData = {
        n: uName,
        b: `${y}${String(mo).padStart(2, '0')}${String(d).padStart(2, '0')}`,
        g: gender,
        t: document.getElementById('unknownTime').checked ? 'u' : String(h * 100 + mi).padStart(4, '0')
    };

    document.getElementById('inputSection').style.display = 'none';
    document.getElementById('loading').style.display = 'flex';

    setTimeout(() => {
        try {
            if (typeof Solar === 'undefined') throw new Error('Solar library not loaded');
            calc(y, mo, d, h, mi);
            if (typeof trackAnalysis === 'function') trackAnalysis();
            if (typeof saveAnalysisToHistory === 'function') saveAnalysisToHistory();

            // Compatibility Calculation
            if (isCompat) {
                calcCompatibility(pName, pY, pM, pD, pH, pMi, pGender);
                document.getElementById('compatResultCard').style.display = 'block';
            } else {
                document.getElementById('compatResultCard').style.display = 'none';
            }

            document.getElementById('loading').style.display = 'none';
            document.getElementById('result').style.display = 'block';
            window.scrollTo(0, 0);
            revealResults();
        } catch (e) {
            console.error(e);
            document.getElementById('loading').style.display = 'none';
            alert((window.translations.alert_analysis_error || "오류가 발생했습니다.") + "\n[Error: " + e.message + "]");
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
    window.userInput = { cnt }; // Store for compatibility
    curDm = dG;
    const basePd = window.P_DATA[curDm] || window.P_DATA['甲'];
    const brMod = window.BRANCH_MODIFIERS_DATA[dZ] || { k: '', d: '', love: '', money: '', work: '' };
    curPd = {
        base: basePd.base + `<br><br>👉 <strong>${window.translations.underfoot_energy_text} (${dZ}):</strong> ` + brMod.d,
        love: basePd.love + `<br><br>💖 <strong>${window.translations.love_fortune_text}:</strong> ` + brMod.love,
        money: basePd.money + `<br><br>💰 <strong>${window.translations.wealth_flow_text}:</strong> ` + brMod.money,
        work: basePd.work + `<br><br>💼 <strong>${window.translations.career_honor_text}:</strong> ` + brMod.work,
        advice: basePd.advice
    };
    const pillars = [
        { label: window.translations.pillar_label_time, stem: tG, branch: tZ },
        { label: window.translations.pillar_label_day, stem: dG, branch: dZ },
        { label: window.translations.pillar_label_month, stem: mG, branch: mZ },
        { label: window.translations.pillar_label_year, stem: yG, branch: yZ }
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
    document.getElementById('bestMatch').innerHTML = `${bestStem} ${window.translations.stem_text} - ${window.ELEMENT_NAMES_DATA[bestEl]}${window.translations.element_energy_text}`;
    document.getElementById('worstMatch').innerHTML = `${worstStem} ${window.translations.stem_text} - ${window.ELEMENT_NAMES_DATA[worstEl]}${window.translations.element_energy_text}`;
    let mn = 9, wk = 'WATER';
    for (const [k, v] of Object.entries(cnt)) if (v < mn) { mn = v; wk = k }
    ['n0', 'n1', 'n2', 'n3'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = uName;
    });

    document.querySelector('.hero .sec-title').innerHTML = `✨ <span class="nm" id="n1">${uName}</span>${window.translations.soul_body_text}`;
    document.getElementById('soulC').innerText = curDm;
    document.getElementById('soulT').innerText = "";
    document.getElementById('genderBadge').innerText = gender === 'M' ? window.translations.gender_male_text : window.translations.gender_female_text;

    // Character Title
    const charData = CHARACTER_TITLES[curDm] || CHARACTER_TITLES['甲'];
    const charBox = document.getElementById('characterTitle');
    if (charBox) {
        charBox.innerHTML = `<div class="char-emoji">${charData.emoji}</div><div class="char-title">"${charData.title}"</div><div class="char-desc">${charData.desc}</div>`;
        charBox.style.display = 'block';
    }

    // Lucky Items (based on today's stem and user's weak element)
    const todaySolar = Solar.fromYmd(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
    const todayLunar = todaySolar.getLunar();
    const todayBz = todayLunar.getEightChar();
    const todayStem = todayBz.getDayGan().toString();
    const todayEl = STEM_EL[todayStem] || 'WOOD';
    const luckyData = LUCKY_ITEMS[todayEl];
    const luckyBox = document.getElementById('luckyItems');
    if (luckyBox && luckyData) {
        luckyBox.innerHTML = `
            <div class="lucky-grid">
                <div class="lucky-item"><span class="lucky-label">🎨 럭키 컬러</span><span class="lucky-value" style="color:${luckyData.colorHex}">${luckyData.color}</span></div>
                <div class="lucky-item"><span class="lucky-label">🔢 럭키 넘버</span><span class="lucky-value">${luckyData.number}</span></div>
                <div class="lucky-item"><span class="lucky-label">🧭 럭키 방향</span><span class="lucky-value">${luckyData.direction}</span></div>
                <div class="lucky-item"><span class="lucky-label">🍽️ 럭키 음식</span><span class="lucky-value">${luckyData.food}</span></div>
            </div>
            <div class="lucky-action">${luckyData.action}</div>
        `;
        luckyBox.style.display = 'block';
    }

    curTheme = 'base';
    document.querySelectorAll('.theme-tabs button').forEach((b, i) => b.classList.toggle('on', i === 0));
    updateTheme();

    const statCard = document.getElementById('statChart').parentElement;
    statCard.querySelector('.sec-title').innerHTML = `📜 <span class="nm" id="n2">${uName}</span>${window.translations.five_elements_text}`;

    const ch = document.getElementById('statChart'); ch.innerHTML = '';
    ['WOOD', 'FIRE', 'EARTH', 'METAL', 'WATER'].forEach(k => {
        const e = E[k], c = cnt[k], pc = (c / 8) * 100;
        const eName = window.ELEMENT_NAMES_DATA[k];
        const iconHtml = e.img.includes('.') ? `<img src="${e.img}" alt="${eName}" style="${e.style || ''}">` : e.img;
        ch.innerHTML += `<div class="stat-row"><span class="element-icon">${iconHtml} <span style="font-size:0.5em; opacity:0.7; margin-left:1px; vertical-align: middle;">(${eName})</span></span><div class="stat-track"><div class="stat-fill" style="background:${e.c}" data-w="${pc}%"></div></div><span class="stat-n">${c}</span></div>`;
    });
    setTimeout(() => document.querySelectorAll('.stat-fill').forEach(b => b.style.width = b.dataset.w), 100);
    const lk = window.LK_DATA[wk], le = E[wk];
    const genderTip = gender === 'M' ? window.translations.male_luck_tip : window.translations.female_luck_tip;
    document.getElementById('luckBox').innerHTML = `<div class="luck-dot" style="background:${le.c};color:${le.c}"></div><div class="luck-info"><strong>${lk.c}</strong><span>${lk.i} | ${genderTip}</span></div>`;

    // Draw Radar Chart
    drawRadar(cnt);

    updateQuest();
    document.getElementById('sajuMbti').innerHTML = `${curDm}`;
    document.getElementById('soulT').innerHTML = ``;
}

function drawRadar(cnt) {
    const box = document.getElementById('radarChart');
    if (!box) return;

    const w = 300, h = 300, cx = w / 2, cy = h / 2, r = 100;
    const elems = ['WOOD', 'FIRE', 'EARTH', 'METAL', 'WATER'];
    const angles = [-90, -18, 54, 126, 198].map(a => a * Math.PI / 180);
    const maxVal = 5;

    // Data Preparation
    let points = "";
    elems.forEach((k, i) => {
        const val = cnt[k] || 0;
        const dist = (Math.min(val, maxVal) / maxVal) * r;
        const x = cx + dist * Math.cos(angles[i]);
        const y = cy + dist * Math.sin(angles[i]);
        points += `${x},${y} `;
    });

    // Background Grid
    let grid = "";
    [0.2, 0.4, 0.6, 0.8, 1].forEach(scale => {
        let p = "";
        angles.forEach(a => {
            p += `${cx + r * scale * Math.cos(a)},${cy + r * scale * Math.sin(a)} `;
        });
        grid += `<polygon points="${p}" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>`;
    });

    // Axis Lines
    let axes = "";
    angles.forEach(a => {
        axes += `<line x1="${cx}" y1="${cy}" x2="${cx + r * Math.cos(a)}" y2="${cy + r * Math.sin(a)}" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>`;
    });

    // Labels & Icons
    let labels = "";
    const fallbackNames = { WOOD: '목', FIRE: '화', EARTH: '토', METAL: '금', WATER: '수' };

    elems.forEach((k, i) => {
        const x = cx + (r + 25) * Math.cos(angles[i]);
        const y = cy + (r + 25) * Math.sin(angles[i]);
        const e = window.E_DATA ? window.E_DATA[k] : E[k];
        const name = (window.ELEMENT_NAMES_DATA && window.ELEMENT_NAMES_DATA[k]) || fallbackNames[k];

        labels += `<text x="${x}" y="${y}" fill="${e.c}" font-size="14" text-anchor="middle" dominant-baseline="middle" font-weight="bold">${name}</text>`;

        const vx = cx + (r + 45) * Math.cos(angles[i]);
        const vy = cy + (r + 45) * Math.sin(angles[i]);
        labels += `<text x="${vx}" y="${vy}" fill="rgba(255,255,255,0.7)" font-size="11" text-anchor="middle" dominant-baseline="middle">${cnt[k] || 0}</text>`;
    });

    // Render SVG (Removed .radar-poly class to avoid transform issues)
    box.innerHTML = `
        <svg width="100%" height="100%" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" style="overflow:visible">
            ${grid}
            ${axes}
            <polygon points="${points}" fill="rgba(168, 85, 247, 0.4)" stroke="#a855f7" stroke-width="2" style="transition: all 1s ease; opacity: 0.9;"/>
            ${labels}
        </svg>
    `;
}


function shareKakao() {
    if (typeof Kakao === 'undefined') {
        alert(window.translations.alert_kakao_sdk_error);
        return;
    }
    if (!Kakao.isInitialized()) {
        Kakao.init('14302bcc718209aaa470793e426fbb2a');
    }
    if (!Kakao.isInitialized()) {
        alert(window.translations.alert_kakao_sdk_error);
        return;
    }
    const shareUrl = getShareUrl();
    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: `${window.translations.kakao_share_title_prefix} ${uName}${window.translations.kakao_share_title_suffix}`,
            description: `${window.translations.kakao_share_desc_prefix} [${curDm}]${window.translations.kakao_share_desc_suffix}`,
            imageUrl: 'https://choiseokhee4u-svg.github.io/ChoiseokheeProduct_01/images/Fire.png',
            link: {
                mobileWebUrl: shareUrl,
                webUrl: shareUrl
            }
        },
        buttons: [
            {
                title: window.translations.kakao_share_button_title,
                link: {
                    mobileWebUrl: shareUrl,
                    webUrl: shareUrl
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
    const url = getShareUrl();
    navigator.clipboard.writeText(url).then(() => {
        alert(window.translations ? window.translations.alert_link_copied : "링크가 복사되었습니다.");
    }).catch(err => {
        console.error('클립보드 복사 실패:', err);
        alert(window.translations ? window.translations.alert_link_copy_failed : "복사 실패");
    });
}

// ────── Result Card Image Generator (html2canvas) ──────
function generateCard() {
    const btn = document.querySelector('.save-card-btn');
    const originalText = btn.innerText;
    btn.innerText = "저장 중... 📷";

    // Hide buttons for capture
    const btnRow = document.querySelector('.btn-row');
    if (btnRow) btnRow.style.display = 'none';

    // Target the result container
    const element = document.getElementById('result');

    html2canvas(element, {
        scale: 2, // High resolution
        backgroundColor: '#0f172a', // Force dark background
        useCORS: true, // Allow cross-origin images (e.g. Kakao CDN if any)
        allowTaint: true,
        logging: false
    }).then(canvas => {
        // Restore buttons
        if (btnRow) btnRow.style.display = 'flex';
        btn.innerText = originalText;

        // Download
        const link = document.createElement('a');
        link.download = `달의신당_결과_${uName}.png`;
        link.href = canvas.toDataURL("image/png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch(err => {
        console.error("Capture failed:", err);
        alert("이미지 저장 중 오류가 발생했습니다.");
        if (btnRow) btnRow.style.display = 'flex';
        btn.innerText = originalText;
    });
}

// ────── Result Reveal Animation ──────
function revealResults() {
    const cards = document.querySelectorAll('#result > .card, #result > .btn-row');
    cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'none';
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 150 * i);
    });

    // Pillar flip animation
    setTimeout(() => {
        const pillars = document.querySelectorAll('.pillar');
        pillars.forEach((p, i) => {
            p.style.opacity = '0';
            p.style.transform = 'rotateY(90deg) scale(0.8)';
            p.style.transition = 'none';
            setTimeout(() => {
                p.style.transition = 'opacity 0.5s cubic-bezier(.22,1,.36,1), transform 0.5s cubic-bezier(.22,1,.36,1)';
                p.style.opacity = '1';
                p.style.transform = 'rotateY(0deg) scale(1)';
            }, 250 * i);
        });
    }, 300);
}

// ────── Compatibility Logic ──────
function toggleCompatibility() {
    const box = document.getElementById('partnerInput');
    const btn = document.getElementById('toggleCompat');
    const isHidden = box.style.display === 'none';
    box.style.display = isHidden ? 'block' : 'none';
    btn.innerHTML = isHidden ? '❌ 궁합 안 볼래요' : '👫 그분과의 궁합도 같이 보기';
    btn.classList.toggle('active', isHidden);
}

function calcCompatibility(pn, y, m, d, h, mi, pg) {
    // 1. Calculate Partner Saju
    const s = Solar.fromYmdHms(y, m, d, h, mi, 0), l = s.getLunar(), bz = l.getEightChar();
    const pDm = bz.getDayGan().toString(); // Partner Day Stem

    // Partner Element Count
    const pStems = [bz.getYearGan(), bz.getMonthGan(), bz.getDayGan(), bz.getTimeGan()].map(x => x.toString());
    const pBranches = [bz.getYearZhi(), bz.getMonthZhi(), bz.getDayZhi(), bz.getTimeZhi()].map(x => x.toString());
    const pCnt = { WOOD: 0, FIRE: 0, EARTH: 0, METAL: 0, WATER: 0 };
    [...pStems, ...pBranches].forEach(c => { const e = EM[c]; if (e) pCnt[e]++ });

    // 2. Score Calculation
    let score = 50; // Base score
    let notes = [];

    // A. Day Stem Relationship (Harmony)
    const myEl = STEM_EL[curDm], pEl = STEM_EL[pDm];
    if (myEl === pEl) {
        score += 10; notes.push("친구처럼 편안한 사이");
    } else if (GENERATING[myEl] === pEl || GENERATING[pEl] === myEl) {
        score += 20; notes.push("서로 돕고 발전하는 상생 관계");
    } else if (OVERCOMING[myEl] === pEl || OVERCOMING[pEl] === myEl) {
        score -= 10; notes.push("서로 주도권을 잡으려는 긴장감");
    }

    // Yin-Yang Harmony (Gender)
    if (gender !== pg) {
        score += 5; notes.push("음양의 조화가 좋은 커플 (성별 조화)");
    }

    // B. Element Balance
    // Check if partner has what I lack
    const myWeakest = Object.keys(window.userInput?.cnt || {}).reduce((a, b) => (window.userInput?.cnt[a] < window.userInput?.cnt[b] ? a : b), 'WOOD');
    if (pCnt[myWeakest] >= 2) {
        score += 15; notes.push(`나에게 부족한 ${window.ELEMENT_NAMES_DATA[myWeakest]} 기운을 상대방이 채워줌`);
    }

    // Check Heavenly Stem Clash (Choong) - Simplified
    // Gap: 甲-庚, 乙-辛 etc. (Index diff 6)
    const stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    const idx1 = stems.indexOf(curDm), idx2 = stems.indexOf(pDm);
    if (Math.abs(idx1 - idx2) === 6) {
        score -= 15; notes.push("강렬하게 끌리지만 자주 부딪힐 수 있음 (충)");
    } else if ((idx1 + idx2) % 5 === 0) { // Approx Hap (Gan-Hap) logic simplified
        score += 15; notes.push("정신적으로 깊이 통하는 천생연분 (합)");
    }

    score = Math.min(100, Math.max(0, score)); // Clamp 0-100

    // 3. Render
    const box = document.getElementById('compatScoreBox');
    const msgBox = document.getElementById('compatMsg');

    // Heart Gauge
    box.innerHTML = `
        <div class="heart-container" style="position:relative; width:120px; height:120px; margin:0 auto;">
            <svg viewBox="0 0 100 100" style="width:100%; height:100%; filter:drop-shadow(0 0 10px rgba(236, 72, 153, 0.5));">
                <path d="M50 88.9L16.7 55.6C7.2 46.1 7.2 30.9 16.7 21.4s24.7-9.5 33.3 0L50 21.4l0 0" fill="#331832" stroke="none"/>
                <path d="M50 88.9L83.3 55.6C92.8 46.1 92.8 30.9 83.3 21.4s-24.7-9.5-33.3 0L50 21.4l0 0" fill="#331832" stroke="none"/>
                
                <defs>
                    <linearGradient id="heartGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stop-color="#ec4899" />
                        <stop offset="100%" stop-color="#ff75c3" />
                    </linearGradient>
                    <mask id="fillMask">
                        <rect x="0" y="${100 - score}" width="100" height="100" fill="white" style="transition:y 1s ease-out;"/>
                    </mask>
                </defs>
                
                <g mask="url(#fillMask)">
                    <path d="M50 88.9L16.7 55.6C7.2 46.1 7.2 30.9 16.7 21.4s24.7-9.5 33.3 0L50 21.4l0 0" fill="url(#heartGrad)" stroke="none"/>
                    <path d="M50 88.9L83.3 55.6C92.8 46.1 92.8 30.9 83.3 21.4s-24.7-9.5-33.3 0L50 21.4l0 0" fill="url(#heartGrad)" stroke="none"/>
                </g>
            </svg>
            <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); color:white; font-weight:800; font-size:1.8rem; text-shadow:0 2px 4px rgba(0,0,0,0.5);">${score}%</div>
        </div>
    `;

    msgBox.innerHTML = `
        <div style="text-align:center; margin-top:15px; background:rgba(255,255,255,0.05); padding:15px; border-radius:12px;">
            <div style="color:var(--pink); font-weight:700; margin-bottom:8px;">${uName} ⚡ ${pn}</div>
            <p style="font-size:0.95rem; line-height:1.6; color:var(--txt1);">${notes.join('<br>')}</p>
        </div>
    `;
}

function checkShareParams() {
    const params = new URLSearchParams(window.location.search);
    const n = params.get('n');
    const b = params.get('b');
    const g = params.get('g');
    const t = params.get('t');
    const ft = params.get('ft'); // fortune type

    if (n && b && g && t) {
        // Pre-fill inputs
        const nameInput = document.getElementById('userName');
        if (nameInput) nameInput.value = n;

        // Gender
        gender = g;
        document.querySelectorAll('.gender-sel button').forEach(btn => {
            btn.classList.toggle('on', btn.dataset.g === g);
        });

        // Fortune type
        if (ft) {
            fType = ft;
            document.querySelectorAll('.fortune-sel button').forEach(btn => {
                btn.classList.toggle('on', btn.dataset.t === ft);
            });
        }

        // Set Date
        const y = b.slice(0, 4), m = b.slice(4, 6), d = b.slice(6, 8);

        // Use Quick Input for simplicity in restoration
        const quickTab = document.querySelector('.tab-row button[data-tab="quick"]');
        if (quickTab) quickTab.click();
        const quickDate = document.getElementById('quickDate');
        if (quickDate) quickDate.value = b;

        // Set Time
        const unknownTime = document.getElementById('unknownTime');
        if (t === 'u') {
            if (unknownTime) unknownTime.checked = true;
        } else {
            if (unknownTime) unknownTime.checked = false;
            // Restore time from share params
            const timeVal = parseInt(t);
            const hour = Math.floor(timeVal / 100);
            const minute = timeVal % 100;
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour);

            const selAmpm = document.getElementById('selAmpm');
            const selHour = document.getElementById('selHour');
            const selMinute = document.getElementById('selMinute');
            if (selAmpm) selAmpm.value = ampm;
            if (selHour) selHour.value = displayHour;
            if (selMinute) selMinute.value = minute;
        }

        // Auto Analyze if data is ready
        setTimeout(() => {
            if (window.isScriptDataLoaded) analyze();
        }, 500);
    }
}

// ═══════ Share URL improvement ═══════
function getShareUrl() {
    const params = new URLSearchParams();
    if (window.shareData) {
        params.set('n', window.shareData.n);
        params.set('b', window.shareData.b);
        params.set('g', window.shareData.g);
        params.set('t', window.shareData.t);
        params.set('ft', fType);
    }
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}


// ═══════ Daily Fortune System (Improved - 천간지지 기반) ═══════
function initDailyFortune() {
    const now = new Date();
    const dateStr = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = dayNames[now.getDay()];
    const hour = now.getHours();

    const dateEl = document.getElementById('dailyDate');
    const msgEl = document.getElementById('dailyMessage');
    const luckyEl = document.getElementById('dailyLucky');

    if (!dateEl || !msgEl || !luckyEl) return;

    // 시간대별 인사말
    let greeting = '';
    if (hour < 6) greeting = '🌙 고요한 새벽,';
    else if (hour < 9) greeting = '🌅 상쾌한 아침,';
    else if (hour < 12) greeting = '☀️ 활기찬 오전,';
    else if (hour < 14) greeting = '🍽️ 따스한 점심,';
    else if (hour < 18) greeting = '🌤️ 여유로운 오후,';
    else if (hour < 21) greeting = '🌆 고운 저녁,';
    else greeting = '🌃 편안한 밤,';

    dateEl.textContent = `${dateStr} (${dayName})`;

    // 음력 천간지지 기반으로 진정한 일일 변경 메시지 생성
    let dayStem = '', dayBranch = '';
    try {
        const s = Solar.fromYmd(now.getFullYear(), now.getMonth() + 1, now.getDate());
        const l = s.getLunar();
        const bz = l.getEightChar();
        dayStem = bz.getDayGan().toString();
        dayBranch = bz.getDayZhi().toString();
    } catch (e) {
        // Solar 라이브러리 로드 전 fallback
        const fallbackStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        const fallbackBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
        const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
        dayStem = fallbackStems[dayOfYear % 10];
        dayBranch = fallbackBranches[dayOfYear % 12];
    }

    // 천간별 메시지 (각 3개씩 = 30개, 지지에 따라 선택)
    const stemMessages = {
        '甲': [
            `${greeting} 나무가 하늘을 향해 자라듯, 당신의 계획도 위를 향해 뻗어갑니다. 자신감을 가지세요!`,
            `${greeting} 큰 나무의 기운이 가득한 날! 리더십을 발휘하면 좋은 결과가 따릅니다.`,
            `${greeting} 봄바람처럼 새로운 시작의 에너지가 넘칩니다. 미뤄둔 일을 시작하세요!`
        ],
        '乙': [
            `${greeting} 부드러운 풀처럼 유연하게 대처하면 어떤 상황도 극복할 수 있습니다. 💚`,
            `${greeting} 꽃이 피어나듯 당신의 매력이 빛나는 날! 사람들과의 만남이 행운을 부릅니다.`,
            `${greeting} 작은 풀도 바위틈을 뚫고 자라듯, 포기하지 않으면 길이 열립니다.`
        ],
        '丙': [
            `${greeting} 태양처럼 밝은 에너지가 당신을 감싸는 날! 자신 있게 앞으로 나아가세요. 🔥`,
            `${greeting} 열정의 불꽃이 타오르는 날입니다. 도전정신이 행운을 부릅니다!`,
            `${greeting} 밝은 빛이 모든 것을 비추듯, 오늘은 숨겨진 진실이 드러날 수 있습니다.`
        ],
        '丁': [
            `${greeting} 촛불처럼 은은한 빛이 주변을 밝힙니다. 따뜻한 말 한마디가 큰 힘이 됩니다. 🕯️`,
            `${greeting} 섬세한 관찰력이 빛나는 날! 디테일에 주목하면 큰 기회를 발견합니다.`,
            `${greeting} 작은 불씨가 큰 불이 되듯, 오늘의 작은 노력이 큰 결실을 맺습니다.`
        ],
        '戊': [
            `${greeting} 큰 산처럼 묵직한 안정감이 당신을 지켜주는 날입니다. 흔들리지 마세요. ⛰️`,
            `${greeting} 대지의 기운으로 모든 것을 감싸 안는 포용력이 빛나는 날!`,
            `${greeting} 산이 움직이지 않듯, 오늘은 인내하면 큰 보상이 찾아옵니다.`
        ],
        '己': [
            `${greeting} 비옥한 땅이 만물을 키우듯, 주변 사람들을 돕는 것이 당신의 복이 됩니다. 🌾`,
            `${greeting} 실용적인 판단이 빛나는 날! 현실적인 계획이 성공을 부릅니다.`,
            `${greeting} 정원의 흙처럼, 꾸준한 관리가 아름다운 결과를 만들어냅니다.`
        ],
        '庚': [
            `${greeting} 강철처럼 단단한 의지력이 빛나는 날! 결단력 있게 행동하세요. ⚔️`,
            `${greeting} 칼날처럼 날카로운 판단력의 날! 중요한 결정을 내리기에 좋습니다.`,
            `${greeting} 금속이 두드릴수록 강해지듯, 오늘의 도전이 당신을 더 강하게 만듭니다.`
        ],
        '辛': [
            `${greeting} 보석처럼 빛나는 날! 평소 숨겨둔 재능을 발휘해보세요. 💎`,
            `${greeting} 섬세하고 아름다운 것에 마음이 끌리는 날. 예술·문화 활동이 행운을 부릅니다.`,
            `${greeting} 귀금속처럼 가치 있는 인연을 만날 수 있는 날! 모임에 참석하세요.`
        ],
        '壬': [
            `${greeting} 큰 강처럼 넓은 시야로 세상을 바라보세요. 새로운 가능성이 보입니다. 🌊`,
            `${greeting} 물이 높은 곳에서 낮은 곳으로 흐르듯, 겸손한 자세가 행운을 부릅니다.`,
            `${greeting} 바다처럼 깊은 지혜가 빛나는 날! 중요한 학습이나 공부에 좋습니다.`
        ],
        '癸': [
            `${greeting} 이슬처럼 맑고 순수한 에너지의 날! 감성을 따라가면 좋은 결과가 옵니다. 💧`,
            `${greeting} 안개 속에서도 길을 찾듯, 직감을 믿으면 정답이 보입니다.`,
            `${greeting} 비가 대지를 적시듯, 당신의 작은 노력이 주변에 큰 영향을 줍니다.`
        ]
    };

    // 지지로 메시지 인덱스 선택 (12지지 → 0~2 인덱스)
    const branchIdx = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'].indexOf(dayBranch);
    const msgIdx = branchIdx % 3;
    const messages = stemMessages[dayStem] || stemMessages['甲'];
    msgEl.textContent = messages[msgIdx];

    // 천간 기반 오행 럭키 아이템 (더 다양하게)
    const stemElement = {
        '甲': 'WOOD', '乙': 'WOOD', '丙': 'FIRE', '丁': 'FIRE',
        '戊': 'EARTH', '己': 'EARTH', '庚': 'METAL', '辛': 'METAL',
        '壬': 'WATER', '癸': 'WATER'
    };
    const el = stemElement[dayStem] || 'WOOD';

    // 오행별 럭키 아이템 (지지에 따라 세부 변화)
    const luckyByElement = {
        WOOD: [
            { color: '🟢 초록', number: 3, food: '샐러드', direction: '동쪽', item: '🌿 관엽식물' },
            { color: '🟩 라임', number: 8, food: '시금치 비빔밥', direction: '동남쪽', item: '📗 초록 노트' },
            { color: '💚 에메랄드', number: 13, food: '녹차 라떼', direction: '동쪽', item: '🎋 대나무 소품' }
        ],
        FIRE: [
            { color: '🔴 빨강', number: 7, food: '매운 떡볶이', direction: '남쪽', item: '🕯️ 향초' },
            { color: '🧡 주황', number: 2, food: '붉은 팥죽', direction: '남쪽', item: '🔥 빨간 양말' },
            { color: '💗 핑크', number: 9, food: '토마토 파스타', direction: '남서쪽', item: '🌹 장미꽃' }
        ],
        EARTH: [
            { color: '🟡 노랑', number: 5, food: '카레라이스', direction: '중앙', item: '🏺 도자기 컵' },
            { color: '🟤 갈색', number: 10, food: '고구마', direction: '남서쪽', item: '🧱 테라코타 화분' },
            { color: '🌕 베이지', number: 15, food: '된장찌개', direction: '북동쪽', item: '🪨 원석 액세서리' }
        ],
        METAL: [
            { color: '⚪ 흰색', number: 4, food: '흰 살 생선', direction: '서쪽', item: '⌚ 메탈 시계' },
            { color: '🩶 실버', number: 9, food: '배 주스', direction: '서북쪽', item: '💍 은반지' },
            { color: '🤍 아이보리', number: 14, food: '요거트 스무디', direction: '서쪽', item: '🪙 동전 지갑' }
        ],
        WATER: [
            { color: '🔵 파랑', number: 1, food: '해물 칼국수', direction: '북쪽', item: '💧 물병' },
            { color: '💙 네이비', number: 6, food: '검은콩 밥', direction: '북쪽', item: '🐟 물고기 장식' },
            { color: '🩵 하늘색', number: 11, food: '미역국', direction: '북동쪽', item: '🌊 바다 향수' }
        ]
    };

    const luckyArr = luckyByElement[el] || luckyByElement.WOOD;
    const lucky = luckyArr[msgIdx]; // 지지 기반으로 럭키 아이템도 변경

    luckyEl.innerHTML = `
        <div class="daily-lucky-item">
            <span class="lucky-emoji">🎨</span>
            <span class="lucky-label">럭키 컬러</span>
            <span class="lucky-value">${lucky.color}</span>
        </div>
        <div class="daily-lucky-item">
            <span class="lucky-emoji">🔢</span>
            <span class="lucky-label">럭키 넘버</span>
            <span class="lucky-value">${lucky.number}</span>
        </div>
        <div class="daily-lucky-item">
            <span class="lucky-emoji">🍽️</span>
            <span class="lucky-label">럭키 음식</span>
            <span class="lucky-value">${lucky.food}</span>
        </div>
        <div class="daily-lucky-item">
            <span class="lucky-emoji">🧭</span>
            <span class="lucky-label">럭키 방향</span>
            <span class="lucky-value">${lucky.direction}</span>
        </div>
        <div class="daily-lucky-item">
            <span class="lucky-emoji">🎁</span>
            <span class="lucky-label">럭키 아이템</span>
            <span class="lucky-value">${lucky.item}</span>
        </div>
    `;
}

// ═══════ Review Carousel ═══════
let reviewIndex = 0;
let reviewInterval = null;

function initReviewCarousel() {
    const track = document.getElementById('reviewTrack');
    const dotsContainer = document.getElementById('reviewDots');
    if (!track || !dotsContainer) return;

    const cards = track.querySelectorAll('.review-card');
    const total = cards.length;

    // Create dots
    dotsContainer.innerHTML = '';
    for (let i = 0; i < total; i++) {
        const dot = document.createElement('div');
        dot.className = 'review-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToReview(i);
        dotsContainer.appendChild(dot);
    }

    // Auto-slide
    reviewInterval = setInterval(() => {
        reviewIndex = (reviewIndex + 1) % total;
        updateReviewSlider();
    }, 4000);

    // Pause on hover
    const slider = document.getElementById('reviewSlider');
    if (slider) {
        slider.addEventListener('mouseenter', () => clearInterval(reviewInterval));
        slider.addEventListener('mouseleave', () => {
            reviewInterval = setInterval(() => {
                reviewIndex = (reviewIndex + 1) % total;
                updateReviewSlider();
            }, 4000);
        });
    }

    // Touch swipe support
    let touchStartX = 0;
    if (slider) {
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            clearInterval(reviewInterval);
        }, { passive: true });
        slider.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                reviewIndex = diff > 0 ? Math.min(reviewIndex + 1, total - 1) : Math.max(reviewIndex - 1, 0);
                updateReviewSlider();
            }
            reviewInterval = setInterval(() => {
                reviewIndex = (reviewIndex + 1) % total;
                updateReviewSlider();
            }, 4000);
        }, { passive: true });
    }
}

function goToReview(idx) {
    reviewIndex = idx;
    updateReviewSlider();
}

function updateReviewSlider() {
    const track = document.getElementById('reviewTrack');
    const dots = document.querySelectorAll('.review-dot');
    if (!track) return;

    track.style.transform = `translateX(-${reviewIndex * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === reviewIndex));
}

// ═══════ Visit Counter & Gamification (Enhanced) ═══════
function trackVisit() {
    const today = new Date().toISOString().slice(0, 10);
    const lastVisit = localStorage.getItem('saju_last_visit');
    let streak = parseInt(localStorage.getItem('saju_visit_streak') || '0');
    let totalVisits = parseInt(localStorage.getItem('saju_total_visits') || '0');
    let totalAnalysis = parseInt(localStorage.getItem('saju_total_analysis') || '0');

    if (lastVisit !== today) {
        totalVisits++;
        localStorage.setItem('saju_total_visits', totalVisits);
        localStorage.setItem('saju_last_visit', today);

        // Check streak
        if (lastVisit) {
            const lastDate = new Date(lastVisit);
            const todayDate = new Date(today);
            const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
            streak = diffDays === 1 ? streak + 1 : 1;
        } else {
            streak = 1;
        }
        localStorage.setItem('saju_visit_streak', streak);
    }

    // Show visit stats badge
    const dateEl = document.getElementById('dailyDate');
    if (dateEl) {
        let badges = '';
        if (streak >= 2) {
            badges += ` <span style="color:var(--pink); font-weight:700;">🔥 ${streak}일 연속!</span>`;
        }
        if (totalVisits >= 5) {
            const rank = totalVisits >= 30 ? '🏆 VIP' : totalVisits >= 15 ? '⭐ 단골' : '💫 단골';
            badges += ` <span style="color:var(--yellow); font-weight:600; font-size:0.75rem;">${rank}</span>`;
        }
        if (badges) dateEl.innerHTML += badges;
    }
}

// 분석 횟수 추적
function trackAnalysis() {
    let count = parseInt(localStorage.getItem('saju_total_analysis') || '0');
    count++;
    localStorage.setItem('saju_total_analysis', count);
}

// ═══════ 24절기 이벤트 시스템 ═══════
function initSeasonalEvent() {
    const now = new Date();
    const year = now.getFullYear();

    // 2026년 24절기 근사 데이터 (월/일)
    const SOLAR_TERMS = [
        { name: '소한', emoji: '❄️', date: [1, 5], desc: '차가운 기운이 가장 강한 때', advice: '따뜻한 차와 함께 마음을 녹이세요', element: 'WATER' },
        { name: '대한', emoji: '🧊', date: [1, 20], desc: '겨울의 절정, 인내의 시기', advice: '묵묵히 준비하면 봄에 꽃이 핍니다', element: 'WATER' },
        { name: '입춘', emoji: '🌱', date: [2, 4], desc: '새로운 시작의 기운이 피어남', advice: '올해의 소원을 마음에 심으세요', element: 'WOOD' },
        { name: '우수', emoji: '💧', date: [2, 19], desc: '얼음이 녹고 봄비가 내리는 때', advice: '감사한 마음이 복을 부릅니다', element: 'WATER' },
        { name: '경칩', emoji: '🐸', date: [3, 6], desc: '개구리가 겨울잠에서 깨어남', advice: '새로운 도전을 시작하기 좋은 때', element: 'WOOD' },
        { name: '춘분', emoji: '🌸', date: [3, 21], desc: '낮과 밤의 길이가 같은 균형의 날', advice: '삶의 균형을 점검해보세요', element: 'WOOD' },
        { name: '청명', emoji: '🌤️', date: [4, 5], desc: '하늘이 맑고 봄기운이 가득', advice: '산책하며 좋은 기운을 받으세요', element: 'WOOD' },
        { name: '곡우', emoji: '🌾', date: [4, 20], desc: '봄비가 내려 곡식을 윤택하게 함', advice: '씨앗처럼 작은 시작이 큰 결과를 낳습니다', element: 'EARTH' },
        { name: '입하', emoji: '☀️', date: [5, 6], desc: '여름의 시작, 만물이 자라는 때', advice: '열정을 불태우되 건강을 챙기세요', element: 'FIRE' },
        { name: '소만', emoji: '🌿', date: [5, 21], desc: '풀과 나무가 무성해지는 때', advice: '성장의 기쁨을 느끼며 감사하세요', element: 'FIRE' },
        { name: '망종', emoji: '🌾', date: [6, 6], desc: '씨를 뿌리는 절기', advice: '중요한 계획을 실행에 옮기세요', element: 'FIRE' },
        { name: '하지', emoji: '🌞', date: [6, 21], desc: '낮이 가장 긴 날, 양기의 절정', advice: '에너지가 넘치는 날! 활발하게 움직이세요', element: 'FIRE' },
        { name: '소서', emoji: '🌡️', date: [7, 7], desc: '본격적인 더위의 시작', advice: '더위를 이기는 건 마음의 시원함입니다', element: 'FIRE' },
        { name: '대서', emoji: '🔥', date: [7, 23], desc: '한 해 중 가장 더운 때', advice: '인내하면 가을의 풍성한 수확이 기다립니다', element: 'FIRE' },
        { name: '입추', emoji: '🍂', date: [8, 7], desc: '가을의 시작, 수확의 계절 도래', advice: '그동안의 노력을 정리할 시간입니다', element: 'METAL' },
        { name: '처서', emoji: '🌬️', date: [8, 23], desc: '더위가 물러가는 때', advice: '서늘한 바람처럼 마음도 가볍게', element: 'METAL' },
        { name: '백로', emoji: '🌫️', date: [9, 8], desc: '이슬이 내리기 시작하는 때', advice: '감성이 풍요로운 시기, 예술을 즐기세요', element: 'METAL' },
        { name: '추분', emoji: '🍁', date: [9, 23], desc: '낮과 밤이 같아지는 가을의 균형', advice: '감사의 마음을 전하면 복이 돌아옵니다', element: 'METAL' },
        { name: '한로', emoji: '🍃', date: [10, 8], desc: '찬 이슬이 내리는 깊어가는 가을', advice: '따뜻한 사람과 시간을 보내세요', element: 'METAL' },
        { name: '상강', emoji: '🥶', date: [10, 23], desc: '서리가 내리기 시작하는 때', advice: '한 해를 돌아보며 정리하세요', element: 'EARTH' },
        { name: '입동', emoji: '🌨️', date: [11, 7], desc: '겨울의 시작', advice: '가까운 사람에게 따스한 말 한마디를', element: 'WATER' },
        { name: '소설', emoji: '❄️', date: [11, 22], desc: '첫눈이 내리는 시기', advice: '첫눈에 빌면 소원이 이루어집니다', element: 'WATER' },
        { name: '대설', emoji: '⛄', date: [12, 7], desc: '큰 눈이 내리는 절기', advice: '하얀 눈처럼 마음을 정화하세요', element: 'WATER' },
        { name: '동지', emoji: '🕯️', date: [12, 22], desc: '밤이 가장 긴 날, 새 출발의 시작', advice: '팥죽 한 그릇으로 액운을 쫓으세요', element: 'WATER' }
    ];

    // 현재 절기와 다음 절기 계산
    let currentTerm = null, nextTerm = null;
    const todayNum = (now.getMonth() + 1) * 100 + now.getDate();

    for (let i = 0; i < SOLAR_TERMS.length; i++) {
        const t = SOLAR_TERMS[i];
        const termNum = t.date[0] * 100 + t.date[1];
        const nextIdx = (i + 1) % SOLAR_TERMS.length;
        const nextTermNum = SOLAR_TERMS[nextIdx].date[0] * 100 + SOLAR_TERMS[nextIdx].date[1];

        if (i === SOLAR_TERMS.length - 1) {
            // 마지막 절기(동지) 이후 ~ 첫 절기(소한) 이전
            if (todayNum >= termNum || todayNum < SOLAR_TERMS[0].date[0] * 100 + SOLAR_TERMS[0].date[1]) {
                currentTerm = t;
                nextTerm = SOLAR_TERMS[0];
                break;
            }
        } else if (todayNum >= termNum && todayNum < nextTermNum) {
            currentTerm = t;
            nextTerm = SOLAR_TERMS[nextIdx];
            break;
        }
    }

    if (!currentTerm) return;

    // 다음 절기까지 남은 일수
    const nextDate = new Date(year, nextTerm.date[0] - 1, nextTerm.date[1]);
    if (nextDate < now) nextDate.setFullYear(year + 1);
    const daysUntilNext = Math.ceil((nextDate - now) / (1000 * 60 * 60 * 24));

    // 오늘이 절기 날짜인지 체크 (특별 이벤트)
    const isTermDay = (now.getMonth() + 1) === currentTerm.date[0] && now.getDate() === currentTerm.date[1];

    // 절기 배너 생성
    const fortuneCard = document.getElementById('dailyFortune');
    if (fortuneCard) {
        const banner = document.createElement('div');
        banner.className = 'seasonal-banner';
        banner.innerHTML = `
            <div class="seasonal-inner">
                <div class="seasonal-current">
                    <span class="seasonal-emoji">${currentTerm.emoji}</span>
                    <div>
                        <div class="seasonal-name">${isTermDay ? '🎉 오늘은 ' : ''}${currentTerm.name}${isTermDay ? ' 절기입니다!' : ''}</div>
                        <div class="seasonal-desc">${currentTerm.desc}</div>
                    </div>
                </div>
                <div class="seasonal-advice">💡 ${currentTerm.advice}</div>
                <div class="seasonal-next">다음 절기 「${nextTerm.emoji} ${nextTerm.name}」까지 <strong>${daysUntilNext}일</strong></div>
            </div>
        `;
        fortuneCard.after(banner);
    }
}

// ═══════ PWA Install Prompt ═══════
let deferredPrompt = null;

function initPWA() {
    // Service Worker 등록
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(() => { });
    }

    // Install Prompt 캡처
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallBanner();
    });
}

function showInstallBanner() {
    // 이미 표시했거나 닫은 경우 스킵
    const dismissed = localStorage.getItem('saju_pwa_dismissed');
    if (dismissed) {
        const dismissDate = new Date(dismissed);
        const now = new Date();
        // 7일 후 다시 표시
        if ((now - dismissDate) < 7 * 24 * 60 * 60 * 1000) return;
    }

    const banner = document.createElement('div');
    banner.id = 'pwaInstallBanner';
    banner.innerHTML = `
        <div class="pwa-banner-inner">
            <span class="pwa-emoji">📱</span>
            <div class="pwa-text">
                <strong>애기동자 신점을 홈 화면에 추가하세요!</strong>
                <span>매일 운세를 앱처럼 빠르게 확인할 수 있어요</span>
            </div>
            <button class="pwa-install-btn" onclick="installPWA()">추가</button>
            <button class="pwa-close-btn" onclick="dismissPWA()">✕</button>
        </div>
    `;
    document.body.appendChild(banner);

    // 3초후 슬라이드 인
    setTimeout(() => banner.classList.add('show'), 3000);
}

function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => {
            deferredPrompt = null;
            const banner = document.getElementById('pwaInstallBanner');
            if (banner) banner.remove();
        });
    }
}

function dismissPWA() {
    localStorage.setItem('saju_pwa_dismissed', new Date().toISOString());
    const banner = document.getElementById('pwaInstallBanner');
    if (banner) {
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 500);
    }
}

// ═══════ Phase 4: Analysis History (분석 이력) ═══════
function saveAnalysisToHistory() {
    if (!window.shareData || !curDm) return;
    const history = JSON.parse(localStorage.getItem('saju_history') || '[]');
    const entry = {
        name: uName,
        birth: window.shareData.b,
        gender: window.shareData.g,
        time: window.shareData.t,
        dayStem: curDm,
        date: new Date().toISOString().slice(0, 10),
        charTitle: (CHARACTER_TITLES[curDm] || CHARACTER_TITLES['甲']).title
    };
    // 중복 제거 (같은 이름+생일)
    const filtered = history.filter(h => !(h.name === entry.name && h.birth === entry.birth));
    filtered.unshift(entry);
    // 최대 5개
    localStorage.setItem('saju_history', JSON.stringify(filtered.slice(0, 5)));
}

function loadAnalysisHistory() {
    const history = JSON.parse(localStorage.getItem('saju_history') || '[]');
    const container = document.getElementById('analysisHistory');
    const list = document.getElementById('historyList');
    if (!container || !list || history.length === 0) return;

    container.style.display = 'block';
    list.innerHTML = history.map((h, i) => {
        const charData = CHARACTER_TITLES[h.dayStem] || CHARACTER_TITLES['甲'];
        const genderIcon = h.gender === 'M' ? '👨' : '👩';
        const birthFormatted = h.birth ? `${h.birth.slice(0, 4)}.${h.birth.slice(4, 6)}.${h.birth.slice(6, 8)}` : '';
        return `
            <div class="history-item" onclick="reAnalyze(${i})">
                <span class="history-emoji">${charData.emoji}</span>
                <div class="history-info">
                    <div class="history-name">${genderIcon} ${h.name} <span style="color:var(--accent);font-size:0.75rem;">[${h.dayStem}] ${h.charTitle}</span></div>
                    <div class="history-meta">${birthFormatted} · ${h.date}</div>
                </div>
                <span class="history-arrow">→</span>
            </div>
        `;
    }).join('');
}

function reAnalyze(idx) {
    const history = JSON.parse(localStorage.getItem('saju_history') || '[]');
    const h = history[idx];
    if (!h) return;
    // URL 파라미터로 재분석
    const params = new URLSearchParams();
    params.set('n', h.name);
    params.set('b', h.birth);
    params.set('g', h.gender);
    params.set('t', h.time);
    window.location.href = `index.html?${params.toString()}`;
}

function clearHistory() {
    localStorage.removeItem('saju_history');
    const container = document.getElementById('analysisHistory');
    if (container) container.style.display = 'none';
}

// ═══════ Phase 4: Cookie Consent ═══════
function initCookieConsent() {
    if (localStorage.getItem('saju_cookie_consent')) return;

    const banner = document.createElement('div');
    banner.id = 'cookieConsent';
    banner.innerHTML = `
        <div class="cookie-inner">
            <span class="cookie-icon">🍪</span>
            <div class="cookie-text">
                본 사이트는 Google Analytics 및 AdSense를 위해 쿠키를 사용합니다.
                <a href="javascript:void(0)" onclick="document.getElementById('privacyModal').style.display='flex'" style="color:var(--cyan);text-decoration:underline;">개인정보처리방침</a>
            </div>
            <button class="cookie-accept" onclick="acceptCookies()">동의</button>
        </div>
    `;
    document.body.appendChild(banner);
    setTimeout(() => banner.classList.add('show'), 1500);
}

function acceptCookies() {
    localStorage.setItem('saju_cookie_consent', new Date().toISOString());
    const banner = document.getElementById('cookieConsent');
    if (banner) {
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 500);
    }
}

// ═══════ Phase 4: Scroll-to-Top & Nav ═══════
function initScrollEffects() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    const nav = document.getElementById('siteNav');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const y = window.scrollY;

        // 맨 위로 버튼
        if (scrollBtn) {
            scrollBtn.classList.toggle('visible', y > 400);
        }

        // 네비게이션 숨김/표시
        if (nav) {
            if (y > 60) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }

        lastScrollY = y;
    }, { passive: true });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initDailyFortune();
    initReviewCarousel();
    trackVisit();
    initSeasonalEvent();
    initPWA();
    loadAnalysisHistory();
    initCookieConsent();
    initScrollEffects();
});
