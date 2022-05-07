import './App.css';
import React from 'react';
import { ChatContainer } from './components/chat/ChatContainer';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';

import { auth } from './api/service';

function App() {

  const [loggedInUser, setLoggedInUser] = React.useState(null);

  React.useEffect(() => {
    auth.checkLoggedIn()
      .then(response => setLoggedInUser(response.data))
      .catch(err => console.log(err.response.data))
  }, []);

  return (
    <div className="App">
      {
        loggedInUser ?
          <div>
            <ChatContainer loggedInUser={loggedInUser} />
          </div>
          :
          <div>
            <Signup setLoggedInUser={setLoggedInUser} />
            <Login setLoggedInUser={setLoggedInUser} />
          </div>
      }
    </div>
  );
}

export default App;
