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


// ═══════ Daily Fortune System ═══════
const DAILY_MESSAGES = [
    "오늘은 새로운 시작의 기운이 감도는 날입니다. 용기를 내어 첫 발을 내디뎌 보세요. 🌱",
    "지갑을 열기 전에 세 번 생각하세요. 오늘은 절약이 곧 재물복입니다. 💰",
    "오래된 친구에게 연락해보세요. 뜻밖의 기쁜 소식이 올 수 있습니다. 📱",
    "하늘이 내린 귀인을 만날 수 있는 날! 약속을 미루지 마세요. ✨",
    "오늘은 조용히 내면을 돌아보는 시간을 가지세요. 명상이 큰 도움이 됩니다. 🧘",
    "남을 돕는 작은 행동이 큰 복이 되어 돌아올 날입니다. 선행을 실천하세요. 🤝",
    "건강에 주의하세요. 따뜻한 차 한잔이 몸과 마음을 치유합니다. 🍵",
    "오늘의 구설수를 조심하세요. 말을 아끼면 화를 피할 수 있습니다. 🤫",
    "직감을 믿으세요! 오늘 번뜩이는 아이디어가 미래를 바꿀 수 있습니다. 💡",
    "사랑하는 사람에게 마음을 표현하세요. 오늘은 연애운이 빛나는 날! 💕",
    "역마살이 기운이 도니 가까운 곳이라도 산책을 다녀오세요. 기분이 환기됩니다. 🚶",
    "이직이나 전직을 고민 중이라면, 오늘은 정보 수집에 최적인 날입니다. 📝",
    "금전적인 제안에는 신중하게 대응하세요. 서두르면 손해를 볼 수 있습니다. ⚠️",
    "가족과 함께하는 시간이 행운을 부릅니다. 소소한 대화가 큰 힘이 됩니다. 🏠",
    "오늘은 두뇌 회전이 빠른 날! 공부나 시험에 좋은 결과가 기대됩니다. 📚",
    "예상치 못한 횡재수가 있을 수 있습니다. 눈을 크게 뜨고 기회를 잡으세요! 🍀",
    "감정 기복이 심할 수 있는 날입니다. 깊은 호흡으로 마음을 다스려보세요. 🌊",
    "오늘은 뭘 해도 되는 대길한 날! 그동안 미뤄왔던 일을 시작하세요. 🎯",
    "주변의 충고에 귀를 기울이세요. 쓴 소리가 약이 될 수 있습니다. 👂",
    "자기 자신을 칭찬하는 날! 그동안 수고한 나에게 작은 선물을 하세요. 🎁",
    "오늘의 행운은 동쪽에서 옵니다. 아침 일찍 해를 보며 소원을 빌어보세요. ☀️",
    "문서운이 좋은 날! 계약이나 합격 소식을 기대해볼 수 있습니다. 📜",
    "참을수록 복이 오는 날입니다. 화가 나더라도 3초만 참아보세요. 🙏",
    "옷장을 정리하면 운기가 트입니다. 오래된 것을 버리면 새것이 들어옵니다. 👗",
    "카리스마가 빛나는 날! 리더십을 발휘하면 주변의 인정을 받습니다. 👑",
    "오늘은 물을 많이 마시세요. 수(水) 기운이 부족한 날이니 보충이 필요합니다. 💧",
    "일찍 자고 일찍 일어나면 좋은 기운을 받을 수 있는 날입니다. 🌅",
    "지인의 부탁을 들어주면 좋은 인연이 이어집니다. 인정을 아끼지 마세요. 💫",
    "금전운이 상승하는 날! 평소 관심 있던 재테크를 공부해보세요. 📈",
    "오늘은 혼자만의 시간이 필요한 날입니다. 자연 속에서 힐링해보세요. 🌳",
    "웃음은 만병통치약! 오늘 하루도 밝게 웃으면 좋은 기운이 모입니다. 😊"
];

const DAILY_LUCKY_DATA = [
    { color: '🟢 초록', number: 3, food: '샐러드', direction: '동쪽' },
    { color: '🔴 빨강', number: 7, food: '매운탕', direction: '남쪽' },
    { color: '🟡 노랑', number: 5, food: '카레', direction: '중앙' },
    { color: '⚪ 흰색', number: 9, food: '요거트', direction: '서쪽' },
    { color: '🔵 파랑', number: 1, food: '해물파전', direction: '북쪽' },
    { color: '💜 보라', number: 4, food: '포도', direction: '남동쪽' },
    { color: '🟠 주황', number: 8, food: '감귤', direction: '남서쪽' }
];

function initDailyFortune() {
    const now = new Date();
    const dateStr = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = dayNames[now.getDay()];

    const dateEl = document.getElementById('dailyDate');
    const msgEl = document.getElementById('dailyMessage');
    const luckyEl = document.getElementById('dailyLucky');

    if (!dateEl || !msgEl || !luckyEl) return;

    dateEl.textContent = `${dateStr} (${dayName})`;

    // Date-based hash for consistent daily content
    const dayHash = (now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate()) % DAILY_MESSAGES.length;
    msgEl.textContent = DAILY_MESSAGES[dayHash];

    const luckyHash = (now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate()) % DAILY_LUCKY_DATA.length;
    const lucky = DAILY_LUCKY_DATA[luckyHash];

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

// ═══════ Visit Counter (localStorage) ═══════
function trackVisit() {
    const today = new Date().toISOString().slice(0, 10);
    const lastVisit = localStorage.getItem('saju_last_visit');
    let streak = parseInt(localStorage.getItem('saju_visit_streak') || '0');
    let totalVisits = parseInt(localStorage.getItem('saju_total_visits') || '0');

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

    // Show streak badge if 2+ days
    if (streak >= 2) {
        const dateEl = document.getElementById('dailyDate');
        if (dateEl) {
            dateEl.innerHTML += ` <span style="color:var(--pink); font-weight:700;">🔥 ${streak}일 연속 방문!</span>`;
        }
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initDailyFortune();
    initReviewCarousel();
    trackVisit();
});

