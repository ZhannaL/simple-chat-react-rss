import { useDispatch } from 'react-redux';

export const UPDATE_USER = 'UPDATE_USER';

export const useUpdateUser = () => {
  const dispatch = useDispatch();
  return (name: string) => {
    localStorage.setItem('user', JSON.stringify({ name }));

    dispatch({
      type: UPDATE_USER,
      payload: { name },
    });
  };
};
