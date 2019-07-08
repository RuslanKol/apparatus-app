import { css } from 'react-emotion';
import variables from 'assets/sass/partials/_variables.scss';

export const Scrollbar = css`
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${variables.scrollbarGray};
    border-radius: 15px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 15px;
  }
`;
