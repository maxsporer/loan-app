
import React from 'react';
import MaterialReactTable from 'material-react-table';

interface DataTableProps {
  data: any;
  columns: any;
};

/**
 * Creates a table given data and column
 * @param props DataTableProps
 * @returns Material React Table Element
 */
function DataTable(props: DataTableProps) {
  const { data, columns } = props;

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableFullScreenToggle={false}
    />
  )
}

export default DataTable;
