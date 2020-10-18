import React from 'react';
import './Scroll.css'


const Scroll = (props) => {
    return (
        <div className='cardcontainer' style={{display: 'grid', verflowY: 'scroll',  height: '800px'}}>
            {props.children}
        </div>
    );
};

export default Scroll;