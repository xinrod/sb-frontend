import React from 'react';
import { useState } from 'react';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';


const Home = ({ username }) => {

    const name = username === '' ? "Please Sign In" : username;
    const [visible, setVisible] = useState(false);


    const showModal = () => {
        setVisible(true);
        console.log(username);
    }


    const handleClose = e => {
        setVisible(false);
    }
    return (
        <>
            <Button type='primary' onClick={showModal}>
                Profile
            </Button>
            <Modal
                title="Your Profile"
                visible={visible}
                onCancel={handleClose}
                onOk={handleClose}
            >
                {/* I did not change the labels/names in the html tags since there is not a CSS linked yet */}
                <div className="pa4 black-80" >
                    <div className="measure">
                        <label for="name" className="f6 b db mb2">Username<span className="normal black-60"></span></label>
                        <p className=" b--black-20 pa2 mb2 db w-100">{name}</p>
                    </div>
                    <div className="measure">
                        <label for="name" className="f6 b db mb2">School<span className="normal black-60"></span></label>
                        <p className=" b--black-20 pa2 mb2 db w-100">University of North Carolina at Chapel Hill</p>
                    </div>
                    
                </div>

            </Modal>


        </>
    );
}

export default Home;