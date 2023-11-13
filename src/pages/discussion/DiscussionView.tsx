import { useState, useEffect } from "react";

import ElementDiscussion from "../../components/ElementDiscussion";
import ElementAddComment from "../../components/ElementAddComment";
import ElementDiscussionComment from "../../components/ElementDiscussionComment";
import NavbarLayout from "../../layout/NavbarLayout";

// dummy
const elementDiscussion: ElementDiscussion = {
    penulis: "penulis0123",
    created_at: Date(),
    updated_at: Date(),
    judul: "Judul",
    konten: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.
    Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci?
    `,
    jumlah_komentar: 3,
};

const elementDiscussionComment1: ElementDiscussionComment = {
  penulis: "komentator1",
  created_at: Date(),
  updated_at: Date(),
  konten: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.
  Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.
  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.
  Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.
  Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.
  `,
  jumlah_upvote: 3,
  jumlah_downvote: 0,
};

const elementDiscussionComment2: ElementDiscussionComment = {
  penulis: "komentator2",
  created_at: Date(),
  updated_at: Date(),
  konten: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.
  Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.
  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.
  Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.
  Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.
  `,
  jumlah_upvote: 4,
  jumlah_downvote: 2,
};

const elementDiscussionComment3: ElementDiscussionComment = {
  penulis: "komentator3",
  created_at: Date(),
  updated_at: Date(),
  konten: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.
  Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.
  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.
  Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.
  Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.
  `,
  jumlah_upvote: 1,
  jumlah_downvote: 0,
};

const dummyDiscussionComment: ElementDiscussionComment[] = [
  elementDiscussionComment1,
  elementDiscussionComment2,
  elementDiscussionComment3,
];

const DiscussionView = () => {
  const [commentList, setCommentList] = useState <
    ElementDiscussionComment[] | null
    >(null);

    useEffect(() => {
      setCommentList(dummyDiscussionComment);
    }, []);

    if (commentList === null){
      <NavbarLayout>
        <div className="flex flex-col w-full justify-center items-center p-2 sm:p-10">
          <p className="m-[1%] font-semibold text-[30px]">Discussion</p>
          <div className="flex flex-col w-full justify-center items-center gap-3">
            <ElementDiscussion {...elementDiscussion}/>
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
              <ElementDiscussion {...elementDiscussion}/>
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