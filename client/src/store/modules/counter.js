import { createAction, handleActions } from 'redux-actions';

// 액션 타입을 정의해줍니다.
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';

// 액션 생성 함수를 만듭니다.
export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);

// 모듈의 초기 상태를 정의합니다.
const initialState = {
  number: 0,
};

// 리듀서를 만들어서 내보내줍니다.
export default handleActions(
  {
    [INCREMENT]: ({ number }) => ({ number: number + 1 }),
    [DECREMENT]: ({ number }) => ({ number: number - 1 }),
  },
  initialState
);
