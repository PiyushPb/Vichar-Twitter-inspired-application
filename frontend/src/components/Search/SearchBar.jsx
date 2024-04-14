import React from "react";
import SearchIcon from "../../assets/HeaderIcons/Search.svg";

const SearchBar = ({
  searchData,
  setSearchData,
  handleSearch,
  handleSearchInputChange,
}) => {
  return (
    <div className="w-full px-4 py-3 bg-white rounded-lg shadow-md dark:shadow-2xl dark:shadow-textLight dark:bg-bgDark border-[1px] flex justify-center items-center gap-2 border-lg border-solid border-gray-300 dark:border-darkBorderColor">
      <img src={SearchIcon} alt="" className="w-[20px] h-[20px]" />
      <input
        type="text"
        className="w-full outline-none text-textLight dark:text-textDark bg-white dark:bg-bgDark"
        placeholder="Search..."
        value={searchData}
        onChange={handleSearchInputChange}
      />
    </div>
  );
};

export default SearchBar;
