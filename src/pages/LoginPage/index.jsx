import { useDispatch } from "react-redux";
import { setIsConnected } from "../../features/user/userSlice";

function LoginPage() {
    const dispatch = useDispatch();
  return (
    <main>
        <h2>Please Login</h2>
        <button onClick={() => dispatch(setIsConnected(true))}>Login</button>
    </main>
  );
}

export { LoginPage };
