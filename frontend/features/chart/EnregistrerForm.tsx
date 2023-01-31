import {Button, TextField} from "react-vaadin-components";
import {useFormik} from "formik";
import * as yup from 'yup';
import { useSelector } from "react-redux";
import { RootState } from "Frontend/app/store";
import { useAppDispatch } from "Frontend/app/hooks";
import Enregistrer from "Frontend/generated/com/example/application/data/entity/Enregistrer";
import { deleteEnregistrer, saveEnregistrer, selectEnregistrer } from "./enregistrersSlice";
import {v4 as uuidv4} from 'uuid';


export interface EnregistrerFormModel {
  id: string,
  name: string,
  ip: string,
  type: string,
}

export default function EnregistrerForm() {
  const selectedEnregistrer = useSelector((state: RootState) => state.enregistrers.selected);
  const dispatch = useAppDispatch();

  const enregistrerToFormModel = (enregistrer: Enregistrer) => ({
    id: enregistrer.id,
    name: enregistrer.name,
    ip: enregistrer.ip,
    type: enregistrer.ip,
  });

  const formModelToEnregistrer = (formModel: EnregistrerFormModel) => ({
    id: formModel.id?? uuidv4(),
    name: formModel.name,
    ip: formModel.ip,
    type: formModel.type,
  });

  const validationSchema = yup.object({
    name: yup.string().required('un nom est requis'),
    ip: yup.string().required('une ip est requis'),
    type: yup.string().required('un type est requis'),
  });


  const formValues = selectedEnregistrer ? enregistrerToFormModel(selectedEnregistrer) : {
    name: '',
    ip: '',
    type: '',
  };

  const formik = useFormik({
    initialValues: formValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(saveEnregistrer(formModelToEnregistrer(values as EnregistrerFormModel)))
    }
  });

  const deleteCurrentEnregistrer = () => {
    if (selectedEnregistrer) {
      dispatch(deleteEnregistrer(selectedEnregistrer));
    }
  }

  const closeEditor = () => dispatch(selectEnregistrer(null));
  console.log(formik.values.name)

  return (
    <form className="flex flex-col gap-s" onSubmit={formik.handleSubmit}>
      <TextField label="name"
                 name="name"
                 value={formik.values.name}
                 onChange={formik.handleChange}
                 invalid={Boolean(formik.errors.name)}
                 errorMessage={formik.errors.name ? formik.errors.name : ''}/>
      <TextField label="Ip"
                 name="ip"
                 value={formik.values.ip === undefined ? "" : formik.values.ip.toString()  }
                 onChange={formik.handleChange}
                 invalid={Boolean(formik.errors.ip)}
                 errorMessage={formik.errors.ip ? formik.errors.ip : ''}/>
      <TextField label="Type"
                 name="type"
                 value={formik.values.type === undefined ? "" : formik.values.type.toString()  }
                 onChange={formik.handleChange}
                 invalid={Boolean(formik.errors.type)}
                 errorMessage={formik.errors.type ? formik.errors.type : ''}/>


      <div className="flex gap-s">
        <Button theme="primary" onClick={e => formik.submitForm()}>Save</Button>
        <Button theme="error" onClick={deleteCurrentEnregistrer}>Delete</Button>
        <Button theme="tertiary" onClick={closeEditor}>Cancel</Button>
      </div>
    </form>
  );
}