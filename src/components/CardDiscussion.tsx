import { FaComment } from "react-icons/fa";

type DiscussionCardProps = {
    id: string,
    judul : string,
    dateCreated: number,
    author: string,
    content: string,
    numOfComment: number,
    keywords: string[];
    handleDiscussionCardClick: (id:string)=>void;
}


export default function DiscussionCard({id, judul, dateCreated, author, content, numOfComment, keywords, handleDiscussionCardClick}:DiscussionCardProps){
  
    return <div className="w-3/5 mt-5 p-5 shadow-md rounded-3xl transition duration-300 ease-in-out hover:cursor-pointer hover:bg-gray-100 bg-white"
      onClick={() => handleDiscussionCardClick(id)}
    >
      <div className="pb-3">
        <div className="flex space-x-4 items-center">
            <h2 className="text-2xl font-bold">{judul}</h2>
            {(dateCreated < 60) &&  <p>{dateCreated} menit yang lalu</p> }
            {(dateCreated >= 60) && (dateCreated < 60*24) &&  <p>{Math.floor(dateCreated/60)} jam yang lalu</p> }
            {(dateCreated >= 60*24) && (dateCreated < 60*24*30) &&  <p>{Math.floor(dateCreated/(60*24))} hari yang lalu</p> }
            {(dateCreated >= 60*24*30) && (dateCreated < 60*24*365) &&  <p>{Math.floor(dateCreated/(60*24*30))} bulan yang lalu</p> }
            {(dateCreated >= 60*24*365) &&  <p>{Math.floor(dateCreated/(60*24*365))} tahun yang lalu</p> }
        </div>
        <p>By {author}</p>
      </div>
      <p className="pb-3 w-full overflow-hidden text-overflow-ellipsis whitespace-normal">
        {(content.length > 300) ? (content.slice(0,297)+"...") : content}
      </p>
      <div className="flex space-x-3 items-center pb-3">
        {keywords.map((keyword)=> (
          <p key={keyword} className="flex items-center justify-center hover:opacity-90 bg-gray-400 px-1 rounded-md" >#{keyword}</p>
        ))}
      </div>
      <div className="discussion-numOfComment flex items-center space-x-4">
          <FaComment className="text-gray-300 rounded-full"  size={35}/>
          <p>{numOfComment} Pembahasan</p>
      </div>
  </div>
}