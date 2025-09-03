# Pre-commit Hooks Setup
## Notes
## Setup
## Troubleshooting
## Usage
## What's Included
### Run on all files
### Run on staged files (automatic on commit)
### Run specific hook
- **End-of-file fixes**
- **Large file detection**
- **Merge conflict detection**
- **Terraform documentation** (for `.tf` files)
- **Terraform formatting** (`terraform fmt`)
- **Terraform syntax checking** (`terraform fmt -check`)
- **Terraform validation** is intentionally excluded from pre-commit hooks as it can be slow and requires backend initialization
- **Trailing whitespace removal**
- **YAML validation**
- Full Terraform validation happens in the CI/CD pipeline
- Pre-commit focuses on fast, local checks for formatting and syntax
1. Install pre-commit:
2. Install the hooks:
If hooks are too slow, you can skip them for a specific commit:
Pre-commit hooks run automatically when you commit. If any hooks fail, the commit is blocked until you fix the issues.
This project uses pre-commit hooks to ensure code quality and consistency.
To update hooks to their latest versions:
```
```
```
```
```
```
```
```
```
```
````
````bash
```bash
```bash
```bash
```bash
```bash
git commit --no-verify -m "Your commit message"
pip install pre-commit
pre-commit autoupdate
pre-commit install
pre-commit run --all-files
pre-commit run terraform_fmt --files infra/pipeline/site-infrastructure/main.tf
