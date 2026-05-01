# Create PR Command

Prepare a pull request with proper description and checklist.

## Steps

### 1. Check Status
```bash
git status
git diff --stat
```

### 2. Generate PR Description
Based on the changed files, generate:

```markdown
## Description
<!-- Brief summary of what this PR does -->

## Changes
<!-- List of changes by area -->
### Backend
- 

### Frontend
- 

## Testing
- [ ] Backend: `pytest` passes on affected services
- [ ] Frontend: `npm run lint` passes
- [ ] Frontend: `npm run build` succeeds
- [ ] Manual testing completed

## Checklist
- [ ] Multi-tenancy fields (society_id, institution_id) included on new models
- [ ] API endpoints have proper authentication (IsAuthenticated)
- [ ] No hardcoded secrets or API URLs
- [ ] Soft delete pattern used (is_active, not .delete())
- [ ] RTK Query used for API calls (no raw fetch/axios)
- [ ] Gateway route added for new endpoints (if applicable)
- [ ] Database migrations generated and reviewed
```

### 3. Review Before Submitting
Use the **Code Reviewer** agent to do a final review of all changes before creating the PR.

### 4. Create Branch & Commit
```bash
git checkout -b feature/<branch-name>
git add .
git commit -m "feat: <description>"
git push origin feature/<branch-name>
```
