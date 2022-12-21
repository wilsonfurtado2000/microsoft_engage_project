import React, { useRef } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

function Login() {
  const dispatch = useDispatch();
  const emailRef = useRef(null); //to get the text written in the input useRef is used instead
  const passwordRef = useRef(null); //of getElementById

  const history = useHistory();

  //fire off when user signIn
  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(
        //firebase API to signIn
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((userAuth) => {
        dispatch(
          login({
            uid: userAuth.uid, //pushing user credentials in the store
            email: userAuth.email,
          })
        );

        history.replace({ pathname: "/main" }); //replace the page with "/main"
      })

      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="login">
      <div className="login_info">
        <img
          className="imagg"
          src="https://www.custompcreview.com/wp-content/uploads/2016/07/microsoft-logo.jpg"
          alt=""
        />
        <h2>Sign Into your account</h2>
        <form>
          <div className="inside_info">
            <input
              className="inp"
              ref={emailRef}
              type="email"
              placeholder="Email Address"
            />
            <input
              className="inp"
              ref={passwordRef}
              type="password"
              placeholder="Password"
            />
            <button className="em_but" onClick={signIn}>
              Sign In
            </button>

            <div className="new_user">
              <h5>No account?</h5>
              <Link className="link_1" to="/register">
                <p className="user_info">Create one!</p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
