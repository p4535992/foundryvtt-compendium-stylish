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

    game.settings.register(CONSTANTS.MODULE_ID, "configurations", {
        name: `${CONSTANTS.MODULE_ID}.settings.configurations.name`,
        hint: `${CONSTANTS.MODULE_ID}.settings.configurations.hint`,
        scope: "world",
        config: false,
        type: Object,
        default: {},
        onChange: debouncedRender,
    });

    game.settings.register(CONSTANTS.MODULE_ID, "removeBanners", {
        name: `${CONSTANTS.MODULE_ID}.settings.removeBanners.name`,
        hint: `${CONSTANTS.MODULE_ID}.settings.removeBanners.hint`,
        type: Boolean,
        default: false,
        scope: "world",
        config: true,
        restricted: true,
        requiresReload: false,
        onChange: debouncedRender,
    });

    game.settings.register(CONSTANTS.MODULE_ID, "bannerHeight", {
        name: `${CONSTANTS.MODULE_ID}.settings.bannerHeight.name`,
        hint: `${CONSTANTS.MODULE_ID}.settings.bannerHeight.hint`,
        type: Number,
        range: {
            min: 24,
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
        name: `${CONSTANTS.MODULE_ID}.settings.hideSource.name`,
        hint: `${CONSTANTS.MODULE_ID}.settings.hideSource.hint`,
        type: Boolean,
        default: false,
        scope: "world",
        config: true,
        restricted: true,
        requiresReload: false,
        onChange: debouncedRender,
    });

    game.settings.register(CONSTANTS.MODULE_ID, "labelAlignment", {
        name: `${CONSTANTS.MODULE_ID}.settings.labelAlignment.name`,
        hint: `${CONSTANTS.MODULE_ID}.settings.labelAlignment.hint`,
        type: String,
        choices: {
            start: `${CONSTANTS.MODULE_ID}.settings.labelAlignment.choices.start`,
            center: `${CONSTANTS.MODULE_ID}.settings.labelAlignment.choices.center`,
            end: `${CONSTANTS.MODULE_ID}.settings.labelAlignment.choices.end`,
        },
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
