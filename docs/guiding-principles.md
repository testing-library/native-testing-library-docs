---
id: guiding-principles
title: Guiding Principles
sidebar_label: Guiding Principles
---

> [The more your tests resemble the way your software is used, the more confidence they can give you.](https://twitter.com/kentcdodds/status/977018512689455106)

We try to only expose methods and utilities that encourage you to write tests that closely resemble
how your apps are used.

Utilities are included in this project based on the following guiding principles:

1.  Rendering React Native components ultimately creates native views, and those views should be
    what you test rather than the React component instances you rendered to make them.
2.  In general, test the way your users use your app. There are instances where you'll need to write
    unit tests, but try your best to write with this first -- the more your tests resemble the way
    your app works, the more confident you'll be with your app.
3.  Be responsible, and remember that testing exists to serve you, not the other way around. If the
    library isn't working for you, contribute to make it work or do something more intuitive. Make
    your tests work for you and your team!

In summary, we believe in the principles of `dom-testing-library` and its companion libraries, and
try to adhere to them as closely as possible. Changes to this library should always consider how
they relate to what's happening in the other libraries in this family of tools.
