import requests
import re
from thefuzz import fuzz
import json

import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable not set.")
genai.configure(api_key=GEMINI_API_KEY)

# Assuming MODEL_NAME is correctly set from previous steps, e.g., "models/gemini-flash-latest"
MODEL_NAME = "models/gemini-flash-latest" # Or any other working model from your list

try:
    model = genai.GenerativeModel(MODEL_NAME)
    print(f"Successfully initialized model: {MODEL_NAME}")
except Exception as e:
    print(f"Error initializing Gemini model {MODEL_NAME}: {e}")
    raise # Re-raise the exception to stop execution if model fails to init


def normalize(skill):
    # Remove bullet characters and normalize the string
    skill = re.sub(r"[-•]", "", skill)  # remove bullet characters
    skill = skill.lower().strip()
    return skill


def fuzzy_match(skill, skills_list, threshold=80):
    # Compare skill with list of skills using fuzzy matching
    for s in skills_list:
        if fuzz.partial_ratio(normalize(skill), normalize(s)) >= threshold:
            return True
    return False


def analyze_skills(resume_text, jd_text):
    """
    Analyzes a resume against a job description, including suggestions for improvement,
    using the Gemini generative AI model.
    """
    prompt = f"""
Analyze the following resume against the job description.

1. Extract a bullet-point list of skills mentioned in the job description as "jd_skills".
2. Extract a bullet-point list of skills mentioned in the resume as "resume_skills".
3. From the jd_skills, identify the "matched_skills" that are also present (or closely related) in the resume_skills.
4. Identify the "missing_skills" that are in jd_skills but not in resume_skills.
5. Calculate the "score" as the percentage of matched_skills over total jd_skills (rounded to nearest integer).
6. **Based on the missing_skills and the overall job description, provide concrete "suggestions_for_improvements" for the candidate to better align their resume or skills with the job requirements. This should be a concise paragraph.**

Provide the output *only* as a JSON object in the following format:
{{
    "jd_skills": [list of bullet-point JD skills],
    "matched_skills": [list of bullet-point skills matched from the resume],
    "missing_skills": [list of bullet-point skills from the JD not found in the resume],
    "resume_skills": [list of bullet-point resume skills],
    "score": integer (match percentage),
    "suggestions_for_improvements": "A concise paragraph with actionable advice for the candidate."
}}

Do not include any explanation, formatting, or text outside the JSON response.

Resume:
'''
{resume_text}
'''

Job Description:
'''
{jd_text}
'''
"""

    try:
        # Make the API call to the generative model
        # Consider adding temperature=0 for more consistent and less creative suggestions
        response = model.generate_content(prompt, generation_config=genai.types.GenerationConfig(temperature=0.2))

        # Access the text from the response
        gemini_output = response.text

        # Clean up potential markdown formatting (e.g., ```json\n...\n```) from the model's output
        gemini_output = gemini_output.strip()
        if gemini_output.startswith("```json"):
            gemini_output = gemini_output[7:]
            if gemini_output.endswith("```"):
                gemini_output = gemini_output[:-3]
            gemini_output = gemini_output.strip() # Strip again after removing fences

        # Parse the cleaned JSON output
        analysis_result = json.loads(gemini_output)

        return analysis_result

    except Exception as e:
        # Catch potential errors during API call or JSON parsing
        print(f"Error during Gemini API call or processing: {e}")
        # Return an error structure that the calling application (e.g., Flask route) can handle
        return {"error": "Could not process skill analysis", "details": str(e)}

# Example Usage (you can uncomment and test with this)
if __name__ == "__main__":
    sample_resume = """
    Experienced Software Engineer with strong skills in Python, Java, and C++.
    Proficient in SQL, Docker, and AWS. Familiar with Agile methodologies and Git.
    Led development of web applications using Flask and Django.
    """

    sample_jd = """
    We are looking for a Senior Software Engineer with expertise in Python, Data Structures, and Algorithms.
    Experience with cloud platforms like AWS and Azure is a plus.
    Familiarity with containerization (Docker, Kubernetes) and CI/CD pipelines is required.
    Knowledge of GoLang and JavaScript is beneficial.
    """

    print("Analyzing skills with suggestions...")
    result = analyze_skills(sample_resume, sample_jd)

    if "error" in result:
        print(f"An error occurred: {result['error']} - {result['details']}")
    else:
        print("\n--- Skill Analysis Result with Suggestions ---")
        print(json.dumps(result, indent=4))
        print(f"\nScore: {result.get('score', 'N/A')}%")
        print(f"Suggestions: {result.get('suggestions_for_improvements', 'N/A')}")