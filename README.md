# Resume Builder

A local-first resume and cover letter builder with live PDF preview. Data is saved automatically to your browser's localStorage.

## Features

- **Two workspaces** — **Resume**: live preview and editor side by side; **Cover Letter**: letter form and preview side by side. Personal contact info is shared automatically.
- **Classic theme** — Single-column, ATS-friendly layout (experience-first DOM order). Default theme.
- **Modern Split theme** — Two-column visual layout for human readers.
- **Cover letter** — Edit and export alongside your resume.
- **JSON import/export** — Back up or migrate your resume data.
- **Section visibility** — Hide sections on the PDF without deleting data (useful for one-page resumes).
- **Pre-export validation** — Warns about missing fields before PDF download.

## Commands

```bash
pnpm install
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm lint       # ESLint
pnpm test       # Run tests
```

## Themes

| Theme | Best for |
|-------|----------|
| **Classic** | ATS systems, corporate applications, keyword parsing |
| **Modern Split** | Startups, design-forward roles, visual impact |

## JSON format

Use **Import JSON** in the editor to load a resume. Download the template from the import dialog for the full schema including `schemaVersion`, `theme`, `sectionVisibility`, and all section data.

## Section visibility

In the editor, open **Section Visibility** to toggle which sections appear on the exported PDF. Data is preserved in the editor when hidden.

## PII fields

Date of birth, nationality, and gender are optional and shown with a warning. They are not recommended for US/UK applications.

## Tech stack

React, TypeScript, Vite, Tailwind CSS, react-to-print
