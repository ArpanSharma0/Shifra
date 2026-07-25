# 🤖 ShifraAI - Smart Voice AI Assistant Platform for Websites

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=nodedotjs)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Gemini AI](https://img.shields.io/badge/AI-Google_Gemini-4285F4?logo=google-gemini)](https://ai.google.dev/)

**ShifraAI** is a full-stack platform that empowers website owners to easily build, train, customize, and embed interactive **Voice AI Assistants** onto any website with a single line of JavaScript script tag. 

With ShifraAI, website visitors can ask questions via voice or text, get instant natural spoken answers, and navigate between pages on the target website using voice commands.

---

## 📑 Table of Contents

- [Features](#-features)
- [How the Project Works (System Architecture)](#-how-the-project-works-system-architecture)
  - [1. Technical Architecture & Tech Stack](#1-technical-architecture--tech-stack)
  - [2. AI & Prompt Engineering Engine](#2-ai--prompt-engineering-engine)
  - [3. Voice & Speech Recognition Engine](#3-voice--speech-recognition-engine)
  - [4. Smart Voice Navigation Engine](#4-smart-voice-navigation-engine)
  - [5. Embeddable Widget Mechanism (`assistant.js`)](#5-embeddable-widget-mechanism-assistantjs)
  - [6. Plan & Usage Management](#6-plan--usage-management)
- [User Guide: How to Use ShifraAI (Frontend Walkthrough)](#-user-guide-how-to-use-shifraai-frontend-walkthrough)
  - [Step 1: Account Authentication](#step-1-account-authentication)
  - [Step 2: Assistant Builder & Customization](#step-2-assistant-builder--customization)
  - [Step 3: Interactive Live Preview](#step-3-interactive-live-preview)
  - [Step 4: Embedding Assistant on Your Website](#step-4-embedding-assistant-on-your-website)
  - [Step 5: Visitor Experience on Your Website](#step-5-visitor-experience-on-your-website)
  - [Step 6: Subscription & Plan Management](#step-6-subscription--plan-management)
- [API Reference](#-api-reference)
- [Project Directory Structure](#-project-directory-structure)
- [Local Setup & Development Guide](#-local-setup--development-guide)
  - [Prerequisites](#prerequisites)
  - [1. Backend Setup (`Server`)](#1-backend-setup-server)
  - [2. Frontend Setup (`Client`)](#2-frontend-setup-client)
  - [3. Running locally](#3-running-locally)

---

## ✨ Features

- 🎙️ **Voice & Speech AI**: Natural real-time voice input using Web Speech API with automatic Text-to-Speech (TTS) voice playback.
- 🗺️ **Voice-Driven Navigation**: Visitors can say *"take me to contact page"* or *"show pricing"*, and the AI dynamically routes them to the appropriate URL.
- 🎨 **Visual Customization**: Choose between themes (**Dark**, **Light**, **Glass**, **Neon**) and conversation tones (**Friendly**, **Professional**, **Sales**).
- 🧠 **Trainable AI Context**: Configure your business name, type, description, and custom navigation keywords to align responses with your brand.
- 🔑 **Bring Your Own Gemini API Key**: Seamlessly connect your Google Gemini API key for fast model execution (`gemini-3.5-flash`).
- 🔌 **1-Click Script Embed**: Embed the entire voice widget into any web platform (HTML, React, WordPress, Shopify, Next.js) using one `<script>` tag.
- 💳 **Subscription & Billing System**: Built-in free quota management (200 AI messages) with Razorpay integration for Pro tier upgrades.

---

## 🏗️ How the Project Works (System Architecture)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                USER / VISITOR                               │
│                         (Interacts via Voice / Text)                        │
└───────────────────────┬─────────────────────────────▲───────────────────────┘
                        │                             │
                        │ Embedded Widget Script      │ Voice Output (TTS)
                        ▼                             │ & UI Update
┌─────────────────────────────────────────────────────┴───────────────────────┐
│                      EMBEDDED WIDGET (assistant.js)                         │
│   • Speech Recognition (STT)      • Audio Wave Animations                   │
│   • Theme Rendering (CSS)         • Web Speech Synthesis                    │
└───────────────────────┬─────────────────────────────────────────────────────┘
                        │ API HTTP Request (askAssistant)
                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                             SHIFRA AI SERVER                                │
│                     (Express.js 5 + Node.js Backend)                        │
│                                                                             │
│  ┌───────────────────────┐ ┌──────────────────────┐ ┌────────────────────┐ │
│  │   Auth & Middleware   │ │  Navigation Routing  │ │ Billing & Quota    │ │
│  │   JWT / Cookies       │ │  Keyword Matcher     │ │ Razorpay SDK       │ │
│  └───────────────────────┘ └──────────────────────┘ └────────────────────┘ │
└──────────────┬──────────────────────────────────────────────┬───────────────┘
               │ Query with System Instruction                │ Save User / Quota
               ▼                                              ▼
┌──────────────────────────────┐              ┌──────────────────────────────┐
│       GOOGLE GEMINI AI       │              │      MONGODB DATABASE        │
│    (gemini-3.5-flash API)    │              │ (Users, Assistant Configs,   │
│                              │              │       Plans & Usage)         │
└──────────────────────────────┘              └──────────────────────────────┘
```

### 1. Technical Architecture & Tech Stack

The system is designed with a decoupled Client-Server architecture:

- **Frontend (Client)**: Built with **React 19**, **Vite**, **Tailwind CSS 4**, and **React Router 7**. Handles user registration, assistant configuration builder, visual theme previews, and subscription management.
- **Backend (Server)**: Built with **Express 5** on **Node.js** paired with **MongoDB (Mongoose)** for persistent data storage, cookie-based JWT authentication, and **Razorpay** SDK for processing payments.
- **Embedded Widget (`assistant.js` + `assistant.css`)**: Lightweight standalone JavaScript asset served directly by the platform. When loaded on external websites, it fetches the user's assistant configurations and renders a responsive voice interface overlay.

### 2. AI & Prompt Engineering Engine

When a message is sent to the assistant:
1. The server fetches the user's business metadata (Assistant Name, Business Name, Business Type, Description, Tone).
2. It compiles a targeted **System Instruction**:
   - Forces replies under 15 words for snappy voice playback.
   - Enforces the chosen tone (Friendly, Professional, Sales).
   - Constrains responses strictly to the business context.
3. The backend sends the prompt, conversation history, and system instructions to Google Gemini API (`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent`).
4. Automated API health checks continuously track key validity (`active`, `invalid`, `quota_exceeded`).

### 3. Voice & Speech Recognition Engine

- **Speech-to-Text (STT)**: Utilizes the browser-native `webkitSpeechRecognition` / `SpeechRecognition` API to transcribe speech in real time.
- **Text-to-Speech (TTS)**: Synthesizes responses using `window.speechSynthesis` with speech rate and pitch matching natural human cadence.

### 4. Smart Voice Navigation Engine

Before passing queries to the LLM, the backend checks if the message contains navigation intent keywords (e.g., `"go to"`, `"open"`, `"show"`, `"navigate"`, `"take me"`):
- If a navigation keyword matches a configured page route (e.g., `"pricing"` ➔ `/pricing`), the server immediately returns a `navigate` action payload.
- The embedded widget receives the response and triggers client-side window redirection (`window.location.href = path`), speaking out a confirmation like *"Opening Pricing Page"*.

### 5. Embeddable Widget Mechanism (`assistant.js`)

Website owners add a single script tag to their website:
```html
<script src="http://localhost:5173/assistant.js" data-user-id="YOUR_USER_ID"></script>
```
1. The script reads the `data-user-id` attribute.
2. It dynamically injects `assistant.css` and constructs a popup floating action button on the lower corner of the host site.
3. It fetches the host's assistant config from `/api/assistant/config/:userId` to apply the custom theme, assistant name, and initial settings.

### 6. Plan & Usage Management

- **Free Tier**: Includes 200 free AI message responses. Every request increments `totalMessages`.
- **Pro Tier**: Offers unlimited messages for 3 months upon completing payment via Razorpay.

---

## 📖 User Guide: How to Use ShifraAI (Frontend Walkthrough)

Here is a step-by-step guide for normal users on how to set up and use their Voice AI Assistant:

### Step 1: Account Authentication
1. Open the ShifraAI application home page.
2. Click **Continue with Google** to sign in using your Google account via Firebase OAuth.
3. Upon successful login, you will be redirected to the main dashboard.

### Step 2: Assistant Builder & Customization
Navigate to the **Builder** tab (`/builder`) to configure your custom AI assistant:

1. **Basic Identity**:
   - **Assistant Name**: Enter a name for your AI (e.g., *"Shifra"*, *"Alex"*, *"Maya"*).
   - **Business Name**: Enter your company or project name (e.g., *"Acme E-Commerce"*).
   - **Business Type**: Specify your niche (e.g., *"E-Commerce Store"*, *"SaaS Platform"*, *"Medical Clinic"*).
   - **Business Description**: Describe your products, services, operating hours, or FAQs so the AI knows what your business does.

2. **Persona & Aesthetics**:
   - **Tone**: Select how your assistant speaks (**Friendly**, **Professional**, or **Sales**).
   - **Theme**: Select visual styling (**Dark**, **Light**, **Glass**, or **Neon**).

3. **Gemini API Key**:
   - Paste your personal Google Gemini API key into the input field. (Get a key from [Google AI Studio](https://aistudio.google.com/)).

4. **Voice Navigation Setup**:
   - Add pages of your website so visitors can navigate by voice.
   - Example: 
     - **Page Name**: `Pricing`
     - **Path**: `/pricing`
     - **Keywords**: `pricing, plans, subscription, cost, buy`
   - Click **Add Page**.

5. **Save Configuration**:
   - Click **Save Assistant** to store your setup.

### Step 3: Interactive Live Preview
- On the Builder page, click **Preview Assistant** to launch an interactive demo widget right inside your browser.
- Tap the microphone button and ask questions or test navigation commands (e.g., *"What services do you offer?"* or *"Open pricing"*).

### Step 4: Embedding Assistant on Your Website
Once saved, an embed code card will display your unique JavaScript code block:

```html
<script src="http://localhost:5173/assistant.js" data-user-id="YOUR_USER_ID"></script>
```

1. Click the **Copy Code** button.
2. Paste this code snippet into the `<head>` or `<body>` tag of your website:
   - **HTML / Static Sites**: Paste before `</body>` in `index.html`.
   - **WordPress**: Insert using an Header/Footer script plugin or `header.php`.
   - **React / Next.js**: Place in `index.html` or insert via script tag in `_document.jsx`.
   - **Shopify**: Insert into `theme.liquid`.

### Step 5: Visitor Experience on Your Website
When visitors visit your website:
1. They see a sleek floating AI button in the corner.
2. Clicking or tapping the button opens the Voice Overlay.
3. Visitors tap the microphone and speak naturally.
4. The AI responds with both an animated wave audio voice response and on-screen text.
5. If the visitor asks to navigate to a page (e.g., *"Take me to contact us"*), the assistant opens the page automatically!

### Step 6: Subscription & Plan Management
Navigate to the **Billing** tab (`/billing`):
- View your **Current Plan**, **Gemini Key Status**, and **Remaining Messages / Expiry Days**.
- **Free Plan**: Allows up to 200 message responses.
- **Upgrade to Pro Plan**:
  1. Click **Upgrade Now** under the Pro Plan card (₹699 for 3 months).
  2. The secure Razorpay payment modal will pop up.
  3. Complete payment using UPI, Credit/Debit Card, or Net Banking.
  4. Your account is immediately upgraded to Pro with unlimited messages!

---

## 📡 API Reference

### Auth Routes (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/google` | Google Firebase OAuth sign-in & JWT cookie issue | No |
| `GET` | `/api/auth/logout` | Clears authentication session cookie | Yes |

### User Routes (`/api/user`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/user/current-user` | Fetches logged-in user profile & config | Yes |
| `POST` | `/api/user/save-assistant` | Updates assistant config, pages, & settings | Yes |

### Assistant Routes (`/api/assistant`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/assistant/config/:userId` | Public config fetch for host site widget | No |
| `POST` | `/api/assistant/ask` | Sends query to Gemini AI / handles voice nav | No (Public widget) |

### Billing Routes (`/api/billing`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/billing/order` | Creates a Razorpay payment order for Pro plan | Yes |
| `POST` | `/api/billing/verify` | Verifies Razorpay payment signature & unlocks Pro | Yes |

---

## 📁 Project Directory Structure

```
5.ShifraAI/
├── Client/                         # React Frontend Application
│   ├── public/                     # Public static assets & embeddable widget
│   │   ├── assistant.js            # Embeddable Widget Logic (STT/TTS/Navigation)
│   │   ├── assistant.css           # Widget CSS Themes & Animations
│   │   ├── logo.png                # Brand Logo
│   │   └── mic.svg                 # Microphone Icon
│   ├── src/
│   │   ├── assets/                 # Brand Assets
│   │   ├── Components/
│   │   │   ├── AssistantPreview.jsx# Live interactive assistant preview modal
│   │   │   ├── Navbar.jsx          # Top Navigation Bar
│   │   │   └── ProtectedRoute.jsx  # Route guard for auth-protected pages
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Landing Page & Feature highlights
│   │   │   ├── Login.jsx           # Google Authentication screen
│   │   │   ├── Builder.jsx         # Assistant customization dashboard
│   │   │   └── Billing.jsx         # Subscription & Razorpay checkout
│   │   ├── utils/
│   │   │   └── firebase.js         # Firebase Auth configuration
│   │   ├── App.jsx                 # Routes & global state initializer
│   │   └── main.jsx                # Application Entry point
│   ├── package.json
│   └── vite.config.js
│
├── Server/                         # Express Node.js Backend Server
│   ├── Configs/
│   │   ├── ConnectDB.js            # MongoDB Mongoose Connection
│   │   └── gemini.js               # Google Gemini API integration module
│   ├── Controllers/
│   │   ├── assistant.controller.js # AI prompt construction & navigation logic
│   │   ├── auth.controller.js      # Google OAuth login & JWT controller
│   │   ├── billing.controller.js   # Razorpay order creation & signature verification
│   │   └── user.controller.js      # User profile & assistant config management
│   ├── Middleware/
│   │   └── isAuth.js               # JWT verification middleware
│   ├── Models/
│   │   ├── user.model.js           # User schema (Config, Pages, Limits, Gemini key)
│   │   └── billing.model.js        # Transaction & billing audit schema
│   ├── Routes/
│   │   ├── assistant.route.js      # Widget API endpoints
│   │   ├── auth.route.js           # Authentication endpoints
│   │   ├── billing.route.js        # Razorpay endpoints
│   │   └── user.route.js           # User management endpoints
│   ├── index.js                    # Express app initialization & server entry
│   └── package.json
│
└── README.md                       # Main Project Documentation
```

---

## 🛠️ Local Setup & Development Guide

Follow these instructions to run ShifraAI on your local computer:

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **MongoDB** (Local instance or MongoDB Atlas Connection URI)
- **Firebase Project** (For Google OAuth authentication)
- **Google Gemini API Key** (From Google AI Studio)
- **Razorpay Account** (Key ID & Key Secret for payment testing)

---

### 1. Backend Setup (`Server`)

1. Navigate to the `Server` directory:
   ```bash
   cd Server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `Server/` folder:
   ```env
   PORT=8000
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

---

### 2. Frontend Setup (`Client`)

1. Open a new terminal and navigate to the `Client` directory:
   ```bash
   cd Client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `Client/` folder:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

---

### 3. Running Locally

1. Start the **Server** (Runs on port `8000`):
   ```bash
   cd Server
   npm run dev
   ```

2. Start the **Client** (Runs on `http://localhost:5173`):
   ```bash
   cd Client
   npm run dev
   ```

3. Open your browser and navigate to **`http://localhost:5173`**.

---

### 💡 License

This project is licensed under the **ISC License**.
#   S h i f r a  
 