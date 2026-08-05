curl -H "User-Agent: Googlebot" http://79.175.177.113:30800/next-sky/en/landing/

# Git Tags Training Guide - Complete Reference
# ============================================

# 1. VIEW CURRENT BRANCH
# ---------------------
git branch

# 2. SWITCH TO MAIN BRANCH
# ------------------------
git checkout main

# 3. GET LATEST CHANGES
# ---------------------
git pull origin main

# 4. CREATE YOUR FIRST TAG
# ------------------------
git tag -a v1.0.0 -m "Initial release - basic features"

# 5. VERIFY TAG CREATION
# ----------------------
git tag

# 6. PUSH TAG TO GITHUB
# ---------------------
git push origin v1.0.0

# 7. CREATE TAG AFTER ADDING NEW FEATURE
# --------------------------------------
git add .
git commit -m "Add new feature X"
git tag -a v1.1.0 -m "Add feature X"

# 8. VIEW ALL TAGS
# ----------------
git tag -l "v*"

# 9. PUSH NEW TAG
# ---------------
git push origin v1.1.0

# 10. SWITCH TO A SPECIFIC VERSION
# --------------------------------
git checkout v1.0.0

# 11. RETURN TO MAIN BRANCH
# -------------------------
git checkout main

# 12. COMPARE TWO VERSIONS
# ------------------------
git diff v1.0.0 v1.1.0

# 13. VIEW TAG HISTORY WITH GRAPH
# --------------------------------
git log --oneline --decorate --graph

# 14. DELETE TAG LOCALLY
# ----------------------
git tag -d v1.0.0

# 15. DELETE TAG FROM GITHUB
# --------------------------
git push origin --delete v1.0.0

# 16. CORRECT A MISTAKEN TAG
# --------------------------
# Delete locally
git tag -d v1.0.0

# Delete from GitHub
git push origin --delete v1.0.0

# Create again with correct message
git tag -a v1.0.0 -m "Correct message"

# Push corrected tag
git push origin v1.0.0

# 17. PUSH ALL TAGS AT ONCE
# -------------------------
git push --tags

# 18. VIEW TAG DETAILS
# --------------------
git show v1.0.0

# 19. CREATE LIGHTWEIGHT TAG (without message)
# --------------------------------------------
git tag v1.2.0

# 20. CHECKOUT LATEST TAG
# -----------------------
git checkout $(git describe --tags $(git rev-list --tags --max-count=1))

# ============================================
# QUICK REFERENCE TABLE
# ============================================
# Command                          | Description
# ---------------------------------|--------------------------------
# git tag                          | List all tags
# git tag -l "v*"                  | List tags matching pattern
# git tag -a v1.0.0 -m "message"   | Create annotated tag
# git tag v1.0.0                    | Create lightweight tag
# git push origin v1.0.0            | Push specific tag
# git push --tags                   | Push all tags
# git checkout v1.0.0               | Switch to tag
# git tag -d v1.0.0                 | Delete local tag
# git push origin --delete v1.0.0   | Delete remote tag
# git show v1.0.0                   | Show tag details
# git diff v1.0.0 v1.1.0            | Compare two tags
# ============================================