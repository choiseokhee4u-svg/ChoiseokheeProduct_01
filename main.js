let currentLang = localStorage.getItem('lang') || 'ko';
let translations = {}; // Store translations globally

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
    // Reload dynamic script data as well
    if (typeof loadScriptData === 'function') {
        await loadScriptData(lang);
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
});
