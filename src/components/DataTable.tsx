
import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import type { MRT_ColumnDef } from 'material-react-table';
import { Loan } from '../types';

function DataTable(props:any) {
  const { data } = props;
  const columns = useMemo<MRT_ColumnDef<Loan>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
      },
      {
        accessorKey: 'apr',
        header: 'APR',
      },
      {
        accessorKey: 'term',
        header: 'Term',
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'owner_id',
        header: 'Owner ID',
      },
    ],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
    />
  )
}

export default DataTable;
