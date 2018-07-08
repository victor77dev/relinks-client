import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import { searchLoaded, searchError, searchLoadedFromArxiv, searchErrorFromArxiv } from 'containers/SearchBoxContainer/actions';
import { SEARCH_PAPER, SEARCH_ARXIV_PAPER } from 'containers/SearchBoxContainer/constants';

// const config = require('../config.json')
const apiUrl = 'http://localhost:4000';

export function* searchPaper(action) {
  const text = action.text;
  try {
    // Call searchPaper api
    const search = yield call(axios.get, `${apiUrl}/searchPaper`, {
      params: {
        search: text,
      },
    });
    // Put return value to searchResult
    yield put(searchLoaded(search.data));
  } catch (err) {
    yield put(searchError(err));
  }
}

export function* searchPaperFromArxiv(action) {
  const text = action.text;
  try {
    // Call searchPaper api
    const search = yield call(axios.get, `${apiUrl}/getPaperInfoFromArxiv`, {
      params: {
        title: text,
      },
    });
    // Put return value to searchResult
    yield put(searchLoadedFromArxiv(search.data));
  } catch (err) {
    yield put(searchErrorFromArxiv(err));
  }
}

export default function* searchBoxSaga() {
  yield takeLatest(SEARCH_PAPER, searchPaper);
  yield takeLatest(SEARCH_ARXIV_PAPER, searchPaperFromArxiv);
}
