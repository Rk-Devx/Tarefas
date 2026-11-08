@echo off
cd /d %~dp0
where node >nul 2>nul || (echo Instale o Node.js LTS em https://nodejs.org e rode este arquivo de novo. & pause & exit /b)
call npm install
call npm start
