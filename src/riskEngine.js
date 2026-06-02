const rules = [
  {
    id: "unlimited-approval",
    severity: "critical",
    match: /max uint|unlimited|approve/i,
    title: "Unlimited approval introduced",
    recommendation:
      "Require bounded approvals, spender allowlists, and tests showing allowance cannot exceed policy."
  },
  {
    id: "policy-limit-raised",
    severity: "high",
    match: /policy limit|daily spend|spend cap/i,
    title: "Payment policy limit changed",
    recommendation:
      "Add regression tests for per-transaction, daily, and merchant caps before release."
  },
  {
    id: "auto-execute",
    severity: "high",
    match: /auto-execute|autonomous|agent.*pay|manual review/i,
    title: "Autonomous execution path changed",
    recommendation:
      "Require human override, confidence-threshold tests, and blocked-flow evidence for risky payments."
  },
  {
    id: "withdraw-accounting",
    severity: "critical",
    match: /withdraw|share burn|round|queue|cancellation|depositor/i,
    title: "Vault accounting or withdrawal path changed",
    recommendation:
      "Add invariant tests for total assets, share supply, queue state, and third-party withdrawal availability."
  },
  {
    id: "ci-deploy",
    severity: "medium",
    match: /deploy job|main branch|tag|ci/i,
    title: "Release automation changed",
    recommendation:
      "Require protected branch/tag checks, manual approval for production deploys, and pipeline status review."
  },
  {
    id: "missing-tests",
    severity: "high",
    match: /no new unit test|no explicit test|without dedicated invariant/i,
    title: "Missing targeted tests",
    recommendation:
      "Block merge until a focused regression test proves the changed safety property."
  }
];

const weights = {
  critical: 35,
  high: 24,
  medium: 14,
  low: 6
};

export function reviewGitlabContext(context) {
  const textSignals = [
    context.summary,
    ...(context.changedFiles || []),
    ...(context.diffSignals || []),
    ...(context.issueSignals || [])
  ];

  const findings = [];
  for (const rule of rules) {
    const evidence = textSignals.filter((signal) => rule.match.test(signal));
    if (evidence.length > 0) {
      findings.push({
        id: rule.id,
        severity: rule.severity,
        title: rule.title,
        evidence,
        recommendation: rule.recommendation
      });
    }
  }

  const uniqueFindings = Array.from(
    new Map(findings.map((finding) => [finding.id, finding])).values()
  );

  const score = Math.min(
    100,
    uniqueFindings.reduce((total, finding) => total + weights[finding.severity], 0)
  );

  const decision =
    score >= 75 ? "block release" : score >= 45 ? "request changes" : score >= 20 ? "review carefully" : "low risk";

  const nextActions = buildNextActions(uniqueFindings, context);
  const gitlabActions = buildGitlabActions(uniqueFindings, context, decision);

  return {
    project: context.project,
    branch: context.branch,
    author: context.author,
    source: context.source,
    riskScore: score,
    decision,
    findings: uniqueFindings,
    nextActions,
    gitlabActions,
    agentBuilderSummary: buildAgentSummary(context, uniqueFindings, decision),
    coverageGaps: buildCoverageGaps(context, uniqueFindings)
  };
}

function buildNextActions(findings, context) {
  if (findings.length === 0) {
    return [
      "Leave a low-risk review note.",
      "Confirm existing CI passed.",
      "Merge only after normal maintainer approval."
    ];
  }

  const actions = findings.map((finding) => finding.recommendation);
  if ((context.changedFiles || []).some((file) => file.includes("contracts/"))) {
    actions.push("Run smart-contract tests and include the exact command output in the release notes.");
  }
  if ((context.changedFiles || []).some((file) => file.includes(".gitlab-ci"))) {
    actions.push("Ask a maintainer to review CI permissions before release.");
  }
  return Array.from(new Set(actions));
}

function buildGitlabActions(findings, context, decision) {
  const label =
    decision === "block release"
      ? "risk:block-release"
      : decision === "request changes"
        ? "risk:changes-requested"
        : "risk:review";

  return [
    {
      tool: "label_merge_request",
      payload: { project: context.project, branch: context.branch, label }
    },
    {
      tool: "create_review_comment",
      payload: {
        project: context.project,
        branch: context.branch,
        body: `Agent decision: ${decision}. ${findings.length} risk finding(s) require review.`
      }
    },
    ...(findings.some((finding) => finding.severity === "critical")
      ? [
          {
            tool: "open_issue",
            payload: {
              project: context.project,
              title: "Release-blocking Web3 risk review",
              labels: ["security", "release-blocker"]
            }
          }
        ]
      : [])
  ];
}

function buildAgentSummary(context, findings, decision) {
  const changed = (context.changedFiles || []).join(", ");
  const topRisk = findings[0]?.title || "No high-signal risk rule matched";
  return `Gemini/Agent Builder task: review ${context.project} branch ${context.branch}. Changed files: ${changed}. Top risk: ${topRisk}. Recommended decision: ${decision}.`;
}

function buildCoverageGaps(context, findings) {
  const gaps = [];
  const testText = (context.existingTests || []).join(" ").toLowerCase();

  if (findings.some((finding) => finding.id === "unlimited-approval") && !testText.includes("allowance")) {
    gaps.push("No allowance-bound regression test is listed.");
  }
  if (findings.some((finding) => finding.id === "withdraw-accounting") && !testText.includes("invariant")) {
    gaps.push("No invariant test is listed for the accounting transition.");
  }
  if (findings.some((finding) => finding.id === "auto-execute") && !testText.includes("human")) {
    gaps.push("No human-approval or override test is listed.");
  }
  if (gaps.length === 0) {
    gaps.push("No obvious coverage gap detected from the provided GitLab context.");
  }
  return gaps;
}
