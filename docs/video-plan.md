# Three-Minute Demo Video Plan

Target length: 2:45 to 3:10.

## Video Goal

Show that Web3 Repo Risk Review Agent is a functional agent workflow that turns GitLab repository context into a clear release decision, explains Web3-specific risks, and prepares GitLab MCP-compatible actions.

## Recording Assets

- Hosted demo: https://davidweb3-ctrl.github.io/web3-repo-risk-review-agent/
- Public repo: https://github.com/davidweb3-ctrl/web3-repo-risk-review-agent
- Evidence doc: `docs/gemini-gitlab-mcp-evidence.md`
- Demo script: `docs/demo-script.md`

## Timeline

### 0:00-0:20 - Problem

Narration:

> Web3 teams often review repository changes that can affect real value movement: token approvals, payment limits, autonomous agent execution, withdrawal accounting, and CI release automation. A normal code summary is not enough; teams need a release-risk decision.

Visual:

- Open the hosted demo.
- Show title and risk-score panel.

### 0:20-0:45 - Agent Context

Narration:

> This agent is designed for the Google Cloud Rapid Agent Hackathon GitLab track. It takes GitLab-style merge request context: changed files, branch metadata, issue signals, and test coverage signals.

Visual:

- Show the left GitLab Context panel.
- Point to project, branch, author, changed files, and diff/issue signals.

### 0:45-1:25 - High-Risk Payment Scenario

Narration:

> In the first scenario, an agent payment flow changes allowance handling, increases a payment policy limit, adds an autonomous execution path, and changes release automation. The agent scores this as 100 and blocks release.

Visual:

- Select `Merge request: agent payment flow`.
- Show `Risk score 100`.
- Show `Agent decision: Block Release`.
- Scroll through the first few risk findings.

Key lines:

> The point is not just to summarize. The agent produces a release gate decision and explains the evidence behind it.

### 1:25-1:55 - Actions

Narration:

> The next step is action. The agent proposes concrete GitLab MCP-compatible operations: label the merge request, create a review comment, and open a release-blocking issue. In production, these actions should be human-approved before writing back to GitLab.

Visual:

- Show Next Actions.
- Show Proposed GitLab Actions JSON.

Important wording:

> This demo uses deterministic context, but the action contract maps to GitLab MCP's project, issue, merge request, and API operation model.

### 1:55-2:25 - Second Scenario

Narration:

> The second scenario switches to vault withdrawal accounting. This shows the agent is not only looking for payment-policy issues; it also looks for Web3 accounting and withdrawal impairment risks.

Visual:

- Select `Merge request: vault withdrawal accounting`.
- Show changed files and risk findings.

### 2:25-2:45 - Low-Risk Scenario

Narration:

> A docs-only change produces a lower-risk path. That matters because a useful release agent should avoid blocking harmless changes.

Visual:

- Select `Merge request: docs-only release note`.
- Show lower score / non-blocking result.

### 2:45-3:05 - Integration Fit and Close

Narration:

> The public demo is Gemini-ready and GitLab MCP-compatible. The production connection point is GitLab MCP at `https://gitlab.com/api/v4/mcp`, with Gemini or Google Cloud Agent Builder as the reasoning layer. The project is open source, hosted, and ready for a live authenticated integration pass before final submission.

Visual:

- Open README live links briefly.
- Show `docs/gemini-gitlab-mcp-evidence.md` if time allows.

Close:

> Web3 Repo Risk Review Agent helps teams catch dangerous repository changes before they become production incidents.

## Shot Checklist

- Hosted demo loads.
- Project title visible.
- Scenario selector visible.
- At least one high-risk decision visible.
- Risk findings visible.
- Next actions visible.
- Proposed GitLab actions visible.
- Public repo visible.
- No private keys, tokens, private repos, bounty details, or vulnerability details visible.

## Acceptance Criteria

The final demo video is accepted only if all checks below pass.

### Content and Timing

- Duration is between `2:45` and `3:10`; absolute maximum is `3:30`.
- First 30 seconds clearly explain the problem and that this is a Web3 release-risk review agent.
- The hosted demo is visible and usable in the recording.
- The video shows:
  - risk score / agent decision;
  - risk findings;
  - next actions;
  - proposed GitLab MCP-compatible actions;
  - at least two scenario switches.
- The closing statement clearly mentions the public repo, hosted demo, GitLab track, and agent action path.
- The narration uses prototype-safe wording unless live Gemini/GitLab MCP auth evidence is recorded first.

### Frame and Visual Quality

- Every sampled frame must render normally: no broken image icon, blank page, corrupted frame, severe compression artifact, frozen screen, accidental terminal secret, or unreadable UI.
- The main UI text must be readable at 1080p playback.
- There must be no long black screen, white flash, dropped-slide gap, or off-screen browser window.
- Mouse movement and scrolling should support the narration instead of hiding the relevant panel.
- The final render must pass a full decode check with no media corruption errors.

### Audio and Sync

- The video must contain an audible narration track.
- Narration must be clear and not clipped, distorted, or drowned out by system audio.
- Audio and video must stay aligned: when the narration mentions a panel, score, scenario, repo, or action list, the referenced visual must be on screen within about `1` second.
- The final audio stream must have no silent gap longer than `2` seconds during active narration sections, except intentional short pauses.

### Privacy and Safety

- No API keys, GitHub/GitLab tokens, private repos, private audit findings, wallet data, KYC/payment data, browser password managers, or private notifications appear in any frame.
- If live integration evidence is recorded, capture only non-sensitive read-only context and hide auth tokens/OAuth details.

## Video QA Procedure

Run these checks before uploading the demo video.

Assume the final file is:

```bash
VIDEO=demo/web3-repo-risk-review-agent-demo.mp4
```

### 1. Metadata Check

```bash
ffprobe -hide_banner "$VIDEO"
```

Accept only if:

- container opens cleanly;
- duration is in range;
- video stream is present;
- audio stream is present;
- resolution is at least `1280x720`, preferably `1920x1080`.

### 2. Full Decode / Broken Frame Check

```bash
ffmpeg -v error -i "$VIDEO" -f null - 2> demo/video-decode-errors.log
test ! -s demo/video-decode-errors.log
```

Accept only if `demo/video-decode-errors.log` is empty.

### 3. Sampled Frame Review

Extract one frame per second:

```bash
mkdir -p demo/frame-review
ffmpeg -hide_banner -i "$VIDEO" -vf fps=1 demo/frame-review/frame-%04d.jpg
```

Review every extracted frame. Accept only if every sampled frame has normal content and no broken/corrupted/blank frame. If any sampled frame looks suspicious, inspect the surrounding seconds in the source video.

### 4. Black / Frozen Segment Check

```bash
ffmpeg -hide_banner -i "$VIDEO" -vf blackdetect=d=0.5:pix_th=0.10 -an -f null - 2> demo/blackdetect.log
```

Accept only if any detected black segment is intentional and shorter than `0.5` seconds.

For freeze-like issues, scrub the video manually around every transition and scenario switch. Accept only if the screen changes match the narration and no visual freeze hides the demonstrated feature.

### 5. Audio Presence and Sync Check

```bash
ffmpeg -hide_banner -i "$VIDEO" -af silencedetect=n=-35dB:d=2 -f null - 2> demo/silence.log
```

Accept only if long silence reports are expected pauses and not missing narration.

Manual sync pass:

- Watch at normal speed.
- At `0:45-1:25`, the high-risk payment scenario must be visible while it is narrated.
- At `1:25-1:55`, the proposed GitLab actions must be visible while actions are narrated.
- At `1:55-2:25`, the vault/accounting scenario must be visible while it is narrated.
- At `2:45-3:05`, repo/demo/integration wording must match the visuals.

Accept only if audio and visual references line up within about `1` second.

### 6. Final Upload Gate

Do not upload or submit the video unless:

- metadata check passed;
- decode error log is empty;
- sampled frame review passed;
- black/frozen segment review passed;
- audio presence check passed;
- manual audio/video sync review passed;
- privacy check passed;
- final video URL opens in a logged-out browser.

## Stop Point Before Recording

Before generating the video, confirm whether the final version will use:

- prototype wording only: deterministic demo plus MCP-compatible action contract; or
- live integration wording: recorded Gemini/GitLab MCP auth and read-only context retrieval.
