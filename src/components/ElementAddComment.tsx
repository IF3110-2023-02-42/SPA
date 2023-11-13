const ElementAddComment = () => {
    return (
        <div className="flex flex-col justify-start items-start w-full bg-white py-4 px-6 rounded-md gap-4">
            <p className="font-semibold">Add new comment</p>
                <input className="w-full" placeholder="Input new comment.."></input>
                <button className="self-center bg-purpleBg text-white p-[1%] rounded-[15px] hover:scale-[110%] active:bg-[#30123f]">Send</button>
        </div>
    );
};

export default ElementAddComment;