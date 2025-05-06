import {lazy} from 'react'

const UserList = lazy(() => import('../pages/usuarios/UserList'))
const EditUser = lazy(() => import('../data/usuarios/EditUser'))
const CreateUser = lazy(() => import('../data/usuarios/CreateUser'))

export const usuariosRoutes = [
    // usuarios
    { path: "/userList", element: <UserList /> },
    { path: "/editUser/:id", element: <EditUser /> },
    { path: "/createUser", element: <CreateUser /> },
]