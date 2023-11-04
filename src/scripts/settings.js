import CONSTANTS from "./constants";
import { log } from "./lib/lib.js";

const debouncedRender = debounce(() => ui.sidebar?.render(false), 50);

const TYPES = ["Actor", "Adventure", "Cards", "JournalEntry", "Item", "Macro", "Playlist", "RollTable", "Scene"];

export function registerSettings() {
  game.settings.registerMenu(CONSTANTS.MODULE_ID, "resetAllSettings", {
    name: `${CONSTANTS.MODULE_ID}.settings.reset.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.reset.hint`,
    icon: "fas fa-coins",
    type: ResetSettingsDialog,
    restricted: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "removeBanners", {
    name: `Remove Banner Images`,
    hint: `All compendium banner images will be removed.`,
    type: Boolean,
    default: false,
    scope: "world",
    config: true,
    restricted: true,
    requiresReload: false,
    onChange: debouncedRender,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "bannerHeight", {
    name: `Banners Height`,
    hint: `Height of compendium items. Use 55px for compact view. Default: 70px`,
    type: Number,
    range: {
      min: 25,
      max: 100,
      step: 5,
    },
    default: 70,
    scope: "world",
    config: true,
    restricted: true,
    requiresReload: false,
    onChange: debouncedRender,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "hideSource", {
    name: `Hide Compendium Source`,
    hint: `Compendium source in the bottom left corner will be hidden.`,
    type: Boolean,
    default: false,
    scope: "world",
    config: true,
    restricted: true,
    requiresReload: false,
    onChange: debouncedRender,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "labelAlignment", {
    name: `Label Alignment`,
    hint: `The side to which compendium label will be aligned.`,
    type: String,
    choices: { start: "Left", center: "Center", end: "Right" },
    default: "center",
    scope: "world",
    config: true,
    restricted: true,
    requiresReload: false,
    onChange: debouncedRender,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "applyMinimalCss", {
    name: `${CONSTANTS.MODULE_ID}.settings.applyMinimalCss.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.applyMinimalCss.hint`,
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    onChange: debouncedRender,
  });

  // for (const t of TYPES) {
  //   game.settings.register(CONSTANTS.MODULE_ID, t, {
  //     name: `${t} Banner`,
  //     hint: `Compendium banner image for ${t} document type.`,
  //     type: String,
  //     default: deepClone(CONFIG[t].compendiumBanner),
  //     filePicker: "image",
  //     scope: "world",
  //     config: true,
  //     restricted: true,
  //     requiresReload: false,
  //     onChange: (value) => {
  //       CONFIG[t].compendiumBanner = value;
  //       debouncedRender();
  //     },
  //   });

  //   CONFIG[t].compendiumBanner = game.settings.get(CONSTANTS.MODULE_ID, t);
  // }

  // =====================================================================

  game.settings.register(CONSTANTS.MODULE_ID, "debug", {
    name: `${CONSTANTS.MODULE_ID}.settings.debug.name`,
    hint: `${CONSTANTS.MODULE_ID}.settings.debug.hint`,
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
  });

  // ========================================================================
}

class ResetSettingsDialog extends FormApplication {
  constructor(...args) {
    //@ts-ignore
    super(...args);
    //@ts-ignore
    return new Dialog({
      title: game.i18n.localize(`${CONSTANTS.MODULE_ID}.dialogs.resetsettings.title`),
      content:
        '<p style="margin-bottom:1rem;">' +
        game.i18n.localize(`${CONSTANTS.MODULE_ID}.dialogs.resetsettings.content`) +
        "</p>",
      buttons: {
        confirm: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize(`${CONSTANTS.MODULE_ID}.dialogs.resetsettings.confirm`),
          callback: async () => {
            const worldSettings = game.settings.storage
              ?.get("world")
              ?.filter((setting) => setting.key.startsWith(`${CONSTANTS.MODULE_ID}.`));
            for (let setting of worldSettings) {
              log(`Reset setting '${setting.key}'`);
              await setting.delete();
            }
            //window.location.reload();
          },
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: game.i18n.localize(`${CONSTANTS.MODULE_ID}.dialogs.resetsettings.cancel`),
        },
      },
      default: "cancel",
    });
  }

  async _updateObject(event, formData = undefined) {
    // do nothing
  }
}
