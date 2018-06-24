/**
 *
 * Asynchronously loads the component for PaperLinksContainer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
