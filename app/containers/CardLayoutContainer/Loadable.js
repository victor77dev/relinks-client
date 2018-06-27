/**
 *
 * Asynchronously loads the component for CardLayoutContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
