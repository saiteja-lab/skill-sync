from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

from utils.parser import extract_text
from utils.skill_matcher import analyze_skills

load_dotenv()

app = Flask(__name__)

# Important: FRONTEND_URL must be the exact origin (protocol + host + optional port)
# e.g. "http://localhost:5173" for local dev, "https://your-netlify-site.netlify.app" for deployed frontend
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")

# Primary CORS config
CORS(
    app,
    resources={r"/analyze": {"origins": [frontend_url]}},
    supports_credentials=True,
    methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-Requested-With", "Accept"]
)

# Fallback to ensure headers are present on all responses (helps if a proxy strips them)
@app.after_request
def add_cors_headers(response):
    # Only set the header for the origin you allow (do NOT set '*' when supports_credentials=True)
    response.headers.setdefault("Access-Control-Allow-Origin", frontend_url)
    response.headers.setdefault("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    response.headers.setdefault(
        "Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept"
    )
    response.headers.setdefault("Access-Control-Allow-Credentials", "true")
    return response

@app.route('/analyze', methods=['POST', 'OPTIONS'])
def analyze():
    # If it's an OPTIONS preflight, return 200 early (Flask-CORS usually handles this, but explicit is safe)
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

    try:
        resume = request.files['resume']
        jd = request.files['job_description']
        resume_text = extract_text(resume)
        jd_text = extract_text(jd)
        analysis = analyze_skills(resume_text, jd_text)
        return jsonify(analysis), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    debug_mode = os.getenv("FLASK_ENV", "") != "production"
    app.run(host='0.0.0.0', port=port, debug=debug_mode)
