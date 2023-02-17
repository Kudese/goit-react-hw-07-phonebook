import BaseContact from '../redux/inishalState.json';
import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './contact.thunk';

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: BaseContact.contacts,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.isLoading = false;
      })
      .addCase(fetchContacts.rejected, (state, { payload }) => {
        state.error = 'error';
        state.isLoading = false;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(el => {
          return el.id !== action.meta.arg;
        });
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.items = [...state.items, payload];
      });
  },
});

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
  search: searchSlice.reducer,
  contacts: contactSlice.reducer,
});

export const store = configureStore({
  reducer: rootReduser,
  devTools: true,
  preloadedState: BaseContact,
});

// export const { addContactAction, deleteContactAction } = contactSlice.actions;

// reducers: {
//   addContactAction: (state, { payload }) => {
//     return [
//       ...state,
//       {
//         id: `${nanoid()}`,
//         name: `${payload.name}`,
//         number: `${payload.number}`,
//       },
//     ];
//   },
//   deleteContactAction: (state, { payload }) => {
//       return state.filter(el => {
//           return el.id !== payload;
//     });
//   },

// },

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist:["contact"]
//   }
//
//

// const rootReduser = combineReducers({
//     search:searchSlice.reducer,
//     contact: contactSlice.reducer,
// })
// const persistedReducer = persistReducer(persistConfig, rootReduser)

// export const persistor = persistStore(store)

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
