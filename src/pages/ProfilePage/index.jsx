import { useSelector } from "react-redux";
import { getUserInfo } from "../../features/user/userSlice";

function ProfilePage() {
    const userInfo = useSelector(getUserInfo);

    return (
        <main>
            <h2>Profil de { userInfo.userName }</h2>
        </main>
    );
}

export { ProfilePage };