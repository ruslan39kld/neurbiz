@echo off
echo ==============================================
echo Automating Amvera Deployment Process
echo ==============================================

echo [1/5] Pulling latest from github...
git pull origin main

echo [2/5] Pushing source to Amvera...
git push amvera main:master --force

echo [3/5] Building dist...
call npm run build

echo [4/5] Committing built dist...
git add dist
git commit -m "rebuild dist"

echo [5/5] Pushing dist to Amvera...
git push amvera main:master --force

echo ==============================================
echo Deployment commands finished!
echo ==============================================
pause
