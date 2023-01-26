import {configureStore} from '@reduxjs/toolkit'
import { chartsReducer } from 'Frontend/features/chart/chartsSlice';
import {contactsReducer} from "Frontend/features/contacts/contactsSlice";

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    charts: chartsReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch