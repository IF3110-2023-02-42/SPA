import NavbarAdmin from "../../components/NavbarAdmin";
import profileImage from "../../assets/profile.jpg";
import { FaCheck } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import {useState} from 'react';

interface Verification {
  id: number,
  nama: string,
  email: string,
  tanggalPengajuan: string,
  status: string
}

function getVerificationsData(): Verification[]{
  let verifications : Verification[] = [
    {
      id: 1,
      nama: "Roberto Santan",
      email: "robsantan@gmail.com",
      tanggalPengajuan: "10 November 2023",
      status: "unverified",
    }, 
    {
      id: 2,
      nama: "Roberto Santani",
      email: "robi@gmail.com",
      tanggalPengajuan: "10 November 2023",
      status: "accepted",
    },
    {
      id: 3,
      nama: "Roberto Santano",
      email: "robo@gmail.com",
      tanggalPengajuan: "10 November 2023",
      status: "rejected",
    },
  ];
  return verifications;
}

function changeStatusToDatabase(id:number, newStatus:string){
  // Commit to REST

  console.log(id,newStatus)
}

export default function Verification(){
  const [verificationCards, setVerificationCards] = useState(getVerificationsData)
  
  function modifyCard(id:number, status:string){
    const newVerificationCards = verificationCards.map(card => ({ ...card }));
    const indexOfCardToModify = newVerificationCards.findIndex(card => card.id === id);
    if (indexOfCardToModify !== -1) {
      newVerificationCards[indexOfCardToModify].status = status;

      // Step 3: Update the state with the modified array
      setVerificationCards(newVerificationCards);
    }
  }
  
  function acceptRequest(id:number){
    changeStatusToDatabase(id, "accepted")
    // Jika berhasil commit ke database tampilannya bisa diubah
    modifyCard(id,"accepted");
  }
  
  function rejectRequest(id:number){
    changeStatusToDatabase(id, "accepted")
    // Jika berhasil commit ke database tampilannya bisa diubah
    modifyCard(id,"rejected");
  }
  
  function VerificationCard({id, nama, email, tanggalPengajuan, status}: Verification){
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
          onClick = {()=>(acceptRequest(id))}
          />
          <IoMdClose className="text-red-400 hover:opacity-80 hover:cursor-pointer bg-white border border-red-400 rounded-full p-1" 
          size={40}
          onClick = {()=>rejectRequest(id)}
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
  
  return (
    <div className="bg-creamBg z-1 min-h-screen">
      <NavbarAdmin />
      <div className="  mx-auto px-2 sm:px-6 lg:px-8  relative">
        <div className="w-600 relative flex flex-col items-center justify-center py-5">
          <h1 className="text-4xl font-bold">Request</h1>
          <div className="w-full flex flex-col items-center pb-5 overflow-hidden"> 
              {verificationCards.map((verification)=> (
                  <VerificationCard
                    id={verification.id}
                    nama={verification.nama}
                    email={verification.email}
                    tanggalPengajuan={verification.tanggalPengajuan}
                    status={verification.status}
                  />
              ))}

          </div>
        </div>
      </div>
    </div>
  );
};
