import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk('fetchContacts', async () => {
  const { data } = await axios.get(
    'https://63ebf87a32a081172394d274.mockapi.io/contacts'
  );
  console.log(data);
  return data;
});
export const deleteContact = createAsyncThunk('deleteContact', id => {
  axios.delete(`https://63ebf87a32a081172394d274.mockapi.io/contacts/${id}`);
});
export const addContact = createAsyncThunk('addContact', async post => {
  const { data } = await axios.post(
    'https://63ebf87a32a081172394d274.mockapi.io/contacts',
    post
  );
  console.log(data);
  return data;
});
