@echo off
cd /d "%~dp0"
node "node_modules\typescript\bin\tsc" -b
if errorlevel 1 exit /b %errorlevel%
node "node_modules\vite\bin\vite.js" build %*
