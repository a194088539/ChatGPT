<template>
    <div class="main px-xl-5 px-lg-4 px-3 overflow-auto bg-ai">
        <div class="body-header border-bottom py-xl-3 py-2">
            <div class="container px-0">
                <div class="row align-items-center">
                    <div class="col-12">
                        <div class="media">
                            <div class="avatar sm"><a href="/" class="link" title=""><i
                                class="zmdi zmdi-arrow-left zmdi-hc-lg"></i></a></div>
                            <div class="media-body overflow-hidden">
                                <div class="d-flex align-items-center mb-1"><h6
                                    class="fw-bold text-truncate mb-0 me-auto">AI绘图</h6></div>
                                <div class="text-truncate">绘图有好有坏，根据关键词生成~大约需要30s左右时间</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-body mt-2">
            <div class="rlshRpVg">
                <div class="ant-form ant-form-horizontal">
                    <el-alert :title="dw_new_desc" type="primary" class="mb-2 mt-2" />

                    <div class="c79YxChY">

                        <div class="QfmmweN6">
                            <div class="ROxH2OCe" @click="change_prompt()">换示例</div>
                            <div class="EhlHQai2">Prompt示例：<span>{{ prompt_info }}</span></div>
                        </div>

                    </div>
                    <div class="mt-4">
                        <el-input v-model="input2" @keydown.enter.native="ai_draw()" placeholder="请用中文输入Prompt，参考形式：画面主体，细节描述，修饰词" size="large">
                            <template #append>
                                <el-button @click="ai_draw()"  :loading="draw_loading">
                                    <i class="zmdi zmdi-collection-image-o up_images"></i>生成
                                </el-button>
                            </template>
                        </el-input>
                    </div>
                    <div class="IBB02stq">
                        <div class="IJeKKhVO"><strong>参数设置</strong>
                            <div class="BjFvnDFr">
                                <div>
                                    <div class="tJ3Uxp5n"><span class="d1v8F9_X">图片尺寸：</span>
                                        <div class="UXmDHLrm">
                                            <span v-for="(s,s_index) in all_size" :key="s_index" :class="size==s.value?'OMJ2YPhL':''" @click="change_size(s.value)">{{ s.name }}</span>
                                        </div>
                                    </div>
                                    <div class="tJ3Uxp5n"><span class="O8rMyJiP">图片数量：</span>
                                        <div class="UXmDHLrm">
                                            <span v-for="(i,i_index) in images_list" :key="i_index" :class="image_select==i.value?'OMJ2YPhL':''" @click="change_i(i.value)">{{i.name}}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="LD_v91KZ">
                            <div class="i6ZRhNSs"><strong>修饰词参考</strong><span class="Ml1AlIeV">您可参考或选用下列各类修饰词丰富您的输入文本，尝试生成更加多样的图像，更多修饰词可参考 <span>Prompt指南</span> 或 自由输入 探索大模型作画更多未知能力</span>
                            </div>
                            <div class="eTPUL0mm">
                                <div class="rANRXgV2"><strong>图像类型</strong>
                                    <div class="k9FL7lPf">
                                        <span v-for="(ty,ty_index) in image_type" :key="ty_index" @click="get_info(ty.name)">{{ ty.name }}
                                            {{ty_index!=image_type.length-1?'、':''}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--finish go-->
                <div class="ernie-vilg-image" v-if="is_sc || is_finish">
                    <div>
                        <div class="ernie-vilg-item-desc" v-if="is_sc || is_finish" style="margin-bottom: 0px;">正在生成中，预计需要 30s</div>

                        <div class="eE9d1okq" style="margin-top: 20px;" v-if="is_sc">
                            <div class="ernie-vilg-image-item" v-for="item in image_select">
                                <img class="ernie-vilg-image-item-img" src="@/assets/images/loading2.gif">
                            </div>
                        </div>
                        <div class="eE9d1okq" style="margin-top: 20px;" v-if="is_finish">
                            <div class="ernie-vilg-image-item" v-for="(image,fi_index) in r_images" :key="fi_index">
                                <img class="ernie-vilg-image-item-img" :src="image.url">

                            </div>
                        </div>

                    </div>
                </div>
                <!--finish go end-->
                <!--show me up-->
                <el-tabs v-model="activeName" class="mt-4">
                    <el-tab-pane label="我的生成" name="first">
                        <el-row :gutter="20" v-if="me_draw.length>0">
                            <el-col
                                v-for="(m,m_index) in me_draw" :key="m_index"
                                :span="6"
                            >
                                <el-card :body-style="{ padding: '0px' }" class="mb-2" >
                                    <img
                                        :src="m.image"
                                        class="image"
                                    />
                                    <div style="padding: 10px 0px" class="me_show_pic">

                                        <el-popover
                                            placement="top-start"
                                            title="Prompt:"
                                            :width="200"
                                            trigger="hover"
                                            :content="m.title"
                                        >
                                            <template #reference>
                                                <span>{{ m.title }}</span>
                                            </template>
                                        </el-popover>
                                        <div class="bottom">
                                            <el-button type="danger" text class="button"
                                                       v-if="m.is_public==0"
                                                       @click="send_pub(0,m.id)"
                                            >私密
                                            </el-button>
                                            <el-button type="primary" text class="button"
                                                       v-else
                                                       @click="send_pub(1,m.id)"
                                            >公开
                                            </el-button>
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-empty description="暂无数据哦~" v-else />

                    </el-tab-pane>
                    <el-tab-pane label="公共生成" name="second">
                        <el-row :gutter="20" v-if="public_draw.length>0">
                            <el-col
                                v-for="(p,p_index) in public_draw" :key="p_index"
                                :span="6"
                            >
                                <el-card :body-style="{ padding: '0px' }" class="mb-2" >
                                    <img
                                        :src="p.image"
                                        class="image"
                                    />
                                    <div style="padding: 10px 0px" class="me_show_pic">
                                        <el-tooltip
                                            class="box-item"
                                            effect="dark"
                                            :content=p.title
                                            placement="bottom"
                                        >
                                            <span>{{ p.title }}</span>
                                        </el-tooltip>

                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-empty description="暂无数据哦~" v-else />
                    </el-tab-pane>

                </el-tabs>

                <!--show me up end-->
                <div>

                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import {send_public} from "~/utils/api";
import { useCounter } from '~/store/counter'
const counter = useCounter()

useHead({
    title: 'AI绘画 - '+counter.setting.title,
    meta: [
        { name: 'description', content: counter.setting.description},
        { name: 'keywords', content: counter.setting.keywords}
    ]
})
definePageMeta({
    middleware: ['islogin']
})

import {ref} from "vue";
import {ElMessage} from "element-plus";
// 1
const onSuccess = () => {
    console.log('success')
}


const onError = () => {
    console.log('error')
}
const user_info = useCookie('user_info')
const input2 = ref('')
const size = ref('256x256')
const image_select = ref(1)
const all_size = [
    {
        name: '256x256(小图)',
        value: '256x256'
    },
    {
        name: '512x512(中图)',
        value: '512x512'
    },
    {
        name: '1024x1024(大图)',
        value: '1024x1024'
    },
]
const images_list = ref([
    {
        name:'1张',
        value:1
    },
    {
        name:'2张',
        value:2
    },
    {
        name:'3张',
        value:3
    },
    {
        name:'4张',
        value:4
    },
    {
        name:'5张',
        value:5
    },
    {
        name:'6张',
        value:6
    },
    {
        name:'7张',
        value:7
    },
    {
        name:'8张',
        value:8
    },
    {
        name:'9张',
        value:9
    },
    {
        name:'10张',
        value:10
    },
])
const prompt_info = ref('超级逼真的未来世界，真实照片，虚幻引擎')
const all_prompt =[
    '超级逼真的未来世界，真实照片，虚幻引擎',
    '二次元少女，美丽，大方，精致脸庞',
    '帅哥，二次元，赛博朋克风格，精致脸庞',
    '古风，青山相看两不厌，丹青水墨，中国风',
    '萌萌哒，可爱，二次元，精致脸庞',
    '兔子，可爱，高质量，高品质',
]
const change_prompt = ()=>{
    // 数组中all_prompt随机拿数据改变prompt_info并且判断不和上一次一样
    let random = Math.floor(Math.random()*all_prompt.length)
    if(prompt_info.value == all_prompt[random]){
        change_prompt()
    }else{
        prompt_info.value = all_prompt[random]
    }
}
const change_size  = (s_v:string)=>{
    size.value = s_v
}
const change_i= (i_v:number)=>{
    image_select.value = i_v
}
const r_images = ref([])
const draw_loading = ref(false)
const is_sc = ref(false)
const is_finish = ref(false)
const activeName = ref('first')
const me_draw = ref([])
const public_draw = ref([])
const ai_draw = ()=>{
    if(input2.value == ''){
        ElMessage.error('请填写关键词')
        return false;
    }
    is_sc.value = true
    draw_loading.value = true
    ai_draw_openai({
        prompt:input2.value,
        size:size.value,
        number:image_select.value,
    }).then((res:any)=>{
        r_images.value = res._rawValue.data
        is_finish.value = true
        is_sc.value = false
        ElMessage.success('生成成功')
        get_me_d()
        draw_loading.value = false
    }).catch((err:any)=>{
        ElMessage.error('生成失败')
        is_sc.value = false
        draw_loading.value = false
    })
}
const ai_draw_pay = ref('0')
const dw_new_desc = ref('每张图生成需要扣费'+ai_draw_pay.value+'会员扣除次数~')
const get_me_d = ()=>{
    get_me_draw().then((res:any)=>{
        me_draw.value = res._rawValue.data
        public_draw.value = res._rawValue.public
        ai_draw_pay.value = res._rawValue.dw_m
        dw_new_desc.value = '每张图生成需要扣费'+ai_draw_pay.value+',会员扣除次数~'
    }).catch((err:any)=>{
        console.log(err)
    })
}
get_me_d()
const send_pub=(c:number,mid:number)=>{
    send_public({
        draw_id:mid
    }).then((res:any)=>{
        ElMessage.success(res._rawValue.message)
        get_me_d()
    }).catch((err:any)=>{
        console.log(err)
    })
}
const image_type = ref([
    {
        name:'古风',
    },
    {
        name:'二次元',
    },
    {
        name:'写实照片',
    },
    {
        name:'油画'
    },
    {
        name:'水彩画'
    },
    {
        name:'油墨画'
    },
    {
        name:'黑白雕版画'
    },
    {
        name:'雕塑'
    },
    {
        name:'3D模型'
    },
    {
        name:'手绘草图'
    },
    {
        name:'炭笔画'
    },
    {
        name:'极简线条画'
    },
    {
        name:'浮世绘'
    },
    {
        name:'电影质感'
    },
    {
        name:'机械感'
    },

])
const get_info = (name:string)=>{
    if(input2.value == ''){
        input2.value = name
    }else{
        input2.value = input2.value+'，'+name
    }
}
</script>

<style>

</style>
