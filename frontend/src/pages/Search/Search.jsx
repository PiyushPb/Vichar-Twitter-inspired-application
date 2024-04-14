import React, { useEffect, useState } from "react";
import SearchBar from "../../components/Search/SearchBar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { backend_url } from "../../config/config";
import axios from "axios"; // Add this import
import SearchCard from "../../components/Search/SearchCard";

const Search = () => {
  const [searchData, setSearchData] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    try {
      if (searchData.trim() !== "") {
        axios
          .get(`${backend_url}/v1/user/searchUser/${searchData}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            if (response.data) {
              setSearchResults(response.data.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching search results:", error);
          });
      }
    } catch (error) {
      console.error("Error in handleSearch:", error);
    }
  };

  useEffect(() => {
    const handleSearchQuery = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => {
      clearTimeout(handleSearchQuery);
    };
  }, [searchData]);

  const handleSearchInputChange = (e) => {
    setSearchData(e.target.value);
  };

  return (
    <div className="h-screen w-full p-5">
      <div className="relative">
        <SearchBar
          searchData={searchData}
          setSearchData={setSearchData}
          handleSearch={handleSearch}
          handleSearchInputChange={handleSearchInputChange}
        />

        {searchResults && searchResults.length > 0 ? (
          <div className="mt-5">
            {searchResults.map((user) => (
              <Link to={`/${user.username}`} key={user._id}>
                <SearchCard user={user} />
              </Link>
            ))}
          </div>
        ) : (
          <h1 className="mt-5 text-textLight dark:textDark">
            Type something to search...
          </h1>
        )}
      </div>
    </div>
  );
};

export default Search;
