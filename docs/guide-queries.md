---
id: guide-queries
title: How Should I Query?
---

## Priority

Whatever you do, try to make your tests resemble real use cases. You'll only be confident with your
tests if they work the way your users do. With that in mind, we recommend this order of priority:

1. **Queries Users Can Interact With**
   1. `getByA11yLabel`: Your disabled users are counting on you, so this should likely be everywhere
      for their sake 😉 use it often, and if you aren't, maybe ask yourself why.
   1. `getByPlaceholder`: Great for targeting a `TextInput` element to verify its content
   1. `getByText`: Great for finding a `Button` or `Touchable` to fire an event on
   1. `getByValue`: The user can see the value they type into a `TextInput` or a checked `CheckBox`
      so this one is safe to use
1. **Queries Users Can Infer**
   1. `getByA11yRole`: If your app screens have good hierarchy and single focus, this may be a good
      option for finding your elements
1. **Queries Users Don't Even Know About**
   1. `getByTestId`: The user cannot see (or hear) these, so this is only recommended for cases
      where you can't match by text or it doesn't make sense

## Manual Queries

If you absolutely can't figure out another way to test the element you need to test, there is a very
highly discouraged, poorly documented way to likely get what you're looking for. We understand that
there are times when you need to test things that aren't related to the native bridged views, and
sometimes things that can't be "seen" in any way need to be validated.

Here is an example of such a case so that you're thinking in the right context. If you were to
render a `<MaterialIcon />` from `react-native-vector-icons`, you provide a name prop which
determines the icon to display to the user. Under the hood, `react-native-vector-icons` renders a
`<Text />` component and passes a special symbol across the bridge, which a native counterpart
module uses to translate to the vector icon you asked for by name. You can (and should) provide an
`a11yLabel` and query by that, but for the sake of this example let's pretend like you can't. Here
is what you can do in a case where you are **very** stuck and can't figure out what to do.

```javascript
// react-testing-library
const { baseElement } = render(<MyComponent />);
const icons = baseElement.findAll(node => node.props.name === 'menu');
```

We cannot stress enough that we _do not_ recommend that you do this. Your results will be
unpredictable, and you will not be creating reliable tests. You're also wandering down the path of
testing implementation details because your users do not, and won't ever, know about the shape of
your props or care about whether or not those props are in the shape that only _you_ know about. You
can use this API when you need it, but above all else please consider your users and remember the
[guiding-principles](guiding-principles.md).

### Addendum: why is this unpredictable?

I'm so glad you asked! In the DOM, you don't "spread" props; you don't pass props to children at
all. Attributes are "unique" to an element, and there's no concept of parent->child relationship in
that regard. As we all know, that is not the case with React. Props are often spread or passed
liberally without much consideration as to what gets "spread" or "passed" -- it's just so easy to
do! We handled that problem in this library for you by only returning you the lowest level
components that communicate to the native portion of the app -- spreading at that level tends to not
be an issue.

Let's look at a contrived example based on this idea of a `MaterialIcon`. Your rendered React tree
might look like this:

```javascript
<MaterialIcon name="menu" accessibilityLabel="menu icon">
  <Icon name="menu" accessibilityLabel="menu icon">
    <Text accessibilityLabel="menu icon">???</Text>
  </Icon>
</MaterialIcon>
```

You can't know what a library does with their props, and it certainly doesn't matter to your users.
All they care about is that they see a material design icon. So, if you do:

```javascript
baseElement.find(({ props }) => props.name === 'menu');

// => [MaterialIcon, Icon]
```

This isn't right at all. Sure, you could do something like:

```javascript
const icon = baseElement.find(({ props }) => props.name === 'menu');

icon[icon.length - 1];

// => Icon
```

But I'm sure you can see now how wildly unpredictable and confusing this can turn out to be. If
instead you do:

```javascript
queryAllByA11yLabel('menu icon');

// => [Text]
```

This is the element your user will see, this is the element you should assert against. Do your best
to always assert on this element. How can you know what components bridged to native?

```javascript
const { debug } = render(<MyComponent />);

debug();
```

This is how ☺️ debug will always only show you the elements in the tree that bridge to native.
