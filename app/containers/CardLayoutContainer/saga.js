import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import { UPDATE_PAPER_INFO, ADD_PAPER } from 'containers/CardLayoutContainer/constants';
import { updateLoaded, updateError, paperAdded, addPaperError, stopEdit } from 'containers/CardLayoutContainer/actions';
import { getLinksDetail } from 'containers/PaperLinksContainer/actions';

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

export function* addPaperFromArxiv(action) {
  const { title, paperId, goToPath } = action;
  try {
    // Call addPaper api
    const addPaper = yield call(axios.get, `${apiUrl}/addPaper`, {
      params: {
        title,
        paperId,
      },
    });
    // Call PaperAdded
    yield put(paperAdded(paperId, addPaper.data));
    yield put(getLinksDetail(paperId));
    goToPath(`/paperLinks/${paperId}`);
  } catch (err) {
    yield put(addPaperError(paperId, err));
  }
}

export default function* cardLayoutSaga() {
  yield takeLatest(UPDATE_PAPER_INFO, updatePaperInfo);
  yield takeLatest(ADD_PAPER, addPaperFromArxiv);
}
