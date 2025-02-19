import { logout } from "@/lib/actions"
import { LogOut } from "lucide-react"


function PaginaLogout() {
  return (
    <>
      <h1 className="text-3xl font-bold">Cerrar sesión</h1>
      <form>
        <button formAction={logout} className="flex gap-2">
          <LogOut /> Cerrar sesión
        </button>
      </form>
    </>
  )
}

export default PaginaLogout