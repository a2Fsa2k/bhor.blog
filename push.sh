#!/bin/bash
# Usage: ./push.sh
# Prompts for a commit message, then adds, commits, and pushes to origin main

echo -n "Enter commit message: "
read msg

git add .
git commit -m "$msg"
git push origin main
