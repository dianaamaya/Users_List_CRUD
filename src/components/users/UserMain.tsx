"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";
import UserList from "@/components/users/UserList";
import UserDelete from "./UserDelete";
import { useTheme } from 'styled-components'
import { useRouter } from "next/navigation";
import { Button } from "@/styles/StyledButton"
import { HeaderContainer, MainContainer, Wrapper } from "@/components/users/styles/StyledContainers";

export default function UserMain() {

  const { userToDelete } = useAppSelector((state) => state.userReducer);

  const router = useRouter();
  const theme = useTheme()

  const handleCreate = () => {
    router.push('/add')
  }

  return (
    <Wrapper>
      <HeaderContainer>
        <h1>User List</h1>
        <Button 
          $backgroundcolor={theme.buttons.backgrounds.blue} 
          onClick={handleCreate}>
            Add new
        </Button>
      </HeaderContainer>
      <MainContainer>
        <UserList />
        {
          userToDelete 
          ? (<UserDelete />)
          : null
        }  
      </MainContainer>          
    </Wrapper>
  );
}
