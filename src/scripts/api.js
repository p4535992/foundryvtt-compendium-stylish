import CONSTANTS from "./constants.js";
import { error } from "./lib/lib.js";

const API = {
  compendiumThemerContainer: {},

  /**
   * Add or update a module integration
   * @param {string} moduleId The module id to use as key
   * @param {Object[]} options
   * @param {string} options[].dataPack            The data pack reference e.g. `mmm.mmmm`
   * @param {string} options[].colorText           The hex color to apply to the text e.g. `#ff5252`
   * @param {string} options[].iconText            The font awesome icon class to apply to the title e.g. `fa-solid fa-skull-crossbones`
   * @param {string} options[].bannerImage         The banner image to apply as background e.g.  `modules/XXX/assets/mmm/cover.webp`
   * @param {string} options[].backgroundColorText The hex color to apply to the background text panel e.g. `#ece9df`
   * @returns {Promise<Void>}
   */
  async addModule(moduleId, options) {
    if (!Array.isArray(options)) {
      if (typeof options !== "object") {
        throw error("addModule | options must be of type object", true);
      }
      options = [options];
    }
    if (!moduleId) {
      throw error("addModule | moduleId must be passed", true);
    }
    const config = game.settings.get(CONSTANTS.MODULE_ID, "configurations");
    config[moduleId] = options;
    await game.settings.set(CONSTANTS.MODULE_ID, "configurations", config);
    ui.sidebar?.render(false);
  },

  /**
   * Remove a module integration
   * @param {string} moduleId The module id to use as key
   */
  async removeModule(moduleId) {
    if (!moduleId) {
      throw error("removeModule | moduleId must be passed", true);
    }
    const config = game.settings.get(CONSTANTS.MODULE_ID, "configurations");
    delete config[moduleId];
    await game.settings.set(CONSTANTS.MODULE_ID, "configurations", config);
    ui.sidebar?.render(false);
  },
};

export default API;
