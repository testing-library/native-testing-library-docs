/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('intro', this.props.language)}>
              Getting Started
            </a>
            <a href={this.docUrl('install', this.props.language)}>
              Install
            </a>
            <a href={this.docUrl('example', this.props.language)}>
              Example
            </a>
            <a href={this.docUrl('api-queries', this.props.language)}>
              API
            </a>
          </div>
          <div>
            <h5>Community</h5>
            <a
              href="http://stackoverflow.com/questions/tagged/native-testing-library"
              target="_blank"
              rel="noreferrer noopener">
              Stack Overflow
            </a>
            <a href="https://reactiflux.com/">Reactiflux on Discord</a>
            <a
              href="https://twitter.com/bcarroll22"
              target="_blank"
              rel="noreferrer noopener">
              Follow on Twitter
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-count-href="/facebook/docusaurus/stargazers"
              data-show-count="true"
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
            <a href="https://github.com/bcarroll22/native-testing-library">GitHub</a>
            <a href="https://github.com/bcarroll22/native-testing-library-docs">Edit the docs</a>
          </div>
        </section>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
