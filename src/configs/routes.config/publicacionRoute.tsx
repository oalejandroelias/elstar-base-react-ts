import { lazy } from 'react'
import { APP_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const publicacionesRoute: Routes = [
    {
        key: 'appsPublicacion.list',
        path: `${APP_PREFIX_PATH}/publicacion/publicacion-list`,
        component: lazy(() => import('@/views/publicacion/PublicacionList')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsPublicacion.publicacionEdit',
        path: `${APP_PREFIX_PATH}/publicacion/publicacion-edit/:Id`,
        component: lazy(() => import('@/views/publicacion/PublicacionEdit')),
        authority: [ADMIN, USER],
        meta: {
            header: 'Editar Publiacion',
        },
    },
    {
        key: 'appsPublicacion.publicacionNew',
        path: `${APP_PREFIX_PATH}/publicacion/publicacion-new`,
        component: lazy(() => import('@/views/publicacion/PublicacionNew')),
        authority: [ADMIN, USER],
        meta: {
            header: 'Nueva Publicación',
        },
    },
]

export default publicacionesRoute