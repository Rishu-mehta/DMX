# Review Command

Perform a thorough code review of recent changes.

## Steps

### 1. Identify Changed Files
```bash
git diff --name-only HEAD~1
# or for staged changes
git diff --name-only --cached
```

### 2. Delegate to Code Reviewer
Use the **Code Reviewer** agent to review all changed files. The agent will:
- Read each changed file
- Check against frontend and backend conventions
- Check for security issues
- Output a structured review table with severity levels

### 3. Review Focus Areas
- **Security:** Auth checks, input validation, no hardcoded secrets, SQL injection prevention
- **Multi-tenancy:** All queries filter by society_id + institution_id
- **Conventions:** Naming, patterns, proper DRF/RTK Query usage
- **Performance:** N+1 queries, missing indexes, unnecessary re-renders
- **Error handling:** Proper status codes, user-facing error messages

### 4. Output
The review will be formatted as a markdown table:

| File | Severity | Issue | Line(s) | Suggestion |
|------|----------|-------|---------|------------|
| ... | 🔴/🟡/🟢 | ... | ... | ... |

Verdict: ✅ Approve / ⚠️ Approve with suggestions / ❌ Request changes
