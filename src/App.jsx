import { Link } from "react-router-dom";

function App() {
  return (
    <div className="m-[60px]">
      <p>
        <Link to="sso">Log in with SSO</Link>
      </p>
    </div>
  );
}

export default App;
