import { useState, ChangeEvent } from 'react';
import { IoMdClose } from 'react-icons/io';
import api from '../utils/api';
import toast from 'react-hot-toast';

export interface Discussion{
    id: string,
    judul : string,
    dateCreated: number,
    author: string,
    content: string,
    numOfComment: number,
    keywords: string[];
}

interface AddNewDiscussionProps {
    toggleModal: () => void,
    addDiscussion: (discussion: Discussion) => void,
  }
export default function AddNewDiscussion({toggleModal, addDiscussion}: AddNewDiscussionProps) {
    const [uraianInput, setUraianInput] = useState<string>('');
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
    
    const submitNewDiscussion = async (judul : string,  content : string, keywords : string)=>{
        // Get another data
        let author = sessionStorage.getItem("username");
        let numOfComment = 0;
        // Add new discussion to REST
        let newData= {
            judul: judul,
            author: author,
            content: content,
            keywords: keywords,
            numOfComment: numOfComment   
        };
        const response = await api.post("/discussion/add", newData, {
            headers : {
                accessToken : sessionStorage.getItem("accessToken"),
              }
        });

        console.log(response.data);

        if (response.data.message=="OK"){
            console.log("add Discussion Success");
            toast.success("Berhasil menambahkan diskusi");

            let retrieveData = response.data.data;
    
            let newDiscussion: Discussion = {
                id:retrieveData.id, 
                judul:retrieveData.judul, 
                dateCreated:retrieveData.dateCreated, 
                author:retrieveData.author, 
                content:(retrieveData.content.length > 300) ? (retrieveData.content.slice(0,297)+"..."):retrieveData.content, 
                numOfComment:retrieveData.numOfComment,
                keywords:retrieveData.keywords
            };

            addDiscussion(newDiscussion);
            toggleModal();
        } else {
            console.log("add Discussion Failed");
            toast.error("Failed to add Discussion");
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
                <h3 className="font-bold text-2xl"> Buat Diskusi Baru </h3>
                <form className="pt-3 w-4/5" method='POST' onSubmit={()=>(submitNewDiscussion(judulInput, uraianInput, keywordsInput))}>
                    <div className="pb-5">
                        <h4 className="font-bold text-xl">Judul Pertanyaan</h4>
                        <input type="text" 
                            className="mt-2 w-full border border-gray-400 rounded-md p-1"
                            value={judulInput} 
                            onChange={handleJudulChange}
                            placeholder="Tulis judul pertanyaan Anda dengan singkat" 
                            required    
                        />
                            
                    </div>
                    <div className="pb-5">
                        <h4 className="font-bold text-xl">Uraian Pertanyaan</h4>
                        <textarea className="mt-2 w-full p-1 rounded-md border border-gray-400 resize-none" value={uraianInput} onChange={handleUraianChange} required />
                        <p>Uraikan pertanyaan Anda lebih panjang dan jelas pada bagian ini.</p>
                    </div>
                    <div className="pb-5">
                        <h4 className='font-bold text-xl'>Kata Kunci</h4>
                        <input type="text" 
                            className="mt-2 w-full border border-gray-400 rounded-md p-1" 
                            value={keywordsInput} 
                            onChange={handleKeywordsChange}  
                            required
                        />
                        <p>Tuliskan beberapa kata kunci pertanyaan Anda di sini dengan tanda koma sebagai pemisah. Maksimal 6 kata kunci yang bisa ditambahkan.</p>
                        <p>Contoh: percepatan,gravitasi</p>
                    </div>

                    <div className='flex justify-end w-full'>
                        <button type='submit'className='bg-purpleBg text-white p-2 rounded-md hover:cursor-pointer hover:opacity-90'>
                                Buat Diskusi Baru
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}