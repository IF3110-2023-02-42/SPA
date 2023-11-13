import { useState, useEffect } from "react";
import api from "../../utils/api";

import CardHistoryExercise from "../../components/CardHistoryExercise";
import NavbarLayout from "../../layout/NavbarLayout";

type CardHistoryExerciseProps = {
  judul: string;
  ID_Latsol: string;
  nilai: number;
  modified_at: string;
};

// dummy
const ID_Pengguna = 2;
// dummy

const ExHistoryList = () => {
  const [exerciseList, setExerciseList] =
    useState<CardHistoryExerciseProps[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/exercise/getHistoryExerciseListById", {
          params: {
            ID_Pengguna: ID_Pengguna,
          },
        });

        setExerciseList(response.data.data);
      } catch (error) {
        console.log("Error fetching data:", error);
        setExerciseList([]);
      }
    };

    fetchData();
  }, []);

  return (
    <NavbarLayout>
      <div className="flex flex-col w-full justify-center items-center p-2 sm:p-10">
        <div className="flex flex-col w-full justify-center items-center gap-3">
          {exerciseList?.length !== 0 ? (
            exerciseList?.map((exerciseCard) => (
              <CardHistoryExercise
                {...exerciseCard}
                key={exerciseCard.ID_Latsol}
              />
            ))
          ) : (
            <div>No history found</div>
          )}
        </div>
      </div>
    </NavbarLayout>
  );
};

export default ExHistoryList;
