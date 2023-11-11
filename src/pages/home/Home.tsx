import Navbar from "../../components/Navbar";
import AddNewDiscussion from "../discussion/AddNewDiscussion";
import { Discussion } from "../discussion/AddNewDiscussion";
import { FaPlus, FaComment} from 'react-icons/fa';
import { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";




const Home = () => {
  const [modal, setModal] = useState(false);
  const [discussionCards, setDiscussionCards] = useState<Discussion[]>([])
  
  function getDiscussionsData(){
    
    // Get Discussion Data to REST webservice
    fetch("http://localhost:3000/discussion", {
      method:"GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      if (res.ok){
        return res.json();
      } else {
        throw new Error("Failed to fetch discussion data");
      }
    }).then(data=>{
      console.log(data.data)
      setDiscussionCards(data.data);
    }).catch(err => console.log(err));
  }

  useEffect(()=>{
    getDiscussionsData()
  }, [])

  const toggleModal = () => {
    setModal(!modal);
    console.log(modal);
  };
  const navigate = useNavigate()
  function addDiscussion(newDiscussion:Discussion){
    setDiscussionCards((prevDiscussions)=> [...prevDiscussions, newDiscussion])
  }
  
  function DiscussionCard({key, judul, dateCreated, author, contentSnippet, numOfComment, keywords}:Discussion){
      function handleDiscussionCardClick(){
        navigate(`/discussion_view/${key}`)
      }
    
      return <div className="w-3/5 mt-5 p-5 shadow-md rounded-3xl transition duration-300 ease-in-out hover:cursor-pointer hover:bg-gray-100 bg-white"
        onClick={handleDiscussionCardClick}
      >
        <div className="pb-3">
          <div className="flex space-x-4 items-center">
              <h2 className="text-2xl font-bold">{judul}</h2>
              <p>{dateCreated} hari yang lalu</p>
          </div>
          <p>By {author}</p>
        </div>
        <p className="pb-3 w-full overflow-hidden text-overflow-ellipsis whitespace-normal">
          {(contentSnippet.length > 300) ? (contentSnippet.slice(0,297)+"...") : contentSnippet}
        </p>
        <div className="flex space-x-3 items-center pb-3">
          {keywords.map((keyword)=> (
            <p key={keyword} className="flex items-center justify-center hover:opacity-90 bg-gray-400 px-1 rounded-md" >#{keyword}</p>
          ))}
        </div>
        <div className="discussion-numOfComment flex items-center space-x-4">
            <FaComment className="text-gray-300 rounded-full"  size={45}/>
            <p>{numOfComment} Pembahasan</p>
        </div>
    </div>
  }
  return (
    <div className="bg-creamBg z-10 min-h-screen">
      <Navbar />
      {modal && <AddNewDiscussion toggleModal={toggleModal} addDiscussion={addDiscussion}/>}
      <div className=" mx-auto px-2 sm:px-6 lg:px-8  relative">
        <div className="w-full relative flex flex-col items-center justify-center py-5">
          <h1 className="text-4xl font-bold">Diskusi</h1>
          <div className="w-full pb-5 flex flex-col items-center"> 
          {discussionCards.map((discussion) => (
              <DiscussionCard
                key={discussion.key}
                judul={discussion.judul}
                dateCreated={discussion.dateCreated}
                author={discussion.author}
                contentSnippet={discussion.contentSnippet}
                numOfComment={discussion.numOfComment}
                keywords={discussion.keywords}
              />
            ))}
          </div>
        </div>
        <div className="fixed w-full py-10 pr-20 flex justify-end bottom-0 z-20">
          <FaPlus 
            className="text-creamBg shadow-md bg-purpleBg opacity-100 transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer mr-2 p-1.5 rounded-md"  
            size={70}
            onClick = {toggleModal}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
