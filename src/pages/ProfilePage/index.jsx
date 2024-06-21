import { useSelector } from "react-redux";
import { getUserInfo, tryChangeUserName } from "../../features/user/userSlice";
import { Form, useNavigation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { AppStore } from "../../app/store";

async function profileAction({ request }) {
  const formData = await request.formData();
  const userName = formData.get("userName");
  const response = await AppStore.dispatch(tryChangeUserName(userName));
  if (response.error) {
    return response.error.message;
  }
  return null;
}

function ProfilePage() {
  const navigation = useNavigation();
  const userInfo = useSelector(getUserInfo);
  const [showForm, setShowForm] = useState(false);
  const [updateState, setUpdateState] = useState("idle");
  const [formUserInfo, setFormUserInfo] = useState(userInfo);

  if(navigation.state !== updateState) {
    if(navigation.state === "submitting") {
      setUpdateState(navigation.state);
    }
    if(navigation.state === "idle") {
      // update happened
      setShowForm(false);
      setUpdateState(navigation.state)
    }
  }

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
      [name]: value,
    });
  }
  
  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {userInfo.userName}
        </h1>
        {showForm ? (
          <Form method="post" className="user-info-form">
            <div className="input-wrapper">
              <label htmlFor="userName">User Name:</label>
              <input
                type="text"
                name="userName"
                id="userName"
                value={formUserInfo.userName}
                onChange={(e) => onChangeHandle(e)}
                disabled={navigation.state === "submitting"}
              />
            </div>
            <div className="input-wrapper">
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
            <div className="input-wrapper">
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
            <div className="user-info-form__footer">
              <button 
                type="submit" 
                className="sign-in-button"
                disabled={navigation.state === "submitting"}
              >
                Save
              </button>
              <button
                type="button"
                className="sign-in-button"
                onClick={() => {
                  setInputAsUserInfo();
                  setShowForm(false);
                }}
                disabled={navigation.state === "submitting"}
              >
                Cancel
              </button>
            </div>
          </Form>
        ) : (
          <button className="edit-button" onClick={() => setShowForm(true)}>
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}

export { ProfilePage, profileAction };
