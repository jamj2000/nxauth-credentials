'use client'
import { useActionState } from 'react';
import { login } from '@/lib/actions'


export function LoginForm() {
    const [state, action, pending] = useActionState(login, {})

    return (
        <div className="border-2 border-slate-400 rounded-md mx-auto w-fit p-8 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Iniciar sesión</h1>
            <form action={action} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4'>
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

                <button type="submit" disabled={pending}  className="px-4 py-2 bg-blue-300">
                    {pending ? 'Iniciando sessión...' : 'Iniciar sessión'}
                </button>
            </form>
        </div>

    );
};