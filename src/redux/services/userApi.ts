import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IUser {
    id: string | number;
    name: string;
    username: string;
    city: string;
    email: string;
}

export type userFields = keyof IUser

export const userApi = createApi({
  reducerPath: "userApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/users",
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], null>({
      query: () => "/",
      providesTags: ['Users'],
    }),
    getUserById: builder.query<IUser, string | number>({
      query: (userId) => `/${userId}`,
      providesTags: ['Users'],
    }),
    addUser: builder.mutation({
      query: (userToCreate: Omit<IUser, "id">) => ({
        url: "/",
        method: 'POST',
        body: userToCreate,
      }),
      invalidatesTags: ['Users']
    }),
    updateUser: builder.mutation({
      query: (userToUpdate: IUser) => ({
        url: `/${userToUpdate.id}`,
        method: 'PATCH',
        body: userToUpdate,
      }),
      invalidatesTags: ['Users']
    }),
    deleteUser: builder.mutation({
      query: (userId: string | number) => ({
        url: `/${userId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Users']
    })
  }),
});

export const { 
  useGetUsersQuery, 
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;