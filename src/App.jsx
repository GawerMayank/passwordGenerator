import { useState, useCallback, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) str += "0123456789";
    if (characters) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbers, characters, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    toast("🦄 Copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, characters, passwordGenerator]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="pass w-1/2 max-h-dvh rounded border border-zinc-950">
          <div className="flex justify-center items-center">
            <h1 className="text-3xl text-center font-semibold py-2">
              Password Generator
            </h1>
            <img src="/lock.svg" alt="" />
          </div>
          <div className="flex justify-around space-x-5 my-2">
            <input
              className="rounded border border-orange-900"
              type="text"
              placeholder="Password"
              readOnly
              value={password}
              ref={passwordRef}
            />
            <button
              onClick={copyPassword}
              className="bg-orange-900 rounded-md w-14 px-1 cursor-pointer text-orange-200"
            >
              Copy
            </button>
          </div>
          <div className="flex justify-center items-center space-x-2 my-5">
            <input
              type="range"
              min={8}
              max={50}
              defaultValue={8}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
            <input
              className="cursor-pointer"
              type="checkbox"
              onChange={() => {
                setNumbers((prev) => !prev);
              }}
            />
            <label>Numbers</label>
            <input
              type="checkbox"
              className="cursor-pointer"
              onChange={() => {
                setCharacters((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
