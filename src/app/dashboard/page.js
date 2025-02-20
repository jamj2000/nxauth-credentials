import { auth } from "@/auth"

async function PaginaDashboard() {
    const session = await auth()

    if (session)
        return (
            <>  <h1 className="text-3xl font-bold"> 🔑 </h1>
                <h1 className="text-3xl font-bold">Dashboard</h1 >
                <p> {session?.user.name}</p>
                <p> {session?.user.email} </p>
                <p> {session?.user.role} </p>
                <img src={session?.user.image}></img>
            </>)
    else
        return <h2 className="text-2xl text-red-400 font-bold"> No has iniciado sessión</h2>
}

export default PaginaDashboard