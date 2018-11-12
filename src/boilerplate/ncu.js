const ncu = require('npm-check-updates');
 
ncu.run({
    packageFile: `${__dirname}/dependencies.json`,
    upgrade: true
});