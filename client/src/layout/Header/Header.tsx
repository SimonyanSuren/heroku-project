import { FunctionComponent, MutableRefObject, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Header.css";

import * as icons from "../../assets/icon";
import Avatar from "../../components/shared/Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import currentUserSlice, { currentUserSel } from "../../store/currentUser";
import NavBar from "../../components/NavBar/NavBar";
import useOutsideClick from "../../hooks/useOutsideClick";

const Header: FunctionComponent<any> = ({
  handleSearchValue,
}: {
  handleSearchValue: any;
}) => {
  const dropdownRef: MutableRefObject<null | HTMLLIElement> = useRef(null);
  const [dropDownOpen, setLoginDropDownOpen] = useOutsideClick(
    false,
    dropdownRef
  );

  const dispatch = useDispatch();
  const { setUser } = currentUserSlice.actions;
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const toggleDropDown = () => {
    setLoginDropDownOpen(!dropDownOpen);
  };
  
  const user = useSelector(currentUserSel.currentUserSelector);

  const hanldeLogout = () => {
    dispatch(setUser(null));
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const hanldeSubmit = (e: any) => {
    e.preventDefault();
    setSearchValue("");
    handleSearchValue(searchValue);
  };

  const handleReload = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="main-header">
      <nav className="main-nav">
        <div className="logo" onClick={handleReload}>
          <Link to="/">{icons.logo()}</Link>
        </div>
        <div className="header-avatar">
          <Link to={`/${user?.name}`}>
            <Avatar width="35px" height="35px" />
          </Link>
        </div>
        <form
          onSubmit={hanldeSubmit}
          className={user ? "search-form-primary" : "search-form-secondary"}
          action=""
        >
          <div className="search-from__icon">{icons.search()}</div>
          <input
            type="text"
            className="search-form__input"
            placeholder="Search"
            value={searchValue}
            onChange={handleChange}
          />
        </form>
        <ul className="main-nav__primary-items">
          {user ? (
            <>
              <NavBar />
              <li
              ref={dropdownRef}
                className="main-nav__primary-item user-account"
                onClick={toggleDropDown}
              >
                <Avatar width="30px" height="30px" />
                <span>Me</span>
                <aside
                  className={`acc-view ` + (dropDownOpen ? "" : "d-none")}
                >
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
                </aside>
              </li>
              <li className="main-nav__primary-item logout-btn-mobile">
                <div>
                  <button className="btn-secondary" onClick={hanldeLogout}>
                    Log out
                  </button>
                </div>
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
