import React from 'react';
import { Card } from 'react-bootstrap';
import './Card.css';

const ReminderInfo = ({name, date}) => {

    return (
        <>
            <div class="reminder-card">
                <Card min-width='600px' className='grow' style={{ width: '18rem' }}>
                    <div class="pa2 ph3-ns pb3-ns reminder-box">
                        <div class="dt w-100 mt1">
                            <div class="dtc">
                                <h1 class="f5 f4-ns mv0">{name}</h1>
                            </div>
                        </div>
                        <div class="reminderContent">
                            <p class="f6 lh-copy measure mt2 mid-gray reminder-description">
                                {date}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

        </>
    );
}

export default ReminderInfo;