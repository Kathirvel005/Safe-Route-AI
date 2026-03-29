let map = L.map('map').setView([13.0827, 80.2707], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let routeLayers = [];
let markerLayers = [];

function showMessage(text, isError = false) {
    const message = document.getElementById("message");
    message.textContent = text;
    message.style.color = isError ? "#ff6b6b" : "#7CFC98";
}

function clearMap() {
    routeLayers.forEach(layer => map.removeLayer(layer));
    markerLayers.forEach(layer => map.removeLayer(layer));
    routeLayers = [];
    markerLayers = [];
}

async function getCoordinates(place) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(place)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data || data.length === 0) {
        throw new Error(`Location not found: ${place}`);
    }

    return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        name: data[0].display_name
    };
}

async function findRoutes() {
    try {
        clearMap();
        showMessage("Loading route...");

        const startText = document.getElementById("start").value.trim();
        const endText = document.getElementById("end").value.trim();

        if (!startText || !endText) {
            showMessage("Please enter both start location and destination.", true);
            return;
        }

        const start = await getCoordinates(startText);
        const end = await getCoordinates(endText);

        const startMarker = L.marker([start.lat, start.lng]).addTo(map).bindPopup("Start Location");
        const endMarker = L.marker([end.lat, end.lng]).addTo(map).bindPopup("Destination");

        markerLayers.push(startMarker, endMarker);

        const response = await fetch('/get_routes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ start, end })
        });

        const result = await response.json();

        if (!response.ok || result.error) {
            showMessage(result.error || "Failed to get route.", true);
            return;
        }

        if (!Array.isArray(result) || result.length === 0) {
            showMessage("No routes found.", true);
            return;
        }

        let allCoords = [];

        result.forEach(route => {
            const polyline = L.polyline(route.coords, {
                color: route.color,
                weight: 7,
                opacity: 0.9
            }).addTo(map);

            polyline.bindPopup(
                route.color === "green"
                    ? `Safe Route - Safety Score: ${route.safety}`
                    : `Unsafe Route - Safety Score: ${route.safety}`
            );

            routeLayers.push(polyline);
            allCoords = allCoords.concat(route.coords);
        });

        if (allCoords.length > 0) {
            map.fitBounds(allCoords);
        }

        showMessage("Route loaded successfully.");
    } catch (error) {
        showMessage(error.message, true);
    }
}