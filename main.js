let currentLang = localStorage.getItem('lang') || 'ko';
window.translations = {}; // Store translations globally on window
// isScriptDataLoaded는 script.js에서 이미 선언됨. 재선언 삭제.

async function loadTranslations(lang) {
    const response = await fetch(`locales/${lang}.json`);
    return response.json();
}

function applyTranslations(translations) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            element.innerHTML = translations[key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[key]) {
            element.placeholder = translations[key];
        }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        if (translations[key]) {
            element.title = translations[key];
        }
    });
}

async function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    try {
        translations = await loadTranslations(lang);
    } catch (e) {
        console.error('Failed to load translations:', e);
        translations = {};
    }

    applyTranslations(translations);
    updateLangUI();

    // Load dynamic script data as well
    if (typeof loadScriptData === 'function') {
        try {
            await loadScriptData(lang);
            window.isScriptDataLoaded = true; // Use global window property
            document.dispatchEvent(new CustomEvent('scriptDataLoaded')); // Dispatch event
        } catch (e) {
            console.error('Failed to load script data:', e);
        }
    }
}

function updateLangUI() {
    document.getElementById('lang-ko').classList.toggle('active', currentLang === 'ko');
    document.getElementById('lang-en').classList.toggle('active', currentLang === 'en');
}

document.addEventListener('DOMContentLoaded', async () => {
    const langSwitcher = document.createElement('div');
    langSwitcher.className = 'lang-switcher';
    langSwitcher.innerHTML = `
        <button id="lang-ko">KR</button>
        <button id="lang-en">EN</button>
    `;
    document.body.prepend(langSwitcher);

    document.getElementById('lang-ko').addEventListener('click', () => setLanguage('ko'));
    document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));

    // Initial language setting
    await setLanguage(currentLang);

    // FOUC 방지: body 표시
    document.body.classList.add('loaded');

    // 무당 신점 모바일 터치/스크롤 효과 (안전하게 try-catch)
    try { initShamanEffects(); } catch (e) { console.warn('Shaman effects init error:', e); }
});

// window.onload 안전장치: CSS 완전 로딩 후 body 표시
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});
// 최종 안전장치: 3초 후 강제 표시
setTimeout(function () {
    if (document.body) document.body.classList.add('loaded');
}, 3000);

// ====== 무당 신점 효과 시스템 (독립 함수, 에러 시 다른 기능에 영향 없음) ======
function initShamanEffects() {
    var talismanSymbols = ['☰', '☷', '☯', '卍', '🔮', '✦', '◈', '❖', '⚝', '☽'];
    var osaekColors = ['#e74c3c', '#3498db', '#f1c40f', '#ecf0f1', '#2c3e50'];
    var touchThrottle = 0;
    var scrollThrottle = 0;
    var lastScrollY = 0;

    // 스크롤 상단 글로우 바
    var scrollGlow = document.createElement('div');
    scrollGlow.className = 'scroll-glow';
    document.body.appendChild(scrollGlow);

    // 터치 시 부적 문양 + 영적 파동
    document.addEventListener('touchstart', function (e) {
        var now = Date.now();
        if (now - touchThrottle < 200) return;
        touchThrottle = now;

        var touch = e.touches[0];
        var x = touch.clientX;
        var y = touch.clientY;

        var talisman = document.createElement('div');
        talisman.className = 'touch-talisman';
        talisman.textContent = talismanSymbols[Math.floor(Math.random() * talismanSymbols.length)];
        talisman.style.left = (x - 15) + 'px';
        talisman.style.top = (y - 15) + 'px';
        document.body.appendChild(talisman);
        setTimeout(function () { talisman.remove(); }, 1300);

        var ripple = document.createElement('div');
        ripple.className = 'spirit-ripple';
        ripple.style.left = (x - 5) + 'px';
        ripple.style.top = (y - 5) + 'px';
        document.body.appendChild(ripple);
        setTimeout(function () { ripple.remove(); }, 1100);
    }, { passive: true });

    // 스크롤 시 연기/안개 + 오색기 + 글로우
    var scrollGlowTimeout;
    window.addEventListener('scroll', function () {
        var now = Date.now();
        var sy = window.scrollY;
        var scrollDelta = Math.abs(sy - lastScrollY);
        lastScrollY = sy;

        scrollGlow.classList.add('active');
        clearTimeout(scrollGlowTimeout);
        scrollGlowTimeout = setTimeout(function () {
            scrollGlow.classList.remove('active');
        }, 500);

        if (now - scrollThrottle < 300) return;
        scrollThrottle = now;

        if (scrollDelta > 30) {
            var smoke = document.createElement('div');
            smoke.className = 'smoke-particle';
            smoke.style.left = (Math.random() * window.innerWidth) + 'px';
            smoke.style.top = (Math.random() * window.innerHeight * 0.7 + window.innerHeight * 0.15) + 'px';
            document.body.appendChild(smoke);
            setTimeout(function () { smoke.remove(); }, 3100);
        }

        if (scrollDelta > 60) {
            for (var i = 0; i < 3; i++) {
                var flag = document.createElement('div');
                flag.className = 'osaek-flag';
                var color = osaekColors[Math.floor(Math.random() * osaekColors.length)];
                flag.style.backgroundColor = color;
                flag.style[Math.random() > 0.5 ? 'left' : 'right'] = (Math.random() * 40 + 5) + 'px';
                flag.style.top = (Math.random() * window.innerHeight) + 'px';
                flag.style.boxShadow = '0 0 10px ' + color;
                document.body.appendChild(flag);
                setTimeout(function () { flag.remove(); }, 2100);
            }
        }
    }, { passive: true });

    // 백과사전 카드 스크롤 진입 애니메이션
    if (typeof IntersectionObserver !== 'undefined') {
        var cardObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.enc-card').forEach(function (card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            cardObserver.observe(card);
        });
    }
}
