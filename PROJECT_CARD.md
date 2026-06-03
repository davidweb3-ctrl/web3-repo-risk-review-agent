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

Choose the final video positioning:

- prototype wording: deterministic demo plus GitLab MCP-compatible action contract; or
- live integration wording: record Gemini/GitLab MCP auth and read-only GitLab context retrieval first.

Then record a short demo video before final Devpost submission.

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

Video acceptance gate:

- Check every sampled frame for normal content and no broken/corrupted/blank frame.
- Run a full decode check before upload.
- Confirm narration audio exists and is clear.
- Confirm audio and visuals line up within about `1` second.
- Do not upload or submit the video until the frame, decode, audio, sync, and privacy checks in `docs/video-plan.md` pass.
