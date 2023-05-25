import { useState } from "react";
import useSessionStorage from "./useSessionStorage";

describe("useSessionStorage", () => {
  it.skip("useSessionStorage sets and gets values as expected", () => {
    const [userName, setUserName] = useSessionStorage("userName");
    setUserName("John smith");
    const [name] = useSessionStorage("userName");
    expect(name).toBe("John smith");
  });
});
