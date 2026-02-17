let currentLang = localStorage.getItem('lang') || 'ko';
let translations = {}; // Store translations globally
let isScriptDataLoaded = false; // Flag to check if dynamic script data is loaded

// FOUC 방지: CSS 로딩 후 body 표시
function showBody() {
    document.body.classList.add('loaded');
}
// window.onload는 모든 리소스(CSS, 이미지 등) 로딩 후 발생
window.addEventListener('load', showBody);
// 안전장치: 2초 후에도 안 보이면 강제 표시
setTimeout(showBody, 2000);

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
    translations = await loadTranslations(lang);
    applyTranslations(translations);
    updateLangUI();

    // Load dynamic script data as well
    if (typeof loadScriptData === 'function') {
        await loadScriptData(lang);
        isScriptDataLoaded = true; // Set flag to true after data is loaded
        document.dispatchEvent(new CustomEvent('scriptDataLoaded')); // Dispatch event
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

    // ========================================
    // 무당 신점 모바일 터치/스크롤 효과
    // ========================================
    initShamanEffects();
});

// ====== 무당 신점 효과 시스템 ======
function initShamanEffects() {
    const talismanSymbols = ['☰', '☷', '☯', '卍', '🔮', '✦', '◈', '❖', '⚝', '☽'];
    const osaekColors = ['#e74c3c', '#3498db', '#f1c40f', '#ecf0f1', '#2c3e50']; // 적청황백흑
    let touchThrottle = 0;
    let scrollThrottle = 0;
    let lastScrollY = 0;

    // --- 스크롤 상단 글로우 바 ---
    const scrollGlow = document.createElement('div');
    scrollGlow.className = 'scroll-glow';
    document.body.appendChild(scrollGlow);

    // --- 터치 시 부적 문양 + 영적 파동 ---
    document.addEventListener('touchstart', (e) => {
        const now = Date.now();
        if (now - touchThrottle < 200) return; // 쓰로틀 200ms
        touchThrottle = now;

        const touch = e.touches[0];
        const x = touch.clientX;
        const y = touch.clientY;

        // 부적 문양 생성
        const talisman = document.createElement('div');
        talisman.className = 'touch-talisman';
        talisman.textContent = talismanSymbols[Math.floor(Math.random() * talismanSymbols.length)];
        talisman.style.left = (x - 15) + 'px';
        talisman.style.top = (y - 15) + 'px';
        document.body.appendChild(talisman);
        setTimeout(() => talisman.remove(), 1300);

        // 영적 파동 생성
        const ripple = document.createElement('div');
        ripple.className = 'spirit-ripple';
        ripple.style.left = (x - 5) + 'px';
        ripple.style.top = (y - 5) + 'px';
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1100);
    }, { passive: true });

    // --- 스크롤 시 연기/안개 + 오색기 + 글로우 ---
    let scrollGlowTimeout;
    window.addEventListener('scroll', () => {
        const now = Date.now();
        const scrollY = window.scrollY;
        const scrollDelta = Math.abs(scrollY - lastScrollY);
        lastScrollY = scrollY;

        // 글로우 바 활성화
        scrollGlow.classList.add('active');
        clearTimeout(scrollGlowTimeout);
        scrollGlowTimeout = setTimeout(() => {
            scrollGlow.classList.remove('active');
        }, 500);

        // 쓰로틀 (300ms 간격)
        if (now - scrollThrottle < 300) return;
        scrollThrottle = now;

        // 빠른 스크롤 시 연기 효과
        if (scrollDelta > 30) {
            const smoke = document.createElement('div');
            smoke.className = 'smoke-particle';
            smoke.style.left = (Math.random() * window.innerWidth) + 'px';
            smoke.style.top = (Math.random() * window.innerHeight * 0.7 + window.innerHeight * 0.15) + 'px';
            document.body.appendChild(smoke);
            setTimeout(() => smoke.remove(), 3100);
        }

        // 매우 빠른 스크롤 시 오색기 효과
        if (scrollDelta > 60) {
            for (let i = 0; i < 3; i++) {
                const flag = document.createElement('div');
                flag.className = 'osaek-flag';
                flag.style.backgroundColor = osaekColors[Math.floor(Math.random() * osaekColors.length)];
                const side = Math.random() > 0.5 ? 'left' : 'right';
                flag.style[side] = (Math.random() * 40 + 5) + 'px';
                flag.style.top = (Math.random() * window.innerHeight) + 'px';
                flag.style.boxShadow = `0 0 10px ${flag.style.backgroundColor}`;
                document.body.appendChild(flag);
                setTimeout(() => flag.remove(), 2100);
            }
        }
    }, { passive: true });

    // --- 카드 스크롤 진입 애니메이션 (IntersectionObserver) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('card-hidden');
                entry.target.classList.add('card-reveal');
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 백과사전 항목에만 옵저버 적용 (입력/결과 카드는 제외)
    document.querySelectorAll('.enc-card, .blog-article').forEach(card => {
        card.classList.add('card-hidden');
        cardObserver.observe(card);
    });
}
