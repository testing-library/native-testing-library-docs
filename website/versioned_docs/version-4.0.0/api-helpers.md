---
id: version-4.0.0-api-helpers
title: Helpers
sidebar_label: Helpers
original_id: api-helpers
---

## Custom Queries

A few helper functions are exposed that are used internally to implement the default queries. You
can use the helpers to build custom queries. For example, the code below shows a way to query your
TestInstance by a `style` prop. Note: test files would need to now import `test-utils.js` instead of
importing directly from `@testing-library/react-native`. Also note, please never actually implement
this helper, it's just an example of what's possible.

```javascript
// test-utils.js
import * as nativeTestingLib from '@testing-library/react-native';

const { queryHelpers } = nativeTestingLib;

export const queryByStyle = queryHelpers.queryByProp.bind(null, 'style');
export const queryAllByStyle = queryHelpers.queryByProp.bind(null, 'style');

export function getAllByStyle(container, styles, ...rest) {
  const els = queryAllByStyle(container, styles, ...rest);
  if (!els.length) {
    throw getElementError(`Unable to find an element by style="${styles}"`, container);
  }
  return els;
}

export function getByStyle(...args) {
  return queryHelpers.firstResultOrNull(getAllByStyle, ...args);
}

// re-export with overrides
export {
  ...nativeTestingLib,
  getByStyle,
  getAllByStyle,
  queryByStyle,
  queryAllByStyle,
};
```

> **Note**
>
> Custom queries can be added to the `render` method by adding `queries` to the options config
> object. See the render [options](/docs/api-render#render-options).

## `getNodeText`

```typescript
getNodeText(node: React.ReactElement<any>)
```

Returns the complete text content of an element, removing any extra whitespace, and joining children
that are an array. The intention is to treat text in nodes exactly as how it is perceived by users
in a browser, where any extra whitespace within words in the html code is not meaningful when the
text is rendered, and all text appears as one cohesive string regardless of the code.

```javascript
getNodeText(
  <Text>
    {`
    Hello
      World  !
    `}
  </Text>,
); // "Hello World !"
```

## `within` and `getQueriesForElement` APIs

`within` (an alias to `getQueriesForElement`) takes a `NativeTestInstance` and binds it to the raw
query functions, allowing them to be used without manually specifying a container.

Example: To get the username input of a login form within a `<LoginModal />`, you could do:

```js
import { render, within } from '@testing-library/react-native';

const { getByLabelText } = render(<LoginModal />);
const loginForm = getByLabelText('login-form');

within(loginForm).getByPlaceholderText('Username');
```

## Debugging

When you use any `get` calls in your test cases, the current contents of the `baseElement` get
printed on the console. For example:

```javascript
// <Text>Hello world</Text>
getByText('Goodbye world'); // will fail by throwing error
```

The above test case will fail, however it prints the state of your React tree being tested, so you
will get to see:

```
Unable to find an element with the text: Goodbye world. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.
Here is the state of your container:
<Text>
  Hello World!
</Text>
```

Note: Since the debug size can get really large, you can set the limit of debug content to be
printed via environment variable `DEBUG_PRINT_LIMIT`. The default value is `7000`. You will see
`...` in the console, when the debug content is stripped off, because of the length you have set or
due to default size limit. Here's how you might increase this limit when running tests:

```
DEBUG_PRINT_LIMIT=10000 npm test
```

This works on macOS/linux, you'll need to do something else for windows. If you'd like a solution
that works for both, see [`cross-env`](https://www.npmjs.com/package/cross-env)

### `prettyPrint`

This helper function can be used to print out readable representation of the React tree of a node.
This can be helpful for instance when debugging tests.

It is defined as:

```typescript
function prettyPrint(node: React.ReactElement<any>, maxLength?: number): string;
```

It receives the root node to print out, and an optional extra argument to limit the size of the
resulting string, for cases when it becomes too large.

This function is usually used alongside `console.log` to temporarily print out React trees during
tests for debugging purposes:

```javascript
console.log(
  prettyPrint(
    <View>
      <Text>hi</Text>
    </View>,
  ),
);
// <View>
//   <Text>
//     Hi
//   </Text>
// </View>
```

This function is what also powers [the automatic debugging output described above](#debugging).
