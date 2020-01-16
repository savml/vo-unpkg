/** @jsx jsx */
import { Global, css, jsx } from '@emotion/core';
// import { Fragment, useEffect, useState } from 'react';
import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import formatBytes from 'pretty-bytes';
import formatDate from 'date-fns/format';
import parseDate from 'date-fns/parse';

import { formatNumber, formatPercent } from '../utils/format.js';
import { fontSans, fontMono } from '../utils/style.js';

import { TwitterIcon, GitHubIcon } from './Icons.js';
import CloudflareLogo from './images/CloudflareLogo.png';
import AngularLogo from './images/AngularLogo.png';

const globalStyles = css`
  html {
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html,
  body,
  #root {
    height: 100%;
    margin: 0;
  }

  body {
    ${fontSans}
    font-size: 16px;
    line-height: 1.5;
    background: white;
    color: black;
  }

  code {
    ${fontMono}
  }

  dd,
  ul {
    margin-left: 0;
    padding-left: 25px;
  }

  #root {
    display: flex;
    flex-direction: column;
  }
`;

const linkStyle = {
  color: '#0076ff',
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline'
  }
};

function AboutLogo({ children }) {
  return <div css={{ textAlign: 'center', flex: '1' }}>{children}</div>;
}

function AboutLogoImage(props) {
  return <img {...props} css={{ maxWidth: '90%' }} />;
}

function Stats({ data }) {
  const totals = data.totals;
  const since = parseDate(totals.since);
  const until = parseDate(totals.until);

  return (
    <p>
      From <strong>{formatDate(since, 'MMM D')}</strong> to{' '}
      <strong>{formatDate(until, 'MMM D')}</strong> unpkg served{' '}
      <strong>{formatNumber(totals.requests.all)}</strong> requests and a total
      of <strong>{formatBytes(totals.bandwidth.all)}</strong> of data to{' '}
      <strong>{formatNumber(totals.uniques.all)}</strong> unique visitors,{' '}
      <strong>
        {formatPercent(totals.requests.cached / totals.requests.all, 2)}%
      </strong>{' '}
      of which were served from the cache.
    </p>
  );
}

export default function App() {
  // const [stats, setStats] = useState(
  const [stats] = useState(
    typeof window === 'object' &&
      window.localStorage &&
      window.localStorage.savedStats
      ? JSON.parse(window.localStorage.savedStats)
      : null
  );
  const hasStats = !!(stats && !stats.error);
  // const stringStats = JSON.stringify(stats);

  // useEffect(() => {
  //   window.localStorage.savedStats = stringStats;
  // }, [stringStats]);

  // useEffect(() => {
  //   fetch('/api/stats?period=last-month')
  //     .then(res => res.json())
  //     .then(setStats);
  // }, []);

  return (
    <Fragment>
      <div
        css={{
          maxWidth: 740,
          margin: '0 auto',
          padding: '0 20px'
        }}
      >
        <Global styles={globalStyles} />

        <header>
          <h1
            css={{
              textTransform: 'uppercase',
              textAlign: 'center',
              fontSize: '5em'
            }}
          >
            vo-unpkg
          </h1>

          <p>
            unpkg is a fast, global content delivery network for everything on{' '}
            <a href="https://www.npmjs.com/" css={linkStyle}>
              npm
            </a>
            . Use it to quickly and easily load any file from any package using
            a URL like:
          </p>

          <div
            css={{
              textAlign: 'center',
              backgroundColor: '#eee',
              margin: '2em 0',
              padding: '5px 0'
            }}
          >
            /:package@:version/:file
          </div>

          {hasStats && <Stats data={stats} />}
        </header>

      </div>

      <footer
        css={{
          marginTop: '5rem',
          background: 'black',
          color: '#aaa'
        }}
      >
      </footer>
    </Fragment>
  );
}

if (process.env.NODE_ENV !== 'production') {
  App.propTypes = {
    location: PropTypes.object,
    children: PropTypes.node
  };
}
