@echo off
cls
echo * * * * * * * * * * * * * * * * * *
echo * Projektordner jetzt aufraeumen! *
echo * * * * * * * * * * * * * * * * * *
echo.
pause
RD /S /Q node_modules vendor
DEL npm-debug.log