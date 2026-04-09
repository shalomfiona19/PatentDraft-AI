# 🤖 PatentDraft AI Agent

An AI-powered Patent Drafting System that analyzes technical inventions and automatically generates structured patent documents.

---

## 🚀 Overview

This project is an intelligent AI Agent that helps users convert their invention ideas into complete patent drafts.

It simulates real-world patent drafting by:
- Analyzing the invention
- Performing prior art comparison
- Evaluating novelty
- Generating patent claims
- Creating technical representations

---

## 🎯 Features

- 🧠 Invention Analysis
- 🔍 Simulated Prior Art Search
- 📊 Novelty Evaluation (Low / Medium / High)
- 📄 Automatic Patent Document Generation
- ⚖️ Legal-style Patent Claims
- 🧩 Technical Drawing (Text-based flow)
- 🌐 Simple Web Interface

---

## 🏗️ Project Structure


patent-agent/
│
├── agent.py # AI Agent logic
├── app.py # Flask backend
├── requirements.txt # Dependencies
│
├── templates/
│ └── index.html # Frontend UI
│
├── static/
│ └── style.css # Styling
│
└── README.md # Documentation


---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS  
- **Backend:** Python (Flask)  
- **AI Logic:** Rule-based / Simulated Agent  
- **IDE:** VS Code  

---

## ⚙️ How It Works

1. User enters an invention idea  
2. AI Agent processes the idea  
3. System performs:
   - Analysis
   - Prior art simulation
   - Novelty evaluation  
4. Generates a structured patent document  
5. Displays output on the web interface  

---

## ▶️ How to Run

### 1. Install dependencies

```bash
pip install -r requirements.txt
2. Run the application
python app.py
3. Open in browser
http://127.0.0.1:5000/
🧪 Example Input
AI-based Smart Helmet for Accident Detection
📤 Example Output
Title
Abstract
Background
Claims
Technical Drawing
Novelty Level
⚠️ Note

This project uses a simulated AI agent (no paid APIs required).
It is designed for learning and hackathon demonstration purposes.

🚀 Future Improvements
🔗 Integrate real AI APIs (Gemini / OpenAI)
📄 Export patent as PDF
🎨 Improve UI/UX design
🧠 Add real prior art search (Google Patents API)
🔍 Enhance novelty detection with ML models
👨‍💻 Author
Developed as a hackathon project
Built with guidance and AI assistance
💡 Conclusion

This project demonstrates how AI agents can simplify complex legal and technical processes like patent drafting, making innovation more accessible.
