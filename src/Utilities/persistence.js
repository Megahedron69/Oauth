import {
  getAuth,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";

export const persis = (state) => {
  const auth = getAuth();
  if (state === "local") {
    auth.setPersistence(browserLocalPersistence);
  } else if (state === "session") {
    auth.setPersistence(browserSessionPersistence);
  }
};
