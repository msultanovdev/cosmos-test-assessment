import { useEffect, useRef } from "react";
import MapView from "@arcgis/core/views/MapView";
import WorkMarker from "../../assets/Work.svg";
import Map from "@arcgis/core/Map";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import Point from "@arcgis/core/geometry/Point";

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mapRef.current) return;
    const map = new Map({
      basemap: "streets-navigation-vector",
    });

    const view = new MapView({
      map,
      container: mapRef.current,
      center: [69.336241, 41.34226],
      zoom: 12,
    });

    const graphicsLayer = new GraphicsLayer();
    view.map.add(graphicsLayer);

    const markerSymbol = new PictureMarkerSymbol({
      url: WorkMarker,
      width: "32px",
      height: "32px",
    });

    const point = new Point({
      longitude: 69.336241,
      latitude: 41.34226,
    });

    const markerGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol,
      popupTemplate: {
        title: "Работа",
        content: "Министерство цифровых технологий",
      },
    });

    graphicsLayer.add(markerGraphic);

    return () => view && view.destroy();
  }, []);

  return (
    <>
      <div ref={mapRef} style={{ width: "100%", height: "100vh" }}></div>
    </>
  );
};

export default MapComponent;
