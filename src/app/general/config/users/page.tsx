import React from 'react'
import { DataTable } from '../../../../utils/data-table'
import { columns } from './components/column'

const data = [
  {
    id: 1,
    username: 'johndoe',
    name: 'John Doe',
    status: 'Active',
    role: 'Admin',
  },
  {
    id: 2,
    username: 'janedoe',
    name: 'Jane Doe',
    status: 'Inactive',
    role: 'User',
  },
]

export default function Users(): JSX.Element {
  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  )
}
