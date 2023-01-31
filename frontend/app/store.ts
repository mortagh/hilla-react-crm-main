import {configureStore} from '@reduxjs/toolkit'
import { chartsReducer } from 'Frontend/features/chart/chartsSlice';
import { curvesReducer } from 'Frontend/features/chart/curvesSlice';
import { enregistrersReducer } from 'Frontend/features/chart/enregistrersSlice';
import { channelsReducer } from 'Frontend/features/chart/channelsSlice';
import {contactsReducer} from "Frontend/features/contacts/contactsSlice";

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    charts: chartsReducer,
    curves: curvesReducer,
    enregistrers: enregistrersReducer,
    channels: channelsReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch