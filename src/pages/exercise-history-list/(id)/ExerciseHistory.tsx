import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarLayout from "../../../layout/NavbarLayout";
import CardQuestionAnswered from "../../../components/CardQuestionAnswered";
import api from "../../../utils/api";

type CardQuestionAnsweredProps = {
  ID_Soal: string;
  pertanyaan: string;
  jawaban: string; // ini jawaban pengguna
  jawaban_benar: string;
  jawaban_salah1: string;
  jawaban_salah2: string;
  jawaban_salah3: string;
};

type ExerciseHistoryData = {
  judul: string;
  Nilai: number;
  Modified_at: string;
  pembahasan: CardQuestionAnsweredProps[];
};

// dummy
const ID_Pengguna = 2;
// dummy

const ExerciseHistory = () => {
  const { id } = useParams();
  const [exerciseHistoryData, setExerciseHistoryData] =
    useState<ExerciseHistoryData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/exercise/getHistoryExerciseById", {
          params: {
            ID_Pengguna: ID_Pengguna,
            ID_Latsol: id,
          },
        });

        console.log("Data:", response.data.data);
        // setExerciseHistoryData(response.data.data);
      } catch (error) {
        console.log("Error fetching data:", error);
        setExerciseHistoryData(null);
      }
    };

    fetchData();
  }, []);

  if (exerciseHistoryData === null) {
    return (
      <NavbarLayout>
        <div className="w-full text-center">History not found</div>
      </NavbarLayout>
    );
  }

  return (
    <NavbarLayout>
      <div className="flex flex-col w-full justify-center items-center p-2 sm:p-10">
        <div className="flex flex-col w-full justify-center items-center gap-3">
          {/* Judul */}
          <div className="flex flex-row justify-between items-center w-full bg-white p-5 shadow-lg rounded-lg">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[20px]">
                {exerciseHistoryData.judul}
              </p>
              <div className="flex flex-col gap-0">
                <p>Last submitted :</p>
                <p>
                  {new Date(exerciseHistoryData.Modified_at).toDateString()}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md overflow-hidden w-[78px] border-[1px] border-purpleBg">
              <p className="bg-purpleBg text-white py-1 text-center w-full">
                Score
              </p>
              <p className=" text-black w-full text-center py-1 font-semibold">
                {exerciseHistoryData.Nilai}
              </p>
            </div>
          </div>

          <div className="w-full h-[1px] bg-black opacity-50 mt-5 mb-2" />

          {/* Pembahasan */}
          <div className="flex flex-col w-full justify-center items-center gap-3">
            {exerciseHistoryData.pembahasan.map((exerciseCard) => (
              <CardQuestionAnswered
                {...exerciseCard}
                key={exerciseCard.ID_Soal}
              />
            ))}
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default ExerciseHistory;
