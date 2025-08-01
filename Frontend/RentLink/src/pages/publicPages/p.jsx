import { Import, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { PropertyCard } from "../../components/PropertyCard";
import baseApi from "../../utils/baseApi";

export const PublicProductPagepp = () => {

      const initial = {search: "",minRent: "",maxRent: "",sort: "",order: "asc",isRented: "",currentPage: 1,itemsPerPage: 10,};
  const [state, setState] = useState({
    data: [],
    loading: false,
    error: null,
  });

  const [searched, setSearched] = useState(initial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearched((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));

      const response = await fetch(`${baseApi}/api/property`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searched),
      });

      const result = await response.json();
      setState({ data: result.properties, loading: false, error: null });
    } catch (err) {
      setState({ data: [], loading: false, error: err.message });
    }
  };




  useEffect(()=>{handleSearch()},[searched])



  const handleReset = () => {setSearched(initial);};

  return (
    <div className="property-container">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Rent your favourite property</h1>
        <p className="page-subtitle">Discover amazing properties in your area</p>
      </div>

      {/* Search & Filter Section */}
      <div className="search-filter-section">
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search by title, location, or rent..."
            name="search"
            value={searched.search}
            onChange={handleChange}
            className="search-input"
          />
        </div>

        <div className="minrent">
          <div>
            <label htmlFor="minRent">Maximum Rent : </label> 
            <input
              type="number"
              id="minRent"
              name="minRent"
              placeholder="Minimum rent"
              value={searched.minRent}
              onChange={handleChange}
            />

              <label htmlFor="maxRent">Maximum Rent : </label>            
              <input
              type="number"
              id="maxRent"
              name="maxRent"
              placeholder="Maximum rent"
              value={searched.maxRent}
              onChange={handleChange}
            />

            <select name="isRented" value={searched.isRented} onChange={handleChange}>
              <option value="">All properties</option>
              <option value="true">Rented</option>
              <option value="false">Not rented</option>
            </select>

            <button onClick={handleReset}>Reset</button>
            <button onClick={handleSearch}>Apply</button>
          </div>

          <div>
            <label htmlFor="itemsPerPage">Items per page:</label>
              <select
              id="itemsPerPage"
              name="itemsPerPage"
              value={searched.itemsPerPage}
              onChange={handleChange}
            >
              <option value="10">10</option>
              <option value="24">24</option>
              <option value="36">36</option>
              <option value="48">48</option>
            </select>
          </div>
          </div>
         </div>

        {/* Properties Section */}
        <div className="property-card">
          {state.loading ? (
            <p>Loading...</p>
          ) : (
            state.data.map((elem, index) => (
              <PropertyCard  elem={elem} ind={index} />
            ))
          )}
        </div>
     
      
    </div>
  );
};
