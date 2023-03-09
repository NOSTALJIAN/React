import React, { useRef, useEffect, useMemo, useCallback, useReducer } from 'react';
// React는 이름을 바꿔서 사용 가능, { ... }는 불가
import './App.css';
import DiaryEditor from './DiaryEditor';
import Diarylist from './DiaryList';

//  https://jsonplaceholder.typicode.com/comments

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case 'REMOVE': {
      return state.filter((it) => it.id !== action.targetId);
    }
    case 'EDIT': {
      return state.map((it) => (it.id === action.targetId ? { ...it, content: action.newContent } : it));
    }
    default:
      return state;
  }
};

export const DiaryStateContext = React.createContext(); //  부가적으로 내보내기(export)

export const DiaryDispatchContext = React.createContext(); // dispatch 함수 내보내기 위해

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dateId = useRef(0);

  const getData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dateId.current++,
      };
    });
    dispatch({ type: 'INIT', data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({ type: 'CREATE', data: { author, content, emotion, id: dateId.current } });
    dateId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: 'REMOVE', targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: 'EDIT', targetId, newContent });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  });

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    //  데이터 공급 provider value
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          {/** App 컴포넌트에 onCreate 함수를 생성, 호출해서 업데이트 */}
          <DiaryEditor />
          <div>전체 일기 : {data.length} 개</div>
          <div>기분 좋은 일기 개수 : {goodCount} 개</div>
          <div>기분 나쁜 일기 개수 : {badCount} 개</div>
          <div>기분 좋은 일기 비율 : {goodRatio}%</div>
          {/** App 컴포넌트가 가진 data state가 바뀌면 diaryList도 리랜더 */}
          <Diarylist />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
