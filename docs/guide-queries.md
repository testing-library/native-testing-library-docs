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
