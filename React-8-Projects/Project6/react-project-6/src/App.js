import React, { useEffect } from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import {nanoid} from "nanoid"


export default function App() {

 

    const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem('notes')) || [])
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )
    const currentNote = notes.find(note => note.id === currentNoteId) || notes[0]

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes))
    }, [notes])
    
    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
        
    }
    
    function updateNote(text) {
        setNotes(oldNotes => {
           const newArray = []
           for (let index = 0; index < oldNotes.length; index++) {
            const element = oldNotes[index];
            if (element.id === currentNoteId) {
                newArray.unshift({...element, body: text})
            } else newArray.push(element)
           }
           return newArray
        })
 
    }

    function deleteCurrentNote(event, noteId) {
        event.stopPropagation()
        console.log(`note to delete ${noteId}`)
        setNotes(oldNotes => oldNotes.filter((note) => note.id !== noteId))
     
    }

    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={currentNote}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteCurrentNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={currentNote} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
