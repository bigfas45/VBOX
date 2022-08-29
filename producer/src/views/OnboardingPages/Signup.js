import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Steps, Step } from "react-step-builder";

import SignupStep from "./SignupSteps/SignupStep";
import VerifyStep from "./SignupSteps/VerifyStep";
import AccountStep from "./SignupSteps/AccountStep";
import FinalStep from "./SignupSteps/FinalStep";

//import "./styles/Signup.scss";

const Signup = ({ history }) => {
  const [otpCode, setOtpCode] = useState("");
  console.log("OTPCODE", otpCode);
  return (
    <div className="wrapper">
      <div className="container d-flex">
        <Steps>
          <Step setOtpCode={setOtpCode} component={AccountStep} />
          <Step otpCode={otpCode} component={VerifyStep} />
          <Step component={FinalStep} />
        </Steps>
      </div>
    </div>
  );
};

export default Signup;
