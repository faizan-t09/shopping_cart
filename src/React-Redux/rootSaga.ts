import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { itemActions } from "./itemReducer";
import { cartActions } from "./cartReducer";

function* fetchItems(): any {
  try {
    const response = yield call(
      fetch,
      `${process.env.REACT_APP_MY_API_BASE_URL}/product/getAll`
    );
    const items = yield response.json();
    yield put(itemActions.initializeItems(items));
  } catch (err) {
    toast("Failed to fetch items");
  }
}

function* fetchCart(): any {
  try {
    const response = yield call(
      fetch,
      `${process.env.REACT_APP_MY_API_BASE_URL}/cart`
    );
    const cart = yield response.json();
    yield put(cartActions.initializeCart(cart));
  } catch (err) {
    toast("Failed to fetch cart");
  }
}

function* rootSaga() {
  yield takeLatest("itemSlice/fetchItems", fetchItems);
  yield takeLatest("cartSlice/fetchCart", fetchCart);
}

export default rootSaga;
