# AI Content Repurposing App 🚀

A powerful SaaS application that repurposes YouTube videos into multi-platform content (TikTok scripts, LinkedIn posts, Newsletters) using local AI models (Ollama/Gemini).

## 🌟 Features

-   **Deep Space UI:** Modern, glassmorphic design with framer-motion animations.
-   **Content Generation:** Transforms YouTube URLs or transcripts into tailored content.
-   **Multi-Platform:** Generates optimized content for TikTok, LinkedIn, Twitter, and Email.
-   **Feature Gating (SaaS):**
    -   **Free Tier:** 3 videos/month, Standard Models.
    -   **Pro Tier:** Unlimited generation, Advanced Models (GPT-4o/Claude).
-   **Secure Auth:** Email/Password authentication via Supabase.
-   **Global Navbar:** Persistent floating navigation.

## 🛠 Tech Stack

-   **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Lucide React.
-   **Backend:** Node.js, Express, Supabase (Auth & DB).
-   **AI Engine:** Local Ollama (Support for Gemma 2, Llama 3) or Gemini API.

## 🚀 Getting Started

### Prerequisites

1.  **Node.js** (v18+)
2.  **Supabase Account** (for Auth & Database)
3.  **Ollama** (installed locally for AI)

### Installation

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    cd server
    npm install
    ```

### Configuration

1.  **Backend (`server/.env`):**
    ```env
    PORT=3000
    SUPABASE_URL=your_supabase_url
    SUPABASE_ANON_KEY=your_supabase_anon_key
    GEMINI_API_KEY=your_gemini_key
    ```

2.  **Frontend (`.env`):**
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

3.  **Database Setup:**
    Run the `db_schema.sql` script in your Supabase SQL Editor to create the `profiles` table.

### Running the App

1.  **Start the Backend:**
    ```bash
    cd server
    node server.js
    ```
2.  **Start the Frontend:**
    ```bash
    # In project root
    npm run dev
    ```

## 📦 Building for Production

To create a production build of the frontend:

```bash
npm run build
```

This will generate a `dist` folder ready for deployment to Vercel, Netlify, or any static host.

## 🛡 License

MIT

A powerful SaaS application that repurposes YouTube videos into multi-platform content (TikTok scripts, LinkedIn posts, Newsletters) using local AI models (Ollama/Gemini).

## 🌟 Features

-   **Deep Space UI:** Modern, glassmorphic design with framer-motion animations.
-   **Content Generation:** Transforms YouTube URLs or transcripts into tailored content.
-   **Multi-Platform:** Generates optimized content for TikTok, LinkedIn, Twitter, and Email.
-   **Feature Gating (SaaS):**
    -   **Free Tier:** 3 videos/month, Standard Models.
    -   **Pro Tier:** Unlimited generation, Advanced Models (GPT-4o/Claude).
-   **Secure Auth:** Email/Password authentication via Supabase.
-   **Global Navbar:** Persistent floating navigation.

## 🛠 Tech Stack

-   **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Lucide React.
-   **Backend:** Node.js, Express, Supabase (Auth & DB).
-   **AI Engine:** Local Ollama (Support for Gemma 2, Llama 3) or Gemini API.

## 🚀 Getting Started

### Prerequisites

1.  **Node.js** (v18+)
2.  **Supabase Account** (for Auth & Database)
3.  **Ollama** (installed locally for AI)

### Installation

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    cd server
    npm install
    ```

### Configuration

1.  **Backend (`server/.env`):**
    ```env
    PORT=3000
    SUPABASE_URL=your_supabase_url
    SUPABASE_ANON_KEY=your_supabase_anon_key
    GEMINI_API_KEY=your_gemini_key
    ```

2.  **Frontend (`.env`):**
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

3.  **Database Setup:**
    Run the `db_schema.sql` script in your Supabase SQL Editor to create the `profiles` table.

### Running the App

1.  **Start the Backend:**
    ```bash
    cd server
    node server.js
    ```
2.  **Start the Frontend:**
    ```bash
    # In project root
    npm run dev
    ```

## 📦 Building for Production

To create a production build of the frontend:

```bash
npm run build
```

This will generate a `dist` folder ready for deployment to Vercel, Netlify, or any static host.

## 🛡 License

MIT
