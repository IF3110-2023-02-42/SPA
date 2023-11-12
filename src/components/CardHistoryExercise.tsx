import React from "react";
import { Link } from "react-router-dom";

type CardHistoryExerciseProps = {
  judul: string;
  ID_Latsol: string;
  Nilai: number;
  Modified_at: string;
};

const CardHistoryExercise = ({
  judul,
  ID_Latsol,
  Nilai,
  Modified_at,
}: CardHistoryExerciseProps) => {
  return (
    <Link
      className="flex flex-row justify-between items-center w-full bg-white p-5 shadow-lg rounded-lg hover:scale-[1.01] active:scale-[0.99] transition-all"
      to={`/exercise-history/` + ID_Latsol}
    >
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-[20px]">{judul}</p>
        <div className="flex flex-col gap-0">
          <p>Last submitted :</p>
          <p>{new Date(Modified_at).toDateString()}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center rounded-md overflow-hidden w-[78px] border-[1px] border-purpleBg">
        <p className="bg-purpleBg text-white py-1 text-center w-full">Score</p>
        <p className=" text-black w-full text-center py-1 font-semibold">
          {Nilai}
        </p>
      </div>
    </Link>
  );
};

export default CardHistoryExercise;
