import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import AddEmployee from './types/AddEmployee';
import Edication from './types/Edication';
import OneCard from './types/OneCard';
import State from './types/State';

const initialState: State = {
  employeeList: [],
  edicationList: [],
  error: undefined,
};

export const loadEmployeeMain = createAsyncThunk('employee/loadEmployee', () =>
  api.loadEmployee(),
);
export const loadEdicationMain = createAsyncThunk(
  'edication/loadEdication',
  () => api.loadEdication(),
);

export const createEdicationMain = createAsyncThunk(
  'edication/createEdication',
  (content: string) => {
    const data = api.createEdication(content);
    return data;
  },
);

export const createEmployeeMain = createAsyncThunk(
  'employee/createEmployee',
  (AddCard: AddEmployee) => {
    const data = api.createEmployee(AddCard);
    return data;
  },
);

export const changeEdicationMain = createAsyncThunk(
  'edication/changeEdication',
  (card: Edication) => {
    api.updateEdication(card);
    return card;
  },
);

export const changeEmployeeMain = createAsyncThunk(
  'employee/changeEmployee',
  (card: OneCard) => {
    api.updateEmployee(card);
    return card;
  },
);

export const removeEmployeeMain = createAsyncThunk(
  'employee/removeEmployee',
  (id: number) => {
    api.removeEmployee(id);
    return { id };
  },
);

export const removeEdicationMain = createAsyncThunk(
  'edication/removeEdication',
  (id: number) => {
    return api.removeEdication(id);
  },
);

const mainSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (element) => {
    element
      .addCase(loadEmployeeMain.fulfilled, (state, action) => {
        state.employeeList = action.payload;
      })
      .addCase(loadEdicationMain.fulfilled, (state, action) => {
        state.edicationList = action.payload;
      })
      .addCase(createEmployeeMain.fulfilled, (state, action) => {
        state.employeeList.push(action.payload);
      })
      .addCase(createEdicationMain.fulfilled, (state, action) => {
        state.edicationList.push(action.payload);
      })
      .addCase(changeEdicationMain.fulfilled, (state, action) => {
        const data = state.edicationList.find(
          (el) => el.id === action.payload.id,
        )!;
        data.content = action.payload.content;
      })
      .addCase(changeEmployeeMain.fulfilled, (state, action) => {
        const data = state.employeeList.find(
          (el) => el.id === action.payload.id,
        )!;
        data.name = action.payload.name;
        data.edication.content = action.payload.edication.content;
      })
      .addCase(removeEmployeeMain.fulfilled, (state, action) => {
        const result = state.employeeList.filter(
          (el) => el.id !== action.payload.id,
        );
        state.employeeList = result;
      })
      .addCase(removeEdicationMain.fulfilled, (state, action) => {
        const result = state.edicationList.filter(
          (el) => el.id !== Number(action.payload.id),
        );
        console.log(result);

        state.edicationList = result;
      })
      .addCase(removeEdicationMain.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default mainSlice.reducer;
