window.isScriptDataLoaded = false;
document.addEventListener('scriptDataLoaded', () => {
    window.isScriptDataLoaded = true;
    checkShareParams();
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
        document.getElementById('userName').value = n;

        // Select Quick Tab
        const quickTab = document.querySelector('button[data-tab="quick"]');
        if (quickTab) quickTab.click();

        // Set Date
        document.getElementById('quickDate').value = b;

        // Set Gender
        const gBtn = document.querySelector(`.gender-sel button[data-g="${g}"]`);
        if (gBtn) gBtn.click();

        // Set Time
        if (t === 'u') {
            document.getElementById('unknownTime').click();
        } else {
            // If checkbox is checked, uncheck it
            const ut = document.getElementById('unknownTime');
            if (ut.checked) ut.click();

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

            document.getElementById('selAmpm').value = uiAmpm;
            document.getElementById('selHour').value = uiH;
            document.getElementById('selMinute').value = mi;
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
const yS = document.getElementById('selYear'), mS = document.getElementById('selMonth'), dS = document.getElementById('selDay'), hS = document.getElementById('selHour'), minS = document.getElementById('selMinute');
for (let y = new Date().getFullYear(); y >= 1920; y--)yS.innerHTML += `<option value="${y}">${y}</option>`;
for (let m = 1; m <= 12; m++)mS.innerHTML += `<option value="${m}">${m}월</option>`;
for (let d = 1; d <= 31; d++)dS.innerHTML += `<option value="${d}">${d}</option>`;
for (let h = 1; h <= 12; h++)hS.innerHTML += `<option value="${h}">${h}시</option>`;
for (let m = 0; m < 60; m++)minS.innerHTML += `<option value="${m}">${String(m).padStart(2, '0')}분</option>`;
document.getElementById('unknownTime').onchange = e => { const t = document.getElementById('timeInputs'); t.style.opacity = e.target.checked ? '.4' : '1'; t.style.pointerEvents = e.target.checked ? 'none' : 'auto' };

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

    uName = document.getElementById('userName').value.trim() || window.translations.default_name;
    let y, mo, d, h, mi;
    const tab = document.querySelector('.tab-row button.on').dataset.tab;
    if (tab === 'quick') {
        const v = document.getElementById('quickDate').value.trim();
        if (!/^\d{8}$/.test(v)) { alert(window.translations.alert_birthdate_format); return }
        y = +v.slice(0, 4); mo = +v.slice(4, 6); d = +v.slice(6, 8);
    } else {
        y = +yS.value; mo = +mS.value; d = +dS.value;
    }
    if (mo < 1 || mo > 12 || d < 1 || d > 31) { alert(window.translations.alert_invalid_date); return }
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
    updateQuest();
    document.getElementById('sajuMbti').innerHTML = `${curDm}`;
    document.getElementById('soulT').innerHTML = ``;
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

// ────── Result Card Image Generator ──────
function generateCard() {
    const canvas = document.createElement('canvas');
    const W = 720, H = 1280;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#0f0c29');
    bgGrad.addColorStop(0.5, '#1a1145');
    bgGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Stars
    for (let i = 0; i < 120; i++) {
        const x = Math.random() * W, y = Math.random() * H;
        const r = Math.random() * 1.8 + 0.3;
        const alpha = Math.random() * 0.7 + 0.3;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
    }

    // Nebula glow
    const nb1 = ctx.createRadialGradient(W * 0.2, H * 0.15, 0, W * 0.2, H * 0.15, 200);
    nb1.addColorStop(0, 'rgba(168, 85, 247, 0.12)');
    nb1.addColorStop(1, 'rgba(168, 85, 247, 0)');
    ctx.fillStyle = nb1;
    ctx.fillRect(0, 0, W, H);

    const nb2 = ctx.createRadialGradient(W * 0.8, H * 0.7, 0, W * 0.8, H * 0.7, 250);
    nb2.addColorStop(0, 'rgba(0, 245, 212, 0.08)');
    nb2.addColorStop(1, 'rgba(0, 245, 212, 0)');
    ctx.fillStyle = nb2;
    ctx.fillRect(0, 0, W, H);

    // Moon
    ctx.beginPath();
    ctx.arc(W - 80, 100, 35, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 245, 200, 0.15)';
    ctx.fill();

    // Top/Bottom ornament lines
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(60, 60); ctx.lineTo(W - 60, 60); ctx.stroke();
    ctx.strokeStyle = 'rgba(0, 245, 212, 0.3)';
    ctx.beginPath(); ctx.moveTo(60, 64); ctx.lineTo(W - 60, 64); ctx.stroke();

    // Title
    ctx.font = '600 18px sans-serif';
    ctx.fillStyle = 'rgba(203, 213, 225, 0.7)';
    ctx.textAlign = 'center';
    ctx.fillText('🌙 용한점집 달의 신당', W / 2, 100);

    // User Name
    ctx.font = '800 38px sans-serif';
    ctx.fillStyle = '#f0f0ff';
    ctx.fillText(uName + '님의 운명 카드', W / 2, 160);

    // Divider
    const dg = ctx.createLinearGradient(100, 0, W - 100, 0);
    dg.addColorStop(0, 'rgba(168, 85, 247, 0)');
    dg.addColorStop(0.5, 'rgba(168, 85, 247, 0.5)');
    dg.addColorStop(1, 'rgba(168, 85, 247, 0)');
    ctx.strokeStyle = dg;
    ctx.beginPath(); ctx.moveTo(100, 185); ctx.lineTo(W - 100, 185); ctx.stroke();

    // Character emoji (text-based, no external font needed)
    const charData = CHARACTER_TITLES[curDm] || CHARACTER_TITLES['甲'];
    ctx.font = '64px sans-serif';
    ctx.fillText(charData.emoji, W / 2, 270);

    // Character title
    ctx.font = '800 32px sans-serif';
    const tGrad = ctx.createLinearGradient(W / 2 - 100, 0, W / 2 + 100, 0);
    tGrad.addColorStop(0, '#00f5d4');
    tGrad.addColorStop(1, '#a855f7');
    ctx.fillStyle = tGrad;
    ctx.fillText('"' + charData.title + '"', W / 2, 320);

    ctx.font = '400 18px sans-serif';
    ctx.fillStyle = 'rgba(203, 213, 225, 0.8)';
    ctx.fillText(charData.desc, W / 2, 355);

    // Day Stem badge
    const myEl = STEM_EL[curDm] || 'WOOD';
    const elColor = E[myEl].c;
    ctx.beginPath();
    _rr(ctx, W / 2 - 55, 385, 110, 50, 12);
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fill();
    ctx.strokeStyle = elColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.font = '800 28px sans-serif';
    ctx.fillStyle = elColor;
    ctx.fillText(curDm, W / 2, 420);

    // Five Elements Label
    ctx.font = '600 20px sans-serif';
    ctx.fillStyle = 'rgba(203, 213, 225, 0.6)';
    ctx.fillText('✦ 오행 분포 ✦', W / 2, 490);

    // Five Elements Bars
    const elems = ['WOOD', 'FIRE', 'EARTH', 'METAL', 'WATER'];
    const elN = { WOOD: '목', FIRE: '화', EARTH: '토', METAL: '금', WATER: '수' };
    const bsY = 510, bH = 28, bGap = 12, bMaxW = 400, bsX = 160;
    const statNums = document.querySelectorAll('.stat-n');

    elems.forEach((k, i) => {
        const e = E[k];
        const c = parseInt(statNums[i]?.innerText || '0');
        const pc = c / 8;
        const y = bsY + i * (bH + bGap);

        ctx.font = '600 16px sans-serif';
        ctx.fillStyle = e.c;
        ctx.textAlign = 'right';
        ctx.fillText(elN[k], bsX - 12, y + 20);

        ctx.beginPath();
        _rr(ctx, bsX, y, bMaxW, bH, 6);
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        ctx.fill();

        const fW = Math.max(pc * bMaxW, 4);
        ctx.beginPath();
        _rr(ctx, bsX, y, fW, bH, 6);
        ctx.fillStyle = e.c;
        ctx.fill();

        ctx.font = '700 14px sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.textAlign = 'left';
        ctx.fillText(String(c), bsX + fW + 8, y + 20);
    });

    ctx.textAlign = 'center';

    // Lucky Items
    const tSolar = Solar.fromYmd(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
    const tLunar = tSolar.getLunar();
    const tBz = tLunar.getEightChar();
    const tStem = tBz.getDayGan().toString();
    const tEl = STEM_EL[tStem] || 'WOOD';
    const lData = LUCKY_ITEMS[tEl];

    const lY = 750;
    ctx.font = '600 20px sans-serif';
    ctx.fillStyle = 'rgba(203, 213, 225, 0.6)';
    ctx.fillText('🌟 오늘의 럭키 아이템 🌟', W / 2, lY);

    const gItems = [
        { label: '🎨 컬러', value: lData.color, color: lData.colorHex },
        { label: '🔢 넘버', value: String(lData.number), color: '#f0f0ff' },
        { label: '🧭 방향', value: lData.direction, color: '#f0f0ff' },
        { label: '🍽️ 음식', value: lData.food, color: '#f0f0ff' }
    ];
    const cW = 260, cH = 74, cG = 16;
    const gSX = W / 2 - cW - cG / 2;

    gItems.forEach((item, i) => {
        const col = i % 2, row = Math.floor(i / 2);
        const x = gSX + col * (cW + cG);
        const y = lY + 20 + row * (cH + cG);

        ctx.beginPath();
        _rr(ctx, x, y, cW, cH, 12);
        ctx.fillStyle = 'rgba(0,0,0,0.35)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.font = '400 13px sans-serif';
        ctx.fillStyle = 'rgba(203, 213, 225, 0.6)';
        ctx.fillText(item.label, x + cW / 2, y + 28);

        ctx.font = '700 18px sans-serif';
        ctx.fillStyle = item.color;
        ctx.fillText(item.value, x + cW / 2, y + 56);
    });

    // Lucky action
    const aY = lY + 20 + 2 * (cH + cG) + 16;
    ctx.beginPath();
    _rr(ctx, 80, aY, W - 160, 44, 12);
    ctx.fillStyle = 'rgba(0, 245, 212, 0.1)';
    ctx.fill();
    ctx.setLineDash([6, 4]);
    ctx.strokeStyle = 'rgba(0, 245, 212, 0.5)';
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.font = '600 18px sans-serif';
    ctx.fillStyle = '#00f5d4';
    ctx.fillText(lData.action, W / 2, aY + 28);

    // Bottom
    const btmDG = ctx.createLinearGradient(100, 0, W - 100, 0);
    btmDG.addColorStop(0, 'rgba(0, 245, 212, 0)');
    btmDG.addColorStop(0.5, 'rgba(0, 245, 212, 0.3)');
    btmDG.addColorStop(1, 'rgba(0, 245, 212, 0)');
    ctx.strokeStyle = btmDG;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(100, H - 140); ctx.lineTo(W - 100, H - 140); ctx.stroke();

    const now = new Date();
    ctx.font = '400 15px sans-serif';
    ctx.fillStyle = 'rgba(203, 213, 225, 0.5)';
    ctx.fillText(`${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`, W / 2, H - 105);

    ctx.font = '400 14px sans-serif';
    ctx.fillStyle = 'rgba(203, 213, 225, 0.35)';
    ctx.fillText('yonghanjeomjip.com', W / 2, H - 70);

    ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
    ctx.beginPath(); ctx.moveTo(60, H - 40); ctx.lineTo(W - 60, H - 40); ctx.stroke();

    // Download
    canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `달의신당_${uName}_운명카드.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 'image/png');
}

// Rounded rect helper
function _rr(ctx, x, y, w, h, r) {
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
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
