import { Form, redirect, useActionData } from "react-router-dom";
import { AppStore } from "../../app/store";
import { tryConnectUser } from "../../features/user/userSlice";
import { useNavigation } from "react-router-dom";

async function loginAction({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const persist = Boolean(formData.get("persist"));

  const response = await AppStore.dispatch(
    tryConnectUser({ email, password, persist })
  );
  
  console.log("response", response);

  if (response.error) {
    return response.error.message;
  }

  return redirect("/profile");
}

function LoginPage() {
  const navigation = useNavigation();
  const errorMessage = useActionData();

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <p
          className={`login-error-message ${errorMessage ? "show" : "hide"}`}
          aria-live="assertive"
        >
          {errorMessage}
        </p>
        <Form method="post" replace>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" required autoComplete="off" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required autoComplete="current-password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" name="persist" id="persist" />
            <label htmlFor="persist">Remember me</label>
          </div>
          <button className="sign-in-button">Sign In</button>
        </Form>
      </section>
    </main>
  );
}

export { loginAction, LoginPage };
