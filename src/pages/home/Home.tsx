import Navbar from "../../components/Navbar";
import AddNewDiscussion from "../discussion/AddNewDiscussion";
import { Discussion } from "../discussion/AddNewDiscussion";
import { FaPlus, FaComment} from 'react-icons/fa';
import { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const Home = () => {
  const [modal, setModal] = useState(false);
  const [discussionCards, setDiscussionCards] = useState<Discussion[]>([])
  const navigate = useNavigate();
  
  async function getDiscussionsData(){
    if (!sessionStorage.getItem("accessToken")){
      navigate("/login");
    }

    // Get Discussion Data to REST webservice
    const response = await api.get("/discussion", {
      headers : {
        accessToken : sessionStorage.getItem("accessToken"),
      }
    });
    if (response.data.message=="OK"){
      console.log(response.data.data)
      setDiscussionCards(response.data.data);
    } else{
      console.log(response.data);
      console.log("Failed to fetch discussion data");
    }
  }

  useEffect(()=>{
    getDiscussionsData()
  }, [])

  const toggleModal = () => {
    setModal(!modal);
    console.log(modal);
  };

  function addDiscussion(newDiscussion:Discussion){
    setDiscussionCards((prevDiscussions)=> [...prevDiscussions, newDiscussion])
  }
  
  // Discussion Card Component
  function DiscussionCard({id, judul, dateCreated, author, content, numOfComment, keywords}:Discussion){
      function handleDiscussionCardClick(){
        navigate(`/discussion_view/${id}`)
      }
    
      return <div className="w-3/5 mt-5 p-5 shadow-md rounded-3xl transition duration-300 ease-in-out hover:cursor-pointer hover:bg-gray-100 bg-white"
        onClick={handleDiscussionCardClick}
      >
        <div className="pb-3">
          <div className="flex space-x-4 items-center">
              <h2 className="text-2xl font-bold">{judul}</h2>
              {(dateCreated < 60) &&  <p>{dateCreated} menit yang lalu</p> }
              {(dateCreated >= 60) && (dateCreated < 60*24) &&  <p>{Math.floor(dateCreated/60)} jam yang lalu</p> }
              {(dateCreated >= 60*24) && (dateCreated < 60*24*30) &&  <p>{Math.floor(dateCreated/(60*24))} hari yang lalu</p> }
              {(dateCreated >= 60*24*30) && (dateCreated < 60*24*365) &&  <p>{Math.floor(dateCreated/(60*24*30))} bulan yang lalu</p> }
              {(dateCreated >= 60*24*365) &&  <p>{Math.floor(dateCreated/(60*24*365))} tahun yang lalu</p> }
          </div>
          <p>By {author}</p>
        </div>
        <p className="pb-3 w-full overflow-hidden text-overflow-ellipsis whitespace-normal">
          {(content.length > 300) ? (content.slice(0,297)+"...") : content}
        </p>
        <div className="flex space-x-3 items-center pb-3">
          {keywords.map((keyword)=> (
            <p key={keyword} className="flex items-center justify-center hover:opacity-90 bg-gray-400 px-1 rounded-md" >#{keyword}</p>
          ))}
        </div>
        <div className="discussion-numOfComment flex items-center space-x-4">
            <FaComment className="text-gray-300 rounded-full"  size={35}/>
            <p>{numOfComment} Pembahasan</p>
        </div>
    </div>
  }
  // Home Page
  return (
    <div className="bg-creamBg z-10 min-h-screen">
      <Navbar />
      {modal && <AddNewDiscussion toggleModal={toggleModal} addDiscussion={addDiscussion}/>}
      <div className=" mx-auto px-2 sm:px-6 lg:px-8  relative">
        <div className="w-full relative flex flex-col items-center justify-center py-5">
          <h1 className="text-4xl font-bold">Discussions</h1>
          <div className="w-full pb-5 flex flex-col items-center"> 
            {(discussionCards.length != 0) ? (discussionCards.map((discussion) => (
                <DiscussionCard
                  key={discussion.id}
                  id={discussion.id}
                  judul={discussion.judul}
                  dateCreated={discussion.dateCreated}
                  author={discussion.author}
                  content={discussion.content}
                  numOfComment={discussion.numOfComment}
                  keywords={discussion.keywords}
                />
              ))) :
              (<div className="py-10"> Not Found </div>)
            }
         </div>
          <div className="fixed w-full py-10 pr-20 flex justify-end bottom-0 z-20">
            <FaPlus 
              className="text-creamBg shadow-md bg-purpleBg opacity-100 transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer mr-2 p-1.5 rounded-md"  
              size={60}
              onClick = {toggleModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
