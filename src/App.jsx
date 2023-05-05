import { useState } from "react";

function App() {
  const loginHandler = () => {
    console.log("I was clicked !!");
  };
  return (
    <>
      <div className="m-[20px]">
        <p className="text-3xl font-bold underline">Hello world !</p>
        <p className="hand-made-red">I am hand-made</p>
        <button onClick={loginHandler}>Login with SSO</button>
      </div>
    </>
  );
}

export default App;
