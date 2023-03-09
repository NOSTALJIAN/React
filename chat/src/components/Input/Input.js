import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Input = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  let onChange = (e) => {
    setText(e.target.value);
  };

  let onSubmit = () => {
    setText('');
    onSendMessage(text);
  };

  return (
    <div className="message-input">
      <TextField
        className="inputField"
        label="메세지를 입력하세요..."
        // placeholder="Enter your message and press ENTER"
        onChange={(e) => onChange(e)}
        margin="normal"
        value={text}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            onSubmit(text);
          }
        }}
        style={{ height: '30px', width: '80%' }}
      />

      <Button variant="contained" color="primary" onClick={onSubmit}>
        전송
      </Button>
    </div>
  );
};

export default Input;
