import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polygon, Polyline, Marker, Popup, Tooltip } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';

// @ts-ignore
import 'leaflet/dist/leaflet.css';

// --- ASSETS IMPORTS ---
// @ts-ignore
import icon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// 1. IMPORT YOUR LOCAL SVG HERE
// @ts-ignore
import planeSvg from '../assets/C172.svg';
import TrainingAreas from '../components/dynamic/TrainingAreas';

// --- ICON CONFIGURATION ---

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const WaypointIcon = L.divIcon({
    html: `
    <svg width="20" height="20" viewBox="0 0 20 20" style="overflow: visible;">
        <polygon points="10,0 20,20 0,20" fill="#4d4c4c" stroke="white" stroke-width="2"/>
    </svg>`,
    className: 'waypoint-icon',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

const AerodromeIcon = L.divIcon({
    html: `
    <svg width="24" height="24" viewBox="0 0 24 24" style="overflow: visible;">
        <circle cx="12" cy="12" r="10" fill="#1e40af" stroke="white" stroke-width="2"/>
        <text x="12" y="16" text-anchor="middle" font-size="12" fill="white" font-family="Arial" font-weight="bold">AD</text>
    </svg>`,
    className: 'aerodrome-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});


// --- HELPER: CREATE ROTATED PLANE ICON ---
// We create a function to generate the icon dynamically based on heading
const createPlaneIcon = (heading: number) => {
    return L.divIcon({
        html: `
            <div style="
                transform: rotate(${heading}deg);
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                /* Smooth rotation transition */
                transition: transform 0.1s linear;
            ">
                <img src="${planeSvg}" style="width: 100%; height: 100%; filter: drop-shadow(2px 4px 6px black);" />
            </div>
        `,
        className: '', // Empty class to remove default Leaflet square styles
        iconSize: [30, 30],
        iconAnchor: [15, 15] // Pivot point (center)
    });
};

// --- TYPES & DATA ---

type FlightStatus = "GROUND" | "OUTBOUND" | "WORKING" | "INBOUND";

interface TrainingArea {
    id: string;
    name: string;
    color: string;
    bounds: LatLngExpression[];
    center: [number, number];
    entryPoint: [number, number];
    via: [number, number][];
}

interface Aircraft {
    id: string;
    callsign: string;
    status: FlightStatus;
    areaId: string;
    position: [number, number];
    heading: number; // Added Heading Property
    startTime: number;
    speedFactor: number;
}

// CONSTANTS
const AERODROME_POS: [number, number] = [41.27937386290272, -8.517346814758548];
const FIX_STIRS: [number, number] = [41.32845746737608, -8.493046002378442];
const FIX_VILON: [number, number] = [41.19116666666667, -8.497833333333332];

const TRAINING_AREAS: TrainingArea[] = [
    {
        id: 'area-famal',
        name: 'Famalicão',
        color: 'blue',
        bounds: [
            [41.419722, -8.557778], [41.518056, -8.593889], [41.522778, -8.579722],
            [41.531667, -8.532778], [41.530278, -8.503611], [41.528611, -8.492778],
            [41.509444, -8.474444], [41.479444, -8.468611], [41.451111, -8.492500],
            [41.419722, -8.508611], [41.419722, -8.557778]
        ],
        center: [41.476966, -8.519836],
        entryPoint: [41.419722, -8.508611],
        via: [FIX_STIRS]
    },
    {
        id: 'area-aves',
        name: 'Vila das Aves',
        color: 'blue',
        bounds: [
            [41.339167, -8.391111], [41.402222, -8.420833], [41.408056, -8.329167],
            [41.402222, -8.258056], [41.353889, -8.267778], [41.339167, -8.391111]
        ],
        center: [41.381386, -8.326920],
        entryPoint: [41.339167, -8.391111],
        via: [FIX_STIRS]
    },
    {
        id: 'area-guima',
        name: 'Guimarães',
        color: 'blue',
        bounds: [
            [41.463611, -8.425556], [41.492500, -8.358056], [41.484722, -8.282222],
            [41.419722, -8.270278], [41.431111, -8.335000], [41.414444, -8.427778],
            [41.463611, -8.425556]
        ],
        center: [41.455878, -8.342537],
        entryPoint: [41.463611, -8.425556],
        via: [FIX_STIRS]
    },
    {
        id: 'area-pared',
        name: 'Paredes',
        color: 'blue',
        bounds: [
            [41.197778, -8.329167], [41.201667, -8.342222], [41.225556, -8.346111],
            [41.281111, -8.303889], [41.281111, -8.254722], [41.243889, -8.215000],
            [41.197778, -8.329167]
        ],
        center: [41.244782, -8.285556],
        entryPoint: [41.197778, -8.329167],
        via: [FIX_VILON]
    }
];

// --- HELPER FUNCTIONS ---

const interpolate = (start: number[], end: number[], t: number): [number, number] => {
    return [
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t
    ];
};

const getPathPosition = (points: [number, number][], t: number): [number, number] => {
    if (points.length < 2) return points[0];
    const segmentCount = points.length - 1;
    const segmentLength = 1 / segmentCount;
    const currentSegmentIndex = Math.min(Math.floor(t / segmentLength), segmentCount - 1);
    const segmentT = (t - (currentSegmentIndex * segmentLength)) / segmentLength;
    return interpolate(points[currentSegmentIndex], points[currentSegmentIndex + 1], segmentT);
};

// Calculates bearing between two lat/lng points in degrees (0 = North, 90 = East)
const calculateBearing = (start: [number, number], end: [number, number]): number => {
    const lat1 = start[0];
    const lon1 = start[1];
    const lat2 = end[0];
    const lon2 = end[1];

    // Simple flat-earth approximation is sufficient for small map movements
    // atan2(x, y) where y is North, x is East
    const y = lat2 - lat1;
    const x = lon2 - lon1;

    // Note: Standard math atan2(y, x) puts 0 at East (3 o'clock).
    // Navigation bearing has 0 at North (12 o'clock).
    // Swapping args to atan2(x, y) gives us 0 at North.
    const angleRad = Math.atan2(x, y);
    const angleDeg = angleRad * (180 / Math.PI);

    return angleDeg;
};

const AreasPage: React.FC = () => {
    const [aircraft, setAircraft] = useState<Aircraft[]>([
        {
            id: '1', callsign: 'CS-DVA', status: 'GROUND', areaId: 'area-famal',
            position: AERODROME_POS, heading: 0, startTime: 0, speedFactor: 0.1
        },
        {
            id: '2', callsign: 'CS-GTY', status: 'GROUND', areaId: 'area-pared',
            position: AERODROME_POS, heading: 0, startTime: 0, speedFactor: 0.1
        }
    ]);

    const [selectedAircraftId, setSelectedAircraftId] = useState<string>('1');
    const requestRef = useRef<number>(0);

    // --- ANIMATION ENGINE ---
    const animate = (time: number) => {
        setAircraft(prevAircraft => {
            return prevAircraft.map(plane => {
                if (plane.status === 'GROUND') return plane;

                const area = TRAINING_AREAS.find(a => a.id === plane.areaId);
                if (!area) return plane;

                if (plane.startTime === 0) plane.startTime = time;
                const runtime = time - plane.startTime;

                // ADJUSTED SPEED FOR DEMO
                const TRAVEL_DURATION = 8000 * (1 / plane.speedFactor);

                let newPos = plane.position;
                let newStatus = plane.status;
                let newStartTime = plane.startTime;
                let newHeading = plane.heading;

                if (plane.status === 'OUTBOUND') {
                    const path = [AERODROME_POS, ...area.via, area.entryPoint, area.center];
                    const t = Math.min(runtime / TRAVEL_DURATION, 1);
                    newPos = getPathPosition(path, t);

                    if (t >= 1) {
                        newStatus = 'WORKING';
                        newStartTime = 0;
                    }
                }
                else if (plane.status === 'INBOUND') {
                    const reversedVia = [...area.via].reverse();
                    const path = [area.center, area.entryPoint, ...reversedVia, AERODROME_POS];
                    const t = Math.min(runtime / TRAVEL_DURATION, 1);
                    newPos = getPathPosition(path, t);

                    if (t >= 1) {
                        newStatus = "GROUND";
                        newStartTime = 0;
                        newHeading = 0; // Reset heading on landing
                    }
                }
                else if (plane.status === 'WORKING') {
                    const speed = 0.002 * plane.speedFactor;
                    const radius = 0.015;
                    const angle = runtime * speed;
                    newPos = [
                        area.center[0] + (radius * Math.cos(angle)),
                        area.center[1] + (radius * Math.sin(angle))
                    ];
                }

                // --- CALCULATE ROTATION ---
                // We check the difference between current position and previous position
                // Check if position actually changed to avoid jitter
                if (newPos[0] !== plane.position[0] || newPos[1] !== plane.position[1]) {
                    newHeading = calculateBearing(plane.position, newPos);
                }

                return {
                    ...plane,
                    position: newPos,
                    status: newStatus,
                    startTime: newStartTime,
                    heading: newHeading
                };
            });
        });
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    // Handlers
    const updatePlaneStatus = (status: FlightStatus) => {
        setAircraft(prev => prev.map(p => {
            if (p.id === selectedAircraftId) return { ...p, status, startTime: 0 };
            return p;
        }));
    };

    const updatePlaneArea = (areaId: string) => {
        setAircraft(prev => prev.map(p => {
            if (p.id === selectedAircraftId) return { ...p, areaId, status: 'GROUND', position: AERODROME_POS, startTime: 0, heading: 0 };
            return p;
        }));
    };

    const activePlane = aircraft.find(p => p.id === selectedAircraftId);

    return (
        <div className="py-8 h-screen bg-gray-100 font-sans box-border">

            <div className="bg-white rounded-lg shadow-md p-6 h-full">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    Training Areas
                </h1>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 h-max'>
                    <div className="lg:col-span-2 rounded-lg overflow-hidden border border-gray-200 relative shadow-inner h-[500px] lg:h-auto">
                        <MapContainer center={[41.35, -8.40]} zoom={11} zoomControl={false} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                            <TileLayer
                                attribution='&copy; OpenStreetMap'
                                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                            />

                            <Marker position={AERODROME_POS} icon={AerodromeIcon}><Popup>Vilar de Luz</Popup></Marker>
                            <Marker position={FIX_STIRS} icon={WaypointIcon}><Popup>STIRS</Popup></Marker>
                            <Marker position={FIX_VILON} icon={WaypointIcon}><Popup>VALON</Popup></Marker>

                            {/* Areas */}
                            {TRAINING_AREAS.map(area => {
                                const assignedPlanes = aircraft.filter(p => p.areaId === area.id && p.status !== 'GROUND');
                                const isActive = assignedPlanes.length > 0;
                                return (
                                    <React.Fragment key={area.id}>
                                        <Polygon
                                            positions={area.bounds}
                                            color={area.color}
                                            fillOpacity={isActive ? 0.2 : 0.05}
                                            weight={isActive ? 2 : 1}
                                        />
                                        {isActive && (
                                            <Polyline
                                                positions={[AERODROME_POS, ...area.via, area.entryPoint]}
                                                color="gray" dashArray="5, 5" opacity={0.6}
                                            />
                                        )}
                                    </React.Fragment>
                                );
                            })}

                            {/* Aircraft with Dynamic Rotated Icon */}
                            {aircraft.map(plane => {
                                const areaName = TRAINING_AREAS.find(a => a.id === plane.areaId)?.name || 'Unknown';
                                return (
                                    <Marker
                                        key={plane.id}
                                        position={plane.position}
                                        // We call the function to create a new DivIcon with the correct rotation
                                        icon={createPlaneIcon(plane.heading)}
                                        zIndexOffset={1000}
                                    >
                                        <Tooltip direction="top" offset={[0, -20]} opacity={0.9}>
                                            <div className="text-center leading-tight">
                                                <span className="font-bold block">{plane.callsign}</span>
                                                <span className="text-xs text-gray-500">{plane.status}</span>
                                                <div className="text-[10px] text-blue-600 font-bold">{areaName}</div>
                                            </div>
                                        </Tooltip>
                                    </Marker>
                                );
                            })}
                        </MapContainer>
                    </div>

                    <TrainingAreas />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 h-full grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1 flex flex-col gap-6 border-r pr-0 lg:pr-6 border-gray-100 overflow-y-auto">

                    <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Flight Control</h2>

                    {/* Aircraft Selection */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Select Aircraft</label>
                        <select
                            className="w-full border rounded p-2 bg-white font-mono font-bold text-lg"
                            value={selectedAircraftId}
                            onChange={(e) => setSelectedAircraftId(e.target.value)}
                        >
                            {aircraft.map(p => (
                                <option key={p.id} value={p.id}>{p.callsign} ({p.status})</option>
                            ))}
                        </select>
                        <div className="mt-2 text-sm text-gray-500 flex justify-between">
                            <span>Status:</span>
                            <span className={`font-bold ${activePlane?.status === 'GROUND' ? 'text-gray-600' : 'text-green-600'}`}>
                                {activePlane?.status}
                            </span>
                        </div>
                    </div>

                    {/* Area Assignment */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Assign Area</label>
                        <select
                            className="w-full border rounded p-2 bg-white"
                            value={activePlane?.areaId}
                            onChange={(e) => updatePlaneArea(e.target.value)}
                        >
                            {TRAINING_AREAS.map(area => (
                                <option key={area.id} value={area.id}>{area.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 mt-auto">
                        <button
                            onClick={() => updatePlaneStatus('OUTBOUND')}
                            disabled={activePlane?.status !== 'GROUND'}
                            className={`w-full px-4 py-3 rounded font-bold text-white transition flex justify-between items-center
                                ${activePlane?.status === 'GROUND' ? 'bg-green-600 hover:bg-green-700 shadow-md transform hover:-translate-y-0.5' : 'bg-gray-300'}`}
                        >
                            <span>DEPARTURE</span> <span>🛫</span>
                        </button>

                        <button
                            onClick={() => updatePlaneStatus('WORKING')}
                            disabled={activePlane?.status === 'GROUND'}
                            className={`w-full px-4 py-3 rounded font-bold text-white transition flex justify-between items-center
                                ${activePlane?.status === 'WORKING' ? 'bg-yellow-500 ring-2 ring-yellow-300' : 'bg-blue-500 hover:bg-blue-600 shadow-md'}`}
                        >
                            <span>WORK AREA</span> <span>🔄</span>
                        </button>

                        <button
                            onClick={() => updatePlaneStatus('INBOUND')}
                            disabled={['GROUND', 'INBOUND'].includes(activePlane?.status || '')}
                            className={`w-full px-4 py-3 rounded font-bold text-white transition flex justify-between items-center
                                ${!['GROUND', 'INBOUND'].includes(activePlane?.status || '') ? 'bg-red-600 hover:bg-red-700 shadow-md' : 'bg-gray-300'}`}
                        >
                            <span>RETURN TO BASE</span> <span>🛬</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AreasPage;
