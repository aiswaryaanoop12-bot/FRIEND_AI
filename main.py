from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

from groq import Groq
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI()

# Groq client
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# Static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates
templates = Jinja2Templates(directory="templates")


# Request model
class PromptRequest(BaseModel):
    prompt: str


# Home page
@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html"
    )


# Generate endpoint
@app.post("/generate")
def generate(req: PromptRequest):
    try:
        print("PROMPT RECEIVED:", req.prompt)

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "user",
                    "content": req.prompt
                }
            ]
        )

        return {
            "data": response.choices[0].message.content
        }

    except Exception as e:
        print("ERROR:", e)

        return {
            "data": f"Error: {str(e)}"
        }