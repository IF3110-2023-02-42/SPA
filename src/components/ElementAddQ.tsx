import { useState, ChangeEvent } from 'react';
import { IoMdClose } from 'react-icons/io';
import api from '../utils/api';
import toast from 'react-hot-toast';

export interface ElementAddQ{
    id: string,
    pertanyaan: string,
    jawaban_benar: string,
    jawaban_salah1: string,
    jawaban_salah2: string,
    jawaban_salah3: string,
}

interface AddQProps {
    id_latsol: string,
    toggleModal: () => void,
  }

export default function AddQ({id_latsol, toggleModal}: AddQProps) {
    const [pertanyaan, setPertanyaanInput] = useState<string>('');
    const handlePertanyaanChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPertanyaanInput(event.target.value);
    };
    const [jawaban_benar, setJawabanBenarInput] = useState<string>('');
    const handleJawabanBenarChange = (event: ChangeEvent<HTMLInputElement>) => {
        setJawabanBenarInput(event.target.value);
    };
    const [jawaban_salah1, setJawabanSalah1Input] = useState<string>('');
    const handleJawabanSalah1Change = (event: ChangeEvent<HTMLInputElement>) => {
        setJawabanSalah1Input(event.target.value);
    };
    const [jawaban_salah2, setJawabanSalah2Input] = useState<string>('');
    const handleJawabanSalah2Change = (event: ChangeEvent<HTMLInputElement>) => {
        setJawabanSalah2Input(event.target.value);
    };
    const [jawaban_salah3, setJawabanSalah3Input] = useState<string>('');
    const handleJawabanSalah3Change = (event: ChangeEvent<HTMLInputElement>) => {
        setJawabanSalah3Input(event.target.value);
    };

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
          toggleModal();
        }
      };

    const submitNewQ = async(id: string, pertanyaan: string, jawaban_benar: string, jawaban_salah1: string, jawaban_salah2: string, jawaban_salah3: string) => {
       const newData = {
            pertanyaan: pertanyaan,
            jawaban_benar: jawaban_benar,
            jawaban_salah1: jawaban_salah1,
            jawaban_salah2: jawaban_salah2,
            jawaban_salah3: jawaban_salah3,
       }
       const response = await api.post("exercise/"+id+"/addsoal", newData);
       console.log(response.data);

       if (response.data.message == "OK"){
        console.log("Success.")
        toast.success("Berhasil menambahkan pertanyaan");
        
        const rd = response.data.data;
        const newQ: ElementAddQ ={
            id: rd.ID_Soal,
            pertanyaan: rd.pertanyaan,
            jawaban_benar: rd.jawaban_benar,
            jawaban_salah1: rd.jawaban_salah1,
            jawaban_salah2: rd.jawaban_salah2,
            jawaban_salah3: rd.jawaban_salah3,
        };
        toggleModal();
        }
        else{
            console.log("Failed");
            toast.error("Gagal menambahkan pertanyaan");
        }
    }

    return (
        <div className="fixed top-0 z-30 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 " onClick={handleOverlayClick} >
            <div className="bg-white flex flex-col items-center shadow-md rounded-md p-5 w-3/5">
                <div className="flex justify-end w-full">
                    <IoMdClose
                        className="text-gray-400 hover:opacity-80 hover:cursor-pointer bg-white  rounded-full p-1"
                        size={30}
                        onClick={toggleModal}
                    />
                </div>
                <h3 className="font-bold text-2xl">Add New Question</h3>
                <form className="pt-3">
                    <div className="pb-5">
                        <h4 className="font-bold text-xl">Pertanyaan</h4>
                        <input type="text" 
                            className="mt-2 w-full border border-gray-400 rounded-md p-1"
                            value={pertanyaan} 
                            onChange={handlePertanyaanChange}
                            placeholder="Pertanyaan..." />
                    </div>
                    <div className="pb-5">
                        <h4 className="font-bold text-xl">Jawaban benar</h4>
                        <input type="text" 
                            className="mt-2 w-full border border-gray-400 rounded-md p-1"
                            value={jawaban_benar} 
                            onChange={handleJawabanBenarChange}
                            placeholder="Jawaban benar..." />
                    </div>
                    <div className="pb-5">
                        <h4 className="font-bold text-xl">Jawaban salah 1</h4>
                        <input type="text" 
                            className="mt-2 w-full border border-gray-400 rounded-md p-1"
                            value={jawaban_salah1} 
                            onChange={handleJawabanSalah1Change}
                            placeholder="Jawaban salah..." />
                    </div>
                    <div className="pb-5">
                        <h4 className="font-bold text-xl">Jawaban salah 2</h4>
                        <input type="text" 
                            className="mt-2 w-full border border-gray-400 rounded-md p-1"
                            value={jawaban_salah2} 
                            onChange={handleJawabanSalah2Change}
                            placeholder="Jawaban salah..." />
                    </div>
                    <div className="pb-5">
                        <h4 className="font-bold text-xl">Jawaban salah 3</h4>
                        <input type="text" 
                            className="mt-2 w-full border border-gray-400 rounded-md p-1"
                            value={jawaban_salah3} 
                            onChange={handleJawabanSalah3Change}
                            placeholder="Jawaban salah..." />
                    </div>

                    <div className='flex justify-end w-full'>
                        <p className='bg-purpleBg text-white p-2 rounded-md hover:cursor-pointer hover:opacity-90' 
                            onClick={()=>(submitNewQ(id_latsol,pertanyaan,jawaban_benar,jawaban_salah1,jawaban_salah2,jawaban_salah3))}>
                            Tambah pertanyaan
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}