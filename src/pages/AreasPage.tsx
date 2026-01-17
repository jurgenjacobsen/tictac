import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Polygon, Polyline, Marker, Popup, Tooltip } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';

// @ts-ignore
import 'leaflet/dist/leaflet.css';

// --- ASSETS IMPORTS ---
// @ts-ignore
import icon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
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
    html: `<svg width="14" height="14" viewBox="0 0 20 20"><polygon points="10,0 20,20 0,20" fill="#4d4c4c" stroke="white" stroke-width="2"/></svg>`,
    className: 'waypoint-icon', iconSize: [14, 14], iconAnchor: [7, 7]
});

const AerodromeIcon = L.divIcon({
    html: `<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#1e40af" stroke="white" stroke-width="2"/><text x="12" y="16" text-anchor="middle" font-size="10" fill="white" font-family="Arial" font-weight="bold">AD</text></svg>`,
    className: 'aerodrome-icon', iconSize: [24, 24], iconAnchor: [12, 12]
});

// --- DYNAMIC ROTATED PLANE ICON ---
const createPlaneIcon = (heading: number) => {
    return L.divIcon({
        html: `
            <div style="transform: rotate(${heading}deg); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; transition: transform 1s linear;">
                ${planeSvg
                    ? `<img src="${planeSvg}" style="width: 100%; height: 100%; filter: drop-shadow(1px 2px 3px rgba(0,0,0,0.4));" />`
                    : `<div style="font-size:24px;">✈️</div>`
                }
            </div>
        `,
        className: '', iconSize: [32, 32], iconAnchor: [16, 16]
    });
};

// --- TYPES ---
type FlightPhase = "GROUND" | "OUTBOUND" | "WORKING" | "INBOUND";

interface TrainingArea {
    id: string;
    name: string;
    color: string;
    bounds: LatLngExpression[];
    center: [number, number];
    entryPoint: [number, number];
    via: [number, number][];
}

export interface Reservation {
    aircraftId: string;
    callsign: string;
    areaId: string;
    startTime: string; // "HH:mm" UTC
    endTime: string;   // "HH:mm" UTC
}

export type AreaSchedule = Reservation[];

// --- CONSTANTS ---
const AERODROME_POS: [number, number] = [41.27937386290272, -8.517346814758548];
const FIX_STIRS: [number, number] = [41.32845746737608, -8.493046002378442];
const FIX_VALON: [number, number] = [41.19116666666667, -8.497833333333332];

// --- MOCK DATA ---

// *** EDIT THIS TO MATCH YOUR CURRENT UTC TIME TO SEE MOVEMENT ***
export const SCHEDULE: Reservation[] = [
    { aircraftId: '1', callsign: 'RTV1D', areaId: 'FAMAL', startTime: "13:00", endTime: "15:00" },
    { aircraftId: '2', callsign: 'RTV1B', areaId: 'AVES', startTime: "13:00", endTime: "14:30" },
    { aircraftId: '3', callsign: 'RTV1C', areaId: 'PARED', startTime: "09:00", endTime: "12:20" },
    { aircraftId: '4', callsign: 'RTV1C', areaId: 'GUIMA', startTime: "12:30", endTime: "13:30" },
    { aircraftId: '5', callsign: 'RTV1E', areaId: 'PARED', startTime: "12:57", endTime: "17:00" },
    { aircraftId: '6', callsign: 'RTV1F', areaId: 'AVES', startTime: "15:30", endTime: "17:00" },
    { aircraftId: '7', callsign: 'RTV1G', areaId: 'GUIMA', startTime: "13:30", endTime: "16:00" },
];

const TRAINING_AREAS: TrainingArea[] = [
    {
        id: 'FAMAL', name: 'Famalicão', color: 'blue',
        bounds: [
            [41.419722,-8.557778],[41.518056,-8.593889],[41.522778,-8.579722],
            [41.531667,-8.532778],[41.530278,-8.503611],[41.528611,-8.492778],
            [41.509444,-8.474444],[41.479444,-8.468611],[41.451111,-8.492500],
            [41.419722,-8.508611],[41.419722,-8.557778]
        ],
        center: [41.476966, -8.519836], entryPoint: [41.419722, -8.508611], via: [FIX_STIRS]
    },
    {
        id: 'AVES', name: 'Vila das Aves', color: 'blue',
        bounds: [
            [41.339167,-8.391111],[41.402222,-8.420833],[41.408056,-8.329167],
            [41.402222,-8.258056],[41.353889,-8.267778],[41.339167,-8.391111]
        ],
        center: [41.381386, -8.326920], entryPoint: [41.339167, -8.391111], via: [FIX_STIRS]
    },
    {
        id: 'PARED', name: 'Paredes', color: 'blue',
        bounds: [
            [41.197778,-8.329167],[41.201667,-8.342222],[41.225556,-8.346111],
            [41.281111,-8.303889],[41.281111,-8.254722],[41.243889,-8.215000],
            [41.197778,-8.329167]
        ],
        center: [41.244782, -8.285556], entryPoint: [41.197778, -8.329167], via: [FIX_VALON]
    },
    {
        id: 'GUIMA',
        name: 'Guimaraes',
        color: 'blue',
        bounds: [
            [41.463611, -8.425556],[41.492500, -8.358056],[41.484722, -8.282222],
            [41.419722, -8.270278],[41.431111, -8.335000],[41.414444, -8.427778],
            [41.463611, -8.425556]
        ],
        center: [41.451000, -8.349000],
        entryPoint: [41.414444, -8.427778],
        via: [FIX_STIRS]
    },
];

// --- HELPER MATH FUNCTIONS ---

// Returns minutes from midnight (e.g., 13:30 = 810)
const parseTime = (timeStr: string): number => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
};

// Gets current UTC time as fractional minutes (e.g. 13:30:30 = 810.5) for smooth animation
const getCurrentUtcMinutes = (): number => {
    const now = new Date();
    return (now.getUTCHours() * 60) + now.getUTCMinutes() + (now.getUTCSeconds() / 60);
};

const interpolate = (start: [number, number], end: [number, number], t: number): [number, number] => {
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

const calculateBearing = (start: [number, number], end: [number, number]): number => {
    const y = end[0] - start[0];
    const x = end[1] - start[1];
    return Math.atan2(x, y) * (180 / Math.PI);
};

// --- MAIN COMPONENT ---

const AreasPage: React.FC = () => {
    // 1. STATE: Current UTC Time (Fractional Minutes from Midnight)
    const [currentTime, setCurrentTime] = useState<number>(getCurrentUtcMinutes());

    // 2. EFFECT: Tick every second to update real time
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(getCurrentUtcMinutes());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // 3. MEMO: Calculate Aircraft Positions
    const aircraftStates = useMemo(() => {
        return SCHEDULE.map(reservation => {
            const startM = parseTime(reservation.startTime);
            const endM = parseTime(reservation.endTime);
            const area = TRAINING_AREAS.find(a => a.id === reservation.areaId);

            if (!area) return null;

            // Travel Time Constants
            const TRAVEL_TIME = 10; // Minutes to fly outbound/inbound

            let pos: [number, number] = AERODROME_POS;
            let heading = 0;
            let status: FlightPhase = "GROUND";

            // 1. BEFORE START
            if (currentTime < startM) {
                status = "GROUND";
                pos = AERODROME_POS;
            }
            // 2. OUTBOUND (Start -> Start + 10m)
            else if (currentTime >= startM && currentTime < startM + TRAVEL_TIME) {
                status = "OUTBOUND";
                const progress = (currentTime - startM) / TRAVEL_TIME; // 0 to 1
                const path = [AERODROME_POS, ...area.via, area.entryPoint, area.center];
                pos = getPathPosition(path, progress);

                const nextPos = getPathPosition(path, Math.min(progress + 0.01, 1));
                heading = calculateBearing(pos, nextPos);
            }
            // 3. WORKING (Start + 10m -> End - 10m)
            else if (currentTime >= startM + TRAVEL_TIME && currentTime < endM - TRAVEL_TIME) {
                status = "WORKING";

                // Orbit Logic (Time based)
                const timeInArea = currentTime - (startM + TRAVEL_TIME);
                const radius = 0.015;
                const orbitSpeed = 0.5; // rad per minute
                const angle = timeInArea * orbitSpeed;

                pos = [
                    area.center[0] + (radius * Math.cos(angle)),
                    area.center[1] + (radius * Math.sin(angle))
                ];

                // Tangent heading
                const dx = radius * Math.cos(angle);
                const dy = -radius * Math.sin(angle);
                heading = (Math.atan2(dx, dy) * (180 / Math.PI)) + 90;
            }
            // 4. INBOUND (End - 10m -> End)
            else if (currentTime >= endM - TRAVEL_TIME && currentTime < endM) {
                status = "INBOUND";
                const progress = (currentTime - (endM - TRAVEL_TIME)) / TRAVEL_TIME; // 0 to 1
                const reversedVia = [...area.via].reverse();
                const path = [area.center, area.entryPoint, ...reversedVia, AERODROME_POS];
                pos = getPathPosition(path, progress);

                const nextPos = getPathPosition(path, Math.min(progress + 0.01, 1));
                heading = calculateBearing(pos, nextPos);
            }
            // 5. FINISHED
            else {
                status = "GROUND";
                pos = AERODROME_POS;
            }

            return { ...reservation, pos, heading, status, areaName: area.name, areaColor: area.color };
        }).filter(Boolean);
    }, [currentTime]);

    // Format current time for display (HH:MM UTC)
    const timeDisplay = useMemo(() => {
        const now = new Date();
        return now.toISOString().substring(11, 16);
    }, [Math.floor(currentTime)]); // Update when minute changes

    return (
        <div className="py-8 h-screen font-sans box-border flex flex-col">

            {/* --- LAYOUT GRID (3 Columns) --- */}
            <div className="flex-grow grid grid-cols-3 gap-6 mb-0 min-h-0 max-h-[calc(100vh-6rem)]">

                {/* COLUMN 1 & 2: THE MAP (Spans 2 columns) */}
                <div className="col-span-2 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 relative z-0">

                    {/* LIVE CLOCK WIDGET */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg border border-gray-200 z-[1000] flex flex-col items-end">
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">UTC Time</div>
                        <div className="text-2xl font-mono font-bold text-gray-800 leading-none">
                            {timeDisplay} <span className="text-sm text-gray-400 animate-pulse">Z</span>
                        </div>
                    </div>

                    <MapContainer
                        center={[41.35, -8.40]}
                        zoom={11}
                        zoomControl={false}
                        scrollWheelZoom={false}
                        dragging={false}
                        doubleClickZoom={false}
                        style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            attribution='&copy; OpenStreetMap'
                            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        />

                        {/* Infrastructure */}
                        <Marker position={AERODROME_POS} icon={AerodromeIcon}><Popup>Vilar de Luz</Popup></Marker>
                        <Marker position={FIX_STIRS} icon={WaypointIcon}><Tooltip direction="right">STIRS</Tooltip></Marker>
                        <Marker position={FIX_VALON} icon={WaypointIcon}><Tooltip direction="right">VALON</Tooltip></Marker>

                        {/* Areas */}
                        {TRAINING_AREAS.map(area => {
                            const isActive = aircraftStates?.some(p => p?.areaId === area.id && p.status === 'WORKING');
                            return (
                                <React.Fragment key={area.id}>
                                    <Polygon
                                        positions={area.bounds}
                                        color={area.color}
                                        fillOpacity={isActive ? 0.3 : 0.05}
                                        weight={isActive ? 2 : 1}
                                    >
                                        <Tooltip sticky>{area.name}</Tooltip>
                                    </Polygon>
                                    {isActive && (
                                        <Polyline
                                            positions={[AERODROME_POS, ...area.via, area.entryPoint]}
                                            color={area.color}
                                            dashArray="4, 8"
                                            weight={2}
                                            opacity={0.5}
                                        />
                                    )}
                                </React.Fragment>
                            );
                        })}

                        {/* AIRCRAFT */}
                        {aircraftStates?.map((plane: any) => (
                            plane.status !== 'GROUND' && (
                                <Marker
                                    key={plane.aircraftId}
                                    position={plane.pos}
                                    icon={createPlaneIcon(plane.heading)}
                                    zIndexOffset={1000}
                                >
                                    <Tooltip direction="top" offset={[0, -20]} opacity={0.9} permanent>
                                        <div className="text-center leading-none">
                                            <div className="font-bold text-xs">{plane.callsign}</div>
                                            <div className="text-[10px] text-gray-500">{plane.status}</div>
                                        </div>
                                    </Tooltip>
                                </Marker>
                            )
                        ))}
                    </MapContainer>
                </div>

                {/* COLUMN 3: EMPTY (Spans 1 column) */}
                <div className="col-span-1 bg-white rounded-lg shadow-md overflow-hidden p-4">
                    <TrainingAreas schedule={SCHEDULE}/>
                </div>
            </div>

            {/* --- FLIGHT BOARD (Bottom) --- */}
            {/*<div className="h-48 p-6 overflow-y-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-xs text-gray-500 border-b border-gray-200">
                            <th className="py-2">Callsign</th>
                            <th className="py-2">Area</th>
                            <th className="py-2">Slot (UTC)</th>
                            <th className="py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aircraftStates?.map((flight: any) => (
                            <tr key={flight.aircraftId} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                                <td className="py-3 font-bold text-gray-800">{flight.callsign}</td>
                                <td className="py-3 text-sm">
                                    <span className="px-2 py-1 rounded text-xs font-bold bg-gray-100 text-gray-600">
                                        {flight.areaName}
                                    </span>
                                </td>
                                <td className="py-3 font-mono text-sm text-gray-600">
                                    {flight.startTime} - {flight.endTime}
                                </td>
                                <td className="py-3">
                                    <span className={`text-xs font-bold px-2 py-1 rounded
                                        ${flight.status === 'GROUND' ? 'text-gray-400 bg-gray-100' :
                                          flight.status === 'WORKING' ? 'text-blue-700 bg-blue-100' :
                                          'text-orange-700 bg-orange-100'
                                        }
                                    `}>
                                        {flight.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </div>*/}
        </div>
    );
};

export default AreasPage;
