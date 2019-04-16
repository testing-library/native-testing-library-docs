---
id: guiding-principles
title: Guiding Principles
sidebar_label: Guiding Principles
---

> [The more your tests resemble the way your software is used, the more confidence they can give you.](https://twitter.com/kentcdodds/status/977018512689455106)

We try to only expose methods and utilities that encourage you to write tests that closely resemble
how your apps are used.

Utilities are included in this project based on the following guiding principles:

1.  If it relates to rendering components, it deals with native views rather than component
    instances, nor should it encourage dealing with component instances.
2.  It should be generally useful for testing the application components in the way the user would
    use it. We are making some trade-offs here because we're using a computer and often a simulated
    environment, but in general, utilities should encourage tests that use the components the way
    they're intended to be used.
3.  Utility implementations and APIs should be simple and flexible.

In summary, we believe in the principles of `testing-library`, and adhere to them as closely as
possible. At the end of the day, what we want is for this library to be pretty light-weight, simple,
and understandable.
