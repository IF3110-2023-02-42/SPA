import { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import { getUserStatus } from "../../utils/user";

import ElementDiscussion, {
  ElementDiscussionProps,
} from "../../components/ElementDiscussion";
import ElementDiscussionComment, {
  ElementDiscussionCommentProps,
} from "../../components/ElementDiscussionComment";
import NavbarLayout from "../../layout/NavbarLayout";
import toast from "react-hot-toast";
import { headers } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { getDecodedJwt } from "../../utils/jwt";

const DiscussionView = () => {
  const [commentInput, setCommentInput] = useState<string>("");
  const { id_diskusi } = useParams();
  const [verified, setVerified] = useState<boolean | null>();
  const navigate = useNavigate();
  const decodedJwt = getDecodedJwt();

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentInput(event.target.value);
  };

  async function getStatus() {
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

  const sendComment = async (konten_input: string) => {
    let penulis = "ALEX";
    if (decodedJwt){
      penulis = decodedJwt.username;
    }
    const konten = konten_input;
    const jumlah_upvote = 0;
    const jumlah_downvote = 0;

    const response = await api.post(
      "discussion_view/comment/add",
      {
        id_diskusi: id_diskusi,
        penulis: penulis,
        konten: konten,
        jumlah_upvote: jumlah_upvote,
        jumlah_downvote: jumlah_downvote,
      },
      {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      }
    );
    if (response.data.message === "OK") {
      console.log("Data:", response.data.data);
      toast.success("Berhasil menambahkan komentar");
      setCommentList((prevCommentList) => [
        ...prevCommentList,
        response.data.data,
      ]);
    } else {
      console.log("Error add comment");
      toast.error("Error adding comment");
    }
  };

  const [detail, setDetail] = useState<ElementDiscussionProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id_diskusi) {
          const response = await api.get(`discussion_view/${id_diskusi}`, {
            headers: {
              accessToken: sessionStorage.getItem("accessToken"),
            },
          });
          console.log("Data:", response);
          setDetail(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching comments data:", error);
        toast.error("Error fetching comments data");
      }
    };
    fetchData();
  }, []);

  const [commentList, setCommentList] = useState<
    ElementDiscussionCommentProps[]
  >([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);

  async function getCommentsDataPage() {
    if (!sessionStorage.getItem("accessToken")) {
      navigate("/login");
      return;
    }

    // Get Discussion Data on Specific page to REST
    try {
      const response = await api.get(
        `/discussion_view/comment/${id_diskusi}/page`,
        {
          params: {
            pageNumber: page,
            pageSize: 3,
          },
          headers: headers,
        }
      );
      console.log(response.data.data);
      setCommentList(response.data.data);
    } catch (error) {
      console.log("Error Comments data:", error);
      toast.error("Failed to fetch Comments data");
      setCommentList([]);
    }
  }

  async function getMaxPage() {
    try {
      const response = await api.get(
        `/discussion_view/comment/${id_diskusi}/maxPage`,
        { headers: headers }
      );
      console.log(response.data.data);
      setMaxPage(parseInt(response.data.data, 10));
    } catch (error) {
      console.log("Error fetching data:", error);
      setMaxPage(1);
    }
  }
  useEffect(() => {
    getCommentsDataPage();
    getMaxPage();
  }, []);

  return (
    <NavbarLayout>
      {detail ? (
        <div className="flex flex-col w-full justify-center items-center px-10">
          <p className="m-[2%] font-semibold text-3xl">Discussion</p>
          <div className="flex flex-col w-4/5 justify-center items-center gap-3">
            <ElementDiscussion
              penulis={detail.penulis}
              created_at={detail.created_at}
              judul={detail.judul}
              konten={detail.konten}
              jumlah_komentar={detail.jumlah_komentar}
              keywords={detail.keywords}
            />
            {verified && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendComment(commentInput);
                }}
                method="POST"
                className="flex flex-col justify-start items-start w-full bg-white py-4 px-6 rounded-md gap-4"
              >
                <p className="font-semibold text-xl">Add new comment</p>
                <input
                  type="text"
                  className="w-full p-1 border border-purpleBg"
                  onChange={handleCommentChange}
                  value={commentInput}
                  placeholder="Type Something"
                  required
                />

                <button
                  type="submit"
                  className="self-end bg-purpleBg text-white p-[1%] rounded-[15px] hover:scale-[110%] active:bg-[#30123f]"
                >
                  Send
                </button>
              </form>
            )}
            {commentList &&
              commentList.map((comment) => (
                <ElementDiscussionComment
                  key={comment.id_komentar}
                  id_komentar={comment.id_komentar}
                  penulis={comment.penulis}
                  updated_at={comment.updated_at}
                  konten={comment.konten}
                />
              ))}
          </div>
        </div>
      ) : (
        <div> Not Found</div>
      )}
    </NavbarLayout>
  );
};

export default DiscussionView;
