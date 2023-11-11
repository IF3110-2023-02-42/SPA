import { useState, useEffect } from "react";

import CardHistoryExercise from "../../components/CardHistoryExercise";
import NavbarLayout from "../../layout/NavbarLayout";

type CardHistoryExerciseProps = {
  judul: string;
  ID_Latsol: string;
  Nilai: number;
  Modified_at: Date;
};

// dummy data
const cardExerciseDum1: CardHistoryExerciseProps = {
  judul: "Mengalahkan Natzi",
  ID_Latsol: "123123123",
  Nilai: 69,
  Modified_at: new Date(),
};

const cardExerciseDum2: CardHistoryExerciseProps = {
  judul: "Mendapatkan Waifu Natzi",
  ID_Latsol: "696996",
  Nilai: 12,
  Modified_at: new Date(),
};

const cardExerciseDum3: CardHistoryExerciseProps = {
  judul: "Mendapatkan Husbando Natzi",
  ID_Latsol: "7777",
  Nilai: 99,
  Modified_at: new Date(),
};

const dummyExerciseList: CardHistoryExerciseProps[] = [
  cardExerciseDum1,
  cardExerciseDum2,
  cardExerciseDum3,
  cardExerciseDum1,
  cardExerciseDum2,
  cardExerciseDum3,
];
// dummy data

const ExHistoryList = () => {
  const [exerciseList, setExerciseList] = useState<
    CardHistoryExerciseProps[] | null
  >(null);

  useEffect(() => {
    // change later
    setExerciseList(dummyExerciseList);
  }, []);

  if (exerciseList === null) {
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
          {exerciseList.map((exerciseCard) => (
            <CardHistoryExercise {...exerciseCard} />
          ))}
        </div>
      </div>
    </NavbarLayout>
  );
};

export default ExHistoryList;
