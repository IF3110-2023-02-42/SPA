import AddNewDiscussion from "../../components/AddNewDiscussion";
import { Discussion } from "../../components/AddNewDiscussion";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api, { headers } from "../../utils/api";
import NavbarLayout from "../../layout/NavbarLayout";
import DiscussionCard from "../../components/CardDiscussion";
import toast from "react-hot-toast";
import { getUserStatus } from "../../utils/user";
import { getDecodedJwt } from "../../utils/jwt";
import Pagination from "../../components/Pagination";

const Home = () => {
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(4);
  const [discussionCards, setDiscussionCards] = useState<Discussion[]>([]);
  const [verified, setVerified] = useState<boolean | null>();
  const navigate = useNavigate();
  const decodedJwt = getDecodedJwt();

  async function getDiscussionsDataPage() {
    if (!decodedJwt) {
      navigate("/login");
      return;
    }
    // Get Discussion Data on Specific page to REST
    try {
      const response = await api.get(`/discussion/page`, {
        params: {
          pageNumber: page,
          pageSize: 10,
        },
        headers: headers,
      });
      console.log("atas", response.data.data);
      setDiscussionCards(response.data.data);
    } catch (error) {
      console.log("Error fetching data:", error);
      toast.error("Failed to fetch discussion data");
      setDiscussionCards([]);
    }
  }

  async function getMaxPage() {
    try {
      const response = await api.get("/discussion/maxPage/10", {
        headers: headers,
      });
      console.log("maxpage", response.data.data);
      setMaxPage(parseInt(response.data.data, 10));
    } catch (error) {
      console.log("Error fetching data:", error);
      setMaxPage(1);
    }
  }

  useEffect(() => {
    getDiscussionsDataPage();
    getMaxPage();
  }, []);

  useEffect(() => {
    getDiscussionsDataPage();
  }, [page]);

  function toggleModal() {
    setModal(!modal);
    console.log(modal);
  }

  async function getStatus() {
    const decodedJwt = getDecodedJwt();
    if (decodedJwt) {
      const status = await getUserStatus(decodedJwt.ID_Pengguna);
      setVerified(status);
    } else {
      setVerified(false);
    }
  }

  useEffect(() => {
    getStatus();
  }, []);

  function addDiscussion(newDiscussion: Discussion) {
    setDiscussionCards((prevDiscussions) => [
      ...prevDiscussions,
      newDiscussion,
    ]);
  }

  function handleDiscussionCardClick(id: string) {
    navigate(`/discussion_view/${id}`);
  }

  const changePage = (num: number) => {
    if (!(num < 1 || num > maxPage)) {
      setPage(num);
      console.log(num);
      getDiscussionsDataPage();
    }
  };

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
                discussionCards
                  .reverse()
                  .map((discussion) => (
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
              <Pagination
                maxPage={maxPage}
                currentPage={page}
                callback={changePage}
              />
            </div>
            {verified && (
              <div className="fixed w-full py-10 pr-20 flex justify-end bottom-0 z-20">
                <FaPlus
                  className="text-creamBg shadow-md bg-purpleBg opacity-100 transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer mr-2 p-1.5 rounded-md"
                  size={60}
                  onClick={toggleModal}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default Home;
