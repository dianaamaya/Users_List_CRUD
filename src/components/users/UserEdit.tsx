"use client"

import React from 'react'
import UserForm, { FormValuesType } from './forms/UserForm'
import { useGetUserByIdQuery, useUpdateUserMutation } from '@/redux/services/userApi'
import { setUsersInPage } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from 'react-hot-toast'
import NoFound from '../notFound/NotFound'

interface IProps {
  userId: string;  
}

export default function UserEdit({ userId }: IProps) {

  const { isLoading, isFetching, data, error } = useGetUserByIdQuery(userId);

  const [updateUser] = useUpdateUserMutation()
  const dispatch = useAppDispatch();
  const { usersInPage } = useAppSelector((state) => state.userReducer);

  const handleSubmit = async (user: FormValuesType) => {
    const newUser = {
      ...user,
      id: userId
    }
    const result = await updateUser(newUser)

    if ("error" in result) {
      toast.error("User could not be updated")
    } else {
      const editedUsers = [...usersInPage].map((user) => 
        (result.data.id !== user.id ? user : result.data))
      dispatch(setUsersInPage([ ...editedUsers]))
      toast.success("User updated successfully");     
    }
  }

  if (isLoading || isFetching) return (<p>Loading...</p>)
  if (error) return (<NoFound />)

  return (
    <UserForm title="Edit User" initialValues={data}  handleCustomSubmit={handleSubmit} />
  )
}
