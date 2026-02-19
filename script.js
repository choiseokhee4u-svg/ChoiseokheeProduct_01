window.isScriptDataLoaded = false;
document.addEventListener('scriptDataLoaded', () => {
    window.isScriptDataLoaded = true;
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkShareParams);
    } else {
        checkShareParams();
    }
});

function getShareUrl() {
    // Generate URL with current result data
    const p = new URLSearchParams();
    if (window.shareData) {
        p.set('n', window.shareData.n);
        p.set('b', window.shareData.b);
        p.set('g', window.shareData.g);
        p.set('t', window.shareData.t);
    }
    return window.location.origin + window.location.pathname + '?' + p.toString();
}

function checkShareParams() {
    const p = new URLSearchParams(window.location.search);
    const n = p.get('n');
    const b = p.get('b');
    const g = p.get('g');
    const t = p.get('t');

    if (n && b && g) {
        // Set inputs from params
        const unInput = document.getElementById('userName');
        if (unInput) unInput.value = n;

        // Select Quick Tab
        const quickTab = document.querySelector('button[data-tab="quick"]');
        if (quickTab) quickTab.click();

        // Set Date
        const qDate = document.getElementById('quickDate');
        if (qDate) qDate.value = b;

        // Set Gender
        const gBtn = document.querySelector(`.gender-sel button[data-g="${g}"]`);
        if (gBtn) gBtn.click();

        // Set Time
        const unkTime = document.getElementById('unknownTime');
        if (t === 'u') {
            if (unkTime) unkTime.click();
        } else {
            // If checkbox is checked, uncheck it
            if (unkTime && unkTime.checked) unkTime.click();

            const tVal = parseInt(t);
            const hh = Math.floor(tVal / 100);
            const mi = tVal % 100;
            const isPm = hh >= 12; // Simple logic, assumes user inputs 0-23
            // But UI uses AM/PM + 1-12
            // Convert 24h to 12h
            let uiH = hh;
            let uiAmpm = 'AM';
            if (hh >= 12) { uiAmpm = 'PM'; uiH = hh > 12 ? hh - 12 : 12; }
            if (hh === 0) { uiH = 12; }

            const sa = document.getElementById('selAmpm');
            const sh = document.getElementById('selHour');
            const sm = document.getElementById('selMinute');
            if (sa) sa.value = uiAmpm;
            if (sh) sh.value = uiH;
            if (sm) sm.value = mi;
        }

        // Add shared-view class
        document.body.classList.add('shared-view');

        // Change Retry Button Text to "Test Mine Too"
        const retryBtn = document.querySelector('.reset');
        if (retryBtn) {
            retryBtn.removeAttribute('data-i18n'); // Prevent overwrite
            retryBtn.innerText = window.translations.test_mine_button || "🙋‍♂️ 나도 테스트 하기";
        }

        // Auto Analyze
        setTimeout(analyze, 500);
    }
}

// Kakao Init
if (window.Kakao && !Kakao.isInitialized()) {
    Kakao.init('14302bcc718209aaa470793e426fbb2a');
}

// Initialize Time/Date Options immediately
// Initialize Time/Date Options safely
document.addEventListener('DOMContentLoaded', () => {
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
});

// Global Variables
let uName = '', fType = 'today', curDm = '', curPd = null, curTheme = 'base', gender = 'M', userInput = {};

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
document.querySelectorAll('.fortune-sel button').forEach(b => b.onclick = () => { document.querySelectorAll('.fortune-sel button').forEach(x => x.classList.remove('on')); b.classList.add('on'); fType = b.dataset.t; updateQuest() });
document.querySelectorAll('.gender-sel button').forEach(b => b.onclick = () => { document.querySelectorAll('.gender-sel button').forEach(x => x.classList.remove('on')); b.classList.add('on'); gender = b.dataset.g });
document.querySelectorAll('.tab-row button').forEach(b => b.onclick = () => { document.querySelectorAll('.tab-row button').forEach(x => x.classList.remove('on')); document.querySelectorAll('.tab-c').forEach(x => x.classList.remove('on')); b.classList.add('on'); document.getElementById('tab-' + b.dataset.tab).classList.add('on') });
document.querySelectorAll('.theme-tabs button').forEach(b => b.onclick = () => { document.querySelectorAll('.theme-tabs button').forEach(x => x.classList.remove('on')); b.classList.add('on'); curTheme = b.dataset.th; updateTheme() });

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
                calcCompatibility(pName, pY, pM, pD, pH, pMi);
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

function calcCompatibility(pn, y, m, d, h, mi) {
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
