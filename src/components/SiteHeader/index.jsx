import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getUserInfo,
  getIsConnected,
  logoutUser,
} from "../../features/user/userSlice";

function SiteHeader() {
  const isConnected = useSelector(getIsConnected);
  const userInfo = useSelector(getUserInfo);

  const dispatch = useDispatch();

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src="/img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          {isConnected ? (
            <>
              <Link className="main-nav-item" to="/profile">
                <i className="fa fa-user-circle"></i>
                &nbsp;{userInfo.userName}
              </Link>
              <button className="main-nav-item" onClick={() => dispatch(logoutUser())}>
                <i className="fa fa-sign-out"></i>
                &nbsp;Sign Out
              </button>
            </>
          ) : (
            <Link className="main-nav-item" to="/login">
              <i className="fa fa-user-circle"></i>
              &nbsp;Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export { SiteHeader };
