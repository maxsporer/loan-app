
import React from 'react';
import MaterialReactTable from 'material-react-table';

function DataTable(props:any) {
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
