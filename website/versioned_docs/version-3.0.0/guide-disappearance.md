---
id: version-3.0.0-guide-disappearance
title: Appearance and Disappearance
original_id: guide-disappearance
---

`dom-testing-library` can utilize a fake DOM `MutationObserver` to look for changes, but we don't
have that luxury in the native/test renderer environment. Since we don't have that, you should know
that all `wait-*` utilities in this library offer roughly the same functionality, just with some
added convenience.

Since we can't "observe" a DOM, we just have to poll it at a given interval

## Waiting for appearance

If you need to wait for an element to appear, the [async wait utilities](api-async.md) allow you to
wait for an assertion to be satisfied before proceeding. The wait utilities retry until the query
passes or times out.

```javascript
test('movie title appears', async () => {
  // element is initially not present...

  // wait for appearance
  await wait(() => {
    // We don't have a handy assertion like they do in DOM land, so just check that it exists
    expect(getByText('the lion king')).toBeTruthy();
  });

  // wait for appearance and return the element
  const movie = await waitForElement(() => getByText('the lion king'));
});
```

## Waiting for disappearance

The `wait` [async helper](api-async.md) function retries until the wrapped function stops throwing
an error. This can be used to assert that an element disappears from the page.

```javascript
test('movie title goes away', async () => {
  // element is initially present...
  // note use of queryBy instead of getBy to return null
  // instead of throwing in the query itself
  await wait(() => {
    // We don't have a handy assertion like they do in DOM land, so just check that it doesn't exist
    expect(queryByText('i, robot')).toBeFalsy();
  });
});
```

## Asserting elements are not present

All `getBy` methods throw errors when they can't find their search, but `queryBy` methods don't. Any
time you need to verify something isn't there, use `query`. Any time you need to verify something i
there, use `get`.

```javascript
const submitButton = queryByText(testInstance, 'submit');
expect(submitButton).toBeNull(); // it doesn't exist
```

The `queryAll` APIs version return an array of matching nodes. The length of the array can be useful
for assertions after elements are added or remove.

```javascript
const submitButtons = queryAllByText(container, 'submit');
expect(submitButtons).toHaveLength(2); // expect 2 elements
```
