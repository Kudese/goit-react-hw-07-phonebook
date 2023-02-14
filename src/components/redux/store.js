import { nanoid } from 'nanoid';
import BaseContact from '../redux/inishalState.json';
import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export const contactSlice = createSlice({
  name: 'contact',
  initialState: BaseContact.contact,
  reducers: {
    addContactAction: (state, { payload }) => {
      return [
        ...state,
        {
          id: `${nanoid()}`,
          name: `${payload.name}`,
          number: `${payload.number}`,
        },
      ];
    },
    deleteContactAction: (state, { payload }) => {
        return state.filter(el => {
            return el.id !== payload;
      });
    },
  },
});


const persistConfig = {
    key: 'root',
    storage,
    whitelist:["contact"]
  }
  export const { addContactAction, deleteContactAction } = contactSlice.actions;
  export const searchSlice = createSlice({
      name: 'search',
  initialState: BaseContact.search,
  reducers: {
    searchAction: (state, { payload }) => {
        return (state = payload);
    },
  },
});
export const { searchAction } = searchSlice.actions;
const rootReduser = combineReducers({
    search:searchSlice.reducer,
    contact: contactSlice.reducer,
})
const persistedReducer = persistReducer(persistConfig, rootReduser)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    preloadedState: BaseContact,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store)



// import { addContactAction, deleteContactAction, searchAction } from './contact.action';

// const searchReduser = createReducer(BaseContact.search, builder => {
//   builder.addCase(searchAction, (state, { payload }) => {
//     return payload;
//   });
// });
// const contactReduser = createReducer(BaseContact.contact, builder => {
//   builder
//     .addCase(addContactAction, (state, { payload }) => {
//       return [
//         ...state,
//         {
//           id: `${nanoid()}`,
//           name: `${payload.name}`,
//           number: `${payload.number}`,
//         },
//       ];
//     })
//     .addCase(deleteContactAction, (state, { payload }) => {
//       return state.filter(el => {
//         return el.id !== payload;
//       });
//     });
// });