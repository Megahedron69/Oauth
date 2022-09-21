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
  sendPasswordResetEmail,
} from "firebase/auth";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

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
          alertify
            .alert(
              `Error: ${errorCode}.
              \n${3 - i} tries reamaning `
            )
            .setting({
              label: "Close",
              onok: function () {
                alertify.error("Retry login");
              },
            })
            .show()
            .set("frameless", true);
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
      alertify.error(`Login Failed:${errorCode}`);
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
      alertify.error(`Login Failed:${errorCode}`);
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
      alertify.error(`Login Failed:${errorCode}`);
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
      alertify.error(`Login Failed:${errorCode}`);
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
      alertify.error(`Login Failed:${errorCode}`);
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
      alertify.error(`Login Failed:${errorCode}`);
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
      alertify.error("Unable to signout please try again later");
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
  let appVerifier = window.recaptchaVerifier;
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      window.confirmationResult = confirmationResult;
      alertify.success("OTP is sent");
    })
    .catch(function (error) {
      alertify.error(`${error}`);
    });
};

export const onSubmitOtp = (ote) => {
  let opt_number = `${ote}`;
  window.confirmationResult
    .confirm(opt_number)
    .then((confirmationResult) => {
      window.open("/home", "_self");
    })
    .catch((error) => {
      alertify.error(`${error.message}\nPlease re-enter the correct OTP`);
    });
};

export const ResendOtp = (e, phne) => {
  e.preventDefault();
  const auth = getAuth();
  const phoneNumber = `+${phne}`;
  let appVerifier = window.recaptchaVerifier;
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      window.confirmationResult = confirmationResult;
      alertify.success("OTP is sent");
    })
    .catch(function (error) {
      alertify.error(`${error}`);
    });
};

export const resetPass = (e) => {
  e.preventDefault();
  const auth = getAuth();
  const filter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const resetEmail = alertify
    .prompt("Enter Your Email")
    .set({
      modal: true,
      transition: "fade",
      invokeOnCloseOff: true,
      type: "email",
      onok: () => {
        let emaile = resetEmail.settings.value;
        if (!filter.test(emaile)) {
          alertify.error("Please Enter a valid email");
        } else {
          sendPasswordResetEmail(auth, emaile)
            .then(() => {
              alertify.success("Reset link sent to email");
            })
            .catch((error) => {
              alertify.error(`${error}.Try again later`);
            });
        }
      },
      oncancel: () => {
        alertify.error("Password reset cancelled");
        resetEmail.settings.value = "";
      },
    })
    .show();
};
