import { createSlice } from '@reduxjs/toolkit';

const tareasSlice = createSlice({
  name: 'tareas',
  initialState: {
    tareas: [],
    filtrosSeleccionados: [],
  },
  reducers: {
    setTareas: (state, action) => {
      state.tareas = action.payload;
    },
    setFiltrosSeleccionados: (state, action) => {
      state.filtrosSeleccionados = action.payload;
    },
  },
});

export const { setTareas, setFiltrosSeleccionados } = tareasSlice.actions;

export default tareasSlice.reducer;
