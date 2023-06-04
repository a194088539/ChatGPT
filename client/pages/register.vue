<template>
    <div class="authentication">
        <div class="container d-flex flex-column">
            <div class="row align-items-center justify-content-center no-gutters min-vh-100">
                <div class="col-12 col-md-7 col-lg-5 col-xl-4 py-md-11">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body">

                            <h3 class="text-center">注册</h3>

                            <p class="text-center mb-6">创建一个免费账户</p>
                            <el-form
                                ref="ruleFormRef"
                                :model="ruleForm"
                                :rules="rules"
                                class="demo-ruleForm"
                                status-icon
                            >
                                <el-form-item prop="name">
                                    <div class="input-group mb-2">
                                        <input type="text" class="form-control form-control-lg"
                                               v-model="ruleForm.name"
                                               placeholder="填写您的用户名">
                                    </div>
                                </el-form-item>
                                <el-form-item prop="email">
                                        <div class="input-group mb-2">
                                            <input type="email" class="form-control form-control-lg"
                                                   v-model="ruleForm.email"
                                                   placeholder="请填写您的邮箱">
                                        </div>
                                </el-form-item>
                                <el-form-item prop="email_code">
                                    <el-col :span="16">
                                        <div class="input-group mb-2">
                                            <input type="email" class="form-control form-control-lg"
                                                   v-model="ruleForm.email_code"
                                                   placeholder="请填写您的邮箱验证码">
                                        </div>
                                    </el-col>
                                    <el-col :span="6" class="text-center">
                                        <div class="input-group mb-2 ml-2">
                                            <el-button type="primary" class="form-control form-control-lg pd-2" @click="send_code()">发送验证码</el-button>
                                        </div>

                                    </el-col>

                                </el-form-item>
                                <el-form-item prop="password">
                                    <div class="input-group mb-2">
                                        <input type="password" class="form-control form-control-lg"
                                               v-model="ruleForm.password"
                                               placeholder="填写您的密码">
                                    </div>
                                </el-form-item>
                                <el-form-item prop="invite_code">
                                    <div class="input-group mb-2">
                                        <input type="invite_code" class="form-control form-control-lg"
                                               v-model="ruleForm.invite_code"
                                               placeholder="填写您的邀请码（可选）">
                                    </div>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" :loading="reg_loading" class="register" size="large" @click="submitForm(ruleFormRef)">
                                        注册
                                    </el-button>
                                </el-form-item>
                            </el-form>


                            <p class="text-center mb-0">已经有账户了? <NuxtLink class="link" to="/login">登录</NuxtLink>.</p>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import {send_email} from "~/utils/api";
import { useCounter } from '~/store/counter'
const counter = useCounter()

useHead({
    title: '注册 - '+counter.setting.title,
    meta: [
        { name: 'description', content: counter.setting.description},
        { name: 'keywords', content: counter.setting.keywords}
    ]
})
definePageMeta({
    layout: false,
    middleware: ['auth']
})
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {ElMessage} from "element-plus";
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    name: '',
    email: '',
    password: '',
    email_code: '',
    invite_code: ''
})

const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    email_code: [
        { required: true, message: '请输入邮箱验证码', trigger: 'blur' },
    ],
})
const router = useRouter()
const reg_loading = ref(false)
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            reg_loading.value = true
            register({
                name: ruleForm.name,
                email: ruleForm.email,
                password: ruleForm.password,
                email_code: ruleForm.email_code,
                invite_code: ruleForm.invite_code
            }).then((res:any) => {
                if (res._rawValue.status==200){
                    ElMessage.success(res._rawValue.message)
                    formEl.resetFields()
                    router.push({path:'/login'})
                    reg_loading.value = false
                }

            }).catch((err:any) => {
                reg_loading.value = false
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}

const send_code = () => {
    if (ruleForm.email==''){
        ElMessage.error('请填写邮箱')
        return
    }
    send_email({
        email: ruleForm.email
    }).then((res:any) => {
        if (res._rawValue.status==200){
            ElMessage.success(res._rawValue.message)
        }
    }).catch((err:any) => {
        console.log(err)
    })
}
</script>

<style scoped>

</style>
