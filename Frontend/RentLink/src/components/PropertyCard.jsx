import { MapPin } from "lucide-react";
import { useState } from "react";

export const PropertyCard = ({ elem,ind }) => {
  const [mediaIndex, setMediaIndex] = useState(0);
  const media = elem.medias || [];

  const next = () => setMediaIndex((prev) => (prev + 1) % media.length);
  const prev = () => setMediaIndex((prev) => (prev - 1 + media.length) % media.length);

  const isVideo = (url) => {
    return url.match(/\.(mp4|webm|ogg|mkv)$/i);
  };

  return (
    <div className="property-card-wrapper" key={ind}>
      {/* Media Slider */}
      <div className="media-slider" style={{ position: "relative" }}>
        {media.length > 0 && (
          <>
            {isVideo(media[mediaIndex]) ? (
              <video src={media[mediaIndex]} controls width="100%" />
            ) : (
              <img src={media[mediaIndex]} alt={`property-media-${mediaIndex}`} width="100%" />
            )}

            {media.length > 1 && (
              <div className="slider-controls">
                <button onClick={prev}>◀</button>
                <button onClick={next}>▶</button>
              </div>
            )}
          </>
        )}

        <div className="status-tag">
          {elem.isRented ? "Rented" : "Available"}
        </div>
      </div>

      {/* Property Info */}
      <div className="property-info">
        <h3>{elem.title}</h3>
        <div className="property-address">
          <MapPin size={14} style={{ marginRight: "6px" }} />
          {elem.address}
        </div>
        <p className="property-description">{elem.description}</p>
        <div className="property-rent">${elem.rent.toLocaleString()}/month</div>
        <div className="property-date">
          Listed on {new Date(elem.createdAt).toLocaleDateString()}
        </div>
      </div>
      <style>{`
      /* PropertyCard Component Styles */

.property-card-wrapper {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.1),
    0 20px 40px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

.property-card-wrapper:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 30px 60px rgba(0, 0, 0, 0.1);
}

.property-card-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(102, 126, 234, 0.02));
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

.property-card-wrapper:hover::before {
  opacity: 1;
}

/* Media Slider Styles */
.media-slider {
  position: relative;
  height: 280px;
  overflow: hidden;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
}

.media-slider img,
.media-slider video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.property-card-wrapper:hover .media-slider img,
.property-card-wrapper:hover .media-slider video {
  transform: scale(1.1);
}

/* Slider Controls */
.slider-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 3;
}

.property-card-wrapper:hover .slider-controls {
  opacity: 1;
  pointer-events: auto;
}

.slider-controls button {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.slider-controls button:hover {
  background: white;
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.slider-controls button:active {
  transform: scale(0.95);
}

/* Status Tag */
.status-tag {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  z-index: 2;
  transition: all 0.3s ease;
}

.status-tag.available {
  background: rgba(34, 197, 94, 0.9);
  color: white;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

.status-tag.rented {
  background: rgba(239, 68, 68, 0.9);
  color: white;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

/* Property Info */
.property-info {
  padding: 1.5rem;
  position: relative;
  z-index: 2;
}

.property-info h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.property-card-wrapper:hover .property-info h3 {
  color: #667eea;
}

.property-address {
  display: flex;
  align-items: center;
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  gap: 0.5rem;
}

.property-address svg {
  color: #667eea;
  flex-shrink: 0;
}

.property-description {
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0 0 1.25rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.property-rent {
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.75rem;
  display: block;
}

.property-date {
  color: #94a3b8;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Hover Effects and Animations */
@keyframes slideInFromBottom {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.property-card-wrapper {
  animation: slideInFromBottom 0.6s ease forwards;
}

/* Media Queries for Responsive Design */
@media (max-width: 768px) {
  .property-card-wrapper {
    margin: 0 0.5rem;
  }
  
  .media-slider {
    height: 240px;
  }
  
  .property-info {
    padding: 1.25rem;
  }
  
  .property-info h3 {
    font-size: 1.125rem;
  }
  
  .property-rent {
    font-size: 1.25rem;
  }
  
  .slider-controls {
    padding: 0 0.75rem;
  }
  
  .slider-controls button {
    width: 36px;
    height: 36px;
  }
}

@media (max-width: 480px) {
  .media-slider {
    height: 200px;
  }
  
  .property-info {
    padding: 1rem;
  }
  
  .property-info h3 {
    font-size: 1rem;
  }
  
  .property-rent {
    font-size: 1.125rem;
  }
  
  .property-description {
    font-size: 0.875rem;
    -webkit-line-clamp: 3;
  }
  
  .status-tag {
    top: 0.75rem;
    left: 0.75rem;
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
  }
}

/* Loading and Error States */
.property-card-wrapper.loading {
  background: linear-gradient(90deg, #f0f0f0 25%, transparent 37%, #f0f0f0 63%);
  background-size: 400% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .property-card-wrapper {
    background: #1e293b;
    border-color: #334155;
  }
  
  .property-info h3 {
    color: #f1f5f9;
  }
  
  .property-address {
    color: #94a3b8;
  }
  
  .property-description {
    color: #cbd5e1;
  }
  
  .property-date {
    color: #64748b;
  }
  
  .slider-controls button {
    background: rgba(30, 41, 59, 0.9);
    color: white;
  }
  
  .slider-controls button:hover {
    background: #1e293b;
  }
}

/* Accessibility Improvements */
.property-card-wrapper:focus-within {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

.slider-controls button:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

/* Print Styles */
@media print {
  .property-card-wrapper {
    break-inside: avoid;
    box-shadow: none;
    border: 1px solid #e2e8f0;
  }
  
  .slider-controls {
    display: none;
  }
  
  .status-tag {
    background: #e2e8f0 !important;
    color: #1e293b !important;
  }
}`}</style>
    </div>
  );
};
