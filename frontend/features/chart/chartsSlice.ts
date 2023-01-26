import Chart from "Frontend/generated/com/example/application/data/entity/Chart";
import {RootState} from "Frontend/app/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TestEndPoint } from "Frontend/generated/endpoints";
import Curve from "Frontend/generated/com/example/application/data/entity/Curve";

export interface ChartsState {
  charts: Chart[],
  curves: Curve[],

  selected?: Chart | null
  filterText: string
}

const initialState: ChartsState = {
  charts: [],
  curves: [],
  filterText: ''
}

export const initFromServer = createAsyncThunk(
  'charts/initFromServer',
  async () => {
    return Promise.all([
      TestEndPoint.getCharts(),
      TestEndPoint.getCurves(),
    ]);
  }
)

export const saveChart = createAsyncThunk(
  'charts/save',
  async (chart: Chart) => TestEndPoint.saveChart(chart)
)

export const deleteChart = createAsyncThunk(
  'charts/delete',
  async (chart: Chart) => {
    await TestEndPoint.deleteChart(chart.id);
    return chart.id;
  }
)

export const chartsSlice = createSlice({
  name: 'charts',
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<string>) => {
      state.filterText = action.payload;
    },
    selectChart: (state, action: PayloadAction<Chart | null>) => {
      state.selected = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(initFromServer.fulfilled, (state, action) => {
        const [charts, curves] = action.payload;
        state.charts = charts;
        state.curves = curves;
      })
      .addCase(saveChart.fulfilled, (state, action) => {
        const saved = action.payload;

        if (saved) {
          const charts = state.charts;
          const chartExists = charts.some((c) => c.id === saved.id);

          if (chartExists) {
            state.charts = charts.map((existing) => existing.id === saved.id ? saved : existing);
          } else {
            state.charts = [...charts, saved];
          }

          state.selected = null;
        }
      })
      .addCase(deleteChart.fulfilled, (state, action) => {
        const id = action.payload;
        state.charts = state.charts.filter(((c) => c.id !== id));
        state.selected = null;
      })
  }
})


// Selectors

export const getFilteredCharts = (state: RootState) => {
  const filter = new RegExp(state.charts.filterText, 'i');
  const charts = state.charts.charts;
  return charts.filter((chart) =>
    filter.test(`${chart.name} ${chart.position}`)
  );
}
export const getNumberOfCharts = (state: RootState) => state.charts.charts.length;
export const getChartsByCurve = (state: RootState) => {
  const countByCurve = state.charts.charts.reduce((map, chart) => {
    const name = chart.curve?.name || 'Unknown';
    return map.set(name, (map.get(name) || 0) + 1);
  }, new Map<string, number>());

  return Array.from(countByCurve.entries()).map(([curve]) => ({
    name: curve,
  }));
}


export const {updateFilter, selectChart} = chartsSlice.actions
export const chartsReducer = chartsSlice.reducer
