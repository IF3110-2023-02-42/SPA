export type ElementDiscussionCommentProps = {
    id_komentar: string,
    penulis: string,
    updated_at: number,
    konten: string,
    jumlah_upvote: number,
    jumlah_downvote: number,
}

const ElementDiscussionComment = ({
    penulis,
    updated_at,
    konten,
    jumlah_upvote,
    jumlah_downvote,
}: ElementDiscussionCommentProps) => {
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
                    <button className="hover:scale-105 text-purpleBg font-bold  transition duration-300 ease-in-out">∧</button>
                    <p>{jumlah_upvote}</p>
                </div>
                <div className="flex space-x-1 items-center">
                    <button className="hover:scale-105 text-purpleBg font-bold  transition duration-300 ease-in-out">∨</button>
                    <p>{jumlah_downvote}</p>
                </div>
            </div>
        </div>
    );
};

export default ElementDiscussionComment;