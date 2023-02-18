import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const NotePage = () => {
    const { id } = useParams();
    const history = useNavigate();
    const hostName = window.location.hostname;
    const jsonURL = 'http://' + hostName + ':8000';



    //const note = notes.find(note => note.id === Number(id))
    let [note, setNote] = useState([])

    useEffect(() => {
        getNote()
    }, [id])


    async function getNote() {
        if (id === 'new') {
            addFocus()
            return
        }
        let response = await fetch(jsonURL + `/notes/${id}`);
        let data = await response.json();
        setNote(data);
    }

    let updateNote = async () => {
        await fetch(jsonURL + `/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note, 'updated': new Date() })
        });
    }

    let createNote = async () => {
        await fetch(jsonURL + `/notes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note, 'updated': new Date() })
        })
            .then(console.log("body: " + JSON.stringify({ ...note, 'updated': new Date() })))
            .then(history('/'))
    }

    let deleteNote = async () => {
        await fetch(jsonURL + `/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        });
        console.log('deleted: ' + id)
        history('/');
    }


    let handleSubmit = () => {
        let body = (note.body !== undefined) ? note.body.trim() : '';
        if (id !== "new" && !note.body) {
            deleteNote()
            console.log('Deleted\n')
        } else if (id !== "new") {
            console.log('Updated\n')
            updateNote()
        } else if (id === 'new' && body !== '') {
            console.log('Created\n')
            createNote()
        } else {
            console.log("Nothing done\n")
        }
        console.log("id: " + id + "\nbody:" + body + " \"< body")
        history('/')
    }

    let addFocus = () => {
        let myTextarea = document.querySelectorAll('textarea')[0]
        myTextarea.focus()
        myTextarea.selectionStart = myTextarea.value.length;
    }

    return (
        <div className='note' >
            <div className='note-header'>
                <h3>
                    <i className='bi bi-chevron-left' onClick={handleSubmit}></i>
                </h3>
                {id !== 'new' ? (
                    <>
                        <button onClick={handleSubmit}>Save</button>
                        <h3><i className="bi bi-trash3" onClick={deleteNote}></i></h3>
                    </>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}

            </div>

            <textarea onChange={(e) => {
                setNote({ ...note, 'body': e.target.value })
            }}
                value={note?.body} className='notePage-item'>
            </textarea>
            {id !== 'new' ? (
                <>
                    <div onClick={addFocus} className="pencil bi bi-pencil-square"></div>
                </>) : ''}
        </div >
    )
}

export default NotePage
