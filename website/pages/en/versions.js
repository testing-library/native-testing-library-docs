/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary');

const Container = CompLibrary.Container;

const CWD = process.cwd();

const versions = require(`${CWD}/versions.json`);

function Versions(props) {
  const { config: siteConfig } = props;
  const latestVersion = versions[0];
  const repoUrl = `https://github.com/testing-library/native-testing-library`;
  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer versionsContainer">
        <div className="post">
          <header className="postHeader">
            <h1>{siteConfig.title} Versions</h1>
          </header>
          <p>New versions of this project are released every so often.</p>
          <h3 id="latest">Current version (Stable)</h3>
          <table className="versions">
            <tbody>
              <tr>
                <th>{latestVersion}</th>
                <td>
                  <a href="/docs/intro">Documentation</a>
                </td>
                <td>
                  <a href="https://github.com/testing-library/native-testing-library/releases/latest">
                    Changelog
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 id="latest">Next version</h3>
          <table className="versions">
            <tbody>
              <tr>
                <th>next</th>
                <td>
                  <a href="/docs/next/intro">Documentation</a>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 id="archive">Past Versions</h3>
          <table className="versions">
            <tbody>
              {versions.map(
                version =>
                  version !== latestVersion && (
                    <tr>
                      <th>{version}</th>
                      <td>
                        {/* You are supposed to fill this href by yourself
                        Example: href={`docs/${version}/doc.html`} */}
                        <a href={`docs/${version}/intro`}>Documentation</a>
                      </td>
                      <td>
                        <a href={`${repoUrl}/releases/tag/v${version}`}>Changelog</a>
                      </td>
                    </tr>
                  ),
              )}
            </tbody>
          </table>
          <p>
            You can find past versions of this project on <a href={repoUrl}>GitHub</a>.
          </p>
        </div>
      </Container>
    </div>
  );
}

module.exports = Versions;
