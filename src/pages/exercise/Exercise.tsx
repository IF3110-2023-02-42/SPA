import { useState, useEffect } from "react";
import api from "../../utils/api";

import ElementExerciseQ from "../../components/ElementExerciseQ";
import NavbarLayout from "../../layout/NavbarLayout";
import { useParams } from "react-router";

const Exercise = () => {
    const [exerciseQList, setExerciseQList] = useState<ElementExerciseQ[] | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
    const {id} = useParams();
    const handleOptionChange = (id_soal: string, value: string) => {
        setSelectedOptions({
            ...selectedOptions,
            [id_soal]: value,
        });
    };

    const handleSubmit = async () => {
        const jawaban = Object.keys(selectedOptions).map((id_soal) => ({
            ID_Soal: id_soal,
            selected_jawaban: selectedOptions[id_soal],
        }));
        console.log(jawaban);
        const newData = {
            modified_at: new Date(),
            ID_Pengguna: 1,
            jawaban: jawaban,
        };

        const response =  await api.post("/exercise_task/"+id+"/submit", newData,  {});
        console.log(response.data);
        if (response.data.message == "OK"){
            console.log("Submitted");
        }
        else{
            console.log("Failed");
        }
    };

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

    if (exerciseQList === null || exerciseQList.length == 0){
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
                    <ElementExerciseQ
                    key={exerciseQ.id_soal}
                    {...exerciseQ}
                    selectedOption={selectedOptions[exerciseQ.id_soal] || ''}
                    handleOptionChange={(value) => handleOptionChange(exerciseQ.id_soal, value)}
                />
                ))}
                </div>
            </div>
            <button onClick={handleSubmit} className="self-center bg-purpleBg text-white p-[1%] ml-[45%] rounded-[15px] hover:scale-[110%] flex-grow">Submit</button>
        </NavbarLayout>
    )
};

export default Exercise;