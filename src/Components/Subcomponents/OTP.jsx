import { useState } from "react";
import OtpInput from "react18-input-otp";
import { onSubmitOtp } from "../../Utilities/auth";
import Countdown from "react-countdown";
import { ResendOtp } from "../../Utilities/auth";

const OTP = ({ phoneNum }) => {
  const otpTimer = 120000;
  const [startTimer, setstartTimer] = useState(true);
  const [Otp, setOtp] = useState("");

  const getMaskedNumber = (string) => {
    string = phoneNum;
    const endDigits = string.slice(-4);
    return endDigits.padStart(string.length, "*");
  };

  const renderer = ({ minutes, seconds }) => {
    return (
      <span>
        {minutes}:{seconds} seconds
      </span>
    );
  };

  return (
    <div>
      <form className=" h-64 py-3 rounded text-center">
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
            isInputSecure={false}
            onSubmit={(mtp) => {
              mtp = Otp;
              onSubmitOtp(mtp);
            }}
          />
        </div>
        <div className="flex justify-center text-center mt-5">
          {startTimer ? (
            <span className="font-bold text-gray-400 cursor-not-allowed">
              Resend OTP in{" "}
              <Countdown
                date={Date.now() + otpTimer}
                renderer={renderer}
                onComplete={(prev) => {
                  setstartTimer(!prev);
                }}
              />
            </span>
          ) : (
            <span
              onClick={(e, phonez) => {
                phonez = phoneNum;
                ResendOtp(e, phonez);
                setstartTimer(true);
              }}
              className="font-bold text-green-400 cursor-pointer"
            >
              Resend OTP
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default OTP;
