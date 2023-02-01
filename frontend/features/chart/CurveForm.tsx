import {Button, TextField} from "react-vaadin-components";
import {useFormik} from "formik";
import * as yup from 'yup';
import {useSelector} from "react-redux";
import {RootState} from "Frontend/app/store";
import {useAppDispatch} from "Frontend/app/hooks";
import Curve from "Frontend/generated/com/example/application/data/entity/Curve";
import { deleteCurve, saveCurve, selectCurve } from "./curvesSlice";
import { getCharts} from './chartsSlice';


export interface CurveFormModel {
  id: string,
  name: string,
  color: string,
  position: string,
  
}



export default function CurveForm() {
  const charts = useSelector(getCharts);
  const selectedCurve = useSelector((state: RootState) => state.curves.selected);
  const chart = useSelector((state: RootState) => state.charts.chartForCurveEdit)
  const dispatch = useAppDispatch();

  const curveToFormModel = (curve: Curve) => ({
    id: curve.id,
    name: curve.name,
    color: curve.color,
    position: curve.position,
  });

  const formModelToCurve = (formModel: CurveFormModel) => ({
    id: formModel.id,
    name: formModel.name,
    color: formModel.color,
    position: formModel.position,
    chart: charts.find(c => c.id === chart?.id),
  });

  const validationSchema = yup.object({
    name: yup.string().required('First name is required'),
    color: yup.string().required('Last name is required'),
    position: yup.string().required('Enter a valid position'),
   /* chartId: yup.string().required('Select a chart')*/
  });

  const formValues = selectedCurve ? curveToFormModel(selectedCurve) : {
    name: '',
    color: '',
    position: '',
  };

  const formik = useFormik({
    initialValues: formValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
		console.log("save : " +formModelToCurve(values as CurveFormModel))
      dispatch(saveCurve(formModelToCurve(values as CurveFormModel)))
    }
  });

  const deleteCurrentCurve = () => {
    if (selectedCurve) {
      dispatch(deleteCurve(selectedCurve));
    }
  }

  const closeEditor = () => dispatch(selectCurve(null));
  console.log(formik.values.name)

  return (
    <form className="flex flex-col gap-s" onSubmit={formik.handleSubmit}>
      <TextField label="name"
                 name="name"
                 value={formik.values.name}
                 onChange={formik.handleChange}
                 invalid={Boolean(formik.errors.name)}
                 errorMessage={formik.errors.name ? formik.errors.name : ''}/>
      <TextField label="color"
                 name="color"
                 value={formik.values.color}
                 onChange={formik.handleChange}
                 invalid={Boolean(formik.errors.color)}
                 errorMessage={formik.errors.color ? formik.errors.color : ''}/>
      <TextField label="position"
                 name="position"
                 value={formik.values.position}
                 onChange={formik.handleChange}
                 invalid={Boolean(formik.errors.position)}
                 errorMessage={formik.errors.position ? formik.errors.position : ''}/>

      {/* <ComboBox label="Graphique"
                name="chartId"
                items={charts}
                itemLabelPath="name"
                itemValuePath="id"
                value={formik.values.chartId}
                onChange={formik.handleChange}
                invalid={Boolean(formik.errors.chartId)}
                errorMessage={formik.errors.chartId ? formik.errors.chartId : ''}/> */}

      <div className="flex gap-s">
        <Button theme="primary" onClick={e => formik.submitForm()}>Save</Button>
        <Button theme="error" onClick={deleteCurrentCurve}>Delete</Button>
        <Button theme="tertiary" onClick={closeEditor}>Cancel</Button>
      </div>
    </form>
  );
}