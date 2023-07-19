"use client"

import React, { useMemo } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useRouter } from "next/navigation";
import { IUser, userFields } from '@/redux/services/userApi';
import { useTheme } from 'styled-components'
import { Button, ButtonsContainer } from "@/styles/StyledButton"
import { HeaderContainer, MainContainer, Wrapper } from "@/components/users/styles/StyledContainers";
import { ItemFormContainer, Input, Label, ErrorMessage } from "@/styles/StyledForm";

export type FormValuesType = Omit<IUser, "id">

interface IFormItem {
  name: Exclude<userFields, "id">;
  validations?: {
    required: boolean;
    maxLength: number;
    pattern?: any;
    patternMessage?: Array<string>
  }
}

const FormItems: IFormItem[] = [
  { name: 'name'},
  { name: 'username'},
  { name: 'email' },
  { name: 'city' },
]

interface IProps {
  title?: string;
  initialValues?: FormValuesType;
  handleCustomSubmit: (data: FormValuesType) => void;
}

const defaultValues = {
  name: '',
  username: '',
  email: '',
  city: ''
}

export default function UserForm({ 
  title ='Add User', 
  initialValues= defaultValues,
  handleCustomSubmit
}: IProps) {

  const theme = useTheme()
  const router = useRouter()

  const validationSchema = useMemo(() => Yup.object()
  .shape({
    name: Yup.string().trim()
      .required('Name is required')
      .max(40, 'Name must not exceed 40 characters'),
    username: Yup.string().trim()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters')
      .matches(/^[a-zA-Z0-9._]+$/ , 'Only letters or numbers or _ or .')
      .matches(/^(?!.*[_.]{2})/ , 'No . and _ together')
      .matches(/^(?=[a-zA-Z0-9._])[^_.].*[^_.]$/ , 'Not _ or . at the beginning nor at the end'),
    email: Yup.string().trim()
      .required('Email is required')
      .email('Email is invalid'),
    city: Yup.string().trim()
      .required('City is required')
      .max(40, 'City must not exceed 40 characters'),
  }), [])
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValuesType>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues
  })

  const onSubmit = handleSubmit((data) => {
    handleCustomSubmit(validationSchema.cast(data))
    reset()
    router.push("/home")
  })

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    reset()
    router.push("/home")
  }

  return (<Wrapper $maxwidth={600}>
    <form onSubmit={onSubmit}>
      <HeaderContainer>
        <h2>{title}</h2>
      </HeaderContainer>    

      <MainContainer>

        {
          FormItems?.map((item) => (<div key={item.name}>
            <ItemFormContainer>
              <Label htmlFor={`input-${item.name}`}>{item.name}</Label>
              <Input
                id={`input-${item.name}`}
                type="text"
                placeholder={`Write the ${item.name}...`}
                {...register(item.name, item.validations)}
              />
            </ItemFormContainer>
            {errors[item.name] && (
              <ErrorMessage>
                * {errors[item.name]?.message || 'Invalid format'}
              </ErrorMessage>
            )}
          </div>))
        }        

        <ButtonsContainer $margintop={60}>
          <Button 
              $backgroundcolor={theme.buttons.backgrounds.white} 
              $color={theme.buttons.colors.red} 
              $bordercolor={theme.buttons.colors.red}
              onClick={onCancel}>
                Cancel
          </Button>
          <Button 
              $backgroundcolor={theme.buttons.backgrounds.green} 
              type="submit">
                Submit
          </Button>
        </ButtonsContainer> 

      </MainContainer>  

    </form>
  </Wrapper>)
}
