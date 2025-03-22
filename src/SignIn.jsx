import { Button } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { DNA } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSignIn = (e) => {
    e.preventDefault();
    setError("");
    axios
      .post("https://9a03-106-222-216-211.ngrok-free.app/api/auth/login", {
        username: userName,
        password,
      })
      .then(function (res) {
        console.log(res);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("username", res.data.data.username);
        setError("");
        navigate("/home", { replace: true });
      })
      .catch(function (error) {
        console.log(error);
        setError(true);
      });
  };

  const onGuestMode = () => {
    axios
      .post(
        "https://9a03-106-222-216-211.ngrok-free.app/api/auth/guest-login",
        {}
      )
      .then(function (res) {
        console.log(res);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("username", res.data.data.username);
        setError("");
        navigate("/home", { replace: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container mx-auto shadow-md">
        <div className="flex flex-col justify-center items-center h-screen">
          <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />

          <form onSubmit={onSignIn}>
            <div className="flex flex-col gap-3 bg-white p-8 rounded-lg shadow-2xl w-96">
              <h1 className="text-center font-bold">Sign In</h1>
              {error != "" && (
                <p className=" p-4 bg-red-300 rounded text-red-950">
                  {" "}
                  Invalid username or password
                </p>
              )}

              <div>
                <label>Username</label>
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  type="text"
                  placeholder="Enter username"
                  className="border border-gray-300 p-2 w-full mt-2 rounded-sm"
                />
              </div>
              <div>
                <label className="">Password</label>
                <div className="flex mt-2">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Enter password"
                    className="border border-gray-300 p-2 w-full rounded-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-sm p-1 mt-4 hover:cursor-pointer hover:opacity-80"
              >
                Sign In
              </button>
              <p className="text-center">
                Don&apos;t have an account?{" "}
                <Button
                  className="text-blue-600 underline hover:opacity-70 text-[15px] shadow-none"
                  onClick={onGuestMode}
                >
                  Guest mode
                </Button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
