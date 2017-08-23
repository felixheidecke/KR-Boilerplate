@echo off
DEL /Q .gitignore
cls
echo * * * * * * * * * * * * * * * * *
echo * KR-Boilerplate konfigurieren! *
echo * * * * * * * * * * * * * * * * *
echo.
echo Wurde die grunt.js entsprechend dem Projekt angepasst? (j/n)
SET /p wahl=
if '%wahl%' == 'n' goto Nein
if '%wahl%' == 'j' goto Ja
Goto Ende
:Nein
goto Ende
:Ja
call npm install
call npm run init
:Ende
echo.
echo Setup Prozess wurde beendet.
echo.
pause