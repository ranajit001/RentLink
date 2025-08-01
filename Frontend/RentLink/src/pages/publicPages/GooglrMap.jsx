// import React, { useEffect, useRef, useState } from "react";

// export const MyGoogleMap = () => {
//   const mapRef = useRef(null);
//   const [mapType, setMapType] = useState("roadmap");
//   const [currentLocation, setCurrentLocation] = useState({ lat: 22.5726, lng: 88.3639 });
//   const [map, setMap] = useState(null);
//   const [markers, setMarkers] = useState([]);
//   const [polyline, setPolyline] = useState(null);

//   // Initialize map
//   useEffect(() => {
//     const initMap = () => {
//       const m = new window.google.maps.Map(mapRef.current, {
//         center: currentLocation,
//         zoom: 14,
//         mapTypeId: mapType,
//       });

//       // On map click, place marker
//       m.addListener("click", (e) => {
//         const marker = new window.google.maps.Marker({
//           position: e.latLng,
//           map: m,
//         });

//         setMarkers((prev) => {
//           const updated = [...prev, marker];

//           // If two markers, draw direction line
//           if (updated.length === 2) {
//             drawDirectionLine(updated[0].getPosition(), updated[1].getPosition(), m);
//           }

//           return updated;
//         });
//       });

//       setMap(m);
//     };

//     if (window.google && window.google.maps) {
//       initMap();
//     } else {
//       const interval = setInterval(() => {
//         if (window.google && window.google.maps) {
//           clearInterval(interval);
//           initMap();
//         }
//       }, 300);
//     }
//   }, [mapType]);

//   // Draw polyline between two points
//   const drawDirectionLine = (start, end, m) => {
//     if (polyline) polyline.setMap(null);

//     const newPolyline = new window.google.maps.Polyline({
//       path: [start, end],
//       geodesic: true,
//       strokeColor: "#FF0000",
//       strokeOpacity: 1.0,
//       strokeWeight: 2,
//     });

//     newPolyline.setMap(m);
//     setPolyline(newPolyline);
//   };

//   // Get current location button handler
//   const handleCurrentLocation = () => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         const position = { lat: latitude, lng: longitude };
//         setCurrentLocation(position);
//         map.setCenter(position);

//         new window.google.maps.Marker({
//           position,
//           map,
//           title: "You are here",
//           icon: {
//             url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
//           },
//         });
//       },
//       () => {
//         alert("Location access denied.");
//       }
//     );
//   };

//   return (
//     <div>
//       <div style={{ marginBottom: "10px" }}>
//         <button onClick={handleCurrentLocation}>📍 Get Current Location</button>
//         <select onChange={(e) => setMapType(e.target.value)} value={mapType} style={{ marginLeft: "10px" }}>
//           <option value="roadmap">Roadmap</option>
//           <option value="satellite">Satellite</option>
//           <option value="hybrid">Hybrid</option>
//           <option value="terrain">Terrain</option>
//         </select>
//       </div>

//       <div ref={mapRef} style={{ height: "500px", width: "100%" }} />
//     </div>
//   );
// };
