import {createSlice} from '@reduxjs/toolkit';

const documentosSlice = createSlice({
  name: 'documentos',
  initialState: {
    documentos: [],
    filtrosSeleccionados: [],
  },
  reducers: {
    setDocumentos: (state, action) => {
      state.documentos = action.payload;
    },
    setFiltrosSeleccionados: (state, action) => {
      state.filtrosSeleccionados = action.payload;
    },
  },
});

export const {setDocumentos, setFiltrosSeleccionados} = documentosSlice.actions;

export default documentosSlice.reducer;
