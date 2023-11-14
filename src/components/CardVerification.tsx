import profileImage from "../assets/profile.jpg";
import { FaCheck } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

type VerificationCardProps = {
    id: string,
    nama: string,
    email: string,
    tanggalPengajuan: string,
    status: string,
    acceptRequestHandler: (id:string) => void,
    rejectRequestHandler: (id:string) => void,
  }


export default function VerificationCard({id, nama, email, tanggalPengajuan, status, acceptRequestHandler, rejectRequestHandler}: VerificationCardProps){
    return <div className="w-3/5 mt-5 p-5 flex space-x-5 items-center shadow-md rounded-3xl  bg-white">
    <div className="userprofile">
        <img src={profileImage} alt="User Profile Image" className="w-20 h-20 rounded-full"/>
    </div>
    <div className="flex flex-col jus pb-3">
     <p>Nama: {nama}</p>
     <p>Email: {email}</p>
     <p>Tanggal Pengajuan: {tanggalPengajuan}</p>
    </div>
    <div className="flex-grow"></div>
    {(status==="unverified") &&
      <div className="flex space-x-4">
          <FaCheck className="text-green-400 hover:opacity-80 hover:cursor-pointer bg-white border border-green-400 rounded-full p-1" 
          size={40}
          onClick = {()=>(acceptRequestHandler(id))}
          />
          <IoMdClose className="text-red-400 hover:opacity-80 hover:cursor-pointer bg-white border border-red-400 rounded-full p-1" 
          size={40}
          onClick = {()=>rejectRequestHandler(id)}
          />
      </div>
    }
  
    { (status==="accepted") &&
        <div className="flex">
            <p className="font-bold text-green-400">Disetujui</p>
        </div>
    }
  
    { (status==="rejected") &&
        <div className="flex">
          <p className="font-bold text-red-400">Ditolak</p>
      </div>
    }
  
  </div>
  }