---
id: setup
title: Setup
sidebar_label: Setup
---

## Setting up your project

The RNTL API should work out of the box for most tests. All of the snippets you'll find throughout
the website work without any additional configuration assuming you use Jest and a moderately recent
version of React Native.

We strongly encourage you to use Jest with the `@testing-library/react-native` preset. The
`react-native` preset may also work, but you'll be getting the best experience when using our
preset. There may be some additional mocks you need to provide to such as mocks for
`react-native-gesture-handler` when using `react-navigation`.

## Cleanup

You can ensure [`cleanup`](./api-main#cleanup) is called after each test and import additional
assertions by adding it to the setup configuration in Jest.

In Jest 24 and up, add the
[`setupFilesAfterEnv`](https://jestjs.io/docs/en/configuration.html#setupfilesafterenv-array) option
to your Jest config:

```javascript
// jest.config.js
module.exports = {
  setupFilesAfterEnv: [
    'native-testing-library/cleanup-after-each',
    // ... other setup files ...
  ],
  // ... other options ...
};
```

## Custom Render

It's often useful to define a custom render method that includes things like global context
providers, data stores, etc. To make this available globally, one approach is to define a utility
file that re-exports everything from RNTL. You can replace `@testing-library/react-native` with this
file in all your imports. See [below](#configuring-jest-with-test-utils) for a way to make your test
util file accessible without using relative paths.

The example below sets up data providers using the [`wrapper`](api-main.md#render-options) option to
`render`.

```diff
// my-component.test.js
- import { render, fireEvent }from '@testing-library/react-native';
+ import { render, fireEvent } from '../test-utils';
```

```js
// test-utils.js
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'my-ui-lib';
import { TranslationProvider } from 'my-i18n-lib';
import defaultStrings from 'i18n/en-x-default';

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme="light">
      <TranslationProvider messages={defaultStrings}>{children}</TranslationProvider>
    </ThemeProvider>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };
```

### Configuring Jest with Test Utils

To make your custom test file accessible in your Jest test files without using relative imports
(`../../test-utils`), add the folder containing the file to the Jest `moduleDirectories` option.

This will make all the `.js` files in the test-utils directory importable without `../`.

```diff
// my-component.test.js
- import { render, fireEvent } from '../test-utils';
+ import { render, fireEvent } from 'test-utils';
```

```diff
// jest.config.js
module.exports = {
  moduleDirectories: [
    'node_modules',
+   // add the directory with the test-utils.js file, for example:
+   'utils', // a utility folder
+    __dirname, // the root directory
  ],
  // ... other options ...
}
```
