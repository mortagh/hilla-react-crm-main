import Curve from "Frontend/generated/com/example/application/data/entity/Curve";
import {RootState} from "Frontend/app/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurveEndPoint } from "Frontend/generated/endpoints";
import Chart from "Frontend/generated/com/example/application/data/entity/Chart";

export interface CurvesState {
  charts: Chart[];
  curves: Curve[],

  selected?: Curve | null
  filterText: string
}

const initialState: CurvesState = {
  curves: [],
  filterText: '',
  charts: []
}

export const initFromServer = createAsyncThunk(
  'curves/initFromServer',
  async () => {
    return Promise.all([
      CurveEndPoint.getCurves(),
    ]);
  }
)

export const saveCurve = createAsyncThunk(
  'curves/save',
  async (curve: Curve) => {
	    console.log(" Chart id : " +curve.chart?.id);
	  	return CurveEndPoint.saveCurve(curve);
	  }
)

export const deleteCurve = createAsyncThunk(
  'curves/delete',
  async (curve: Curve) => {
    await CurveEndPoint.deleteCurve(curve.id);
    return curve.id;
  }
)

export const curvesSlice = createSlice({
  name: 'curves',
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<string>) => {
      state.filterText = action.payload;
    },
    selectCurve: (state, action: PayloadAction<Curve | null>) => {
      state.selected = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(initFromServer.fulfilled, (state, action) => {
        const [curves] = action.payload;
        state.curves = curves;
      })
      .addCase(saveCurve.fulfilled, (state, action) => {
        const saved = action.payload;

        if (saved) {
          const curves = state.curves;
          const curveExists = curves.some((c) => c.id === saved.id);

          if (curveExists) {
            state.curves = curves.map((existing) => existing.id === saved.id ? saved : existing);
          } else {
            state.curves = [...curves, saved];
          }

          state.selected = null;
        }
      })
      .addCase(deleteCurve.fulfilled, (state, action) => {
        const id = action.payload;
        state.curves = state.curves.filter(((c) => c.id !== id));
        state.selected = null;
      })
  }
})


// Selectors

export const getFilteredCurves = (state: RootState) => {
  const filter = new RegExp(state.curves.filterText, 'i');
  const curves = state.curves.curves;
  return curves.filter((curve) =>
    filter.test(`${curve.name} ${curve.position}`)
  );
}
export const getNumberOfCurves = (state: RootState) => state.curves.curves.length;

  


export const {updateFilter, selectCurve} = curvesSlice.actions
export const curvesReducer = curvesSlice.reducer

