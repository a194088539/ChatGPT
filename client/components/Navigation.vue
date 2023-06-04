<template>

    <NuxtLink to="/" title="Postman" class="brand">
        <img :src="counter.setting.logo" alt="logo">
    </NuxtLink>

    <div class="nav flex-md-column nav-pills flex-grow-1" role="tablist" aria-orientation="vertical">
        <client-only>
            <el-tooltip
                class="box-item"
                effect="dark"
                content="会员中心"
                placement="right"
            >
                <NuxtLink class="mb-xl-3 mb-md-2 nav-link" data-toggle="pill" to="/users/setting" role="tab">
                    <img src="@/assets/images/user.png" class="avatar sm rounded-circle" alt="user avatar"/>
                </NuxtLink>
            </el-tooltip>
        </client-only>
        <client-only>
            <el-tooltip
                class="box-item"
                effect="dark"
                content="AI问答聊天"
                placement="right"
            >
                <NuxtLink class="mb-xl-3 mb-md-2 nav-link" data-toggle="pill" to="/" role="tab">
                    <i class="zmdi zmdi-pin-assistant"></i>
                </NuxtLink>
            </el-tooltip>
        </client-only>
        <client-only>
            <el-tooltip
                class="box-item"
                effect="dark"
                content="AI绘画"
                placement="right"
            >
                    <NuxtLink class="mb-xl-3 mb-md-2 nav-link" data-toggle="pill" to="/ai_draw" role="tab">
                        <i class="zmdi zmdi-collection-folder-image"></i>
                    </NuxtLink>
            </el-tooltip>
        </client-only>





    </div>

    <div class="nav flex-md-column nav-pills flex-grow-2" role="tablist" aria-orientation="vertical">
        <client-only>
            <el-tooltip
                class="box-item"
                effect="dark"
                content="个人中心"
                placement="right"
            >
                <NuxtLink class="mb-xl-3 mb-md-2 nav-link" to="/users/setting" role="tab"><i
                    class="zmdi zmdi-settings"></i>
                </NuxtLink>
            </el-tooltip>
        </client-only>


    </div>


</template>
<script lang="ts" setup>
import {ref} from "vue";
import {ElMessage} from "element-plus";
import { useCounter } from '~/store/counter'
const counter = useCounter()

const get_config = ()=>{
    get_nav_config().then((res:any)=>{
        counter.setting = res._rawValue.data;
    }).catch((err:any)=>{
        ElMessage.error(err);
    })
}
get_config()
</script>
