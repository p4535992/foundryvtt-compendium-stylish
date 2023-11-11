# API DOCUMENTATION

### The documentation can be out of sync with the API code checkout the code if you want to dig up [API](../src/scripts/api.js)

The api is reachable from the variable `game.modules.get('compendium-themer').api` or from the socket libary `socketLib` on the variable `game.modules.get('compendium-themer').socket` if present and active.

### Add or update a module integration

`game.modules.get("compendium-themer").api.addModule(moduleId,options)` ⇒ `Promise<Void>`

Add or update a module integration

**Returns**: `Promise<Void>` - Return empty response

| Param           | Type                    | Default | Description                                            |
|-----------------|-------------------------|---------|--------------------------------------------------------|
| moduleId        | `string`                |         | The module id to use as key                            |
| options         | `Theme[]`               |         | Array of object 'Theme' to pass                        |

A `Theme` is a object with these property:

| Param           | Type       | Default | Description                                                         |
|-----------------|------------|---------|---------------------------------------------------------------------|
| dataPack        | `string`   |  null   | OPTIONAL: The data pack reference e.g. `mmm.mmmm`                             |
| colorText       | `string`   |  null   | OPTIONAL: The hex color to apply to the text e.g. `#ff5252`                   |
| iconText        | `string`   |  null   | OPTIONAL: The font awesome icon class to apply to the title e.g. `fa-solid fa-skull-crossbones` |
| bannerImage     | `string`   |  null   | OPTIONAL: The banner image to apply as background e.g.  `modules/XXX/assets/mmm/cover.webp` |
| backgroundColorText | `string` | null  | OPTIONAL: The hex color to apply to the background text panel e.g. `#ece9df` |

**Example**:

```js

game.modules.get('compendium-themer').api.addModule("mmm",
    [
        {
            dataPack: `mmm.mmmmi`,
            colorText: `#ff5252`,
            iconText: `fa-solid fa-skull-crossbones`,
            bannerImage: `modules/${CONSTANTS.MODULE_ID}/assets/mmm/cover.webp`,
        },
        {
            dataPack: `mmm.mmmm`,
            colorText: `#ff5252`,
            iconText: ``,
            bannerImage: `modules/${CONSTANTS.MODULE_ID}/assets/mmm/cover.webp`,
        },
        {
            dataPack: `mmm.mmmmj`,
            colorText: `#ff5252`,
            iconText: ``,
            bannerImage: `modules/${CONSTANTS.MODULE_ID}/assets/mmm/cover.webp`,
        }
    ]
);
```

### Remove a module integration

`game.modules.get("compendium-themer").api.removeModule(moduleId,options)` ⇒ `Promise<Void>`

Remove a module integration

**Returns**: `Promise<Void>` - Return empty response

| Param           | Type                    | Default | Description                                            |
|-----------------|-------------------------|---------|--------------------------------------------------------|
| moduleId        | `string`                |         | The module id to use as key                            |


```js
game.modules.get('compendium-themer').api.removeModule("mmm");
```