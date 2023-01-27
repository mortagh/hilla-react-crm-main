import { useAppDispatch } from 'Frontend/app/hooks';
import { RootState } from 'Frontend/app/store';
import ChartForm from "./ChartForm";
import Chart from "Frontend/generated/com/example/application/data/entity/Chart";
import { useSelector } from 'react-redux';
import { Button, ComboBox, Grid, GridColumn, Select, TextField, TextFieldElement, GridElement } from
'react-vaadin-components';
import { getFilteredCharts, selectChart, updateFilter } from './chartsSlice';
import { useEffect, useState } from 'react';



export default function ChartView() {


  const [chart, setChart] = useState<Chart[]>([]);


      useEffect(() => {
      setChart([
      { name: 'Graphique 1', position: 1 },
      { name: 'Graphique 2', position: 2 },
      ]);
      }, []);

const dispatch = useAppDispatch();
const charts = useSelector(getFilteredCharts);
const selectedChart = useSelector((state: RootState) => state.charts.selected);
const filter = useSelector((state: RootState) => state.charts.filterText);

const filterChanged = (e: TextFieldElement.TextFieldValueChangedEvent) => dispatch(updateFilter(e.detail.value));


const handleGridSelection = (e: GridElement.GridActiveItemChangedEvent<Chart>) => {
  dispatch(selectChart(e.detail.value));
  }

  const addChart = () => dispatch(selectChart({} as Chart));



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

    {/* <h2>Gestion des courbes</h2>
    <Select label='Choisir le graphique' items={criteria} value={criteria && criteria[0]?.value} />
    <div className="box-border flex flex-col p-m gap-s w-full h-full">
      <div className="toolbar flex gap-s">
        <TextField placeholder="Filter by name" clearButtonVisible value={filter} onValueChanged={filterChanged} />
        <Button onClick={addChart}>Add Chart</Button>
      </div>
      <Grid items={curve} className='h-full'>
        <GridColumn path='nameCurve' header="Nom de la courbe" />
        <GridColumn path='nameChannel' header="Nom du channel" />
        <GridColumn path='color' header="Couleur" />
        <GridColumn path='position' header="Position" />
        <GridColumn path='button' header="Modifier" />
      </Grid>
      {selectedChart &&
      <ChartForm />}
    </div> */}
  </div>
  );
  }