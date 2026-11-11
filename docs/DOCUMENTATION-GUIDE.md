# Documentation Guide

## Principle

Documentation must describe the design **as it is known**, distinguish plans from implemented behavior, and be navigable from [`README.md`](README.md).

### Current document inventory

The current **five governing project documents** are `personal-os/README.md`, `docs/README.md`, `docs/DOCUMENTATION-GUIDE.md`, `docs/foundation/PWOS-001-project-charter.md`, and `docs/architecture/PWOS-002-system-architecture-foundation.md`. **PWOS-001 v0.14 is accepted, explicitly approved by the owner on 2026-11-09, and supersedes historical accepted v0.13, approved on 2026-11-02; earlier historical accepted v0.12 was approved on 2026-10-28. v0.14 corrects factual architecture references without changing the accepted objectives, decisions, scope, D0–D4 requirements, governance or the §11.2 documentation-verification procedure. PWOS-002 v0.4 is accepted, approved by the owner on 2026-11-10 and integrated in `f808a9c3858d254244ef9493b4f6a56667a9bb09`; historical accepted v0.3 was approved on 2026-11-07 and integrated in `a0d5dd3b4c94c1eb38842b3cc9ab80b28174498a`, while earlier v0.2 was approved on 2026-10-27. v0.3 resolved the 18 TASK-011 factual-accuracy findings; v0.4 corrected current governing-charter references to accepted PWOS-001 v0.14. Neither revision alters ARC-01 through ARC-08.** The Improvement Register, File Registry, Development Workflow and [Shared Packages Guide](../packages/README.md) are supplementary, non-governing documents, not additional governing specifications. Other specification, decision, milestone and research files from earlier iterations are **not currently governing project documentation**, even if they still exist in the working tree. Document acceptance does not establish implementation readiness.

Before adding another numbered document, define its responsibility, identify who reviews it, give it a stable name and metadata, then update the documentation index. Do not silently promote a legacy draft by linking to it as authoritative.

## Supplementary registry and development workflow

The [File Registry](FILE-REGISTRY.md) records actual project files, Git tracking states, Current/Planned/Historical lifecycle classifications, responsibilities and ownership, meaningful dependencies/relationships, and review evidence. Check the actual checkout when refreshing its snapshot; an inventory entry is not proof of implementation verification.

The [Development Workflow](DEVELOPMENT-WORKFLOW.md) defines edit, verify, review, stage, commit, push, and confirmation practices, including Conventional Commits. Refer to that guide for Git commands, staging and recovery rules rather than duplicating them here.

Both are living, non-governing supplementary guides. They do not change the five-document governing baseline, grant implementation approval, or establish CI, automatic enforcement, or browser integration.

Synchronize the File Registry whenever a project file is created, removed, renamed, changes ownership/responsibility, lifecycle classification, Git tracking state, or material implementation/review status. Record the review date and evidence, distinguishing direct checks from owner-reported results. Inconsequential content edits do not automatically require registry updates.

Preserve one-file-at-a-time editing and review. When registry or other documentation synchronization requires another file, schedule it as a separate task and report the pending synchronization in the handoff. A logical commit may group separately reviewed related files as described in the Development Workflow, within the owner's authorized scope. These supplementary practices do not replace Improvement Register maintenance or architectural approval rules.

## Current / Planned / Historical classification

Use these classifications to distinguish repository reality from intent and past work:

| Classification | Meaning | Limits |
| --- | --- | --- |
| **Current** | An existing repository file/component, or an active, accepted document. | Existence does not establish feature completeness, successful verification, API stability, or production readiness. An accepted design can be Current while the subsystem it describes is Planned. |
| **Planned** | A proposed future file, component, subsystem, or document that has not yet been implemented. | A reserved name or proposed path is not evidence that a directory or implementation exists. A Current manifest or skeleton may support a Planned feature; describe each at the appropriate level. |
| **Historical** | Removed, retired, archived, or superseded work retained or discussed for context. | State whether the underlying file still exists in the checkout, exists only in Git history, or is absent from the checkout with its retention location unverified. Historical material is not the active baseline. |

Before identifying implementation files as Current, inspect the actual checkout rather than relying on earlier documentation, generated archives, or proposed architecture trees. Use directory/file inspection alongside `git ls-files`, `git status --short`, and `git check-ignore` where relevant. Distinguish Git-tracked source, untracked project files, and ignored/generated output. An untracked file may exist locally without being part of the committed baseline; generated output may demonstrate a build without being source. Environment-specific tooling directories must not be presented as tracked project components without checking Git tracking.

Apply labels selectively in the documentation index, repository trees, inventories, and sections where existence or authority would otherwise be ambiguous. Separate actual repository trees from planned layouts. Labels are not required on every paragraph, link, or heading.

Link only to files that actually exist at the stated path. For Planned files, use code-formatted paths such as `packages/app-runtime/` without implying that they exist. Do not create links to nonexistent Planned or Historical files. For Historical references, explicitly state whether the file remains present; link to retained files only after verifying the target. This does not relax the existing requirement to preserve superseded documents and link them to an existing replacement.

These classifications are separate from document approval (`draft`, `proposed`, `accepted`, `superseded`) and implementation verification (for example, unverified, type-checked, built, or browser-tested). A Current draft file remains unapproved; a Current accepted specification does not prove its design is implemented. Keep the established YAML statuses, approval processes, and evidence requirements unchanged; do not add these classifications as replacement frontmatter statuses.

## Naming conventions

### 1. Repository and folder names

| Convention | Meaning | Example |
| --- | --- | --- |
| `personal-os` | Canonical Git repository name | `personal-os/` |
| Lowercase, hyphen-separated folders | A functional documentation category | `requirements/` (Planned), `architecture/` (Current under `docs/`) |
| `README.md` | An index or introduction for the directory containing it | `docs/README.md` |
| `DOCUMENTATION-GUIDE.md` | The rules for maintaining project documentation | `docs/DOCUMENTATION-GUIDE.md` |

Folder names describe **what kind of information** belongs there. They do not imply a subsystem is implemented.

### Directory README titles

Every directory-level `README.md` should start with a consistent, human-readable H1 heading:

- Repository root: `# Personal OS`.
- Documentation navigation root: `# Personal OS — Documentation Index`.
- Other directory indexes and guides: `# Personal OS — <Directory Purpose>`, using a concise title-cased purpose rather than the literal folder name when a clearer label exists.

For example, Current `packages/README.md` uses `# Personal OS — Shared Packages`; Planned `apps/README.md` could use `# Personal OS — Applications`. The heading identifies the page to readers, while the unchanged `README.md` filename lets GitHub show it automatically. **Do not rename README files to match their headings.** This title convention applies to directory READMEs, not numbered specification titles or ordinary component source files.

### Application workspace and package naming

- **Current browser host:** Tracked `apps/web/package.json`, `apps/web/index.html`, `apps/web/src/main.tsx` and `apps/web/vite.config.ts` implement the thin React/Vite host. The HTML entry supplies #root; the React entry mounts DesktopShell through the public `@personal-os/desktop-shell` package interface and supplies truthful offline/no-connected-services status. Vite integrates React and an exact environment-derived Codespaces host allowance.
- **Current desktop shell:** `packages/desktop-shell/` contains a reusable presentation component and public types. Its manifest exposes compiled JavaScript at `dist/index.js` and types at `dist/index.d.ts`; its package-specific strict `tsconfig.json` defines the build output. Existing `build` and `typecheck` scripts use that configuration. Build the shell before the web host consumes its compiled exports; generated `dist/` is ignored output, not project source.
- **Verification evidence:** IMP-002 records prior owner-reported and Codex shell typecheck/build/public-export evidence. GP-01 is Completed and IMP-001 Verified based on owner-reported private Codespaces browser acceptance; prior Codex build/Host-header checks are separate evidence. No implementation or browser tests were rerun for this guide correction. Installed Playwright Test `1.64.1` and the web `test:e2e` script are tooling only: Chromium setup is not confirmed complete, and automated smoke/accessibility tests and testing CI remain pending under IMP-007.
- **Planned:** `packages/app-runtime/` will own app discovery, lifecycle, hosting and isolation policy integration. The web host is intended to remain thin; `apps/desktop/` is a proposed distinct host whose purpose must be decided before implementation. Neither planned directory exists in this checkout.
- **Historical:** Earlier `apps/web/src/shell/` starter references describe files absent from this checkout. Launcher, About panel, dock, window, widget, and registry behavior must not be reported as implemented here on that basis.
- **Implementation limits:** Functional launcher/app lifecycle, interactive application window management, the historical `apps/api/` Fastify server and live endpoints are not implemented in this checkout. Public SDK/OS API contract workspaces, persistent storage, authentication, local inference and a native kernel remain Planned; accepted architecture does not make them operational.
- `apps/*` at the monorepo root holds independently built application or host targets. For example, `apps/file-manager/` and `apps/ai-assistant/` are planned full application workspaces. An internal shell panel must not be presented as an independently deployable application.
- Shared package names use the canonical `@personal-os/<package-name>` scope, such as the Planned `@personal-os/app-sdk` and `@personal-os/os-api` identities. A package's directory or manifest **does not** imply it already exports a stable API.
- Standalone applications must use documented public SDK/API contracts, not imports from `apps/web/src/shell/` or private `packages/desktop-shell/` internals. Keep shell-local React state distinct from the future hardware kernel in `kernel/`.
- Use kebab-case for directories and package names; use PascalCase for React component filenames (illustrative `WindowManager.tsx`) and descriptive camelCase for hooks (illustrative `useSystemInfo.ts`); these example files are absent.

### Architectural boundaries and implementation status

When creating a module, document **owner, purpose, allowed dependencies, public interface, trust boundary, and status**. Keep the following directions clear:

1. Frontend hosts compose public shell/runtime entry points; they must not become the permanent owner of shell logic or privileged services.
2. The desktop shell renders UI. The application runtime owns application loading/lifecycle semantics; privileged authorization belongs to trusted services and backends.
3. Applications depend on the SDK, OS API and permitted UI libraries rather than private host components.
4. Planned `packages/os-api/` and `packages/protocols/` will describe compatibility contracts; backend implementations are owned elsewhere. A native kernel may implement the contracts using another language or runtime.
5. Planned `kernel/` will own low-level OS execution/protection work, not browser state or React context.

Use **Current**, **Planned**, and **Historical** where subsystem status is ambiguous. Terms such as existing implementation, reserved workspace, and proposed target may add detail: a reserved workspace is Current only if its files exist, while its intended functionality may remain Planned. Do not present future folder layouts as current source-tree listings. A module README may be created as a local ownership note without adding another governing specification.

These boundaries are recorded as the **accepted design direction** in [PWOS-002 — System Architecture Foundation](architecture/PWOS-002-system-architecture-foundation.md). Implementing them still requires concrete API schemas, isolation verification, compatibility tests, and evidence of cross-backend conformance before those capabilities may be declared operational.

D0–D4 are product/capability delivery gates governed by [PWOS-001 §8](foundation/PWOS-001-project-charter.md#8-use-from-day-one-delivery-plan); GP-00–GP-05 are separate static-demo release milestones tracked in the [Improvement Register](IMPROVEMENTS.md). GP-01 completion does not establish D0 acceptance: interactive panels and real `/health` and `/api/system` responses remain unmet. GP-02 is In progress, acceptance pending; GP-03 safety review and explicit publication approval remain pending. No public deployment has been authorized.

### 2. Document prefixes and identifiers

| Prefix | Stands for | Used for | Example |
| --- | --- | --- | --- |
| `PWOS` | **Personal Web OS**, the project's original name | Numbered, project-wide specifications and governing documents | `PWOS-002-system-architecture-foundation.md` |
| `ADR` | **Architecture Decision Record** | Important design choices, alternatives and rationale | `ADR-006-backend-contracts.md` *(illustrative Planned filename; ID allocation requires review)* |
| `M` | **Milestone** | Planned work with deliverables and exit criteria | `M01-desktop-foundation.md` *(illustrative Planned filename)* |
| `FR` | **Functional Requirement** | A behavior or capability the system must provide | `FR-01` inside a future requirements document |
| `NFR` | **Non-Functional Requirement** | A quality, constraint or assurance requirement | `NFR-04` inside a future requirements document |

`PWOS` remains the stable document identifier prefix even though the repository is now called `personal-os`. Changing old identifiers would unnecessarily break references. New project-wide specifications continue the `PWOS` sequence unless a formal naming decision changes it.

No active decision-log file or individual `ADR-*` document exists in the current checkout. Earlier references to `ADR-001` through `ADR-005` do not establish that those records are present. Before assigning a new ADR ID, check repository history and prior allocations with the owner; preserve any previously assigned IDs and continue after the highest confirmed allocation. If `ADR-001` through `ADR-005` are confirmed as allocated, the next ID is `ADR-006`. Use the three-digit format, not `ADR-0001`, and never reuse an ID merely because its file is absent.

Research notes do not yet need a numbered prefix. Use a descriptive filename such as the illustrative Planned `capability-scheduler-hypothesis.md` (absent from this checkout); introduce a research ID scheme only when tracking requires it.

### 3. Filename format

For numbered specifications and decisions:

```text
<IDENTIFIER>-<short-description>.md
```

For milestones:

```text
M<two-digit-number>-<short-description>.md
```

Rules:

1. Keep identifier letters uppercase (`PWOS`, `ADR`, `M`, `FR`, `NFR`).
2. Use lowercase **kebab-case** for the description: words joined by hyphens.
3. Use `.md` for Markdown documentation.
4. Give each numbered document a unique, permanent identifier; never reuse a retired number.
5. Choose descriptions based on the document's enduring subject, not its temporary status.
6. Do **not** put version numbers, `draft`, `final`, or dates into specification filenames. Put those values in the document and Git history.

Filename examples (illustrative Planned paths are absent and are not assigned document IDs):

| Correct | Why |
| --- | --- |
| `foundation/PWOS-001-project-charter.md` | Current: stable charter identifier and descriptive filename |
| `architecture/PWOS-002-system-architecture-foundation.md` | Current: accepted architecture specification |
| `architecture/PWOS-003-system-architecture.md` | Illustrative Planned architecture filename; allocate a permanent ID before creation |
| `roadmap/M01-desktop-foundation.md` | Illustrative Planned milestone filename with a two-digit number |
| `decisions/decision-log.md` | Illustrative Planned living index of decisions, not a separate numbered ADR |

Avoid names such as `requirements-final-v3.md`, `new-design.md`, `misc.md`, or `PWOS-002_SystemRequirements.MD`.

### 4. Directory versus document identity

Paths locate documents; identifiers **refer to** documents. For example, `PWOS-002` remains PWOS-002 even if it moves from `requirements/` to another folder.

Files in different directories may share a name such as `README.md`, because their full paths differ. Numbered project specifications should nevertheless have globally unique IDs for searchability and traceability.

### 5. Numbering policy

- `PWOS-001`, `PWOS-002`, ...: consecutive three-digit document IDs; gaps are allowed if a document is retired.
- `ADR-001`, `ADR-002`, ...: consecutive three-digit decision IDs, continuing confirmed prior allocations after checking history; no active decision log is present.
- `M01`, `M02`, ...: consecutive two-digit milestone IDs; numbering reflects planning order, not a guaranteed release date.
- `FR-01`, `FR-02`, ... and `NFR-01`, `NFR-02`, ...: requirement IDs unique **within their owning specification**. Outside that document, qualify the ID using its document ID (for example, `PWOS-005:FR-01` if a future requirements document is assigned PWOS-005).

Do not renumber an existing document or requirement solely to change its order in a table or folder.

## Header metadata — YAML frontmatter

Numbered specifications (`PWOS-*`), individual decision records (`ADR-*`), milestones (`M*`), and substantive research notes must begin with **YAML frontmatter**. It is enclosed between two lines containing exactly `---`, before the Markdown title.

Example:

```yaml
---
id: "PWOS-002"
title: "System Architecture Foundation"
type: "architecture"
version: "0.2"
status: "accepted"
scope: "system"
last_reviewed: "2026-10-27"
superseded_by: null
---
```

The required keys are:

| Key | Meaning | Rule |
| --- | --- | --- |
| `id` | Stable document identifier | Must match the identifier in the filename |
| `title` | Human-readable document title | Nonempty string |
| `type` | Document class | `charter`, `requirements`, `architecture`, `interface`, `decision`, `milestone`, or `research` |
| `version` | Internal document version | Quoted string such as `"0.4"`; never embed it in the filename |
| `status` | Review status | `draft`, `proposed`, `accepted`, or `superseded` |
| `scope` | System or subsystem governed | Short nonempty string |
| `last_reviewed` | Date of last content review | Quoted `YYYY-MM-DD` string |
| `superseded_by` | Replacement document ID | `null` unless status is `superseded` |

We intentionally use a small **flat YAML subset** for metadata—quoted string scalars and `null`, with one key per line—so standard YAML parsers and future validation tooling can interpret it consistently. `README.md`, the documentation index, and the documentation guide are navigation or policy pages and do not require numbered-document frontmatter. A Planned living `decision-log.md` would also be exempt.

Use `accepted` only when the document has actually been reviewed and adopted. `implemented` and `verified` describe engineering evidence, not frontmatter review statuses.

For a charter, acceptance additionally requires an explicit owner approval of a stated version and a recorded approver/date inside the document. A passed linter or an assistant suggestion is not approval.

### Status meanings

| Status | Meaning |
| --- | --- |
| `draft` | Being developed; incomplete and subject to change |
| `proposed` | Ready for review, but not yet adopted as the baseline |
| `accepted` | Reviewed and adopted as the current design or requirement baseline |
| `superseded` | Replaced by a newer, explicitly referenced decision or specification |

Status is **not** implementation progress. A specification may be `Accepted` even if the system described by it has not been built. Implementation and verification evidence belong in tests, milestone records, and traceability tables.

### Version meanings

- `0.1`, `0.2`, etc.: early iterations of a document whose baseline is still evolving.
- `1.0`: an intentionally established first stable document version, not an automatic claim of production readiness.
- Later versions: meaningful changes recorded with Git history and, when necessary, a short revision note.

The **filename does not change** simply because its internal version changes.

### Deprecation and supersession

Any document marked `status: "superseded"` **must**:

1. Set `superseded_by` to the stable ID of an existing replacement document (for example, `"ADR-012"`).
2. Include a prominent forward link immediately after its Markdown title, using a verified existing replacement target. Illustrative syntax only: `**Superseded by:** [ADR-012](../decisions/ADR-012-replacement.md)`. That example file is absent; do not create that link unless the replacement actually exists.
3. Preserve the original document and its ID for traceability; do not silently rewrite history or reuse its identifier.
4. Update indexes and inbound references that describe which document is authoritative.

Documents not marked `superseded` must use `superseded_by: null`. A supersession chain should lead to a current document; circular references are prohibited.

### Requirement references and collisions

Within a future requirements specification, a table may use the short ID `FR-01`. Outside that specification—in another document, a Git commit, an issue, a test name, or design review—use a **qualified reference** such as `PWOS-005:FR-01` (or `PWOS-005:NFR-04`) if PWOS-005 is assigned to that document. PWOS-002 now identifies the architecture foundation, **not** the historical requirements draft.

If requirements later split into subsystem-specific specifications, the owning document ID remains the primary namespace. Prefixes such as `AUTH-FR-01` may be introduced only through an explicit architecture decision and a migration map. Existing requirement IDs are not renumbered casually.

## Structure and traceability

1. Begin with purpose, scope and assumptions.
2. Keep requirements measurable and give them stable IDs.
3. Link to upstream requirements or decisions when they determine an interface or component.
4. For interfaces, specify inputs, outputs, permissions, errors, versioning and compatibility.
5. For milestones, list verification methods and evidence required to exit.
6. For research, distinguish existing prior art, hypotheses, experimental methods, observed results and conclusions.

## Links and maintenance

- Prefer relative Markdown links so docs work in GitHub, Codespaces, and offline archives.
- Update the documentation index when adding or moving a document.
- Update any references affected by a move in the same change.
- Do not silently overwrite decision history; supersede outdated decisions with an explanation.
- Avoid duplicating authoritative requirements across multiple documents; cross-reference the requirements specification.

## Verification and enforcement

**Current:** Inspection of the checkout and tracked files confirms that `scripts/lint-docs.mjs`, a root `docs:check` script, and documentation CI workflows are not implemented. There is no documentation checker to run or automated documentation enforcement to claim.

**Planned — IMP-008:** Future tooling must implement the following six validation checks and fail on each corresponding violation:

1. Broken local Markdown links or references to moved paths.
2. Numbered document filenames that do not match the identifier naming scheme.
3. Missing, malformed, or duplicate YAML frontmatter fields in governed documents.
4. Invalid document statuses, versions, dates, or mismatches between filename and `id`.
5. Missing or invalid `superseded_by` pointers, or missing forward links for superseded documents.
6. Duplicate document IDs across governed Markdown files.

Future tooling must also check requirement ID collisions **within one specification**. Cross-document references must continue to use a qualified `PWOS-XXX:FR-YY` or `PWOS-XXX:NFR-YY` form. Automated recognition of prose references is prone to false positives; any initial automation should document its advisory limits. More advanced traceability validation may follow when the requirements catalog expands.

Under accepted [PWOS-001 §11.2](foundation/PWOS-001-project-charter.md#112-approval-process), manual documentation verification is the **Current temporary procedure**: verify local links and anchors, actual repository paths, metadata and stable identifiers, document classifications and review statuses, and cross-document consistency. Review the complete working and staged diffs and run `git diff --check` and `git diff --cached --check`. IMP-008 remains future automation; incorporate its checker once implemented and verified. Future tooling will validate documentation format and references, not the technical truth of its claims; human review remains necessary for correctness, completeness, and feasibility. Documentation checks do not replace explicit owner approval, runtime testing, product-gate acceptance or security verification.

## Improvement register maintenance

The non-governing [Personal OS Improvement Register](IMPROVEMENTS.md) is the single backlog for optional enhancements, discovered weaknesses, and follow-up engineering work. It **does not** change the five-document governing baseline or approve an architecture change by itself.

Whenever a project file or document is created, changed, or reviewed:

1. Review the register and add or revise relevant `IMP-###` entries. Do not reuse identifiers.
2. Record the proposed change, measurable benefit, costs and risks, priority, status, and acceptance evidence.
3. Use **Approved** only after the project owner explicitly accepts the proposal. Code added or documentation edited does not by itself mean an improvement is verified.
4. Highlight high-impact recommendations **before starting the next implementation step**, especially changes that affect architecture, security or public deployment.
5. Synchronize the relevant project README or governing document only when its stated responsibilities, status or approved design have actually changed.
6. In every change handoff, state which files were updated, which others still need updating (or **none**), what can be improved, and the proposed next file or task.

Proposed architectural changes must follow the review and approval processes in [PWOS-001](foundation/PWOS-001-project-charter.md) and [PWOS-002](architecture/PWOS-002-system-architecture-foundation.md), regardless of their status in the improvement register.

## Cross-document synchronization and handoff

For every document that is created or revised, the accompanying handoff should state:

1. **Document delivered:** exact file, version/status where applicable, and substance of changes.
2. **Related updates:** which of the other recognized documents need changes now or after owner approval; say explicitly when none are required.
3. **Improvements:** unresolved gaps, testable questions and proposed refinements.
4. **Next work:** one concrete next design or verification activity.

Current synchronization responsibilities:

| Change | Check and update if affected |
| --- | --- |
| Charter vision, scope, stages or approval | Root README project summary; docs index version and status |
| Repository startup or implemented capability | Root README and charter's evidence snapshot |
| Documentation naming or review policy | Documentation Guide; docs index instructions; affected governed frontmatter |
| Authoritative document inventory | Docs index; root README's document links; charter's governing-set section |
| Project file created, removed, renamed, or changed in ownership, lifecycle, Git tracking state, or material implementation/review status | File Registry entries, relationships, counts and evidence; schedule the registry edit as a separate task |
| Dependency or file-responsibility relationship changes | File Registry dependency/synchronization notes; affected module ownership documentation in separate file steps |
| Git development, review, commit, branch, push, recovery or reporting practices change | Development Workflow; check this guide's references for consistency without duplicating workflow rules |
| Supplementary registry/workflow guide added, renamed, or changed in role | Documentation index navigation and File Registry; preserve the five-document governing set and schedule each file separately |

Do not treat documenting a proposed feature as implementing it. Keep claims of completion tied to observable evidence.
