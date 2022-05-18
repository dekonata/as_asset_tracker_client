import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'http://localhost:5000/v1';

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_URL}),
  tagTypes: [
      'Assets', 
      'Asset', 
      'Accessories',
      'Accessory',
      'Cabinets',
      'Locations',
      'Onestaff',
      'Shelves', 
      'Staff', 
      'Transfers', 
    ],
  endpoints: () => ({}),
})

export default emptySplitApi;