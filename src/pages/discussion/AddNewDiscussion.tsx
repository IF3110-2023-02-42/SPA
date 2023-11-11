import { useState, ChangeEvent } from 'react';
import { IoMdClose } from 'react-icons/io';

export interface Discussion{
    id: number,
    judul : string,
    dateCreated: number,
    author: string,
    contentSnippet: string,
    numOfComment: number,
    keywords: string[];
}

interface AddNewDiscussionProps {
    toggleModal: () => void,
    addDiscussion: (discussion: Discussion) => void,
  }
export default function AddNewDiscussion({toggleModal, addDiscussion}: AddNewDiscussionProps) {
    const [uraianInput, setUraianInput] = useState<string>('Type Something');
    const [judulInput, setJudulInput] = useState<string>(''); 
    const [keywordsInput, setKeywordsInput] = useState<string>('');

    const handleUraianChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setUraianInput(event.target.value);
    };

    const handleJudulChange = (event: ChangeEvent<HTMLInputElement>) => {
        setJudulInput(event.target.value);
    };

    const handleKeywordsChange = (event: ChangeEvent<HTMLInputElement>) => {
        setKeywordsInput(event.target.value);
    };

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
          toggleModal();
        }
      };
    
    const submitNewDiscussion = (judul : string,  contentSnippet : string, keywords : string)=>{
        // Get another data
        let id = 12; // Mungkin bakalan pake UUID or something like that, harus bikin konsisten juga dari sana
        let dateCreated = 0; // Karena pada hari yang sama dengan saat diskusi dibuat
        let author = 'Fadhil'; // Ambil dari session nanti
        let numOfComment = 0;

        // Add new discussion to REST
        let keywordsParsed : string[] = keywords.split(','); // Nanti udh retrieve dari REST

        let newDiscussion: Discussion = {id:id, judul:judul, dateCreated:dateCreated, author:author, contentSnippet:contentSnippet, numOfComment:numOfComment, keywords:keywordsParsed};
        addDiscussion(newDiscussion);
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
                        <input type="text" 
                            className="mt-2 w-full border border-gray-400 rounded-md p-1"
                            value={judulInput} 
                            onChange={handleJudulChange}
                            placeholder="Tulis judul pertanyaan Anda dengan singkat" />
                    </div>
                    <div className="pb-5">
                        <h4 className="font-bold text-xl">Uraian Pertanyaan</h4>
                        <textarea value={uraianInput} onChange={handleUraianChange} className="mt-2 w-full p-1 rounded-md border border-gray-400 resize-none" />
                        <p>Uraikan pertanyaan Anda lebih panjang dan jelas pada bagian ini.</p>
                    </div>
                    <div className="pb-5">
                        <h4 className='font-bold text-xl'>Kata Kunci</h4>
                        <input type="text" value={keywordsInput} onChange={handleKeywordsChange} className="mt-2 w-full border border-gray-400 rounded-md p-1" />
                        <p>Tuliskan beberapa kata kunci pertanyaan Anda di sini dengan tanda koma sebagai pemisah. Maksimal 6 kata kunci yang bisa ditambahkan.</p>
                        <p>Contoh: percepatan, gravitasi</p>
                    </div>

                    <div className='flex justify-end w-full'>
                        <p className='bg-purpleBg text-white p-2 rounded-md hover:cursor-pointer hover:opacity-90' 
                            onClick={()=>(submitNewDiscussion(judulInput, uraianInput, keywordsInput))}>
                            Buat Diskusi Baru
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}