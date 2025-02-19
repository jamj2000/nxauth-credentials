import Link from 'next/link'
import { auth } from "@/auth"
import { logout } from '@/lib/actions'

async function Header() {
    const session = await auth();
    // console.log(session);

    return (
        <header className='bg-blue-700 text-white flex px-10 py-2 justify-between'>
            <div className='flex gap-4'>
                <Link href="/">Inicio</Link>
                {session?.user?.role === 'ADMIN'
                    ? <Link href="/admin">Admin panel</Link>
                    : ''
                }
                <Link href="/dashboard">Dashboard</Link>
            </div>
            <nav className='flex gap-4'>
                {session
                    ? <form><button formAction={logout}>Logout</button></form>
                    :
                    (<>
                        <Link href="/auth/register">Register</Link>
                        <Link href="/auth/login">Login</Link>
                    </>)
                }
            </nav>
        </header>
    )
}

export default Header