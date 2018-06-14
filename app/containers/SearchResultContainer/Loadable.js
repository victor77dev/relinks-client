/**
 *
 * Asynchronously loads the component for SearchResultContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
