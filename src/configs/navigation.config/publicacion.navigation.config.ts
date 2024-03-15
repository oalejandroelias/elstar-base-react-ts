import { APP_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const publicacionNavigationConfig: NavigationTree[] = [
    {
        key: 'publicaciones',
        path: '',
        title: 'PUBLICACIONES',
        translateKey: '',
        icon: 'pages',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [ADMIN, USER],
        subMenu: [
            {
                key: 'appsPublicacion.list',
                path: `${APP_PREFIX_PATH}/publicacion/publicacion-list`,
                title: 'Publicaciones',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            // {
            //     key: 'appsPublicacion.publicacionNew',
            //     path: `${APP_PREFIX_PATH}/publicacion/publicacion-new`,
            //     title: 'New Product',
            //     translateKey: 'nav.appsSales.productNew',
            //     icon: '',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN, USER],
            //     subMenu: [],
            // },

        ],
    },
]

export default publicacionNavigationConfig
