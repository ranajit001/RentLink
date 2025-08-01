import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import baseApi from '../../utils/baseApi';
import { User, Mail, Phone, CalendarDays, BadgeCheck, XCircle, Home } from "lucide-react";

export const RentOverview = () => {
  const { auth } = useAuth();
  const [overview, setOverview] = useState([]);
  const [error, setError] = useState('');


  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const months = [
    { value: 1, label: 'January' }, { value: 2, label: 'February' }, { value: 3, label: 'March' },
    { value: 4, label: 'April' }, { value: 5, label: 'May' }, { value: 6, label: 'June' },
    { value: 7, label: 'July' }, { value: 8, label: 'August' }, { value: 9, label: 'September' },
    { value: 10, label: 'October' }, { value: 11, label: 'November' }, { value: 12, label: 'December' }
  ];


  const currentYear = new Date().getFullYear();
  const yearRange = [];
  for (let y = 2000; y <= currentYear + 5; y++) {
    yearRange.push(y);
  }

  useEffect(() => {
    const fetchRents = async () => {
      try {
        const queryParams = new URLSearchParams({
          month: month.toString(),
          year: year.toString(),
        });

        const res = await fetch(`${baseApi}/api/rent/landlord/rent-records?${queryParams.toString()}`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || 'Failed to fetch rent data');
        }

        const data = await res.json();
        setOverview(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchRents();
  }, [auth.accessToken, month, year]);

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="rent-overview-container">
      <h2 style={{ fontSize: '2rem', textAlign: 'center', fontWeight: '700' }}>Rent records</h2>

      {/* Filter Row */}
      <div className="filter-row" style={{ maxWidth: 440, margin: '20px auto', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <label className="filter-label">
          Month:
          <select
            className="filter-select"
            value={month}
            onChange={e => setMonth(Number(e.target.value))}
            style={{ marginLeft: 8, padding: '6px 10px', borderRadius: 6, border: '1px solid #dbe7fd', background: '#f9fbff', cursor: 'pointer' }}
          >
            {months.map(m => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </label>

        <label className="filter-label">
          Year:
          <select
            className="filter-select"
            value={year}
            onChange={e => setYear(Number(e.target.value))}
            style={{ marginLeft: 8, padding: '6px 10px', borderRadius: 6, border: '1px solid #dbe7fd', background: '#f9fbff', cursor: 'pointer' }}
          >
            {yearRange.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Rent Overview List */}
      {overview.map((property) => (
        <div key={property._id} className="property-card">
          <div className="property-header">
            <Home className="icon-mr" size={22} strokeWidth={2.2} />
            <span className="property-title">{property.title}</span>
          </div>
          <div className="property-address">{property.address}</div>

          <table className="tenant-table">
            <thead>
              <tr>
                <th><User size={17} className="icon-th" />Tenant</th>
                <th><Phone size={17} className="icon-th" />Contact</th>
                <th><Mail size={17} className="icon-th" />Email</th>
                <th><CalendarDays size={17} className="icon-th" />Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {property.tenants.map((tenant, i) => (
                <tr key={i}>
                  <td>{tenant.name}</td>
                  <td>{tenant.contactInfo}</td>
                  <td>{tenant.email}</td>
                  <td>{new Date(tenant.dueDate).toLocaleDateString()}</td>
                  <td>
                    {tenant.status === 'paid' ? (
                      <span className="status-paid">
                        <BadgeCheck size={17} className="icon-status" /> Paid
                      </span>
                    ) : (
                      <span className="status-pending">
                        <XCircle size={17} className="icon-status" /> Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="property-income">
            Income: <span className="income-main">₹{property.actualincome}</span>
            <span className="income-divider">/</span>
            <span className="income-sub">₹{property.totalExpectedIncome}</span>
          </div>
        </div>
      ))}

      {/* Your existing style block (or CSS import) */}
      <style>{`
        .rent-overview-container {
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 36px;
          background: #f8fafc;
        }
        .property-card {
          border: 1px solid #e7eaee;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(40,60,80,0.06);
          padding: 24px 22px 20px 22px;
          background: #fff;
          max-width: 820px;
          width: 100%;
          margin: 0 auto;
          transition: box-shadow 0.18s;
        }
        .property-card:hover {
          box-shadow: 0 4px 20px rgba(49, 77, 115, 0.12);
          border-color: #dde6fa;
        }
        .property-header {
          display: flex;
          align-items: center;
        }
        .icon-mr {
          margin-right: 7px;
          color: #4475e4;
        }
        .property-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #223953;
        }
        .property-address {
          font-size: 1.02rem;
          line-height: 1.4;
          color: #5e6e88;
          margin-bottom: 13px;
          margin-top: 1px;
        }
        .tenant-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          background: #f9fafb;
          border-radius: 7px;
          overflow: hidden;
          box-shadow: 0 1px 1px rgba(100,100,100,0.02);
          margin-bottom: 2px;
          margin-top: 10px;
        }
        .tenant-table th, .tenant-table td {
          padding: 10px 11px;
          border-bottom: 1px solid #e7eaee;
          font-size: 15px;
        }
        .tenant-table th {
          background: #f1f7fb;
          font-weight: 600;
          color: #425a79;
          text-align: left;
          vertical-align: middle;
        }
        .icon-th {
          margin-right: 6px;
          vertical-align: text-bottom;
          color: #7ca4e8;
        }
        .tenant-table tbody tr:last-child td {
          border-bottom: none;
        }
        .tenant-table td {
          background: none;
          color: #3a4251;
        }
        .status-paid {
          color: #218838;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .status-pending {
          color: #c82333;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .icon-status {
          vertical-align: middle;
        }
        .property-income {
          text-align: right;
          margin-top: 15px;
          font-weight: 500;
          font-size: 1.05rem;
          color: #315d99;
          letter-spacing: .2px;
        }
        .income-main { color: #25b26e; font-weight: bold; }
        .income-divider { color: #b9c2e6; margin: 0 3px; font-weight: 400; }
        .income-sub { color: #b68b2f; }
        .error {
          color: #c82333;
          margin: 24px;
          font-weight: bold;
          text-align: center;
          font-size: 18px;
        }
        /* Filter row styling */
        .filter-row {
          display: flex;
          align-items: center;
          margin-bottom: 24px;
          gap: 16px;
          background: #f4f6fc;
          padding: 12px 20px;
          border-radius: 8px;
          max-width: 440px;
          box-shadow: 0 1px 5px rgba(100,120,180,0.07);
          margin-left: auto;
          margin-right: auto;
        }
        .filter-label {
          font-weight: 500;
          color: #315385;
          letter-spacing: 0.2px;
          font-size: 15px;
        }
        .filter-select {
          margin-left: 8px;
          width: 130px;
          padding: 6px 8px;
          font-size: 15px;
          border: 1px solid #dbe7fd;
          border-radius: 6px;
          outline: none;
          background: #f9fbff;
          color: #20437a;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .filter-select:hover, .filter-select:focus {
          border-color: #6494dd;
          background: #fff;
        }
        @media (max-width: 600px) {
          .property-card { padding: 11px; }
          .rent-overview-container { padding: 7px; gap: 18px; }
          .tenant-table th, .tenant-table td { font-size: 13.5px; padding: 7px 4px; }
          .property-title { font-size: 1rem; }
          .filter-row {
            flex-direction: column;
            max-width: 280px;
            gap: 10px;
          }
          .filter-select {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default RentOverview;
