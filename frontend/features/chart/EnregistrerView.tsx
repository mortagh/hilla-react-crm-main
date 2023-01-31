import { useAppDispatch } from 'Frontend/app/hooks';
import { RootState } from 'Frontend/app/store';
import EnregistrerForm from "./EnregistrerForm";
import Enregistrer from "Frontend/generated/com/example/application/data/entity/Enregistrer";
import { useSelector } from 'react-redux';
import { Button,  Grid, GridColumn,  TextField, TextFieldElement, GridElement } from
'react-vaadin-components';
import { getFilteredEnregistrers, selectEnregistrer, updateFilter } from './enregistrersSlice';
import ChannelForm from './ChannelForm';
import Channel from "Frontend/generated/com/example/application/data/entity/Channel";
import { getFilteredChannels, selectChannel } from './channelsSlice';




export default function EnregistrerView() {



const dispatch = useAppDispatch();
const enregistrers = useSelector(getFilteredEnregistrers);
const selectedEnregistrer = useSelector((state: RootState) => state.enregistrers.selected);
const channels = useSelector(getFilteredChannels);
const selectedChannel = useSelector((state: RootState) => state.channels.selected);
const filter = useSelector((state: RootState) => state.enregistrers.filterText);

const filterChanged = (e: TextFieldElement.TextFieldValueChangedEvent) => dispatch(updateFilter(e.detail.value));


const handleGridSelection = (e: GridElement.GridActiveItemChangedEvent<Enregistrer>) => {
  dispatch(selectEnregistrer(e.detail.value));
  }

  const addEnregistrer = () => dispatch(selectEnregistrer({} as Enregistrer));
  const addChannel = () => dispatch(selectChannel({} as Channel));



  return (
  <div className="flex flex-col h-full items-center justify-center p-l text-center">
    <h2>Gestion des enregistrers</h2>
    <div className="box-border flex flex-col p-m gap-s w-full h-full">
      <div className="toolbar flex gap-s">
        <TextField placeholder="Filter by name" clearButtonVisible value={filter} onValueChanged={filterChanged} />
        <Button onClick={addEnregistrer}>Ajouter un enregistrer</Button>
      </div>
      <div className="content flex gap-m h-full">
        <Grid items={enregistrers} onActiveItemChanged={handleGridSelection} selectedItems={[selectedEnregistrer]}>
          <GridColumn path='name' header="Nom du graphique" />
          <GridColumn path='position' header="Position" />
        </Grid>
        {selectedEnregistrer &&
        <EnregistrerForm />}
      </div>
    </div>

    <h2>Gestion des Channels</h2>
    <div className="box-border flex flex-col p-m gap-s w-full h-full">
      <div className="toolbar flex gap-s">
        <TextField placeholder="Filter by name" clearButtonVisible value={filter} onValueChanged={filterChanged} />
        <Button onClick={addChannel}>Ajouter un channel</Button>
      </div>
      <div className="content flex gap-m h-full">
        <Grid items={channels} onActiveItemChanged={handleGridSelection} selectedItems={[selectedChannel]}>
          <GridColumn path='name' header="Nom de la courbe" />
          <GridColumn path='way' header="Position" />
          <GridColumn path='unit' header="Color" />
          <GridColumn path='enregistrer.name' header="Graphique" />
        </Grid>
        {selectedChannel &&
        <ChannelForm />}
      </div>
    </div>
  </div>
  );
  }