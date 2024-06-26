import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import publicacionesRoute from './publicacionRoute'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    ...publicacionesRoute,
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/tablero/Dashboard')),
        authority: [],
    },

    // {
    //     key: 'collapseMenu.usuario',
    //     path: '/usuario',
    //     component: lazy(() => import('@/views/demo/Usuario')),
    //     authority: [],
    // },

    // {
    //     key: 'collapseMenu.publicacion',
    //     path: '/publicacion',
    //     component: lazy(() => import('@/views/publicacion/PublicacionList')),
    //     authority: [],
    // },

    // /** Example purpose only, please remove */
    // {
    //     key: 'singleMenuItem',
    //     path: '/single-menu-view',
    //     component: lazy(() => import('@/views/demo/SingleMenuView')),
    //     authority: [],
    // },
    // {
    //     key: 'collapseMenu.item1',
    //     path: '/collapse-menu-item-view-1',
    //     component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
    //     authority: [],
    // },
    // {
    //     key: 'collapseMenu.item2',
    //     path: '/collapse-menu-item-view-2',
    //     component: lazy(() => import('@/views/demo/CollapseMenuItemView2')),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.single',
    //     path: '/group-single-menu-item-view',
    //     component: lazy(() =>
    //         import('@/views/demo/GroupSingleMenuItemView')
    //     ),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.collapse.item1',
    //     path: '/group-collapse-menu-item-view-1',
    //     component: lazy(() =>
    //         import('@/views/demo/GroupCollapseMenuItemView1')
    //     ),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.collapse.item2',
    //     path: '/group-collapse-menu-item-view-2',
    //     component: lazy(() =>
    //         import('@/views/demo/GroupCollapseMenuItemView2')
    //     ),
    //     authority: [],
    // },
]
