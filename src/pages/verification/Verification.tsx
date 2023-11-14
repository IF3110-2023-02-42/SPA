import {useState} from 'react';
import NavbarLayout from "../../layout/NavbarLayout";
import VerificationCard from '../../components/CardVerification';
import {useEffect} from 'react'
import api from '../../utils/api';
import toast from 'react-hot-toast';
interface Verification {
  id: string,
  nama: string,
  email: string,
  tanggalPengajuan: string,
  status: string
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
    const indexOfCardToModify = newVerificationCards.findIndex(card => card.id === id);
    if (indexOfCardToModify !== -1) {
      newVerificationCards[indexOfCardToModify].status = status;

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
  
  return (
    <NavbarLayout>
      <div className="bg-creamBg z-1 min-h-screen">
        <div className="  mx-auto px-2 sm:px-6 lg:px-8  relative">
          <div className="w-600 relative flex flex-col items-center justify-center py-5">
            <h1 className="text-4xl font-bold">Request</h1>
            <div className="w-full flex flex-col items-center pb-5 overflow-hidden"> 
                {verificationCards.map((verification)=> (
                  <VerificationCard
                    key= {verification.id}
                    id={verification.id}
                    nama={verification.nama}
                    email={verification.email}
                    tanggalPengajuan={verification.tanggalPengajuan}
                    status={verification.status}
                    acceptRequestHandler= {acceptRequest}
                    rejectRequestHandler= {rejectRequest}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};
