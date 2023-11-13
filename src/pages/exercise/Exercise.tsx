import { useState, useEffect } from "react";
import api from "../../utils/api";

import ElementExerciseQ from "../../components/ElementExerciseQ";
import NavbarLayout from "../../layout/NavbarLayout";
import { useParams } from "react-router";

const Exercise = () => {
    const {id} = useParams();
    const [exerciseQList, setExerciseQList] = useState<
        ElementExerciseQ[] | null
    >(null);

    useEffect(() => {
        const fetchData = async() => {
          try {
            const response = await api.get("exercise_task/"+id);
    
            console.log("Data:", response.data.data);
            setExerciseQList(response.data.data);
          } catch (error) {
            console.log("Error fetching data:", error);
            setExerciseQList(null);
          }
        };
        fetchData();
      },[id]);

    if (exerciseQList === null){
        return (
            <NavbarLayout>
                not found
            </NavbarLayout>
        );
    }
    return (
        <NavbarLayout>
            <div className="flex flex-col w-full justify-center items-center p-2 sm:p-10">
                <p className="m-[1%] font-semibold text-[30px]">Exercise</p>
                <div className="flex flex-col w-full justify-center items-center gap-3">
                {exerciseQList.map((exerciseQ) => (
                    <ElementExerciseQ {...exerciseQ} />
                ))}
                </div>
            </div>
            <button className="self-center bg-purpleBg text-white p-[1%] ml-[45%] rounded-[15px] hover:scale-[110%] flex-grow">Submit</button>
        </NavbarLayout>
    )
};

export default Exercise;