const fs = require('fs');
const chalk = require('chalk')

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find((note) => note.title === title)

  if (!duplicatedNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.bgGreen('New note added.'));
  } else {
    console.log(chalk.bgRed('Note title taken.'));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  
  const newNotes = notes.filter(note => note.title !== title);

  if(notes.length > newNotes.length) {
    console.log(chalk.bgGreen('Note removed'))
    saveNotes(newNotes)
  } else {
      console.log(chalk.bgRed('No note found!'))
  }
};

const listNotes = () => {
    const notes = loadNotes()

    if(notes.length === 0) {
        console.log(chalk.bgRed('No notes to list!'))
    } else {
        console.log(chalk.magenta.inverse('Here are your notes:'))
        notes.forEach((note) => console.log(note.title))
    }
}

const readNote = (title) => {
    const notes = loadNotes();

    const targetNote = notes.find((note) => note.title === title);

    if(targetNote) {
        return targetNote
    } else {
        console.log(chalk.red('No note found with that title.'))
    }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
};
