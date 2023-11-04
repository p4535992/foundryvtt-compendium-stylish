import API from "./scripts/api";
import CONSTANTS from "./scripts/constants";
import {
  applyChangesCompendiumBanner,
  applyChangesCompendiumBannerBase,
  applyChangesCompendiumHeader,
} from "./scripts/main";

Hooks.on("setup", () => {
  const data = game.modules.get(CONSTANTS.MODULE_ID);
  data.api = API;
});

Hooks.on("renderSidebarTab", (tab) => {
  if (tab instanceof CompendiumDirectory) {
    applyChangesCompendiumBanner();
    applyChangesCompendiumBannerBase();
  }
  if (tab instanceof Compendium) {
    applyChangesCompendiumHeader();
  }
});

Hooks.on("changeSidebarTab", (tab) => {
  if (tab instanceof CompendiumDirectory) {
    applyChangesCompendiumBanner();
    applyChangesCompendiumBannerBase();
  }
  if (tab instanceof Compendium) {
    applyChangesCompendiumHeader();
  }
});
