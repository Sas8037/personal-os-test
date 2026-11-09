---
id: "PWOS-001"
title: "Project Charter"
type: "charter"
version: "0.14"
status: "proposed"
scope: "project"
last_reviewed: "2026-11-09"
superseded_by: null
---

# Personal OS
## Project Charter and Foundational Delivery Strategy

**Repository:** `personal-os` (formerly `personal-web-os`)  
**Documentation home:** [Documentation Index](../README.md)

**Proposal status:** **PWOS-001 v0.14 is a proposed factual-accuracy successor; owner approval is pending. It is not accepted or effective.** PWOS-001 v0.13 remains the accepted governing charter on `main`, approved 2026-11-02 including the §11.2 documentation-verification procedure. v0.13 has not been superseded by this proposal. This revision changes no accepted scope, objectives, architectural decisions, security principles or delivery requirements; separate explicit owner acceptance is required before any controlled integration.

**Current architecture authority:** [PWOS-002 v0.3](../architecture/PWOS-002-system-architecture-foundation.md) is Accepted, approved by the owner on 2026-11-07 and integrated into main in `a0d5dd3b4c94c1eb38842b3cc9ab80b28174498a`. It supersedes historical accepted v0.2, approved 2026-10-27. v0.3 resolves the 18 factual-accuracy findings from TASK-011 without modifying ARC-01 through ARC-08. Architecture acceptance does not establish implemented subsystems, product-gate acceptance, security certification or public GitHub Pages authorization.

**Proposed revision summary (2026-11-09):** Correct the current PWOS-002 authority references and distinguish this v0.14 proposal from accepted PWOS-001 v0.13 on main. Preserve the v0.12/v0.13 approvals, dated implementation evidence, all approved objectives, ownership/security boundaries, D0–D4 requirements, DEC-01–DEC-10 and §11.2 without substantive change. Review uses the live accepted documents and Git publication evidence; no application or browser tests run and no owner approval of v0.14 is recorded.

**Historical v0.13 revision summary (2026-11-02):** Correct repository and browser/testing facts, distinguish Historical starters from Current implementation and Planned architecture, and preserve all accepted objectives, scope, ownership, security principles and D0–D4 requirements. The owner explicitly approved the manual-check replacement in §11.2 with v0.13 on 2026-11-02; the approval is recorded separately from implementation verification. Final refinements clarify interim manual documentation checks, stable document responsibilities and the separation of D0–D4 product gates from GP-00–GP-05 release milestones. No implementation or browser tests were run for this document revision.

**Review note:** Version 0.12 was formally accepted by the project owner on 2026-10-28. That approval established project direction and early delivery gates; [PWOS-002](../architecture/PWOS-002-system-architecture-foundation.md) is the accepted detailed architecture baseline. Approval does not mean the proposed product capabilities are implemented.

---

## 1. Vision

Personal OS is an original, self-hosted personal computing environment accessed through a website. The user opens a browser, signs in, and loads a desktop with applications, files, system settings, and locally hosted AI capabilities.

The project starts as a web-native operating environment and preserves the possibility of evolving into a hybrid system or a virtual computer using an original kernel. Its priorities are user ownership, modularity, extensibility, security, and the development of in-house software.

The **repository name** is `personal-os`; the stable `PWOS` documentation prefix retains the original project's name to avoid breaking references. The project is not yet an installed operating system or a public web service.

## 2. Objectives, boundaries and users

### 2.1 Primary user and operating model

The initial audience is **one owner** using a compatible browser. Development happens in GitHub Codespaces, while the intended private home deployment runs on a Raspberry Pi 5. Public accounts, multi-tenant hosting and an app marketplace are not initial requirements.

### 2.2 Project objectives

| ID | Objective | High-level evidence of success |
| --- | --- | --- |
| OBJ-01 | Provide an OS-like desktop directly in a browser | The owner can load the desktop from a URL and interact with applications |
| OBJ-02 | Make the system useful throughout development | Every development stage has a runnable, demonstrable build; early features work without real personal data |
| OBJ-03 | Keep personal data under owner control | When storage is enabled, its persistent data remains on owner-controlled infrastructure with tested recovery |
| OBJ-04 | Offer local AI integration | A self-hosted inference service works through permission-checked application interfaces after feasibility testing |
| OBJ-05 | Keep applications independent of their execution backend | Defined API contracts and common tests pass on every backend claimed as supported |
| OBJ-06 | Research genuinely original OS technology | Kernel claims are backed by reproducible emulator or hardware evidence rather than plans alone |

### 2.3 In scope

- Browser desktop, launcher, basic window interaction, settings and in-house applications.
- OS API, application interfaces, local services, single-owner identity and permissions.
- Pi-hosted personal cloud storage, backups and recovery after the security foundations exist.
- Local AI inference on self-hosted hardware, subject to performance measurement.
- Independent original-kernel research, with a potential later hybrid or native migration.

### 2.4 Out of scope for the initial usable release

- Replacing Linux, booting the custom kernel or guaranteeing native application compatibility.
- Production authentication, remote internet access, real personal-file storage or AI inference on day one.
- Public signups, multiple untrusted tenants, third-party plugin execution or a public app marketplace.
- Claims of novel technology, safety or performance without independent tests.

The day-one desktop is a **functional development environment**, not a promise that storage, AI or remote access is secure or complete.

## 3. Development and deployment

- **Development:** GitHub Codespaces and Git source control.
- **Initial host:** Raspberry Pi 5 running 64-bit Linux.
- **Interface:** A web browser on a compatible device.
- **Storage:** Pi-hosted personal cloud, with owner-controlled backup and recovery.
- **AI:** Local inference on self-hosted hardware; model and performance targets remain subject to benchmarking.
- **Remote access:** Private and authenticated access, introduced after security testing.

### Proposed public demonstration channel (2026-10-28)

**Proposal for owner review; not an amendment to the accepted PWOS-001 v0.12 scope or D0 acceptance gate.** In addition to a Codespaces development preview and the eventual private Pi-hosted OS, the project may publish a **static, non-sensitive GitHub Pages demo** of the browser interface. This public site must use sample/mock data and expose no live identity, filesystem, AI, device-management, or other privileged Pi capabilities. It is a distribution and UI-testing option, **not** a migration of personal cloud storage or inference off the Pi.

The expected project-site path is `/personal-os/`, subject to actual GitHub repository configuration and successful deployment testing. Before publishing, verify the static build, path handling, asset URLs, non-sensitive contents, navigation, and explicit unavailable-capability UI. The owner must separately approve any future change that allows a public origin to communicate with private authenticated services; it must not be inferred from this demo proposal.

### 3.1 Assumptions and constraints

- **Hardware commitment:** Raspberry Pi 5 is the target, but RAM size, storage capacity, power protection and network topology remain undecided.
- **Development dependency:** Codespaces, Node.js, existing browsers and Linux are allowed scaffolding; “in-house” describes the project's differentiating software, not every external tool or firmware component.
- **Private data boundary:** Codespaces previews use mock or non-sensitive data only; the Pi remains the intended owner-controlled storage and inference host.
- **Resource limits:** AI models, concurrent workloads and UI responsiveness must be benchmarked on actual chosen hardware before hard limits are adopted.
- **Operational constraint:** A private-only prototype must not be exposed as a public production service merely because a forwarded development port works.

## 4. Architecture and evolution

The intended architectural layers are **frontend host**, **desktop shell**, **application runtime**, **standalone applications and public SDK**, **OS API and privileged services**, **execution backend**, and **kernel/hardware**. Applications should depend on documented OS APIs instead of Linux-specific facilities wherever practical. **Standalone userland applications** belong to monorepo workspaces under `apps/*`, separate from the browser desktop shell. They will integrate through `@personal-os/app-sdk` and `@personal-os/os-api` once these public contracts are designed and implemented; these are proposed package identities, not existing reserved workspaces; no corresponding package directories, manifests or implemented contracts exist.

### 4.1 Target ownership boundaries

| Layer | Long-term owner | Primary responsibility |
| --- | --- | --- |
| Browser host | `apps/web/` | Bootstraps a web frontend and composes separately owned modules |
| Other desktop host | `apps/desktop/` | Reserved for a distinct host/deployment target; must not duplicate the shared shell |
| Desktop shell | `packages/desktop-shell/` | Windows, desktop, dock, launcher, panels and widgets |
| Application runtime | `packages/app-runtime/` | Discovery, lifecycle, loading, host integration and isolation policy enforcement |
| Standalone applications | `apps/file-manager/`, `apps/ai-assistant/`, future `apps/*` | Independently built user functionality |
| Public application contracts | `packages/app-sdk/`, `packages/os-api/`, `packages/protocols/` | Versioned interfaces, manifests, messages and capability semantics |
| Privileged functionality | `services/` | Identity, storage, networking, AI and process-related services |
| Execution adapters | `backends/` | Implement services against Linux, virtual or native execution facilities |
| Original kernel | `kernel/` | Low-level execution, protection and resource management; independent of React/TypeScript |

The **browser host must be thin**: UI composition and bootstrap are allowed, but application-runtime policy, shell behavior, and privileged service implementations belong to their own modules. `apps/desktop/` is not a second owner for shell internals. PWOS-002 selects an initial trusted-first-party app model and a future isolation direction; the detailed loading protocol and security mechanisms remain unimplemented and require verification.

### 4.2 Conceptual architecture diagram

This diagram represents **intended ownership and interaction boundaries**, not existing deployment units or a finalized call graph.

```mermaid
flowchart TD
    Host["Browser host: apps/web"]
    Shell["Desktop shell"]
    Runtime["Application runtime"]
    Apps["Standalone applications"]
    Contracts["Public SDK and OS API contracts"]
    Services["Privileged system services"]
    Backends["Execution adapters"]
    Linux["Linux host"]
    Original["Future original OS kernel"]

    Host --> Shell
    Host --> Runtime
    Runtime --> Apps
    Apps --> Contracts
    Runtime --> Contracts
    Contracts --> Services
    Services --> Backends
    Backends --> Linux
    Backends -. future .-> Original
```

The shell presents the desktop; the runtime hosts and manages applications. **Neither the shell nor the app SDK grants privileged authority by itself.** Service and backend implementations must enforce permissions at their trust boundaries. The dashed original-kernel path is a research goal and is not operational today. PWOS-002 selects same-origin HTTPS with JSON request/response bodies for the initial browser-to-service transport. Detailed schemas, version negotiation, application isolation and process boundaries remain pending; the selected transport is an architectural direction, not an implemented service.

The Current implementation is a React/Vite browser host composing the reusable desktop-shell presentation package through its public exports. No Fastify/API starter, backend service or endpoint is implemented in the current checkout. Frontend technologies are not permanent kernel or runtime dependencies.

The following modes are distinct phases with different readiness criteria, not interchangeable names for the same implementation:

1. **Web-native:** Browser desktop plus Linux-hosted services on the Pi.
2. **Hybrid:** The same web desktop communicates with Linux services and selected services or native programs running inside an original OS guest.
3. **Virtual/native custom OS:** The original kernel and its userspace progressively provide the backend services, inside a VM or directly on supported hardware.

**Web-native is the delivery baseline.** The hybrid and original-kernel paths are optional research and migration workstreams; they cannot delay a useful browser desktop. Any move beyond Linux-hosted execution requires a demonstrated need, an implementable capability subset, and passing shared conformance tests. Stable interfaces can minimize application changes but cannot guarantee identical backend semantics or performance.

## 5. Repository structure

The project uses a modular monorepo. The following is the **intended long-term logical layout**, not a claim that these directories or systems already exist:

```text
personal-os/
├── apps/
│   ├── web/                 # Thin browser host
│   ├── api/                 # Planned HTTP API host; absent
│   ├── desktop/
│   ├── file-manager/
│   ├── ai-assistant/
│   ├── settings/
│   └── terminal/
│
├── packages/
│   ├── desktop-shell/
│   ├── app-runtime/
│   ├── os-api/
│   ├── app-sdk/
│   ├── protocols/
│   ├── ui/
│   ├── design-system/
│   └── tsconfig/
│
├── services/
│   ├── identity/
│   ├── filesystem/
│   ├── process/
│   ├── networking/
│   ├── ai/
│   └── application/
│
├── backends/
│   ├── linux/
│   ├── virtual/
│   └── native/
│
├── kernel/
│   ├── arch/
│   ├── boot/
│   ├── memory/
│   ├── scheduler/
│   ├── ipc/
│   ├── capabilities/
│   ├── interrupts/
│   └── drivers/
│
├── platform/
│   ├── raspberry-pi/
│   ├── virtual-machines/
│   ├── bootloader/
│   └── deployment/
├── tools/
│   ├── build/
│   ├── developer/
│   └── diagnostics/
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── conformance/
│   ├── security/
│   └── system/
└── docs/
```

**Current checkout (2026-11-02):** Root workspace manifests/lockfile, README and the separate browser host and presentation package are tracked. `.devcontainer/` and `apps/api/` are absent; there is no current API starter. The [File Registry](../FILE-REGISTRY.md) is the descriptive live-file inventory; proposed layouts above are not proof of implementation.

**Historical starter layout — absent from the active checkout:** The following tree preserves an earlier reported layout, not a current or independently reverified D0 inventory. Legacy `src/shell/`, `style.css` and the shared-package placeholders are absent. The new tracked `apps/web/src/main.tsx` is a different, Current bootstrap and does not restore the legacy shell:

```text
apps/web/src/
├── shell/
│   ├── launcher/       # Shell-owned search and launch UI
│   ├── about/          # Shell-owned read-only system status UI
│   ├── components/     # Top bar, dock, widgets, window manager
│   ├── context/        # Browser desktop state and API-status hook
│   ├── registry.ts     # Temporary shell application catalog
│   └── types.ts        # Shell-local types
├── main.tsx            # Desktop composition and entry point
└── style.css
packages/
├── tsconfig/           # Shared TypeScript compiler baseline
├── ui/                 # Shared UI design tokens
├── os-api/             # Reserved @personal-os/os-api workspace
└── app-sdk/            # Reserved @personal-os/app-sdk workspace
```

**Historical report retained verbatim:** The dated paragraph below records what was reported on October 28. Its starter-presence and missing-export/browser claims no longer describe the current checkout; its earlier test results are not rerun evidence.

**Implementation snapshot update (2026-10-28):** The layout above describes an earlier starter still present in the supplied repository tree. New work is proceeding in `packages/desktop-shell/` independently of `apps/web`. The desktop-shell manifest, `src/index.ts` source exports for `DesktopShell` and public types, and standalone `DesktopShell.tsx` presentation component now exist. The owner confirmed `npm ls --depth=0` and `npm run typecheck:desktop-shell` succeed in Codespaces. There is **no package `exports` map, browser host integration, or working preview URL yet**; the new desktop cannot currently be viewed in a browser. This factual update does not change the accepted charter scope or D0 acceptance requirements.

**Document responsibilities and snapshot limits:** PWOS-001 governs project vision, scope, objectives and D0–D4 delivery requirements; the accepted governing baseline on `main` remains v0.13, while this v0.14 successor is proposed and not effective. PWOS-002 governs accepted architecture. The [File Registry](../FILE-REGISTRY.md) is the living descriptive inventory of actual repository files and status; the [Improvement Register](../IMPROVEMENTS.md) tracks current improvements, milestone progress and verification evidence. Dated implementation snapshots in this charter are historical evidence as of their stated date, not automatically maintained real-time inventories. Routine implementation progress should update the relevant living records without automatically requiring a new charter version. Material changes to approved charter requirements still require document control and explicit owner approval.

**Current implementation snapshot (2026-11-02):** Tracked `apps/web/index.html` supplies #root and loads `src/main.tsx`; that React 19 entry uses createRoot/StrictMode, imports DesktopShell from `@personal-os/desktop-shell`, handles a missing root explicitly and supplies truthful offline/no-services status. Tracked `apps/web/vite.config.ts` integrates React and derives an exact trusted Codespaces hostname from validated environment values, retaining localhost defaults and rejecting unrestricted host allowances. Shell `package.json` exports compiled `dist/index.js` and `dist/index.d.ts`; its strict package tsconfig and build/typecheck scripts exist. Build the shell before the web host consumes those exports.

IMP-002 is Verified based on prior owner-reported package/export verification and prior Codex shell typecheck/build results. IMP-001 is Verified and GP-01 Completed based on owner-reported private Codespaces rendering, refresh, truthful offline status, usable ~1280px desktop/~390px mobile layouts and a clean Incognito console. Prior Codex web builds and Host-header/portability checks are separate evidence. The original CSP warning was not reproduced in Incognito; its source is unconfirmed. This document review inspects files, declarations and Git evidence; it does not rerun those checks or establish complete D0 acceptance.

The committed root lockfile v3 records installed workspace dependencies and exact web development dependency `@playwright/test` `1.64.1`; `test:e2e` exists. IMP-017 removed dependency tracking: zero `node_modules/` entries remain tracked, while local installations are ignored. Shell/web build output and Playwright diagnostics are ignored. Chromium/OS setup and an actual headless launch are not confirmed complete; Playwright config and smoke-test source are absent. Automated smoke/accessibility tests and testing CI remain pending under IMP-007; GP-02 is In progress, acceptance pending. No private backend, persistent storage, AI, application runtime or custom kernel is connected or implemented by this preview.

Historical `shell/context/`, launcher/About, static registry and SDK placeholders belonged to the removed starter. Browser UI state never grants kernel or backend authority. `apps/file-manager/` and `apps/ai-assistant/` remain Planned standalone applications; SDK/OS API/protocol packages and application discovery/lifecycle remain Planned. The Current thin host and separate reusable presentation frame already implement the intended ownership separation; future runtime policy belongs to `packages/app-runtime/`, without claiming the removed starter's feature set has been restored. Preserve a working UI as further implementation proceeds.

### 5.1 Applications — `apps/`

- **`web/`:** Thin browser bootstrap and frontend delivery host.
- **`desktop/`:** Reserved for another host or deployment target sharing `packages/desktop-shell/`, not a duplicate implementation of the shell.
- **`file-manager/`:** Application for browsing, reading, organizing, and managing files through the authorized OS storage API.
- **`ai-assistant/`:** User interface for local AI, conversations, and explicitly permissioned tool operations.

**User applications must not import private React components, shell state, privileged filesystem paths, kernel details, or a particular execution backend.** Future Launcher and About implementations belong to the shared shell; those legacy components are not currently implemented in the package. The future SDK must formalize manifests, lifecycle, permissions and host integration rather than relying on hardcoded cross-workspace imports.

### 5.2 Shared contracts — `packages/`

- **`os-api/` (`@personal-os/os-api`):** Planned backend-neutral public interfaces for files, identity, processes, AI, applications, and system information, including errors and permission requirements.
- **`app-sdk/` (`@personal-os/app-sdk`):** Planned tools and conventions for writing in-house applications, including manifests, lifecycle events, and scoped permissions.
- **`protocols/`:** Message schemas, serialized data formats, IPC conventions, and compatibility versions.

This is the primary compatibility boundary that will let applications outlive a change in kernel or hosting model.

The shared shell and future app runtime have reusable **implementation** responsibilities, whereas OS APIs and serialized protocols have **contract** responsibilities. Only the presentation shell is currently implemented; runtime, service, backend and kernel implementations remain Planned. A future kernel written in another language need only implement the agreed protocol and service semantics; it need not execute React or TypeScript.

### 5.3 Execution backends — `backends/`

- **`linux/`:** Planned initial adapter that will connect OS APIs to Linux-hosted services on the Raspberry Pi.
- **`virtual/`:** Future gateway to services and native processes running inside an original OS virtual machine.
- **`native/`:** Future adapter for services on an original OS running directly on supported hardware.

Each backend will implement a documented subset of OS API capabilities and pass common conformance tests.

### 5.4 Original kernel — `kernel/`

- **`arch/`:** Architecture-specific startup, low-level CPU setup, exception handling, and context-switch support.
- **`memory/`:** Physical allocation, virtual memory, address spaces, and protection.
- **`scheduler/`:** Task scheduling, dispatch, and execution policies.
- **`ipc/`:** Interprocess messages, notifications, and shared-memory coordination.
- **`capabilities/`:** Resource handles, delegation, authorization, and isolation mechanisms.

The original kernel is a research and development track, not a dependency of the first web-native release. Development should begin in an AArch64 emulator before adding Raspberry Pi-specific hardware support.

### 5.5 Remaining directories

Except for Current `docs/`, these are Planned responsibilities, not existing implementation directories. Requirements, interfaces, decisions and research documentation are future additions, not current files.

- **`services/`:** Privileged user-level functionality, including storage, identity, networking, AI runtime, and application management.
- **`platform/`:** Boot integration, machine-specific configuration, OS images, and deployment support.
- **`tests/`:** Unit, integration, security, API conformance, virtual-machine, and hardware tests.
- **`docs/`:** Project charter, requirements, architecture, design decisions, interface specifications, research, and milestones.

### 5.6 Documentation organization

The Current documentation tree contains:

```text
docs/
├── README.md
├── DOCUMENTATION-GUIDE.md
├── IMPROVEMENTS.md
├── FILE-REGISTRY.md
├── DEVELOPMENT-WORKFLOW.md
├── foundation/
│   └── PWOS-001-project-charter.md
└── architecture/
    └── PWOS-002-system-architecture-foundation.md
```

`docs/requirements/`, `docs/interfaces/`, `docs/decisions/`, `docs/roadmap/` and `docs/research/` are Planned and absent. Historical drafts are not retained under `docs/archive/` in this checkout.

The [documentation index](../README.md) lists the **five governing project documents**: the repository README, documentation index, documentation guide, this charter and [PWOS-002 — System Architecture Foundation](../architecture/PWOS-002-system-architecture-foundation.md). The [documentation guide](../DOCUMENTATION-GUIDE.md) defines stable identifiers, naming rules, review statuses, and cross-reference conventions. **PWOS-001 v0.13 remains accepted on main; this v0.14 revision is proposed only. PWOS-002 v0.3 is the accepted architecture, approved 2026-11-07; its historical accepted predecessor v0.2 was approved 2026-10-27.** The [File Registry](../FILE-REGISTRY.md), [Improvement Register](../IMPROVEMENTS.md), [Development Workflow](../DEVELOPMENT-WORKFLOW.md) and [Shared Packages Guide](../../packages/README.md) are Current non-governing supplementary documents. Historical drafts and future specifications are not automatically governing documents.

## 6. Development principles

1. **Modularity:** Give each component one clear responsibility and explicit interfaces.
2. **Portability:** Keep applications independent of backend implementations where practical.
3. **Security:** Authenticate and authorize privileged operations; grant minimum necessary authority.
4. **Reliability:** Isolate failures, retain persistent data independently of software deployments, and test recovery.
5. **Extensibility:** Support in-house applications through a stable, documented SDK.
6. **Ownership:** Keep personal data and production AI inference on owner-controlled infrastructure.
7. **Evidence:** Base performance and novelty claims on experiments and measured results.
8. **Incremental delivery:** Preserve a working web-native system as lower-level research progresses.

## 7. Original software objective

Personal OS will prioritize in-house implementations of its defining desktop, applications, APIs, services, and future kernel. Existing build tools, compilers, browser engines, and unavoidable Raspberry Pi firmware may still be required. External dependencies and their roles will be documented rather than described as original software.

## 8. Use-from-day-one delivery plan

The project follows a **continuously usable prototype** strategy: every stage must leave the owner with a browser-accessible build that can be launched, tried and demonstrated. “Usable” means its promised functions work within the stated environment; it does **not** imply full OS capability or production security.

**Two milestone systems:** D0–D4 are product delivery and capability gates with acceptance requirements established by PWOS-001. GP-00–GP-05 are separate GitHub Pages/static-demo preparation, publication and verification milestones tracked by the [Improvement Register](../IMPROVEMENTS.md). Passing GP-01 or GP-02 does not complete D0. Even a successfully published public demo cannot substitute for real D0 panel interactions or `/health` and `/api/system` responses. Public deployment still requires GP-03 safety review and explicit owner publication approval; no gate is added or release approved by this distinction.

| Gate | Working experience | Minimum acceptance evidence | Explicitly not promised |
| --- | --- | --- | --- |
| **D0 — Day-one desktop** | Open the Codespaces preview URL; see a desktop; open and close app placeholder panels; inspect a system-status response | One documented launch command; working port 5173 preview; app open/close manual smoke test; `/health` and `/api/system` respond; basic build/test checks pass | Login, real files, AI, Pi hosting |
| **D1 — Useful local workspace** | Use at least one real in-house app (suggested first app: persistent notes or task list) through the desktop | Data round-trip verified in a development-only store; reload behavior documented; first narrow OS API contract and automated tests | Unreviewed access to sensitive files or production cloud |
| **D2 — Private Pi alpha** | Launch desktop over a private connection to the Pi and use owner-scoped storage | Clean Pi installation, authentication, authorization, SSD persistence, backup and restore drill, and network exposure review | Internet-facing production availability |
| **D3 — Local AI alpha** | Invoke a Pi-hosted local model from an explicitly permissioned assistant UI | Model runs offline from a documented local endpoint; measured latency and memory use; tool calls require scoped authorization | Guaranteed model quality or unconstrained agent access |
| **D4 — Stable personal service** | Routinely use the private browser OS with recovery procedures | Repeatable deployments, regression tests, monitored storage, rollback and documented recovery verified | Native custom kernel |

**The fastest value path remains D0 first.** Package configuration and thin-host integration are implemented; IMP-001/IMP-002 are Verified and the narrower GP-01 preview is Completed with attributed evidence above. D0 is **not yet formally accepted**: the Current presentation frame does not implement actual placeholder-panel open/close interactions or `/health` and `/api/system`, and no complete D0 build/test acceptance record exists. GP-01 does not waive those requirements. Current work is IMP-007 Stage A and GP-02 readiness; D1 remains the subsequent useful-application objective without compromising personal data.

A public GitHub Pages build may be added as **optional D0 demonstration evidence** after the standard Codespaces experience is verified. The published demo cannot fulfill the D0 system-status/API response criterion by substituting fabricated live data; mock status must be labeled clearly. GitHub Pages publication is neither proof of backend readiness nor permission to expose the Pi.

Do not block D1–D4 on kernel research. Keep experimental kernel work isolated from the stable web experience.

### 8.1 Starter evidence snapshot as of 2026-10-26

**Historical evidence only:** The table below is preserved as the earlier reported snapshot, not independently reverified results or a Current inventory. Its `.devcontainer`, API starter/endpoints, legacy browser shell and package placeholders are absent today; root `npm run build` and `npm test` are not current scripts. The current `main.tsx` is new bootstrap code. These historical claims do not establish live endpoint behavior or present build/test success.

| Item | Status | Evidence or limitation |
| --- | --- | --- |
| Codespaces configuration | Present | `.devcontainer/devcontainer.json` is included; a fresh Codespace has not been manually verified |
| Browser desktop shell | Implemented starter | Shell-owned registry, launcher, dock, widget panels and closeable window are composed in `apps/web/src/shell/`; interactive browser QA is pending |
| Basic API | Implemented starter | `/health` and `/api/system` return status data; private services are explicitly not configured |
| Package installation and build | Verified locally | `npm run build` completed successfully |
| Basic API test | Verified locally | `npm test` passed one initial API test |
| OS API and backend contracts | Not implemented | `packages/os-api/` and `backends/linux/` currently contain architectural placeholders |
| Real files, authentication, local AI | Not implemented | Design and security work required before connecting personal data |
| Pi 5 ARM64 deployment | Not verified | Physical hardware test and production deployment are future milestones |
| Original kernel | Research only | No custom kernel boot, scheduling, memory manager or drivers implemented |

**Immediate implementation work:** IMP-007 Stage A — confirm compatible Chromium/OS prerequisites and a headless launch, then create isolated local Playwright configuration and repeatable desktop/mobile smoke tests one file at a time. Stage B accessibility acceptance and Stage C dedicated testing CI follow. GP-02 additionally requires clean-checkout installation/build, `/personal-os/` assets, production-preview routing/refresh and passing smoke/accessibility/CI criteria. Its acceptance is pending; GP-03 safety/explicit owner approval, GP-04 deployment and GP-05 live-site verification remain pending. No public deployment is approved. Preserve the Historical table above and record new results separately. D0 panel/API requirements remain unchanged.

## 9. Deferred capabilities

Production authentication, complete file storage, backup and restore, local AI inference, remote access, original-kernel boot, native application execution, and Raspberry Pi kernel deployment require separate engineering milestones and security validation. Their inclusion in the repository layout does not imply they are implemented.

## 10. Outstanding decisions and risks

### 10.1 Project decisions and remaining details

| ID | Decision area | Remaining validation or next selection | Decision deadline |
| --- | --- | --- | --- |
| DEC-01 | First real app for D1 | Notes, tasks or another owner-priority tool; select on usefulness and minimum permission surface | Before D1 design |
| DEC-02 | Initial data model and store | Browser-local development store vs. private backend persistence; no sensitive production data before D2 controls | Before D1 implementation |
| DEC-03 | Pi 5 equipment | RAM, SSD, power, backup medium and networking; benchmark against workloads | Before D2 purchase/deploy |
| DEC-04 | Authentication and recovery | PWOS-002 selects single-owner server-managed sessions; credential choice, offline recovery and threat model remain | Before D2 storage |
| DEC-05 | AI feasibility | Model, inference engine, RAM budget and acceptable measured latency | Before D3 |
| DEC-06 | Kernel design | PWOS-002 selects Rust `no_std`, AArch64 emulator-first and capability-oriented small core; low-level algorithms and feasibility remain to be tested | Before kernel prototype |
| DEC-07 | Remote access | Private tunnel/VPN or alternative authenticated arrangement after threat review | Before any external access |
| DEC-08 | Independent app loading and isolation | PWOS-002 selects first-party registered modules and no initial untrusted support; define manifest/loader and test authority denial | Before standalone app runtime |
| DEC-09 | Distinct desktop host | PWOS-002 reserves `apps/desktop/` for native/embedded delivery; justify concrete target before activation | Before activating that workspace |
| DEC-10 | Public contract versioning and runtime portability | PWOS-002 selects schema-defined JSON/HTTPS at the browser edge; define schemas, version negotiation and backend conformance | Before public SDK stability claim |

Selections referenced from PWOS-002 are **owner-approved architectural directions, not implemented features or a substitute for security verification**. The remaining project-level items are nonblocking questions with explicit decision gates.

The project still needs numerical performance and resource budgets, Raspberry Pi 5 RAM and SSD specifications, exact OS API schemas, local AI model selection and benchmarks, identity recovery details, a secure remote access method, and validation of the selected kernel-language/privilege strategy.

The principal risks at this stage are excessive scope, local AI workloads exceeding the Pi's available memory or compute budget, loss of persistent personal data without separately tested backups, exposing privileged operations through an insufficiently secured web API, and designing interfaces that cannot be implemented consistently by future virtual or native backends.

Mitigation priorities are: a bounded first milestone, explicit capability-based interfaces, automated tests, conservative network exposure, persistent storage isolation, and measured feasibility before committing to local AI or original-kernel performance targets.

## 11. Charter governance and approval

### 11.1 Current governing set

Five documents form the governing set (PWOS-001 v0.13 remains accepted and authoritative on `main`; this proposed v0.14 revision does not replace it or add a governing document):

1. [Repository README](../../README.md) — introduction and developer quick start.
2. [Documentation Index](../README.md) — navigation and authoritative-document list.
3. [Documentation Guide](../DOCUMENTATION-GUIDE.md) — document naming, metadata and review conventions.
4. **PWOS-001 (this document)** — project vision, objectives, scope, early gates and decisions.
5. [PWOS-002 — System Architecture Foundation](../architecture/PWOS-002-system-architecture-foundation.md) — accepted detailed architectural boundaries and target ownership.

Possible future documents such as requirements specifications, subsystem architectures and milestone plans **must be introduced and approved explicitly**; their former drafts are not governing documents.

### 11.2 Approval process

1. **Prepare:** Update the charter version and `last_reviewed`; clearly identify changes and unresolved decisions.
2. **Review:** The project owner checks vision, in/out-of-scope boundaries, measurable D0–D4 gates, feasibility assumptions, risks and open decisions.
3. **Resolve:** Record revisions and answers to blocking questions. Nonblocking open questions may remain with a named decision gate.
4. **Approve:** The project owner explicitly states approval of the specified charter version; record approver and approval date in the charter. Only then change frontmatter status from `proposed` to `accepted`.
5. **Synchronize — approved procedure correction:** After explicit owner approval, update the root README and documentation index to match the accepted charter, scheduling separately authorized file steps. Manual documentation verification is the **Current temporary procedure**: validate local links and anchors, actual file paths, YAML metadata and identifiers, document classifications and review statuses, and cross-document consistency; review the complete working and staged diffs and run `git diff --check` and `git diff --cached --check` before committing. IMP-008 is the Planned mechanism for repeatable automated documentation checks. Once its checker is actually implemented and verified, incorporate it into the documented process alongside appropriate human review. No root `docs:check` script currently exists; do not present it as an available command. The project owner explicitly approved this revised §11.2 procedure with PWOS-001 v0.13 on 2026-11-02; it takes effect with integration of the approved revision into `main`.
6. **Control changes:** Material scope changes require a new version and renewed review; never imply approval from a successful automated check.

**Historical approval record — retained, applies only to v0.12:** **Approved** — PWOS-001 v0.12, by the project owner (Saul), on **2026-10-28**, following the explicit instruction to review and formally approve this charter. Approval covers the project's vision, objectives, scope, operating constraints, phased delivery strategy, governance and measurable high-level success criteria. Open decisions DEC-01–DEC-10 remain governed by their specified decision gates and do not block charter acceptance.

**Approval record:** **Approved** — PWOS-001 v0.13, by the project owner (Saul), on **2026-11-02**, following explicit approval of the revised charter including the §11.2 documentation-verification procedure correction. v0.13 is the approved successor to v0.12 and supersedes it upon integration into `main`. The original v0.12 approval and historical implementation evidence remain preserved. Approval retains the existing objectives, scope, architecture and D0–D4 requirements; it does not establish implementation acceptance, mark D0 complete, accept GP-02, authorize GP-03–GP-05 or public GitHub Pages publication, or mark IMP-015 Verified.

**Historical v0.12 review conclusion (retained):** The objectives OBJ-01–OBJ-06, initial single-owner Raspberry Pi 5 scope, web-native-first approach, D0–D4 verification gates, original-kernel research separation, and approved PWOS-002 architecture are mutually consistent. No blocking scope or ownership conflict was identified. Project feasibility and D0 completion must still be verified through their stated evidence gates.

**Pending owner approval — v0.14:** This factual-accuracy proposal has no owner acceptance or approval date. The accepted v0.13 record above remains binding on main; preparation, validation and publication of this proposal do not supersede it. Any acceptance and integration require a separate explicit owner decision after independent review. D0 and GP-02 acceptance, new implementation and public deployment remain unauthorized by this proposal; IMP-015 stays P1 / In progress.

## 12. High-level success criteria

| Horizon | Observable success criterion | Verification |
| --- | --- | --- |
| Day one | Browser desktop launches from a Codespaces URL; panels work; system API responds | D0 smoke test plus build/test results |
| First useful iteration | At least one genuine in-house app stores and retrieves non-sensitive user-created content | D1 reload/round-trip and automated API tests |
| First self-hosted alpha | Pi 5 privately serves the desktop with authenticated, recoverable owner data | D2 deployment checklist and restore drill |
| AI-enabled alpha | A locally hosted model serves the assistant without cloud inference | D3 offline operation and resource measurements |
| Long-term portability | A second backend implements a defined API capability subset without rewriting the user app | Contract tests and cross-backend demonstration |
| Kernel research | Original kernel boots in a controlled emulator and demonstrates independently verified mechanisms | Reproducible boot logs, tests and design evidence |

These criteria are **accepted project-level success targets**, not claims of completed work. Numeric budgets for performance, capacity and availability will be added once the hardware and operating assumptions are confirmed.

**Foundational principle:** Deliver a usable browser experience immediately, increase trust and utility in verified stages, and research original execution technology independently until it is ready to replace a backend safely.
