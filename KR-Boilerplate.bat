MODE 80, 30
@echo off
DEL /Q .gitignore
DEL /Q npm-debug.log
cls
if not exists node_modules\ajax-request call npm install ajax-request
set current_dir=%cd%
:Home
cls
color 1f
echo.
call node header.js
echo.
echo  [s] --^> Setup
echo.
echo  [w] --^> Watcher (Compiler)
echo.
echo  [m] --^> Build   (Einmaliges compilen)
echo.
echo  [b] --^> Backup
echo.
echo  [u] --^> Update
echo.
echo  [x] --^> Exit
echo.
SET /p menu=Auswahl:
if '%menu%' == 's' goto Setup
if '%menu%' == 'w' goto Watch
if '%menu%' == 'm' goto Build
if '%menu%' == 'b' goto Backup
if '%menu%' == 'u' goto Update
if '%menu%' == 'x' goto Exit
Goto Home

:Setup
cls
color 07
echo.
echo  * * * * *
echo  * SETUP *
echo  * * * * *
echo.
call npm install
call npm run setup
cls
echo.
color 0A
echo Setup wurde beendet.
pause
goto Home

:Watch
cls
color 07
echo.
echo  * * * * * *
echo  * WATCHER *
echo  * * * * * *
echo.
call npm run watcher
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

:Backup
cls
color 07
echo.
echo  * * * * * *
echo  * BACKUP  *
echo  * * * * * *
echo.
call npm run backup
pause
goto Home

:Update
cls
color 07
echo.
echo  * * * * * *
echo  * UPDATE  *
echo  * * * * * *
echo.
call npm run update
call npm install
call npm run setup
cls
echo.
color 0A
echo Update wurde beendet.
pause
goto Home

:Exit
echo.
echo Boilerplate wurde beendet.