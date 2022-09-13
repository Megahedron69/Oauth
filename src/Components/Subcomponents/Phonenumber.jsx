import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { onSignInSubmit } from "../../Utilities/auth";
import OTP from "./OTP";

const Phonenumber = () => {
  const [phone, setPhone] = useState("");
  const [countryCode, setcountryCode] = useState("");
  const [cover, setCover] = useState(true);

  useEffect(() => {
    const getIP = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const ip = await response.json();
        setcountryCode(ip.country_code);
      } catch {
        setcountryCode("fr");
      }
    };
    getIP();
  }, []);

  return (
    <div>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={(e, phonez) => {
          phonez = phone;
          onSignInSubmit(e, phonez);
        }}
      >
        <div id="recaptcha-container"></div>
        <h1 className="text-2xl font-bold m-4 ">
          Please enter your phone number to proceed
        </h1>
        <div className="m-4">
          <PhoneInput
            value={phone}
            onChange={(phn) => {
              setPhone(phn);
            }}
            country={countryCode.toLowerCase()}
            preferredCountries={["fr", "au", "in", "us"]}
            containerClass={
              "border-0 border-black h-auto rounded-sm shadow-sm outline-0"
            }
            inputClass={"w-auto p-4 m-4 text-black"}
          />
        </div>
        <div>
          {phone.length < 11 && cover ? (
            <button
              type="button"
              className="m-4 px-7 py-3 text-white bg-blue-400 dark:bg-blue-600 cursor-not-allowed font-medium rounded-lg text-sm text-center"
              disabled=""
            >
              Request OTP
            </button>
          ) : (
            <button
              onClick={() => {
                setCover(false);
              }}
              disabled={!cover ? true : false}
              className="m-4  px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Request OTP
            </button>
          )}
        </div>
      </form>
      {!cover ? <OTP phoneNum={phone} /> : ""}
    </div>
  );
};

export default Phonenumber;
