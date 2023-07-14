"use client"

import React from 'react'
import UserForm from './forms/UserForm'
import { FormValuesType } from './forms/UserForm'
import { useAddUserMutation } from '@/redux/services/userApi'
import { toast } from 'react-hot-toast'

export default function UserCreate() {

  const [addUser] = useAddUserMutation()

  const handleSubmit = async (newUser: FormValuesType) => {
    const result = await addUser ({...newUser})
    
    if ("error" in result) {
      toast.error("User could not be created")
    } else {
      toast.success("User created successfully");     
    }
  }

  return (
    <UserForm handleCustomSubmit={handleSubmit} />  
  )
}
