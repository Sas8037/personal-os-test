# Personal OS — Documentation Index

This is the navigation hub for Personal OS engineering documentation. The project begins as a browser-accessible, self-hosted personal environment targeting a Raspberry Pi 5. An original kernel is a separate long-term research objective.

## Current documentation baseline

**These five documents form the current governing documentation set.** PWOS-001 and PWOS-002 have both been formally accepted. Implementation-oriented READMEs may supplement them without becoming governing specifications.

| Document | Purpose | Review state |
| --- | --- | --- |
| [Repository README](../README.md) | Project vision, verified checkout inventory and current developer commands | Living entry point |
| [Documentation Index](README.md) (this file) | Navigation and documentation inventory | Living index |
| [Documentation Guide](DOCUMENTATION-GUIDE.md) | Naming, IDs, frontmatter, statuses, links and review rules | Living policy |
| [PWOS-001 — Project Charter](foundation/PWOS-001-project-charter.md) | Project vision, objectives, scope, D0–D4 product delivery requirements, risks and owner approval | v0.14 — Accepted (2026-11-09) |
| [PWOS-002 — System Architecture Foundation](architecture/PWOS-002-system-architecture-foundation.md) | System layers, component ownership and eight approved architectural decisions | v0.3 — Accepted (2026-11-07) |

PWOS-001 v0.14 is the current accepted governing charter, approved on 2026-11-09 and integrated into main in `ae91e1ad65ffbb176507447926cbf0045f483942`. It supersedes historical accepted v0.13, approved on 2026-11-02; earlier v0.12 was approved on 2026-10-28. v0.14 corrects factual architecture references while preserving accepted scope, OBJ-01–OBJ-06, DEC-01–DEC-10, D0–D4 and the §11.2 documentation-verification procedure unchanged. PWOS-002 v0.3 is the current accepted architecture authority, approved by the owner on 2026-11-07 and integrated into main. It succeeds historical accepted v0.2, whose original approval dated 2026-10-27 remains preserved. v0.3 includes the 18 factual-accuracy corrections and retains ARC-01 through ARC-08 unchanged. Document acceptance establishes governance, not implemented subsystems or product-gate acceptance.

### Supplementary documentation (non-governing)

| Guide | Purpose |
| --- | --- |
| [Shared Packages Guide](../packages/README.md) | Current and proposed shared packages, public API boundaries, dependency rules and package development workflow |
| [Improvement Register](IMPROVEMENTS.md) | Current improvements, implementation/milestone progress, owner decisions and verification evidence (non-governing) |
| [File Registry](FILE-REGISTRY.md) | Living inventory of actual files, Git tracking states, Current/Planned/Historical classifications, responsibilities and relationships |
| [Development Workflow](DEVELOPMENT-WORKFLOW.md) | Edit, verify, review, stage, commit, push and confirmation standard, including Conventional Commits |

The [project README](../README.md#proposed-github-pages-preview) describes the proposed GitHub Pages **static demo** profile and its separation from private Raspberry Pi hosting. This is a deployment proposal, not a sixth governing specification or a completed deployment.

The files currently inside `docs/` are this index, `DOCUMENTATION-GUIDE.md`, `IMPROVEMENTS.md`, `FILE-REGISTRY.md`, `DEVELOPMENT-WORKFLOW.md`, `foundation/PWOS-001-project-charter.md`, and `architecture/PWOS-002-system-architecture-foundation.md`. The governing table also includes the root README outside this directory; the Shared Packages Guide is supplementary and lives outside `docs/`.

No `docs/archive/` or historical requirements draft exists in this checkout. Earlier use of the PWOS-002 identifier for requirements is historical; **PWOS-002 identifies the accepted architecture foundation**. Planned documents are listed separately below and have no index links until they exist.

## Recommended reading order

1. Start with the [repository README](../README.md) for the actual checkout inventory, verified shell commands, and browser-host limitations.
2. Read [PWOS-001](foundation/PWOS-001-project-charter.md) for the vision, boundaries and the **D0–D4 use-from-day-one delivery path**.
3. Read [PWOS-002](architecture/PWOS-002-system-architecture-foundation.md) for the accepted system-layer design, dependencies, app lifecycle and trust boundaries.
4. Use the [Documentation Guide](DOCUMENTATION-GUIDE.md) when writing, reviewing or updating documents.
5. Consult the [Shared Packages Guide](../packages/README.md) before adding shared code or extracting a system module.
6. Review the [Improvement Register](IMPROVEMENTS.md) for proposed enhancements and decisions worth discussing before implementation.
7. Consult the [File Registry](FILE-REGISTRY.md) for file existence, tracking states, responsibilities and relationships; check the actual checkout when its snapshot needs refreshing.
8. Follow the [Development Workflow](DEVELOPMENT-WORKFLOW.md) for reviewed edits, Conventional Commits, staging and publication.
9. Return to this index for governing and supplementary navigation.

## What we are working on

The reusable `packages/desktop-shell` presentation package has verified strict TypeScript checking, compilation, compiled public exports and source/declaration maps (IMP-002 Verified). Current `apps/web` includes an HTML entry, React bootstrap and Vite configuration. React mounts DesktopShell through `@personal-os/desktop-shell`, with truthful offline/preview status and no connected private services.

**GP-01 is Completed and IMP-001 Verified**, based on owner-reported private Codespaces rendering, refresh, usable desktop/mobile layouts and a clean Incognito console. Prior Codex checks separately passed shell/web builds, exact-host acceptance and unrelated-host rejection. This index update checks documentation, files and declarations; no implementation or browser tests were rerun. An earlier CSP warning did not reproduce in Incognito; its source remains unconfirmed.

**IMP-007 is In progress within owner-approved scope, with Stage A implementation underway.** Exact `@playwright/test` 1.64.1 is installed in the web workspace and its `test:e2e` script exists. Chromium installation is not confirmed complete; Playwright configuration and automated browser tests, accessibility tests and testing CI are not implemented. The approved order is **smoke testing → accessibility → testing CI**. Tool installation is not a passing automated suite.

**GP-02 is In progress, acceptance pending:** reproducible clean installation/static build, correct `/personal-os/` assets, passing smoke/accessibility criteria, a passing testing CI pipeline and production-preview validation remain required. GP-03 retains separate public-demo safety and explicit owner-publication approval; GP-04 deployment and GP-05 live-site verification remain pending. GP-02 progress does not authorize publication.

The accepted architecture keeps the web host thin, application lifecycle in a future runtime package, and privileged authorization in trusted backends. Independent apps, SDK/OS API contracts, real file management, persistent storage, authentication, local AI and a native kernel remain Planned. Use the [Shared Packages Guide](../packages/README.md) for package relationships, the [File Registry](FILE-REGISTRY.md) for current paths/tracking and the [repository README](../README.md) for setup. Accepted governing documents state scope and architecture; PWOS-001 v0.14 preserves dated snapshots as historical evidence, while living records track current implementation. The PWOS-002 audit, v0.3 accuracy revision, owner approval/main integration and subsequent File Registry synchronization are complete (TASK-011–TASK-014). The controlled PWOS-001 v0.14 correction, owner approval and integration are also complete (TASK-015.5). Use the [Improvement Register](IMPROVEMENTS.md) and File Registry for ongoing progress and synchronization notes, checking dated statements against the accepted documents and live checkout. Accepted architecture is not evidence that proposed subsystems exist.

| Stage | Practical user outcome | Current standing |
| --- | --- | --- |
| **D0 — Day-one desktop** | Launch a browser desktop, open/close placeholders, inspect system status | IMP-002 Verified; React/Vite host implemented; GP-01 first-preview acceptance complete per owner report. Broader D0 functions and automated coverage are not certified by that acceptance; Pages publication remains pending approval |
| **D1 — Useful local workspace** | Use one real in-house notes/tasks-style app with non-sensitive persistence | Planned |
| **D2 — Private Pi alpha** | Authenticated owner storage with tested backup and restore on the Pi | Planned |
| **D3 — Local AI alpha** | Offline inference through an authorized assistant UI | Planned |
| **D4 — Stable personal service** | Repeatable private deployment with verified rollback and recovery | Planned |

D0–D4 are product delivery/capability gates governed by PWOS-001. GP-00–GP-05 are separate static-demo release milestones tracked in the Improvement Register. GP-01/GP-02 completion or a published demo cannot substitute for D0 panel interactions and actual `/health` and `/api/system` responses; **D0 is not formally accepted**. GP-03 safety review and explicit owner publication approval remain required before public deployment.

See [PWOS-001 §8](foundation/PWOS-001-project-charter.md#8-use-from-day-one-delivery-plan) for acceptance evidence and limitations. Kernel research runs separately and is not a gate for the usable web-native experience.

## Creating new documents

The following document types are **future additions**, not currently authoritative project documents:

- System requirements and traceability specifications.
- Detailed subsystem designs and formally decided interface contracts.
- Versioned interface contracts and backend conformance plans.
- Individual architecture decision records.
- Detailed milestones, kernel research notes and experiment reports.

Introduce a new document only when it has a defined purpose, an owner review decision and an index entry. Follow the [Documentation Guide](DOCUMENTATION-GUIDE.md) for IDs, YAML metadata and cross-references. When a document is approved or superseded, synchronize the current index and any affected governing summaries.

**PWOS-002 now records owner-approved approaches for ARC-01 through ARC-08**, including app trust assumptions, host roles, public protocols, storage, local AI and kernel research. This is an **accepted design baseline, not an implemented or security-certified system**; detailed parameters and verification gates remain in the document. Future requirements will receive a different, unique document ID.

## Keeping documentation accurate

1. Check that the charter and both README files describe the same project scope and phase.
2. Distinguish **document review status** from engineering **implementation and verification**.
3. Use relative links; do not treat planned directories as proof of working functionality.
4. Follow accepted [PWOS-001 §11.2](foundation/PWOS-001-project-charter.md#112-approval-process): manual documentation verification is the current temporary process. Check links/anchors, actual paths, YAML metadata/identifiers, classifications, review statuses and cross-document consistency; review complete working/staged diffs and run `git diff --check` and `git diff --cached --check`. IMP-008 remains Candidate; documentation automation is not implemented; incorporate automated checks once implemented and verified. This checkout has no `scripts/lint-docs.mjs`, root `npm run docs:check` command or testing/documentation CI. Checks do not substitute for explicit owner approval or implementation evidence.
5. For each document update, record which other documents need synchronization, what remains improvable and the next agreed work item.

## Next action

**Next implementation priority: IMP-007 Stage A / GP-02.** Continue one file at a time with Chromium/system prerequisites, isolated local Playwright configuration and repeatable desktop/mobile smoke tests, then accessibility criteria/testing and a dedicated testing CI workflow. Playwright tooling and output ignore rules are already present. GP-02 acceptance remains pending, and GP-03 public-demo safety/explicit owner approval cannot be bypassed. Remaining IMP-015 documentation work is synchronization of dependent documents with accepted v0.14, final cross-document verification and a separate evidence-based closure review. Keep those changes separately authorized, one file at a time; IMP-015 remains In progress, preserving accepted architectural decisions and prior evidence.
