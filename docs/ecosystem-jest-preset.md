---
id: ecosystem-jest-preset
title: Jest Preset
sidebar_label: Jest Preset
---

`native-testing-library` includes an easy to adopt and reliable Jest preset to maximize the
confidence you have in your tests. It extends the `react-native` preset, and was created order to
more closely mimic behavior you would expect from any other member of the `testing-library` family.

```diff
// jest.config.js

+ preset: 'native-testing-library'
- preset: 'react-native'
```

You can continue to add to your Jest config as you normally would, you'll just want to make sure
that if you modify the `setupFiles` key that you include any additional files after the setup files
provided by the preset. Here's how you might do that:

```javascript
const jestPreset = require('native-testing-library/jest-preset');

module.exports = Object.assign(jestPreset, {
  setupFiles: [...jestPreset.setupFiles, './setup.js'],
});
```

Generally speaking, though, it would be safer to include any setup files you have in the
`setupFilesAfterEnv` key of your Jest config.

> Note: this preset will use the react-native jest preset included with your version of
> react-native, so please be aware that some behaviors may not be totally as expected if you are
> using an older version of the react-native library.

Here is a list of all the components this preset supports:

```json
[
  "ActivityIndicator",
  "Button",
  "DrawerLayoutAndroid",
  "Image",
  "Modal",
  "RefreshControl",
  "Picker",
  "ScrollView",
  "Switch",
  "Text",
  "TextInput",
  "TouchableHighlight",
  "TouchableNativeFeedback",
  "TouchableOpacity",
  "TouchableWithoutFeedback",
  "View"
]
```

You can still use components like `FlatList` and `SectionList`, you just won't be able to directly
select them or see them in debug output. These components wrap other components, that's why we don't
let you select them directly. If you're having trouble selecting what you need to inside of one of
these components that isn't mocked, just `debug()` to see what your users are seeing ☺️
