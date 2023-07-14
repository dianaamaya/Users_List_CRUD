import React from 'react'

interface IProps {
    itemsInPage: number;
    totalItems: number;
    isNextPageLoading: boolean;
    loadMoreItems: () => void
}

export default function TableFooter({ itemsInPage, totalItems, isNextPageLoading, loadMoreItems}: IProps) {
  return (
    <div className="footer">
        {isNextPageLoading ? (
            "Loading more items..."
          ) : (
            <>
              Showing {itemsInPage} of {totalItems}.{" "}
              {
                itemsInPage < totalItems  ? (<span onClick={loadMoreItems}>Load more items</span>) : null
              }              
            </>
          )}
    </div>
  )
}
