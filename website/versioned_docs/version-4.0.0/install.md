---
id: version-4.0.0-install
title: Install
sidebar_label: Install
original_id: install
---

## Installation

This module should be installed in your project's `devDependencies`:

```
npm install --save-dev @testing-library/react-native
```

You will need `react`, `react-native`, and `react-test-renderer` installed as _dependencies_ in order to run this project.

## Jest preset

> It is **highly recommended** that you use the bundled Jest preset. You will likely experience
> unexpected behavior and have a sub-optimal experience if you do not use the preset.

This library includes an easy to adopt and reliable Jest preset to maximize the
confidence you have in your tests. It extends the `react-native` preset, and was created order to
more closely mimic behavior you would expect from any other member of the `testing-library` family.

```diff
// jest.config.js

+ preset: '@testing-library/react-native'
- preset: 'react-native'
```

You can continue to add to your Jest config as you normally would, you'll just want to make sure
that if you modify the `setupFiles` key that you include any additional files after the setup files
provided by the preset. Here's how you might do that:

```javascript
const expoPreset = require('jest-expo/jest-preset.json');
const jestPreset = require('@testing-library/react-native/jest-preset');

module.exports = Object.assign(expoPreset, jestPreset, {
  setupFiles: [...expoPreset.setupFiles, ...jestPreset.setupFiles, './mySetup.js'],
});
```

> If you use Expo, be sure to include the Expo setup files before this library's setup
> files! If you're using React Native, there's no need to do anything extra.

Generally speaking though, it's better to include any setup files you have in the
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
  "Picker",
  "RefreshControl",
  "SafeAreaView",
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

## Exports

You will likely be able to import everything you'll need from the project entry point like this:

```js
import { render } from '@testing-library/react-native';
```

The library's tests run in Node 8-11 before all new versions are published, and all files are
processed using the `metro-react-native-babel-preset` preset. Typings are included, but may not be
perfect, and we are happy to accept PRs to improve them! ☺️
