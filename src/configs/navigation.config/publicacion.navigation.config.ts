import { APP_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const publicacionNavigationConfig: NavigationTree[] = [
    {
        key: 'publicaciones',
        path: '',
        title: 'PUBLICACIONES',
        translateKey: 'nav.publicaciones.publicaciones',
        icon: 'pages',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [
            {
                key: 'appsPublicacion.list',
                path: `/publicacion`,
                title: 'Publicaciones',
                translateKey: 'apps.publicacion.list',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            }
        ],
    },
]

export default publicacionNavigationConfig
