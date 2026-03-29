from flask import Flask, render_template, request, jsonify
import requests
import random

app = Flask(__name__)

API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjYwNTNhYzJhMDYwNzQ2NTBhMTBhMzk0ZTljZmEzNGFlIiwiaCI6Im11cm11cjY0In0="  # Paste your OpenRouteService API key here


def calculate_safety():
    crime = random.randint(1, 10)
    lighting = random.randint(1, 10)
    traffic = random.randint(1, 10)

    score = (lighting * 2 + traffic - crime * 2) * 10
    return max(0, min(score, 100))


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/get_routes', methods=['POST'])
def get_routes():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No data received"}), 400

        start = data.get("start")
        end = data.get("end")

        if not start or not end:
            return jsonify({"error": "Start location and destination are required"}), 400

        if API_KEY == "YOUR_API_KEY_HERE":
            return jsonify({"error": "Please add your OpenRouteService API key in app.py"}), 400

        url = "https://api.openrouteservice.org/v2/directions/driving-car/geojson"

        headers = {
            "Authorization": API_KEY,
            "Content-Type": "application/json"
        }

        body = {
            "coordinates": [
                [float(start["lng"]), float(start["lat"])],
                [float(end["lng"]), float(end["lat"])]
            ]
        }

        response = requests.post(url, json=body, headers=headers, timeout=20)

        try:
            ors_data = response.json()
        except Exception:
            return jsonify({"error": "Invalid response from route API"}), 500

        if response.status_code != 200:
            message = ors_data.get("error") or ors_data.get("message") or str(ors_data)
            return jsonify({"error": f"Route API failed: {message}"}), 400

        if "features" not in ors_data or not ors_data["features"]:
            return jsonify({"error": "No route found for these locations"}), 400

        routes = []

        for feature in ors_data["features"]:
            coords = feature["geometry"]["coordinates"]
            coords = [[point[1], point[0]] for point in coords]

            safety = calculate_safety()

            routes.append({
                "coords": coords,
                "safety": safety,
                "color": "green" if safety >= 50 else "red"
            })

        return jsonify(routes)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    print("Server running at http://127.0.0.1:5000")
    app.run(host='127.0.0.1', port=5000, debug=True)