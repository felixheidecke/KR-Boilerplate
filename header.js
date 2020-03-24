// --- Writing functions -------------------------------------------------------

function compare(a, b) {
    if (a === b) {
        return 0;
    }

    var a_components = a.split(".");
    var b_components = b.split(".");
    var len = Math.min(a_components.length, b_components.length);

    // loop while the components are equal
    for (var i = 0; i < len; i++) {
        // A bigger than B
        if (parseInt(a_components[i]) > parseInt(b_components[i])) {
            return 1;
        }

        // B bigger than A
        if (parseInt(a_components[i]) < parseInt(b_components[i])) {
            return -1;
        }
    }

    // If one's a prefix of the other, the longer one is greater.
    if (a_components.length > b_components.length) {
        return 1;
    }

    if (a_components.length < b_components.length) {
        return -1;
    }

    // Otherwise they are the same.
    return 0;
}

const echo = (source, params = []) => {
    if (params.length > 0) {
        params.forEach(function (n, i) {
            source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
        });
    }

    console.log(source);
}


// --- dependencies ------------------------------------------------------------

const request = require('ajax-request');
const local   = require('./package.json');

// --- strings -----------------------------------------------------------------


const updateBox   = ` ╔════════════════════════════╗\n ║  Version {0} verfügbar!  ║\n ╚════════════════════════════╝\n`
const titleString = "  _  _______        ____        _ _                 _       _ \n | |/ /  __ \\      |  _ \\      (_) |               | |     | | \n | ' /| |__) |_____| |_) | ___  _| | ___ _ __ _ __ | | __ _| |_ ___ \n |  < |  _  /______|  _ < / _ \\| | |/ _ \\ '__| '_ \\| |/ _` | __/ _ \\ \n | . \\| | \\ \\      | |_) | (_) | | |  __/ |  | |_) | | (_| | ||  __/ \n |_|\\_\\_|  \\_\\     |____/ \\___/|_|_|\\___|_|  | .__/|_|\\__,_|\\__\\___|\n                                             | |\n                                             |_|      Version: {0}";


request({
    url: 'http://raw.githack.com/felixheidecke/KR-Boilerplate/stable_2/package.json',
    method: 'GET'
}, function(err, res, body) {

    if (err)
        return false;

    let remote     = JSON.parse(body);
    let comparison = compare(remote.version, local.version);

    echo(titleString, [local.version]);

    if (comparison > 0)
        echo(updateBox, [remote.version]);
});
