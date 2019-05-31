---
id: ecosystem-jest-native
title: Jest Matchers
sidebar_label: Jest Matchers
---

[`jest-native`](https://github.com/testing-library/jest-native) is a companion library for RNTL that
provides custom element matchers for Jest.

```
npm install --save-dev jest-native
```

```javascript
const { getByText, getByTestId } = render(
  <View>
    <View testID="not-empty">
      <Text testID="empty" />
    </View>
    <Text testID="visible">Text Example</Text>
  </View>,
);

expect(getByTestId('not-empty')).not.toBeEmpty();
expect(getByTestId('empty')).toBeEmpty();
expect(getByText('Visible Example')).toHaveTextContent('Text Example');
```

> Note: when using some of these matchers, you may need to make sure you use a query function (like
> `queryByTestId`) rather than a get function (like `getByTestId`). Otherwise the `get*` function
> could throw an error before your assertion.

Check out [jest-native's documentation](https://github.com/testing-library/jest-native) for a full
list of available matchers.

- [jest-native on GitHub](https://github.com/testing-library/jest-native)
