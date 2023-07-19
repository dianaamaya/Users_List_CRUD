"use client";

import React, { useCallback, useEffect, useMemo } from 'react'
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
interface IRow { original: IUser }

export default function UserList() {

  const router = useRouter();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { usersInPage, loadingUsersInPage } = useAppSelector((state) => state.userReducer);  
  const { isLoading, isFetching, data, error } = useGetUsersQuery(null);

  const showMoreData = useCallback(() => {
    if (data?.length) {
      dispatch(setUsersInPage([
        ...usersInPage,
        ...data.slice(usersInPage.length, usersInPage.length + itemsPerPage)
      ]))
    }  
  }, [data, usersInPage, dispatch])

  const sortType = (rowA: IRow, rowB: IRow, value: userFields, desc: boolean) => {
    const a = rowA.original[value].toString().toLowerCase()
    const b = rowB.original[value].toString().toLowerCase()
    if (a < b) return desc ? 1 : -1; 
    if (a > b) return desc ? -1 : 1;
    return 0;
  }

  const columns = useMemo(() => ([
      {
        Header: "Id",
        accessor: "id",
        width: 80
      },
      {
        Header: "Name",
        accessor: "name",
        sortType: sortType
      },
      {
        Header: "Username",
        accessor: "username",
        sortType: sortType
      },
      {
        Header: "Email",
        accessor: "email",
        width: 200,
        sortType: sortType
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
            $backgroundcolor={theme.buttons.backgrounds.yellow}
            onClick={() => router.push(`/edit/${row.original.id}`)}>
              Edit
          </Button>
        )
      },
      {
        Header: "Delete",
        width: "110",
        Cell: ({ row }: {row: { original: IUser }}) => (
          <Button 
            $backgroundcolor={theme.buttons.backgrounds.red}
            onClick={() => dispatch(setUserToDelete(row.original))}>
              Delete
          </Button>
        )
      }
    ]), [dispatch, router, theme.buttons.backgrounds.yellow, theme.buttons.backgrounds.red])
  
  useEffect(() => {
    if (!usersInPage?.length) {
      showMoreData()  
    }    
  }, [data, usersInPage, showMoreData])

  const fetchMoreData = () => {
    dispatch(setLoadingUsersInPage(true));
    setTimeout(() => {
      showMoreData()
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