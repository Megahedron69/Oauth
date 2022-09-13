import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  TwitterAuthProvider,
  signInAnonymously,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

let i = 0;
export const signins = (email, password) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location = "/home";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const increase = () => {
        i++;
        if (i > 3) {
          const name = prompt("Please enter `Acowale` to proceed");
          if (name === "Acowale") {
            i = 0;
          } else {
            alert("Comply to proceed");
          }
        } else {
          alert(
            `Error: ${errorCode}.\nIncorrect try ${i}.\n${
              3 - i
            } tries reamaning `
          );
        }
      };
      increase();
    });
};

export const signingoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      window.location = "/home";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      alert(`Error: ${errorCode}:${errorMessage}`);
    });
};

export const signingithub = () => {
  const provider = new GithubAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      window.location = "/home";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GithubAuthProvider.credentialFromError(error);
      alert(`Error: ${errorCode}:${errorMessage}`);
    });
};

export const signupwithemail = (emailz, passwordz) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, emailz, passwordz)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location = "/home";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error: ${errorCode}:${errorMessage}`);
    });
};

export const signinwithyahoo = () => {
  const auth = getAuth();
  const provider = new OAuthProvider("yahoo.com");
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = OAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      const idToken = credential.idToken;
      window.location = "/home";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error: ${errorCode}:${errorMessage}`);
    });
};

export const signinwithtwitter = () => {
  const auth = getAuth();
  const provider = new TwitterAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = TwitterAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const secret = credential.secret;
      const user = result.user;
      window.location = "/home";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = TwitterAuthProvider.credentialFromError(error);
      alert(`Error: ${errorCode}:${errorMessage}`);
    });
};

export const signinanon = () => {
  const auth = getAuth();
  signInAnonymously(auth)
    .then(() => {
      window.location = "/home";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error: ${errorCode}:${errorMessage}`);
    });
};

export const signOutUser = () => {
  const auth = getAuth();
  auth
    .signOut(auth)
    .then(function () {
      window.location = "/login";
    })
    .catch(function (error) {
      alert("Unable to signout please try again later");
    });
};

const setUpRecaptcha = () => {
  const auth = getAuth();
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
      callback: (response) => {
        onSignInSubmit();
      },
    },
    auth
  );
};

export const onSignInSubmit = (e, phn) => {
  const auth = getAuth();
  e.preventDefault();
  setUpRecaptcha();
  let phoneNumber = `+${phn}`;
  console.log(phoneNumber);
  let appVerifier = window.recaptchaVerifier;
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      window.confirmationResult = confirmationResult;
      alert("OTP is sent");
    })
    .catch(function (error) {
      alert(error);
    });
};

export const onSubmitOtp = (e, ote) => {
  e.preventDefault();
  let opt_number = `${ote}`;
  window.confirmationResult
    .confirm(opt_number)
    .then((confirmationResult) => {
      window.open("/home", "_self");
    })
    .catch((error) => {
      alert(`${error.message}\nPlease re-enter the correct OTP`);
    });
};
