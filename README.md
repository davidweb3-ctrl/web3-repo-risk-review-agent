# Web3 Repo Risk Review Agent

A Gemini-ready agent workflow for the Google Cloud Rapid Agent Hackathon.

The project reviews GitLab-style repository context and produces a Web3-specific release risk review: blockers, missing tests, GitLab actions, and human-readable release guidance.

## Hackathon Direction

- Hackathon: Google Cloud Rapid Agent Hackathon
- Partner track: GitLab
- Project: Web3 Repo Risk Review Agent
- Goal: help Web3 teams review repository changes before they ship risky contract, payment, or release automation changes

## What It Does

- Reads GitLab-style merge request, branch, file, diff, issue, and test context.
- Flags Web3 risks such as unlimited approvals, agent auto-payment paths, weak spend limits, withdrawal/accounting changes, CI release automation, and missing tests.
- Produces a risk score and merge/release decision.
- Generates proposed GitLab actions such as labeling a merge request, opening a release-blocking issue, or posting a review comment.
- Packages the review into a Gemini / Agent Builder prompt-ready summary.

## Local Demo

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

Full local check:

```bash
npm run check
```

The demo is a static Vite/React app and can be hosted on any static host after `npm run build`.

## Current Integration Status

This MVP is designed to be wired to GitLab MCP / Google Cloud Agent Builder. The current demo uses deterministic sample GitLab context so judges and teammates can try the core workflow without needing private GitLab or Google Cloud credentials.

Before final submission, the project should be connected to the selected partner MCP path and the hosted demo/video links should be updated on Devpost.

Planned production path:

- Use GitLab MCP to read merge request, branch, changed-file, pipeline, issue, and comment context.
- Use Gemini / Agent Builder as the reasoning layer that explains the risk decision and proposes safe actions.
- Require human confirmation before applying GitLab write actions such as labels, issues, or review comments.

## Non-Goals

- It is not a formal audit replacement.
- It does not move funds or deploy contracts.
- It does not require private keys or sensitive repository secrets.

## License

MIT
