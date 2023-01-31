import {Button, ComboBox,  TextField} from "react-vaadin-components";
import {useFormik} from "formik";
import * as yup from 'yup';
import {useSelector} from "react-redux";
import {RootState} from "Frontend/app/store";
import {useAppDispatch} from "Frontend/app/hooks";
import Channel from "Frontend/generated/com/example/application/data/entity/Channel";
import { deleteChannel, saveChannel, selectChannel } from "./channelsSlice";
import { getEnregistrers} from './enregistrersSlice';

export interface ChannelFormModel {
  id: string,
  name: string,
  way: string,
  unit: string,
  enregistrerId: string,
  
}

export default function ChannelForm() {
  const enregistrers = useSelector(getEnregistrers);
  const selectedChannel = useSelector((state: RootState) => state.channels.selected);
  const dispatch = useAppDispatch();

  const channelToFormModel = (channel: Channel) => ({
    id: channel.id,
    name: channel.name,
    way: channel.way,
    unit: channel.unit,
    enregistrerId: channel.enregistrer?.id
  });

  const formModelToChannel = (formModel: ChannelFormModel) => ({
    id: formModel.id,
    name: formModel.name,
    way: formModel.way,
    unit: formModel.unit,
    enregistrer: enregistrers.find(c => c.id === formModel.enregistrerId),
  });

  const validationSchema = yup.object({
    name: yup.string().required('First name is required'),
    way: yup.string().required('Last name is required'),
    unit: yup.string().required('Enter a valid unit'),
    enregistrerId: yup.string().required('Select a enregistrer')
  });

  const formValues = selectedChannel ? channelToFormModel(selectedChannel) : {
    name: '',
    way: '',
    unit: '',
    enregistrerId: '',
  };

  const formik = useFormik({
    initialValues: formValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
		console.log(formModelToChannel(values as ChannelFormModel).enregistrer?.id)
      dispatch(saveChannel(formModelToChannel(values as ChannelFormModel)))
    }
  });

  const deleteCurrentChannel = () => {
    if (selectedChannel) {
      dispatch(deleteChannel(selectedChannel));
    }
  }

  const closeEditor = () => dispatch(selectChannel(null));
  console.log(formik.values.name)

  return (
    <form className="flex flex-col gap-s" onSubmit={formik.handleSubmit}>
      <TextField label="name"
                 name="name"
                 value={formik.values.name}
                 onChange={formik.handleChange}
                 invalid={Boolean(formik.errors.name)}
                 errorMessage={formik.errors.name ? formik.errors.name : ''}/>
      <TextField label="way"
                 name="way"
                 value={formik.values.way}
                 onChange={formik.handleChange}
                 invalid={Boolean(formik.errors.way)}
                 errorMessage={formik.errors.way ? formik.errors.way : ''}/>
      <TextField label="unit"
                 name="unit"
                 value={formik.values.unit}
                 onChange={formik.handleChange}
                 invalid={Boolean(formik.errors.unit)}
                 errorMessage={formik.errors.unit ? formik.errors.unit : ''}/>

      <ComboBox label="Graphique"
                name="enregistrerId"
                items={enregistrers}
                itemLabelPath="name"
                itemValuePath="id"
                value={formik.values.enregistrerId}
                onChange={formik.handleChange}
                invalid={Boolean(formik.errors.enregistrerId)}
                errorMessage={formik.errors.enregistrerId ? formik.errors.enregistrerId : ''}/>

      <div className="flex gap-s">
        <Button theme="primary" onClick={e => formik.submitForm()}>Save</Button>
        <Button theme="error" onClick={deleteCurrentChannel}>Delete</Button>
        <Button theme="tertiary" onClick={closeEditor}>Cancel</Button>
      </div>
    </form>
  );
}