import PropTypes from "prop-types";

// export const Quantity = () => {
//   return (
//     <>
//       <button
//         type="button"
//         className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
//         onClick={() => handleQtyChange(product.id, product.qty - 1)}
//       >
//         -
//       </button>
//       <span className="h-8 w-14 rounded border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none">
//         {product?.qty}
//       </span>
//       <button
//         type="button"
//         className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
//         onClick={() => handleQtyChange(product.id, product.qty + 1)}
//       >
//         +
//       </button>{" "}
//     </>
//   );
// };

export const Search = ({ setSearch }) => {
  return (
    <div className="relative">
      <label className="sr-only" htmlFor="search">
        {" "}
        Search{" "}
      </label>

      <input
        className="h-10 w-full rounded-full border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-56 focus:ring-[#0D9488]"
        id="search"
        type="search"
        placeholder="Search product..."
        onChange={setSearch}
      />

      <button
        type="button"
        className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
      >
        <span className="sr-only">Search</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
};

Search.propTypes = {
  setSearch: PropTypes.func,
};
