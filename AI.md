---
applyTo: '**'
excludeAgent: 'code-agent'
---

## Mandatory coding constraints

- Write code that is easy to read and understand; avoid “clever” tricks.
- Do not cram logic into one function. Prefer small, focused functions and clear separation of concerns.
- Prefer reuse: search and reuse existing helpers/hooks/services/components first; create new only when missing.
- Follow the existing code style and structure in this repository (naming, folder structure, patterns, formatting).
- Use descriptive variable/function names; avoid unclear abbreviations.

## TypeScript & safety

- Do not use `any`. Keep types strict.
- Always handle `null | undefined` safely (optional chaining, defaults, guards).
- Prefer explicit types for function boundaries (inputs/outputs), especially for shared utilities and services.
- If a value is unknown, use `unknown` + type guards instead of `any`.

## Dependency discipline

- Use library APIs that match the exact versions in `package.json`.
- Do not introduce new dependencies unless explicitly requested.
- If a solution depends on a newer API not available in the current version, propose an alternative compatible approach.

## Comments (Vietnamese, minimal)

- Always add short Vietnamese comments for critical decisions (WHY), but keep them minimal.
- WHAT-comments are allowed only as brief one-liners (labels), e.g. "// Map API DTO -> UI model".
- Do not write long explanatory comments or duplicate what the code already makes obvious.
- Do not restate existing comments. Avoid redundant comments.
- Treat existing comments as helpful hints only; do not rely on them if they conflict with the code.

## Response style (token-efficient)

- Respond in Vietnamese.
- Be concise. Provide only what is necessary to implement the change.
- Prefer minimal patches/snippets instead of full-file outputs.
- Only output full files when explicitly requested.
