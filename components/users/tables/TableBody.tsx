import React, { CSSProperties } from "react";
import { IUser } from '@/redux/services/userApi';
import { type Row } from "react-table";

interface IProps {
    rows: Row<IUser>[];
    index: number; 
    style?: CSSProperties; 
    isItemLoaded: (index: number) => boolean;
    prepareRow: (row: Row<IUser>) => void;
    totalColumnsWidth: number;
}

export default function TableBody ({ 
    rows, index, style, isItemLoaded, prepareRow, totalColumnsWidth
}: IProps)  {

      if (!isItemLoaded(index)) {
        return (
            <div className="tr">
              <div className="td">Loading...</div>
            </div>
        );
      }
        
      const row = rows[index];
      prepareRow(row);
      const { style: rowStyle, role, key } = row.getRowProps({ style });

      return (
        <div
          key={key}
          role={role}
          style={{ ...rowStyle, width: totalColumnsWidth }}
          className="tr"
          id={`table-row-${index}`}
        >
          {row.cells.map((cell, idx) => {
            return (
              <div {...cell.getCellProps()} className="td" key={idx} >
                {cell.render("Cell")}
              </div>
            );
          })}
        </div>
      );
}
  