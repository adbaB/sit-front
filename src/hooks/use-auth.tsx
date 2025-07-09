import React from 'react'
import { redirect } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { authenticate } from '../lib/services/authenticate'
import { Autenticate, LoginResponse } from '../lib/models/authenticate'
import { usePermissions } from '../app/context/permission.context'

interface IuseAuth {
  form: UseFormReturn<
    {
      username: string
      password: string
    },
    unknown,
    undefined
  >
  onSubmit: (Autenticate: Autenticate) => Promise<void>
  pending: boolean
}

export function useAuth(): IuseAuth {
  const [pending, setPending] = React.useState<boolean>(false)
  const { setPermissions } = usePermissions()
  const formSchema = z.object({
    username: z
      .string({ message: 'Username is required' })
      .min(2, { message: 'Name must be at least 2 characters long.' }),
    password: z.string({ message: 'Password is required' }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
  ): Promise<void> => {
    setPending(true)
    const response = await authenticate({
      username: values.username,
      password: values.password,
    })

    if (!response || response.status === 401) {
      form.setError('username', {
        message: 'Invalid username or password',
      })
    }
    if (response?.status === 200) {
      const { data } = response as LoginResponse
      setPermissions(data.permissions)
    }
    setPending(false)
    redirect('/general')
  }

  return {
    form,
    onSubmit,
    pending,
  }
}
