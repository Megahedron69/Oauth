import { useState } from "react";
import OtpInput from "react18-input-otp";
import { onSubmitOtp } from "../../Utilities/auth";

const OTP = ({ phoneNum }) => {
  const [Otp, setOtp] = useState("");

  const getMaskedNumber = (string) => {
    string = phoneNum;
    const endDigits = string.slice(-4);
    return endDigits.padStart(string.length, "*");
  };

  return (
    <div>
      <form
        className=" h-64 py-3 rounded text-center"
        onSubmit={(e, mtp) => {
          mtp = Otp;
          onSubmitOtp(e, mtp);
        }}
      >
        <h1 className="text-3xl font-bold">OTP Verification</h1>
        <div className="flex flex-col mt-4">
          <span className="text-lg font-semibold">
            Enter the OTP you received at
          </span>
          <span className="font-bold">{getMaskedNumber()}</span>
        </div>
        <div className="flex flex-row justify-center text-center px-2 mt-5">
          <OtpInput
            onChange={(otp) => {
              setOtp(otp);
            }}
            numInputs={6}
            value={Otp}
            placeholder={"hXz4mL"}
            isInputNum={true}
            shouldAutoFocus={true}
            separator={
              <span>
                <p style={{ margin: "10px" }}>
                  <strong className="font-extrabold">-</strong>
                </p>
              </span>
            }
            inputStyle={{
              width: "39px",
              height: "40px",
              border: "2px solid black",
              borderRadius: "6px",
              fontSize: "1.3rem",
              fontStyle: "bold",
            }}
            focusStyle={{
              border: "2px solid #1c64f2",
            }}
            isInputSecure={true}
          />
        </div>
        <div className="flex justify-center text-center mt-5">
          <button className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
            <span className="font-bold">Resend OTP</span>
            <i className="bx bx-caret-right ml-1"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTP;
