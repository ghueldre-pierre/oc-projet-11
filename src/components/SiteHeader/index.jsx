import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserInfo, getIsConnected, logoutUser } from "../../features/user/userSlice";
import { useEffect } from "react";

function SiteHeader() {
  const dispatch = useDispatch();
  const isConnected = useSelector(getIsConnected);
  const userInfo = useSelector(getUserInfo);

  useEffect(() => {
    console.log("isConnected", isConnected);
  })

  return (
    <header>
      <h1>ArgentBank</h1>
      <nav>
        <Link to="/">Home</Link>
        {isConnected
          ? (
            <>
              <span>{userInfo.userName}</span>
              <button onClick={() => dispatch(logoutUser())}>Logout</button>
            </>
          )
          : <Link to="/login">Login</Link>
        }
      </nav>
    </header>
  );
}

export { SiteHeader };