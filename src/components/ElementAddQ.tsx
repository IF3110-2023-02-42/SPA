import { ChangeEvent, FormEvent, useState } from "react";
import { IoMdClose } from 'react-icons/io';
import api from '../utils/api';
import toast from 'react-hot-toast';

export interface ElementAddQ {
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

export default function AddQ({ id_latsol, toggleModal }: AddQProps) {
    const [data, setData] = useState({
        pertanyaan: "",
        jawaban_benar: "",
        jawaban_salah1: "",
        jawaban_salah2: "",
        jawaban_salah3: "",
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            toggleModal();
        }
    };

    const submitNewQ = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newData = {...data, id_latsol}

        try {
            const response = await api.post("exercise/addsoal", newData);
            console.log(response.data);
            toast.success("Berhasil menambahkan ")
            toggleModal();
        }
        catch (error) {
            console.log("Error: ", error);
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
                <form className="pt-3"
                    method="POST"
                    onSubmit={submitNewQ}
                >
                    <div className="pb-5">
                        <h4 className="font-bold text-xl">Pertanyaan</h4>
                        <input type="text"
                            className="mt-2 w-full border border-gray-400 rounded-md p-1"
                            id="pertanyaan"
                            required
                            onChange={handleInputChange}
                            placeholder="Pertanyaan..." />
                    </div>
                    <div className="pb-5">
                        <h4 className="font-bold text-xl">Jawaban benar</h4>
                        <input type="text"
                            className="mt-2 w-full border border-gray-400 rounded-md p-1"
                            id="jawaban_benar"
                            required
                            onChange={handleInputChange}
                            placeholder="Jawaban benar..." />
                    </div>
                    <div className="pb-5">
                        <h4 className="font-bold text-xl">Jawaban salah 1</h4>
                        <input type="text"
                            className="mt-2 w-full border border-gray-400 rounded-md p-1"
                            id="jawaban_salah1"
                            required
                            onChange={handleInputChange}
                            placeholder="Jawaban salah..." />
                    </div>
                    <div className="pb-5">
                        <h4 className="font-bold text-xl">Jawaban salah 2</h4>
                        <input type="text"
                            className="mt-2 w-full border border-gray-400 rounded-md p-1"
                            id="jawaban_salah2"
                            required
                            onChange={handleInputChange}
                            placeholder="Jawaban salah..." />
                    </div>
                    <div className="pb-5">
                        <h4 className="font-bold text-xl">Jawaban salah 3</h4>
                        <input type="text"
                            className="mt-2 w-full border border-gray-400 rounded-md p-1"
                            id="jawaban_salah3"
                            required
                            onChange={handleInputChange}
                            placeholder="Jawaban salah..." />
                    </div>

                    <div className='flex justify-end w-full'>
                        <button
                            type="submit"
                            className="bg-purpleBg text-white p-2 rounded-md hover:cursor-pointer hover:opacity-90"
                        >
                            Tambah pertanyaan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}