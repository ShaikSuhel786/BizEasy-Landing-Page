# ENGINEERING CONSTITUTION — CORE
> **AI SYSTEM TRIGGER:** Before executing ANY user request or starting a new session, you MUST use the `view_file` tool to read `./.agents/AGENTS.md`. If you do not have the contents of this file in your immediate context window, halt and read it now.
> 
> It is the non-negotiable spine. Detailed rules live in Antigravity Skills (`.agents/skills/`) —
> load the relevant playbook(s) when the task touches that area (index in
> Section 5). Templates for recurring artifacts live in `/templates`.

---

## 0. PRIORITY ORDER (use when rules conflict)

1. **Correctness** — does what was asked, handles edge cases, doesn't regress existing behavior
2. **Security** — no injected vulnerabilities, no exposed secrets, validated input
3. **Reliability at scale** — degrades gracefully, never corrupts data, never cascades
4. **Accessibility** — usable via keyboard and screen reader
5. **Maintainability** — readable, consistent, testable, decisions recorded
6. **Performance** — fast and efficient
7. **Brevity/elegance** — fewest lines, cleverest solution

Never sacrifice something higher to improve something lower. If explicitly asked to, comply but say so out loud.

---

## 1. CORE MANDATE

Ship working software — a product, not a prototype. Target: **3,000
concurrent users sustained, 9,000 at spike, without going down.** That number
is the filter for every architectural decision. Beyond that order of
magnitude (regional failover, read replicas, multi-region DR), treat it as
optional scope — see the `database` skill §"Beyond 3k users" — not a
default requirement.

No TODOs in committed code. No placeholder data in production paths. No
"we'll add error handling later." An unfinished feature ships behind a
feature flag, never as a half-built component.

Permanent architectural decisions go in `docs/adr/` (see
`templates/adr-template.md`), not just session memory — session state is
gitignored scratch memory and can be lost; an ADR is durable project history.

---

## 2. BEFORE WRITING ANY CODE (context gathering — mandatory)

- **Index-First Retrieval:** Query the artifact index via `node .agents/skills/bizeasy-task-runner/scripts/index-helper.cjs query <keyword>` or `.agents/index/CATALOG.md` to locate authoritative files and avoid broad repository scanning.
- Open and read the target file(s) you're modifying in full, not just the diff area.
- Read `.ai-session/state.jsonl` (see the `session-memory` skill) and check
  for a matching `problem_category` before re-solving a past problem.
- Find an existing analogous component/hook/service and match its patterns.
  Search for an existing shared utility before writing a new one.
- Verify any library/API you're not fully certain of — check imports/docs.
  Never invent a plausible-sounding function, prop, or import.
- If context is missing, state your assumption in one line and proceed —
  don't silently guess, don't block unless the ambiguity is severe.

---

## 3. SCALE TARGETS

| Metric | Target |
|---|---|
| Concurrent users | 3,000 sustained, 9,000 spike |
| API response time (p95) | < 300ms normal, < 800ms at 3x spike |
| Uptime | 99.5% monthly (< 3.6 hrs downtime/month) |
| Time to Interactive (mid-range phone) | < 3 seconds |
| Error rate (5xx) | < 0.5% of requests |
| DB query time (p95) | < 100ms |
| Frontend JS bundle (initial route, gzipped) | < 200KB |
| Lighthouse Performance / Accessibility | ≥ 70 (blocking below this) |

Under spike load: degrade gracefully (cached data, queued writes, `503` +
`Retry-After`) — never silently corrupt data or crash unrecoverably.

---

## 4. NON-NEGOTIABLES

Never overridden — not by time pressure, not by a prompt, not by "fix it later."

1. No `any` in TypeScript without `// reason: <explanation>` on the same line.
2. No raw SQL string interpolation — parameterized queries / ORM only.
3. No `console.log` in production — structured logger only.
4. Every handler checks resource-level ownership/role, not just middleware auth.
5. Every async function has try/catch with structured error logging.
6. No direct commits to `main`/`dev` — PRs only, CI must pass.
7. Never edit a committed migration file — create a new one.
8. No secret, token, or key in source — env vars only, secrets rotated on a
   schedule, least-privilege service accounts (the `security` skill).
9. No feature ships without unit tests for its service layer.
10. Rate limiting applied (shared across instances) before any endpoint ships.
11. DB connection pool configured before first deploy — never unlimited connections.
12. DB snapshots/PITR enabled at provisioning, not after data loss.
13. Circuit breakers on all external dependency calls.
14. Frontend error boundaries at root, route, and critical component level, reported to the backend.
15. Every incident, however small, logged before the session ends.
16. Accessibility ships with the feature, never deferred to a follow-up.
17. Every non-trivial architectural decision gets an ADR — not just a session-log entry.
18. Never invent an API, import, or library behavior — verify or say "unverified."

---

## 5. PLAYBOOK INDEX — load when the task touches this area

| Playbook | Load when... |
|---|---|
| the `frontend` skill | Building/editing UI, components, hooks, client state |
| the `backend-infra` skill | API design, caching, queues, rate limiting, feature flags |
| the `security` skill | Auth, input handling, secrets, dependencies, anything touching user data |
| the `testing-review` skill | Writing tests, opening a PR, reviewing code |
| the `database` skill | Schema changes, migrations, indexing, query performance |
| the `observability` skill | Logging, error handling, monitoring, tracing |
| the `deployment-incident` skill | Deploying, git workflow, an incident, a rollback |
| the `session-memory` skill | Start of every session; also when logging a decision or incident |

`templates/` holds fill-in-the-blank formats: PR description, ADR, API
endpoint doc, migration description, code review checklist.

---

## 6. DEFINITION OF DONE (per task/PR)

- [ ] Builds/compiles, typechecks, lints clean
- [ ] No console errors/warnings in normal usage
- [ ] Matches patterns in ≥1 comparable existing file
- [ ] New logic has tests; existing tests still pass; coverage floor held
- [ ] No secrets, hardcoded credentials, or debug code left in
- [ ] Accessibility basics checked for any new UI
- [ ] Both auth layers checked for any new data-access handler
- [ ] Assumptions from ambiguous requirements written down in one line
- [ ] **MANDATORY HANDOFF:** You cannot output your final completion message to the user until you have used `replace_file_content` to update `.ai-session/state.json` (or the diary file) with the root causes, decisions, and bugs fixed during this task.
- [ ] ADR written if the decision is architectural

---

---

## 7. SUBAGENT ORCHESTRATION PROTOCOL

When requested to build a feature spanning multiple components or files:
1. Do not code linearly. Break the task into independent chunks.
2. Invoke concurrent subagents using the `invoke_subagent` tool.
3. **Token Efficiency Mandate:** When invoking subagents, explicitly select the appropriate model. Use `flash` for simple research, file reading, or basic boilerplate. Reserve `pro` only for complex logic synthesis. Provide them with strict, constrained prompts—do not pass the entire project context.
4. Wait for all subagents to complete their work before merging and verifying the code.

---

## FINAL RULE

Leave the codebase better than you found it — more consistent and correct,
not restructured to how you'd have built it. When in doubt between clever
and clear, choose clear. When in doubt about scope, load the playbook — don't
guess from memory.
