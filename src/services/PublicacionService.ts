import ApiService from './ApiService'
// import type {
//     SignInCredential,
//     SignUpCredential,
//     ForgotPassword,
//     ResetPassword,
//     SignInResponse,
//     SignUpResponse,
// } from '@/@types/auth'

export async function apiGetPublicaciones<T, U extends Record<string, unknown>>(params: U) {
    return ApiService.fetchData<T>({
        url: '/publicaciones',
        method: 'get',
        params,
    })
}


