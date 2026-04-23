# VitalAI — AI-Powered Health Triage

VitalAI lets patients describe their symptoms in plain text. An AI model classifies severity as **Critical**, **High**, **Medium**, or **Low** and gives a plain-language recommendation — call an ambulance, visit a clinic today, or monitor at home.

**Live:** [vitalai-app.vercel.app](https://vitalai-app.vercel.app/)

---

## Features

- **AI symptom triage** — natural language input classified into four severity levels with actionable recommendations
- **Doctor booking system** — 7 doctors across 7 medical departments, with real-time availability
- **User authentication** — secure sign-up, login, and session management built from scratch
- **Patient dashboard** — booking history, triage results, and appointment management
- **Staff dashboard** — doctors can view and manage incoming appointments
- **Live database** — all data persisted with a real backend and relational database

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js / Python *(update as appropriate)* |
| AI / NLP | OpenAI API / Hugging Face *(update as appropriate)* |
| Database | PostgreSQL / MySQL *(update as appropriate)* |
| Auth | JWT / session-based auth |
| Deployment | Vercel |

> Update the tech stack rows above with the exact tools you used.

## Screenshots

*(Add screenshots of the patient triage flow, booking system, and staff dashboard)*

## How it works

1. Patient logs in and enters symptoms in plain text
2. The AI model processes the input and returns a severity classification
3. The patient receives a recommendation and can book an appointment
4. The assigned doctor is notified via the staff dashboard

## Running locally

```bash
# Clone the repo
git clone https://github.com/MzwakheRadebe/vitalai.git
cd vitalai

# Install dependencies
npm install   # or pip install -r requirements.txt

# Add environment variables
cp .env.example .env
# Fill in your API keys and database URL

# Start the dev server
npm run dev
```

## Contact

Built by [Mzwakhe Radebe](https://github.com/MzwakheRadebe)
