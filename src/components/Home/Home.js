import React from 'react';
import './Home.css';
import CardContainer from './CardContainer';
import { useState } from 'react';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import Form from 'react-bootstrap/Form';
import SearchBar from './SearchBar';
import Scroll from './Scroll';


const Home = ({currClass, setClass, classes, addClass}) => {
    const [visible, setVisible] = useState(false);
    // const [currClass, setClass] = useState({
    //     name: '',
    //     id: '',
    //     description: '',
    // });
    // const [classes, addClass] = useState([]);
    const [searchField, updateSearch] = useState('');

    // useEffect(() => {
    //     console.log('render');
    //     console.log(JSON.stringify(currClass))
    //     fetch('http://localhost:8000/', {
    //         method: 'POST',
    //         body: JSON.stringify(currClass),
    //         headers: {
    //         'Content-Type': "application/json", 
    //         'Access-Control-Allow-Origin': 'http://localhost:3000'
    //         },
    //     }).then(function (response) {
    //         return response.json();
    //     }).then(function (data) {
    //         console.log('Created Gist:', data.html_url);
    //     });

    //     fetch('http://localhost:8000/')
    //     .then(response => response.json())
    //     .then(data => {
    //         addClass(data);
    //         console.log(data);
    //     });

    //     console.log(classes)
    // }, [currClass]);

    // useEffect(() => {
    //     setClass({
    //         name: '',
    //         id: '',
    //         description:'',
    //     })
    // },[classes]);

    const showModal = () => {
        setVisible(true);
    }

    const onDelete = (e) => {
        const n = (e.target.getAttribute('forDeleteName'));
        const i = (e.target.getAttribute('forDeleteID'));

        console.log(JSON.stringify({
            name : n,
            id : i,
            description: ""
        }))
        fetch('http://localhost:8000/', {
            method: 'DELETE',
            body: JSON.stringify({
                name : n,
                id : i,
                description: ""
            }),
            headers: {
            'Content-Type': "application/json", 
            'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setVisible(false);
        console.log(e.target);
        setClass({
            name: e.target.name.value,
            id: e.target.id.value,
            description: e.target.description.value
        });

    };

    const handleClose = e => {
        setVisible(false);
    }

    const handleSearch = e => {
        updateSearch(e.target.value);
    }
    const filteredClasses = classes.filter(classC => {
        return classC.name.toLowerCase().includes(searchField.toLowerCase());
    });
    return (
        <>
        
            <h1 className='ml4'>Your Classes</h1>
            <Button type='primary' className='ml4' onClick={showModal}>
                Create Class
            </Button>
            <Modal
                title="Create a Class"
                visible={visible}
                onCancel={handleClose}
                okButtonProps={{ form: 'classForm', key: 'submit', htmlType: 'submit' }}
            >
                <Form id="classForm" className="pa4 black-80" onSubmit={handleSubmit}>
                    <div className="measure">
                        <label for="name" className="f6 b db mb2">Name<span className="normal black-60"></span></label>
                        <input id='name' name='name' className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="name-desc" />
                    </div>
                    <div className="measure">
                        <label for="classid" className="f6 b db mb2">Class ID<span className="normal black-60"></span></label>
                        <input id="classid" name='id' className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="classid" />
                    </div>
                    <div className="measure">
                        <label for="description" className="f6 b db mb2">Description<span className="normal black-60"></span></label>
                        <textarea id="description" name='description' className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="classid" />
                    </div>
                </Form>


            </Modal>
            <br></br> 
            <div class="flex flex-wrap">
                <SearchBar handleSearch={handleSearch} className='ml4'/>
            </div>
            <Scroll>
                <CardContainer onDelete={onDelete} className="center" classes={filteredClasses}/>
            </Scroll>
        </>
    );
}

export default Home;