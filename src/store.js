import { configureStore } from '@reduxjs/toolkit';
import { emptySplitApi } from './api/emptySplitApi';

import navibarReducer from './components/Navibar/navibarSlice';
import assetCardReducer from './components/AssetCard/assetCardSlice';
import suggestListReducer from './components/SuggestBox/suggestBoxSlice';





export default configureStore({
  reducer: {
    route: navibarReducer,
    asset: assetCardReducer,
    suggestlists: suggestListReducer,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(emptySplitApi.middleware)
});
