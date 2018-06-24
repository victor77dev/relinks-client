import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import { getLinksLoading, getLinksLoaded, getLinksError } from 'containers/PaperLinksContainer/actions';
import { GET_LINK } from 'containers/PaperLinksContainer/constants';

// const config = require('../config.json')
const apiUrl = 'http://localhost:4000';

export function* getLinks(action) {
  yield put(getLinksLoading());
  const paperId = action.paperId;
  try {
    // Call getLinkDetails api
    const paperLink = yield call(axios.get, `${apiUrl}/getLinkDetails`, {
      params: {
        id: paperId,
      },
    });
    // Put return value to getLinkDetails
    if (!paperLink.data || paperLink.data.length === 0) {
      throw new Error('No paper data found');
    }
    yield put(getLinksLoaded(paperLink.data[0]));
  } catch (err) {
    yield put(getLinksError(err));
  }
}

export default function* paperLinksSaga() {
  yield takeLatest(GET_LINK, getLinks);
}
