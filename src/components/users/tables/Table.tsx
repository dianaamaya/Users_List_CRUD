import React, { useCallback, CSSProperties } from 'react'
import { useTable, useBlockLayout, useSortBy, useRowSelect, type Row } from 'react-table'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import { useSticky } from 'react-table-sticky'
import { IUser } from '@/redux/services/userApi'
import TableBody from './TableBody'
import TableHeader from './TableHeader'
import TableFooter from './TableFooter'
import TableMessage from './TableMessage'

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any
  data: IUser[]
  update: () => void
  hasNextPage: boolean
  isNextPageLoading: boolean
  totalItems: number
  dataError: boolean
}

const defaultColumn = {
  minWidth: 30,
  width: '180',
  maxWidth: 200,
}

export default function Table({
  columns,
  data,
  update,
  hasNextPage,
  isNextPageLoading,
  totalItems,
  dataError,
}: IProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, totalColumnsWidth } =
    useTable({ columns, data, defaultColumn }, useSortBy, useRowSelect, useBlockLayout, useSticky)

  const itemCount = hasNextPage ? rows.length + 1 : rows.length
  const loadMoreItems = isNextPageLoading ? () => {} : update
  const isItemLoaded = useCallback(
    (index: number) => !hasNextPage || index < rows.length,
    [hasNextPage, rows],
  )

  const RenderRow = React.useCallback(
    (rows: Row<IUser>[]) =>
      ({ index, style }: { index: number; style?: CSSProperties }) => {
        return (
          <TableBody
            rows={rows}
            index={index}
            style={style}
            isItemLoaded={isItemLoaded}
            prepareRow={prepareRow}
            totalColumnsWidth={totalColumnsWidth}
          />
        )
      },
    [prepareRow, isItemLoaded, totalColumnsWidth],
  )

  return (
    <div {...getTableProps()} className='table sticky'>
      <div style={{ position: 'relative', flex: 1, zIndex: 0 }}>
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <FixedSizeList
              height={500}
              itemCount={rows.length}
              itemSize={58}
              width={'fit-content'}
              onItemsRendered={onItemsRendered}
              ref={ref}
              innerElementType={({ children, style, ...rest }) => (
                <>
                  <TableHeader totalColumnsWidth={totalColumnsWidth} headerGroups={headerGroups} />

                  <div style={{ position: 'relative' }} className='body'>
                    <div {...getTableBodyProps()} {...rest} style={style}>
                      {dataError || !rows.length ? (
                        <TableMessage dataError={dataError} />
                      ) : (
                        children
                      )}
                    </div>
                  </div>
                </>
              )}
            >
              {RenderRow(rows)}
            </FixedSizeList>
          )}
        </InfiniteLoader>
      </div>
      <TableFooter
        itemsInPage={rows.length}
        totalItems={totalItems}
        isNextPageLoading={isNextPageLoading}
        loadMoreItems={loadMoreItems}
      />
    </div>
  )
}
