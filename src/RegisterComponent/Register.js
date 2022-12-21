import React, { useRef } from "react";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Register() {
  const history = useHistory();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const repasswordRef = useRef(null);

  const register = (e) => {
    //inplemeting register functionality
    e.preventDefault();

    //only if the passwords match we register the accout and push credentials in readux store
    if (passwordRef.current.value === repasswordRef.current.value) {
      auth
        .createUserWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        )
        .then((authUser) => {
          console.log(authUser);
          history.replace({ pathname: "/main" });
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("password doesnt match");
    }
  };

  return (
    <div className="register">
      <div className="register_info">
        <img
          className="imagg"
          src="https://www.custompcreview.com/wp-content/uploads/2016/07/microsoft-logo.jpg"
          alt=""
        />
        <h2>Register your account</h2>
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
            <input
              className="inp"
              ref={repasswordRef}
              type="password"
              placeholder=" Re-Enter Password"
            />

            <button className="em_but" onClick={register}>
              Register{" "}
            </button>

            <div className="new_user">
              <h5>Already have an account?</h5>
              <Link className="link_1" to="/login">
                <p className="user_info">Login</p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
