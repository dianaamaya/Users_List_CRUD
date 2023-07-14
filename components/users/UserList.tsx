"use client";

import React, { useEffect, useMemo } from 'react'
import { useGetUsersQuery, userFields } from "@/redux/services/userApi";
import { Styles } from './tables/StyledTable'
import { IUser } from '@/redux/services/userApi';
import Table from './tables/Table'
import { setUserToDelete, setUsersInPage, setLoadingUsersInPage } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { Button } from "@/styles/StyledButton"
import { useTheme } from 'styled-components'

const itemsPerPage = 20

export default function UserList() {

  const router = useRouter();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { usersInPage, loadingUsersInPage } = useAppSelector((state) => state.userReducer);  
  const { isLoading, isFetching, data, error } = useGetUsersQuery(null);

  const showMoreData = () => {
    if (data?.length) {
      dispatch(setUsersInPage([
        ...usersInPage,
        ...data.slice(usersInPage.length, usersInPage.length + itemsPerPage)
      ]))
    }  
  }

  const handleEdit = (user: IUser) => {
    router.push(`/edit/${user.id}`)
  }

  const handleDelete = (user: IUser) => {
    dispatch(setUserToDelete(user))
  }

  type IRow = { original: IUser }

  const sortType = (rowA: IRow, rowB: IRow, value: userFields, desc: boolean) => {
    const a = rowA.original[value].toString().toLowerCase()
    const b = rowB.original[value].toString().toLowerCase()
    if (a < b) return desc ? 1 : -1; 
    if (a > b) return desc ? -1 : 1;
    return 0;
  }

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
        width: 80
      },
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email",
        width: 200
      },
      {
        Header: "City",
        accessor: "city",
        sortType: sortType
      },
      {
        Header: "Edit",
        width: "110",
        Cell: ({ row }: {row: { original: IUser }}) => (
          <Button
            backgroundcolor={theme.buttons.backgrounds.yellow}
            onClick={() => handleEdit(row.original)}>
              Edit
          </Button>
        )
      },
      {
        Header: "Delete",
        width: "110",
        Cell: ({ row }: {row: { original: IUser }}) => (
          <Button 
            backgroundcolor={theme.buttons.backgrounds.red}
            onClick={() => handleDelete(row.original)}>
              Delete
          </Button>
        )
      }
    ],
    []
  );

  useEffect(() => {
    showMoreData()  
  }, [data])

  const fetchMoreData = () => {
    dispatch(setLoadingUsersInPage(true));
    setTimeout(() => {
      showMoreData();
      dispatch(setLoadingUsersInPage(false));
    }, 500);
  };

  const hasNextPage = useMemo(() => {
    return usersInPage?.length <= (data?.length ?? 0)
  }, [usersInPage, data]);

  if (isLoading || isFetching) return (<p>Loading...</p>)

  return (
    <Styles>
      <Table
        columns={columns}
        data={usersInPage}
        update={fetchMoreData}
        hasNextPage={hasNextPage}
        isNextPageLoading={loadingUsersInPage}
        totalItems={data?.length ?? 0}
        dataError={!!error}
      />
    </Styles>
  );
}