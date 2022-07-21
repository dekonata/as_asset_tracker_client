import { emptySplitApi } from './emptySplitApi';

const loginApi = emptySplitApi.injectEndpoints({
	endpoints: builder => ({
		loginUser: builder.mutation({
			query: loginData => ({
				url: '/auth/local',
				method: 'POST',
				body: loginData
			}),
			invalidatesTags: ['User']
		}),
	})
})


export const { useLoginUserMutation } = loginApi;