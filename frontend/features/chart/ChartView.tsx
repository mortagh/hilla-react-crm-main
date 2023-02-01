import { useAppDispatch } from 'Frontend/app/hooks';
import { RootState } from 'Frontend/app/store';
import ChartForm from "./ChartForm";
import Chart from "Frontend/generated/com/example/application/data/entity/Chart";
import { useSelector } from 'react-redux';
import { Button, Grid, GridColumn, TextField, TextFieldElement, GridElement, ComboBox, ComboBoxElement } from
	'react-vaadin-components';
import { getFilteredCharts, selectChart, selectChartForCurveEdit, updateFilter } from './chartsSlice';
import Curve from "Frontend/generated/com/example/application/data/entity/Curve";
import { getFilteredCurves, selectCurve } from './curvesSlice';
import CurveForm from './CurveForm';



export interface chartId {
	id: string
}
export default function ChartView() {

	const dispatch = useAppDispatch();
	const charts = useSelector(getFilteredCharts);
	const selectedChart = useSelector((state: RootState) => state.charts.selected)
	const selectedChartForCurveEdit = useSelector((state: RootState) => state.charts.chartForCurveEdit)
	const curves = useSelector(getFilteredCurves);
	const selectedCurve = useSelector((state: RootState) => state.curves.selected);
	const filter = useSelector((state: RootState) => state.charts.filterText);

	const filterChanged = (e: TextFieldElement.TextFieldValueChangedEvent) => dispatch(updateFilter(e.detail.value));


	const handleChartSelection = (e: GridElement.GridActiveItemChangedEvent<Chart>) => {
		dispatch(selectChart(e.detail.value));
	}
	
	const handleCurveSelection = (e: GridElement.GridActiveItemChangedEvent<Curve>) => {
		dispatch(selectCurve(e.detail.value));
	}

	const addChart = () => dispatch(selectChart({} as Chart));
	const addCurve = () => dispatch(selectCurve({} as Curve));

	const handleChartComboboxSelection = (e: ComboBoxElement.ComboBoxChangeEvent<Chart>) => {
		dispatch(selectChartForCurveEdit(e.target.selectedItem??null));
	}

	return (
		<div className="flex flex-col h-full items-center p-l text-center">
			<h2>Gestion des graphiques</h2>
			<div className="box-border flex flex-col p-m gap-s w-full h-full">
				<div className="toolbar flex gap-s">
					<TextField placeholder="Filter by name" clearButtonVisible value={filter} onValueChanged={filterChanged} />
					<Button onClick={addChart}>Ajouter un graphique</Button>
				</div>
				<div className="content flex gap-m h-full">
					<Grid items={charts} onActiveItemChanged={handleChartSelection} selectedItems={[selectedChart]}>
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
					value={selectedChartForCurveEdit?.id}
					onChange={handleChartComboboxSelection}
				/>
				<div className="toolbar flex gap-s">
					<TextField placeholder="Filter by name" clearButtonVisible value={filter} onValueChanged={filterChanged} />
					<Button onClick={addCurve}>Ajouter une courbe</Button>
				</div>
				<div className="content flex gap-m h-full">
					<Grid items={curves} onActiveItemChanged={handleCurveSelection} selectedItems={[selectedCurve]}>
						<GridColumn path='name' header="Nom de la courbe" />
						<GridColumn path='position' header="Position" />
						<GridColumn path='color' header="Color" />
						<GridColumn path='chart.name' header="Graphique" />
					</Grid>
					{selectedCurve &&
						<CurveForm />}
				</div>
			</div>
		</div>
	);
}