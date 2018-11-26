MODE 80, 30
@echo off
DEL /Q .gitignore
DEL /Q npm-debug.log
cls
if not exist node_modules\ajax-request call npm install ajax-request
set current_dir=%cd%
:Home
cls
color 1f
echo.
call node header.js
echo.
echo  [w] --^> Watcher (Compiler)
echo.
echo  [m] --^> Build   (Einmaliges kompilieren)
echo.
echo  [b] --^> Backup
echo.
echo  [u] --^> Update
echo.
echo  [x] --^> Exit
echo.
SET /p menu=Auswahl:
if '%menu%' == 'b' goto Backup
if '%menu%' == 'm' goto Build
if '%menu%' == 'u' goto Update
if '%menu%' == 'w' goto Watch
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