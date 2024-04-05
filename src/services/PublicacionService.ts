import { FormModel } from './../views/publicacion/PublicacionForm/PublicacionForm';
import ApiService from './ApiService'
// import type {
//     SignInCredential,
//     SignUpCredential,
//     ForgotPassword,
//     ResetPassword,
//     SignInResponse,
//     SignUpResponse,
// } from '@/@types/auth'

export async function apiGetPublicaciones<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchData<T>({
        url: '/publicaciones',
        method: 'get',
        params,
    })
}

/**Si envio el objeto data lo envia en res.body
 * Si envio el objeto params lo envia en res.query
 */
export async function apiSavePublicacion<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchData<T>({
        url: '/publicaciones',
        method: 'post',
        data,
    })
}

export async function apiUploadFilePublicacion<T>(
    formData: FormData,
) {
    return ApiService.fetchData<{ imageURL: string }>({
        url: '/publicaciones/uploadFile',
        method: 'post',
        data: formData,
        //headers: { 'Content-Type': 'multipart/form-data' },
    })
}