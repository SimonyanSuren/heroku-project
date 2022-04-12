import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";

import "./Header.css";

import * as icons from "../../assets/icon";
import DropDown from "../../components/shared/DropDown/DropDown";
import Avatar from "../../components/shared/Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import currentUserSlice, { currentUserSel } from "../../store/currentUser";
import { navItems } from "../../constants/navbarItems.constant";

const Header: FunctionComponent = () => {
  const [dropDownOpen, setLoginDropDownOpen] = useState(false);
  const dispatch = useDispatch();
  const { setUser } = currentUserSlice.actions;
  const [selected, setSelected] = useState([false, false, false, false]);

  const toggleDropDown = () => {
    setLoginDropDownOpen(!dropDownOpen);
  };

  const user = useSelector(currentUserSel.currentUserSelector);

  const handleSelected = (id: number) => () => {
    const items = Array(selected.length).fill(false);
    items[id] = true;
    setSelected(items);
  };

  const hanldeLogout = () => {
    dispatch(setUser(null));
    localStorage.removeItem("token");
  };

  return (
    <header className="main-header">
      <nav className="main-nav">
        <Link to="/">
          <div className="logo">{icons.logo()}</div>
        </Link>
        <form
          className={user ? "search-form-primary" : "search-form-secondary"}
          action=""
        >
          <div className="search-from__icon">{icons.search()}</div>
          <input
            type="text"
            name=""
            id=""
            className="search-form__input"
            placeholder="Search"
          />
        </form>
        <ul className="main-nav__primary-items">
          {user ? (
            <>
              {navItems.map((item, index) => (
                <li
                  className={`main-nav__primary-item ${
                    selected[index + 1] && "main-nav__primary-item--selected"
                  }`}
                  onClick={handleSelected(index + 1)}
                >
                  <Link to={item.path}>
                    <span className="header-icon">{icons[item.icon]()} </span>
                    <span>{item.description}</span>
                  </Link>
                </li>
              ))}
              <li
                className="main-nav__primary-item user-account"
                onClick={toggleDropDown}
              >
                <Avatar width="30px" height="30px" />
                <span>Me</span>
                <DropDown open={dropDownOpen} width="150px" height="100px">
                  <Link to={`/${user.name}`}>
                    <div className="account">
                      <Avatar width="60px" height="60px" />
                      <p className="account-username">{user.name}</p>
                    </div>
                  </Link>
                  <div className="logout-btn">
                    <button className="btn-secondary" onClick={hanldeLogout}>
                      Log out
                    </button>
                  </div>
                </DropDown>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <button className="btn-secondary header-signin-btn">
                    Sign in
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
