import { emptySplitApi } from './emptySplitApi';

const locationsApi = emptySplitApi.injectEndpoints({
	endpoints: builder => ({
		getAllLocations: builder.query({
			query: () => '/locations/all',
			providesTags: ['Locations']
		}),
	})
})

export const { useGetAllLocationsQuery } = locationsApi;