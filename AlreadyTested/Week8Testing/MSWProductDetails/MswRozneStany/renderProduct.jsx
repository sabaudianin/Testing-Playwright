import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { ProductDetails } from "./ProductDetails";
import { productApi } from "./api";

export function renderProduct(productId) {
  const store = configureStore({
    reducer: {
      [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware),
  });

  render(
    <Provider store={store}>
      <ProductDetails productId={productId} />
    </Provider>
  );
}
