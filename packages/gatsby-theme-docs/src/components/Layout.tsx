import React from 'react';
import { css } from '@emotion/core';
import { Columns, Column } from '@wdlk/components';

import { ThemeDoc } from '.';
import styled from './styled';

export interface TemplateLayoutProps {
  readonly code: JSX.Element | null;
  readonly navigation: JSX.Element;
  readonly menuIcon: JSX.Element;
}

interface StyledSlotProps {
  readonly isSingleColumn: boolean;
}

const createStylesContentColumn = (
  props: StyledSlotProps & { readonly theme: ThemeDoc },
) =>
  props.isSingleColumn
    ? css`
        max-width: ${props.theme.breakpoints[2]};
      `
    : css`
        max-width: 50%;
        border-color: ${props.theme.colors.grays[0]};
        border-style: solid;
        border-width: 0 0 ${props.theme.borderWidths[0]}px;
      `;

const StyledContainer = styled.div`
  position: relative;
`;

StyledContainer.displayName = 'StyledContainer';

const StyledMainContent = styled.main`
  padding-top: ${props => props.theme.navigationTab}px;
  ${props =>
    css`
      @media (min-width: ${props.theme.breakpoints[1]}) {
        padding-top: 0;
        padding-left: ${props.theme.navigationTab}px;
      }
    `}
`;
StyledMainContent.displayName = 'StyledMainContent';

const StyledContentColumn = styled(Column)<StyledSlotProps>`
  min-height: 100vh;
  padding: ${props => `${props.theme.space[8]}px ${props.theme.space[4]}px`};
  ${props => {
    const { breakpoints, space } = props.theme;

    return css`
      @media (min-width: ${breakpoints[2]}) {
        padding: ${space[6]}px ${space[8]}px;
        ${createStylesContentColumn(props)}
      }
    `;
  }}
`;

StyledContentColumn.displayName = 'StyledContentColumn';

const StyledCodeColumn = styled(Column)`
  display: flex;
  align-items: center;
  padding: ${props => `${props.theme.space[8]}px ${props.theme.space[4]}px`};
  border-color: ${props => props.theme.colors.whites[1]};
  border-style: solid;
  border-width: ${props => `0 0 ${props.theme.borderWidths[0]}px`};
  background-color: ${props => props.theme.colors.background};

  ${props => {
    const { breakpoints, colors, space } = props.theme;

    return css`
      @media (min-width: ${breakpoints[2]}) {
        padding: ${space[6]}px ${space[4]}px;
        background-color: ${colors.codeBg};
        border-color: ${colors.grays[4]};
      }
    `;
  }}
`;

StyledCodeColumn.displayName = 'StyledCodeColumn';

const StyledMenuIconSlot = styled.div`
  position: fixed;
  top: ${props => `${props.theme.space[4]}px`};
  right: ${props => `${props.theme.space[4]}px`};
  z-index: 3;

  ${props => {
    const { breakpoints, colors, space } = props.theme;

    return css`
      @media (min-width: ${breakpoints[2]}) {
        top: 50%;
        right: unset;
        left: ${space[3]}px;
        border-color: ${colors.grays[4]};
        transform: rotate(90deg);
      }
    `;
  }}
`;

StyledMenuIconSlot.displayName = 'StyledMenuIconSlot';

export const TemplateLayout: React.FC<TemplateLayoutProps> = props => (
  <StyledContainer>
    {props.navigation}
    <StyledMenuIconSlot>{props.menuIcon}</StyledMenuIconSlot>
    <StyledMainContent>
      <Columns collapseBelow={2} as="article">
        <StyledContentColumn
          basis={Boolean(props.children) ? '1/2' : 'fluid'}
          isSingleColumn={Boolean(props.children)}
          as="section">
          {props.children}
        </StyledContentColumn>
        {Boolean(props.code) && (
          <StyledCodeColumn basis="1/2" as="aside">
            {props.code}
          </StyledCodeColumn>
        )}
      </Columns>
    </StyledMainContent>
  </StyledContainer>
);
