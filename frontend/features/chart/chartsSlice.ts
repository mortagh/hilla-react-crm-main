import Chart from "Frontend/generated/com/example/application/data/entity/Chart";
import {RootState} from "Frontend/app/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChartEndPoint } from "Frontend/generated/endpoints";

export interface ChartsState {
  charts: Chart[],

  selected?: Chart | null
  filterText: string
}

const initialState: ChartsState = {
  charts: [],
  filterText: ''
}

export const initFromServer = createAsyncThunk(
  'charts/initFromServer',
  async () => {
    return Promise.all([
      ChartEndPoint.getCharts(),
    ]);
  }
)

export const saveChart = createAsyncThunk(
  'charts/save',
  async (chart: Chart) => ChartEndPoint.saveChart(chart)
)

export const deleteChart = createAsyncThunk(
  'charts/delete',
  async (chart: Chart) => {
    await ChartEndPoint.deleteChart(chart.id);
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
        const [charts] = action.payload;
        state.charts = charts;
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
export const getCharts = (state: RootState) => state.charts.charts;
  


export const {updateFilter, selectChart} = chartsSlice.actions
export const chartsReducer = chartsSlice.reducer

