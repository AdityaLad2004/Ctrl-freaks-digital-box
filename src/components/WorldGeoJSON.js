// components/WorldGeoJSON.js
'use client'
import React, { createContext } from 'react';

const worldGeoJSON = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "name": "World"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-180, -90],

                    ]
                ]
            }
        }
    ]
};

export default worldGeoJSON;
