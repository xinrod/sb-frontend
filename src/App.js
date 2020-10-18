import React, { useState, useEffect } from 'react';

import './App.css';
import Home from './components/Home/Home';
import ClassDashboard from './components/ClassDashboard/ClassDashboard'
import 'tachyons';

import Profile from './components/Home/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './components/SignIn/SignIn';
import WritingNotes from './components/ClassDashboard/WritingNotes'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Note from './components/ClassDashboard/Note';

export default function App() {

  const [notes, addNote] = useState([]);
  const [data, setData] = useState();
  const [title, setTitle] = useState('');
  const [submit, setSubmit] = useState('');

  const [userName, setUsername] = useState('');
  const [currClass, setClass] = useState({
    name: '',
    id: '',
    description: '',
  });
  const [classes, addClass] = useState([]);

  useEffect(() => {
    console.log('render');
    console.log(JSON.stringify(currClass))
    fetch('http://localhost:8000/', {
      method: 'POST',
      body: JSON.stringify(currClass),
      headers: {
        'Content-Type': "application/json",
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      },
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log('Created Gist:', data.html_url);
    });

    fetch('http://localhost:8000/')
      .then(response => response.json())
      .then(data => {
        addClass(data);
        console.log(data);
      });

    console.log(classes)
  }, [currClass]);

  // useEffect(() => {
  //     setClass({
  //         name: '',
  //         id: '',
  //         description:'',
  //     })
  // },[classes]);

  const handleSubmit = (e) => {
    setUsername(e.target.username.value);
    // history.push("/");
  };

  const classPages = classes.map((classTemp, i) => {
    if (classTemp === undefined) {return <></>}
    return (
      <Route path={`/${classes[i].id}`}>
        <ClassDashboard
            username={userName}
            name={classes[i].name}
            id={classes[i].id}
            notes={notes}
            addNote={addNote}
            data={data}
            setData={setData}
            title={title}
            setTitle={setTitle}
            submit={submit}
            setSubmit={setSubmit}
        />
      </Route>
    )
});
const notePages = notes.map((noteTemp, i) => {
  if (noteTemp === undefined) {return <></>}
  return (
    <Route path={`/author=${notes[i].author}/title=${notes[i].title}`}>
      <Note
          author={notes[i].author}
          title={notes[i].title}
          id={notes[i].id}
          content={notes[i].content}
      />
    </Route>
  )
});

  return (
    <Router>
      <nav className="dt w-100 border-box pa3 ph5-ns">
        <Link to='/' className="grow link dim black f1 f4-ns dib mr3 mr4-ns" title="Home">
          Buddy Study
                </Link>
        <Link to='/' className="grow link dim dark-gray f6 f5-ns dib mr3 mr4-ns" title="Home">
          Home
                </Link>
        <Profile username={userName} className="link dim dark-gray f6 f5-ns dib" />
        {userName === '' ?
          <div className="grow dtc v-mid w-75 tr">
            <Link to='/signin' className="link dim dark-gray f6 f5-ns dib" href="#" title="signout">Sign In</Link>
          </div>
          :
          <div className="grow dtc v-mid w-75 tr">
            <Link to='/signin' className="link dim dark-gray f6 f5-ns dib" href="#" title="signout">Sign Out</Link>
          </div>
        }
      </nav>
      <Switch>
        <Route exact path="/">
          <Home currClass={currClass} setClass={setClass} classes={classes} addClass={addClass}/>
        </Route>
        <Route path="/signin">
          <SignIn handleSubmit={handleSubmit} />
        </Route>
        {classPages}
        {notePages}
        <Route path="/ClassDashboard">
          <ClassDashboard username={userName}/>
        </Route>
        <Route path="/WritingNotes">
          <WritingNotes/>
        </Route>
      </Switch>
    </Router>
  );
}


function Signin() {
  return <h2>signin</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

