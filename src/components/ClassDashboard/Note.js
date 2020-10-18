import React from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'antd';
import 'tachyons';
const Note = ({ author, title, id, content }) => {

    return (        
        <>  
         <Link to={`/${id}`} className='nostyle' style={{color: 'inherit'}}>
             <section class="ml5">
                <Button type="primary">Back to {id}</Button>
             </section>
             <div><p></p></div>
         </Link>
            <div class="mr5 ml5">
                <td dangerouslySetInnerHTML={{__html: content}} />
            </div>
        </>
    );
}

export default Note;