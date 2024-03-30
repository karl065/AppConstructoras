import {createSlice} from '@reduxjs/toolkit';

const notificacionesSlice = createSlice({
  name: 'notificaciones',
  initialState: {
    notificaciones: [],
  },
  reducers: {
    setNotificaciones: (state, action) => {
      state.notificaciones = action.payload;
    },
  },
});

export const {setNotificaciones} = notificacionesSlice.actions;

export default notificacionesSlice.reducer;
