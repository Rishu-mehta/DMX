# Fix Tests Command

Diagnose and fix failing tests in the AICAS ERP platform.

## Steps

### 1. Identify Failures
```bash
# Backend — run tests for the affected service
cd Aicas_be/ERP_be_<service>
pytest -v --tb=long

# Or via Docker
docker compose exec <container> pytest -v --tb=long
```

### 2. Analyze Failures
- Read the full traceback
- Check if it's a test issue or a code issue
- Common causes:
  - Missing `@pytest.mark.django_db` decorator
  - Missing fixtures (user, api_client)
  - Multi-tenant filtering not matching test data (society_id/institution_id mismatch)
  - Database state from other tests (use `@pytest.fixture` with proper scope)
  - Missing migrations (run `python manage.py migrate`)
  - Import errors from changed module paths

### 3. Fix
- Fix the root cause in the source code or test code
- Re-run just the failing test: `pytest path/to/test.py::TestClass::test_method -v`

### 4. Verify
- Run the full test suite for the service: `pytest -v`
- Ensure no regressions: `pytest --tb=short`

### 5. Review
Use the **Code Reviewer** agent on the changes if the fix was in source code (not just tests).
