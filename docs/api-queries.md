---
id: api-queries
title: Queries
sidebar_label: Queries
---

## Using queries

All queries are exported directly from the entry point, but you likely won't need to use them that
way in most cases. For instance, you can do the following:

```javascript
import { getByText } from 'native-testing-library';

getByText(container, 'hello world');
```

but you likely won't need to. Most queries you will run are on the result of render. You can use
those in this way:

```javascript
const { getByText } = render(<Text>hello world</Text>);

getByText('hello world');
```

This page is written in the format of the first example because it is documentation for the query
API, not documentation for the render result.

## Variants

> `getBy` queries are shown by default in the [query documentation](#queries) below.

### getBy

`getBy*` queries returns the first matching node for a query, and throws an error if no elements
match or if more than one match is found (use `getAllBy` instead).

### getAllBy

`getAllBy*` queries return an array of all matching nodes for a query, and throws an error if no
elements match.

### queryBy

`queryBy*` queries returns the first matching node for a query, and return `null` if no elements
match. This is useful for asserting an element is not present. This throws if more than one match is
found (use `queryAllBy` instead)..

### queryAllBy

`queryAllBy*` queries return an array of all matching nodes for a query, and return an empty array
(`[]`) if no elements match.

### findBy

`findBy*` queries return a promise which resolves when an element is found which matches the given
query. The promise is rejected if no element is found or if more than one element is found after a
default timeout of `4500`ms. If you need to find more than one element, then use `findAllBy`.

> Note, this is a simple combination of `getBy*` queries and
> [`waitForElement`](/docs/api-async#waitforelement). The `findBy*` queries accept the
> `waitForElement` options as the last argument. (i.e.
> `findByText(container, 'text', queryOptions, waitForElementOptions)`)

### findAllBy

`findAllBy*` queries return a promise which resolves to an array of elements when any elements are
found which match the given query. The promise is rejected if no elements are found after a default
timeout of `4500`ms.

## Options

The argument to a query can be a _string_, _regular expression_, or _function_. There are also
options to adjust how node text is parsed.

See [TextMatch](#textmatch) for documentation on what can be passed to a query.

## Queries

### `ByHintText`

> getByHintText, queryByHintText, getAllByHintText, queryAllByHintText, findByHintText,
> findAllByHintText

```typescript
getByHintText(
  testRenderer: ReactTestRendererInstance,
  match: TextMatch,
  options?: {
    exact?: boolean = true,
    trim?: boolean = true,
    collapseWhitespace?: boolean = true,
    selector?: SelectorFn,
    normalizer?: NormalizerFn,
  }): NativeTestInstance
```

This will search for all elements with an `accessibilityHint` prop and find one that matches the
given [`TextMatch`](#textmatch).

```js
import { render } from 'react-testing-library';

const { getByHintText } = render(<View accessibilityHint="summary" />);

getByHintText('summary'); // returns the View node
```

### `ByLabelText`

> getByLabelText, queryByLabelText, getAllByLabelText, queryAllByLabelText findByLabelText,
> findAllByLabelText

```typescript
getByLabelText(
  testRenderer: ReactTestRendererInstance,
  match: TextMatch,
  options?: {
    exact?: boolean = true,
    trim?: boolean = true,
    collapseWhitespace?: boolean = true,
    selector?: SelectorFn,
    normalizer?: NormalizerFn,
  }): NativeTestInstance
```

This will search for all elements with an `accessibilityLabel` prop and find one that matches the
given [`TextMatch`](#textmatch).

```js
function Login({ onPress }) {
  return (
    <View accessibilityLabel="login-form">
      <Text>Login</Text>
      <TextInput accessibilityLabel="username" />
      <TextInput accessibilityLabel="password" />
      <Button title="Login" onPress={onPress} />
    </View>
  );
}

import { render } from 'native-testing-library';

const { getByLabelText } = render(<Login onPress={jest.fn()} />);

getByLabelText('username'); // returns the TextInput node
```

### `ByRole`

> getByRole, queryByRole, getAllByRole, queryAllByRole, findByRole, findAllByRole

```typescript
getByRole(
  testRenderer: ReactTestRendererInstance,
  match: TextMatch,
  options?: {
    selector?: SelectorFn,
  }): NativeTestInstance
```

This will search for all elements with an `accessibilityRole` prop and find one that matches the
given [`TextMatch`](#textmatch).

```js
import { render } from 'react-testing-library';

const { getByRole } = render(<View accessibilityRole="summary" />);

getByRole('summary'); // returns the View node
```

> `ByRole` queries will fall back to searching for elements with an `accessibilityTraits` match, but
> they will log a warning on all matches that this prop is being deprecated by react-native.

### `ByPlaceholderText`

> getByPlaceholderText, queryByPlaceholderText, getAllByPlaceholderText, queryAllByPlaceholderText,
> findByPlaceholderText, findAllByPlaceholderText

```typescript
getByPlaceholderText(
  testRenderer: ReactTestRendererInstance,
  match: TextMatch,
  options?: {
    exact?: boolean = true,
    trim?: boolean = true,
    collapseWhitespace?: boolean = true,
    selector?: SelectorFn,
    normalizer?: NormalizerFn,
  }): NativeTestInstance
```

This will search for all elements with a `placeholder` prop and find one that matches the given
[`TextMatch`](#textmatch).

```javascript
import { render } from 'native-testing-library';

const { getByPlaceholderText } = render(<TextInput placeholder="Username" />);

getByPlaceholderText('Username'); // returns the TextInput node
```

### `ByText`

> getByText, queryByText, getAllByText, queryAllByText, findByText, findAllByText

```typescript
getByText(
  testRenderer: ReactTestRendererInstance,
  match: TextMatch,
  options?: {
    exact?: boolean = true,
    trim?: boolean = true,
    collapseWhitespace?: boolean = true,
    selector?: SelectorFn,
    normalizer?: NormalizerFn,
  }): NativeTestInstance
```

This will search for all elements of type `Text` with `props.children` matching the given. It will
also search `TextInput` elements by their value and `Button` elements by their `title`
[`TextMatch`](#textmatch).

```js
import { render } from 'native-testing-library';

const { getByText } = render(<Text>About ℹ</Text>);

getByText(/about/i); // returns the Text node
```

### `ByTitle`

> getByTitle, queryByTitle, getAllByTitle, queryAllByTitle, findByTitle, findAllByTitle

```typescript
getByTitle(
  testRenderer: ReactTestRendererInstance,
  match: TextMatch,
  options?: {
    exact?: boolean = true,
    trim?: boolean = true,
    collapseWhitespace?: boolean = true,
    selector?: SelectorFn,
    normalizer?: NormalizerFn,
  }): NativeTestInstance
```

This will search for all `Button` or `RefreshControl` elements with `props.title` matching the given
by their value [`TextMatch`](#textmatch).

```js
import { render } from 'native-testing-library';

const { getByTitle } = render(<Button title="About" />);

getByTitle(/about/i); // returns the Button node
```

### `ByValue`

> getByValue, queryByValue, getAllByValue, queryAllByValue, findByValue, findAllByValue

```typescript
getByValue(
  testRenderer: ReactTestRendererInstance,
  match: TextMatch,
  options?: {
    exact?: boolean = true,
    trim?: boolean = true,
    collapseWhitespace?: boolean = true,
    selector?: SelectorFn,
    normalizer?: NormalizerFn,
  }): NormalizerOptions
```

This will search for all `TextInput` elements with a `value` prop or `Picker` elements with a
`selectedValue` prop and find ones that matches the given [`TextMatch`](#textmatch).

```js
import { render } from 'native-testing-library';

const { getByValue } = render(<Input value="About ℹ" onChangeText={() => ({})} />);

getByValue(/about/i); // returns the Input node
```

### `ByTestId`

> getByTestId, queryByTestId, getAllByTestId, queryAllByTestId, findByTestId, findAllByTestId

```typescript
getByTestId(
  testRenderer: ReactTestRendererInstance,
  match: TextMatch,
  options?: {
    trim?: boolean = true,
    collapseWhitespace?: boolean = true,
    exact?: boolean = true,
    selector?: SelectorFn,
    normalizer?: NormalizerFn,
  }): NativeTestInstance
```

This will search for all elements with a `testID` and find one that matches the given
[`TextMatch`](#textmatch).

```js
import { render } from 'native-testing-library';

const { getByTestId } = render(<Text testID="test">hi there</Text>);

getByTestId('test'); // returns the Text node
```

> Because your users can't see testIDs [the guiding principles](#guiding-principles), please only
> use this as a last resort. Users don't interact with testIDs, and can lead to unpredictable
> behavior. For example, internal React Native components sometimes spread testIds down to child
> components. This means that if you query all by testId, you may get significantly more results
> than you anticipate which will lead to unpredictable tests.

## `TextMatch`

Several APIs accept a `TextMatch` which can be a `string`, `regex` or a `function` which returns
`true` for a match and `false` for a mismatch.

### Precision

Some APIs accept an object as the final argument that can contain options that affect the precision
of string matching:

- `exact`: Defaults to `true`; matches full strings, case-sensitive. When false, matches substrings
  and is not case-sensitive.
  - `exact` has no effect on `regex` or `function` arguments.
  - In most cases using a regex instead of a string gives you more control over fuzzy matching and
    should be preferred over `{ exact: false }`.
- `normalizer`: An optional function which overrides normalization behavior. See
  [`Normalization`](#normalization).

### Normalization

Before running any matching logic against text, `native-testing-library` automatically normalizes
that text. By default, normalization consists of trimming whitespace from the start and end of text,
and collapsing multiple adjacent whitespace characters into a single space.

If you want to prevent that normalization, or provide alternative normalization (e.g. to remove
Unicode control characters), you can provide a `normalizer` function in the options object. This
function will be given a string and is expected to return a normalized version of that string.

Note: Specifying a value for `normalizer` _replaces_ the built-in normalization, but you can call
`getDefaultNormalizer` to obtain a built-in normalizer, either to adjust that normalization or to
call it from your own normalizer.

`getDefaultNormalizer` takes an options object which allows the selection of behaviour:

- `trim`: Defaults to `true`. Trims leading and trailing whitespace
- `collapseWhitespace`: Defaults to `true`. Collapses inner whitespace (newlines, tabs, repeated
  spaces) into a single space.

#### Normalization Examples

To perform a match against text without trimming:

```javascript
getByText(node, 'text', {
  normalizer: getDefaultNormalizer({ trim: false }),
});
```

To override normalization to remove some Unicode characters whilst keeping some (but not all) of the
built-in normalization behavior:

```javascript
getByText(node, 'text', {
  normalizer: str => getDefaultNormalizer({ trim: false })(str).replace(/[\u200E-\u200F]*/g, ''),
});
```

### TextMatch Examples

Given the following render:

```javascript
const { baseElement } = render(<Text>Hello World</Text>);
```

**_Will_ find a match:**

```javascript
// Matching a string:
getByText(baseElement, 'Hello World'); // full string match
getByText(baseElement, 'llo Worl', { exact: false }); // substring match
getByText(baseElement, 'hello world', { exact: false }); // ignore case

// Matching a regex:
getByText(baseElement, /World/); // substring match
getByText(baseElement, /world/i); // substring match, ignore case
getByText(baseElement, /^hello world$/i); // full string match, ignore case
getByText(baseElement, /Hello W?oRlD/i); // advanced regex

// Matching with a custom function:
getByText(baseElement, content => content.startsWith('Hello'));
```

**_Will not_ find a match:**

```javascript
// full string does not match
getByText(testElement, 'Goodbye World');

// case-sensitive regex with different case
getByText(testElement, /hello world/);
```
