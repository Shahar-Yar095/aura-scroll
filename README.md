<div align="center">
  <h1>✨ Aura // Kinetic Scroll</h1>
  <p><strong>Awwwards-Inspired Smooth Scroll & Developer Motion Showcase</strong></p>

  <p>
    <a href="https://github.com/Shahar-Yar095/aura-scroll/actions"><img src="https://img.shields.io/badge/CI-Passing-10b981?style=for-the-badge&logo=githubactions&logoColor=white" alt="CI" /></a>
    <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-38bdf8?style=for-the-badge" alt="License" /></a>
    <img src="https://img.shields.io/badge/Performance-120%20FPS-purple?style=for-the-badge&logo=lighthouse&logoColor=white" alt="FPS" />
    <img src="https://img.shields.io/badge/Animation-GPU%20Native-orange?style=for-the-badge" alt="GPU" />
    <img src="https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  </p>
</div>

---

## 📌 Overview

**Aura** is a high-performance creative web experience engineered with GPU-accelerated parallax motion, real-time scroll velocity telemetry, pinned split-screen reveals, and an interactive developer CLI terminal.

Built with modern **Vanilla CSS & JavaScript** and bundled with **Vite**, Aura demonstrates how to achieve fluid 60–120 FPS interactive motion without relying on heavy third-party animation libraries.

---

## 🚀 Key Features

- **⚡ Real-Time Scroll Velocity Telemetry**: Dynamically calculates and displays instantaneous user scroll speed in pixels per second (`px/s`).
- **🌊 Kinetic Progress Indicator**: Top-edge glowing progress tracker dynamically measuring viewport read progression.
- **🪐 3D Parallax Matrix**: Multi-depth perspective layers that transform smoothly based on scroll distance and viewport coordinates.
- **📌 Pinned Split-Screen Storyline**: Pinned sticky viewports synchronized with progressive content reveals via `IntersectionObserver`.
- **💻 Embedded Interactive CLI Terminal**: Functional in-browser terminal executing commands (`skills`, `projects`, `contact`, `help`, `clear`).
- **♿ WCAG AA & Reduced-Motion Compliant**: Gracefully degrades animations when `prefers-reduced-motion: reduce` is detected.
- **🚀 Zero Bloat**: No heavy GSAP or Three.js dependencies—100% lightweight, native browser rendering.

---

## 🏗️ Architecture & Techniques

```mermaid
graph TD
  ScrollEvent[Passive Window Scroll Listener] --> Velocity[Velocity Delta Calculator dx/dt]
  ScrollEvent --> Progress[Top Glow Progress Width %]
  ScrollEvent --> Parallax[Translate3D Depth Transforms]
  
  Intersection[IntersectionObserver API] --> ActiveStep[Pinned State Coordinator]
  ActiveStep --> Reveal[Sticky Title & Step Glow]
  
  User[Interactive Terminal Input] --> CmdParser[ZSH Command Router]
  CmdParser --> TermDOM[Dynamic Command Output]
```

---

## ⚡ Quickstart

### 1. Clone & Install
```bash
git clone https://github.com/Shahar-Yar095/aura-scroll.git
cd aura-scroll
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for details.
