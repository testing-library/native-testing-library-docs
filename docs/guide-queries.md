---
id: guide-queries
title: How Should I Query?
---

## Priority

Whatever you do, try to make your tests resemble real use cases. You'll only be confident with your
tests if they work the way your users do. With that in mind, we recommend this order of priority:

1. **Queries Users Can Interact With**
   1. [`getByLabelText`](api-queries#bylabeltext): Your disabled users are counting on you, so this
      should likely be everywhere for their sake 😉 use it often, and if you aren't, maybe ask
      yourself why.
   1. [`getByHintText`](api-queries#byhinttext): You should probably have an accessibility label
      that you can select by, but if for some reason you set this instead, it's safe to use.
   1. [`getByPlaceholderText`](api-queries#byplaceholdertext): Great for targeting a `TextInput`
      element to verify its content
   1. [`getByText`](api-queries#bytext): Great for finding a `Text`, `Button`, or `Touchable` node.
      You'll probably use this one a lot.
   1. [`getByDisplayValue`](api-queries#bydisplayvalue): This is good because a user can see the
      value they type into a `TextInput` or whether a `Switch` is on or off.
1. **Queries Users Can Infer**
   1. [`getByTitle`](api-queries#bytitle): This isn't available on many elements, and there's likely
      a better way you can find the element you're looking for.
   1. [`getByRole`](api-queries#byrole): If your app screens have good hierarchy, this may be a
      decent option for finding your elements
1. **Queries Users Don't Even Know About**
   1. [`getByTestId`](api-queries#bytestid): The user cannot see (or hear) these, so this is only
      recommended for cases where you can't match by text or it doesn't make sense

## Manual Queries

If you absolutely can't find a way to get the element you're looking for, you can use
[`findAll`](api-test-instance#findall) as an escape hatch. Note that this is a bad practice and may
introduce unpredictable behavior in your tests. It would likely be better to use a `testID` in most
cases where you need to.

Also note, this utility still won't be able to find your app's components, it will only search for
React Native core components. This library provides you no reasonable way to make an assertion on
your components.
