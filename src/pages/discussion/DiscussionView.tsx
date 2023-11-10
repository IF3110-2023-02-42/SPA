import Navbar from "../../components/Navbar"

const DiscussionView = () => {
const comments = [
  {username: "student1",
    comment: "lorem ipsum lorem ipsum"},
    {username: "student2",
    comment: "lorem ipsum lorem ipsum? lorem ipsum lorem ipsum"},
    {username: "student3",
    comment: "lorem ipsum lorem ipsum!😳😳"},
]

const commentElements = comments.map((el, index) => (
  <div className="w-[90%] bg-[white] flex flex-col text-left ml-[5%] mb-[1%] rounded-[15px] p-[1%] text-[#4D2C5E] [box-shadow:rgba(0,_0,_0,_0.15)_1.95px_1.95px_2.6px]" key={index}>
    <div className="flex flex-row mb-[1%] mr-[2%]">
      <div className="h-[40px] w-[40px] bg-[#888888] rounded-[50%] mr-[2%]"></div>
      <div className="flex flex-col">
        <div className="text-[1rem]">{el.username}</div>
        <div className="text-[0.7rem]">dd/mm/yyy hh:mm</div>
      </div>
    </div>
    <p>{el.comment}</p>
  </div>
));

  return(
    <main>
      <Navbar/>
      <body className="h-full items-center pl-[2.5%] pr-[2.5%] py-[1%] bg-[#fdf8ee] relative">
        <h1 className="text-[#4D2C5E] text-[2rem] font-bold">Discussion</h1>
        <div className="w-[90%] bg-[white] flex flex-col ml-[5%] mb-[2%] rounded-[15px] p-[1.5%] text-[#4D2C5E] [box-shadow:rgba(0,_0,_0,_0.15)_1.95px_1.95px_2.6px]">
          <div className="flex flex-row mb-[3%] mr-[2%]">
            <div className="h-[40px] w-[40px] bg-[#888888] rounded-[50%] mr-[2%]"></div>
            <div className="flex flex-col">
              <div className="text-[1rem]">username</div>
              <div className="text-[0.7rem]">dd/mm/yyy hh:mm</div>
            </div>
          </div>
          <h2 className="text-[#4D2C5E] text-[1.5rem] font-bold">Title</h2>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.
          Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus. <br></br> <br></br>
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci. Aenean nec lorem. In porttitor. Donec laoreet nonummy augue???
          </p>
          <div className="pt-[2%] flex flex-row">
            <button className="h-[40px] w-[40px] p-[0%] mb-[0%] mr-[1%] text-[white] bg-[rgb(82,_141,_82)] rounded-[50%] text-[1rem] font-extrabold [box-shadow:rgba(0,_0,_0,_0.15)_1.95px_1.95px_2.6px] hover:scale-[120%] active:bg-[rgb(40,_87,_40)]">∧</button>
            <p>xx</p>
            <button className="h-[40px] w-[40px] p-[0%] mb-[0%] ml-[2%] mr-[1%] text-[white] bg-[rgb(163,_58,_58)] rounded-[50%] text-[1rem] font-extrabold [box-shadow:rgba(0,_0,_0,_0.15)_1.95px_1.95px_2.6px] hover:scale-[120%] active:bg-[rgb(109,_30,_30)]">∨</button>
            <p>xx</p>
          </div>
        </div>

        <div className="text-center">
          <div className="w-[90%] bg-[white] flex-col text-left ml-[5%] mb-[1%] rounded-[15px] p-[1%] text-[#4D2C5E] [box-shadow:rgba(0,_0,_0,_0.15)_1.95px_1.95px_2.6px]">
            <h2 className="text-[#4D2C5E] text-[1.5rem] font-bold">Add Reply</h2>
            <input
              className="max-w-[70%] border-[#4D2C5E] mt-[1%] mb-[1%] mr-[70%]"
              type="text"
              placeholder="Input comment.."
            />
            <button className="bg-[#4D2C5E] self-end max-w-[fit-content] mb-[1%] mr-[2%] pb-[0.5%] pt-[0.5%] pr-[3%] pl-[3%] rounded-[15px] border-[none] flex-row [box-shadow:rgba(0,_0,_0,_0.15)_1.95px_1.95px_2.6px] hover:scale-[120%] active:bg-[#30123f]">
              <h3 className="text-[white] text-[1.3rem] font-bold ">Send</h3>
            </button>
          </div>
          {commentElements}
        </div>
          
      </body>
    </main>
  );
};

export default DiscussionView;