import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <main className="main">
            <h2>The page you requested was not found. Sorry.</h2>
            <Link to="/" replace>Go back home</Link>
        </main>
    )
}

export { NotFoundPage };