import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IUserColumn } from '../../../../../lib/models/users'
import { Row } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import React from 'react'

interface UserOptionsCellProps {
  row: Row<IUserColumn>
}
export function UserOptionsCell({
  row,
}: UserOptionsCellProps): React.JSX.Element {
  const [open, setOpen] = React.useState<boolean>(false)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuItem>
          {row.original.status ? 'Inactiva' : 'Activar'}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              Editar Usuario
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear Formato</DialogTitle>
              </DialogHeader>
              <>
                <h3>{row.original.name}</h3>
              </>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
        <DropdownMenuItem>Eliminar Area</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
