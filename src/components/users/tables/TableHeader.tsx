import { IUser } from "@/redux/services/userApi"
import { type HeaderGroup} from "react-table";

interface IProps {
    totalColumnsWidth: number;
    headerGroups: HeaderGroup<IUser>[];
}

export default function TableHeader ({ totalColumnsWidth, headerGroups }: IProps) {

  const getProperties = (column: any) => {   
    const properties = {...column.getHeaderProps(column.getSortByToggleProps())}
    delete properties.key;
    return properties
  }

    return (
        <div className="header">
            <div style={{ width: totalColumnsWidth }}>
                {
                  headerGroups.map((headerGroup, idx) => (
                    <div {...headerGroup.getHeaderGroupProps()}
                        key={idx}
                        className="tr" >
                        {
                            headerGroup.headers.map((column: any, index) => (
                              <div key={index} 
                                {...getProperties(column)}                                
                                className="th"  >
                                <span>
                                  {column.render("Header")}
                                </span>                                
                                <span className={`icon${column.isSorted ? ' sorted' : ''}`}>
                                  {
                                    column.isSorted
                                    ? column.isSortedDesc ? " 🔽" : " 🔼"
                                    : column.canSort ? " ▾" : ""
                                  }
                                </span>
                              </div>
                            ))
                        }
                    </div>
                  ))}
            </div>
        </div>
    )
  }