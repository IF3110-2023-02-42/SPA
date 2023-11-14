import { FaComment } from "react-icons/fa";

export type ElementDiscussionProps = {
    penulis: string,
    created_at: number,
    judul: string,
    konten: string,
    jumlah_komentar: number,
    keywords: string[],
};

const ElementDiscussion = ({
    penulis,
    created_at,
    judul,
    konten,
    jumlah_komentar,
    keywords,
}: ElementDiscussionProps) => {
    return (
        <div className="flex flex-col justify-start items-start w-full bg-white py-4 px-6 rounded-md gap-4">
            <div className="flex flex-row">
                <div className="flex min-h-[50px] max-h-[50px] min-w-[50px] max-w-[50px] bg-[#888888] rounded-[50%] mr-[5%]"></div>
                <div className="flex flex-col space-y-1 whitespace-nowrap">
                    <p className="font-semibold">{penulis}</p>
                    {(created_at < 60) &&  <p className="text-xs">{created_at} menit yang lalu</p> }
                    {(created_at >= 60) && (created_at < 60*24) &&  <p className="text-xs">{Math.floor(created_at/60)} jam yang lalu</p> }
                    {(created_at >= 60*24) && (created_at < 60*24*30) &&  <p className="text-xs">{Math.floor(created_at/(60*24))} hari yang lalu</p> }
                    {(created_at >= 60*24*30) && (created_at < 60*24*365) &&  <p className="text-xs">{Math.floor(created_at/(60*24*30))} bulan yang lalu</p> }
                    {(created_at >= 60*24*365) &&  <p className="text-xs">{Math.floor(created_at/(60*24*365))} tahun yang lalu</p> }
                </div>
            </div>
            <p className="font-semibold">{judul}</p>
            <p>{konten}</p>
            <div className="flex space-x-3 items-center ">
                {keywords.map((keyword)=> (
                    <p key={keyword} className="flex items-center justify-center hover:opacity-90 bg-gray-400 px-1 rounded-md" >#{keyword}</p>
                ))}
            </div>
            <div className="discussion-numOfComment flex items-center space-x-4">
            <FaComment className="text-gray-300 rounded-full"  size={25}/>
            <p>{jumlah_komentar} Pembahasan</p>
        </div>
        </div>
    );
};

export default ElementDiscussion;