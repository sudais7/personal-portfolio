# Sudais Mohamed — Personal Portfolio

A professional personal portfolio website showcasing skills, experience, education, and projects. Built with HTML, CSS, and JavaScript. Includes an interactive chatbot, QR code for easy access, and downloadable resume.

---

## Live Demo

[Add your live portfolio URL here after deployment]

---

## Site Navigation

| Section | Description |
|---------|-------------|
| **Home** | Introduction with profile photo, tagline, and call-to-action to view projects |
| **About** | Skills (OS, networking, programming, cybersecurity), education (Bowie State, Montgomery College), and professional experience |
| **Projects** | Project cards with descriptions and links to GitHub repositories |
| **Resume** | View (opens in new tab) or download PDF resume |
| **Contact** | Form for visitors to send messages (powered by Formspree) |

---

## Chatbot

The portfolio includes a **JavaScript-based chatbot** that answers frequently asked questions.

### Implementation
- **Library:** Vanilla JavaScript (no external chatbot framework)
- **Logic:** Keyword matching with predefined FAQ responses
- **Topics covered:** Skills, experience, education, projects, contact info, resume

### What It Answers
- Questions about technical skills (Python, Windows, Linux, networking, cybersecurity)
- Work experience (Python Instructor, IT Mentor, etc.)
- Education (Bowie State, Montgomery College)
- How to view projects or download resume
- How to get in contact
- General "about you" and greeting/thank-you exchanges

### Usage
1. Click the chat bubble (💬) in the bottom-right corner
2. Type a question (e.g., "What are your skills?" or "How can I contact you?")
3. Press Enter or click Send

---

## Tech Stack

- **HTML5** — Semantic structure and accessibility
- **CSS3** — Custom properties, Flexbox, Grid, responsive design
- **JavaScript** — Navigation, mobile menu, form handling, QR code, chatbot

---

## Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/personal-portfolio.git
   cd personal-portfolio
   ```

2. Serve the files (any static server works):
   - **VS Code Live Server:** Right-click `index.html` → Open with Live Server
   - **Python:** `python -m http.server 8000` then open http://localhost:8000
   - **Node:** `npx serve` or `npx live-server`

3. Open `index.html` in a browser (or use a local server for best results)

---

## Configuration

- **Contact Form:** Replace `YOUR_FORM_ID` in `index.html` with your [Formspree](https://formspree.io) form ID
- **Projects:** Edit project cards in `index.html` with your real projects and GitHub links
- **Resume:** Place `resume.pdf` in `assets/resume/` (already included)

---

## QR Code

The QR code in the footer is generated dynamically from the current page URL. It updates automatically when deployed — visitors can scan it to share or revisit the portfolio.

---

## Project Structure

```
personal-portfolio/
├── index.html
├── styles.css
├── script.js
├── chatbot.js
├── assets/
│   ├── images/
│   │   └── image.png      (profile photo)
│   └── resume/
│       └── resume.pdf
└── README.md
```

---

## License

© 2025 Sudais Mohamed. All rights reserved.
