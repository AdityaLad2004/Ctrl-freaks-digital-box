// components/WorldMap.js
'use client'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { createContext } from 'react';
const WorldMap = ({ data }) => {
    const getColor = (density) => {
        return density > 1000 ? '#800026' :
            density > 500 ? '#BD0026' :
                density > 200 ? '#E31A1C' :
                    density > 100 ? '#FC4E2A' :
                        density > 50 ? '#FD8D3C' :
                            density > 20 ? '#FEB24C' :
                                density > 10 ? '#FED976' :
                                    '#FFEDA0';
    };

    const style = (feature) => {
        const density = feature.properties.density;
        return {
            fillColor: getColor(density),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    };

    const onEachFeature = (feature, layer) => {
        const popupContent = `Country: ${feature.properties.name}<br />Density: ${feature.properties.density}`;
        layer.bindPopup(popupContent);
    };

    return (
        <MapContainer center={[20, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <GeoJSON data={data} style={style} onEachFeature={onEachFeature} />
        </MapContainer>
    );
};

export default WorldMap;
