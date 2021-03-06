/** @jsx jsx */

import React from "react";
import { css, jsx } from '@emotion/core';
import tabletIcon from '../assets/tablet.svg';

// MQ Breakpoints
const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map(
	bp => `@media (max-width: ${bp}px)`
);

// Base class for the Apple device styling
const tabletTemplate = css`
  width: 600px;
  height: 431px;
  background: #fff;
  border: 1px solid gray;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

function TabletIcon() {
  return (
    <div css={css`${tabletTemplate}`}>
      <div
        css={css`
          ${tabletTemplate}
          width: 99%;
          height: 99%;
        `}
      >
        <div
          css={css`
            ${tabletTemplate}
            width: 95%;
            height: 95%;
            overflow: hidden;
            position: relative;
          `}
        >
          <embed src={tabletIcon} alt="tablet icon" />
        </div>
      </div>
    </div>
  )
}

export default TabletIcon;
