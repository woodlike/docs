/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui';
import { NavBarProps } from '.';
import { qt } from 'gatsby-theme-query';

const styledNavBar: SxStyleProp = {
  display: 'grid',
  gridColumnGap: ['none', `${qt('spaces')(5)}px`],
  gridRowGap: [`${qt('spaces')(4)}px`, 'none'],
  paddingLeft: 0,
  margin: 0,
};

const generateColumns = (n: number): SxStyleProp => {
  const config = `repeat(${n}, 1fr [nav-item])`;
  return {
    gridTemplateColumns: ['none', config],
    gridTemplateRows: [config, 'none'],
  };
};

const themedNavBar = (n: number): SxStyleProp => {
  return {
    ...styledNavBar,
    ...generateColumns(n),
  };
};

export const NavBar: React.FunctionComponent<NavBarProps> = props => (
  <ul sx={themedNavBar(props.itemCount)} data-testid="navigation-bar-test-id">
    {props.children}
  </ul>
);
