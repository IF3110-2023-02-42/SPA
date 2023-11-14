
type ElementExerciseQ = {
    id_soal: string;
    pertanyaan: string;
    jawaban_benar: string;
    jawaban_salah1: string;
    jawaban_salah2: string;
    jawaban_salah3: string;
    selectedOption: string;
    handleOptionChange: (value: string) => void
};

const ElementExerciseQ = ({
    id_soal,
    pertanyaan,
    jawaban_benar,
    jawaban_salah1,
    jawaban_salah2,
    jawaban_salah3,
    selectedOption,
    handleOptionChange,
}: ElementExerciseQ) => {
    const generateOptions = (option: string) =>{
        return (
            <div className="flex flex-row justify-start items-center gap-2 ml-2">
              <input type="radio"
              name={id_soal}
              checked={selectedOption === option}
              onChange={() => handleOptionChange(option)}
              value={option}
              ></input>
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
        </div>
      );
};

export default ElementExerciseQ;