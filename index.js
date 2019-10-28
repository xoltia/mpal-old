#!/usr/bin/env node
const parseArgs = require('minimist');
const fs = require('fs');
const path = require('path');

const args = parseArgs(process.argv.slice(2), {
    '--': true,
    alias: {
        'h': 'help',
        'r': 'rating',
        'f': 'finished',
        'd': 'finish-date',
    }
});

if (args.help) {
    console.log([
        'Usage: mpal [action] <anime name> [options]',
        '',
        'Actions:',
        '   new    - create new entry',
        '   remove - remove existing entry',
        '   update - update existing entry',
        '   finish - mark existing entry as finished and sets finish date to current',
        '',
        'Options (for new and update actions):',
        '   --rating, -r         numerical anime rating',
        '   --finished, -f       true if provided, whether you\'ve finished the anime',
        '   --finish-date, -d    date finished, null by default',
        '',
        '   Everything after double dashes (\'--\') will be added as comments.'
    ].join('\n'));
    process.exit();
}

if (args._.length < 2) {
    console.log('Invalid usage, please check the help command.');
    process.exit();
}

const action = args._[0].toLowerCase();
const anime = args._[1];
const dataFile = path.join(__dirname, 'data.json');
if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, '{}');
}
const entries = require(dataFile);

if (action === 'new') {
    if (Object.keys(entries).map(k => k.toLowerCase()).includes(anime.toLowerCase())) {
        console.log('Anime entry already exists, use update instead.');
        process.exit();
    }

    entries[anime] = {
        rating: args['rating'] || null,
        finished: Boolean(args['finished']),
        finishDate: new Date(args['finish-date']),
        comments: args['--'],
    }
}
else if (action === 'update') {
    if (!Object.keys(entries).map(k => k.toLowerCase()).includes(anime.toLowerCase())) {
        console.log(`Anime with name '${anime}' does not exist, use new instead.`);
        process.exit();
    }

    const entryName = Object.keys(entries).find(k => k.toLowerCase() === anime.toLowerCase());
    const entry = entries[entryName];
    const newEntry = {
        rating: args['rating'] || entry['rating'],
        finished: typeof args['finished'] === 'undefined' ? entry['finished'] : Boolean(args['finished']),
        finishDate: typeof args['finish-date'] === 'undefined' ? entry['finishDate'] : new Date(args['finish-date']),
        comments: args['--'].length === 0 ? entry['comments'] : args['--'],
    }
    entries[entryName] = newEntry;
}
else if (action === 'remove') {
    const entryName = Object.keys(entries).find(k => k.toLowerCase() === anime.toLowerCase());
    delete entries[entryName];
} else if (action === 'finish') {
    if (!Object.keys(entries).map(k => k.toLowerCase()).includes(anime.toLowerCase())) {
        console.log(`Anime with name '${anime}' does not exist.`);
        process.exit();
    }
    const entryName = Object.keys(entries).find(k => k.toLowerCase() === anime.toLowerCase());
    entries[entryName].finished = true;
    entries[entryName].finishDate = new Date();
}

fs.writeFileSync(dataFile, JSON.stringify(entries, null, 4));

// TODO: action(s) for viewing entries
