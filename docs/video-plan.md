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

## Stop Point Before Recording

Before generating the video, confirm whether the final version will use:

- prototype wording only: deterministic demo plus MCP-compatible action contract; or
- live integration wording: recorded Gemini/GitLab MCP auth and read-only context retrieval.
