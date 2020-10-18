import React from 'react';
import './ClassDashboard.css';
import ReminderInfo from './ReminderInfo';
import {Link} from 'react-router-dom';

const ReminderList = ({reminders}) => {
    const reminderComponent = reminders.map((user, i) => {
        return (
        <ReminderInfo 
            name={reminders[i].name}
            date={reminders[i].date}
        />
        )
    });
    return (
        <>
            {reminderComponent}
        </>
    );
}

export default ReminderList;