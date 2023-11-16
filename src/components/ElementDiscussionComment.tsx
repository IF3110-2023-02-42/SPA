import api from "../utils/api";
import { useState, useEffect} from 'react';

export type ElementDiscussionCommentProps = {
    id_komentar: string,
    penulis: string,
    updated_at: number,
    konten: string,
}

const ElementDiscussionComment = ({
    id_komentar,
    penulis,
    updated_at,
    konten,
}: ElementDiscussionCommentProps) => {
    // const id_pengguna = sessionStorage.getItem("ID_Pengguna");
    const id_pengguna = 1;
    const [upvoteDisabled, setUpvoteDisabled] = useState(false);
    const [downvoteDisabled, setDownvoteDisabled] = useState(false);
    
    async function confirmVote(){
        try{
            const response = await api.get("/discussion_view/comment/confirmvote/"+id_komentar+"/"+id_pengguna);
            console.log(response.data.data);
            if (response.data.data.Is_upvote == "-1"){
                setUpvoteDisabled(false);
                setDownvoteDisabled(false);
            }
            else{
                if (response.data.data.Is_upvote == "0"){
                    setUpvoteDisabled(false);
                    setDownvoteDisabled(true);
                }
                else{
                    setUpvoteDisabled(true);
                    setDownvoteDisabled(false);
                }
            }
        } catch(error){
            console.log("error:", error);
        }
    }
    useEffect(() => {
        confirmVote()
    })

    const [upvote, setUpvote] = useState(0);
    const [downvote, setDownvote] = useState(0);

    async function getVote(){
        try{
            const response = await api.get("/discussion_view/comment/getvote/"+id_komentar);
            console.log(response.data.data)
            console.log("upvote:", response.data.data.Jumlah_Upvote)
            console.log("downvote:", response.data.data.Jumlah_Downvote)
            setUpvote(response.data.data.Jumlah_Upvote)
            setDownvote(response.data.data.Jumlah_Downvote);
        } catch(error){
            console.log("error:", error);
        }
    }
    useEffect(() => {
        getVote()
    })

    const handleUpvote = async () => {
        console.log("up", id_komentar);
        // setUpvoteDisabled(true);
        try{
            const response = await api.get("/discussion_view/comment/upvote/"+id_komentar+"/"+id_pengguna);
            console.log(response);
            console.log("Submitted");
            setUpvote(upvote+1);
        }
        catch(error){
            console.log("Error: ", error);
        }
        
    }
    const handleDownvote = async () => {
        console.log("down",id_komentar);
        // setDownvoteDisabled(true);
        try{
            const response = await api.get("/discussion_view/comment/downvote/"+id_komentar+"/"+id_pengguna);
            console.log(response);
            setDownvote(downvote+1);
        }
        catch(error){
            console.log("Error: ", error);
        }
    }
    return (
        <div className="flex flex-col justify-start items-start w-full bg-white py-4 px-6 rounded-md gap-4">
            <div className="flex flex-row">
                <div className="flex min-h-[50px] max-h-[50px] min-w-[50px] max-w-[50px] bg-[#888888] rounded-[50%] mr-[5%]"></div>
                <div className="flex flex-col whitespace-nowrap">
                    <p className="font-semibold">{penulis}</p>
                    {(updated_at < 60) &&  <p className="text-xs">{updated_at} menit yang lalu</p> }
                    {(updated_at >= 60) && (updated_at < 60*24) &&  <p className="text-xs">{Math.floor(updated_at/60)} jam yang lalu</p> }
                    {(updated_at >= 60*24) && (updated_at < 60*24*30) &&  <p className="text-xs">{Math.floor(updated_at/(60*24))} hari yang lalu</p> }
                    {(updated_at >= 60*24*30) && (updated_at < 60*24*365) &&  <p className="text-xs">{Math.floor(updated_at/(60*24*30))} bulan yang lalu</p> }
                    {(updated_at >= 60*24*365) &&  <p className="text-xs">{Math.floor(updated_at/(60*24*365))} tahun yang lalu</p> }
                </div>
            </div>
            <p>{konten}</p>
            <div className="flex items-center space-x-4">
                <div className="flex space-x-1 items-center">
                    <button className="hover:scale-105 text-purpleBg font-bold  transition duration-300 ease-in-out"
                    key={id_komentar}
                    onClick={handleUpvote}
                    disabled={upvoteDisabled}>
                        ∧
                    </button>
                    <p>{upvote}</p>
                </div>
                <div className="flex space-x-1 items-center">
                    <button className="hover:scale-105 text-purpleBg font-bold  transition duration-300 ease-in-out"
                    key={id_komentar}
                    onClick={handleDownvote}
                    disabled={downvoteDisabled}>
                        ∨
                    </button>
                    <p>{downvote}</p>
                </div>
            </div>
        </div>
    );
};

export default ElementDiscussionComment;