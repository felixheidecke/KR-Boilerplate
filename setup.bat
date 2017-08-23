@echo off
DEL /Q .gitignore
cls
echo * * * * * * * * * * * * * * * * *
echo * KR-Boilerplate konfigurieren! *
echo * * * * * * * * * * * * * * * * *
echo.
pause
call npm install
call npm run init