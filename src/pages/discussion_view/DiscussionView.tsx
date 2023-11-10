import Navbar from "../navbar/Navbar";
import "./DiscussionView.css"

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
  <div className="reply" key={index}>
    <div className="user">
      <div className="profile"></div>
      <div className="profilecontent">
        <div className="name">{el.username}</div>
        <div className="time">dd/mm/yyy hh:mm</div>
      </div>
    </div>
    <p>{el.comment}</p>
  </div>
));

  return(
    <main>
      <Navbar/>
      <body>
        <h1>Discussion</h1>
        <div className="content">
          <div className="user">
            <div className="profile"></div>
            <div className="profilecontent">
              <div className="name">username</div>
              <div className="time">dd/mm/yyy hh:mm</div>
            </div>
          </div>
          <h2>Title</h2>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.
          Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus. <br></br> <br></br>
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci. Aenean nec lorem. In porttitor. Donec laoreet nonummy augue???
          </p>
        </div>
        <div className="replySection">
        
          <div className="commentInput">
            <h2>Add Reply</h2>
            <input
              type="text"
              placeholder="Input comment.."
            />
            <button>
              <h3>Send</h3>
            </button>
          </div>
          {commentElements}
        </div>
          
      </body>
    </main>
  );
};

export default DiscussionView;