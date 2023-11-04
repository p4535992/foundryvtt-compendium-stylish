export function applyChangesCompendiumBannerBase() {
  const compendiumItems = document.querySelectorAll(".compendium-sidebar .directory-item.compendium");

  compendiumItems.forEach((item) => {
    item.style.alignItems = game.settings.get(CONSTANTS.MODULE_ID, "labelAlignment");
  });

  compendiumItems.forEach((item) => {
    item.style.height = `${game.settings.get(CONSTANTS.MODULE_ID, "bannerHeight")}px`;
  });

  if (game.settings.get(CONSTANTS.MODULE_ID, "hideSource")) {
    const sourceItems = document.querySelectorAll(".compendium-sidebar .directory-item.compendium .compendium-footer");

    sourceItems.forEach((item) => {
      item.style.display = "none";
    });
  }

  if (game.settings.get(CONSTANTS.MODULE_ID, "removeBanners")) {
    const images = document.querySelectorAll(".compendium-sidebar .directory-item.compendium .compendium-banner");

    images.forEach((item) => {
      item.style.display = "none";
    });
  }
}
