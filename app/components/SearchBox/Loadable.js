/**
 *
 * Asynchronously loads the component for SearchBox
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
