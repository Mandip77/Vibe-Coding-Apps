# Vibe Studio 🪐

An AI-powered startup architect that converts your "vibes" into actionable business blueprints. Built with Gemini 2.5 Flash and Firebase — designed to help founders, product people, and curious builders quickly prototype viable startup ideas.

---

[![Status](https://img.shields.io/badge/status-active-brightgreen)](#)
[![Built with Gemini](https://img.shields.io/badge/Gemini-2.5%20Flash-blue?logo=openai)](#)
[![Firebase](https://img.shields.io/badge/Firebase-Enabled-yellow?logo=firebase)](#)
[![License](https://img.shields.io/badge/license-MIT-lightgrey)](#LICENSE)

---

Table of contents
- [Overview](#overview)
- [Highlights](#highlights)
- [Demo](#demo)
- [Quick start](#quick-start)
- [How it works](#how-it-works)
- [Configuration](#configuration)
- [Project structure](#project-structure)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License & credits](#license--credits)

---

Overview
--------
Vibe Studio transforms a short prompt describing your startup "vibe" (tone, market, product feel) into a structured blueprint you can iterate on immediately. Outputs include: idea summary, value proposition, user personas, feature roadmap, monetization options, go-to-market plan, and simple mockups.

Highlights
----------
- AI-first idea generation tuned for startup founders
- Structured deliverables: one-page blueprint, prioritized feature list, persona sketches
- Gemini 2.5 Flash powers idea synthesis and creative prompts
- Firebase for auth, persistence, and real-time collaboration
- Exportable blueprints (PDF / Markdown) for investor decks or internal docs

Demo
----
Include an animated demo or screenshots here (replace placeholders with actual images/GIFs):

![Vibe Studio demo (replace me)](docs/demo-placeholder.gif)

Quick start
-----------
Clone, install, and run locally:

```bash
# clone
git clone https://github.com/Mandip77/Vibe-Coding-Apps.git
cd Vibe-Coding-Apps/vibe-studio

# install (example)
npm install
# or
yarn install

# start dev server
npm run dev
```

Configuration
-------------
Create a .env.local (or preferred env file) and set the required keys:

```
# Gemini (or OpenAI) API key
GEMINI_API_KEY=sk-...

# Firebase
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...

# Optional: analytics, Sentry, etc.
```

How it works
------------
1. You enter a short "vibe" — a few sentences describing tone, market, and product intuition.
2. The app sends the prompt to Gemini 2.5 Flash using tuned prompt templates.
3. AI returns structured content; backend normalizes it and saves it in Firebase.
4. UI renders a blueprint and recommendations. Export or share with collaborators.

Tips for better prompts
- Start with: "Vibe: [one-line vibe], Market: [target users], Tone: [playful/serious]"
- Provide constraints if needed: budget, timeline, tech stack preferences
- Ask for prioritized lists to get a concise roadmap

Project structure
-----------------
- /src — frontend application (React / Vue / Svelte, whichever the project uses)
- /functions — backend serverless functions (API wrappers, prompt templates)
- /docs — images, demo GIFs, architecture notes
- /firebase — Firebase setup and rules
- README.md — this file

Roadmap
-------
Planned improvements:
- User accounts & multi-team support (collaboration + roles)
- Custom prompt templates and saved strategy profiles
- Marketplace for blueprint templates
- Improved export (slide decks, Notion export)
- Analytics dashboard for validated metrics

Contributing
------------
Contributions are welcome! To contribute:
1. Open an issue describing your idea or bug.
2. Fork the repo and make a feature branch.
3. Submit a PR with tests & a clear description of your change.

Please follow the code style already used in the repository and add documentation for any new feature.

Security & Privacy
------------------
- Do not commit secret keys. Use environment variables.
- Be cautious when sharing user data with third-party AI services. Follow applicable privacy laws and inform users how their data is used.

License & credits
-----------------
Vibe Studio is released under the MIT License. See [LICENSE](../LICENSE) for details.

Built with love ❤️ by the Vibe Coding Apps team. Special thanks to the Gemini and Firebase teams for powering the core experience.

Contact
-------
For questions or feature requests: open an issue or reach out on GitHub at [Mandip77](https://github.com/Mandip77).
