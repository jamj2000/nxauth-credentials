'use client'
import { useActionState, useEffect } from 'react';
import { register } from '@/lib/actions'
import { redirect } from 'next/navigation';

export function RegisterForm() {

    const [state, action, pending] = useActionState(register, {})

    useEffect(() => {
        if (state?.success) redirect('/auth/signin')
    }, [state])


    return (
        <div className="border-2 border-slate-400 rounded-md mx-auto w-fit p-8 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Registro</h1>
            <form action={action} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4'>
                    <label>Nombre
                        <input type='text' name='name'
                            placeholder="John Doe"
                            className='block'
                        />
                    </label>
                    <label>Email
                        <input type='email' name='email'
                            placeholder="john.doe@example.com"
                            className='block'
                        />
                    </label>
                    <label>Password
                        <input type="password" name='password'
                            placeholder="******"
                            className='block'
                        />
                    </label>

                    <p className={state?.success ? 'success' : 'hidden'}> {state.success} </p>
                    <p className={state?.error ? 'error' : 'hidden'}> {state.error} </p>
                </div>

                <button type="submit" disabled={pending} className="px-4 py-2 bg-blue-300" >
                    {pending ? 'Creando cuenta...' : 'Crear cuenta'}
                </button>
            </form>
        </div>

    );
};