import { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";

import ElementDiscussion from "../../components/ElementDiscussion";
import ElementDiscussionComment from "../../components/ElementDiscussionComment";
import NavbarLayout from "../../layout/NavbarLayout";

const DiscussionView = () => {
  let id = useParams();
  const [commentInput, setCommentInput] = useState<string>('');
  
  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(event.target.value);
  };

  const sendComment = async (konten_input: string) => {
    const penulis = "belumada";
    const created_at = new Date();
    const updated_at = new Date();
    const konten = konten_input;
    const jumlah_upvote = 0;
    const jumlah_downvote = 0;

    try{
      const response = await api.post("/1/addcomment", 
        {
          penulis: penulis,
          created_at: created_at,
          updated_at: updated_at,
          konten: konten,
          jumlah_upvote: jumlah_upvote,
          jumlah_downvote: jumlah_downvote
        }
      )
      console.log("Data:", response.data.data);
    } catch (error){
      console.log("Error fetching data:", error);
    }
  };

  const [detail, setDetail] = useState <
    ElementDiscussion | null
    >(null);
    
    useEffect(() => {
      const fetchData = async() => {
        try {
          const response = await api.get("discussion_view/1");
  
          console.log("Data:", response.data.data);
          setDetail(response.data.data);
        } catch (error) {
          console.log("Error fetching data:", error);
          setDetail(null);
        }
      };
      fetchData();
    },[]);

  const [commentList, setCommentList] = useState <
    ElementDiscussionComment[] | null
    >(null);

    useEffect(() => {
      const fetchData = async() => {
        try {
          const response = await api.get("discussion_view/1/comment");
  
          console.log("Data:", response.data.data);
          setCommentList(response.data.data);
        } catch (error) {
          console.log("Error fetching data:", error);
          setCommentList(null);
        }
      };
      fetchData();
    },[]);

    if (detail === null){
      return (
        <NavbarLayout>
          not found
        </NavbarLayout>
      );
    }
    else if (commentList === null){
      <NavbarLayout>
        <div className="flex flex-col w-full justify-center items-center p-2 sm:p-10">
          <p className="m-[1%] font-semibold text-[30px]">Discussion</p>
          <div className="flex flex-col w-full justify-center items-center gap-3">
            <ElementDiscussion 
              penulis = {detail.penulis}
              created_at = {detail.created_at}
              updated_at = {detail.updated_at}
              judul = {detail.judul}
              konten = {detail.konten}
              jumlah_komentar = {detail.jumlah_komentar}
            />
            <div className="flex flex-col justify-start items-start w-full bg-white py-4 px-6 rounded-md gap-4">
                  <p className="font-semibold">Add new comment</p>
                  <input className="w-full" onChange={()=>handleCommentChange} value={commentInput} placeholder="Add new comment..."></input>
                  <button className="self-center bg-purpleBg text-white p-[1%] rounded-[15px] hover:scale-[110%] active:bg-[#30123f]" onClick={()=>sendComment(commentInput)}>Send</button>
              </div>
          </div>
        </div>
      </NavbarLayout>
    }
    else{
      return (
        <NavbarLayout>
          <div className="flex flex-col w-full justify-center items-center p-2 sm:p-10">
            <p className="m-[1%] font-semibold text-[30px]">Discussion</p>
            <div className="flex flex-col w-full justify-center items-center gap-3">
            <ElementDiscussion 
              penulis = {detail.penulis}
              created_at = {detail.created_at}
              updated_at = {detail.updated_at}
              judul = {detail.judul}
              konten = {detail.konten}
              jumlah_komentar = {detail.jumlah_komentar}
            />
              <div className="flex flex-col justify-start items-start w-full bg-white py-4 px-6 rounded-md gap-4">
                  <p className="font-semibold">Add new comment</p>
                  <input className="w-full" onChange={()=>handleCommentChange} value={commentInput} placeholder="Add new comment..."></input>
                  <button className="self-center bg-purpleBg text-white p-[1%] rounded-[15px] hover:scale-[110%] active:bg-[#30123f]" onClick={()=>sendComment(commentInput)}>Send</button>
              </div>
              {commentList.map((comment) => (
                <ElementDiscussionComment {...comment} />
              ))}
            </div>
          </div>
        </NavbarLayout>
      );
    }
    
};

export default DiscussionView;