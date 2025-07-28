const Action = ({ currentPage, setCurrentPage, totalPages }) => {
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex justify-between mt-8 gap-6">
      <button
        onClick={handlePrev}
        disabled={(currentPage === 1)}
        className="p-4 bg-[#0F0D23] disabled:opacity-30 cursor-pointer hover:bg-[#726da9]"
      >
        <img src="/left-arrow.svg" alt="left-arrow" />
      </button>
      <span className="text-white font-bold">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={(currentPage === totalPages)}
        className="p-4 bg-[#0F0D23] disabled:opacity-30 cursor-pointer hover:bg-[#726da9]"
      >
        <img src="/right-arrow.svg" alt="right-arrow" />
      </button>
    </div>
  );
};

export default Action;
