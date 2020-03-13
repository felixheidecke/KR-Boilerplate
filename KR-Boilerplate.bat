MODE 80, 30
@echo off
DEL /Q npm-debug.log
cls
set current_dir=%cd%
IF NOT EXIST node_modules GOTO Install
:Home
cls
color 2E
echo.
call node header.js
echo.
echo  [w] --^> Watcher (Compiler)
echo.
echo  [m] --^> Build   (Einmaliges kompilieren)
echo.
echo  [u] --^> Update
echo.
echo  [r] --^> Repair  (Reparieren)
echo.
echo  [x] --^> Exit
echo.
SET /p menu=Auswahl:
if '%menu%' == 'm' goto Build
if '%menu%' == 'w' goto Watch
if '%menu%' == 'u' goto Update
if '%menu%' == 'r' goto Repair
if '%menu%' == 'x' goto Exit
Goto Home

:Watch
cls
color 07
echo.
echo  * * * * * *
echo  * WATCHER *
echo  * * * * * *
echo.
call npm run watch
pause
goto Home

:Build
cls
color 07
echo.
echo  * * * * *
echo  * BUILD *
echo  * * * * *
echo.
call npm run build
pause
goto Home

:Repair
cls
color 07
echo.
echo  * * * * * *
echo  * REPAIR  *
echo  * * * * * *
echo.
RD /S /Q node_modules
call npm install -s
goto Home

:Update
cls
color 07
echo.
echo  * * * * * *
echo  * UPDATE  *
echo  * * * * * *
echo.
call npm i grunt grunt-contrib-clean grunt-curl grunt-move grunt-zip -s
RD /S /Q boilerplate
call npm run update
RD /S /Q temp
RD /S /Q node_modules
cls
echo.
color 0A
echo Update wurde beendet.
pause
goto Exit

:Install
call npm install -s
call npm install ajax-request -s
goto Home

:Exit
echo.
echo Boilerplate wurde beendet.
