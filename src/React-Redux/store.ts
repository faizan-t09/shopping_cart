import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware  from "redux-saga";

import rootReducer from "./rootReducer";
import { useDispatch } from 'react-redux';
import rootSaga from "./rootSaga";

const saga = createSagaMiddleware()

const store = configureStore(
  {
    reducer: rootReducer,
    middleware : [saga]
  }
);

saga.run(rootSaga)

export const useAppDispatch = useDispatch<typeof store.dispatch>;

export default store;
