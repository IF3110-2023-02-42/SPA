import { useState, useEffect } from "react";

import ElementExerciseQ from "../../components/ElementExerciseQ";
import NavbarLayout from "../../layout/NavbarLayout";

// dummy
const elementExerciseQ1: ElementExerciseQ = {
    pertanyaan: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa? 1",
    jawaban_benar: "lorem ipsum t",
    jawaban_salah1: "lorem ipsum",
    jawaban_salah2: "lorem ipsum",
    jawaban_salah3: "lorem ipsum",
};

const elementExerciseQ2: ElementExerciseQ = {
    pertanyaan: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa? 2",
    jawaban_benar: "lorem ipsum t",
    jawaban_salah1: "lorem ipsum",
    jawaban_salah2: "lorem ipsum",
    jawaban_salah3: "lorem ipsum",
};

const elementExerciseQ3: ElementExerciseQ = {
    pertanyaan: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa? 3",
    jawaban_benar: "lorem ipsum t",
    jawaban_salah1: "lorem ipsum",
    jawaban_salah2: "lorem ipsum",
    jawaban_salah3: "lorem ipsum",
};

const dummyExcerciseQ: ElementExerciseQ[] = [
    elementExerciseQ1,
    elementExerciseQ2,
    elementExerciseQ3,
];

const Exercise = () => {
    const [exerciseQList, setExerciseQList] = useState<
        ElementExerciseQ[] | null
    >(null);

    useEffect(() => {
        setExerciseQList(dummyExcerciseQ);
    }, []);

    if (exerciseQList === null){
        return (
            <NavbarLayout>
                <div>not found</div>
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