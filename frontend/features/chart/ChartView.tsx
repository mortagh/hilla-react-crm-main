import { useAppDispatch } from 'Frontend/app/hooks';
import { RootState } from 'Frontend/app/store';
import ChartForm from "./ChartForm";
import Chart from "Frontend/generated/com/example/application/data/entity/Chart";
import { useSelector } from 'react-redux';
import { Button,  Grid, GridColumn,  TextField, TextFieldElement, GridElement, ComboBox } from
'react-vaadin-components';
import * as yup from 'yup';
import { getFilteredCharts, selectChart, updateFilter } from './chartsSlice';
import CurveForm, { CurveFormModel } from './CurveForm';
import Curve from "Frontend/generated/com/example/application/data/entity/Curve";
import { getFilteredCurves, saveCurve, selectCurve } from './curvesSlice';
import { useFormik } from 'formik';




export default function ChartView() {

const dispatch = useAppDispatch();
const charts = useSelector(getFilteredCharts);
const selectedChart = useSelector((state: RootState) => state.charts.selected);
const curves = useSelector(getFilteredCurves);
const selectedCurve = useSelector((state: RootState) => state.curves.selected);
const filter = useSelector((state: RootState) => state.charts.filterText);

const filterChanged = (e: TextFieldElement.TextFieldValueChangedEvent) => dispatch(updateFilter(e.detail.value));

const curveToFormModel = (chart: Chart) => ({
  chartId: chart?.id
});

const validationSchema = yup.object({
  chartId: yup.string().required('Select a chart')
});
const formModelToCurve = (formModel: CurveFormModel) => ({
  chart: charts.find(c => c.id === formModel.chartId),
});
const formValues = selectedChart ? curveToFormModel(selectedChart) : {
  chartId: '',
};
const formik = useFormik({
  initialValues: formValues,
  validationSchema,
  enableReinitialize: true,
  onSubmit: (values) => {
  console.log(formModelToCurve(values as CurveFormModel).chart?.id)
    dispatch(saveCurve(formModelToCurve(values as CurveFormModel)))
  }
});

const handleGridSelection = (e: GridElement.GridActiveItemChangedEvent<Chart>) => {
  dispatch(selectChart(e.detail.value));
  }

  const addChart = () => dispatch(selectChart({} as Chart));
  const addCurve = () => dispatch(selectCurve({} as Curve));

  const chartId = formik.values.chartId;

  return (
  <div className="flex flex-col h-full items-center justify-center p-l text-center">
    <h2>Gestion des graphiques</h2>
    <div className="box-border flex flex-col p-m gap-s w-full h-full">
      <div className="toolbar flex gap-s">
        <TextField placeholder="Filter by name" clearButtonVisible value={filter} onValueChanged={filterChanged} />
        <Button onClick={addChart}>Ajouter un graphique</Button>
      </div>
      <div className="content flex gap-m h-full">
        <Grid items={charts} onActiveItemChanged={handleGridSelection} selectedItems={[selectedChart]}>
          <GridColumn path='name' header="Nom du graphique" />
          <GridColumn path='position' header="Position" />
        </Grid>
        {selectedChart &&
        <ChartForm />}
      </div>
    </div>

    <h2>Gestion des courbes</h2>
    <div className="box-border flex flex-col p-m gap-s w-full h-full">
    <ComboBox label="Graphique"
                name="chartId"
                items={charts}
                itemLabelPath="name"
                itemValuePath="id"
                value={formik.values.chartId}
                onChange={formik.handleChange}
                invalid={Boolean(formik.errors.chartId)}
                errorMessage={formik.errors.chartId ? formik.errors.chartId : ''}/>
      <div className="toolbar flex gap-s">
        <TextField placeholder="Filter by name" clearButtonVisible value={filter} onValueChanged={filterChanged} />
        <Button onClick={addCurve}>Ajouter une courbe</Button>
      </div>
      <div className="content flex gap-m h-full">
        <Grid items={curves} onActiveItemChanged={handleGridSelection} selectedItems={[selectedCurve]}>
          <GridColumn path='name' header="Nom de la courbe" />
          <GridColumn path='position' header="Position" />
          <GridColumn path='color' header="Color" />
          <GridColumn path='chart.name' header="Graphique" />
        </Grid>
        {selectedCurve &&
        <CurveForm chartId={chartId} />}
      </div>
    </div>
  </div>
  );
  }