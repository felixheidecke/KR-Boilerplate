@echo off
delete .gitignore
cls
echo * * * * * * * * * * * * * *
echo * KR-Boilerplate starten! *
echo * * * * * * * * * * * * * *
echo.
pause
call npm install
call npm run dev