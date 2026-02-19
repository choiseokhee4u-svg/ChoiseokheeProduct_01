// Globals exposed on window
window.P_DATA = null;
window.TEN_GODS_DATA = null;
window.BRANCH_MODIFIERS_DATA = null;
window.SEASON_MODIFIERS_DATA = null;
window.LK_DATA = null;
window.ELEMENT_NAMES_DATA = null;

// Synchronous data loading from window.translations (loaded via ko.js)
if (window.translations) {
    window.P_DATA = window.translations.P;
    window.TEN_GODS_DATA = window.translations.TEN_GODS;
    window.BRANCH_MODIFIERS_DATA = window.translations.BRANCH_MODIFIERS;
    window.SEASON_MODIFIERS_DATA = window.translations.SEASON_MODIFIERS;
    window.LK_DATA = window.translations.LK;
    window.ELEMENT_NAMES_DATA = window.translations.ELEMENT_NAMES;

    // Dispatch event for script.js
    document.dispatchEvent(new Event('scriptDataLoaded'));
} else {
    console.error("Translations not found!");
}
