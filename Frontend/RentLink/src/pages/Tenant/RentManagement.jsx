import baseApi from "../../utils/baseApi";
import { useAuth } from "../../context/AuthContext";
import React, { useEffect, useState } from "react";
import { BadgeCheck, XCircle, IndianRupee, CalendarDays, Home, MapPin, CreditCard } from "lucide-react";

export const RentManagement = () => {
  const { auth } = useAuth();
  const [rents, setRents] = useState([]);

  const fetchRents = async () => {
    try {
      const res = await fetch(`${baseApi}/api/rent/tenant`, {
        method: "GET",
        headers: { Authorization: `bearer ${auth.accessToken}` }
      });
      const data = await res.json(); console.log(data);
      
      setRents(data);
    } catch (error) {
      console.error("Error fetching rents:", error);
    }
  };

  const handlePay = async (id) => {
    try {
      const res = await fetch(`${baseApi}/api/rent/tenant/pay/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${auth.accessToken}` }
      });
      if (res.ok) fetchRents();
    } catch (error) {
      console.error("Error marking rent as paid:", error);
    }
  };

  useEffect(() => { fetchRents(); }, []);

  const paidRents = rents.filter((rent) => rent.status === "paid");
  const pendingRents = rents.filter((rent) => rent.status === "pending");

  return (
    <div className="rent-container">
      <h2>Pending Rents</h2>
      <div className="rent-list">
        {pendingRents.map((rent) => (
          <div key={rent._id} className="rent-card compact pending">
            <div className="img-col">
              {rent.propertyId?.medias && rent.propertyId.medias.length > 0 ? (
                <img
                  src={rent.propertyId.medias[0]}
                  alt={rent.propertyId.title}
                  className="rent-img"
                />
              ) : (
                <div className="rent-img no-img">
                  <XCircle color="#999" size={40} />
                </div>
              )}
            </div>
            <div className="info-col">
              <div className="rent-title-row">
                <Home size={16} style={{ marginRight: 5 }} />
                <span className="rent-title">
                  {rent.propertyId?.title || "Property"}
                </span>
              </div>
              <div className="rent-row">
                <MapPin size={15} />
                <span>{rent.propertyId?.address}</span>
              </div>
              <div className="rent-row">
                <CalendarDays size={15} />
                <span>Due: {new Date(rent.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="rent-row">
                <IndianRupee size={14} />
                <span>₹{rent.rent}</span>
              </div>
            </div>
            <div className="action-col">
              <button
                className="pay-btn"
                onClick={() => handlePay(rent._id)}
                title="Pay Now"
              >
                <CreditCard size={18} /> Pay
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2>Paid Rents</h2>
      <div className="rent-list">
        {paidRents.map((rent) => (
          <div key={rent._id} className="rent-card compact paid">
            <div className="img-col">
              {rent.propertyId?.medias && rent.propertyId.medias.length > 0 ? (
                <img
                  src={rent.propertyId.medias[0]}
                  alt={rent.propertyId.title}
                  className="rent-img"
                />
              ) : (
                <div className="rent-img no-img">
                  <BadgeCheck color="#27ce88" size={40} />
                </div>
              )}
            </div>
            <div className="info-col">
              <div className="rent-title-row">
                <Home size={16} style={{ marginRight: 5 }} />
                <span className="rent-title">
                  {rent.propertyId?.title || "Property"}
                </span>
              </div>
              <div className="rent-row">
                <MapPin size={15} />
                <span>{rent.propertyId?.address}</span>
              </div>
              <div className="rent-row">
                <CalendarDays size={15} />
                <span>Paid: {new Date(rent.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="rent-row">
                <IndianRupee size={14} />
                <span>₹{rent.rent}</span>
              </div>
            </div>
            <div className="action-col paid-check">
              <BadgeCheck color="#27ce88" size={22} title="Paid" />
            </div>
          </div>
        ))}
      </div>
      <style>{`.rent-container {
  max-width: 700px;
  margin: 0 auto;
  padding-top: 24px;
}

.rent-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
}

.rent-card.compact {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 8px rgba(40,40,80,0.08);
  padding: 10px 12px;
  gap: 12px;
  min-height: 90px;
  transition: box-shadow 0.2s;
}

.rent-card.compact.paid {
  border-left: 4px solid #27ce88;
  background: #f5fef8;
}

.rent-card.compact.pending {
  border-left: 4px solid #b2003bff;
}

.img-col {
  width: 58px;
  height: 58px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  background: #f7f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rent-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 7px;
}

.no-img {
  background: #f0f0f0;
  justify-content: center;
  align-items: center;
  display: flex;
  color: #bbb;
}

.info-col {
  flex: 2;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.rent-title-row {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  color: #262b36;
  gap: 4px;
}

.rent-row {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #575f6e;
}

.action-col {
  flex: 0 0 76px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.pay-btn {
  border: none;
  background: linear-gradient(90deg, #ff2828c9 0%, #b9003ec6 100%);
  color: #2b2c2f;
  border-radius: 7px;
  padding: 7px 16px;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 10px rgba(255,199,18,.11);
  cursor: pointer;
  transition: background 0.2s;
}

.pay-btn:hover {
  background: #009d478d;
}

.paid-check {
  justify-content: center;
}

/* Responsive */
@media (max-width: 600px) {
  .rent-card.compact { flex-direction: column; gap: 5px; min-height: unset; }
  .info-col { gap: 1px; }
  .img-col { width: 98%; height: 120px; }
  .action-col { justify-content: flex-start; margin-top: 6px;}
}
`}</style>
    </div>
  );
};

export default RentManagement;

