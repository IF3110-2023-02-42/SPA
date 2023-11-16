import {useState} from 'react';
import NavbarLayout from "../../layout/NavbarLayout";
import VerificationCard from '../../components/CardVerification';
import {useEffect} from 'react'
import api from '../../utils/api';
import toast from 'react-hot-toast';
interface Verification {
  ID_Pengguna: string,
  nama: string,
  email: string,
  tanggalPengajuan: string,
  verificationStatus: string
}


export default function Verification(){
  const [verificationCards, setVerificationCards] = useState<Verification[]>([])
  
  async function changeStatusToDatabase(id:string, newStatus:string){
    // Commit to REST
    const data = {
      id: id,
      newStatus: newStatus,
    }
    const response = await api.put('/verification/updateStatus', data, {
      headers:{
        accessToken: sessionStorage.getItem("accessToken"),
      }
    }); 
  
    return response;
  }
  async function getVerificationsData(){
    const response = await api.get('/verification', {
      headers:{
        accessToken : sessionStorage.getItem("accessToken"),
      }      
    })
    
    if (response.data.message === "OK"){
      console.log(response.data.data)
      setVerificationCards(response.data.data);
    } else{
      console.log(response.data);
      console.log("Failed to fetch verifiaction data");
    }
  }

  useEffect(()=>{
    getVerificationsData()
  }, [])
  
  function modifyCard(id:string, status:string){
    const newVerificationCards = verificationCards.map(card => ({ ...card }));
    const indexOfCardToModify = newVerificationCards.findIndex(card => card.ID_Pengguna === id);
    if (indexOfCardToModify !== -1) {
      newVerificationCards[indexOfCardToModify].verificationStatus = status;

      setVerificationCards(newVerificationCards);
    }
  }
  
  async function acceptRequest(id:string){
    const response = await changeStatusToDatabase(id, "accepted");
    // Jika berhasil commit ke database tampilannya bisa diubah
    if (response.data.message === "OK"){
      modifyCard(id,"accepted");
      console.log(response.data.data);
      toast.success('Request verifikasi berhasil disetujui');
    } else {
      toast.error('Request verifikasi gagal disetujui');
    }
  }
  
  async function rejectRequest(id:string){
    const response = await changeStatusToDatabase(id, "rejected");
    // Jika berhasil commit ke database tampilannya bisa diubah
    if (response.data.message === "OK"){
      console.log(response.data.data);
      modifyCard(id,"rejected");
      toast.success('Request verifikasi berhasil ditolak');
    } else {
      toast.error('Request verifikasi gagal ditolak');
    }
  }

  async function cancelVerification(id:string){
    const response = await changeStatusToDatabase(id, "unverified");
    // Jika berhasil commit ke database tampilannya bisa diubah
    if (response.data.message === "OK"){
      console.log(response.data.data);
      modifyCard(id,"unverified");
      toast.success('Request verifikasi berhasil ditolak');
    } else {
      toast.error('Request verifikasi gagal ditolak');
    }    
  }
  
  function formatDate(date:string){
    let dateList = date.split('-');
    [dateList[0], dateList[2]] = [dateList[2], dateList[0] ]
    return dateList.join('-');
  }

  return (
    <NavbarLayout>
      <div className="bg-creamBg z-1 min-h-screen">
        <div className="  mx-auto px-2 sm:px-6 lg:px-8  relative">
          <div className="w-600 relative flex flex-col items-center justify-center py-5">
            <h1 className="text-4xl font-bold">Request</h1>
            <div className="w-full flex flex-col items-center pb-5 overflow-hidden"> 
                {verificationCards.map((verification)=> (
                  <VerificationCard
                    key= {verification.ID_Pengguna}
                    id={verification.ID_Pengguna}
                    nama={verification.nama}
                    email={verification.email}
                    tanggalPengajuan={formatDate(verification.tanggalPengajuan.split(" ")[0])}
                    status={verification.verificationStatus}
                    acceptRequestHandler= {acceptRequest}
                    rejectRequestHandler= {rejectRequest}
                    cancelVerificationHandler={cancelVerification}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};
