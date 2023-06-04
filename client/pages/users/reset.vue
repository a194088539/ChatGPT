<template>
    <div class="authentication">
        <div class="container d-flex flex-column">
            <div class="row align-items-center justify-content-center no-gutters min-vh-100">
                <div class="col-12 col-md-7 col-lg-5 col-xl-4 py-md-11">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body">

                            <h3 class="text-center">重置密码</h3>

                            <p class="text-center mb-6">
                                请在下面输入你的电子邮件地址，并且发送验证码到你的邮箱。
                            </p>

                            <el-form
                                ref="ruleFormRef"
                                :model="ruleForm"
                                :rules="rules"
                                class="demo-ruleForm"
                                status-icon
                            >

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

                                <el-form-item prop="password">
                                    <div class="input-group mb-2">
                                        <input type="password" class="form-control form-control-lg"
                                               v-model="ruleForm.password_c"
                                               placeholder="确认您的密码">
                                    </div>
                                </el-form-item>

                                <el-form-item>
                                    <el-button type="primary" :loading="pass_loading" class="register" size="large" @click="submitForm(ruleFormRef)">
                                        重置密码
                                    </el-button>
                                </el-form-item>
                            </el-form>

                            <p class="text-center mb-0">已经有账户了？<NuxtLink class="link" to="/login">登录</NuxtLink>.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {reset_password, send_email} from "~/utils/api";
import { useCounter } from '~/store/counter'
const counter = useCounter()

useHead({
    title: '重置密码 - '+counter.setting.title,
    meta: [
        { name: 'description', content: counter.setting.description},
        { name: 'keywords', content: counter.setting.keywords}
    ]
})
definePageMeta({
    layout: false
})
import type { FormInstance, FormRules } from 'element-plus'
import { ref,reactive } from 'vue'
import {ElMessage} from "element-plus";
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    email: '',
    email_code: '',
    password: '',
    password_c: ''
})
const rules = reactive<FormRules>({
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ],
    email_code: [
        { required: true, message: '请输入邮箱验证码', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 8, message: '密码长度不能小于8位', trigger: 'blur' },
    ],
    password_c: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        { min: 8, message: '密码长度不能小于8位', trigger: 'blur' },
    ],
})
const router = useRouter()
const pass_loading = ref(false)
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            if (ruleForm.password!=ruleForm.password_c){
                ElMessage.error('两次密码不一致')
                return
            }
            pass_loading.value = true
            reset_password({
                email: ruleForm.email,
                email_code: ruleForm.email_code,
                password: ruleForm.password,
            }).then((res:any) => {
                if (res._rawValue.status==200){
                    ElMessage.success(res._rawValue.message)
                    formEl.resetFields()
                    router.push({path:'/login'})
                    pass_loading.value = false
                }

            }).catch((err:any) => {
                pass_loading.value = false
                ElMessage.error(err.message)
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
        ElMessage.error(err.message)
    })
}
</script>

<style scoped>

</style>
