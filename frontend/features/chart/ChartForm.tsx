import {Button, TextField} from "react-vaadin-components";
import {useFormik} from "formik";
import * as yup from 'yup';
import { useSelector } from "react-redux";
import { RootState } from "Frontend/app/store";
import { useAppDispatch } from "Frontend/app/hooks";
import Chart from "Frontend/generated/com/example/application/data/entity/Chart";
import { deleteChart, saveChart, selectChart } from "./chartsSlice";
import {v4 as uuidv4} from 'uuid';


export interface ChartFormModel {
  id: string,
  name: string,
  position: number,
}

export default function ChartForm() {
  const selectedChart = useSelector((state: RootState) => state.charts.selected);
  const dispatch = useAppDispatch();

  const chartToFormModel = (chart: Chart) => ({
    id: chart.id,
    name: chart.name,
    position: chart.position
  });

  const formModelToChart = (formModel: ChartFormModel) => ({
    id: formModel.id?? uuidv4(),
    name: formModel.name,
    position: formModel.position
  });

  const validationSchema = yup.object({
    name: yup.string().required('un nom est requis'),
    position: yup.number().required('une position est requis'),
  });


  const formValues = selectedChart ? chartToFormModel(selectedChart) : {
    name: '',
    position: 0
  };

  const formik = useFormik({
    initialValues: formValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(saveChart(formModelToChart(values as ChartFormModel)))
    }
  });

  const deleteCurrentChart = () => {
    if (selectedChart) {
      dispatch(deleteChart(selectedChart));
    }
  }

  const closeEditor = () => dispatch(selectChart(null));
  console.log(formik.values.name)

  return (
    <form className="flex flex-col gap-s" onSubmit={formik.handleSubmit}>
      <TextField label="name"
                 name="name"
                 value={formik.values.name}
                 onChange={formik.handleChange}
                 invalid={Boolean(formik.errors.name)}
                 errorMessage={formik.errors.name ? formik.errors.name : ''}/>
      <TextField label="Position"
                 name="position"
                 value={formik.values.position === undefined ? "" : formik.values.position.toString()  }
                 onChange={formik.handleChange}
                 invalid={Boolean(formik.errors.position)}
                 errorMessage={formik.errors.position ? formik.errors.position : ''}/>


      <div className="flex gap-s">
        <Button theme="primary" onClick={e => formik.submitForm()}>Save</Button>
        <Button theme="error" onClick={deleteCurrentChart}>Delete</Button>
        <Button theme="tertiary" onClick={closeEditor}>Cancel</Button>
      </div>
    </form>
  );
}