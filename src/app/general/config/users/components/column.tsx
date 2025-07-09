'use client'
import { ColumnDef, Row } from '@tanstack/react-table'
import React from 'react'
import { IUserColumn } from '../../../../../lib/models/users'
import { UserOptionsCell } from './user-options'

export const columns: ColumnDef<IUserColumn>[] = [
  { accessorKey: 'id', header: 'Id' },
  { accessorKey: 'username', header: 'Usuario' },
  { accessorKey: 'name', header: 'Nombre' },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }: { row: Row<IUserColumn> }): React.JSX.Element => {
      const status: boolean = row.getValue('status')
      const formatted = status ? 'Activo' : 'Inactivo'
      return (
        <div
          className={`font-medium w-auto px-2  py-1 rounded-md  ${
            status ? 'text-primary' : 'text-destructive'
          }`}
        >
          {formatted}
        </div>
      )
    },
  },
  {
    id: 'actions',
    header: 'Opciones',
    cell: ({ row }: { row: Row<IUserColumn> }): React.JSX.Element => {
      return <UserOptionsCell row={row} />
    },
  },
]
