import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarLayout from "../../../layout/NavbarLayout";
import CardQuestionAnswered from "../../../components/CardQuestionAnswered";

type CardQuestionAnsweredProps = {
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
  Modified_at: Date;
  pembahasan: CardQuestionAnsweredProps[];
};

// dummy data
const soalJawabanBener1: CardQuestionAnsweredProps = {
  pertanyaan:
    "Sosiologi lahir sebagai ilmu yang mempelajari tentang masyarakat. Istilah sosiologi berasal dari bahasa Yunani socius yang berarti kawan dan logos yang artinya",
  jawaban: "Hubungan sosial",
  jawaban_benar: "Hubungan sosial",
  jawaban_salah1: "Ilmu atau pikiran",
  jawaban_salah2: "Kehidupan bersama",
  jawaban_salah3: "Hubungan antar kelompok",
};

const soalJawabanBener2: CardQuestionAnsweredProps = {
  pertanyaan:
    "Menurut teori konflik dalam sosiologi, apa yang menjadi sumber utama ketidaksetaraan dalam masyarakat?",
  jawaban: "Pertentangan kepentingan antarkelompok",
  jawaban_benar: "Pertentangan kepentingan antarkelompok",
  jawaban_salah1: "Keterbatasan sumber daya alam",
  jawaban_salah2: "Ketidakmampuan individu",
  jawaban_salah3: "Perbedaan genetik",
};

const soalJawabanSalah1: CardQuestionAnsweredProps = {
  pertanyaan:
    "Menurut teori konflik dalam sosiologi, apa yang menjadi sumber utama ketidaksetaraan dalam masyarakat?",
  jawaban: "Ketidakmampuan individu",
  jawaban_benar: "Pertentangan kepentingan antarkelompok",
  jawaban_salah1: "Keterbatasan sumber daya alam",
  jawaban_salah2: "Ketidakmampuan individu",
  jawaban_salah3: "Perbedaan genetik",
};

const historyDummy: ExerciseHistoryData = {
  judul: "Mendapatkan Waifu Natzi",
  Nilai: 12,
  Modified_at: new Date(),
  pembahasan: [
    soalJawabanBener1,
    soalJawabanBener2,
    soalJawabanSalah1,
    soalJawabanBener2,
    soalJawabanSalah1,
    soalJawabanSalah1,
    soalJawabanBener1,
  ],
};
// dummy data

const ExerciseHistory = () => {
  const { id } = useParams();
  const [exerciseHistoryData, setExerciseHistoryData] =
    useState<ExerciseHistoryData | null>(null);

  useEffect(() => {
    setExerciseHistoryData(historyDummy);
  }, []);

  if (exerciseHistoryData === null) {
    return (
      <NavbarLayout>
        <div>not found</div>
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
                <p>{exerciseHistoryData.Modified_at.toDateString()}</p>
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
              <CardQuestionAnswered {...exerciseCard} />
            ))}
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default ExerciseHistory;
