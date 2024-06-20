import { Form, redirect, useActionData } from "react-router-dom";
import { AppStore } from "../../app/store";
import { tryConnectUser } from "../../features/user/userSlice";

async function loginAction({ request }) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const persist = Boolean(formData.get("persist"));
    const response = await AppStore.dispatch(
        tryConnectUser({ email, password, persist })
    );
    console.log("response", response);
    if(response?.error) {
        return response.error.message;
    }
    return redirect("/profile");
}

function LoginPage() {
    const errorMessage = useActionData();
  return (
    <main>
        <h2>Please Login</h2>
        <p className={`login-error-message ${errorMessage ? "show" : "hide"}`} aria-live="assertive">{errorMessage}</p>
        <Form method="post" replace>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" required />
            </div>
            <div>
                <label htmlFor="persist">Remember me</label>
                <input type="checkbox" name="persist" id="persist" />
            </div>
            <button type="submit">Login</button>
        </Form>
    </main>
  );
}

export { loginAction, LoginPage };