import React, { useState, useEffect } from 'react';
import DiaryEditor from './DiaryEditor';
import Diarylist from './DiaryList';
import './App.css';

const dummyList = [
  {
    id: 1,
    author: '서지안',
    content: '하이 1',
    emotion: 5,
    created_date: new Date().getTime() /** 현재 시간 */,
  },
  {
    id: 2,
    author: '홍길동',
    content: '하이 2',
    emotion: 3,
    created_date: new Date().getTime() /** 현재 시간 */,
  },
  {
    id: 3,
    author: '아무개',
    content: '하이 3',
    emotion: 1,
    created_date: new Date().getTime() /** 현재 시간 */,
  },
];

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <Diarylist diaryList={dummyList} />
    </div>
  );
}

export default App;
