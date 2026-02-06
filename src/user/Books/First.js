import React, { useContext, useEffect, useState } from "react";
import "./First.css";
import BookComponent from "./BookComponent";
import axios from "axios";
import _ from "lodash";
import { MyContext } from "../../ContextAPI/MyContext";

const First = () => {
  const { setNav, data, setData, setpagy, setUser } = useContext(MyContext);

  // Filter and sort states
  const [filters, setFilters] = useState({
    query: "",
    genre: "all",
    author: "all",
    minRating: "",
    maxRating: "",
    minPages: "",
    maxPages: "",
    minYear: "",
    maxYear: "",
    sortBy: "rating-high",
    page: 1,
  });

  const [filterOptions, setFilterOptions] = useState({
    genres: [],
    authors: [],
    yearRange: { min: 1900, max: 2024 },
  });

  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch filter options on mount
  useEffect(() => {
    setpagy(true);
    setNav(true);

    // Fetch initial books
    fetchBooks(filters);

    // Fetch filter options
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/books/filters`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setFilterOptions(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  }, [setNav, setUser, setpagy]);

  // Fetch books with filters and sorting
  const fetchBooks = async (filterParams) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/books/search`,
        filterParams,
        { withCredentials: true },
      );

      if (response.data.success) {
        setData(response.data.data);
        setTotalBooks(response.data.pagination.total);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Handle search input
  const handleInput = _.debounce(async (e) => {
    let inputValue = e.target.value;
    const newFilters = { ...filters, query: inputValue, page: 1 };
    setFilters(newFilters);
    fetchBooks(newFilters);
  }, 500);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Apply filters
  const applyFilters = () => {
    const newFilters = { ...filters, page: 1 };
    setFilters(newFilters);
    fetchBooks(newFilters);
    setShowFilters(false);
  };

  // Clear filters
  const clearFilters = () => {
    const resetFilters = {
      ...filters,
      genre: "all",
      author: "all",
      minRating: "",
      maxRating: "",
      minPages: "",
      maxPages: "",
      minYear: "",
      maxYear: "",
      page: 1,
    };
    setFilters(resetFilters);
    fetchBooks(resetFilters);
  };

  // Handle sort change
  const handleSortChange = (sortOption) => {
    const newFilters = { ...filters, sortBy: sortOption, page: 1 };
    setFilters(newFilters);
    fetchBooks(newFilters);
    setShowSort(false);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    const newFilters = { ...filters, page: newPage };
    setFilters(newFilters);
    fetchBooks(newFilters);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="first">
      <h2>
        Embark on a literary journey across the globe! Explore a world of
        knowledge, imagination, and stories waiting to be discovered. Use the
        search bar below to delve into an extensive collection of books from
        every corner of the world.
      </h2>

      {/* Search and Filter Bar */}
      <div className="search-filter-container">
        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Enter a book name..."
            name="input"
            onInput={handleInput}
            className="search-input"
          />

          <button
            className={`filter-toggle-btn ${showFilters ? "active" : ""}`}
            onClick={() => {
              setShowFilters(!showFilters);
              setShowSort(false);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M2 4h16M4 10h12M7 16h6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Filters
          </button>

          <button
            className={`sort-toggle-btn ${showSort ? "active" : ""}`}
            onClick={() => {
              setShowSort(!showSort);
              setShowFilters(false);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M6 9l4-4 4 4M6 15l4-4 4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Sort
          </button>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div className="filters-panel">
            <div className="filters-grid">
              {/* Genre Filter */}
              <div className="filter-group">
                <label className="filter-label">Genre</label>
                <select
                  value={filters.genre}
                  onChange={(e) => handleFilterChange("genre", e.target.value)}
                  className="filter-select"
                  onFocus={() => {
                    window.scrollBy(0, 150);
                  }}
                >
                  <option value="all">All Genres</option>
                  {filterOptions.genres.map((genre, index) => (
                    <option key={index} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Author Filter */}
              <div className="filter-group">
                <label className="filter-label">Author</label>
                <select
                  value={filters.author}
                  onChange={(e) => handleFilterChange("author", e.target.value)}
                  className="filter-select"
                  onFocus={() => {
                    window.scrollBy(0, 150);
                  }}
                >
                  <option value="all">All Authors</option>
                  {filterOptions.authors.map((author, index) => (
                    <option key={index} value={author}>
                      {author}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Range */}
              <div className="filter-group">
                <label className="filter-label">Rating</label>
                <div className="range-inputs">
                  <input
                    type="number"
                    placeholder="Min"
                    min="0"
                    max="5"
                    step="0.1"
                    value={filters.minRating}
                    onChange={(e) =>
                      handleFilterChange("minRating", e.target.value)
                    }
                    className="range-input"
                  />
                  <span className="range-separator">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    min="0"
                    max="5"
                    step="0.1"
                    value={filters.maxRating}
                    onChange={(e) =>
                      handleFilterChange("maxRating", e.target.value)
                    }
                    className="range-input"
                  />
                </div>
              </div>

              {/* Page Count Range */}
              <div className="filter-group">
                <label className="filter-label">Pages</label>
                <div className="range-inputs">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPages}
                    onChange={(e) =>
                      handleFilterChange("minPages", e.target.value)
                    }
                    className="range-input"
                  />
                  <span className="range-separator">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPages}
                    onChange={(e) =>
                      handleFilterChange("maxPages", e.target.value)
                    }
                    className="range-input"
                  />
                </div>
              </div>

              {/* Publication Year Range */}
              <div className="filter-group">
                <label className="filter-label">Publication Year</label>
                <div className="range-inputs">
                  <input
                    type="number"
                    placeholder="Min"
                    min={filterOptions.yearRange.min}
                    max={filterOptions.yearRange.max}
                    value={filters.minYear}
                    onChange={(e) =>
                      handleFilterChange("minYear", e.target.value)
                    }
                    className="range-input"
                  />
                  <span className="range-separator">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    min={filterOptions.yearRange.min}
                    max={filterOptions.yearRange.max}
                    value={filters.maxYear}
                    onChange={(e) =>
                      handleFilterChange("maxYear", e.target.value)
                    }
                    className="range-input"
                  />
                </div>
              </div>
            </div>

            <div className="filter-actions">
              <button className="btn-clear" onClick={clearFilters}>
                Clear All
              </button>
              <button className="btn-apply" onClick={applyFilters}>
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Sort Options Panel */}
        {showSort && (
          <div className="sort-panel">
            <div className="sort-options">
              <button
                className={`sort-option ${filters.sortBy === "rating-high" ? "active" : ""}`}
                onClick={() => handleSortChange("rating-high")}
              >
                ⭐ Highest Rated
              </button>
              <button
                className={`sort-option ${filters.sortBy === "rating-low" ? "active" : ""}`}
                onClick={() => handleSortChange("rating-low")}
              >
                ⭐ Lowest Rated
              </button>
              <button
                className={`sort-option ${filters.sortBy === "newest" ? "active" : ""}`}
                onClick={() => handleSortChange("newest")}
              >
                🕐 Newest First
              </button>
              <button
                className={`sort-option ${filters.sortBy === "oldest" ? "active" : ""}`}
                onClick={() => handleSortChange("oldest")}
              >
                🕐 Oldest First
              </button>
              <button
                className={`sort-option ${filters.sortBy === "alphabetical-asc" ? "active" : ""}`}
                onClick={() => handleSortChange("alphabetical-asc")}
              >
                🔤 A to Z
              </button>
              <button
                className={`sort-option ${filters.sortBy === "alphabetical-desc" ? "active" : ""}`}
                onClick={() => handleSortChange("alphabetical-desc")}
              >
                🔤 Z to A
              </button>
              <button
                className={`sort-option ${filters.sortBy === "most-popular" ? "active" : ""}`}
                onClick={() => handleSortChange("most-popular")}
              >
                📊 Most Popular
              </button>
            </div>
          </div>
        )}

        {/* Results Info */}
        <div className="results-info">
          <span>
            {totalBooks === 0
              ? "No results found"
              : `Showing ${(filters.page - 1) * 12 + 1}-${Math.min(filters.page * 12, totalBooks)} of ${totalBooks} books`}
          </span>
        </div>
      </div>

      {/* Books Grid */}
      <BookComponent
        data={data}
        currentPage={filters.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default First;
