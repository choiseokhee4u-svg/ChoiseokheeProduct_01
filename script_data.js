let P_DATA, TEN_GODS_DATA, BRANCH_MODIFIERS_DATA, SEASON_MODIFIERS_DATA, LK_DATA, ELEMENT_NAMES_DATA;

async function loadScriptData(lang) {
    const response = await fetch(`locales/${lang}.json`);
    const translations = await response.json();
    P_DATA = translations.P;
    TEN_GODS_DATA = translations.TEN_GODS;
    BRANCH_MODIFIERS_DATA = translations.BRANCH_MODIFIERS;
    SEASON_MODIFIERS_DATA = translations.SEASON_MODIFIERS;
    LK_DATA = translations.LK;
    ELEMENT_NAMES_DATA = translations.ELEMENT_NAMES;
}
