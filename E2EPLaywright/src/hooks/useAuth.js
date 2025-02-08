import axios from "axios";
import { isEmpty } from "lodash-es";
import { useSnapshot } from "valtio";
import { proxyWithComputed } from "valtio/utils";

function getAuthUser() {
  const jwt = window.localStorage.getItem("jwtToken");

  if (!jwt) {
    return {};
  }

  return JSON.parse(atob(jwt));
}

const state = proxyWithComputed(
  {
    authUser: getAuthUser(),
  },
  {
    isAuth: (snap) => !isEmpty(snap.authUser),
  }
);

const actions = {
  login: (user) => {
    const jwtToken = btoa(JSON.stringify(state.authUser));

    state.authUser = user;
    localStorage.setItem("jwtToken", jwtToken);

    axios.defaults.headers.common[
      "Authorization"
    ] = `Token ${state.authUser.token}`;
  },
  logout: (queryClient) => {
    state.authUser = {};

    window.localStorage.removeItem("jwtToken");
    if (queryClient) {
      queryClient.clear();
      location.reload(true);
    }
  },
};

export function useAuth() {
  const snap = useSnapshot(state);
  if (
    !axios.defaults.headers.common["Authorization"] &&
    Boolean(snap.authUser.token)
  ) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Token ${snap.authUser.token}`;
  }

  return {
    ...snap,
    ...actions,
  };
}
