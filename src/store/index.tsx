import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import scholars from 'src/store/apps/scholars'
import roles from 'src/store/apps/roles'
import invoice from 'src/store/apps/invoice'
import events from './apps/events'
import mandate from './apps/mandate'

export const store = configureStore({
  reducer: {
    scholars,
    roles,
    events,
    mandate,
    invoice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
