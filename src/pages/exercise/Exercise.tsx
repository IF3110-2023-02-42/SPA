import Navbar from "../../components/Navbar";

const Exercise = () => {
  const q = [
    {
      ID_Soal: "1",
      pertanyaan: "question1 question1 question1 question1 question1",
      jawaban_benar: "lorem ipsum t",
      jawaban_salah: ["lorem ipsum", "lorem ipsum", "lorem ipsum"],
    },
    {
      ID_Soal: "2",
      pertanyaan: "question2 question2 question2 question2 question2",
      jawaban_benar: "lorem ipsum t",
      jawaban_salah: ["lorem ipsum", "lorem ipsum", "lorem ipsum"],
    },
  ];

  const qElements = q.map((el) => (
    <div className="w-[90%] bg-[white] flex flex-col ml-[5%] mb-[2%] rounded-[15px] p-[1.5%] text-[#4D2C5E] [box-shadow:rgba(0,_0,_0,_0.15)_1.95px_1.95px_2.6px]">
      <p>{el.pertanyaan}</p>
      <div className="flex flex-row">
        <input
          className="ml-[2%]"
          type="radio"
          name={el.ID_Soal}
          value={el.jawaban_benar}
        ></input>
        <label className="ml-[2%]">{el.jawaban_benar}</label>
      </div>
      <div className="flex flex-row">
        <input
          className="ml-[2%]"
          type="radio"
          name={el.ID_Soal}
          value={el.jawaban_salah[0]}
        ></input>
        <label className="ml-[2%]">{el.jawaban_salah[0]}</label>
      </div>
      <div className="flex flex-row">
        <input
          className="ml-[2%]"
          type="radio"
          name={el.ID_Soal}
          value={el.jawaban_salah[1]}
        ></input>
        <label className="ml-[2%]">{el.jawaban_salah[1]}</label>
      </div>
      <div className="flex flex-row">
        <input
          className="ml-[2%]"
          type="radio"
          name={el.ID_Soal}
          value={el.jawaban_salah[2]}
        ></input>
        <label className="ml-[2%]">{el.jawaban_salah[2]}</label>
      </div>
    </div>
  ));

  return (
    <main>
      <Navbar />
      <body className="h-screen items-center pl-[2.5%] pr-[2.5%] py-[1%] bg-[#fdf8ee] relative">
        <h1 className="text-[#4D2C5E] text-[2rem] font-bold mb-[3%]">
          Exercise
        </h1>
        {qElements}
        <button className="bg-[#4D2C5E] max-w-[fit-content] ml-[5%] mb-[1%] mr-[2%] pb-[0.5%] pt-[0.5%] pr-[3%] pl-[3%] rounded-[15px] border-[none] flex-row [box-shadow:rgba(0,_0,_0,_0.15)_1.95px_1.95px_2.6px] hover:scale-[100%] active:bg-[#30123f]">
          <h3 className="text-[white] text-[1.3rem] font-bold">Submit</h3>
        </button>
      </body>
    </main>
  );
};

export default Exercise;
