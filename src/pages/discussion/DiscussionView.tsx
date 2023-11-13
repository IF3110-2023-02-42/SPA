import { useState, useEffect } from "react";
import api from "../../utils/api";

import ElementDiscussion from "../../components/ElementDiscussion";
import ElementAddComment from "../../components/ElementAddComment";
import ElementDiscussionComment from "../../components/ElementDiscussionComment";
import NavbarLayout from "../../layout/NavbarLayout";

const DiscussionView = () => {
  const [detail, setDetail] = useState <
    ElementDiscussion | null
    >(null);
    
    useEffect(() => {
      const fetchData = async() => {
        try {
          const response = await api.get("discussion_view/1", 
          {
            headers : {
              accessToken : sessionStorage.getItem("accessToken"),
            }
          }
          );
  
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
            <ElementAddComment />
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
              <ElementAddComment />
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