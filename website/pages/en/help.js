/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const ExternalLink = (props) => <a target="_blank" rel="noreferrer noopener" {...props} />;
const Link = (props) => <a {...props} />;

function Help(props) {
  const { config: siteConfig, language = '' } = props;
  const { baseUrl, docsUrl } = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

  const supportLinks = [
    {
      content: `Ask a question on [Stack Overflow](https://stackoverflow.com/questions/tagged/native-testing-library)`,
      title: 'Stack Overflow',
    },
    {
      content: `Chat on [Discord](https://discord.gg/c6JN9fM)`,
      title: 'Discord',
    },
  ];

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer helpContainer">
        <div className="post">
          <header className="postHeader">
            <h1>Need help?</h1>
          </header>
          <GridBlock contents={supportLinks} layout="threeColumn" align="left" />
        </div>
      </Container>
    </div>
  );
}

module.exports = Help;
