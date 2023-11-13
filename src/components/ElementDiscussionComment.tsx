type ElementDiscussionComment = {
    penulis: string,
    created_at: string,
    updated_at: string,
    konten: string,
    jumlah_upvote: number,
    jumlah_downvote: number,
}

const ElementDiscussionComment = ({
    penulis,
    created_at,
    updated_at,
    konten,
    jumlah_upvote,
    jumlah_downvote,
}: ElementDiscussionComment) => {
    return (
        <div className="flex flex-col justify-start items-start w-full bg-white py-4 px-6 rounded-md gap-4">
            <div className="flex flex-row">
                <div className="flex min-h-[50px] max-h-[50px] min-w-[50px] max-w-[50px] bg-[#888888] rounded-[50%] mr-[5%]"></div>
                <div className="flex flex-col whitespace-nowrap">
                    <p className="font-semibold">{penulis}</p>
                    <p className="text-xs">{created_at}</p>
                    <p className="text-xs">Modified at: {updated_at}</p>
                </div>
            </div>
            <p>{konten}</p>
            <div className="flex flex-row">
                <button className="min-h-[40px] max-h-[40px] min-w-[40px] max-w-[40px] ml-[10%] mr-[10%] text-[white] bg-[rgb(82,_141,_82)] rounded-[50%] font-extrabold hover:scale-[120%] active:bg-[rgb(40,_87,_40)]">∧</button>
                <p>{jumlah_upvote}</p>
                <button className="min-h-[40px] max-h-[40px] min-w-[40px] max-w-[40px] ml-[10%] mr-[10%] text-[white] bg-[rgb(163,_58,_58)] rounded-[50%] font-extrabold hover:scale-[120%] active:bg-[rgb(109,_30,_30)]">∨</button>
                <p>{jumlah_downvote}</p>
            </div>
        </div>
    );
};

export default ElementDiscussionComment;