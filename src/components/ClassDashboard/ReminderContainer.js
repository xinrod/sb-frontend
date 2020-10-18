import React, { useEffect } from 'react';
import './ClassDashboard.css';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'antd';
import { useState } from 'react';
import 'antd/dist/antd.css';
import Form from 'react-bootstrap/Form';
import ReminderList from './ReminderList.js';

const ReminderContainer = ({id}) => {
    const idClass = id;
    const [visible, setVisible] = useState(false);
    const [currReminder, setReminder] = useState({
        name: "",
        date: '',
        id: idClass
    });
    const [reminders, addReminder] = useState([]);

    useEffect(() => {
        console.log('render')
        console.log(idClass)
        fetch('http://localhost:8000/addreminder', {
            method: 'POST',
            body: JSON.stringify(currReminder),
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('Created Gist:', data.html_url);
        });
        fetch(`http://localhost:8000/getreminders?id=${idClass}`)
        .then(response => response.json())
        .then(data => {
            addReminder(data);
            console.log(data);
        });

    }, [currReminder]);

    const showForm = () => {
        setVisible(true);
    }

    const handleClose = e => {
        setVisible(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setVisible(false);
        console.log(e.target);
        setReminder({
            name: e.target.name.value,
            id: idClass,
            date: e.target.date.value
        });
    };

    return (
        <>
            <section className="mw5 mw7-ns center bg-light-gray pa3 ph5-ns">
                <h2>Reminders!</h2>
                <Button type='primary' onClick={showForm}>
                    Create Reminder
                </Button>
                <Modal
                    title="Create a Reminder"
                    visible={visible}
                    onCancel={handleClose}
                    okButtonProps={{ form: 'reminderForm', key: 'submit', htmlType: 'submit' }}
                >
                    <Form id="reminderForm" className="pa4 pv2 black-80" onSubmit={handleSubmit}>
                        <div className="measure">
                            <label for="name" className="f6 b db mb2">Title<span className="normal black-60"></span></label>
                            <input id='name' name='name' className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="title-desc" />
                        </div>
                        <div className="measure">
                            <label for="date" className="f6 b db mb2">Date<span className="normal black-60"></span></label>
                            <input id='date' name='date' className="input-reset ba b--black-20 pa2 mb2 db w-100" type="date" aria-describedby="desc-desc" />
                        </div>
                    </Form>
                </Modal>

                <ReminderList reminders={reminders}></ReminderList>
            </section>
        </>
    );
}

export default ReminderContainer;