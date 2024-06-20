import { useSelector } from "react-redux";
import { getUserInfo, tryChangeUserName } from "../../features/user/userSlice";
import { Form } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { AppStore } from "../../app/store";

async function profileAction({request}) {
    const formData = await request.formData();
    const userName = formData.get("userName");
    const response = await AppStore.dispatch(
        tryChangeUserName(userName)
    );
    console.log(response);
    if(response.error) {
        return response.error.message;
    }
    return null;
}

function ProfilePage() {
    const userInfo = useSelector(getUserInfo);
    const [formUserInfo, setFormUserInfo] = useState(userInfo);

    useEffect(() => {
        setInputAsUserInfo();
    }, [userInfo]);

    function setInputAsUserInfo() {
        const { userName, firstName, lastName } = userInfo;
        setFormUserInfo(userInfo);
    }

    function onChangeHandle(event) {
        const { name, value } = event.target;
        setFormUserInfo({
            ...formUserInfo,
            [name]: value
        });
    }

    return (
        <main>
            <h2>Profil de { userInfo.userName }</h2>
            <Form method="post">
                <div>
                    <label htmlFor="userName">User Name:</label>
                    <input 
                        type="text" 
                        name="userName" 
                        id="userName"
                        value={formUserInfo.userName}
                        onChange={(e) => onChangeHandle(e)}
                    />
                </div>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input 
                        type="text" 
                        name="firstName" 
                        id="firstName" 
                        value={formUserInfo.firstName}
                        onChange={(e) => onChangeHandle(e)}
                        disabled
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input 
                        type="text" 
                        name="lastName" 
                        id="lastName"
                        value={formUserInfo.lastName}
                        onChange={(e) => onChangeHandle(e)}
                        disabled
                    />
                </div>
                <div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setInputAsUserInfo()}>Cancel</button>
                </div>
            </Form>
        </main>
    );
}

export { ProfilePage, profileAction };