# Gemini and GitLab MCP Evidence

## Current Claim

The project is a Gemini-ready Web3 repository risk review agent demo for the Google Cloud Rapid Agent Hackathon GitLab track. It is currently implemented as a deterministic Vite/React demo that shows the agent workflow, risk decision logic, and GitLab MCP-compatible action payloads.

Do not claim that the public demo has completed live GitLab OAuth, Gemini CLI, or Google Cloud Agent Builder runtime execution until that connection is recorded.

## Official Fit

- Hackathon requirement: build a functional agent powered by Gemini and Google Cloud Agent Builder that integrates one partner MCP server; required submission assets include hosted project URL, public open-source repo URL, and about a 3-minute demo video.
- GitLab MCP server purpose: securely connect AI tools and applications to a GitLab instance so AI assistants can access project information, retrieve issue and merge request data, interact with GitLab APIs, and perform GitLab-specific operations.
- GitLab MCP HTTP endpoint pattern: `https://<gitlab.example.com>/api/v4/mcp`; for GitLab.com this becomes `https://gitlab.com/api/v4/mcp`.
- GitLab docs explicitly describe Gemini Code Assist / Gemini CLI configuration using `~/.gemini/settings.json` with a `GitLab` MCP server and `/mcp auth GitLab`.
- Google Cloud Agent Builder fit: the agent uses Gemini as the reasoning layer and a tool/action boundary for repository context, risk findings, and human-approved GitLab actions.

## What Is Implemented

- Public repository: https://github.com/davidweb3-ctrl/web3-repo-risk-review-agent
- Hosted demo: https://davidweb3-ctrl.github.io/web3-repo-risk-review-agent/
- Risk engine: deterministic Web3 release-risk rules in `src/riskEngine.js`.
- GitLab-style input context: merge-request, branch, changed-file, issue-signal, and test-signal samples in `src/sampleGitlabContext.js`.
- GitLab MCP action map: `mcp/gitlab-agent-tools.json`.
- Proposed actions shown in the UI:
  - label a merge request;
  - create a review comment;
  - open a release-blocking issue.

## Local Integration Prep Status

As of 2026-06-04:

- Gemini CLI is installed and logged in.
- Gemini CLI version observed locally: `0.45.0`.
- `~/.gemini/settings.json` includes the GitLab MCP server:

```json
{
  "mcpServers": {
    "GitLab": {
      "httpUrl": "https://gitlab.com/api/v4/mcp"
    }
  }
}
```

- Starting Gemini CLI in the project workspace shows `1 MCP server`, confirming that the GitLab MCP configuration is loaded.
- Live GitLab OAuth is still pending because `/mcp auth GitLab` must be completed in an interactive Gemini terminal and approved in the browser by the user.
- Do not claim live GitLab MCP runtime evidence until OAuth succeeds and a read-only GitLab context retrieval is captured.

## Safe Demo Wording

Use:

> This demo shows a Gemini-ready agent workflow and GitLab MCP-compatible action contract for reviewing Web3 repository changes.

Use:

> The final production connection point is GitLab MCP at `https://gitlab.com/api/v4/mcp`; the current demo uses deterministic GitLab-style context so judges can inspect the release-risk logic without needing private credentials.

Avoid unless live auth evidence exists:

> This public demo is already connected to Gemini and GitLab MCP in production.

Avoid unless a GitLab write action is actually executed:

> The agent posted this comment or label to GitLab.

## Live Integration Upgrade Path

If Gemini CLI access is available before the final video:

1. Open Gemini CLI in a normal terminal:

```bash
cd /Users/xiadawei/codeSpace/web3/hackathon/web3-repo-risk-review-agent
gemini
```

2. Confirm the footer shows `1 MCP server`.
3. Run:

```text
/mcp auth GitLab
```

4. Approve OAuth in the browser.
5. Ask Gemini to inspect a safe public GitLab test project or a non-sensitive demo merge request.
6. Capture only non-sensitive evidence:
   - connected MCP server list;
   - read-only project/MR context retrieval;
   - generated review guidance;
   - proposed action payloads.

The configured MCP entry is:

```json
{
  "mcpServers": {
    "GitLab": {
      "httpUrl": "https://gitlab.com/api/v4/mcp"
    }
  }
}
```

Do not record tokens, private repositories, private issues, production secrets, payment details, or any private vulnerability material.

## Video Evidence Positioning

If live auth is not available, the video should frame the current work as a functional prototype with a clear MCP-compatible integration boundary:

- problem: Web3 teams ship risky code changes;
- agent input: GitLab-style repository context;
- Gemini reasoning role: summarize, classify, and explain risk;
- GitLab MCP role: read MR context and apply human-approved labels/comments/issues;
- demo output: a release-blocking decision with concrete actions.
