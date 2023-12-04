"use client";

import { Provider } from "react-redux";
import { store } from "./store/store";
import AuthInitializer from "./AuthInitializer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ProviderProp = {
  children: React.ReactNode;
};

export function Providers({ children }: ProviderProp) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Provider>
  );
}
