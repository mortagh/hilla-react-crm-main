import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import Contact from "Frontend/generated/com/example/application/data/entity/Contact";
import Status from "Frontend/generated/com/example/application/data/entity/Status";
import Company from "Frontend/generated/com/example/application/data/entity/Company";
import {CrmEndpoint} from "Frontend/generated/endpoints";
import {RootState} from "Frontend/app/store";

export interface ContactsState {
  contacts: Contact[],
  companies: Company[],
  statuses: Status[],
  selected?: Contact | null
  filterText: string
}

const initialState: ContactsState = {
  contacts: [],
  companies: [],
  statuses: [],
  filterText: ''
}

export const initFromServer = createAsyncThunk(
  'contacts/initFromServer',
  async () => {
    return Promise.all([
      CrmEndpoint.getContacts(),
      CrmEndpoint.getCompanies(),
      CrmEndpoint.getStatuses()
    ]);
  }
)

export const saveContact = createAsyncThunk(
  'contacts/save',
  async (contact: Contact) => CrmEndpoint.saveContact(contact)
)

export const deleteContact = createAsyncThunk(
  'contacts/delete',
  async (contact: Contact) => {
    await CrmEndpoint.deleteContact(contact.id);
    return contact.id;
  }
)

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<string>) => {
      state.filterText = action.payload;
    },
    selectContact: (state, action: PayloadAction<Contact | null>) => {
      state.selected = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(initFromServer.fulfilled, (state, action) => {
        const [contacts, companies, statuses] = action.payload;
        state.contacts = contacts;
        state.companies = companies;
        state.statuses = statuses;
      })
      .addCase(saveContact.fulfilled, (state, action) => {
        const saved = action.payload;

        if (saved) {
          const contacts = state.contacts;
          const contactExists = contacts.some((c) => c.id === saved.id);

          if (contactExists) {
            state.contacts = contacts.map((existing) => existing.id === saved.id ? saved : existing);
          } else {
            state.contacts = [...contacts, saved];
          }

          state.selected = null;
        }
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        const id = action.payload;
        state.contacts = state.contacts.filter(((c) => c.id !== id));
        state.selected = null;
      })
  }
})


// Selectors

export const getFilteredContacts = (state: RootState) => {
  const filter = new RegExp(state.contacts.filterText, 'i');
  const contacts = state.contacts.contacts;
  return contacts.filter((contact) =>
    filter.test(`${contact.firstName} ${contact.lastName}`)
  );
}
export const getNumberOfContacts = (state: RootState) => state.contacts.contacts.length;
export const getContactsByCompany = (state: RootState) => {
  const countByCompany = state.contacts.contacts.reduce((map, contact) => {
    const name = contact.company?.name || 'Unknown';
    return map.set(name, (map.get(name) || 0) + 1);
  }, new Map<string, number>());

  return Array.from(countByCompany.entries()).map(([company, employees]) => ({
    name: company,
    value: employees
  }));
}


export const {updateFilter, selectContact} = contactsSlice.actions
export const contactsReducer = contactsSlice.reducer

