"use client"

import React from 'react'
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import { IUser } from '@/redux/services/userApi';
import { useTheme } from 'styled-components'
import { Button, ButtonsContainer } from "@/styles/StyledButton"
import { HeaderContainer, MainContainer, Wrapper } from "@/components/users/styles/StyledContainers";
import { ItemFormContainer, Input, Label, ErrorMessage } from "@/styles/StyledForm";

export type FormValuesType = Omit<IUser, "id">

interface IFormItem {
  name: "name" | "username" | "city" | "email";
  validations: {
    required: boolean;
    maxLength: number;
    pattern?: any;
    patternMessage?: Array<string>;
  }
}

const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const validUsernameRegex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
const usernamePatternMessage = ['8-20 characters long', 'Not _ or . at the beginning nor at the end', 'Only letters or numbers or _ or .', 'No . and _ together']
const FormItems: IFormItem[] = [
  { name: 'name', validations: { required: true, maxLength: 50 }},
  { name: 'username', validations: { required: true, maxLength: 50, pattern: validUsernameRegex, patternMessage: usernamePatternMessage }},
  { name: 'email', validations: { required: true, maxLength: 50, pattern: validEmailRegex }},
  { name: 'city', validations: { required: true, maxLength: 50 }},
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
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValuesType>({
    defaultValues: initialValues
  })

  const onSubmit = handleSubmit((data) => {
    handleCustomSubmit(data)
    reset()
    router.push("/home")
  })

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    reset()
    router.push("/home")
  }

  return (<Wrapper maxwidth={600}>
    <form onSubmit={onSubmit}>
      <HeaderContainer>
        <h2>{title}</h2>
      </HeaderContainer>    

      <MainContainer>

        {
          FormItems?.map((item) => {
            
            const currentError = errors[item.name]
            return (<div key={item.name}>
            <ItemFormContainer>
              <Label htmlFor={`input-${item.name}`}>{item.name}</Label>
              <Input
                id={`input-${item.name}`}
                type="text"
                placeholder={`Write the ${item.name}...`}
                {...register(item.name, item.validations)}
              />
            </ItemFormContainer>
            {currentError && currentError.type === 'required' && (
              <ErrorMessage>
                * Field '{item.name}' is required
              </ErrorMessage>
            )}
            {currentError && currentError.type === 'maxLength' && (
              <ErrorMessage>
                * Max length exceeded (50 characters)
              </ErrorMessage>
            )}
            {currentError && currentError.type === 'pattern' && (
              <ErrorMessage>
                * Enter a valid {item.name} 
                {
                  item.validations.patternMessage?.map((item, idx) => (
                      <div key={idx}>* {item}</div>
                  ))
                }
              </ErrorMessage>
            )}
          </div>)})
        }        

        <ButtonsContainer margintop={60}>
          <Button 
              backgroundcolor={theme.buttons.backgrounds.white} 
              color={theme.buttons.colors.red} 
              bordercolor={theme.buttons.colors.red}
              onClick={onCancel}>
                Cancel
          </Button>
          <Button 
              backgroundcolor={theme.buttons.backgrounds.green} 
              type="submit">
                Submit
          </Button>
        </ButtonsContainer> 

      </MainContainer>  

    </form>
  </Wrapper>)
}
