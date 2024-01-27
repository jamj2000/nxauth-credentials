'use server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signIn, signOut } from '@/auth';


export async function register(formData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    // Comprobamos si el usuario ya está registrado
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (user) {
        return { error: 'El email ya está registrado' }
    }

    // Encriptamos password 
    const hashedPassword = await bcrypt.hash(password, 10)

    // Guardamos credenciales en base datos
    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return { success: "Registro correcto" }
}



export async function login(formData) {
    const email = formData.get('email')
    const password = formData.get('password')

    // Comprobamos si el usuario está registrado
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        return { error: 'Usuario no registrado.' }
    }

    // Comparamos password 
    const matchPassword = await bcrypt.compare(password, user.password)

    if (user && matchPassword) {  // && user.emailVerified
        if (user.role === 'ADMIN')
            await signIn('credentials', { email, password, redirectTo: '/admin' })
        else 
            await signIn('credentials', { email, password, redirectTo: '/dashboard' })
        // return { success: "Inicio de sesión correcto" }
    } else {
        return { error: 'Credenciales incorrectas.' }
    }
}

export async function logout () {
    await signOut({ redirectTo: '/about' });
}