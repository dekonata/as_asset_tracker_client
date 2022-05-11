import { emptySplitApi } from './emptySplitApi';

const staffApi = emptySplitApi.injectEndpoints({
	endpoints: builder => ({
		getStaffLists: builder.query({
			query: () => '/staff/stafflists',
			providesTags: ['Staff']
		}),
		addStaff: builder.mutation({
			query: staffData => ({
				url: '/staff/add',
				method: 'POST',
				body: staffData
			}),
			invalidatesTags: ['Staff']
		})
	})
})

export const { useGetStaffListsQuery, useAddStaffMutation } = staffApi;