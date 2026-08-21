# Vendor Libraries Policy

## LYGIA Shader Library (`app/assets/lygia/`)
- **Do not edit or modify files inside `app/assets/lygia/` or any `/assets/lygia/` directory.**
- Treat `lygia` as an immutable third-party vendor library.
- If function overloads, custom signatures, or workarounds are required, define them directly in the target shader (e.g., `app/assets/*.frag`) or create application-level shader helpers instead.
