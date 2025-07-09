'use client'
import React from 'react'

interface PermissionContextType {
  children: React.ReactNode
}

interface PermissionContextProps {
  permissions: number[]
  setPermissions: React.Dispatch<React.SetStateAction<number[]>>
}

const PermissionContext = React.createContext({} as PermissionContextProps)
export const usePermissions = (): Readonly<PermissionContextProps> => {
  return React.useContext(PermissionContext)
}
export function PermissionProvider({
  children,
}: PermissionContextType): JSX.Element {
  const [permissions, setPermissions] = React.useState([] as number[])

  return (
    <PermissionContext.Provider value={{ permissions, setPermissions }}>
      {children}
    </PermissionContext.Provider>
  )
}
