const notes = require('./notes.js');
const chalk = require('chalk');
const yargs = require('yargs');

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body)
  }
})

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.removeNote(argv.title)
  }
})

// Create read command

yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    const note = notes.readNote(argv.title)
    if (note === undefined) {
      return
    }
    console.log(chalk.blue.inverse(note.title), note.body)
  }
})

// List notes command

yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler() {
    notes.listNotes()
  }
})

// add, remove, read, list

yargs.parse();