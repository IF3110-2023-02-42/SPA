import PrevButtonLogo from "../assets/button-previous.png";
import NextButtonLogo from "../assets/button-next.png";

type PaginationProps = {
  maxPage: number;
  currentPage: number;
  callback: (dest: number) => void;
};

type ButtonProps = {
  pageNumber: number;
  currentPage: number;
  callback: (dest: number) => void;
};

const Pagination = ({ maxPage, currentPage, callback }: PaginationProps) => {
  return (
    <div className="flex flex-row justify-center items-center gap-2 z-[100] mt-2">
      <button onClick={() => callback(currentPage - 1)}>
        <img src={PrevButtonLogo} className="w-[30px] aspect-square" />
      </button>
      <div className="flex flex-row justify-center items-center gap-1">
        <ButtonList
          maxPage={maxPage}
          currentPage={currentPage}
          callback={callback}
        />
      </div>
      <button onClick={() => callback(currentPage + 1)}>
        <img src={NextButtonLogo} className="w-[30px] aspect-square" />
      </button>
    </div>
  );
};

const ButtonList = ({ maxPage, currentPage, callback }: PaginationProps) => {
  if (maxPage < 5) {
    return (
      <>
        {generateRangeArray(1, maxPage).map((num: number) => (
          <PaginationButton
            currentPage={currentPage}
            callback={callback}
            pageNumber={num}
            key={num}
          />
        ))}
      </>
    );
  } else {
    if (maxPage - currentPage <= 2) {
      return (
        <>
          {generateRangeArray(maxPage - 4, maxPage).map((num: number) => (
            <PaginationButton
              currentPage={currentPage}
              callback={callback}
              pageNumber={num}
              key={num}
            />
          ))}
        </>
      );
    } else if (currentPage <= 2) {
      return (
        <>
          {generateRangeArray(1, 5).map((num: number) => (
            <PaginationButton
              currentPage={currentPage}
              callback={callback}
              pageNumber={num}
              key={num}
            />
          ))}
        </>
      );
    } else {
      return (
        <>
          {generateRangeArray(currentPage - 2, currentPage + 2).map(
            (num: number) => (
              <PaginationButton
                currentPage={currentPage}
                callback={callback}
                pageNumber={num}
                key={num}
              />
            )
          )}
        </>
      );
    }
  }
};

const PaginationButton = ({
  currentPage,
  callback,
  pageNumber,
}: ButtonProps) => {
  return (
    <button
      className={`
        ${currentPage === pageNumber ? "opacity-[1]" : "opacity-[0.8]"}
    w-[30px] aspect-square text-white bg-purpleBg rounded-sm`}
      onClick={() => {
        callback(pageNumber);
      }}
    >
      {pageNumber}
    </button>
  );
};

function generateRangeArray(low: number, high: number): number[] {
  const result: number[] = [];

  for (let i = low; i <= high; i++) {
    result.push(i);
  }

  return result;
}

export default Pagination;
