/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import {useTable} from 'react-table';

const Tabla = ({columns, data, className}) => {
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    useTable({columns, data});

  return (
    <div className={`h-[380px] overflow-auto ${className}`}>
      <table {...getTableProps()} className="w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th
                  {...column.getHeaderProps()}
                  className={`p-1 ${
                    index === headerGroup.headers.length - 1 ? '' : 'border-r'
                  } font-bold text-left text-white text-sm bg-secondary-1000`}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, index) => (
                  <td
                    {...cell.getCellProps()}
                    className={`border-t-2 p-1 text-center text-black  ${
                      index === row.cells.length - 1 ? '' : 'border-r '
                    }`}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Tabla;
