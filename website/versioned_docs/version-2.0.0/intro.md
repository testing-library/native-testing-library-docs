---
id: version-2.0.0-intro
title: Introduction
sidebar_label: Intro
original_id: intro
---

## The problem

You want to write maintainable tests for your React Native application. You love Kent Dodds'
[testing library](https://testing-library.com), and you want to be able to write maintainable tests
for your React Native application. You don't want to use a library that renders components to a fake
DOM, and you've had a hard time finding what you need to write tests using that philosophy in React
Native.

## This solution

`native-testing-library` is an implementation of the well-known `testing-library` API that works for
React Native. The primary goal is to mimic the testing library API as closely as possible while
still accounting for the differences in the platforms. Accomplishing this is no small feat because
of the differences between the two platforms. Although most framework implementations like
`react-testing-library` are thin layers over [dom-testing-library](https://testing-library.com),
this library needed to have its own base implementation as well as a user-facing API. This library
uses the [react-test-renderer](https://reactjs.org/docs/test-renderer.html), whereas
`dom-testing-library` uses JSDOM. The main philosophy here is that you should find elements on the
"screen" the way users would. This approach is meant to give you confidence that your app is working
as a cohesive unit. Just like the `dom-testing-library`, `native-testing-library`'s primary guiding
principle is:

> [The more your tests resemble the way your software is used, the more confidence they can give you.](guiding-principles.md)

This library gives you the tools you need to find things in your application the way your users
would. You can do things like find elements by text, input value, and accessibility labels -- the
types of things your users can see. We also give you the ability to search for elements by `testID`,
but you should consider it a last resort because users can't see a testID and it can introduce
unpredictable behavior in your tests.

It will also encourage you to build more accessible apps. For example, your users can't see your
icon touchable that doesn't have an accessibility label, so neither can your tests. We believe that
writing good tests using this library will force you to give more consideration to whether what
you're doing is an accessible experience for all of your users.

This library should, in theory, work with any any testing framework like Jest or Mocha, but we do
recommend you use Jest with the `react-native` Jest preset. We have not tested it in any other
environment, and likely won't be able to support usage with another library.

[jest]: https://jestjs.io
