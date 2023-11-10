import { useState, ChangeEvent } from 'react';
import { IoMdClose } from 'react-icons/io';
interface AddNewDiscussionProps {
    toggleModal: () => void;
  }

export default function AddNewDiscussion({toggleModal}: AddNewDiscussionProps) {
    const [uraianInput, setUraianInput] = useState<string>('Type Something');

    const handleUraianChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setUraianInput(event.target.value);
    };

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
          toggleModal();
        }
      };
    
    const subumitNewDiscussion = ()=>{
        // Add new discussion to REST

        toggleModal();
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
                <h3 className="font-bold text-2xl"> Buat Diskusi Baru </h3>
                <form className="pt-3">
                    <div className="pb-5">
                        <h4 className="font-bold text-xl">Judul Pertanyaan</h4>
                        <input type="text" className="mt-2 w-full border border-gray-400 rounded-md p-1" placeholder="Tulis judul pertanyaan Anda dengan singkat" />
                    </div>
                    <div className="pb-5">
                        <h4 className="font-bold text-xl">Uraian Pertanyaan</h4>
                        <textarea value={uraianInput} onChange={handleUraianChange} className="mt-2 w-full p-1 rounded-md border border-gray-400 resize-none" />
                        <p>Uraikan pertanyaan Anda lebih panjang dan jelas pada bagian ini.</p>
                    </div>
                    <div className="pb-5">
                        <h4 className='font-bold text-xl'>Kata Kunci</h4>
                        <input type="text" className="mt-2 w-full border border-gray-400 rounded-md p-1" />
                        <p>Tuliskan beberapa kata kunci pertanyaan Anda di sini dengan tanda koma sebagai pemisah. Maksimal 6 kata kunci yang bisa ditambahkan.</p>
                        <p>Contoh: percepatan, gravitasi</p>
                    </div>

                    <div className='flex justify-end w-full'>
                        <p className='bg-purpleBg text-white p-2 rounded-md hover:cursor-pointer hover:opacity-90' onClick={subumitNewDiscussion}>
                            Buat Diskusi Baru
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}