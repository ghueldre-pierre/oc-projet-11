import { Link } from "react-router-dom";

function SiteHeader() {
  return (
    <header>
      <h1>ArgentBank</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}

export { SiteHeader };