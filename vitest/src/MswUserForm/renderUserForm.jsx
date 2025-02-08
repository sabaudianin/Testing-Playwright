import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { UserForm } from "./UserForm";
import { api } from "./api";

export function renderUserForm(userId) {
  const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
  render(
    <Provider store={store}>
      <UserForm userId={userId} />
    </Provider>
  );
}
