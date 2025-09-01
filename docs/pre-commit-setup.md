# Pre-commit Hooks Setup

This project uses pre-commit hooks to ensure code quality and consistency.

## What's Included

- **Trailing whitespace removal**
- **End-of-file fixes**
- **YAML validation**
- **Large file detection**
- **Merge conflict detection**
- **Terraform formatting** (`terraform fmt`)
- **Terraform syntax checking** (`terraform fmt -check`)
- **Terraform documentation** (for `.tf` files)

## Setup

1. Install pre-commit:

   ```bash
   pip install pre-commit
   ```

2. Install the hooks:

   ```bash
   pre-commit install
   ```

## Usage

### Run on all files

```bash
pre-commit run --all-files
```

### Run specific hook

```bash
pre-commit run terraform_fmt --files infra/pipeline/site-infrastructure/main.tf
```

### Run on staged files (automatic on commit)

Pre-commit hooks run automatically when you commit. If any hooks fail, the commit is blocked until you fix the issues.

## Notes

- **Terraform validation** is intentionally excluded from pre-commit hooks as it can be slow and requires backend initialization
- Full Terraform validation happens in the CI/CD pipeline
- Pre-commit focuses on fast, local checks for formatting and syntax

## Troubleshooting

If hooks are too slow, you can skip them for a specific commit:

```bash
git commit --no-verify -m "Your commit message"
```

To update hooks to their latest versions:

```bash
pre-commit autoupdate
```
