# Personal OS

**A self-hosted, web-native personal computing environment — designed to evolve.**

Personal OS is an experimental, browser-accessible desktop with in-house applications, a versioned OS API, owner-controlled file storage, and local AI as its intended capabilities. It is designed to begin on a **Raspberry Pi 5** using Linux-hosted services and eventually support hybrid or virtual execution backed by an **original kernel developed from the ground up**.

The repository is named `personal-os`. Its documentation retains the historical `PWOS` identifier prefix for stable references. Proposed enhancements and their status are tracked in the [Improvement Register](docs/IMPROVEMENTS.md).

> **Current stage: first browser desktop accepted (GP-01).** The owner reports successful private Codespaces rendering, refresh, truthful offline status and usable desktop/mobile layouts. The host displays the reusable shell; no private backend, file service, persistent storage or AI is connected. IMP-007 Stage A automated smoke testing and GP-02 release readiness are next; neither browser automation nor production readiness is established.

## What we are building

| Area | Initial direction | Long-term direction |
| --- | --- | --- |
| Experience | Desktop launched by opening a website | Consistent user experience across supported execution modes |
| Applications | In-house web apps and SDK | Portable applications using stable OS interfaces |
| Backend | Linux-hosted services on Raspberry Pi 5 | Linux, virtual, and original native backends |
| Storage | Pi-hosted personal cloud, with separate backups | Backend-independent storage services |
| AI | Local inference on owner-controlled hardware | Permission-scoped integration across applications |
| Kernel | Linux provides host OS functionality initially | Independently researched original kernel and userspace |

**Design principle:** Applications should depend on documented OS APIs rather than directly on Linux-specific or kernel-specific internals. Changing the execution backend will still require compatibility tests and may introduce new constraints. The browser is intended to remain a **thin delivery host**, with desktop-shell and application-runtime implementations owned by independent packages.

## Project status

| Component | State |
| --- | --- |
| Desktop shell | Reusable presentation frame in `packages/desktop-shell`, consumed through public exports. Prior owner-reported and Codex verification covers strict TypeScript checking, build, public entry resolution and generated maps (IMP-002); GP-01 browser rendering accepted per owner report. |
| Browser host | Implemented `apps/web/index.html`, `src/main.tsx` and `vite.config.ts`; React 19 mounts DesktopShell through `@personal-os/desktop-shell`. Vite integrates React and an exact environment-derived Codespaces host allowance. |
| Browser preview | GP-01 Completed and IMP-001 Verified based on owner-reported private Codespaces load, rendering, refresh, ~1280px/~390px usability and clean Incognito console. Server availability depends on launching it; no live server check is performed for this README update. |
| GitHub Pages demo | Proposed static demonstration-only profile; no deployment configuration or verified site |
| HTTP API | No `apps/api` implementation or verified endpoints in this checkout |
| Automated checks | Shell typecheck/build and web production build passed in prior Codex work. Exact `@playwright/test` 1.64.1 and `test:e2e` are installed/declared; Chromium completion is unconfirmed, Playwright configuration/tests and accessibility/CI checks are not implemented. No automated browser pass claimed. |
| Application runtime, versioned OS API, SDK and backends | Planned architecture; no corresponding implementation directories in this checkout |
| Shared UI and TypeScript configuration | `packages/ui` and `packages/tsconfig` absent; the shell owns its existing package-specific tsconfig |
| Authentication, real file management, personal cloud and local AI | Not implemented |
| Raspberry Pi production deployment | Planned; not verified |
| Original kernel | Long-term research direction; no kernel source directory or bootable implementation |

For staged acceptance criteria and remaining work, see [PWOS-001 — Project Charter](docs/foundation/PWOS-001-project-charter.md#8-use-from-day-one-delivery-plan).

## Quick start — GitHub Codespaces

1. Open the `personal-os` repository in Codespaces. The root npm workspaces include `@personal-os/web` and `@personal-os/desktop-shell`. Use a supported Node version; prior setup used Node 24 and npm 11.
2. From the repository root, install the committed lockfile dependencies, check the shell and build its public exports:

   ```bash
   npm ci
   npm run typecheck -w @personal-os/desktop-shell
   npm run build -w @personal-os/desktop-shell
   ```

   `npm ci` is the clean-install procedure; it replaces local installed dependencies. Clean-checkout reproducibility remains a GP-02 verification gate, not a result rerun here. The web dependencies and root lockfile are already synchronized and committed, including Playwright Test 1.64.1. Use `npm install` for intentional dependency changes and review the generated lockfile with the manifest.
3. Start the web workspace:

   ```bash
   npm run dev -w @personal-os/web -- --port 5173 --strictPort
   ```

   Forward port 5173 using Codespaces Ports with visibility **PRIVATE**, then open its URL. Vite derives the exact allowed forwarded hostname from `CODESPACE_NAME` and `GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN`; it preserves normal localhost security checks. The preview shows Personal OS shell content and an honest offline/no-service status. It provides no authenticated backend, file operations, persistent storage or AI connection.
4. To build and inspect the production artifact locally, after the shell build:

   ```bash
   npm run build -w @personal-os/web
   npm run preview -w @personal-os/web -- --port 4173 --strictPort
   ```

   Static output is `apps/web/dist/`. Production-preview browser validation and the `/personal-os/` asset base remain GP-02 work. Development preview acceptance does not establish Pages readiness.

**Evidence:** Fresh checks for this README cover files, tracking states, package/lockfile declarations and documented scripts. Prior Codex tasks passed shell typecheck/build and web build and verified exact-host acceptance, unrelated-host rejection and simulated hostname portability. Owner-reported GP-01 browser checks covered rendering, refresh, desktop/mobile usability and no CSP warning or other console errors in Incognito. An earlier CSP warning did not reproduce there; its source remains unconfirmed. No installation, compiler/build, server or browser tests were rerun for this documentation change.

## Proposed GitHub Pages preview

Personal OS plans to support **two web delivery profiles** using the same reusable desktop shell:

| Profile | Intended location | Allowed functionality |
| --- | --- | --- |
| **Public demo** | GitHub Pages, provisionally `https://sas8037.github.io/personal-os/` | Statically built UI, sample apps, mock status and explicitly non-sensitive demonstration data |
| **Private OS** | Raspberry Pi 5, on an owner-controlled private connection | Authenticated services, private storage, and local AI once independently implemented and reviewed |

The Pages URL is **proposed, not claimed deployed or verified**; public publication has not been approved. GitHub Pages serves static files; it does not host the Personal OS service gateway, personal cloud, inference engine or custom kernel. A public demo must never embed credentials, private files, production API endpoints or a model-tool bridge. **Do not connect the public Pages origin directly to privileged Pi services as part of D0.** The production/private OS remains Pi-hosted.

The web host exists; the planned public deployment still requires a Vite static build, an environment-specific asset base (`/personal-os/` for the GitHub project site), and a GitHub Actions Pages deployment. Navigation and asset loading must be verified under the repository subpath. A public Pages demo is **optional D0 distribution**, not a replacement for Codespaces browser smoke testing or an authorization/security review.

## Repository organization

The actual Codespaces checkout is the implementation source of truth. This Current inventory reflects the checkout reviewed on 2026-10-31. All files shown are tracked first-party source/configuration/documentation; local editor support and ignored generated output are listed separately. The [File Registry](docs/FILE-REGISTRY.md) records 21 tracked project files plus one untracked local editor file.

```text
personal-os/
├── .gitignore
├── .gitmessage                 # Commit-message template; local Git setup is separate
├── README.md
├── package.json                # npm workspace definitions and legacy shell type check
├── package-lock.json           # Committed shell/web/Playwright dependency resolution
├── apps/
│   └── web/
│       ├── package.json
│       ├── index.html
│       ├── vite.config.ts
│       └── src/
│           └── main.tsx
├── packages/
│   ├── README.md
│   └── desktop-shell/
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── DesktopShell.tsx
│           └── index.ts
└── docs/
    ├── README.md
    ├── DOCUMENTATION-GUIDE.md
    ├── IMPROVEMENTS.md
    ├── FILE-REGISTRY.md
    ├── DEVELOPMENT-WORKFLOW.md
    ├── architecture/
    │   └── PWOS-002-system-architecture-foundation.md
    └── foundation/
        └── PWOS-001-project-charter.md
```

Local support files are separate from the first-party tree above. `.vscode/settings.json` is an untracked, empty editor configuration. `.agents/`, `.codex/`, and `.aws/` are local environment/agent-support directories with no tracked project files or files found in this inspection. Their presence does not establish committed configuration or product functionality. `.git/` contains Git metadata.

`packages/desktop-shell/dist/` and `apps/web/dist/` are ignored generated builds. Installed `node_modules/` contains third-party dependencies: **zero entries remain tracked**, following verified IMP-017 cleanup that preserved the local installation per prior owner report. Ignore rules alone do not untrack files. Future web `test-results/` and `playwright-report/` outputs are also ignored. Generated output and local environment support are excluded from the first-party tree.

| Classification | Paths and meaning |
| --- | --- |
| Current implementation | `packages/desktop-shell/src/` contains the standalone, unstyled React presentation frame and public types. The package exports `dist/index.js` and `dist/index.d.ts` through `@personal-os/desktop-shell`; build before consuming it. `apps/web` contains the HTML entry, React bootstrap, Vite configuration and manifest; it composes the public shell. |
| Historical — absent starters | Earlier references to `apps/web/src/shell/` and an `apps/api` starter do not describe files in this checkout. No starter application or API endpoints remain here. `docs/archive/` is also absent. |
| Planned architecture — absent from checkout | `apps/desktop`, `apps/file-manager`, `apps/ai-assistant`; `packages/app-runtime`, `packages/app-sdk`, `packages/os-api`, `packages/protocols`, `packages/ui`, `packages/tsconfig`, `packages/design-system`; `backends/`, `services/`, `platform/`, `kernel/`, and `tests/`. |
| Absent development tooling | `.devcontainer/`, `.github/workflows/`, and `scripts/` are not present; no repository-provided Codespaces configuration, CI workflow, or documentation checker is implemented. |

The accepted architecture keeps frontend hosts thin: they compose public shell/runtime interfaces. The shell owns presentation, the future runtime owns application lifecycle, and trusted services own privileged authorization. Independent applications should use the future SDK and OS API rather than private host or shell internals. An alternative desktop host must have a distinct role without duplicating the shell. Browser desktop state is separate from the future hardware kernel.

See the [Shared Packages Guide](packages/README.md) for dependency conventions and the [Improvement Register](docs/IMPROVEMENTS.md) for planning and verification. The package guide's implementation-status reconciliation is complete. Other documents still require architecture-version and progress synchronization under IMP-015; use the actual checkout, accepted governing documents and attributed evidence for current status. This does not establish complete cross-document consistency or close IMP-015. [PWOS-001](docs/foundation/PWOS-001-project-charter.md) establishes project scope; [PWOS-002](docs/architecture/PWOS-002-system-architecture-foundation.md) governs ownership. Future `@personal-os/app-sdk` and `@personal-os/os-api` identities are proposed contracts, not existing packages or stable APIs.

## Useful commands

Run from the repository root:

| Command | Purpose |
| --- | --- |
| `npm ci` | Install from the committed lockfile; clean-checkout reproducibility is still a GP-02 gate |
| `npm install` | Install/synchronize intentional workspace dependency changes; review manifest and lockfile |
| `npm ls --depth=0` | Inspect installed top-level workspace dependencies |
| `npm run typecheck -w @personal-os/desktop-shell` | Check shell source with the strict package tsconfig without emitting files |
| `npm run build -w @personal-os/desktop-shell` | Emit JavaScript, type declarations, and both map types into the package’s `dist/` directory |
| `npm run typecheck:desktop-shell` | Run the existing root check with inline compiler options; does not use the package tsconfig |
| `npm run dev -w @personal-os/web -- --port 5173 --strictPort` | Launch Vite for the private Codespaces preview |
| `npm run build -w @personal-os/web` | Build web production assets after building the shell |
| `npm run preview -w @personal-os/web -- --port 4173 --strictPort` | Serve the built web artifact locally for separate validation |
| `npm run test:e2e -w @personal-os/web` | Declared `playwright test` command; do not run yet without browser installation, configuration and tests |

The root manifest does not define `dev`, `build`, `test` or `docs:check` scripts. The web workspace has runnable Vite scripts and installed dependencies. Playwright tooling is installed, but Chromium installation has not been reported complete and no Playwright config or test sources exist. Accessibility testing and GitHub Actions testing CI remain pending under IMP-007. No `scripts/lint-docs.mjs` exists in this checkout. Shell checks do not establish browser, production or Raspberry Pi readiness.

## Documentation

**Start with the [Documentation Index](docs/README.md)**, which explains where authoritative specifications live and how to read them.

| Document | Role |
| --- | --- |
| [PWOS-001 — Project Charter](docs/foundation/PWOS-001-project-charter.md) | Vision, scope, guiding principles and evolution path |
| [PWOS-002 — System Architecture Foundation](docs/architecture/PWOS-002-system-architecture-foundation.md) | Accepted layer boundaries, ownership, dependency rules, trust and backend portability |
| [Documentation Guide](docs/DOCUMENTATION-GUIDE.md) | Naming, IDs, frontmatter, status and traceability rules |
| [Shared Packages Guide](packages/README.md) | Package inventory, ownership, dependency rules and development conventions |
| [File Registry](docs/FILE-REGISTRY.md) | Supplementary living inventory of files, tracking states, responsibilities, relationships and review evidence; refresh its dated snapshot against Git |
| [Development Workflow](docs/DEVELOPMENT-WORKFLOW.md) | Supplementary editing, verification, staging, Conventional Commit and publication practices |

The **five governing project documents** are the root README, documentation index, documentation guide, PWOS-001 and PWOS-002. The package guide, File Registry, Development Workflow, and Improvement Register are supplementary, non-governing documents; they do not expand that governing set. **PWOS-001 v0.14 is the current accepted governing Project Charter, approved by the owner on 2026-11-09; PWOS-002 v0.4 is the accepted System Architecture Foundation, approved by the owner on 2026-11-10.** Other specifications are future work. Document review status is separate from feature implementation status; governed specifications use stable IDs and YAML frontmatter.

The historical requirements draft is absent from this checkout; **PWOS-002 identifies the System Architecture Foundation**. Read [PWOS-002](docs/architecture/PWOS-002-system-architecture-foundation.md) before extracting shared packages or implementing new cross-module contracts.

**Approval record:** The project owner accepted PWOS-001 v0.14 on 2026-11-09, integrated into main in `ae91e1ad65ffbb176507447926cbf0045f483942`. It supersedes historical accepted v0.13, approved on 2026-11-02; earlier historical accepted v0.12 was approved on 2026-10-28. v0.14 corrects factual architecture references without changing OBJ-01–OBJ-06, DEC-01–DEC-10, D0–D4 requirements, approved scope and governance, or the §11.2 verification procedure accepted with v0.13. PWOS-002 v0.4 was approved by the owner on 2026-11-10 and integrated into main in `f808a9c3858d254244ef9493b4f6a56667a9bb09`; it succeeds historical accepted v0.3, approved on 2026-11-07 and integrated in `a0d5dd3b4c94c1eb38842b3cc9ab80b28174498a`. Earlier v0.2 was approved on 2026-10-27. v0.3 resolved the 18 TASK-011 factual-accuracy findings; v0.4 corrects the current governing-charter reference to accepted PWOS-001 v0.14 while preserving historical review context. All eight ARC-01–ARC-08 decisions remain unchanged. Together they establish the project charter and system architecture baseline. Acceptance does **not** establish implementation readiness, successful runtime/browser tests, product-gate acceptance, production readiness or security certification, and does not authorize public deployment.

Under accepted [PWOS-001 §11.2](docs/foundation/PWOS-001-project-charter.md#112-approval-process), manual documentation verification is the current temporary process: check links/anchors, paths, metadata, classifications, review statuses and cross-document consistency, then review complete diffs and whitespace. IMP-008 remains Candidate; the automated documentation checker is not implemented; incorporate it once implemented and verified. No `npm run docs:check` command currently exists. Document review and explicit owner approval remain separate from successful implementation tests.

## Development and deployment principles

- **Owner-controlled data:** Store persistent personal data on self-hosted infrastructure; design and test a separate backup and recovery path.
- **Local AI:** Run production inference on self-hosted hardware. Feasible models, memory needs and performance remain to be measured.
- **Least privilege:** Authenticate and authorize privileged actions; browser interfaces should not have unrestricted access to host files or processes.
- **Private access first:** Avoid exposing development endpoints directly to the public internet. Remote access comes after security review.
- **Replaceable backends:** Define API semantics and conformance tests before migrating services to virtual or native execution.
- **Original software where it matters:** Prioritize in-house desktop, apps, APIs, services and future kernel while honestly documenting necessary dependencies such as browsers, compilers and platform firmware.

The planned Raspberry Pi deployment requires a separate implementation and verification effort for persistent storage, authentication, backups, local inference, networking, and service management. **No production deployment or Docker Compose configuration is currently supplied.**

Do not commit credentials, personal files, model weights, databases, or other private runtime state.

## Next working experience

**Current implementation priority: IMP-007 Stage A within GP-02.** GP-01 is Completed and IMP-001 Verified based on owner-reported acceptance of the first reusable-shell browser preview. This does not certify every broader D0 charter function. Playwright Test 1.64.1 and its command are installed; next establish compatible Chromium/system dependencies, isolated local Vite test configuration and repeatable desktop/mobile smoke tests, one file/task at a time. Accessibility criteria/testing follow in Stage B, then a dedicated testing CI workflow in Stage C.

**GP-02 remains In progress, acceptance pending:** Require reproducible clean-checkout installation and shell/web builds, correct `/personal-os/` asset paths, passing smoke/accessibility/CI criteria, and production-preview navigation/refresh evidence. GP-03 remains a separate safety and explicit owner-publication approval gate; GP-04 deployment and GP-05 live-site verification remain pending. No public deployment is approved or claimed.

Then **D1 — Useful local workspace** targets a useful in-house application with non-sensitive persisted data; backend/API implementation and verification remain separate. Accepted delivery scope remains in [PWOS-001](docs/foundation/PWOS-001-project-charter.md#8-use-from-day-one-delivery-plan). The minimal Pages demo needs no storage, AI, runtime or kernel implementation and cannot bypass its release gates.
