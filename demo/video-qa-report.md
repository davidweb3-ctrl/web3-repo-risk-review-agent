# Demo Video QA Report

Video:

```text
demo/web3-repo-risk-review-agent-demo.mp4
```

Public raw URL after push:

```text
https://github.com/davidweb3-ctrl/web3-repo-risk-review-agent/raw/main/demo/web3-repo-risk-review-agent-demo.mp4
```

Generated: 2026-06-04

## Metadata

- Duration: `167.88s` (`2:47.88`)
- Resolution: `1920x1080`
- Video codec: H.264
- Audio codec: AAC
- Audio: mono, `22050 Hz`
- Size: about `6.2 MB`

## Checks

- `npm run check`: passed.
- Full decode: passed; `demo/video-decode-errors.log` is empty.
- Black-screen detection: passed; no `black_start` / `black_end` events found in `demo/blackdetect.log`.
- Silence detection: passed; no `silence_start` / `silence_end` events longer than `2s` found in `demo/silence.log`.
- Sampled frames: `168` one-frame-per-second samples extracted.
- Contact-sheet review: passed using:
  - `demo/frame-review/contact-01.jpg`
  - `demo/frame-review/contact-02.jpg`
  - `demo/frame-review/contact-03.jpg`
  - `demo/frame-review/contact-04.jpg`
- Privacy review: passed; no OAuth URL, token, private repository, private audit detail, wallet, KYC, payment detail, or secret was visible in reviewed frames.

## Wording Boundary

The video uses prototype-safe wording:

- It states that the demo is Gemini-ready and GitLab MCP-compatible.
- It states that GitLab OAuth succeeded but MCP discovery returned `404 Not Found`.
- It does not claim live connected GitLab MCP runtime access.

## Remaining Manual Gate

Before final Devpost submission:

- Open the final video URL in a logged-out browser.
- Preview the Devpost project.
- If Devpost rejects the raw GitHub MP4 URL, upload the MP4 to YouTube/Vimeo and use that hosted video URL.
