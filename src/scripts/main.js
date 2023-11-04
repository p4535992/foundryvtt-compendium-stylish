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

export function applyChangesCompendiumHeader() {
  for (const DATA_PACK of DATA_PACKS) {
    const headerBanner = document.querySelectorAll(`.directory.compendium[data-pack='${DATA_PACK}'] .header-banner`);
    headerBanner.forEach((item) => {
      item.style.color = "#ff5252";
      item.style["background-image"] = `url('modules/${MODULE_ID}/assets/cover.webp')`;
      item.style["background-repeat"] = `no-repeat`;
      item.style["background-position"] = `center`;
      item.style["background-size"] = `cover`;
    });
  }
}

export function applyChangesCompendiumBanner() {
  for (const DATA_PACK of DATA_PACKS) {
    const images = document.querySelectorAll(
      `.compendium-sidebar .directory-item.compendium[data-pack='${DATA_PACK}'] .compendium-banner`
    );
    images.forEach((image) => {
      image.remove();
    });

    const compendiumItems = document.querySelectorAll(
      `.compendium-sidebar .directory-item.compendium[data-pack='${DATA_PACK}']`
    );
    compendiumItems.forEach((item) => {
      item.style.color = "#ff5252";
      const myImage = new Image();
      myImage.src = `modules/${MODULE_ID}/assets/cover.webp`;
      myImage.classList.add("compendium-banner");
      item.prepend(myImage);
    });

    const sourceFooter = document.querySelectorAll(
      `.compendium-sidebar .directory-item.compendium[data-pack='${DATA_PACK}'] .compendium-footer`
    );
    sourceFooter.forEach((source) => {
      source.style.color = "#ff5252";
    });
  }
}
