import Navbar from "../../components/Navbar";
import AddDiscussion from "../discussion/AddNewDiscussion";
import { FaPlus, FaComment} from 'react-icons/fa';
import { useState} from 'react';

const Home = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
    console.log(modal);
  };

  return (
    <div className="bg-creamBg z-10 min-h-screen">
      <Navbar />
      {modal && <AddDiscussion toggleModal={toggleModal}/>}
      <div className=" mx-auto px-2 sm:px-6 lg:px-8  relative">
        <div className="w-full relative flex flex-col items-center justify-center py-5">
          <h1 className="text-4xl font-bold">Diskusi</h1>
          <div className="w-full pb-5 flex flex-col items-center"> 
            <div className="w-3/5 mt-5 p-5 shadow-md rounded-3xl transition duration-300 ease-in-out hover:cursor-pointer hover:scale-105 bg-white">
                <div className="pb-3">
                  <div className="flex space-x-4 items-center">
                      <h2 className="text-2xl font-bold">Judul Diskusi</h2>
                      <p>2 hari yang lalu</p>
                  </div>
                  <p>By Fadhil</p>
                </div>
                <div className="pb-3">
                    economic bubble adalah suatu peristiwa saat harga sebuah sekuritas berada jauh di atas harga wajarnya.

                </div>
                <div className="discussion-numOfComment flex items-center space-x-4">
                    <FaComment className="text-gray-300 rounded-full"  size={45}/>
                    <p>7 Pembahasan</p>
                </div>
            </div>

          </div>
        </div>
        <div className="fixed w-full py-10 pr-20 flex justify-end bottom-0 z-20">
          <FaPlus 
            className="text-creamBg shadow-md bg-purpleBg opacity-100 transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer mr-2 p-1.5 rounded-full"  
            size={70}
            onClick = {toggleModal}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
