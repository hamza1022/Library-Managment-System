import React, { useEffect, useState } from 'react';
import { BackendApi } from '../../api';
import { useSelector } from 'react-redux';
import io from "socket.io-client"

const Chats = () => {
  const socket = io("http://localhost:8080");

  socket.on("Server",(data)=>{
    console.log(data);
  })

  const loggedInUser = useSelector((state) => state.user.value);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const fetchUsers = async () => {
    BackendApi.user
      .getAllUsers({ role: 'user' })
      .then((users) => {
        console.log(users);
        setUsers(users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUserClick = (user) => {
    console.log("click", user);
    setSelectedUser(user);
     console.log("Selected user:", JSON.stringify(user));
    
    BackendApi.chat.viewMsg(user)
      .then((messages) => {
        console.log(messages);
        setMessages(messages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSendMessage = (messageText) => {
    // Send the message to the server
    BackendApi.chat
      .sendMsg(selectedUser.id,loggedInUser._id, messageText)
      .then((message) => {
        console.log(message);
        setMessages([...messages, message]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          width: '200px',
          backgroundColor: '#f2f2f2',
          padding: '20px',
        }}
      >
        <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
          {users.map((user) => {
            return (
              <li key={user._id} onClick={() => handleUserClick(user)} style={{cursor:"pointer"}}>
                {user.name}
              </li>
            );
          })}
        </ul>
      </div>
      {selectedUser && (
        <div style={{ flex: 1, padding: '20px' }}>
          <h3>Chatting with {selectedUser.name}</h3>
          <div
            style={{
              height: '400px',
              backgroundColor: '#fff',
              overflowY: 'scroll',
            }}
          >
            {messages && messages.map((message) => (
              <div
                key={message._id}
                style={{
                  backgroundColor:
                    message.senderId === selectedUser.id ? '#eee' : '#fff',
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '10px',
                }}
              >
                {message.msg}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', marginTop: '20px' }}>
            <input
              type="text"
              placeholder="Type your message here"
              style={{ flex: 1, marginRight: '10px' }}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage(e.target.value);
                  e.target.value = '';
                }
              }}
            />
            <button
              onClick={() => {
                const input = document.querySelector('input[type="text"]');
                handleSendMessage(input.value);
                input.value = '';
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chats;
