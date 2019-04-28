---
id: install
title: Install
sidebar_label: Install
---

This module should be installed in your project's `devDependencies`:

```
npm install --save-dev native-testing-library
```

You will need `react` and `react-native` installed as _dependencies_ in order to run this project.

## Exports

You will likely be able to import everything you'll need from the project entry point like this:

```js
import { render } from 'native-testing-library';
```

The library's tests run in Node 8-11 before all new versions are published, and all files are
processed through Babel. Typings are provided, but may not be perfect, and we are happy to accept
PRs to improve them! ☺️
