---
id: api-queries
title: Queries
sidebar_label: Queries
---

## Variants

> `getBy` queries are shown by default in the [query documentation](#queries) below.

### getBy

`getBy*` queries returns the first matching node for a query, and throws an error if no elements
match.

### getAllBy

`getAllBy*` queries return an array of all matching nodes for a query, and throws an error if no
elements match.

### queryBy

`queryBy*` queries returns the first matching node for a query, and return `null` if no elements
match. This is useful for asserting an element is not present.

### queryAllBy

`queryAllBy*` queries return an array of all matching nodes for a query, and return an empty array
(`[]`) if no elements match.

### findBy

`findBy*` queries return a promise which resolves when an element is found which matches the given
query. The promise is rejected if no element is found after a default timeout of `4500`ms.

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

### `ByA11yHint`

> getByA11yHint, queryByA11yHint, getAllByA11yHint, queryAllByA11yHint, findByA11yHint,
> findAllByA11yHint

```typescript
getByA11yHint(
  container: ReactTestInstance,
  match: TextMatch,
  options?: {
    exact?: boolean = true,
    trim?: boolean = true,
    collapseWhitespace?: boolean = true,
    filter?: FilterFn,
    normalizer?: NormalizerFn,
  }): FiberRoot
```

This will search for all elements with an `accessibilityHint` prop and find one that matches the
given [`TextMatch`](#textmatch).

```js
import { render } from 'react-testing-library';

const { getByA11yHint } = render(<View accessibilityHint="summary" />);

getByA11yHint('summary'); // returns the View node
```

### `ByA11yLabel`

> getByA11yLabel, queryByLabelText, getAllByLabelText, queryAllByLabelText findByLabelText,
> findAllByLabelText

```typescript
getByA11yLabel(
  container: ReactTestInstance,
  match: TextMatch,
  options?: {
    exact?: boolean = true,
    trim?: boolean = true,
    collapseWhitespace?: boolean = true,
    filter?: FilterFn,
    normalizer?: NormalizerFn,
  }): FiberRoot
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

const { getByA11yLabel } = render(<Login onPress={jest.fn()} />);

getByA11yLabel('username'); // returns the TextInput node
```

### `ByA11yRole`

> getByA11yRole, queryByA11yRole, getAllByA11yRole, queryAllByA11yRole, findByA11yRole,
> findAllByA11yRole

```typescript
getByA11yRole(
  container: ReactTestInstance,
  match: TextMatch,
  options?: {
    exact?: boolean = true,
    trim?: boolean = true,
    collapseWhitespace?: boolean = true,
    filter?: FilterFn,
    normalizer?: NormalizerFn,
  }): FiberRoot
```

This will search for all elements with an `accessibilityRole` prop and find one that matches the
given [`TextMatch`](#textmatch).

```js
import { render } from 'react-testing-library';

const { getByA11yRole } = render(<View accessibilityRole="summary" />);

getByA11yRole('summary'); // returns the View node
```

### `ByA11yStates`

> getByA11yStates, queryByA11yStates, getAllByA11yStates, queryAllByA11yStates, findByA11yStates,
> findAllByA11yStates

```typescript
getByA11yStates(
  container: ReactTestInstance,
  match: Array<string>
): FiberRoot
```

This will search for all elements with an `accessibilityStates` prop and find one that matches the
given `Array`.

```js
import { render } from 'react-testing-library';

const { getByA11yStates } = render(<View accessibilityStates={['disabled']} />);

getByA11yStates(['disabled']); // returns the View node
```

### `ByA11yTraits`

> getByA11yTraits, queryByA11yTraits, getAllByA11yTraits, queryAllByA11yTraits, findByA11yTraits,
> findAllByA11yTraits

```typescript
getByA11yTraits(
  container: ReactTestInstance,
  match: Array<string>,
): FiberRoot
```

This will search for all elements with an `accessibilityTraits` prop and find one that matches the
given `Array`.

```js
import { render } from 'react-testing-library';

const { getByA11yTraits } = render(<View accessibilityTraits={['button']} />);

getByA11yTraits(['button']); // returns the View node
```

### `ByPlaceholder`

> getByPlaceholder, queryByPlaceholder, getAllByPlaceholder, queryAllByPlaceholder,
> findByPlaceholder, findAllByPlaceholder

```typescript
getByPlaceholder(
  container: ReactTestInstance,
  match: TextMatch,
  options?: {
    exact?: boolean = true,
    trim?: boolean = true,
    collapseWhitespace?: boolean = true,
    filter?: FilterFn,
    normalizer?: NormalizerFn,
  }): FiberRoot
```

This will search for all elements with a `placeholder` prop and find one that matches the given
[`TextMatch`](#textmatch).

```javascript
import { render } from 'native-testing-library';

const { getByPlaceholder } = render(<TextInput placeholder="Username" />);

getByPlaceholder('Username'); // returns the TextInput node
```

### `ByText`

> getByText, queryByText, getAllByText, queryAllByText, findByText, findAllByText

```typescript
getByText(
  container: ReactTestInstance,
  match: TextMatch,
  options?: {
    types?: array = ['Text', 'TextInput'],
    trim?: boolean = true,
    collapseWhitespace?: boolean = true,
    exact?: boolean = true,
    normalizer?: NormalizerFn,
  }): FiberRoot
```

This will search for all elements of type `Text` with `props.children` matching the given. It will
also search `TextInput` elements by their value [`TextMatch`](#textmatch).

```js
import { render } from 'native-testing-library';

const { getByText } = render(<Text>About ℹ</Text>);

getByText(/about/i); // returns the Text node
```

### `ByValue`

> getByValue, queryByValue, getAllByValue, queryAllByValue, findByValue, findAllByValue

```typescript
getByText(
  container: ReactTestInstance,
  match: TextMatch,
  options?: {
    exact?: boolean = true,
    trim?: boolean = true,
    collapseWhitespace?: boolean = true,
    filter?: FilterFn,
    normalizer?: NormalizerFn,
  }): FiberRoot
```

This will search for all elements with a `value` prop and find one that matches the given
[`TextMatch`](#textmatch).

```js
import { render } from 'native-testing-library';

const { getByText } = render(<Text>About ℹ</Text>);

getByText(/about/i); // returns the Text node
```

### `ByTestId`

> getByTestId, queryByTestId, getAllByTestId, queryAllByTestId, findByTestId, findAllByTestId

```typescript
getByTestId(
  container: ReactTestInstance,
  match: TextMatch,
  options?: {
    trim?: boolean = true,
    collapseWhitespace?: boolean = true,
    exact?: boolean = true,
    filter?: FilterFn,
    normalizer?: NormalizerFn,
  }): FiberRoot
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
