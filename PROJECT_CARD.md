# Project Card: Web3 Repo Risk Review Agent

Project ID: P-20260603-google-rapid-agent-hackathon

Command center:

```text
/Users/xiadawei/codeSpace/web3/web3-execution-lab
```

Status: ACTIVE

Local workspace:

```text
/Users/xiadawei/codeSpace/web3/hackathon/web3-repo-risk-review-agent
```

Public repo:

```text
https://github.com/davidweb3-ctrl/web3-repo-risk-review-agent
```

Hosted demo:

```text
https://davidweb3-ctrl.github.io/web3-repo-risk-review-agent/
```

Demo video:

```text
https://github.com/davidweb3-ctrl/web3-repo-risk-review-agent/raw/main/demo/web3-repo-risk-review-agent-demo.mp4
```

Opportunity:

Google Cloud Rapid Agent Hackathon.

Source:

- https://rapid-agent.devpost.com/
- https://info.devpost.com/blog/google-cloud-rapid-agent-hackathon

Rules:

- Do not commit secrets, private keys, API keys, `.env` files, or private repository data.
- Do not claim final Google Cloud / GitLab MCP integration until it is actually wired and verified.
- Do not click final Devpost submit while repository, hosted demo, or video links are placeholders.

Current next action:

Use prototype-safe demo wording unless GitLab MCP discovery starts working:

- Gemini CLI is installed and logged in.
- GitLab MCP endpoint is configured and visible to Gemini CLI.
- GitLab OAuth succeeded through `/mcp auth GitLab`.
- Post-auth MCP discovery failed with `POST /api/v4/mcp` returning `404 Not Found`, so Gemini still shows `GitLab - Disconnected`.
- Do not claim live GitLab MCP runtime integration unless `/mcp` shows connected and a read-only GitLab context retrieval is captured.

Next step: upload/use the demo video link on Devpost, preview the submitted project, and only then click final Devpost submit if all links render correctly.

Latest verification:

- `npm install` succeeded.
- `npm run check` passed.
- Playwright loaded the local app on desktop and mobile viewports.
- Browser console error check passed.
- Local initial commit: `8f2a236`.
- Public GitHub repo created and pushed.
- GitHub Pages deployed successfully.
- Hosted HTML, favicon, JS, and CSS assets returned HTTP 200.
- Gemini/GitLab MCP evidence boundary documented in `docs/gemini-gitlab-mcp-evidence.md`.
- Three-minute demo video plan documented in `docs/video-plan.md`.
- Gemini CLI `0.45.0` is installed and logged in.
- `~/.gemini/settings.json` contains GitLab MCP endpoint `https://gitlab.com/api/v4/mcp`.
- Gemini CLI detects `1 MCP server` in the project workspace.
- GitLab OAuth succeeded, but post-auth MCP discovery returned `404 Not Found`; GitLab remains disconnected in Gemini CLI.
- Live GitLab MCP read-only runtime evidence is blocked until GitLab MCP discovery succeeds.
- Prototype-safe demo video generated at `demo/web3-repo-risk-review-agent-demo.mp4`.
- Video duration is `167.88s` (`2:47.88`), resolution is `1920x1080`, and audio is AAC mono.
- `demo/video-qa-report.md` records the decode, black-screen, silence, sampled-frame, privacy, and contact-sheet checks.

Video acceptance gate:

- Check every sampled frame for normal content and no broken/corrupted/blank frame.
- Run a full decode check before upload.
- Confirm narration audio exists and is clear.
- Confirm audio and visuals line up within about `1` second.
- Do not final-submit on Devpost until the video URL works in a logged-out browser or Devpost preview. If Devpost rejects a raw GitHub MP4 URL, upload the same MP4 to YouTube/Vimeo and use that URL instead.
