import API from "./scripts/api";
import { CompendiumThemerContainer } from "./scripts/compendium-themer-collection";
import CONSTANTS from "./scripts/constants";
import {
    applyChangeMinimalCss,
    applyChangesCompendiumBanner,
    applyChangesCompendiumBannerBasePost,
    applyChangesCompendiumBannerBasePre,
    applyChangesCompendiumHeader,
} from "./scripts/main";
import { registerSettings } from "./scripts/settings";

/* ------------------------------------ */
/* Initialize module					*/
/* ------------------------------------ */
Hooks.once("init", () => {
    // Register custom module settings
    registerSettings();

    // initHooks();
});

/* ------------------------------------ */
/* Setup module							*/
/* ------------------------------------ */
Hooks.once("setup", function () {
    // Do anything after initialization but before ready
    //setupHooks();

    const data = game.modules.get(CONSTANTS.MODULE_ID);
    data.api = API;

    game.modules.get(CONSTANTS.MODULE_ID).api.compendiumThemerContainer = mergeObject(
        CompendiumThemerContainer,
        game.settings.get(CONSTANTS.MODULE_ID, "configurations"),
    );
});

/* ------------------------------------ */
/* When ready							*/
/* ------------------------------------ */
Hooks.once("ready", () => {
    // Do anything once the module is ready
    // readyHooks();
});

// Add any additional hooks if necessary

Hooks.on("renderSidebarTab", (tab) => {
    if (tab instanceof CompendiumDirectory) {
        applyChangesCompendiumBanner();
        applyChangesCompendiumBannerBasePre();
        if (game.settings.get(CONSTANTS.MODULE_ID, "applyMinimalCss")) {
            applyChangeMinimalCss();
        }
        applyChangesCompendiumBannerBasePost();
    }
    if (tab instanceof Compendium) {
        applyChangesCompendiumHeader();
    }
});

// Hooks.on("changeSidebarTab", (tab) => {
//   if (tab instanceof CompendiumDirectory) {
//     applyChangesCompendiumBanner();
//     applyChangesCompendiumBannerBase();
//   }
//   if (tab instanceof Compendium) {
//     applyChangesCompendiumHeader();
//   }
// });
