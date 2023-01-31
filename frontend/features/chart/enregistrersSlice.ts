import Enregistrer from "Frontend/generated/com/example/application/data/entity/Enregistrer";
import {RootState} from "Frontend/app/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EnregistrerEndPoint } from "Frontend/generated/endpoints";

export interface EnregistrersState {
  enregistrers: Enregistrer[],

  selected?: Enregistrer | null
  filterText: string
}

const initialState: EnregistrersState = {
  enregistrers: [],
  filterText: ''
}

export const initFromServer = createAsyncThunk(
  'enregistrers/initFromServer',
  async () => {
    return Promise.all([
      EnregistrerEndPoint.getEnregistrers(),
    ]);
  }
)

export const saveEnregistrer = createAsyncThunk(
  'enregistrers/save',
  async (enregistrer: Enregistrer) => EnregistrerEndPoint.saveEnregistrer(enregistrer)
)

export const deleteEnregistrer = createAsyncThunk(
  'enregistrers/delete',
  async (enregistrer: Enregistrer) => {
    await EnregistrerEndPoint.deleteEnregistrer(enregistrer.id);
    return enregistrer.id;
  }
)

export const enregistrersSlice = createSlice({
  name: 'enregistrers',
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<string>) => {
      state.filterText = action.payload;
    },
    selectEnregistrer: (state, action: PayloadAction<Enregistrer | null>) => {
      state.selected = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(initFromServer.fulfilled, (state, action) => {
        const [enregistrers] = action.payload;
        state.enregistrers = enregistrers;
      })
      .addCase(saveEnregistrer.fulfilled, (state, action) => {
        const saved = action.payload;

        if (saved) {
          const enregistrers = state.enregistrers;
          const enregistrerExists = enregistrers.some((c) => c.id === saved.id);

          if (enregistrerExists) {
            state.enregistrers = enregistrers.map((existing) => existing.id === saved.id ? saved : existing);
          } else {
            state.enregistrers = [...enregistrers, saved];
          }

          state.selected = null;
        }
      })
      .addCase(deleteEnregistrer.fulfilled, (state, action) => {
        const id = action.payload;
        state.enregistrers = state.enregistrers.filter(((c) => c.id !== id));
        state.selected = null;
      })
  }
})


// Selectors

export const getFilteredEnregistrers = (state: RootState) => {
  const filter = new RegExp(state.enregistrers.filterText, 'i');
  const enregistrers = state.enregistrers.enregistrers;
  return enregistrers.filter((enregistrer) =>
    filter.test(`${enregistrer.name} ${enregistrer.ip} ${enregistrer.type}`)
  );
}
export const getNumberOfEnregistrers = (state: RootState) => state.enregistrers.enregistrers.length;
export const getEnregistrers = (state: RootState) => state.enregistrers.enregistrers;
  


export const {updateFilter, selectEnregistrer} = enregistrersSlice.actions
export const enregistrersReducer = enregistrersSlice.reducer

