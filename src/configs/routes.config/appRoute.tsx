import { lazy } from 'react'
import { APP_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const appsRoute: Routes = [
    {
        key: 'appsPublicacion.list',
        path: `${APP_PREFIX_PATH}/publicacion/list`,
        component: lazy(() => import('@/views/publicacion/PublicacionList')),
        authority: [ADMIN, USER],
    },
]

export default appsRoute