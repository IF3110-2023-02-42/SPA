import NavbarAdmin from "../../components/NavbarAdmin";
import profileImage from "../../assets/profile.jpg";
import { FaCheck } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const Home = () => {
  return (
    <div className="bg-creamBg z-1 min-h-screen">
      <NavbarAdmin />
      <div className="  mx-auto px-2 sm:px-6 lg:px-8  relative">
        <div className="w-600 relative flex flex-col items-center justify-center py-5">
          <h1 className="text-4xl font-bold">Request</h1>
          <div className="pb-5 overflow-hidden"> 
            <div className="w-full mt-5 p-5 flex space-x-5 items-center shadow-md rounded-3xl  bg-white">
                <div className="userprofile">
                    <img src={profileImage} alt="User Profile Image" className="w-20 h-20 rounded-full"/>
                </div>
                <div className="flex flex-col jus pb-3">
                 <p>Nama: Roberto Santan</p>
                 <p>Email: robsantan@gmail.com</p>
                 <p>Tanggal Pengajuan: 10 November 2023</p>
                </div>
                <div className="flex space-x-4">
                    <FaCheck className="text-green-400 hover:opacity-80 hover:cursor-pointer bg-white border border-green-400 rounded-full p-1" size={40}/>
                    <IoMdClose className="text-red-400 hover:opacity-80 hover:cursor-pointer bg-white border border-red-400 rounded-full p-1" size={40}/>
                </div>
            </div>
            <div className="w-full mt-5 p-5 flex space-x-5 items-center shadow-md rounded-3xl  bg-white">
                <div className="userprofile">
                    <img src={profileImage} alt="User Profile Image" className="w-20 h-20 rounded-full"/>
                </div>
                <div className="flex flex-col jus pb-3">
                    <p>Nama: Roberto Santani</p>
                    <p>Email: robi@gmail.com</p>
                    <p>Tanggal Pengajuan: 10 November 2023</p>
                </div>
                <div className="flex space-x-4">
                    <p className="font-bold text-green-400">Disetujui</p>
                </div>
            </div>
            <div className="w-full mt-5 p-5 flex space-x-5 items-center shadow-md rounded-3xl  bg-white">
                <div className="userprofile">
                    <img src={profileImage} alt="User Profile Image" className="w-20 h-20 rounded-full"/>
                </div>
                <div className="flex flex-col jus pb-3">
                    <p>Nama: Roberto Santano</p>
                    <p>Email: robo@gmail.com</p>
                    <p>Tanggal Pengajuan: 10 November 2023</p>
                </div>
                <div className="flex">
                    <p className="font-bold text-red-400">Ditolak</p>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;