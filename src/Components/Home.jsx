import { useState, useEffect } from "react";
import { Error } from "./Error";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOutUser } from "../Utilities/auth";

const Home = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
  });

  return (
    <div>
      {authenticated ? (
        <div className="flex justify-center align-middle flex-col m-5 p-7 items-center">
          <img
            alt="brand"
            src="https://acowale.com/wp-content/uploads/2021/01/Acowale-Logo-Blue.png"
            loading="lazy"
          />
          <h1 className="text-3xl font-extrabold text-center p-6 m-4">
            Welcome
            {user.email === null ? (user.email = "") : ""}{" "}
            {user.isAnonymous
              ? (user.displayName = `guest${user.uid[0]}`)
              : user.emailVerified === false
              ? (user.displayName = user.email.slice(
                  0,
                  user.email.indexOf("@")
                ))
              : (user.displayName = user.displayName)}{" "}
            you are logged in
          </h1>
          <button
            onClick={signOutUser}
            className="text-white w-min bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-bold rounded-lg text-xl px-5 py-2.5 text-center mr-2 mb-2"
          >
            Signout
          </button>
        </div>
      ) : (
        <Error errorcode={403} />
      )}
    </div>
  );
};

export default Home;
