import React from 'react';
import './ClassDashboard.css';
import ClassCard from './ClassCard';

const CardContainer = ({ notes, onDelete, onUpvote, onDownvote}) => {
    const classComponent = notes.map((user, i) => {
        return (
            <ClassCard
                title={notes[i].title}
                author={notes[i].author}
                id={notes[i].id}
                votenumber={notes[i].votenum}
                content={notes[i].content}
                onDelete={onDelete}
                onUpvote={onUpvote}
                onDownvote={onDownvote}
            />
        )
    });
    return (
        <>
            {/* <section class="classcontainer mw10 mw7-ns pa1 ph1-ns"> */}
                {classComponent}
            {/* </section> */}
        </>
    );
}

export default CardContainer;