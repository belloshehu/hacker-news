import { useState } from "react";
import "./Auth.scss";
import { AuthType } from "./types";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { SignupForm } from "../../components/SignupForm/SignupForm";

export const Auth = () => {
  const [authType, setAuthType] = useState<AuthType>({
    title: "Login",
  });

  // set fields to be displayed on the Auth form
  const handleAuthTypeSwitch = () => {
    if (authType.title === "Login") {
      setAuthType({
        title: "Sign up",
      });
    } else {
      setAuthType({
        title: "Login",
      });
    }
  };
  return (
    <div className="auth">
      <div className="auth__control">
        <h2>{authType.title}</h2>
        <button className="btn" onClick={handleAuthTypeSwitch}>
          Switch to {authType.title !== "Login" ? "Login" : "Sign up"}
        </button>
      </div>
      {authType.title === "Login" ? <LoginForm /> : <SignupForm />}
    </div>
  );
};
