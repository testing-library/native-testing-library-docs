---
id: version-2.0.0-api-async
title: Async
sidebar_label: Async
original_id: api-async
---

Several utilities are provided for dealing with asynchronous code. These can be useful to wait for
an element to appear or disappear in response to an action. (See the
[guide to testing disappearance](guide-disappearance.md).)

## `wait`

```typescript
function wait(
  callback?: () => void,
  options?: {
    timeout?: number;
    interval?: number;
  },
): Promise<void>;
```

When in need to wait for non-deterministic periods of time you can use `wait`, to wait for your
expectations to pass. The `wait` function is a small wrapper around the
[`wait-for-expect`](https://github.com/TheBrainFamily/wait-for-expect) module. Here's a simple
example:

```javascript
await wait(() => getByLabelText(container, 'username'));
getByLabelText(container, 'username').value = 'chucknorris';
```

This can be useful if you have a unit test that mocks API calls and you need to wait for your mock
promises to all resolve.

The default `callback` is a no-op function (used like `await wait()`). This can be helpful if you
only need to wait for one tick of the event loop (in the case of mocked API calls with promises that
resolve immediately).

The default `timeout` is `4500ms` which will keep you under
[Jest's default timeout of `5000ms`](https://facebook.github.io/jest/docs/en/jest-object.html#jestsettimeouttimeout).

The default `interval` is `50ms`. However it will run your callback immediately on the next tick of
the event loop (in a `setTimeout`) before starting the intervals.

## `waitForElement`

```typescript
function waitForElement<T>(
  callback: () => T,
  options?: {
    container?: ReactTestInstance;
    timeout?: number;
    interval?: number;
  },
): Promise<T>;
```

When in need to wait for DOM elements to appear, disappear, or change you can use `waitForElement`.
The `waitForElement` function is a similar to `wait`, but is a helper specifically intended to wait
for an element.

Here's a simple example:

```javascript
const usernameElement = await waitForElement(() => getByA11yLabel(container, 'username'), {
  container,
});
expect(usernameElement.props.children).toBe('chucknorris');
```

You can also wait for multiple elements at once:

```javascript
const [usernameElement, passwordElement] = await waitForElement(
  () => [getByA11yLabel(container, 'username'), getByA11yLabel(container, 'password')],
  { container },
);
```

The default `container` is the root `ReactTestInstance` that is the result of `render`. Make sure
the elements you wait for will be attached to it, or set a different `ReactTestInstance` as a
container.

The default `timeout` is `4500ms` which will keep you under
[Jest's default timeout of `5000ms`](https://facebook.github.io/jest/docs/en/jest-object.html#jestsettimeouttimeout).

The default `interval` is `50ms`. However it will run your callback immediately on the next tick of
the event loop (in a `setTimeout`) before starting the intervals.
