# 🚦 AI Safe Route Finder

An AI-powered web application that analyzes travel routes and highlights safe (🟢 green) and unsafe (🔴 red) paths using intelligent risk scoring and interactive map visualization.

---

## 🌟 Features

* 🌍 Real-time map visualization using Leaflet.js
* 🧠 AI-based safety scoring system
* 🟢 Safe routes highlighted in green
* 🔴 Unsafe routes highlighted in red
* 📍 Location search using geocoding (OpenStreetMap)
* 🚗 Multiple route options between locations
* ⚡ Fast and lightweight web application

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Python (Flask)
* **Maps:** Leaflet.js + OpenStreetMap
* **API:** OpenRouteService

---

## 📂 Project Structure

```
safe-route-ai/
│── app.py
│── requirements.txt
│── templates/
│   └── index.html
└── static/
    ├── style.css
    └── script.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/safe-route-ai.git
cd safe-route-ai
```

---

### 2️⃣ Install Dependencies

```
pip install -r requirements.txt
```

---

### 3️⃣ Get Free API Key

* Go to https://openrouteservice.org
* Sign up and create an API key
* Copy your key

---

### 4️⃣ Add API Key

Open `app.py` and replace:

```
API_KEY = "YOUR_API_KEY_HERE"
```

with your actual API key.

---

### 5️⃣ Run the Application

```
python app.py
```

---

### 6️⃣ Open in Browser

```
http://127.0.0.1:5000
```

---

## 🧠 How It Works

1. User enters start and destination
2. The system fetches multiple routes using OpenRouteService API
3. AI logic calculates a safety score based on:

   * Crime (simulated)
   * Lighting conditions
   * Traffic density
4. Routes are displayed on the map:

   * 🟢 Green → Safe
   * 🔴 Red → Unsafe

---

## 📸 Output Preview

* Interactive map with route visualization
* Color-coded safety routes
* Real-time route analysis

---

## 🚀 Future Improvements

* 🔐 User authentication system
* 📍 Live GPS tracking
* 🤖 Real AI model using datasets
* 🚨 Emergency alert feature
* 📊 Safety analytics dashboard

---

## 👨‍💻 Author

**Kathir Vel**
GitHub: https://github.com/Kathirvel005

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
