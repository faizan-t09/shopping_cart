import React from 'react';
import { Provider } from "react-redux";
import store from "../React-Redux/store";
import { BrowserRouter } from "react-router-dom";

export const TestProviders=(props:any) => {

  return(
    <BrowserRouter>
    <Provider store={store}>
      {props.children}
 </Provider>
 </BrowserRouter>
  )
}