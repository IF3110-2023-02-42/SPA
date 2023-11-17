import AddNewDiscussion from "../../components/AddNewDiscussion";
import { Discussion } from "../../components/AddNewDiscussion";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import NavbarLayout from "../../layout/NavbarLayout";
import DiscussionCard from "../../components/CardDiscussion";
import toast from "react-hot-toast";

const Home = () => {
  const [modal, setModal] = useState(false);
  const [discussionCards, setDiscussionCards] = useState<Discussion[]>([]);
  const navigate = useNavigate();

  async function getDiscussionsData() {
    if (!sessionStorage.getItem("accessToken")) {
      navigate("/login");
    }

    // Get Discussion Data to REST webservice
    const response = await api.get("/discussion", {
      headers: {
        accessToken: sessionStorage.getItem("accessToken"),
      },
    });
    if (response.data.message == "OK") {
      console.log(response.data.data);
      setDiscussionCards(response.data.data);
    } else {
      console.log(response.data);
      toast.error("Failed to fetch discussion data");
    }
  }

  useEffect(() => {
    getDiscussionsData();
  }, []);

  const toggleModal = () => {
    setModal(!modal);
    console.log(modal);
  };

  function addDiscussion(newDiscussion: Discussion) {
    setDiscussionCards((prevDiscussions) => [
      ...prevDiscussions,
      newDiscussion,
    ]);
  }

  function handleDiscussionCardClick(id: string) {
    navigate(`/discussion_view/${id}`);
  }

  // Home Page
  return (
    <NavbarLayout>
      <div className="bg-creamBg z-10 min-h-screen">
        {modal && (
          <AddNewDiscussion
            toggleModal={toggleModal}
            addDiscussion={addDiscussion}
          />
        )}
        <div className=" mx-auto px-2 sm:px-6 lg:px-8  relative">
          <div className="w-full relative flex flex-col items-center justify-center py-5">
            <h1 className="text-4xl font-bold">Discussions</h1>
            <div className="w-full pb-5 flex flex-col items-center">
              {discussionCards.length != 0 ? (
                discussionCards.map((discussion) => (
                  <DiscussionCard
                    key={discussion.id}
                    id={discussion.id}
                    judul={discussion.judul}
                    dateCreated={discussion.dateCreated}
                    author={discussion.author}
                    content={discussion.content}
                    numOfComment={discussion.numOfComment}
                    keywords={discussion.keywords}
                    handleDiscussionCardClick={handleDiscussionCardClick}
                  />
                ))
              ) : (
                <div className="py-10"> Not Found </div>
              )}
            </div>
            <div className="fixed w-full py-10 pr-20 flex justify-end bottom-0 z-20">
              <FaPlus
                className="text-creamBg shadow-md bg-purpleBg opacity-100 transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer mr-2 p-1.5 rounded-md"
                size={60}
                onClick={toggleModal}
              />
            </div>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default Home;
