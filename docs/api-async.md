---
id: api-async
title: Async Utilities
sidebar_label: Async Utilities
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
await wait(() => getByLabelText('username'));
getByLabelText('username').value = 'chucknorris';
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
    timeout?: number;
    interval?: number;
  },
): Promise<T>;
```

When you need to wait for elements to appear, you can use `waitForElement`. The `waitForElement`
function is a similar to `wait`, but is specifically intended to wait for an element to appear.
Additionally, the result is returned for you to use.

Here's a simple example:

```javascript
const usernameElement = await waitForElement(() => getByA11yLabel('username'));
expect(usernameElement).toHaveTextContent('chucknorris');
```

You can also wait for multiple elements at once:

```javascript
const [usernameElement, passwordElement] = await waitForElement(() => [
  getByA11yLabel('username'),
  getByA11yLabel('password'),
]);
```

The default `timeout` is `4500ms` which will keep you under
[Jest's default timeout of `5000ms`](https://facebook.github.io/jest/docs/en/jest-object.html#jestsettimeouttimeout).

The default `interval` is `50ms`. However it will run your callback immediately on the next tick of
the event loop (in a `setTimeout`) before starting the intervals.

## `waitForElementToBeRemoved`

```typescript
function waitForElementToBeRemoved<T>(
  callback: () => T,
  options?: {
    timeout?: number;
    interval?: number;
  },
): Promise<T>;
```

When you need to wait for elements to be removed, or you can use `waitForElementToBeRemoved`. The
`waitForElementToBeRemoved` function is a similar to `wait`, but is a helper specifically intended
to wait for an element to be removed from the tree. Similarly to `waitForElement` the result of the
callback is returned as a Promise, but in most cases you won't need it.

Here's a simple example:

```javascript
const listItems = await waitForElementToBeRemoved(() => queryAllByA11yLabel('list-item'));
expect(listItems).toHaveLength(0);
```

You can also wait for multiple elements to be removed at once:

```javascript
const [usernameElement, passwordElement] = await waitForElementToBeRemoved(() => [
  queryByA11yLabel('username'),
  queryByA11yLabel('password'),
]);
```

The default `timeout` is `4500ms` which will keep you under
[Jest's default timeout of `5000ms`](https://facebook.github.io/jest/docs/en/jest-object.html#jestsettimeouttimeout).

The default `interval` is `50ms`. However it will run your callback immediately on the next tick of
the event loop (in a `setTimeout`) before starting the intervals.
