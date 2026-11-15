import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const app = document.querySelector('#app');

app.innerHTML = `
  <div id="menu-screen" class="screen">
    <div class="menu-panel">
      <div class="brand-block">
        <div class="brand-mark">✦</div>
        <div>
          <p class="brand-kicker">rodzinna gra planszowa</p>
          <h1>BEZKRES</h1>
        </div>
      </div>

      <div class="menu-form">
        <label class="field-row">
          <span>Gracze</span>
          <select id="player-count">
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4" selected>4</option>
            <option value="5">5</option>
          </select>
        </label>

        <label class="field-row">
          <span>Długość planszy</span>
          <select id="board-length">
            <option value="10">10 pól</option>
            <option value="14" selected>14 pól</option>
            <option value="18">18 pól</option>
          </select>
        </label>

        <div id="player-names" class="player-name-grid"></div>

        <button id="start-button" class="action-button" type="button">Rozpocznij podróż</button>
      </div>
    </div>
  </div>

  <div id="game-screen" class="screen hidden">
    <header class="hud">
      <div class="hud-pill">
        <span class="hud-label">Aktywny gracz</span>
        <strong id="turn-info">Gracz 1</strong>
      </div>
      <div class="hud-pill score-pill">
        <span class="hud-label">Punkty</span>
        <strong id="score-info">0</strong>
      </div>
    </header>

    <div id="game-canvas" aria-label="Plansza gry"></div>

    <div class="footer-bar">
      <div id="status-text" class="status-text">Wybierz gracza i rozpocznij rozgrywkę.</div>
      <button id="roll-button" class="roll-button" type="button" aria-label="Rzuć kostką">
        <span class="roll-label">Rzuć kostką</span>
        <div id="dice-cube" class="dice-cube" aria-hidden="true">
          <span class="face front">1</span>
          <span class="face back">6</span>
          <span class="face right">2</span>
          <span class="face left">5</span>
          <span class="face top">3</span>
          <span class="face bottom">4</span>
        </div>
      </button>
    </div>
  </div>
`;

const refs = {
  menuScreen: document.querySelector('#menu-screen'),
  gameScreen: document.querySelector('#game-screen'),
  playerCount: document.querySelector('#player-count'),
  boardLength: document.querySelector('#board-length'),
  playerNames: document.querySelector('#player-names'),
  startButton: document.querySelector('#start-button'),
  turnInfo: document.querySelector('#turn-info'),
  scoreInfo: document.querySelector('#score-info'),
  gameCanvas: document.querySelector('#game-canvas'),
  rollButton: document.querySelector('#roll-button'),
  statusText: document.querySelector('#status-text'),
  diceCube: document.querySelector('#dice-cube'),
};

const palette = ['#ff7f50', '#7dbaf7', '#ffd166', '#7bc67f', '#bb86fc'];

const state = {
  players: [],
  activeIndex: 0,
  boardLength: 14,
  board: [],
  gameOver: false,
  isRolling: false,
  scene: null,
  camera: null,
  renderer: null,
  controls: null,
  boardGroup: null,
};

function initGame() {
  renderNameFields();
  refs.playerCount.addEventListener('change', renderNameFields);
  refs.startButton.addEventListener('click', startGame);
  refs.rollButton.addEventListener('click', rollDice);
  createScene();
  updateHud();
}

function renderNameFields() {
  const count = Number(refs.playerCount.value);
  const values = Array.from({ length: count }, (_, index) => {
    const previous = refs.playerNames.querySelectorAll('input')[index]?.value?.trim();
    return previous || `Gracz ${index + 1}`;
  });

  refs.playerNames.innerHTML = values
    .map(
      (value, index) => `
        <label class="name-field">
          <span>Gracz ${index + 1}</span>
          <input type="text" maxlength="16" value="${value}" aria-label="Imię gracza ${index + 1}" />
        </label>
      `,
    )
    .join('');
}

function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x8ecaec);
  scene.fog = new THREE.Fog(0x8ecaec, 18, 42);

  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 200);
  camera.position.set(10, 10, 12);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(refs.gameCanvas.clientWidth, refs.gameCanvas.clientHeight);
  refs.gameCanvas.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = true;
  controls.enableZoom = true;
  controls.minDistance = 9;
  controls.maxDistance = 28;
  controls.maxPolarAngle = Math.PI / 2.25;
  controls.target.set(0, 0.4, 0);

  const ambient = new THREE.AmbientLight(0xffffff, 1.25);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight(0xfff4d8, 1.5);
  sun.position.set(8, 14, 5);
  scene.add(sun);

  const boardGroup = new THREE.Group();
  scene.add(boardGroup);

  state.scene = scene;
  state.camera = camera;
  state.renderer = renderer;
  state.controls = controls;
  state.boardGroup = boardGroup;

  buildWorld();
  animate();

  window.addEventListener('resize', () => {
    const width = refs.gameCanvas.clientWidth;
    const height = refs.gameCanvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}

function buildWorld() {
  const { boardGroup } = state;

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(18, 64),
    new THREE.MeshStandardMaterial({ color: 0x6bbf75, roughness: 1 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.35;
  boardGroup.add(ground);

  const regionConfigs = [
    { name: 'wiosna', color: 0x8adf5b, position: [-8, 0, -8], size: [14, 14] },
    { name: 'lato', color: 0xf5d262, position: [8, 0, -8], size: [14, 14] },
    { name: 'jesień', color: 0xef8f56, position: [-8, 0, 8], size: [14, 14] },
    { name: 'zima', color: 0x99d7ff, position: [8, 0, 8], size: [14, 14] },
  ];

  regionConfigs.forEach(({ color, position }) => {
    const region = new THREE.Mesh(
      new THREE.BoxGeometry(position[2] === -8 ? 10 : 10, 0.2, 10),
      new THREE.MeshStandardMaterial({ color, roughness: 1 }),
    );
    region.position.set(position[0], -0.18, position[2]);
    boardGroup.add(region);
  });

  const riverCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-12, 0.05, -2),
    new THREE.Vector3(-4, 0.05, 5),
    new THREE.Vector3(4, 0.05, 7),
    new THREE.Vector3(12, 0.05, 2),
    new THREE.Vector3(15, 0.05, -4),
  ]);
  const river = new THREE.Mesh(
    new THREE.TubeGeometry(riverCurve, 120, 0.55, 18, false),
    new THREE.MeshStandardMaterial({ color: 0x56b8df, emissive: 0x1a5f8b, emissiveIntensity: 0.28 }),
  );
  boardGroup.add(river);

  const bridgePositions = [-8, -2, 4, 10];
  bridgePositions.forEach((x, index) => {
    const bridge = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.22, 0.9),
      new THREE.MeshStandardMaterial({ color: 0x9e7a4f }),
    );
    bridge.position.set(x, 0.35, 0.5 + index * 1.1);
    boardGroup.add(bridge);
  });

  const treePositions = [
    [-11, -9], [-10, 6], [-4, -11], [-2, 10], [5, -10], [9, 8], [12, -5], [12, 6],
    [-12, 2], [0, -2], [7, 2], [1, 12],
  ];

  treePositions.forEach(([x, z]) => {
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.22, 1, 10),
      new THREE.MeshStandardMaterial({ color: 0x784f2f }),
    );
    trunk.position.set(x, 0.6, z);
    boardGroup.add(trunk);

    const crown = new THREE.Mesh(
      new THREE.ConeGeometry(0.8, 2.1, 12),
      new THREE.MeshStandardMaterial({ color: 0x2d8a4b }),
    );
    crown.position.set(x, 1.9, z);
    boardGroup.add(crown);
  });

  const mountainPositions = [
    [-14, -10], [-12, 11], [14, -7], [13, 9], [0, -12], [0, 12],
  ];

  mountainPositions.forEach(([x, z], index) => {
    const mountain = new THREE.Mesh(
      new THREE.ConeGeometry(1.5 + (index % 3) * 0.5, 2.8 + (index % 2), 18),
      new THREE.MeshStandardMaterial({ color: 0x8d8f94 }),
    );
    mountain.position.set(x, 1.6, z);
    boardGroup.add(mountain);
  });

  const ruinPositions = [
    [-6, -7], [2, 8], [9, -2], [-9, 9],
  ];

  ruinPositions.forEach(([x, z]) => {
    const ruin = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 1.2, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x6d7280, roughness: 0.9 }),
    );
    ruin.position.set(x, 0.7, z);
    boardGroup.add(ruin);
  });
}

function startGame() {
  const playerCount = Number(refs.playerCount.value);
  const boardLength = Number(refs.boardLength.value);
  const names = Array.from(refs.playerNames.querySelectorAll('input')).map((input, index) => {
    const raw = input.value.trim();
    return raw || `Gracz ${index + 1}`;
  });

  state.boardLength = boardLength;
  state.activeIndex = 0;
  state.gameOver = false;
  state.isRolling = false;
  state.players = names.slice(0, playerCount).map((name, index) => ({
    name,
    score: 0,
    position: 0,
    color: palette[index % palette.length],
    mesh: null,
    number: index + 1,
  }));

  refs.menuScreen.classList.add('hidden');
  refs.gameScreen.classList.remove('hidden');

  buildBoard(boardLength);
  placePawns();
  updateHud();
  updateStatus(`${state.players[0].name} zaczyna podróż.`);
  refs.rollButton.disabled = false;
}

function buildBoard(length) {
  const tiles = [];
  for (let i = 0; i < length; i += 1) {
    const t = i / Math.max(1, length - 1);
    const x = -11 + t * 22 + Math.sin(i * 1.2) * 2.5;
    const z = 8 * Math.cos(i * 0.95) + (t - 0.5) * 6;
    const region = i < length * 0.25 ? 'wiosna' : i < length * 0.5 ? 'lato' : i < length * 0.75 ? 'jesień' : 'zima';
    const reward = i === 0 ? 0 : i % 4 === 0 ? 4 : i % 3 === 0 ? 2 : 1;

    const tile = new THREE.Mesh(
      new THREE.CylinderGeometry(0.95, 0.95, 0.28, 18),
      new THREE.MeshStandardMaterial({
        color: region === 'wiosna' ? 0x61c97b : region === 'lato' ? 0xf7d76b : region === 'jesień' ? 0xe3875b : 0x9bccf5,
      }),
    );
    tile.position.set(x, 0.18, z);
    tile.castShadow = true;

    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(reward > 0 ? 0.28 : 0.01, 16, 16),
      new THREE.MeshStandardMaterial({
        color: reward > 0 ? 0xf4d35e : 0x000000,
        emissive: reward > 0 ? 0x9a7300 : 0x000000,
        emissiveIntensity: reward > 0 ? 0.6 : 0,
      }),
    );
    marker.position.set(x, 0.7, z);
    marker.visible = reward > 0;

    state.boardGroup.add(tile);
    state.boardGroup.add(marker);

    tiles.push({ x, z, region, reward, collected: false, marker, tile });
  }

  state.board = tiles;
}

function placePawns() {
  const firstTile = state.board[0];
  state.players.forEach((player, index) => {
    const pawn = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 18, 18),
      new THREE.MeshStandardMaterial({ color: player.color, emissive: player.color, emissiveIntensity: 0.22 }),
    );
    pawn.position.set(firstTile.x + index * 0.8, 0.7, firstTile.z + index * 0.4);
    state.boardGroup.add(pawn);
    player.mesh = pawn;
    player.position = 0;
  });
}

function updateHud() {
  const activePlayer = state.players[state.activeIndex] || { name: '—' };
  refs.turnInfo.textContent = activePlayer.name || '—';
  refs.scoreInfo.textContent = state.players.length
    ? state.players.map((player) => `${player.name}: ${player.score}`).join('  •  ')
    : '0';
}

function updateStatus(message) {
  refs.statusText.textContent = message;
}

function rollDice() {
  if (state.isRolling || state.gameOver || !state.players.length) {
    return;
  }

  state.isRolling = true;
  refs.rollButton.disabled = true;
  const result = 1 + Math.floor(Math.random() * 6);

  const start = performance.now();
  const duration = 850;

  const tick = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const angleX = eased * 7.5 * Math.PI;
    const angleY = eased * 10 * Math.PI;
    refs.diceCube.style.transform = `rotateX(${angleX}rad) rotateY(${angleY}rad) rotateZ(${eased * 5 * Math.PI}rad)`;

    if (progress < 1) {
      requestAnimationFrame(tick);
      return;
    }

    state.isRolling = false;
    refs.rollButton.disabled = state.gameOver;
    moveActivePlayer(result);
  };

  requestAnimationFrame(tick);
}

function moveActivePlayer(rollValue) {
  const player = state.players[state.activeIndex];
  if (!player) {
    return;
  }

  const targetPosition = Math.min(state.boardLength - 1, player.position + rollValue);
  player.position = targetPosition;

  const tile = state.board[targetPosition];
  player.mesh.position.set(tile.x, 0.7, tile.z);

  if (tile.reward > 0 && !tile.collected) {
    player.score += tile.reward;
    tile.collected = true;
    tile.marker.visible = false;
    updateStatus(`${player.name} zdobywa ${tile.reward} punktów na polu ${targetPosition + 1}.`);
  } else {
    updateStatus(`${player.name} przesuwa się na pole ${targetPosition + 1}.`);
  }

  if (targetPosition >= state.boardLength - 1) {
    state.gameOver = true;
    refs.rollButton.disabled = true;
    updateStatus(`${player.name} wygrywa krainę!`);
    updateHud();
    return;
  }

  state.activeIndex = (state.activeIndex + 1) % state.players.length;
  updateHud();
  const nextPlayer = state.players[state.activeIndex];
  const nextTile = state.board[nextPlayer.position];
  if (nextTile) {
    state.camera.position.lerp(new THREE.Vector3(nextTile.x + 6, 8, nextTile.z + 8), 0.12);
    state.controls.target.lerp(new THREE.Vector3(nextTile.x, 0.5, nextTile.z), 0.2);
  }
  updateStatus(`${nextPlayer.name} ma teraz ruch.`);
  refs.rollButton.disabled = false;
}

function animate() {
  requestAnimationFrame(animate);

  if (state.scene && state.camera && state.renderer) {
    if (state.players.length && !state.gameOver) {
      const active = state.players[state.activeIndex];
      if (active && active.mesh) {
        const desired = active.mesh.position.clone().add(new THREE.Vector3(7, 7, 8));
        state.camera.position.lerp(desired, 0.06);
        state.controls.target.lerp(new THREE.Vector3(active.mesh.position.x, 0.7, active.mesh.position.z), 0.14);
      }
    }

    state.controls.update();
    state.renderer.render(state.scene, state.camera);
  }
}

export { initGame };
