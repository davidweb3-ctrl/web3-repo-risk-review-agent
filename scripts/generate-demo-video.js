import { execFileSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const demoDir = join(root, "demo");
const renderedDir = join(demoDir, "rendered");
const slideDir = join(renderedDir, "slides");
const audioDir = join(renderedDir, "audio");
const segmentDir = join(renderedDir, "segments");
const videoPath = join(demoDir, "web3-repo-risk-review-agent-demo.mp4");
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const port = 5173;
const baseUrl = `http://127.0.0.1:${port}`;

const scenes = [
  {
    id: "problem",
    kind: "svg",
    durationHint: 18,
    title: "Web3 Repo Risk Review Agent",
    kicker: "Google Rapid Agent Hackathon / GitLab Track",
    body: [
      "Web3 repository changes can affect real value movement:",
      "token approvals, payment limits, autonomous execution,",
      "withdrawal accounting, and release automation.",
      "This agent turns repository context into a release-risk decision."
    ],
    script:
      "Web3 teams often review repository changes that can affect real value movement: token approvals, payment limits, autonomous agent execution, withdrawal accounting, and release automation. A normal code summary is not enough. Teams need a release-risk decision before dangerous changes reach production."
  },
  {
    id: "context",
    kind: "app",
    url: `${baseUrl}/?scenario=payment-guard-mr`,
    script:
      "This project is built for the Google Cloud Rapid Agent Hackathon GitLab track. It takes GitLab-style merge request context: the project, branch, author, changed files, issue signals, diff signals, and test coverage signals. The hosted demo uses deterministic sample context so judges can inspect the workflow without private credentials."
  },
  {
    id: "payment-risk",
    kind: "app",
    url: `${baseUrl}/?scenario=payment-guard-mr#risk-findings`,
    script:
      "In the first scenario, an agent payment flow changes allowance handling, increases a payment policy limit, adds an autonomous execution path, and changes release automation. The agent scores this as one hundred and blocks release. The important part is that it explains why: unlimited approval, payment policy changes, automated execution, release automation, and missing targeted tests."
  },
  {
    id: "actions",
    kind: "app",
    url: `${baseUrl}/?scenario=payment-guard-mr#gitlab-actions`,
    script:
      "The next step is action. The agent proposes GitLab MCP-compatible operations: labeling the merge request, creating a review comment, and opening a release-blocking issue. In production, these actions should be human-approved before writing back to GitLab. The public demo shows the action contract clearly, without requiring write access."
  },
  {
    id: "vault",
    kind: "app",
    url: `${baseUrl}/?scenario=vault-release-mr`,
    script:
      "The second scenario switches to vault withdrawal accounting. This shows the agent is not only looking for payment-policy issues. It also watches for Web3 accounting risk, withdrawal impairment, release automation changes, and missing tests around value-bearing paths."
  },
  {
    id: "docs",
    kind: "app",
    url: `${baseUrl}/?scenario=docs-only-mr`,
    script:
      "The docs-only scenario produces a low-risk path. That matters because a useful release agent should avoid blocking harmless changes. It still calls out review signals when present, but the decision is proportionate to the actual risk."
  },
  {
    id: "integration",
    kind: "svg",
    durationHint: 26,
    title: "Gemini-ready, GitLab MCP-compatible",
    kicker: "Prototype-safe integration evidence",
    body: [
      "Gemini CLI and GitLab MCP configuration were prepared.",
      "GitLab OAuth succeeded, but MCP discovery returned 404.",
      "So this submission does not claim live GitLab MCP runtime access.",
      "The demo uses deterministic context plus MCP-compatible action payloads."
    ],
    script:
      "For integration evidence, Gemini CLI and the GitLab MCP endpoint were configured, and the GitLab OAuth flow completed successfully. After authentication, MCP discovery returned a four oh four response, so this submission does not claim a live connected GitLab MCP runtime. Instead, it presents a Gemini-ready workflow and a GitLab MCP-compatible action boundary."
  },
  {
    id: "close",
    kind: "svg",
    durationHint: 18,
    title: "Open source, hosted, ready for judging",
    kicker: "Web3 release-risk decisions before production incidents",
    body: [
      "Public repo: github.com/davidweb3-ctrl/web3-repo-risk-review-agent",
      "Hosted demo: davidweb3-ctrl.github.io/web3-repo-risk-review-agent/",
      "Path to production: Gemini reasoning + GitLab MCP context + human approval",
      "No private keys, tokens, or private audit material are needed."
    ],
    script:
      "The project is open source, hosted, and ready for judging. The production path is Gemini as the reasoning layer, GitLab MCP for repository context and human-approved actions, and a release gate that helps Web3 teams catch dangerous changes before they become production incidents."
  }
];

function run(command, args, options = {}) {
  execFileSync(command, args, {
    cwd: root,
    stdio: options.stdio || "pipe",
    ...options
  });
}

function prepareDirs() {
  mkdirSync(demoDir, { recursive: true });
  rmSync(renderedDir, { force: true, recursive: true });
  mkdirSync(slideDir, { recursive: true });
  mkdirSync(audioDir, { recursive: true });
  mkdirSync(segmentDir, { recursive: true });
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function svgForScene(scene) {
  const lines = scene.body
    .map((line, index) => `<text x="130" y="${485 + index * 62}" class="body">${escapeXml(line)}</text>`)
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
  <defs>
    <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="100%">
      <stop offset="0%" stop-color="#102a43"/>
      <stop offset="58%" stop-color="#147d64"/>
      <stop offset="100%" stop-color="#f0b429"/>
    </linearGradient>
    <style>
      .kicker { fill: #d9e2ec; font-family: Inter, Arial, sans-serif; font-size: 34px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; }
      .title { fill: #ffffff; font-family: Inter, Arial, sans-serif; font-size: 82px; font-weight: 900; }
      .body { fill: #f8fafc; font-family: Inter, Arial, sans-serif; font-size: 39px; font-weight: 650; }
      .chip { fill: rgba(255,255,255,0.13); stroke: rgba(255,255,255,0.28); stroke-width: 2; }
    </style>
  </defs>
  <rect width="1920" height="1080" fill="url(#bg)"/>
  <circle cx="1600" cy="170" r="210" fill="rgba(255,255,255,0.08)"/>
  <circle cx="1740" cy="870" r="310" fill="rgba(16,42,67,0.16)"/>
  <rect x="104" y="96" width="1712" height="888" rx="28" class="chip"/>
  <text x="130" y="190" class="kicker">${escapeXml(scene.kicker)}</text>
  <text x="130" y="315" class="title">${escapeXml(scene.title)}</text>
  ${lines}
  <text x="130" y="900" class="kicker">Gemini-ready release risk review • GitLab MCP-compatible actions</text>
</svg>`;
}

function capturePagePng(url, out) {
  run(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--window-size=1920,1080",
    "--force-device-scale-factor=1",
    `--screenshot=${out}`,
    url
  ]);
  return out;
}

function convertSvgToPng(scene, svgPath) {
  const htmlPath = join(slideDir, `${scene.id}.html`);
  const pngPath = join(slideDir, `${scene.id}.png`);
  const svg = readFileSync(svgPath, "utf8");

  writeFileSync(htmlPath, `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;width:1920px;height:1080px;overflow:hidden;background:#102a43}svg{display:block;width:1920px;height:1080px}</style></head><body>${svg}</body></html>`);
  return capturePagePng(`file://${htmlPath}`, pngPath);
}

function captureAppPng(scene) {
  return capturePagePng(scene.url, join(slideDir, `${scene.id}.png`));
}

function makeAudio(scene) {
  const out = join(audioDir, `${scene.id}.aiff`);
  run("say", ["-v", "Samantha", "-r", "142", "-o", out, scene.script]);
  return out;
}

function probeDuration(file) {
  const output = execFileSync("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "default=noprint_wrappers=1:nokey=1",
    file
  ]);
  return Number.parseFloat(output.toString().trim());
}

function makeSegment(scene, imagePath, audioPath) {
  const duration = Math.max(probeDuration(audioPath) + 0.2, scene.durationHint || 1);
  const out = join(segmentDir, `${scene.id}.mp4`);
  run("ffmpeg", [
    "-hide_banner",
    "-y",
    "-loop",
    "1",
    "-framerate",
    "30",
    "-t",
    duration.toFixed(2),
    "-i",
    imagePath,
    "-i",
    audioPath,
    "-vf",
    "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p",
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-tune",
    "stillimage",
    "-c:a",
    "aac",
    "-b:a",
    "160k",
    "-shortest",
    out
  ]);
  return out;
}

async function waitForServer(processRef) {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    if (processRef.exitCode !== null) {
      throw new Error("Vite server exited before it became ready");
    }

    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // Keep polling.
    }

    await new Promise((resolvePromise) => setTimeout(resolvePromise, 500));
  }

  throw new Error("Timed out waiting for Vite dev server");
}

function concatSegments(segments) {
  const listPath = join(renderedDir, "segments.txt");
  const list = segments.map((segment) => `file '${segment.replaceAll("'", "'\\''")}'`).join("\n");
  writeFileSync(listPath, list);
  run("ffmpeg", [
    "-hide_banner",
    "-y",
    "-f",
    "concat",
    "-safe",
    "0",
    "-i",
    listPath,
    "-c",
    "copy",
    videoPath
  ]);
}

function runQa() {
  const decodeLog = join(demoDir, "video-decode-errors.log");
  const blackLog = join(demoDir, "blackdetect.log");
  const silenceLog = join(demoDir, "silence.log");
  const frameDir = join(demoDir, "frame-review");

  rmSync(frameDir, { force: true, recursive: true });
  mkdirSync(frameDir, { recursive: true });

  run("ffprobe", ["-hide_banner", videoPath], { stdio: "inherit" });
  run("ffmpeg", ["-v", "error", "-i", videoPath, "-f", "null", "-"], {
    stdio: ["ignore", "ignore", "pipe"]
  });
  writeFileSync(decodeLog, "");
  run("ffmpeg", ["-hide_banner", "-y", "-i", videoPath, "-vf", "fps=1", join(frameDir, "frame-%04d.jpg")]);

  try {
    const blackOutput = execFileSync("ffmpeg", [
      "-hide_banner",
      "-i",
      videoPath,
      "-vf",
      "blackdetect=d=0.5:pix_th=0.10",
      "-an",
      "-f",
      "null",
      "-"
    ], { cwd: root, stdio: ["ignore", "ignore", "pipe"] });
    writeFileSync(blackLog, blackOutput);
  } catch (error) {
    writeFileSync(blackLog, error.stderr || "");
  }

  try {
    const silenceOutput = execFileSync("ffmpeg", [
      "-hide_banner",
      "-i",
      videoPath,
      "-af",
      "silencedetect=n=-35dB:d=2",
      "-f",
      "null",
      "-"
    ], { cwd: root, stdio: ["ignore", "ignore", "pipe"] });
    writeFileSync(silenceLog, silenceOutput);
  } catch (error) {
    writeFileSync(silenceLog, error.stderr || "");
  }

  const duration = probeDuration(videoPath);
  const frameCount = readFileSync(join(renderedDir, "segments.txt"), "utf8").split("\n").filter(Boolean).length;
  console.log(JSON.stringify({
    video: videoPath,
    duration: Number(duration.toFixed(2)),
    segments: frameCount,
    sampledFrames: frameDir
  }, null, 2));
}

prepareDirs();

const server = spawn("npm", ["run", "dev", "--", "--port", String(port)], {
  cwd: root,
  stdio: ["ignore", "pipe", "pipe"]
});

try {
  await waitForServer(server);
  const segments = [];

  for (const scene of scenes) {
    let imagePath;

    if (scene.kind === "svg") {
      const svgPath = join(slideDir, `${scene.id}.svg`);
      writeFileSync(svgPath, svgForScene(scene));
      imagePath = convertSvgToPng(scene, svgPath);
    } else {
      imagePath = captureAppPng(scene);
    }

    const audioPath = makeAudio(scene);
    segments.push(makeSegment(scene, imagePath, audioPath));
  }

  concatSegments(segments);
  runQa();
} finally {
  server.kill("SIGTERM");
}
