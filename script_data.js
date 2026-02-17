// Globals exposed on window
window.P_DATA = null;
window.TEN_GODS_DATA = null;
window.BRANCH_MODIFIERS_DATA = null;
window.SEASON_MODIFIERS_DATA = null;
window.LK_DATA = null;
window.ELEMENT_NAMES_DATA = null;

window.loadScriptData = async function (lang) {
    const response = await fetch(`locales/${lang}.json?v=${new Date().getTime()}`);
    const translations = await response.json();
    window.P_DATA = translations.P;
    window.TEN_GODS_DATA = translations.TEN_GODS;
    window.BRANCH_MODIFIERS_DATA = translations.BRANCH_MODIFIERS;
    window.SEASON_MODIFIERS_DATA = translations.SEASON_MODIFIERS;
    window.LK_DATA = translations.LK;
    window.ELEMENT_NAMES_DATA = translations.ELEMENT_NAMES;
}
