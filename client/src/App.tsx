import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import { SignUp } from "./pages/SignUp/SignUp";
import { Login } from "./pages/Login/Login";
import MyPosts from "./pages/MyPosts/MyPosts";
import Author from "./pages/Author/Author";
import Favorites from "./pages/Favorites/Favorites";
import UserAccount from "./pages/UserAccount/UserAccount";
import useFetch from "./hooks/useFetch";
import getData from "./services/api/getData.api";
import currentUserSlice from "./store/currentUser";
import { useDispatch } from "react-redux";
import PrivateRoute from "./routes/PrivateRoute";
import ForgotPass from "./pages/ForgotPass/ForgorPass";
import NewPass from "./pages/NewPass/NewPass";

export default function App() {
  const dispatch = useDispatch();
  const { setUser } = currentUserSlice.actions;
  if (localStorage.getItem("token")) {
    getData(`${process.env.REACT_APP_ROOT_API}/user/get`).then((data) => {
      dispatch(setUser(data));
    });
  }

  return (
    <Router>
      <div className="main-container">
        <main className="main">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/newpass" element={<NewPass/>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/forgot" element={<ForgotPass />} />
            <Route
              path="/myposts"
              element={
                <PrivateRoute component={<MyPosts/>} />
              }
            />
            <Route
              path="/profile/:id"
              element={<Author />}
            />

            <Route
              path="/favorites"
              element={
                <PrivateRoute component={<Favorites/>} />
              }
            />

            <Route
              path="/:id"
              element={<PrivateRoute component={<UserAccount />} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
