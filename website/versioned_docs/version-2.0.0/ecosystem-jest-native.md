---
id: version-2.0.0-ecosystem-jest-native
title: jest-native
sidebar_label: Jest Matchers
original_id: ecosystem-jest-native
---

[`jest-native`](https://github.com/testing-library/jest-native) is a companion library for
`native-testing-library` that provides custom element matchers for Jest.

```
npm install --save-dev jest-native
```

```javascript
<View>
  <View testID="not-empty">
    <Text testID="empty" />
  </View>
  <Text testID="visible">Visible Example</Text>
</View>;

expect(queryByTestId(baseElement, 'not-empty')).not.toBeEmpty();
expect(getByText(baseElement, 'Visible Example')).toBeVisible();
```

> Note: when using some of these matchers, you may need to make sure you use a query function (like
> `queryByTestId`) rather than a get function (like `getByTestId`). Otherwise the `get*` function
> could throw an error before your assertion.

Check out [jest-native's documentation](https://github.com/testing-library/jest-native) for a full
list of available matchers.

- [jest-native on GitHub](https://github.com/testing-library/jest-native)
