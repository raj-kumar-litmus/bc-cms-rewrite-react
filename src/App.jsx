import { Link } from "react-router-dom";

function App() {
  const env = process.env.NODE_ENV;
  return (
    <div className="m-[40px]">
      <p>
        <Link to="sso">Log in with SSO</Link>
        <p>Environment: ${env}</p>
      </p>
    </div>
  );
}

export default App;
