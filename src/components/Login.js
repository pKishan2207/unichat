import React, { useState } from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import "firebase/auth";

import { auth } from "../firebase";
import firebase from "firebase/app";

const Login = () => {
  // const alert = useAlert();
  const [facebookSignin, setFacebookSignin] = useState(true);

  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome To Unichat!</h2>
        <div
          className="login-button google"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
          }
        >
          <GoogleOutlined /> Sign In with Google
        </div>
        <br /> <br />
        <div
          className="login-button facebook"
          onClick={() => {
            if (!facebookSignin) return;
            alert(" Work in Progress... \n Please try Google Sign in");
            setFacebookSignin(false);
          }}
          style={
            !facebookSignin
              ? { cursor: "default", backgroundColor: "#ca0d0d" }
              : {}
          }
          // onClick={() =>
          //   auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
          // }
        >
          <FacebookOutlined /> Sign In with Facebook
        </div>
      </div>
    </div>
  );
};

export default Login;
