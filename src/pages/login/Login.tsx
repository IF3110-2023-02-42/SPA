import loginCharacter from "../../assets/3d-login.webp";
import loginBg from "../../assets/login-bg.png";

const Login = () => {
  return (
    <div className="flex flex-row justify-center items-center w-full h-screen">
      <div className="hidden lg:block w-full bg-creamBg h-full relative overflow-hidden">
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
      <div className="flex flex-col w-full bg-white h-full"></div>
    </div>
  );
};

export default Login;
