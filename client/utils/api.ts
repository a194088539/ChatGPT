import Http from '@/utils/request'

export const send = (params: any) => {
    return Http.post('api/send_bot', params)
}



export const logins = (params: any) => {
    return Http.post('api/web_login', params)
}
export const register = (params: any) => {
    return Http.post('api/register', params)
}

export const get_message = (params: any) => {
    return Http.post('api/get_message',params)
}
export const c_message = (params: any) => {
    return Http.post('api/check_message', params)
}

export const searchs = (params: any) => {
    return Http.post('api/searchs', params)
}

export const del_msg = (params: any) => {
    return Http.post('api/del_msg', params)
}

export const update_user = (params: any) => {
    return Http.post('api/update_user', params)
}

export const get_user = () => {
    return Http.post('api/get_user')
}
export const change_password = (params: any) => {
    return Http.post('api/change_password', params)
}

export const send_email = (params: any) => {
    return Http.post('api/send_email', params)
}

export const reset_password = (params: any) => {
    return Http.post('api/reset_password', params)
}

export const alipay = (params: any) => {
    return Http.post('api/alipay', params)
}


export const wechat = (params: any) => {
    return Http.post('api/wechat', params)
}

export const get_vip_show = () => {
    return Http.post('api/get_vip_level')
}

export const ai_draw_openai = (params:any) => {
    return Http.post('api/ai_draw_openai',params)
}

export const get_me_draw = () => {
    return Http.post('api/get_me_draw')
}

export const send_public = (params:any) => {
    return Http.post('api/send_public',params)
}



export const invite_code_send = () => {
    return Http.post('api/invite_code')
}

export const kami_send = (params:any) => {
    return Http.post('api/kami_check',params)
}


export const get_nav_config = () => {
    return Http.post('api/get_setting')
}
