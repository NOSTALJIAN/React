import React from 'react';

const Messages = ({ messages, currentUser }) => {
  let renderMessage = (message) => {
    const timestamp = new Date().getTime();
    const date = new Date(timestamp);
    // const year = date.getFullYear().toString().slice(-2); //년도 뒤에 두자리
    // const month = ('0' + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
    // const day = ('0' + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
    const hour = ('0' + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
    const minute = ('0' + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
    // const second = ('0' + date.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)
    // const returnDate = month + '/' + day + ' ' + hour + ':' + minute;
    const returnTime = hour + ':' + minute;

    const { sender, content, color } = message;
    const messageFromMe = currentUser.username === message.sender;
    const className = messageFromMe ? 'Messages-message currentUser' : 'Messages-message';
    return (
      <li className={className}>
        <span className="avatar" style={{ backgroundColor: color }} />
        <div className="Message-content">
          <div className="username">{sender}</div>
          <div className="text">{content}</div>
          <div className="time">{returnTime}</div>
        </div>
      </li>
    );
  };

  return <ul className="messages-list">{messages.map((msg) => renderMessage(msg))}</ul>;
};

export default Messages;
