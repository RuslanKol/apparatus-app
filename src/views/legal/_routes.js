import Legal from './Legal';
import LegalMagicLink from './LegalMagicLink';

export default [
  {
    type: 'public',
    path:
      '/legal/:page(privacy-policy|terms-of-service|business-agreement|dmca-policy|acceptable-use|use-of-cookies)',
    exact: true,
    public: true,
    component: Legal
  },
  {
    type: 'public',
    path: '/legal/terms-of-service/:code',
    component: LegalMagicLink,
    exact: true,
    public: true
  }
];
