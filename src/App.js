import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import Register from "./Register";
import Login from "./Login";
import PreLogin from "./PreLogin";
import Main from "./Main";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import Team from "./Team";
import Meet from "./Meet";
import "./App.css";
import Error from "./Error";
import Error2 from "./Error2";

let user;
function App() {
  user = useSelector(selectUser); //get the details of the user from the store
  const dispatch = useDispatch(); //used to dispatch a event into the store

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            //dispatch user info into the store
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Switch>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <PreLogin />
            </Route>
            <Route component={Error} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/main">
              <Main />
            </Route>
            <Route exact path="/team/teamId=:roomId">
              <Team />
            </Route>
            <Route exact path="/team/teamId=:roomId/meetingId=:meetingId/meet">
              <Meet />
            </Route>

            <Route component={Error2} />
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
