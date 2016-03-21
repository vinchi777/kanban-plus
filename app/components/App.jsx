import React from 'react';
import Note from './Note.jsx';
import Notes from './Notes.jsx';

import NoteActions from '../actions/NoteActions'
import NoteStore from '../stores/NoteStore'

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = NoteStore.getState()
    
  }

  render() {
    const notes = this.state.notes;
    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        <Notes notes={notes} onEdit={this.editNote} onDelete={this.deleteNote}/>
      </div>
    )
  }

  addNote = () => {
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: "New Task"
      }])
    })
  }

  editNote = (id, task) => {
    if (!task.trim()) {
      return;
    }

    const notes = this.state.notes.map(note => {
      if(note.id == id && task) {
        note.task = task;
      }
      return note;
    })

    this.setState({notes});
  }

  deleteNote = (id, e) => {
    e.stopPropagation();
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    })
  }
}
