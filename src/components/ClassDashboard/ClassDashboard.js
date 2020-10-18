import React, { useEffect } from 'react';
import './ClassDashboard.css';
import ReminderContainer from './ReminderContainer.js';
import {Grid, Row, Col} from "react-bootstrap";
import WritingNotes from './WritingNotes';
import CardContainer from './CardContainer';
import { useState } from 'react';
import { Modal, Button } from 'antd';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
  } from "react-router-dom";
import Note from './Note';
import Scroll from '../Home/Scroll';



const ClassDashboard = ({username, name, id, notes, addNote, data, setData, title, setTitle, submit, setSubmit}) => {

    
    const [visible, setVisible] = useState(false);
    const showModal = () => {
        setVisible(true);
    }
    const handleClose = e => {
        setVisible(false);
    }

    // const [notes, addNote] = useState([]);
    // const [data, setData] = useState();
    // const [title, setTitle] = useState('');
    // const [submit, setSubmit] = useState('');

    const [searchField, updateSearch] = useState('');


    const filteredNotes = notes.sort((note, note2) => {
        return (note2.votenum > note.votenum ? 1 : -1);
    });
    const idClass = id;
    const noteTitle = title

    useEffect(() => {
        console.log('render');
        axios(`http://localhost:8000/addNotes`, {
            method: "POST",
            data: {
                author: username,
                title: noteTitle,
                id: idClass,
                content: data,
                voteNumber: 0,
            },
        })
        .then(response => {
            if (response.data) {
                console.log(`success!, added a note.`)
            }
        });

        axios(`http://localhost:8000/getNotes?id=${idClass}`)
        .then(response => {
            if (response.data) {
                addNote(response.data);
                console.log(`success!, updated notes`)
            }
        });
    
        console.log(notes)
      }, [submit]);

    const handleSubmit = e => {
        setVisible(false);
        setSubmit('submit')

    }
    const onInputChange = e => {
        setTitle(e.target.parentElement.title.value);
    }

    const onUpvote = e => {
        const title = (e.target.getAttribute("titleforrequest"));
        const author = (e.target.getAttribute("authorforrequest"));
        const reqid = id;
        const voteNumber = (e.target.getAttribute("votenumber")) + 1;
        console.log(voteNumber);
        axios.patch(`http://localhost:8000/updateVote`, {id:reqid, title: title, author: author, voteNumber: 1})
        .then(response => {
            console.log(response)
        });
    }

    const onDownvote = e => {
        const title = (e.target.getAttribute("titleforrequest"));
        const author = (e.target.getAttribute("authorforrequest"));
        const reqid = id;
        const voteNumber = (e.target.getAttribute("votenumber")) - 1;
        console.log(voteNumber);
        axios.patch(`http://localhost:8000/updateVote`, {id:reqid, title: title, author: author, voteNumber: -1})
        .then(response => {
            console.log(response)
        });
    }

    const onDelete = e => {
        const title = (e.target.getAttribute("titleforrequest"));
        const author = (e.target.getAttribute("authorforrequest"));
        const reqid = id;
        axios.delete(`http://localhost:8000/deleteNote?id=${reqid}&title=${title}&author=${author}`)
        .then(response => {
            console.log('note deleted');
        })

    }
    // const notePages = notes.map((noteTemp, i) => {
    //     if (noteTemp === undefined) {return <></>}
    //     return (
    //       <Route path={`/${notes[i].id}/author=${notes[i].author}?title=${notes[i].title}`}>
    //         <Note   
    //             author={notes[i].author}
    //             title={notes[i].title}
    //             id={notes[i].id}
    //             content={notes[i].content}
    //         />
    //       </Route>
    //     )
    // });
    return (
        <>  
            <div>
            <h1 className="tc">{name}</h1>
            <ReminderContainer id={id}/>
            <hr className="my-4"></hr>
            </div>
             
            <div class='pa2 ph4'>
            <Button type="primary" onClick={showModal}>
                Paste/Create Your notes!
            </Button>
            <Modal
                title="Text Editor"
                visible={visible}
                onCancel={handleClose}
                onOk={handleSubmit}
                width={2000}
                bodyStyle={{height: 500}}
            >

                <Form id="notesForm" class="pa4 black-80" onOk={handleSubmit}>
                        <label for="title" class="f6 b db mb2">Note Title<span class="normal black-60"></span></label>
                        <input onChange= {onInputChange} id='title' name='title' class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="name-desc" />
                </Form>
               <CKEditor                    
                editor={ ClassicEditor }
                data="<p>Notes Here! q=D</p>"
                onInit={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    const dataTemp = editor.getData();
                    setData(dataTemp);
                    console.log( { event, editor, data } );
                } }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } } />
                
            </Modal>
            </div>

            <Scroll>
                <CardContainer onDelete={onDelete} className="center" notes={filteredNotes} onUpvote={onUpvote} onDownvote={onDownvote}/>
            </Scroll>


        </>
    );
}

export default ClassDashboard;