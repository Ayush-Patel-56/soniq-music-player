---

## 🔁 Workflow, Commit & Contribution Rules

To keep the SONIQ codebase clean, stable, and scalable, we follow a proper workflow.  
All contributors **must follow these rules**.

---

## 📝 Commit Rules

All commits must follow a clear and consistent format.

### ✅ Commit Message Format
<type>: <short description>

### Allowed Commit Types
- `feat` – new feature
- `fix` – bug fix
- `ui` – UI/UX changes
- `refactor` – code restructuring (no feature change)
- `docs` – documentation updates
- `chore` – tooling, config, or maintenance tasks

### ✅ Good Commit Examples
feat: add waveform visualization
fix: resolve audio sync issue
ui: improve remix screen layout
docs: update contributing guidelines
refactor: optimize audio processing
chore: update dependencies  

### ❌ Bad Commit Examples
update
final changes
fixed bug
working now

---

## 🚫 Pushing Rules

- ❌ Do NOT push directly to `main`
- ❌ Do NOT push directly to `dev`
- ✅ Always push to a **feature branch**
- ✅ Push small, focused commits
- ✅ Push frequently to avoid merge conflicts

**Rule:**  
> One feature or fix = one branch

---

## 🌿 Branching Rules

We follow a simple Git flow.

### Main Branches
- `main` → stable, production-ready code
- `dev` → active development branch

### Feature Branch Naming Convention
feature/<feature-name>

### Examples
feature/player-controls
feature/remix-recording
feature/karaoke-lyrics
feature/auth-supabase


### Branching Rules
- Feature branches must be created from `dev`
- Feature branches are merged only via Pull Requests
- Delete feature branches after successful merge

---

## 🔀 Pull Request (PR) Rules

All changes must go through a Pull Request.

### PR Target Rules
- Base branch must be `dev`
- PRs must NOT target `main` directly

---

### 🧾 PR Title Format
<type>: short summary

### Examples
feat: implement remix camera recording
fix: correct waveform rendering issue
ui: enhance player hover animations


---

### 📝 PR Description Requirements
Every PR must include:
- What was changed
- Why the change was needed
- Screenshots or screen recording (for UI changes)
- Related issue reference (if applicable)

### Example
This PR implements camera recording for Remix mode.
Fixes #7


---

## 👀 Review & Merge Rules

- At least **one team member must review** the PR
- Code must be tested locally before merging
- Only maintainers can merge PRs into `dev`
- `main` is updated only after milestone completion

---

## 🚨 Hotfix Rules

For critical issues:
- Create a hotfix branch:
hotfix/<issue-name>
- Open a PR to `dev`
- Merge into `main` only after approval

---

## ✅ Summary (Golden Rules)

- No direct pushes to `main` or `dev`
- Always use feature branches
- Write clean, meaningful commits
- Use Pull Requests for all changes
- Respect reviews and team decisions

These rules help us build SONIQ as a **real-world product**, not just a project.

---
