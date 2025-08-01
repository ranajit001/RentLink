import { useState } from "react";
import { Upload, Home, MapPin, FileText,  X, Image, Video,IndianRupee } from "lucide-react";
import baseApi from "../../../utils/baseApi";
import { useAuth } from "../../../context/AuthContext";




export const  AddProperty = ()=>  {
  const { auth } = useAuth();
  const [form, setForm] = useState({
    title: '',
    address: '',
    description: '',
    rent: 1000,
    medias: [],
  });

  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'medias')
      setForm({ ...form, medias: Array.from(files) })
    else
      setForm({ ...form, [name]: value })
  };

  const removeMedia = (indexToRemove) => {
    const updatedMedias = form.medias.filter((_, index) => index !== indexToRemove);
    setForm({ ...form, medias: updatedMedias });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    
    const myForm = new FormData();
    myForm.append('title', form.title);
    myForm.append('address', form.address);
    myForm.append('description', form.description);
    myForm.append('rent', form.rent);

    form.medias.forEach(file => { //console.log(file,'fileeee');
    
      myForm.append('medias', file)
    });


    try {
      const response = await fetch(`${baseApi}/api/property/landlord/add`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        },
        body: myForm
      });
      
      if (!response.ok) {
        throw new Error('Failed to add property');
      }
      
      setForm({ title: '', address: '', description: '', rent: 1000, medias: [] });
    } catch (error) { console.log(error);
    
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
      <div className="landlord-add-property-container">
        <h2>Add Property</h2>
        <p className="subtitle">List your property quickly and easily</p>

        <div>
          {/* Title and Rent Row */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <Home className="label-icon" />
                Property Title
              </label>
              <input
                id="landlord-add-property-title"
                type="text"
                name="title"
                placeholder="Enter property name..."
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <IndianRupee className="label-icon" />
                Monthly Rent
              </label>
              <div className="rent-container">
                <span className="rent-symbol">₹</span>
                <input
                  id="landlord-add-property-rent"
                  type="number"
                  name="rent"
                  placeholder="1000"
                  value={form.rent}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="form-group full-width">
            <label className="form-label">
              <MapPin className="label-icon" />
              Address
            </label>
            <textarea
              id="landlord-add-property-address"
              name="address"
              placeholder="Enter property address..."
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="form-group full-width">
            <label className="form-label">
              <FileText className="label-icon" />
              Description
            </label>
            <textarea
              id="landlord-add-property-description"
              name="description"
              placeholder="Describe your property..."
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* File Upload */}
          <div className="form-group full-width">
            <label className="form-label">
              <Upload className="label-icon" />
              Photos & Videos
            </label>
            <div className="file-upload-container">
              <input
                id="landlord-add-property-file"
                type="file"
                name="medias"
                accept="image/*,video/*"
                onChange={handleChange}
                required
                multiple
                style={{ display: 'none' }}
              />
              <label htmlFor="landlord-add-property-file" style={{ cursor: 'pointer', display: 'block' }}>
                <Upload className="upload-icon" />
                <div className="upload-text">Click to upload files</div>
                <div className="upload-subtext">Images and videos supported</div>
              </label>
            </div>

            {/* Media Preview */}
            {form.medias.length > 0 && (
              <div className="add-property-preview-container">
                {form.medias.map((file, index) => (
                  <div key={index} className="preview-item">
                    <button
                      type="button"
                      onClick={() => removeMedia(index)}
                      className="remove-btn"
                    >
                      <X size={14} />
                    </button>
                    
                    {file.type.startsWith('image') ? (
                      <>
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt="preview" 
                          className="preview-media"
                        />
                        <div className="media-badge">
                          <Image className="badge-icon" />
                          IMG
                        </div>
                      </>
                    ) : (
                      <>
                        <video 
                          controls 
                          className="preview-media"
                        >
                          <source src={URL.createObjectURL(file)} type={file.type} />
                        </video>
                        <div className="media-badge">
                          <Video className="badge-icon" />
                          VID
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={handleSubmit} 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Listing Property...' : 'List Property'}
          </button>
        </div>

        {err && <div className="error-message">{err}</div>}
              <style>{`
        .landlord-add-property-container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .landlord-add-property-container h2 {
          text-align: center;
          color: #1f2937;
          margin-bottom: 8px;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .subtitle {
          text-align: center;
          color: #6b7280;
          margin-bottom: 24px;
          font-size: 0.9rem;
        }

        .form-row {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }

        .form-group {
          flex: 1;
          min-width: 0;
        }

        .form-group.full-width {
          width: 100%;
        }

        .form-label {
          display: flex;
          align-items: center;
          font-size: 0.85rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 6px;
        }

        .label-icon {
          width: 14px;
          height: 14px;
          margin-right: 6px;
          color: #6366f1;
        }

        #landlord-add-property-title,
        #landlord-add-property-address,
        #landlord-add-property-description,
        #landlord-add-property-rent,
        #landlord-add-property-file {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.9rem;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        #landlord-add-property-title:focus,
        #landlord-add-property-address:focus,
        #landlord-add-property-description:focus,
        #landlord-add-property-rent:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
        }

        #landlord-add-property-address {
          resize: vertical;
          min-height: 60px;
        }

        #landlord-add-property-description {
          resize: vertical;
          min-height: 80px;
        }

        .rent-container {
          position: relative;
        }

        .rent-symbol {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
          font-weight: 500;
        }

        #landlord-add-property-rent {
          padding-left: 28px;
        }

        .file-upload-container {
          border: 2px dashed #d1d5db;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          transition: border-color 0.2s ease;
          cursor: pointer;
        }

        .file-upload-container:hover {
          border-color: #6366f1;
        }

        .upload-icon {
          width: 32px;
          height: 32px;
          color: #9ca3af;
          margin: 0 auto 8px;
        }

        .upload-text {
          font-size: 0.9rem;
          color: #374151;
          margin-bottom: 4px;
        }

        .upload-subtext {
          font-size: 0.75rem;
          color: #6b7280;
        }

        .add-property-preview-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 12px;
          margin-top: 12px;
        }

        .preview-item {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          aspect-ratio: 1;
          background: #f3f4f6;
        }

        .preview-item:hover .remove-btn {
          opacity: 1;
        }

        .remove-btn {
          position: absolute;
          top: 4px;
          right: 4px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 1;
        }

        .remove-btn:hover {
          background: #dc2626;
        }

        .preview-media {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .media-badge {
          position: absolute;
          bottom: 4px;
          left: 4px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.7rem;
          display: flex;
          align-items: center;
        }

        .badge-icon {
          width: 10px;
          height: 10px;
          margin-right: 2px;
        }

        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 8px;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .error-message {
          background: #fef2f2;
          color: #dc2626;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 0.9rem;
          margin-top: 12px;
          border-left: 3px solid #ef4444;
        }

        /* Responsive Design */
        @media (max-width: 640px) {
          .landlord-add-property-container {
            margin: 10px;
            padding: 16px;
          }

          .form-row {
            flex-direction: column;
            gap: 12px;
          }

          .landlord-add-property-container h2 {
            font-size: 1.3rem;
          }

          .add-property-preview-container {
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            gap: 8px;
          }

          .file-upload-container {
            padding: 16px;
          }
        }

        @media (max-width: 480px) {
          .landlord-add-property-container {
            margin: 5px;
            padding: 12px;
          }

          .add-property-preview-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
      </div>
  );
}