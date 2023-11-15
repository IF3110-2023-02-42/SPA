import { useState, useEffect } from "react";
import api from "../../utils/api";

import ElementAddQ from "../../components/ElementAddQ";
import ElementExerciseQAdmin from "../../components/ElementExerciseQAdmin";
import NavbarLayout from "../../layout/NavbarLayout";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

const ExerciseAdmin = () => {
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    const toggleModal = () => {
        const value = sessionStorage.getItem('myKey');
        console.log(value);

        console.log(id);
        setModal(!modal);
        console.log(modal);
    }

    const [exerciseQList, setExerciseQList] = useState<ElementExerciseQAdmin[] | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
    const {id} = useParams();
    const handleOptionChange = (id_soal: string, value: string) => {
        setSelectedOptions({
            ...selectedOptions,
            [id_soal]: value,
        });
    };

    useEffect(() => {
        console.log(sessionStorage.getItem("accessToken"));
        if (!sessionStorage.getItem("accessToken")){
            navigate("/login");
          }
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
                {modal && <ElementAddQ id_latsol={id as string} toggleModal={toggleModal} />}
                <p className="m-[1%] font-semibold text-[30px]">Exercise</p>
                <div className="flex flex-col w-full justify-center items-center gap-3">
                {exerciseQList.map((exerciseQ) => (
                    <ElementExerciseQAdmin
                    key={exerciseQ.id_soal}
                    {...exerciseQ}
                    selectedOption={selectedOptions[exerciseQ.id_soal] || ''}
                    handleOptionChange={(value) => handleOptionChange(exerciseQ.id_soal, value)}
                />
                ))}
                </div>
            </div>
            <button onClick={toggleModal} className="self-center bg-purpleBg text-white p-[1%] ml-[45%] rounded-[15px] hover:scale-[110%] flex-grow">Add</button>
        </NavbarLayout>
    )
};

export default ExerciseAdmin;