import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import { getLinksLoading, getLinksLoaded, getLinksError } from 'containers/PaperLinksContainer/actions';
import { GET_LINK } from 'containers/PaperLinksContainer/constants';

// const config = require('../config.json')
const apiUrl = 'https://relinks.herokuapp.com';

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
    if (!paperLink.data || paperLink.data.error || paperLink.data.length === 0) {
      throw new Error('No paper data found');
    }
    yield put(getLinksLoaded(paperLink.data[0]));
  } catch (linkErr) {
    // Call getPaper api to see if data exist
    try {
      const paperDetail = yield call(axios.get, `${apiUrl}/getPaper`, {
        params: {
          id: paperId,
        },
      });
      yield put(getLinksLoaded({
        currentPaper: [paperDetail.data],
        next: [],
        nextPaper: [],
        previous: [],
        previousPaper: [],
      }));
    } catch (detailErr) {
      yield put(getLinksError(detailErr));
    }
  }
}

export default function* paperLinksSaga() {
  yield takeLatest(GET_LINK, getLinks);
}
