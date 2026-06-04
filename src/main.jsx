import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  GitBranch,
  GitPullRequest,
  Play,
  ShieldCheck,
  Sparkles,
  TerminalSquare
} from "lucide-react";
import { sampleContexts } from "./sampleGitlabContext.js";
import { reviewGitlabContext } from "./riskEngine.js";
import "./styles.css";

const contextIds = new Set(sampleContexts.map((item) => item.id));

function getInitialContextId() {
  const requested = new URLSearchParams(window.location.search).get("scenario");
  return contextIds.has(requested) ? requested : sampleContexts[0].id;
}

function App() {
  const [contextId, setContextId] = useState(getInitialContextId);
  const context = sampleContexts.find((item) => item.id === contextId) || sampleContexts[0];
  const review = useMemo(() => reviewGitlabContext(context), [context]);

  const handleScenarioChange = (event) => {
    const nextContextId = event.target.value;
    const params = new URLSearchParams(window.location.search);

    params.set("scenario", nextContextId);
    window.history.replaceState(null, "", `${window.location.pathname}?${params}${window.location.hash}`);
    setContextId(nextContextId);
  };

  return (
    <main className="app-shell">
      <section className="topbar">
        <div>
          <p className="eyebrow">Google Rapid Agent Hackathon / GitLab Track</p>
          <h1>Web3 Repo Risk Review Agent</h1>
          <p className="subtitle">
            A Gemini-ready agent workflow that turns GitLab repository context into actionable Web3 release risk guidance.
          </p>
        </div>
        <div className="score-panel">
          <span>Risk score</span>
          <strong>{review.riskScore}</strong>
          <em>{review.decision}</em>
        </div>
      </section>

      <section className="workspace">
        <aside className="input-panel">
          <div className="panel-header">
            <GitPullRequest size={20} />
            <h2>GitLab Context</h2>
          </div>
          <label htmlFor="scenario">Scenario</label>
          <select id="scenario" value={contextId} onChange={handleScenarioChange}>
            {sampleContexts.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>

          <div className="context-card">
            <div>
              <span>Project</span>
              <strong>{context.project}</strong>
            </div>
            <div>
              <span>Branch</span>
              <strong>{context.branch}</strong>
            </div>
            <div>
              <span>Author</span>
              <strong>{context.author}</strong>
            </div>
          </div>

          <h3>Changed files</h3>
          <ul className="compact-list">
            {context.changedFiles.map((file) => (
              <li key={file}>
                <GitBranch size={15} />
                {file}
              </li>
            ))}
          </ul>

          <h3>Diff and issue signals</h3>
          <ul className="signal-list">
            {[...context.diffSignals, ...context.issueSignals].map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </aside>

        <section className="review-panel">
          <div className="decision-band" data-decision={review.decision}>
            <ShieldCheck size={22} />
            <div>
              <span>Agent decision</span>
              <strong>{review.decision}</strong>
            </div>
          </div>

          <div className="grid-two">
            <section className="card" id="risk-findings">
              <div className="panel-header">
                <AlertTriangle size={19} />
                <h2>Risk Findings</h2>
              </div>
              {review.findings.length === 0 ? (
                <p className="quiet">No high-signal Web3 risk rule matched this context.</p>
              ) : (
                <div className="finding-stack">
                  {review.findings.map((finding) => (
                    <article className="finding" key={finding.id} data-severity={finding.severity}>
                      <header>
                        <span>{finding.severity}</span>
                        <h3>{finding.title}</h3>
                      </header>
                      <p>{finding.recommendation}</p>
                      <details>
                        <summary>Evidence</summary>
                        <ul>
                          {finding.evidence.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </details>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section className="card" id="next-actions">
              <div className="panel-header">
                <CheckCircle2 size={19} />
                <h2>Next Actions</h2>
              </div>
              <ol className="action-list">
                {review.nextActions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ol>
            </section>
          </div>

          <section className="card" id="agent-builder-packet">
            <div className="panel-header">
              <Bot size={19} />
              <h2>Gemini / Agent Builder Packet</h2>
            </div>
            <p className="agent-summary">{review.agentBuilderSummary}</p>
            <div className="tool-row">
              <span>
                <Sparkles size={16} />
                Gemini reasoning layer
              </span>
              <span>
                <TerminalSquare size={16} />
                GitLab MCP actions
              </span>
              <span>
                <Play size={16} />
                Human-approved release guidance
              </span>
            </div>
          </section>

          <div className="grid-two">
            <section className="card" id="gitlab-actions">
              <div className="panel-header">
                <TerminalSquare size={19} />
                <h2>Proposed GitLab Actions</h2>
              </div>
              <pre>{JSON.stringify(review.gitlabActions, null, 2)}</pre>
            </section>

            <section className="card">
              <div className="panel-header">
                <AlertTriangle size={19} />
                <h2>Coverage Gaps</h2>
              </div>
              <ul className="signal-list">
                {review.coverageGaps.map((gap) => (
                  <li key={gap}>{gap}</li>
                ))}
              </ul>
            </section>
          </div>
        </section>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
