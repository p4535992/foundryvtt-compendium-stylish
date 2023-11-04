import { CompendiumThemerContainer } from "./compendium-themer-collection";

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
  for (const [key, value] of Object.entries(CompendiumThemerContainer)) {
    for (const element of value) {
      if (!element) {
        continue;
      }
      const dataPack = element.dataPack;
      const colorText = element.colorText;
      const iconText = element.iconText;
      const bannerImage = element.bannerImage;

      const headerBanner = document.querySelectorAll(`.directory.compendium[data-pack='${dataPack}'] .header-banner`);
      headerBanner.forEach((item) => {
        item.style.color = colorText;
        item.style["background-image"] = bannerImage;
        item.style["background-repeat"] = `no-repeat`;
        item.style["background-position"] = `center`;
        item.style["background-size"] = `cover`;
      });
    }
  }
}

export function applyChangesCompendiumBanner() {
  for (const [key, value] of Object.entries(CompendiumThemerContainer)) {
    for (const element of value) {
      if (!element) {
        continue;
      }
      const dataPack = element.dataPack;
      const colorText = element.colorText;
      const iconText = element.iconText;
      const bannerImage = element.bannerImage;

      const images = document.querySelectorAll(
        `.compendium-sidebar .directory-item.compendium[data-pack='${dataPack}'] .compendium-banner`
      );
      images.forEach((image) => {
        image.remove();
      });

      const compendiumItems = document.querySelectorAll(
        `.compendium-sidebar .directory-item.compendium[data-pack='${dataPack}']`
      );
      compendiumItems.forEach((item) => {
        item.style.color = colorText;
        const myImage = new Image();
        myImage.src = bannerImage;
        myImage.classList.add("compendium-banner");
        item.prepend(myImage);
      });

      const sourceFooter = document.querySelectorAll(
        `.compendium-sidebar .directory-item.compendium[data-pack='${dataPack}'] .compendium-footer`
      );
      sourceFooter.forEach((source) => {
        source.style.color = colorText;
      });
    }
  }
}

export function applyChangeMinimalCss() {
  let elements1 = document.querySelectorAll("#compendium .directory-item.compendium");
  elements1?.forEach((source) => {
    source.style.position = "relative";
    source.style["line-height"] = "24px";
    source.style.height = "unset";
    source.style["flex-direction"] = "row";
    source.style["align-items"] = "center";
  });

  let elements2 = document.querySelectorAll(".compendium-sidebar .directory-item.compendium .compendium-name");
  elements2?.forEach((source) => {
    source.style["margin-right"] = "0";
    source.style["padding-top"] = "0";
    source.style["text-align"] = "left";
    source.style.display = "flex";
  });

  let elements3 = document.querySelectorAll(".compendium-sidebar .directory-item.compendium .compendium-name a");
  elements3?.forEach((source) => {
    source.style["margin-top"] = "1px";
    source.style["margin-bottom"] = "1px";
    source.style["padding-top"] = "1px";
    source.style["padding-bottom"] = "1px";
  });

  let elements4 = document.querySelectorAll(".compendium-sidebar .directory-item.compendium .compendium-footer");
  elements4?.forEach((source) => {
    source.style.position = "relative";
    source.style.top = "unset";
    source.style.left = "unset";
    source.style["margin-right"] = "1rem";
    source.style.width = "unset";
    source.style.height = "unset";
    source.style["text-align"] = "right";
    source.style.display = "flex";
    source.style["justify-content"] = "right";
  });

  let elements5 = document.querySelectorAll(".compendium-sidebar .directory-item.compendium.locked::before");
  elements5?.forEach((source) => {
    source.style.height = "100%";
  });

  let elements6 = document.querySelectorAll(".compendium-sidebar .directory-item.compendium .status-icons");
  elements6?.forEach((source) => {
    source.style.right = "0";
    source.style["flex-direction"] = "column";
    source.style["font-size"] = "50%";
    source.style.height = "100%";
    source.style.padding = "3px 3px 3px 0";
    source.style["align-items"] = "center";
    source.style["justify-content"] = "center";
  });

  let elements7 = document.querySelectorAll("#compendium li.folder > .folder-header");
  elements7?.forEach((source) => {
    source.style.padding = "0 6px;";
  });

  let elements8 = document.querySelectorAll(".compendium-sidebar .directory-item.compendium .compendium-name");
  elements8?.forEach((source) => {
    source.style["max-width"] = "90%";
    source.style["white-space"] = "normal";
    source.style["margin-left"] = "1px";
  });

  let elements9 = document.querySelectorAll(".compendium-sidebar .directory-item.compendium .compendium-name > i");
  elements9?.forEach((source) => {
    source.style["align-self"] = "center";
  });

  let elements10 = document.querySelectorAll(
    ".compendium-sidebar .directory-item.compendium .compendium-footer .source"
  );
  elements10?.forEach((source) => {
    source.styleè["text-overflow"] = "ellipsis";
    source.style["white-space"] = "nowrap";
    source.style["max-width"] = "70px";
    source.style.overflow = "hidden";
  });
}
