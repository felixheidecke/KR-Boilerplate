MODE 80, 30
@echo off
cls
set current_dir=%cd%

call npm i grunt grunt-curl grunt-move grunt-zip -s
RD /S /Q boilerplate
call npm run update
RD /S /Q temp
RD /S /Q node_modules
call npm install -s