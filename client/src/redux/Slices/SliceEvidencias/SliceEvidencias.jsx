import { createSlice } from '@reduxjs/toolkit';

const evidenciasSlice = createSlice({
    name: 'evidencias',
    initialState: {
        evidencias: [],
    },
    reducers: {
        setEvidencias: (state, action) => {
            state.evidencias = action.payload;
        },
    },
});

export const { setEvidencias } = evidenciasSlice.actions;

export default evidenciasSlice.reducer;