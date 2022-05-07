import axios from 'axios';

const getPreviousMessages = () => axios.get(`/chat`);

const sendMessage = (user, newMessage) => axios.post('/chat/new-message', { sendBy: user, newMessage })

const checkLoggedIn = () => axios.get('/auth/loggedin');

const signup = (username, password) => axios.post(`/auth/signup`, { username, password });

const login = (username, password) => axios.post(`/auth/login`, { username, password });


export const chat = {
    getPreviousMessages,
    sendMessage
}

export const auth = {
    checkLoggedIn,
    signup,
    login
}