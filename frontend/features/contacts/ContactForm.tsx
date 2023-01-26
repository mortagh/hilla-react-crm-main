import {Button, ComboBox, EmailField, TextField} from "react-vaadin-components";
import {useFormik} from "formik";
import * as yup from 'yup';
import {useSelector} from "react-redux";
import {RootState} from "Frontend/app/store";
import {useAppDispatch} from "Frontend/app/hooks";
import {deleteContact, saveContact, selectContact} from "Frontend/features/contacts/contactsSlice";
import Contact from "Frontend/generated/com/example/application/data/entity/Contact";

export interface ContactFormModel {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  companyId: string,
  statusId: string,
}

export default function ContactForm() {
  const companies = useSelector((state: RootState) => state.contacts.companies);
  const statuses = useSelector((state: RootState) => state.contacts.statuses);
  const selectedContact = useSelector((state: RootState) => state.contacts.selected);
  const dispatch = useAppDispatch();

  const contactToFormModel = (contact: Contact) => ({
    id: contact.id,
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    companyId: contact.company?.id,
    statusId: contact.status?.id,
  });

  const formModelToContact = (formModel: ContactFormModel) => ({
    id: formModel.id,
    firstName: formModel.firstName,
    lastName: formModel.lastName,
    email: formModel.email,
    company: companies.find(c => c.id === formModel.companyId),
    status: statuses.find(s => s.id === formModel.statusId)
  });

  const validationSchema = yup.object({
    firstName: yup.string().required('First name is required').min(2),
    lastName: yup.string().required('Last name is required').min(2),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    statusId: yup.string().required('Select a status'),
    companyId: yup.string().required('Select a company')
  });

  const formValues = selectedContact ? contactToFormModel(selectedContact) : {
    firstName: '',
    lastName: '',
    email: '',
    companyId: '',
    statusId: ''
  };

  const formik = useFormik({
    initialValues: formValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(saveContact(formModelToContact(values as ContactFormModel)))
    }
  });

  const deleteCurrentContact = () => {
    if (selectedContact) {
      dispatch(deleteContact(selectedContact));
    }
  }

  const closeEditor = () => dispatch(selectContact(null));
  console.log(formik.values.firstName)

  return (
    <form className="flex flex-col gap-s" onSubmit={formik.handleSubmit}>
      <TextField label="First name"
                 name="firstName"
                 value={formik.values.firstName}
                 onChange={formik.handleChange}
                 invalid={Boolean(formik.errors.firstName)}
                 errorMessage={formik.errors.firstName ? formik.errors.firstName : ''}/>
      <TextField label="Last name"
                 name="lastName"
                 value={formik.values.lastName}
                 onChange={formik.handleChange}
                 invalid={Boolean(formik.errors.lastName)}
                 errorMessage={formik.errors.lastName ? formik.errors.lastName : ''}/>
      <EmailField label="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  invalid={Boolean(formik.errors.email)}
                  errorMessage={formik.errors.email ? formik.errors.email : ''}/>

      <ComboBox label="Status"
                name="statusId"
                items={statuses}
                itemLabelPath="name"
                itemValuePath="id"
                value={formik.values.statusId}
                onChange={formik.handleChange}
                invalid={Boolean(formik.errors.statusId)}
                errorMessage={formik.errors.statusId ? formik.errors.statusId : ''}/>
      <ComboBox label="Company"
                name="companyId"
                items={companies}
                itemLabelPath="name"
                itemValuePath="id"
                value={formik.values.companyId}
                onChange={formik.handleChange}
                invalid={Boolean(formik.errors.companyId)}
                errorMessage={formik.errors.companyId ? formik.errors.companyId : ''}/>

      <div className="flex gap-s">
        <Button theme="primary" onClick={e => formik.submitForm()}>Save</Button>
        <Button theme="error" onClick={deleteCurrentContact}>Delete</Button>
        <Button theme="tertiary" onClick={closeEditor}>Cancel</Button>
      </div>
    </form>
  );
}