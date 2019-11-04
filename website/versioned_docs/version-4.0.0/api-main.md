---
id: version-4.0.0-api-main
title: Main
sidebar_label: Main
original_id: api-main
---

## `render`

```typescript
function render(
  ui: React.ReactElement<any>,
  options?: {
    /* You won't often use this, expand below for docs on options */
  },
): RenderResult;
```

Create a `NativeTestInstance`.

```jsx
import { render } from '@testing-library/react-native';

render(<View />);
```

```javascript
import { render, toJSON } from '@testing-library/react-native';

test('renders a message', () => {
  const { container, getByText } = render(<Text>Hello, World!</Text>);
  expect(getByText('Hello, world!')).toBeTruthy();
  expect(toJSON(container)).toMatchInlineSnapshot(`
<View
  testID="ntl-container"
>
  <Text>Hello, World!</Text>
</View>
  `);
});
```

## `render` Options

Most of the time you won't need to pass any options to `render`, but when you do, you will pass them
as the second parameter. There are some important key differences between this and
`react-testing-library` that you will want to be aware of.

### `wrapper`

Pass a React Component as the `wrapper` option to have it rendered around the inner element. This is
most useful for creating reusable custom render functions for common data providers. See
[setup](setup.md#custom-render) for examples.

### `queries`

Queries to bind. Overrides the default queries unless manually merged.

```js
// Example, a function to traverse table contents
import * as tableQueries from 'my-table-query-libary';
import queries from '@testing-library/react-native';

const { getByRowColumn, getByText } = render(<MyTable />, {
  queries: { ...queries, ...tableQueries },
});
```

See [helpers](api-helpers.md) for guidance on using utility functions to create custom queries.

Custom queries can also be added globally by following the
[custom render guide](setup.md#custom-render).

### `formatting`

Configuration object for formatting `debug()` output in the console.

```js
import { render } from '@testing-library/react-native';

// remove 'style' and 'pointerEvents' from the debug() output
render(<App />, { formatting: { removeProps: ['style', 'pointerEvents'] } });
```

## `render` Result

The `render` method returns an object that has a few properties:

### `...queries`

The most important feature of `render` is that the [default queries](api-queries.md) are
automatically returned with their first argument bound to the `baseElement`.

**Example**

```javascript
const { getByText, getByTestId /* etc */ } = render(<Component />);
```

### `container`

A View which wraps only the component you passed to render.

### `baseElement`

This is the root element of your render result. This element is an `AppContainer` from
`react-native`, and it appears as two nested `Views` at the root of your render.

### `debug`

This method is a shortcut for `console.log(prettyPrint(toJSON(baseElement)))`.

```javascript
import { render } from '@testing-library/react-native';

const { debug } = render(
  <View>
    <Text>Hello World</Text>
  </View>,
);
debug();
// <View>
//   <Text>
//     Hello World
//   </Text>
// </View>
// you can also pass an element: debug(getByText('Hello World'))
```

This is a simple wrapper around `prettyPrint` which is also exported.

### `rerender`

Although its likely better to test updating your props the way a user would (through events and
interaction), this method will allow you to re-render your entire tree at the base with new props.

```jsx
import { render } from '@testing-library/react-native';

const { rerender } = render(<NumberDisplay number={1} />);

// re-render the same component with different props
rerender(<NumberDisplay number={2} />);
```

[See the examples page](example-update-props.md)

### `unmount`

This will cause the rendered component to be unmounted. This is useful for testing what happens when
your component is removed from the page (like testing that you don't leave event handlers hanging
around causing memory leaks).

> This method is a wrapper around ReactTestRenderer.unmount()

```javascript
import { render } from '@testing-library/react-native';

const { unmount } = render(<Login />);
unmount();
```

### `asJSON`

Returns a JSON representation of the current state of your rendered component. This can be useful if
you need to avoid live bindings and see how your component reacts to events.

```javascript
import { render, fireEvent } from '@testing-library/react-native';

function TestComponent() {
  const [count, setCount] = React.useState(0);

  return (
    <Button onPress={() => setCount(state => state + 1)} title={`Click to increase: ${count}`} />
  );
}

const { getByText, asJSON } = render(<TestComponent />);
const firstRender = asJSON();

fireEvent.press(getByText(/Click to increase/));

// This will snapshot the difference before and after the press event.
// See https://github.com/jest-community/snapshot-diff
expect(firstRender).toMatchDiffSnapshot(asJSON());
```

---

## `cleanup`

Unmounts React trees that were mounted with [render](#render).

```jsx
import { cleanup, render } from '@testing-library/react-native';

afterEach(cleanup); // <-- add this

test('renders into document', () => {
  render(<View />);
  // ...
});

// ... more tests ...
```

In RNTL there is no DOM to cleanup, and your tests' rendered trees cannot interfere with each other.
It is simply nice to be able to run any unmount logic in the components you have rendered in your
tests.

**If you don't want to add this to _every single test file_** then we recommend that you configure
your test framework to run a file before your tests which does this automatically. See the
[setup](./setup) section for guidance on how to set up your framework.

---

## `act`

This is a light wrapper around the
[`react-test-renderer` `act` function](https://reactjs.org/docs/test-renderer.html). All it does is
forward all arguments to the act function if your version of react supports `act`.
