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
      // alert(`Error: ${errorCode}:${errorMessage}`);
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
      alert("Catastrophical failure occured");
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
      console.log("success");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GithubAuthProvider.credentialFromError(error);
      console.log(errorMessage);
      alert("Error! Please try again");
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
      alert("Incorrect user details entered");
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
      console.log(errorMessage);
      alert("Error! Please try again");
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
      console.log(errorMessage);
      alert("Error! Please try again");
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
      console.log(errorMessage);
      alert("Error! Please try again");
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
// export const signinwithnumber = () => {
//   const auth = getAuth();
//   window.recaptchaVerifier = new RecaptchaVerifier(
//     "sign-in-button",
//     {
//       size: "invisible",
//       callback: (response) => {
//         // reCAPTCHA solved, allow signInWithPhoneNumber.
//         onSignInSubmit();
//       },
//     },
//     auth
//   );
//   const phoneNumber = getPhoneNumberFromUserInput();
//   const appVerifier = window.recaptchaVerifier;
//   signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//     .then((confirmationResult) => {
//       // SMS sent. Prompt user to type the code from the message, then sign the
//       // user in with confirmationResult.confirm(code).
//       window.confirmationResult = confirmationResult;
//       // ...
//     })
//     .catch((error) => {
//       // Error; SMS not sent
//       // ...
//     });
// };
