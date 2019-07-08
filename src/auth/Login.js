import React from 'react';
import LoginMobile from './LoginMobile';
import LoginDesktop from './LoginDesktop';
import { checkIfDevice } from '../utils/helpers/device';

export default props =>
  !checkIfDevice(navigator) ? <LoginDesktop {...props} /> : <LoginMobile {...props} />;
