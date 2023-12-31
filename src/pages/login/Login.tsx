import toast from "react-hot-toast";
import loginCharacter from "../../assets/3d-login.webp";
import loginBg from "../../assets/login-bg.png";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { getDecodedJwt } from "../../utils/jwt";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const decodedJwt = getDecodedJwt();
  useEffect(() => {
    if (decodedJwt) {
      toast.error("Already logged in");
      navigate("/");
    }
  }, [decodedJwt, navigate]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    api
      .post("/user/login", data)
      .then((res) => {
        console.log(res);
        toast.success("Login succesful");
        sessionStorage.setItem("accessToken", res.data.data.accessToken);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.data);
      });
  };

  return (
    <div className="flex flex-row justify-center items-center w-full h-screen font-poppins">
      <div className="hidden lg:block w-full bg-purpleBg h-full relative overflow-hidden">
        <img
          src={loginCharacter}
          alt="Character"
          className="w-[80%] h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[2]"
        />
        <img
          src={loginBg}
          alt="Character"
          className="w-[90%] h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1]"
        />
      </div>

      <div className="flex flex-col justify-center items-center w-full bg-white h-full p-4">
        <form
          method="POST"
          onSubmit={submitForm}
          className="flex flex-col justify-center items-center w-full max-w-[480px] gap-2"
        >
          <div className="flex flex-col justify-center items-start w-full gap-1">
            <label className=" text-gray-800">Username</label>
            <input
              className="w-full rounded-md outline-none border-[2px] p-2 border-gray-400 focus:border-purpleBg transition-all"
              placeholder="input username"
              id="username"
              type="text"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col justify-center items-start w-full gap-1">
            <label className=" text-gray-800 ">Password</label>
            <input
              className="w-full rounded-md outline-none border-[2px] p-2 border-gray-400 focus:border-purpleBg transition-all"
              placeholder="input password"
              id="password"
              type="password"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full py-2">
            <button
              type="submit"
              className="bg-purpleBg text-white w-full py-2 px-6 rounded-md font-semibold hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
