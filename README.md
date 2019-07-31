<div align="center">
  <h1>React Native Testing Library Docs</h1>
  
  <a href="https://www.joypixels.com/emoji/1f433">
    <img
      height="80"
      width="80"
      alt="whale"
      src="https://raw.githubusercontent.com/testing-library/native-testing-library/master/other/whale.png"
    />
  </a>
    
  <p>Simple and complete React Native testing utilities that encourage good testing practices.</p>
  
  [**Read The Docs**](https://native-testing-library.com/docs/intro)
</div>

<hr />

[![Netlify Status](https://api.netlify.com/api/v1/badges/bb4911c5-74b1-48b4-aea8-3d317cec4761/deploy-status)](https://app.netlify.com/sites/native-testing-library/deploys)
[![version](https://img.shields.io/npm/v/native-testing-library.svg?style=flat-square)](https://www.npmjs.com/package/native-testing-library)
[![downloads](https://img.shields.io/npm/dm/native-testing-library.svg?style=flat-square)](http://www.npmtrends.com/native-testing-library)
[![MIT License](https://img.shields.io/npm/l/native-testing-library.svg?style=flat-square)](https://github.com/testing-library/native-testing-library/blob/master/LICENSE)

[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square)](https://github.com/testing-library/native-testing-library/blob/master/CODE_OF_CONDUCT.md)

[![Watch on GitHub](https://img.shields.io/github/watchers/testing-library/native-testing-library-docs.svg?style=social)](https://github.com/testing-library/native-testing-library-docs/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/testing-library/native-testing-library-docs.svg?style=social)](https://github.com/testing-library/native-testing-library-docs/stargazers)

## Guiding Principles

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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/bcarroll22"><img src="https://avatars2.githubusercontent.com/u/11020406?v=4" width="100px;" alt="Brandon Carroll"/><br /><sub><b>Brandon Carroll</b></sub></a><br /><a href="https://github.com/testing-library/native-testing-library-docs/commits?author=bcarroll22" title="Code">💻</a> <a href="#content-bcarroll22" title="Content">🖋</a> <a href="https://github.com/testing-library/native-testing-library-docs/commits?author=bcarroll22" title="Documentation">📖</a> <a href="#design-bcarroll22" title="Design">🎨</a></td>
    <td align="center"><a href="http://www.jmporchet.ch"><img src="https://avatars3.githubusercontent.com/u/3099008?v=4" width="100px;" alt="Jean-Marie Porchet"/><br /><sub><b>Jean-Marie Porchet</b></sub></a><br /><a href="https://github.com/testing-library/native-testing-library-docs/commits?author=jmporchet" title="Documentation">📖</a></td>
    <td align="center"><a href="http://santiagomartin.dev"><img src="https://avatars2.githubusercontent.com/u/7255298?v=4" width="100px;" alt="Santi"/><br /><sub><b>Santi</b></sub></a><br /><a href="https://github.com/testing-library/native-testing-library-docs/commits?author=SantiMA10" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/elyalvarado"><img src="https://avatars1.githubusercontent.com/u/545352?v=4" width="100px;" alt="Ely Alvarado"/><br /><sub><b>Ely Alvarado</b></sub></a><br /><a href="https://github.com/testing-library/native-testing-library-docs/commits?author=elyalvarado" title="Documentation">📖</a></td>
    <td align="center"><a href="https://twitter.com/neiker"><img src="https://avatars0.githubusercontent.com/u/688444?v=4" width="100px;" alt="Javier Alvarez"/><br /><sub><b>Javier Alvarez</b></sub></a><br /><a href="https://github.com/testing-library/native-testing-library-docs/commits?author=neiker" title="Documentation">📖</a></td>
    <td align="center"><a href="https://mattwood.tech/"><img src="https://avatars1.githubusercontent.com/u/22530815?v=4" width="100px;" alt="Matt Wood"/><br /><sub><b>Matt Wood</b></sub></a><br /><a href="https://github.com/testing-library/native-testing-library-docs/commits?author=mattfwood" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!
