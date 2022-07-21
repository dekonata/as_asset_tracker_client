import { emptySplitApi } from './emptySplitApi';

const userApi = emptySplitApi.injectEndpoints({
	endpoints: builder => ({
		loginUser: builder.mutation({
			query: loginData => ({
				url: '/accessories/edit',
				method: 'POST',
				body: loginData
			}),
		})
	})
});

export const {
	useLoginUserMutation,
} = userApi;
