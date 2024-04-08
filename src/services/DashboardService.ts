import ApiService from './ApiService'

/**@TODO Cambiar para que traiga informacion de dashboard */

export async function apiGetDataDashboard<T>() {
    return ApiService.fetchData<T>({
        url: '/publicaciones',
        method: 'get',
    })
}
