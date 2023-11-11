import React from "react";

type CardQuestionAnsweredProps = {
  pertanyaan: string;
  jawaban: string; // ini jawaban pengguna
  jawaban_benar: string;
  jawaban_salah1: string;
  jawaban_salah2: string;
  jawaban_salah3: string;
};

const CardQuestionAnswered = ({
  pertanyaan,
  jawaban,
  jawaban_benar,
  jawaban_salah1,
  jawaban_salah2,
  jawaban_salah3,
}: CardQuestionAnsweredProps) => {
  const generateOptions = (option: string) => {
    return (
      <div className="flex flex-row justify-start items-center gap-2 ml-2">
        <div
          className={`w-4 aspect-square rounded-full border-black border-[1px] ${
            jawaban === option
              ? option === jawaban_benar
                ? "bg-green-400"
                : "bg-red-400"
              : "bg-white"
          }`}
        />
        <div>{option}</div>
      </div>
    );
  };
  return (
    <div className="flex flex-col justify-start items-start w-full bg-white py-4 px-6 rounded-md gap-4">
      <p className="font-semibold">{pertanyaan}</p>
      {/* Options */}
      <div className="flex flex-col justify-center items-start gap-2">
        {generateOptions(jawaban_benar)}
        {generateOptions(jawaban_salah1)}
        {generateOptions(jawaban_salah2)}
        {generateOptions(jawaban_salah3)}
      </div>
      <p>
        <span className="font-semibold">Answer : </span>
        {jawaban_benar}
      </p>
    </div>
  );
};

export default CardQuestionAnswered;
