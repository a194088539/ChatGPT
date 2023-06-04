<template>
    <div class="sidebar border-end py-xl-4 py-3 px-xl-4 px-3">
        <div class="tab-content">

            <div class="tab-pane fade show active" id="nav-tab-user" role="tabpanel">

                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h4 class="mb-0 text-primary">Profile</h4>
                    <div>
                        <div @click="sigt_out()" title="" class="btn btn-dark">退出登录</div>
                    </div>
                </div>

                <div class="card border-0 text-center pt-3 mb-4">
                    <div class="card-body">
                        <div class="card-user-avatar">
                            <img :src="me_info.avatar" alt="avatar" class="avatar-150">
                            <el-upload
                                class="avatar-uploader"
                                :action="actions"
                                :show-file-list="false"
                                :headers="{'Authorization': 'Bearer ' + token}"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                            >
                                <button type="button" class="btn btn-primary btn-sm"><i class="zmdi zmdi-edit"></i></button>
                            </el-upload>
                        </div>
                        <div class="card-user-detail mt-4">
                            <h5>{{ me_info.name }}</h5>
                            <span class="text-muted"><div class="__cf_email__">{{ me_info.email }}</div></span>
                            <p>{{ me_info.phone }}</p>
                            {{ me_info.description }}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
    <div class="main px-xl-5 px-lg-4 px-3 overflow-auto">

        <div class="main-body">

            <div class="body-header border-bottom py-xl-3 py-2">
                <div class="container px-0">
                    <div class="row align-items-center">

                        <div class="col-12">
                            <div class="media">
                                <div class="avatar sm">
                                    <NuxtLink to="/" title="" class="link"><i
                                        class="zmdi zmdi-arrow-left zmdi-hc-lg"></i></NuxtLink>
                                </div>
                                <div class="media-body overflow-hidden">
                                    <div class="d-flex align-items-center mb-1">
                                        <h6 class="fw-bold text-truncate mb-0 me-auto">设置</h6>
                                    </div>
                                    <div class="text-truncate">修改用户配置信息</div>
                                </div>
                                <div  @click="sigt_out()"  class="hide-btn btn btn-dark sidebar-toggle-btn">退出</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="body-page d-flex py-xl-3 py-2">
                <div class="container px-0">

                    <div class="row">
                        <div class="col-12">
                            <ul class="nav nav-tabs nav-overflow page-header-tabs mb-4 mt-md-5 mt-3">
                                <li class="nav-item" @click="change_set('me')"><a class="nav-link" :class="c_change=='me'?'active':''" data-toggle="tab"
                                                        href="javascript:;" role="tab">个人信息</a></li>
                                <li class="nav-item" @click="change_set('wallet')"><a class="nav-link" :class="c_change=='wallet'?'active':''" data-toggle="tab" href="javascript:;"
                                                        role="tab">钱包</a></li>
                                <li class="nav-item" @click="change_set('pass')"><a class="nav-link" :class="c_change=='pass'?'active':''" data-toggle="tab" href="javascript:;"
                                                        role="tab">密码</a></li>
                                <li class="nav-item" @click="change_set('vip')"><a class="nav-link" :class="c_change=='vip'?'active':''" data-toggle="tab" href="javascript:;"
                                                                                    role="tab">VIP会员</a></li>
                                <li class="nav-item" @click="change_set('invite')"><a class="nav-link" :class="c_change=='invite'?'active':''" data-toggle="tab" href="javascript:;"
                                                                                   role="tab">邀请码</a></li>
                            </ul>
                        </div>
                    </div>

                    <div class="tab-content">

                        <div class="tab-pane fade" :class="c_change=='me'?'show active':''" role="tabpanel">
                            <div class="row">
                                <div class="col-12">
                                    <div class="card mb-4">
                                        <div class="card-header">
                                            <h6 class="card-title mb-0">用户设置</h6>
                                            <span class="text-muted small">更新您的信息</span>
                                        </div>
                                        <div class="card-body">
                                            <!--<el-skeleton :rows="5" animated v-if="now_loading" />-->
                                            <form class="row g-3">
                                                <div class="col-lg-4 col-md-6 col-sm-12">
                                                    <div class="form-group">
                                                        <div class="input-group">
                                                            <input type="text" class="form-control form-control-lg"
                                                                   placeholder="Enter your name" v-model="me_info.name">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-6 col-sm-12">
                                                    <div class="form-group">
                                                        <div class="input-group">
                                                            <input type="text" class="form-control form-control-lg"
                                                                   placeholder="Enter phone" v-model="me_info.phone">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-6 col-sm-12">
                                                    <div class="form-group">
                                                        <div class="input-group">
                                                            <input type="text" class="form-control form-control-lg"
                                                                   placeholder="Enter your email" v-model="me_info.email" disabled>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <div class="input-group">
                                                            <textarea rows="4" class="form-control"
                                                                      placeholder="Enter Bio" v-model="me_info.description"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <el-button type="primary" @click="update_info()" :loading="up_loading">
                                                        更新信息
                                                    </el-button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="tab-pane fade" :class="c_change=='wallet'?'show active':''" role="tabpanel">
                            <div class="row">

                                <div class="col-12 col-md-6">

                                    <div class="card mb-4">
                                        <div class="card-body">
                                            <div class="row align-items-end">
                                                <div class="col">
                                                    <h6 class="text-uppercase text-muted mb-1 small">余额</h6>
                                                    <span class="h3 mb-0">${{ me_info.money }}/R</span>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="btn btn-sm btn-dark" v-if="counter.setting.pay_wechat_open==1 || counter.setting.pay_alipay_open==1" @click="charge()">充值</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-12 col-md-6">

                                    <div class="card mb-4">
                                        <div class="card-body">
                                            <div class="row align-items-end">
                                                <div class="col">
                                                    <h6 class="text-uppercase text-muted mb-1 small">卡密兑换</h6>
                                                    <span class="h3 mb-0">
                                                        <el-input v-model="kami_code" placeholder="请填写卡密信息"></el-input>
                                                    </span>
                                                </div>
                                                <div class="col-auto">
                                                    <a :href="counter.setting.buy_card" class="btn btn-sm el-button el-button--success btn btn-sm">购买卡密</a>
                                                    <el-button :loading="kami_loading" type="primary" class="btn btn-sm" @click="change_code()">兑换</el-button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <el-dialog class="msgbox" v-model="dialogFormVisible"  title="余额充值" width="20%" append-to-body>
                                    <div class="qr_fing" v-loading="qr_load">
                                        <qrcode-vue  v-if="qr_show" :value="pay_scan" size="240" class="mt-2 mb-2 m-auto d-sm-block"  ></qrcode-vue>
                                    </div>

                                    <el-form :model="form">
                                        <el-form-item label="充值">
                                            <el-input v-model="form.amount" autocomplete="off" placeholder="请输入充值金额" />
                                        </el-form-item>
                                        <el-form-item label="支付方式">
                                            <el-radio v-if="counter.setting.pay_wechat_open==1"  v-model="form.pay_type" label="wechat">微信</el-radio>
                                            <el-radio v-if="counter.setting.pay_alipay_open==1" v-model="form.pay_type" label="alipay">支付宝</el-radio>
                                        </el-form-item>

                                    </el-form>
                                    <template #footer>
                                      <span class="dialog-footer">
                                        <el-button type="primary" @click="send_charge()" :loading="charge_loading">
                                          立即充值
                                        </el-button>
                                          <el-button type="primary" plain @click="dialogFormVisible = false">
                                              完成支付
                                          </el-button>
                                      </span>
                                    </template>
                                </el-dialog>

                                <div class="col-12">
                                    <el-table :data="tableData" stripe style="width: 100%">
                                        <el-table-column prop="created_at" label="时间" />
                                        <el-table-column prop="order_id" label="订单编号" />
                                        <el-table-column prop="amount" label="金额" />
                                        <el-table-column label="支付状态">
                                            <template #default="scope">
                                                {{scope.row.status=='0'?'未支付':'已支付'}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="支付方式">
                                            <template #default="scope">
                                                {{scope.row.way=='wechat'?'微信支付':'支付宝支付'}}
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>


                        <div class="tab-pane fade" :class="c_change=='pass'?'show active':''" role="tabpanel">
                            <div class="row justify-content-between mb-4">
                                <div class="col-12 col-md-6">
                                    <h5>更改密码</h5>
                                </div>
                                <div class="col-auto">
                                    <NuxtLink to="/users/reset" class="btn btn-warning">忘记你的密码?</NuxtLink>
                                </div>
                            </div>
                            <div class="row g-3">
                                <div class="col-12">

                                    <div class="card mb-4">
                                        <div class="card-body">
                                            <form class="row">
                                                <div class="col-lg-4 col-md-12">
                                                    <div class="form-group mb-3">
                                                        <label>旧密码</label>
                                                        <input type="email" class="form-control" v-model="pass_all.old_password">
                                                    </div>
                                                    <div class="form-group mb-3">
                                                        <label>新密码</label>
                                                        <input type="email" class="form-control"  v-model="pass_all.new_password">
                                                    </div>
                                                    <div class="form-group mb-3">
                                                        <label>确认密码</label>
                                                        <input type="email" class="form-control" v-model="pass_all.new_password_confirmation">
                                                    </div>
                                                    <el-button type="primary" @click="c_pass()" :loading="pass_loading">
                                                        更新密码
                                                    </el-button>
                                                </div>
                                                <div class="col-lg-8 col-md-12">

                                                    <div class="card bg-light border">
                                                        <div class="card-body">
                                                            <p class="mb-2">密码要求</p>
                                                            <p class="small text-muted mb-2">
                                                                要创建一个新的密码，你必须满足以下所有要求。
                                                            </p>

                                                            <ul class="small text-muted ps-4 mb-0">
                                                                <li>最少8个字符</li>
                                                                <li>至少带有一个数字</li>
                                                                <li>不能和旧密码相同</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="tab-pane fade" :class="c_change=='vip'?'show active':''" role="tabpanel">
                            <div class="row">

                                <div class="col-12 col-md-6">

                                    <div class="card mb-4">
                                        <div class="card-body">
                                            <div class="row align-items-center">
                                                <div class="col">
                                                    <h6 class="text-uppercase text-muted mb-1 small">VIP等级</h6>
                                                    <span class="h3 mb-0">{{ me_vip? me_vip.title:'免费会员' }}</span>
                                                    <span class="text-gray mt-2 d-sm-block">到期时间：{{ me_vip?me_vip.expire_time:'永久' }}</span>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="btn btn-sm btn-dark" @click="up_vip_dialog()" v-if="counter.setting.pay_wechat_open==1 || counter.setting.pay_alipay_open==1">升级</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">

                                    <div class="card mb-4">
                                        <div class="card-body">
                                            <div class="row align-items-end">
                                                <div class="col">
                                                    <h6 class="text-uppercase text-muted mb-1 small">卡密兑换</h6>
                                                    <span class="h3 mb-0">
                                                        <el-input v-model="kami_code" placeholder="请填写卡密信息"></el-input>
                                                    </span>
                                                </div>
                                                <div class="col-auto">
                                                    <a :href="counter.setting.buy_card" class="btn btn-sm el-button el-button--success btn btn-sm">购买卡密</a>
                                                    <el-button :loading="kami_loading" type="primary" class="btn btn-sm" @click="change_code()">兑换</el-button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="col-12">
                                    <!--vip introduct-->
                                    <div class="module-privilege mb-2">
                                        <ul class="privilege-ul name-ul">
                                            <li class="privilege-item first-item">
                                                <p class="title">
                                                    <span>功能特权</span>
                                                </p>
                                            </li>
                                            <li class="privilege-item" style="background: #fbf9f8">
                                                <a>描述</a>
                                            </li>
                                            <li class="privilege-item">
                                                <a>价格</a>
                                            </li>
                                            <li class="privilege-item" style="background: #fbf9f8">
                                                <a>每天限制问答次数</a>
                                            </li>
                                            <li class="privilege-item">
                                                <a>每天限制绘画次数</a>
                                            </li>
                                        </ul>
                                        <ul class="privilege-ul vip-ul " v-for="(vs,vs_index) in vip_list" :key="vs_index">
                                            <li class="privilege-item first-item">
                                                <div class="vip-type">
                                                    <p class="vip-type-icon">
                                                        <span class="vip-icon vip-middle icon-size-middle"></span>
                                                    </p>
                                                    <span class="vip-type-title">{{ vs.title }}</span>
                                                </div>
                                                <div class="buy-btn-box">
                                                    <p class="center-button-base center-button-light-red center-button-container-middle">开通会员
                                                    </p>
                                                </div>
                                            </li>
                                            <li class="privilege-item" style="background: #fbf9f8">{{ vs.description }}</li>
                                            <li class="privilege-item">￥ {{vs.pay_amount}}</li>
                                            <li class="privilege-item" style="background: #fbf9f8">{{ vs.limit_send }} 次</li>
                                            <li class="privilege-item">{{ vs.limit_draw }} 次</li>

                                        </ul>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <el-table :data="tableVip" stripe style="width: 100%">
                                        <el-table-column prop="created_at" label="时间" />
                                        <el-table-column prop="title" label="标题" />
                                        <el-table-column prop="order_id" label="订单编号" />
                                        <el-table-column prop="amount" label="金额" />
                                        <el-table-column label="支付状态">
                                            <template #default="scope">
                                                {{scope.row.status=='0'?'未支付':'已支付'}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="支付方式">
                                            <template #default="scope">
                                                {{scope.row.way=='wechat'?'微信支付':'支付宝支付'}}
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>

                            </div>
                        </div>
                        <div class="tab-pane fade" :class="c_change=='invite'?'show active':''"  role="tabpanel">
                            <div class="row">

                                <div class="col-12 col-md-6">

                                    <div class="card mb-4">
                                        <div class="card-body">
                                            <div class="row align-items-center">
                                                <div class="col">
                                                    <h6 class="text-uppercase text-muted mb-1 small">邀请码</h6>
                                                    <span class="h3 mb-0 invite_code">{{ invite_code }}</span>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="btn btn-sm btn-dark" @click="invite_up()">生成邀请码</div>

                                                    <div class="btn btn-sm btn-dark ml-2" @click="copy_invite()">复制邀请码</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <!--vip introduct-->
                                    <div class="module-privilege mb-2">
                                        <ul class="privilege-ul name-ul">
                                            <li class="privilege-item first-item">
                                                <p class="title">
                                                    <span>邀请奖励</span>
                                                </p>
                                            </li>
                                            <li class="privilege-item" style="background: #fbf9f8">
                                                <a>邀请人数</a>
                                            </li>
                                            <li class="privilege-item">
                                                <a>奖励额度</a>
                                            </li>
                                            <li class="privilege-item" style="background: #fbf9f8">
                                                <a>奖励会员</a>
                                            </li>

                                        </ul>
                                        <ul class="privilege-ul vip-ul " v-for="(ins,ins_index) in invite_set" :key="ins_index">
                                            <li class="privilege-item first-item">
                                                <div class="vip-type">
                                                    <p class="vip-type-icon">
                                                        <span class="vip-icon vip-middle icon-size-middle"></span>
                                                    </p>
                                                    <span class="vip-type-title">{{ ins_index+1 }} 级奖励项</span>
                                                </div>

                                            </li>
                                            <li class="privilege-item" style="background: #fbf9f8">{{ ins.invite_c }} 人</li>
                                            <li class="privilege-item">￥ {{ins.invite_amount}}</li>
                                            <li class="privilege-item" style="background: #fbf9f8">{{ ins.vip?ins.vip.title:'无' }}</li>

                                        </ul>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <el-table :data="tableInvite" stripe style="width: 100%">
                                        <el-table-column prop="created_at" label="时间" />
                                        <el-table-column prop="invite_user.name" label="邀请人" />
                                        <el-table-column prop="user_id" label="邀请人ID" />
                                    </el-table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <el-dialog
            v-model="dialogVip"
            class="vip_mb"
            title="会员升级"
            append-to-body
        >
            <el-alert class="mb-2" title="选择好VIP套餐后，点击立即升级生成二维码支付！" type="primary" :closable="false" show-icon />

            <div class="qr_fing" v-loading="qr_load">
                <qrcode-vue  v-if="qr_show" :value="pay_scan" size="240" class="mt-2 mb-2 m-auto d-sm-block"  ></qrcode-vue>
            </div>

            <el-form :model="form">
                <el-form-item label="购买会员">
                    <el-radio-group v-model="form.vip_type">
                        <el-radio-button @change="changeRadio(item.id,item.pay_amount)" v-for="(item,index) in vip_list" :key="index" :label="item.id">
                            {{ item.title }} ￥{{ item.pay_amount }}
                        </el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="支付方式">
                    <el-radio  v-model="form.pay_type" v-if="counter.setting.pay_wechat_open==1" label="wechat">微信</el-radio>
                    <el-radio  v-model="form.pay_type" v-if="counter.setting.pay_alipay_open==1" label="alipay">支付宝</el-radio>
                </el-form-item>

            </el-form>
            <template #footer>
                                      <span class="dialog-footer">
                                        <el-button type="primary" @click="up_to_vip()">立即升级</el-button>
                                        <el-button type="primary" plain @click="dialogVip = false">
                                          完成支付
                                        </el-button>
                                      </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import {kami_send} from "~/utils/api";

definePageMeta({
    middleware: ['islogin']
})
import { useCounter } from '~/store/counter'
const counter = useCounter()
import type { UploadProps } from 'element-plus'

useHead({
    title: '个人中心 - '+counter.setting.title,
    meta: [
        { name: 'description', content: counter.setting.description},
        { name: 'keywords', content: counter.setting.keywords}
    ]
})
import {ref,reactive} from 'vue'
import { ElMessage,ElTable,ElNotification  } from 'element-plus'
import QrcodeVue from 'qrcode.vue'

const token = useCookie('token')
const router = useRouter()
const user_info = useCookie('user_info')
const actions  = counter.setting.APP_URL+'/api/upload_avatar'
const c_change = ref('me')
const me_info = ref({
    name:'',
    phone:'',
    description:'',
})
const tableData = ref([])
const tableVip = ref([])
const s_loading = ref(false)
const up_loading = ref(false)
const now_loading = ref(true)
const me_vip = ref({})
const invite_set = ref([])
const sigt_out = () => {
    token.value = ''
    ElMessage.success('退出成功')
    router.push('/')
}

const now_user = () =>{
    s_loading.value = true
    now_loading.value = true
    get_user().then((res:any) => {
        me_info.value = res._rawValue.data
        me_vip.value = res._rawValue.vip
        tableData.value = res._rawValue.order
        tableVip.value = res._rawValue.v_order
        invite_code.value = res._rawValue.data.invite_code
        tableInvite.value = res._rawValue.invite_meta
        invite_set.value = res._rawValue.invite_set
        s_loading.value = false
        now_loading.value = false
    }).catch((err:any) => {
        s_loading.value = false
        now_loading.value = false
        console.log(err)
    })
}
now_user()
const vip_list = ref([])
const get_vip = () => {
    get_vip_show().then((res:any) => {
        vip_list.value = res._rawValue.data
        vip_ids.value = res._rawValue.data[0].id
        vip_now_money.value = res._rawValue.data[0].pay_amount
    }).catch((err:any) => {
        ElMessage.error('获取失败')
    })
}
get_vip()
const change_set = (options:string) => {
    c_change.value = options
}
const update_info = () => {
    up_loading.value = true
    update_user({
        name:me_info.value.name,
        phone:me_info.value.phone,
        description:me_info.value.description,
    }).then((res:any) => {
        now_user()
        up_loading.value = false
        ElMessage.success('修改成功')
    }).catch((err:any) => {
        up_loading.value = false
        console.log(err)
    })
}
const pass_loading = ref(false)
const pass_all = ref({
    old_password:'',
    new_password:'',
    new_password_confirmation:'',
})
const c_pass = () => {
    pass_loading.value = true
    if (pass_all.value.new_password != pass_all.value.new_password_confirmation) {
        ElMessage.error('两次密码不一致')
        pass_loading.value = false
        return
    }
    change_password({
        password:pass_all.value.old_password,
        new_password:pass_all.value.new_password,
    }).then((res:any) => {
        pass_loading.value = false
        ElMessage.success('修改成功')
        pass_all.value = {
            old_password:'',
            new_password:'',
            new_password_confirmation:'',
        }
    }).catch((err:any) => {
        pass_loading.value = false
        ElMessage.error(err.message)
    })
}

const dialogFormVisible = ref(false)
const form = reactive({
    amount:1,
    pay_type:'alipay',
    vip_type:1,
})
const charge = () => {
    dialogFormVisible.value = true
}
const pay_scan = ref('')
const charge_loading = ref(false)
const qr_load = ref(false)
const qr_show = ref(false)
const send_charge = () => {
    if (form.amount == 0) {
        ElMessage.error('请输入充值金额')
        return
    }
    charge_loading.value = true
    qr_load.value = true
    qr_show.value = true

    if (form.pay_type == 'alipay') {
        alipay({
            amount:form.amount,
            type:'charge',
        }).then((res:any) => {
            pay_scan.value = res._rawValue.qr_code
            charge_loading.value = false
            qr_load.value = false
        }).catch((err:any) => {
            charge_loading.value = false
            qr_load.value = false
            console.log(err.message)
        })
    }else{
        wechat({
            amount:form.amount,
            type:'charge',
        }).then((res:any) => {
            pay_scan.value = res._rawValue.qr_code
            charge_loading.value = false
            qr_load.value = false
        }).catch((err:any) => {
            charge_loading.value = false
            qr_load.value = false
            console.log(err.message)
        })
    }

}
// VIP bug
const dialogVip = ref(false)
const up_vip_dialog = ()=>{
    dialogVip.value = true
}
const up_to_vip = () => {
    if (vip_ids.value == '') {
        ElMessage.error('请选择VIP套餐')
        return
    }
    charge_loading.value = true
    qr_load.value = true
    qr_show.value = true
    if (form.pay_type == 'alipay') {
        alipay({
            v_id:vip_ids.value,
            amount:vip_now_money.value,
            type:'vip',
        }).then((res:any) => {
            pay_scan.value = res._rawValue.qr_code
            charge_loading.value = false
            qr_load.value = false
        }).catch((err:any) => {
            charge_loading.value = false
            qr_load.value = false
            console.log(err.message)
        })
    }else{
        wechat({
            v_id:vip_ids.value,
            amount:vip_now_money.value,
            type:'vip',
        }).then((res:any) => {
            pay_scan.value = res._rawValue.qr_code
            charge_loading.value = false
            qr_load.value = false
        }).catch((err:any) => {
            charge_loading.value = false
            qr_load.value = false
            console.log(err.message)
        })
    }
}
const vip_ids = ref('')
const vip_now_money = ref(0)
const changeRadio = (ids:string,money:any) => {
    vip_ids.value = ids
    vip_now_money.value = money
}
const invite_code = ref('')
const tableInvite = ref([

])
const copy_invite = () => {
    const input = document.createElement('input')
    input.setAttribute('readonly', 'readonly')
    input.setAttribute('value', invite_code.value)
    document.body.appendChild(input)
    input.select()
    if (document.execCommand('copy')) {
        document.execCommand('copy')
        ElMessage.success('复制成功')
    }
    document.body.removeChild(input)
}
const invite_up = () =>{
    invite_code_send().then((res:any)=>{
        invite_code.value = res._rawValue.data
        ElMessage.success(
            '邀请码已更新'
        )
    }).catch((err:any)=>{
        console.log(err)
    })
}
const kami_code = ref('')
const kami_loading = ref(false)
const change_code = ()=>{
    if (kami_code.value == '') {
        ElMessage.error('请输入卡密')
        return
    }
    kami_loading.value = true
    kami_send({
        code:kami_code.value,
    }).then((res:any)=>{
        ElNotification({
            title: '成功',
            message: res._rawValue.info,
            type: 'success',
        })
        kami_code.value = ''
        kami_loading.value = false
        now_user()
    }).catch((err:any)=>{
        kami_loading.value = false
        console.log(err)
    })
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    console.log(URL.createObjectURL(uploadFile.raw!))
    ElMessage.success('上传成功')
    now_user()
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        ElMessage.error('仅支持jpg/png格式图片!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('图片大小不能超过 2MB!')
        return false
    }
    return true
}
</script>

<style>
.avatar-uploader .el-upload{
    display:inline
}
</style>
