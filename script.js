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
input: ['Pyeon-in', 'Jeong-in']
};
const E = { WOOD: { img: 'images/Wood.png', c: '#4ade80' }, FIRE: { img: 'images/Fire.png', c: '#f87171' }, EARTH: { img: 'images/Earth.png', c: '#fbbf24' }, METAL: { img: 'images/Metal.png', c: '#e2e8f0' }, WATER: { img: 'images/Water.png', c: '#60a5fa' } };
const EM = { '甲': 'WOOD', '乙': 'WOOD', '丙': 'FIRE', '丁': 'FIRE', '戊': 'EARTH', '己': 'EARTH', '庚': 'METAL', '辛': 'METAL', '壬': 'WATER', '癸': 'WATER', '寅': 'WOOD', '卯': 'WOOD', '巳': 'FIRE', '午': 'FIRE', '辰': 'EARTH', '戌': 'EARTH', '丑': 'EARTH', '未': 'EARTH', '申': 'METAL', '酉': 'METAL', '亥': 'WATER', '子': 'WATER' };
const EM = { '甲': 'WOOD', '乙': 'WOOD', '丙': 'FIRE', '丁': 'FIRE', '戊': 'EARTH', '己': 'EARTH', '庚': 'METAL', '辛': 'METAL', '壬': 'WATER', '癸': 'WATER', '寅': 'WOOD', '卯': 'WOOD', '巳': 'FIRE', '午': 'FIRE', '辰': 'EARTH', '戌': 'EARTH', '丑': 'EARTH', '未': 'EARTH', '申': 'METAL', '酉': 'METAL', '亥': 'WATER', '子': 'WATER' };
const STEM_EL = { '甲': 'WOOD', '乙': 'WOOD', '丙': 'FIRE', '丁': 'FIRE', '戊': 'EARTH', '己': 'EARTH', '庚': 'METAL', '辛': 'METAL', '壬': 'WATER', '癸': 'WATER' };
const GENERATING = { WOOD: 'WATER', FIRE: 'WOOD', EARTH: 'FIRE', METAL: 'EARTH', WATER: 'METAL' };
const OVERCOMING = { WOOD: 'METAL', FIRE: 'WATER', EARTH: 'WOOD', METAL: 'FIRE', WATER: 'EARTH' };
const ELEMENT_STEM = { WOOD: '甲', FIRE: '丙', EARTH: '戊', METAL: '庚', WATER: '壬' };
const ELEMENT_COLORS = { WOOD: { bg: '#10b981', t: '#fff' }, FIRE: { bg: '#ef4444', t: '#fff' }, EARTH: { bg: '#eab308', t: '#1f2937' }, METAL: { bg: '#f8fafc', t: '#374151' }, WATER: { bg: '#1e1b4b', t: '#c4b5fd' } };

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
    curTheme = 'base';
    document.querySelectorAll('.theme-tabs button').forEach((b, i) => b.classList.toggle('on', i === 0));
    updateTheme();

    const statCard = document.getElementById('statChart').parentElement;
    statCard.querySelector('.sec-title').innerHTML = `📜 <span class="nm" id="n2">${uName}</span>${window.translations.five_elements_text}`;

    const ch = document.getElementById('statChart'); ch.innerHTML = '';
    ['WOOD', 'FIRE', 'EARTH', 'METAL', 'WATER'].forEach(k => {
        const e = E[k], c = cnt[k], pc = (c / 8) * 100;
        const eName = window.ELEMENT_NAMES_DATA[k];
        const iconHtml = e.img.includes('.') ? `<img src="${e.img}" alt="${eName}">` : e.img;
        ch.innerHTML += `<div class="stat-row"><span class="element-icon">${iconHtml} <span style="font-size:0.8em; opacity:0.8; margin-left:4px;">(${eName})</span></span><div class="stat-track"><div class="stat-fill" style="background:${e.c}" data-w="${pc}%"></div></div><span class="stat-n">${c}</span></div>`;
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
