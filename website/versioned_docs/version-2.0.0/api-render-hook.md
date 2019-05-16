---
id: version-2.0.0-api-render-hook
title: Render Hook
sidebar_label: Render Hook
original_id: api-render-hook
---

## `renderHook`

```typescript
function renderHook(
  callback: CallbackFn,
  options?: {
    /* You won't often use this, expand below for docs on options */
  },
): RenderResult;
```

Renders a test component that will call the provided `callback`, including any hooks it calls, every
time it renders.

**Please note:** currently the React team is still working to support the async nature of hooks in
testing environments. There are many provided examples of testing hooks provided, and all of these
tests pass, but you may have to work harder to get custom hooks to pass tests, and even if they pass
you may still see some warnings about using not using act().

## `renderHook` Options

### `callback`

Call function to execute on each render. This function should call one or more hooks for testing.

### `options`

Accepts the [same options `render`](api-render#render-options), as well as:

#### `initialProps`

The initial values to pass to the `callback` function

## `renderHook` Result

The `renderHook` method returns an object similar to that of `render`:

### `current`

The return value of the `callback` function

### `error`

The error that was thrown if the `callback` function threw an error during rendering

### `waitForNextUpdate`

Returns a `Promise` that resolves the next time the hook renders, commonly when state is updated as
the result of a asynchronous action.

### `rerender`

Function to rerender the test component including any hooks called in the `callback` function. If
`newProps` are passed, the will replace the `initialProps` passed the the `callback` function for
future renders.

### `unmount`

Function to unmount the test component, commonly used to trigger cleanup effects for `useEffect`
hooks. Note that you don't need to call this `afterEach` like you do in react testing library
because these elements aren't being added to a DOM. Use it only as necessary.
