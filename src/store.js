import { configureStore } from '@reduxjs/toolkit';
import { emptySplitApi } from './api/emptySplitApi';

import navibarReducer from './components/Navibar/navibarSlice';
import assetCardReducer from './components/AssetCard/assetCardSlice';
import accessoryCardReducer from './components/AccessoryCard/accessoryCardSlice';
import staffCardReducer from './components/StaffCard/staffCardSlice';
import suggestListReducer from './components/SuggestBox/suggestBoxSlice';





export default configureStore({
  reducer: {
    route: navibarReducer,
    asset: assetCardReducer,
    accessory: accessoryCardReducer,
    staff: staffCardReducer,
    suggestlists: suggestListReducer,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(emptySplitApi.middleware)
});
