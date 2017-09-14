@echo off
DEL /Q .gitignore
:Home
cls
color 1f
echo.
echo     _  _______        ____        _ _                 _       _
echo    ^| ^|/ /  __ \      ^|  _ \      (_) ^|               ^| ^|     ^| ^|
echo    ^| ' /^| ^|__) ^|_____^| ^|_) ^| ___  _^| ^| ___ _ __ _ __ ^| ^| __ _^| ^|_ ___
echo    ^|  ^< ^|  _  /______^|  _ ^< / _ \^| ^| ^|/ _ \ '__^| '_ \^| ^|/ _` ^| __/ _ \
echo    ^| . \^| ^| ^\ \      ^| ^|_) ^| (_) ^| ^| ^|  __/ ^|  ^| ^|_) ^| ^| (_^| ^| ^|^|  __/
echo    ^|_^|\_\_^|  \_\     ^|____/ \___/^|_^|_^|\___^|_^|  ^| .__/^|_^|\__,_^|\__\___^|
echo                                                ^| ^|
echo                                                ^|_^|
echo.
echo    Bitte vor dem Projektstart ueberpruefen, ob die gruntfile.js entsprechend
echo    den Projektvoraussetzungen angepasst wurde.
echo.
echo  [s] --^> Setup
echo.
echo  [w] --^> Watcher (Compiler)
echo.
echo  [m] --^> Build   (Einmaliges compilen)
echo.
echo  [b] --^> Backup  (Noch nicht implementiert)
echo.
echo  [x] --^> Exit
echo.
SET /p menu=Auswahl:
if '%menu%' == 's' goto Setup
if '%menu%' == 'w' goto Watch
if '%menu%' == 'm' goto Build
::if '%menu%' == 'b' goto Backup
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

:Ende
echo.
echo Boilerplate wurde beendet.