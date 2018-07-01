import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import { UPDATE_PAPER_INFO } from 'containers/CardLayoutContainer/constants';
import { updateLoaded, updateError, stopEdit } from 'containers/CardLayoutContainer/actions';

// const config = require('../config.json')
const apiUrl = 'http://localhost:4000';

export function* updatePaperInfo(action) {
  const { paperId, paperInfo } = action;
  try {
    // Call updatePaper api
    const update = yield call(axios.get, `${apiUrl}/updatePaper`, {
      params: {
        paperId,
        paperInfo: JSON.stringify(paperInfo),
      },
    });
    // Call updateLoaded
    yield put(updateLoaded(update.data));
    yield put(stopEdit());
  } catch (err) {
    yield put(updateError(err));
  }
}

export default function* cardLayoutSaga() {
  yield takeLatest(UPDATE_PAPER_INFO, updatePaperInfo);
}
