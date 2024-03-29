import { useEffect, useRef } from "react";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mapRef.current) {
      const map = new Map({
        basemap: "streets-navigation-vector",
      });

      const view = new MapView({
        map,
        container: mapRef.current,
        center: [69.336241, 41.34226],
        zoom: 12,
      });

      return () => view && view.destroy();
    }
  }, []);

  return (
    <>
      <div ref={mapRef} style={{ width: "100%", height: "500px" }}></div>
    </>
  );
};

export default MapComponent;
