/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const ExternalLink = props => <a target="_blank" rel="noreferrer noopener" {...props} />;
const Link = props => <a {...props} />;

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
          <Link href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </Link>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('intro')}>Getting Started</a>
            <a href={this.docUrl('example')}>Example</a>
            <a href={this.docUrl('api-queries')}>API</a>
            <a
              href="https://github.com/testing-library/native-testing-library/raw/master/other/cheat-sheet.pdf"
              target="_blank"
              rel="noreferrer noopener"
            >
              Cheat sheet
            </a>
          </div>
          <div>
            <h5>Community</h5>
            <a
              href="http://stackoverflow.com/questions/tagged/native-testing-library"
              target="_blank"
              rel="noreferrer noopener"
            >
              Stack Overflow
            </a>
            <a href="https://reactiflux.com/">Reactiflux on Discord</a>
            <a href="https://twitter.com/TestingLib" target="_blank" rel="noreferrer noopener">
              Follow on Twitter
            </a>
            <a href="https://spectrum.chat/testing-library/help-react-native?tab=posts">Spectrum</a>
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
              aria-label="Star this project on GitHub"
            >
              Star
            </a>
            <a href="https://github.com/testing-library/native-testing-library">GitHub</a>
            <a href="https://github.com/testing-library/native-testing-library-docs">
              Edit the docs
            </a>
          </div>
        </section>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
