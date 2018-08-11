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
  const params = paperId.indexOf('temp') !== 0 ? { title, paperId } : { title };
  try {
    // Call addPaper api
    const addPaper = yield call(axios.get, `${apiUrl}/addPaper`, {
      params,
    });
    // Call PaperAdded
    yield put(paperAdded(paperId, addPaper.data));
    yield put(getLinksDetail(paperId));
    const currenetId = addPaper.data.paperId;
    if (currenetId === null) throw new Error('Fail to add paper');
    goToPath(`/paperLinks/${currenetId}`);
  } catch (err) {
    const errorMsg = { err: err.toString(), title };
    yield put(addPaperError(paperId, errorMsg));
  }
}

export default function* cardLayoutSaga() {
  yield takeLatest(UPDATE_PAPER_INFO, updatePaperInfo);
  yield takeLatest(ADD_PAPER, addPaperFromArxiv);
}
