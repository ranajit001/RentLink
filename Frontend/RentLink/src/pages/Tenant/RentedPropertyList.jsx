import { useEffect,useState } from "react";
import { useAuth } from "../../context/AuthContext"
import baseApi from "../../utils/baseApi";

export const RentedProperty = () => {
  const { auth } = useAuth();
  const [state, setState] = useState({
    proparties: [],
    error: null,
    loading: false,
  });

  useEffect(() => {
    const fetchAssignedProparties = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true }));
        const res = await fetch(`${baseApi}/api/property/tenant/rented-properties`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
        const data = await res.json();
        setState((prev) => ({ ...prev, loading: false, proparties: data.properties }));
      } catch (error) {
        console.log(error);
        setState((prev) => ({ ...prev, error: error.message, loading: false }));
      }
    };

    fetchAssignedProparties();
  }, [auth.accessToken]);

  if (state.loading) return <h2 className="loading-text">Loading...</h2>;
  if (state.error) return <h1 className="error-text">{state.error}</h1>;

  return (
    <div className="rented-container">
      {state.proparties.length === 0 ? (
        <h2 className="no-data">No data to show</h2>
      ) : (
        <div className="property-grid">
          {state.proparties.map((el, ind) => (
            <div className="property-card" key={ind}>
              <div><img src={el.medias[0]} alt="" /></div>
              <h2>{el.title}</h2>
              <p><strong>Location:</strong> {el.address}</p>
              <p><strong>Rent:</strong> ₹{el.rent}</p>
              <h2>Land Lord</h2>
              {/* <p><strong>Payment Status:</strong> Pending</p> */}
              <p><strong>Name:</strong> {el.landlordId?.name}</p>
              <p><strong>Contact:</strong> {el.landlordId?.contactInfo}</p>
            </div>
          ))}
        </div>
      )}
 <style>{`
  .rented-container {
    padding: 2rem;
    background-color: #f9f9f9;
    min-height: 100vh;
  }

  .loading-text,
  .error-text,
  .no-data {
    text-align: center;
    color: #333;
    font-size: 1.5rem;
    margin-top: 3rem;
  }

  .property-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .property-card {
    background-color: #ffffff;
        border:1px solid;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    display: flex;
    flex-direction: column;
  }

  .property-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  }

  .property-card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }

  .property-card h2 {
    font-size: 1.2rem;
    margin: 1rem;
    color: #2c3e50;
  }

  .property-card p {
    font-size: 0.95rem;
    margin: 0 1rem 0.5rem;
    color: #555;
  }

  .property-card strong {
    color: #2c3e50;
  }

  @media (max-width: 480px) {
    .property-card img {
      height: 150px;
    }

    .property-card h2 {
      font-size: 1rem;
    }

    .property-card p {
      font-size: 0.9rem;
    }
  }
`}</style>

    </div>
  );
};
