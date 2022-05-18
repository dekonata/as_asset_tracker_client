import { emptySplitApi } from './emptySplitApi';

const assetsApi = emptySplitApi.injectEndpoints({
	endpoints: builder => ({
		getAssets: builder.query({
			query: () => '/assets/all'
		}),
		getTypeAssets: builder.query({
			query: (asset_type) => `/assets/alltype/${asset_type}`
		}),
		getAssetLists: builder.query({
			query: () => '/assets/assetlists',
			providesTags: ['Assets']
		}),
		getOneAsset: builder.query({
			query: (serialnumber) => `/assets/asset/${serialnumber}`,
			providesTags: ['Asset']
		}),
		addAsset: builder.mutation({
			query: assetData => ({
				url: '/assets/add',
				method: 'POST',
				body: assetData
			}),
			invalidatesTags: ['Assets']
		}),
		editAsset: builder.mutation({
			query: editData => ({
				url: '/assets/edit',
				method: 'PUT',
				body: editData
			}),
			invalidatesTags: ['Asset']
		})
	})
});

export const { 
	useGetAssetsQuery, 
	useGetTypeAssetsQuery,
	useGetAssetListsQuery,
	useGetOneAssetQuery,
	useAddAssetMutation,
	useEditAssetMutation 
} = assetsApi;