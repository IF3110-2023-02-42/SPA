import { useState, useEffect } from "react";
import api from "../../utils/api";

import CardHistoryExercise from "../../components/CardHistoryExercise";
import NavbarLayout from "../../layout/NavbarLayout";

type CardHistoryExerciseProps = {
  judul: string;
  ID_Latsol: string;
  Nilai: number;
  Modified_at: string;
};

const ExHistoryList = () => {
  const [exerciseList, setExerciseList] = useState<
    CardHistoryExerciseProps[] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/exercise/test");

        console.log("Data:", response.data.data);
        setExerciseList(response.data.data);
      } catch (error) {
        console.log("Error fetching data:", error);
        setExerciseList(null);
      }
    };

    fetchData();
  }, []);

  return (
    <NavbarLayout>
      <div className="flex flex-col w-full justify-center items-center p-2 sm:p-10">
        <div className="flex flex-col w-full justify-center items-center gap-3">
          {exerciseList ? (
            exerciseList.map((exerciseCard) => (
              <CardHistoryExercise
                {...exerciseCard}
                key={exerciseCard.ID_Latsol}
              />
            ))
          ) : (
            <div>not found</div>
          )}
        </div>
      </div>
    </NavbarLayout>
  );
};

export default ExHistoryList;
