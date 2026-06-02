export const sampleContexts = [
  {
    id: "payment-guard-mr",
    label: "Merge request: agent payment flow",
    project: "agent-payment-guard",
    source: "GitLab merge request context",
    branch: "feature/agent-autopay",
    author: "agent-ops-bot",
    summary:
      "Adds autonomous payment execution for AI agent invoices and updates release workflow.",
    changedFiles: [
      "contracts/AgentPaymentGuard.sol",
      "src/paymentPolicy.ts",
      "src/agentRunner.ts",
      ".gitlab-ci.yml"
    ],
    diffSignals: [
      "Introduces ERC20 approve call with max uint allowance",
      "Raises default policy limit from 500 USDC to 5000 USDC",
      "Adds auto-execute path when invoice confidence is above 0.82",
      "No new unit test for daily spend cap",
      "CI deploy job now runs on main branch tags"
    ],
    issueSignals: [
      "Product request: reduce manual review friction",
      "Security note: merchant allowlist must remain enforced",
      "Release deadline moved earlier by two days"
    ],
    existingTests: [
      "policy limit blocks over-limit transfer",
      "allowlisted merchant receives transfer",
      "paused agent cannot pay"
    ],
    gitlabActionsAvailable: [
      "create_review_comment",
      "open_issue",
      "label_merge_request",
      "summarize_pipeline"
    ]
  },
  {
    id: "vault-release-mr",
    label: "Merge request: vault withdrawal accounting",
    project: "defi-vault-core",
    source: "GitLab merge request context",
    branch: "release/withdraw-queue",
    author: "protocol-dev",
    summary:
      "Refactors queued withdrawal accounting and changes share rounding behavior.",
    changedFiles: [
      "contracts/Vault.sol",
      "contracts/WithdrawQueue.sol",
      "test/VaultWithdraw.t.sol",
      "docs/accounting.md"
    ],
    diffSignals: [
      "Moves share burn before asset transfer",
      "Changes withdraw preview from round down to round up",
      "Adds queue cancellation path without dedicated invariant test",
      "No explicit test for third-party depositor withdrawal impairment"
    ],
    issueSignals: [
      "Audit note: queue state must not strand unrelated depositors",
      "Support ticket: user cannot withdraw after partial cancellation"
    ],
    existingTests: [
      "single-user withdraw succeeds",
      "preview withdraw returns expected amount"
    ],
    gitlabActionsAvailable: [
      "create_review_comment",
      "open_issue",
      "label_merge_request",
      "summarize_pipeline"
    ]
  },
  {
    id: "docs-only-mr",
    label: "Merge request: docs-only release note",
    project: "web3-risk-docs",
    source: "GitLab merge request context",
    branch: "docs/release-checklist",
    author: "docs-maintainer",
    summary:
      "Adds release checklist language for payment approval and audit evidence.",
    changedFiles: ["README.md", "docs/release-checklist.md"],
    diffSignals: [
      "No contract, policy, CI, or payment execution code changed",
      "Adds explicit human approval reminder",
      "Adds release evidence checklist"
    ],
    issueSignals: ["Docs request: make release process clearer"],
    existingTests: ["markdown link check"],
    gitlabActionsAvailable: [
      "create_review_comment",
      "open_issue",
      "label_merge_request",
      "summarize_pipeline"
    ]
  }
];
