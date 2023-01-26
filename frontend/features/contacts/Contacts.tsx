import {Button, Grid, GridColumn, TextField, TextFieldElement, GridElement} from "react-vaadin-components";
import ContactForm from "./ContactForm";
import Contact from "Frontend/generated/com/example/application/data/entity/Contact";
import {useSelector} from "react-redux";
import {getFilteredContacts, selectContact, updateFilter} from "Frontend/features/contacts/contactsSlice";
import {useAppDispatch} from "Frontend/app/hooks";
import {RootState} from "Frontend/app/store";


export default function Contacts() {
  const dispatch = useAppDispatch();
  const contacts = useSelector(getFilteredContacts);
  const selectedContact = useSelector((state: RootState) => state.contacts.selected);
  const filter = useSelector((state: RootState) => state.contacts.filterText);

  const filterChanged = (e: TextFieldElement.TextFieldValueChangedEvent) => dispatch(updateFilter(e.detail.value));

  // TODO: fix event type
  const handleGridSelection = (e: GridElement.GridActiveItemChangedEvent<Contact>) => {
    dispatch(selectContact(e.detail.value));
  }

  const addContact = () => dispatch(selectContact({} as Contact));

  return (
    <div className="box-border flex flex-col p-m gap-s w-full h-full">
      <div className="toolbar flex gap-s">
        <TextField
          placeholder="Filter by name"
          clearButtonVisible
          value={filter}
          onValueChanged={filterChanged}
        />
        <Button onClick={addContact}>Add Contact</Button>
      </div>
      <div className="content flex gap-m h-full">
        <Grid
          className="h-full"
          items={contacts}
          onActiveItemChanged={handleGridSelection}
          selectedItems={[selectedContact]}>
          <GridColumn path="firstName" autoWidth/>
          <GridColumn path="lastName" autoWidth/>
          <GridColumn path="status.name" header="Status" autoWidth/>
          <GridColumn path="company.name" header="Company" autoWidth/>
        </Grid>
        {selectedContact && <ContactForm/>}
      </div>
    </div>
  )
}