* {
  box-sizing: border-box;
}

html,
body,
#app {
  margin: 0;
  width: 100%;
  min-height: 100%;
  height: 100%;
  font-family: "Segoe UI", system-ui, sans-serif;
  background: radial-gradient(circle at top, #dff5ff 0%, #b8d9ec 35%, #6e99b5 100%);
  color: #112334;
}

button,
input,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

.screen {
  width: 100%;
  height: 100%;
}

.screen.hidden {
  display: none;
}

.menu-panel {
  width: min(680px, 100% - 28px);
  margin: 0 auto;
  padding: 28px 24px 32px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 22px;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 18px;
  background: rgba(18, 33, 44, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.32);
  border-radius: 24px;
  padding: 22px 18px;
  backdrop-filter: blur(8px);
  box-shadow: 0 18px 42px rgba(13, 32, 46, 0.12);
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d9f6c7, #7bc67f 60%, #4d7d4e);
  color: #112334;
  font-size: 2rem;
  box-shadow: 0 10px 28px rgba(63, 126, 60, 0.28);
}

.brand-kicker {
  margin: 0 0 6px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.7rem;
  opacity: 0.8;
}

.brand-block h1 {
  margin: 0;
  font-size: clamp(2.6rem, 6vw, 4.2rem);
  letter-spacing: 0.18em;
  line-height: 0.95;
}

.menu-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(13, 32, 46, 0.12);
  border-radius: 26px;
  padding: 20px;
  box-shadow: 0 18px 38px rgba(24, 47, 63, 0.14);
}

.field-row,
.name-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-weight: 600;
}

.field-row span {
  color: #1a2d3d;
}

.field-row select,
.name-field input {
  min-width: 160px;
  padding: 12px 14px;
  border: 1px solid rgba(18, 33, 44, 0.18);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.76);
  color: #142434;
}

.player-name-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 12px;
}

.name-field {
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.name-field input {
  width: 100%;
}

.action-button,
.roll-button {
  border: none;
  border-radius: 18px;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.action-button {
  padding: 16px 18px;
  background: linear-gradient(135deg, #d8f4b8, #82c76f 60%, #456d3a);
  color: #10263a;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  box-shadow: 0 12px 20px rgba(69, 109, 58, 0.28);
}

.action-button:hover,
.roll-button:hover {
  transform: translateY(-2px) scale(1.01);
}

#game-screen {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.hud {
  position: absolute;
  top: 18px;
  left: 18px;
  right: 18px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  z-index: 3;
  pointer-events: none;
}

.hud-pill {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: rgba(17, 25, 30, 0.56);
  color: #ecfbff;
  padding: 10px 14px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(10px);
  min-width: 160px;
  pointer-events: auto;
}

.hud-label {
  font-size: 0.74rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.8;
}

.score-pill {
  text-align: right;
}

#game-canvas {
  flex: 1;
  min-height: 56vh;
  width: 100%;
}

#game-canvas canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.footer-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 18px;
  padding: 0 20px 20px;
  pointer-events: none;
}

.status-text {
  max-width: min(52vw, 500px);
  min-height: 52px;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border-radius: 16px;
  background: rgba(16, 39, 53, 0.58);
  color: #ecfbff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  box-shadow: 0 20px 44px rgba(10, 20, 29, 0.16);
  pointer-events: auto;
}

.roll-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: linear-gradient(180deg, rgba(21, 44, 62, 0.52), rgba(10, 26, 37, 0.88));
  padding: 16px 18px 14px;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 18px 32px rgba(14, 24, 32, 0.42);
  min-width: 220px;
  pointer-events: auto;
}

.roll-button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.roll-label {
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.dice-cube {
  position: relative;
  width: 52px;
  height: 52px;
  transform-style: preserve-3d;
  transition: transform 0.24s ease;
}

.face {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: linear-gradient(135deg, #fffaf0, #d5f1ff 58%, #c9d9ff);
  color: #16324d;
  font-weight: 900;
  border: 1px solid rgba(15, 29, 41, 0.18);
  box-shadow: inset -6px -8px 16px rgba(79, 104, 132, 0.14);
}

.front { transform: rotateY(0deg) translateZ(26px); }
.back { transform: rotateY(180deg) translateZ(26px); }
.right { transform: rotateY(90deg) translateZ(26px); }
.left { transform: rotateY(-90deg) translateZ(26px); }
.top { transform: rotateX(90deg) translateZ(26px); }
.bottom { transform: rotateX(-90deg) translateZ(26px); }

@media (max-width: 720px) {
  .menu-panel {
    width: 100%;
    padding: 20px 14px 26px;
  }

  .brand-block {
    align-items: flex-start;
  }

  .brand-block h1 {
    letter-spacing: 0.1em;
  }

  .field-row {
    flex-direction: column;
    align-items: stretch;
  }

  .field-row select,
  .name-field input {
    width: 100%;
    min-width: 0;
  }

  .hud {
    top: 12px;
    left: 12px;
    right: 12px;
    gap: 8px;
  }

  .hud-pill {
    min-width: 0;
    flex: 1;
    padding: 8px 10px;
  }

  .footer-bar {
    flex-direction: column;
    align-items: stretch;
    padding: 0 12px 12px;
  }

  .status-text {
    max-width: none;
    width: 100%;
  }

  .roll-button {
    width: 100%;
    justify-content: space-between;
    min-width: 0;
  }
}
