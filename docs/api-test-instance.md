---
id: api-test-instance
title: NativeTestInstance
sidebar_label: NativeTestInstance
---

`NativeTestInstance` is a proxied react-test-renderer TestInstance. Not all properties are
available, so you should only rely on the ones listed in this documentation.

Properties are excluded or overridden in an effort to make it easier to follow the guiding
principles of testing-library. If there are other assertions you'd like to make, that aren't
supported by this library there should be no problem running other react-test-renderer tests in the
same codebase.

> Before assuming you need access to something not exposed, try to ask yourself what you would do if
> you were using dom testing library.
>
> We believe all of the utilities provided by this package allow you to write tests the way you
> would using that library, so if you're struggling to write a test, try to take a step back and
> evaluate if you're trying to test implementation details or making an assertion that doesn't map
> to something your users could do.

## `getProp`

This is simply a helper that allows you to get the value of a native node prop. It is meant to
mirror the `getAttribute` API in the DOM. You should rarely need to use this method in your tests.

```javascript
const nativeNode = getByValue('hello world');
const value = nativeNode.getProp('value');

expect(value).toBe('hello world');
```

## `findAll`

This method will return you all children nodes that are valid native nodes. **This will not find
custom components, it will only return core components defined in the preset.** It is meant to be
similar to `document.querySelectorAll`.

```javascript
const { container } = render(<MyComponent />);
const textNodes = container.findAll(node => node.getProp('accessibilityLabel') === 'hello world');

expect(textNodes).toHaveLength(2);
```

## `type`

This will be the type of the native node. For all queries you can make in this library, this value
will be a string.

```javascript
const { findByText } = render(<Text>hello world</Text>);

expect(findByText(/hello world/i).type).toBe('hello world');
```

## `props`

The props of the element you've queried for. These are meant to be the equivalent of a DOM
"attribute". You should rarely need to make assertions on these values, so try not to rely heavily
on using them directly.

```javascript
const { findByText } = render(<Text style={{}}>hello world</Text>);

console.log(findByText(/hello world/i).props);
```

## `parentNode`

This will return only valid native node parents. This differs from the react-test-renderer's
`parent` property in that way. You will not be able to get your implementation components by
traversing the parents of your tree.

```javascript
const { findByText } = render(
  <View>
    <CustomComponent>
      <Text>hello world</Text>
    </CustomComponent>
  </View>,
);

expect(findByText(/hello world/i).parentNode.type).toBe('View'); // NOT CustomComponent
```

## `children`

This will return only valid native node children. This differs from the react-test-renderer's
children property in that way. You will not be able to get your implementation components by
traversing the children of your tree.

```javascript
const { findByTestID } = render(
  <View testID="my-wrapper">
    <CustomComponent>
      <Text>hello world</Text>
    </CustomComponent>
  </View>,
);

expect(findByTestID('my-wrapper').children[0].type).toBe('Text'); // NOT CustomComponent
```
