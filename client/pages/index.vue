<template>

    <div class="sidebar border-end py-xl-4 py-3 px-xl-4 px-3">

        <div class="tab-content">


            <div class="tab-pane fade show active" id="nav-tab-chat" role="tabpanel">

                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h3 class="mb-0 text-primary">Chat</h3>
                    <div>
                        <NuxtLink to="/login" class="btn btn-primary" v-if="!token">✨ 登录!</NuxtLink>
                        <NuxtLink to="/users/setting" class="btn btn-primary" v-else>✨ 个人中心</NuxtLink>
                    </div>
                </div>

                <div class="form-group input-group-lg search mb-3">
                    <i class="zmdi zmdi-search"></i>
                    <i class="zmdi zmdi-dialpad"></i>
                    <input type="text" class="form-control" v-model="qs_input" @keydown.enter.native="qs_search" placeholder="Search...">
                </div>

                <ul class="chat-list">
                    <li class="header d-flex justify-content-between ps-3 pe-3 mb-1">
                        <span>RECENT CHATS</span>
                        <div class="dropdown">
                            <a @click="all_message()" class="btn btn-link px-1 py-0 border-0 text-muted dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="zmdi zmdi-refresh"></i></a>
                        </div>
                    </li>
                    <li>
                        <div class="card" @click="check_message(0)">
                            <div class="card-body">
                                <div class="media">
                                    <div class="avatar me-3">
                                        <div class="avatar rounded-circle no-image bg-primary text-light">
                                            <span><i class="zmdi zmdi-comment-text"></i></span>
                                        </div>
                                    </div>
                                    <div class="media-body overflow-hidden">
                                        <div class="d-flex align-items-center mb-1">
                                            <h6 class="text-truncate mb-0 me-auto">ChatGPT</h6>

                                        </div>
                                        <div class="text-truncate">
                                            <i class="zmdi zmdi-circle text-success"></i> Online
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <el-skeleton :rows="5" animated v-if="data_load"/>
                    <div class="bot_info" v-else v-loading="left_loding">
                        <li class="online" :class="ms_active==item[item.length-1].session_id?'active':''"
                            v-for="(item,index) in messages" :key="index">
                            <div class="hover_action">

                                <!--<button type="button" class="btn btn-link text-warning"><i class="zmdi zmdi-star"></i>-->
                                <!--</button>-->
                                <button type="button" @click="delete_msg(item[item.length-1].session_id)" class="btn btn-link text-danger"><i class="zmdi zmdi-delete"></i>
                                </button>
                            </div>
                            <div class="card" @click="check_message(item[item.length-1].session_id)">
                                <div class="card-body">
                                    <div class="media">
                                        <div class="avatar me-3">
                                            <span class="status rounded-circle"></span>
                                            <img class="avatar rounded-circle" src="@/assets/images/xs/avatar5.jpg"
                                                 alt="avatar">
                                        </div>
                                        <div class="media-body overflow-hidden">
                                            <div class="d-flex align-items-center mb-1">
                                                <h6 class="text-truncate mb-0 me-auto">{{
                                                        item[item.length - 1].question
                                                    }}</h6>
                                                <p class="small text-muted text-nowrap ms-4 mb-0">
                                                    {{ item[item.length - 1].created_at }}</p>
                                            </div>
                                            <div class="text-truncate h-20" v-html="item[item.length - 1].message.replace(/\n/g, '<br />')"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </div>
                </ul>
                <el-pagination
                    :current-page="page"
                    :page-size="limit"
                    :pager-count="4"
                    background
                    layout="prev, pager, next"
                    :total="ms_count"
                    @current-change="handleCurrentChange"
                />
            </div>

            <!--this is jiehu-->

            <!--this is change jiehu-->
        </div>

    </div>
    <div class="main px-3">

        <div class="chat-body" id="chatbody" v-loading="loadins"

        >


            <div class="chat-header border-bottom py-xl-4 py-md-3 py-2">
                <div class="container-xxl">

                    <div class="row align-items-center">
                        <div class="col-6 col-xl-4 d-sm-flex">
                            <button @click="change_side()" class="btn sidebar-toggle-btn"><i class="zmdi zmdi-menu"></i></button>
                            <div class="media">
                                <div class="avatar me-3" v-if="ms_active==0">
                                    <div class="avatar rounded-circle no-image bg-primary text-light">
                                        <span><i class="zmdi zmdi-comment-text"></i></span>
                                    </div>
                                </div>
                                <div class="me-3 show-user-detail" v-else>
                                    <span class="status rounded-circle"></span>
                                    <img class="avatar rounded-circle" src="@/assets/images/xs/avatar5.jpg" alt="avatar">
                                </div>
                                <div class="media-body overflow-hidden">
                                    <div class="d-flex align-items-center mb-1">
                                        <h6 class="text-truncate mb-0 me-auto" v-if="ms_active==0">ChatGPT</h6>
                                        <h6 class="text-truncate mb-0 me-auto" v-if="me_message.length>0">{{me_message[0].question}}</h6>
                                    </div>
                                    <div class="text-truncate"><i class="zmdi zmdi-circle text-success"></i> Online
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-6 col-xl-8 text-end">
                            <ul class="nav justify-content-end align-items-center">
                                <li class="nav-item list-inline-item d-none d-md-block me-2">
                                    <client-only><el-tooltip
                                        class="box-item"
                                        effect="dark"
                                        content="生成图片"
                                        placement="bottom"
                                    >
                                        <a @click="up_new_img()" class="nav-link text-muted px-3" data-toggle="pill" href="javascript:;"><i class="zmdi zmdi-image-o"></i></a>
                                    </el-tooltip>
                                    </client-only>
                                </li>
                                <li class="nav-item list-inline-item d-md-block me-2">
                                    <client-only>
                                        <el-tooltip
                                            class="box-item"
                                            effect="dark"
                                            content="刷新当前聊天"
                                            placement="bottom"
                                        >
                                            <a @click="check_message(ms_active)" class="nav-link text-muted px-3" data-toggle="pill" href="javascript:;"><i class="zmdi zmdi-refresh"></i></a>
                                        </el-tooltip>
                                    </client-only>
                                </li>
                                <li class="nav-item list-inline-item d-md-block">
                                    <client-only>
                                            <el-dropdown @command="handleCommand">
                                                <a  class="nav-link text-muted px-3" data-toggle="pill" href="javascript:;"><i class="zmdi zmdi-favorite-outline"></i></a>
                                                <template #dropdown>
                                                    <el-dropdown-menu>
                                                        <el-dropdown-item v-for="(sce,sce_index) in scene_model" :key="sce_index" :command="sce_index">
                                                            {{ sce.title }}
                                                        </el-dropdown-item>
                                                    </el-dropdown-menu>
                                                </template>
                                            </el-dropdown>
                                    </client-only>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="collapse" id="chat-search-div">
                <div class="container-xxl py-2">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Find messages in current conversation">
                        <div class="input-group-append">
                            <span class="input-group-text text-muted">0 / 0</span>
                        </div>
                        <div class="input-group-append">
                            <button type="button" class="btn btn-secondary">Search</button>
                            <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right shadow border-0">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <a class="dropdown-item" href="#">Something else here</a>
                                <div role="separator" class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Separated link</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="chat-content" ref="poster">
                <div class="container-xxl">
                    <ul class="list-unstyled py-4">
                        <!--bot guan-->
                        <div class="bot_message_s" v-if="ms_active==0">
                            <li class="d-flex message">

                                <div class="mr-lg-3 me-2">
                                    <div
                                        class="avatar sm rounded-circle bg-primary d-flex align-items-center justify-content-center">
                                        <span><i class="zmdi zmdi-comment-text text-light"></i></span>
                                    </div>
                                </div>

                                <div class="message-body">

                                    <div class="message-row d-flex align-items-center">
                                        <div class="message-content p-3">
                                            🙌 欢迎回来!<br>
                                            有什么可以帮助您?
                                        </div>
                                    </div>

                                    <div class="message-row d-flex align-items-center">
                                        <div class="message-content p-3">
                                            👋 您好，我是您的专属机器人.<br>当前使用的是GPT3.5模型. <br>如果你对我们的工具有任何疑问，请告诉我们
                                        </div>
                                    </div>

                                </div>
                            </li>
                        </div>

                        <!--bot guan end-->

                        <!--qs-->

                        <div class="message_s" v-for="(item,index) in me_message" :key="index">
                            <li class="d-flex message right">
                                <div class="message-body">
                                <span class="date-time text-muted">{{ item.created_at }}<i
                                    class="zmdi zmdi-check-all text-primary"></i></span>
                                    <div class="message-row d-flex align-items-center justify-content-end">
                                        <div class="message-content border p-3">
                                            {{ item.question }}
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li class="d-flex message">

                                <div class="mr-lg-3 me-2">
                                    <img class="avatar sm rounded-circle" src="@/assets/images/xs/avatar5.jpg"
                                         alt="avatar">
                                </div>

                                <div class="message-body">
                                    <span class="date-time text-muted">{{ item.created_at }}</span>
                                    <div class="message-row d-flex align-items-center">


                                        <div class="message-content p-3" :class="index==me_message.length-1 && !is_done?'ms-up':''" v-html="renderMarkdown(item.message).replace(/\\n/g, '\n')">
                                        </div>

                                        <el-dropdown>
                                            <div class="dropdown">
                                                <a class="text-muted ms-1 p-2 text-muted" href="javascript:;" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i class="zmdi zmdi-more-vert"></i>
                                                </a>
                                            </div>
                                            <template #dropdown>
                                                <el-dropdown-menu>
                                                    <el-dropdown-item command="copy" @click.native="handleClick(item.message.replace(/\n/g, '<br />'))">复制答案</el-dropdown-item>
                                                </el-dropdown-menu>
                                            </template>
                                        </el-dropdown>


                                    </div>
                                </div>
                            </li>

                        </div>
                        <!--qs end-->
                    </ul>
                </div>
            </div>

            <div class="chat-footer border-top py-xl-4 py-lg-2 py-2">
                <div class="container-xxl">
                    <div class="row">
                        <div class="col-12">
                            <el-form
                                ref="ruleFormRef"
                                :model="ruleForm"
                                :rules="rules"
                                class="demo-ruleForm"
                                status-icon
                            >
                                <div class="col-9 d-inline-block">
                                    <el-form-item prop="message_input">
                                        <el-input
                                            size="large"
                                            :disabled="send_loading"
                                            class="form-control border-0 pl-0"
                                            v-model="ruleForm.message_input" autocomplete="off"
                                            placeholder="请输入提问内容"
                                            @keydown.enter.native="submitForm(ruleFormRef)"
                                        />
                                    </el-form-item>
                                    <el-form-item style="margin-bottom:0;display:none;">
                                        <el-input></el-input>
                                    </el-form-item>
                                </div>

                                <div class="col-3 d-inline-block div-pad">

                                    <el-form-item>

                                        <el-button size="large" type="primary" @click="submitForm(ruleFormRef)" :loading="send_loading"
                                        >
                                            <span class="me-2">
                                                发送
                                            </span>
                                            <i class="zmdi zmdi-mail-send"></i>
                                        </el-button>

                                    </el-form-item>
                                </div>

                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="user-detail-sidebar py-xl-4 py-3 px-xl-4 px-3">
            <div class="d-flex flex-column">
                <div class="header border-bottom pb-4 d-flex justify-content-between">
                    <div>
                        <h6 class="mb-0 font-weight-bold">User Details</h6>
                        <span class="text-muted">Update your profile details</span>
                    </div>
                    <div>
                        <button class="btn btn-link text-muted close-chat-sidebar" type="button"><i
                            class="zmdi zmdi-close"></i></button>
                    </div>
                </div>
                <div class="body mt-4">
                    <div class="d-flex justify-content-center">
                        <div class="avatar xxl">
                            <img class="avatar xxl rounded-circle" src="@/assets/images/sm/avatar2.jpg" alt="avatar">
                        </div>
                    </div>
                    <div class="text-center mt-3 mb-5">
                        <h4>Jason Porter</h4>
                        <span class="text-muted"><a href="/cdn-cgi/l/email-protection" class="__cf_email__"
                                                    data-cfemail="0f62666c676a63636a21687d6a6a614f68626e6663216c6062">[email&#160;protected]</a></span>
                        <p>+14 123 456 789 - New york (USA)</p>
                    </div>

                    <ul class="chat-list">
                        <li class="header d-flex justify-content-between ps-3 pe-3 mb-1">
                            <span>mutual friend</span>
                        </li>
                        <li>
                            <a href="#" class="card">
                                <div class="card-body">
                                    <div class="media">
                                        <div class="avatar me-3">
                                            <img class="avatar rounded-circle" src="@/assets/images/xs/avatar1.jpg"
                                                 alt="avatar">
                                        </div>
                                        <div class="media-body overflow-hidden">
                                            <div class="d-flex align-items-center mb-1">
                                                <h6 class="text-truncate mb-0 me-auto">Michelle Green</h6>
                                            </div>
                                            <div class="text-truncate">+14 123 456 258</div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="card">
                                <div class="card-body">
                                    <div class="media">
                                        <div class="avatar me-3">
                                            <img class="avatar rounded-circle" src="@/assets/images/xs/avatar2.jpg"
                                                 alt="avatar">
                                        </div>
                                        <div class="media-body overflow-hidden">
                                            <div class="d-flex align-items-center mb-1">
                                                <h6 class="text-truncate mb-0 me-auto">Jason Porter</h6>
                                            </div>
                                            <div class="text-truncate">+14 123 456 963</div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="card">
                                <div class="card-body">
                                    <div class="media">
                                        <div class="avatar me-3">
                                            <img class="avatar rounded-circle" src="@/assets/images/xs/avatar3.jpg"
                                                 alt="avatar">
                                        </div>
                                        <div class="media-body overflow-hidden">
                                            <div class="d-flex align-items-center mb-1">
                                                <h6 class="text-truncate mb-0 me-auto">Elizabeth Martin</h6>
                                            </div>
                                            <div class="text-truncate">+14 123 456 753</div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="addnew-user-sidebar py-xl-4 py-3 px-xl-4 px-3">
            <div class="d-flex flex-column">
                <div class="header border-bottom pb-4 d-flex justify-content-between">
                    <div>
                        <h6 class="mb-0 font-weight-bold">Add new member</h6>
                        <span class="text-muted">Update your profile details</span>
                    </div>
                    <div>
                        <button class="btn btn-link text-muted close-chat-sidebar" type="button"><i
                            class="zmdi zmdi-close"></i></button>
                    </div>
                </div>
                <div class="body mt-4">

                    <div class="form-group input-group-lg search mb-3">
                        <i class="zmdi zmdi-search"></i>
                        <input type="text" class="form-control" placeholder="Search...">
                    </div>

                    <ul class="chat-list">
                        <li class="header d-flex justify-content-between ps-3 pe-3 mb-1">
                            <span>A</span>
                            <div class="dropdown">
                                <a class="btn btn-link px-1 py-0 border-0 text-muted dropdown-toggle" href="#"
                                   role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="hover_action">
                                <button type="button" class="btn btn-link text-info"><i
                                    class="zmdi zmdi-plus-circle"></i>
                                </button>
                            </div>
                            <a href="#" class="card">
                                <div class="card-body">
                                    <div class="media">
                                        <div class="avatar me-3">
                                            <img class="avatar rounded-circle" src="@/assets/images/xs/avatar1.jpg"
                                                 alt="avatar">
                                        </div>
                                        <div class="media-body overflow-hidden">
                                            <div class="d-flex align-items-center mb-1">
                                                <h6 class="text-truncate mb-0 me-auto">Amelia Green</h6>
                                            </div>
                                            <div class="text-truncate">
                                                last seen 2 hours ago
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <div class="hover_action">
                                <button type="button" class="btn btn-link text-info"><i
                                    class="zmdi zmdi-plus-circle"></i>
                                </button>
                            </div>
                            <a href="#" class="card">
                                <div class="card-body">
                                    <div class="media">
                                        <div class="avatar me-3">
                                            <img class="avatar rounded-circle" src="@/assets/images/xs/avatar3.jpg"
                                                 alt="avatar">
                                        </div>
                                        <div class="media-body overflow-hidden">
                                            <div class="d-flex align-items-center mb-1">
                                                <h6 class="text-truncate mb-0 me-auto">Ava Green</h6>
                                            </div>
                                            <div class="text-truncate">
                                                last seen 1 hours ago
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="header d-flex justify-content-between ps-3 pe-3 mb-1">
                            <span>C</span>
                        </li>
                        <li>
                            <div class="hover_action">
                                <button type="button" class="btn btn-link text-info"><i
                                    class="zmdi zmdi-plus-circle"></i>
                                </button>
                            </div>
                            <a href="#" class="card">
                                <div class="card-body">
                                    <div class="media">
                                        <div class="avatar me-3">
                                            <img class="avatar rounded-circle" src="@/assets/images/xs/avatar4.jpg"
                                                 alt="avatar">
                                        </div>
                                        <div class="media-body overflow-hidden">
                                            <div class="d-flex align-items-center mb-1">
                                                <h6 class="text-truncate mb-0 me-auto">Charlotte Green</h6>
                                            </div>
                                            <div class="text-truncate">
                                                last seen 6 hours ago
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <div class="hover_action">
                                <button type="button" class="btn btn-link text-info"><i
                                    class="zmdi zmdi-plus-circle"></i>
                                </button>
                            </div>
                            <a href="#" class="card">
                                <div class="card-body">
                                    <div class="media">
                                        <div class="avatar me-3">
                                            <img class="avatar rounded-circle" src="@/assets/images/xs/avatar5.jpg"
                                                 alt="avatar">
                                        </div>
                                        <div class="media-body overflow-hidden">
                                            <div class="d-flex align-items-center mb-1">
                                                <h6 class="text-truncate mb-0 me-auto">Chloe Green</h6>
                                            </div>
                                            <div class="text-truncate">
                                                last seen 3 hours ago
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <div class="hover_action">
                                <button type="button" class="btn btn-link text-info"><i
                                    class="zmdi zmdi-plus-circle"></i>
                                </button>
                            </div>
                            <a href="#" class="card">
                                <div class="card-body">
                                    <div class="media">
                                        <div class="avatar me-3">
                                            <img class="avatar rounded-circle" src="@/assets/images/xs/avatar6.jpg"
                                                 alt="avatar">
                                        </div>
                                        <div class="media-body overflow-hidden">
                                            <div class="d-flex align-items-center mb-1">
                                                <h6 class="text-truncate mb-0 me-auto">Charles Green</h6>
                                            </div>
                                            <div class="text-truncate">
                                                last seen 2 hours ago
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="header d-flex justify-content-between ps-3 pe-3 mb-1">
                            <span>D</span>
                        </li>
                        <li>
                            <div class="hover_action">
                                <button type="button" class="btn btn-link text-info"><i
                                    class="zmdi zmdi-plus-circle"></i>
                                </button>
                            </div>
                            <a href="#" class="card">
                                <div class="card-body">
                                    <div class="media">
                                        <div class="avatar me-3">
                                            <img class="avatar rounded-circle" src="@/assets/images/xs/avatar4.jpg"
                                                 alt="avatar">
                                        </div>
                                        <div class="media-body overflow-hidden">
                                            <div class="d-flex align-items-center mb-1">
                                                <h6 class="text-truncate mb-0 me-auto">David Green</h6>
                                            </div>
                                            <div class="text-truncate">
                                                last seen 6 hours ago
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="header d-flex justify-content-between ps-3 pe-3 mb-1">
                            <span>M</span>
                        </li>
                        <li>
                            <div class="hover_action">
                                <button type="button" class="btn btn-link text-info"><i
                                    class="zmdi zmdi-plus-circle"></i>
                                </button>
                            </div>
                            <a href="#" class="card">
                                <div class="card-body">
                                    <div class="media">
                                        <div class="avatar me-3">
                                            <img class="avatar rounded-circle" src="@/assets/images/xs/avatar8.jpg"
                                                 alt="avatar">
                                        </div>
                                        <div class="media-body overflow-hidden">
                                            <div class="d-flex align-items-center mb-1">
                                                <h6 class="text-truncate mb-0 me-auto">Michael Green</h6>
                                            </div>
                                            <div class="text-truncate">
                                                last seen 6 hours ago
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <div class="hover_action">
                                <button type="button" class="btn btn-link text-info"><i
                                    class="zmdi zmdi-plus-circle"></i>
                                </button>
                            </div>
                            <a href="#" class="card">
                                <div class="card-body">
                                    <div class="media">
                                        <div class="avatar me-3">
                                            <img class="avatar rounded-circle" src="@/assets/images/xs/avatar8.jpg"
                                                 alt="avatar">
                                        </div>
                                        <div class="media-body overflow-hidden">
                                            <div class="d-flex align-items-center mb-1">
                                                <h6 class="text-truncate mb-0 me-auto">Mohammad</h6>
                                            </div>
                                            <div class="text-truncate">
                                                last seen 6 hours ago
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="header d-flex justify-content-between ps-3 pe-3 mb-1">
                            <span>T</span>
                        </li>
                        <li>
                            <div class="hover_action">
                                <button type="button" class="btn btn-link text-info"><i
                                    class="zmdi zmdi-plus-circle"></i>
                                </button>
                            </div>
                            <a href="#" class="card">
                                <div class="card-body">
                                    <div class="media">
                                        <div class="avatar me-3">
                                            <img class="avatar rounded-circle" src="@/assets/images/xs/avatar9.jpg"
                                                 alt="avatar">
                                        </div>
                                        <div class="media-body overflow-hidden">
                                            <div class="d-flex align-items-center mb-1">
                                                <h6 class="text-truncate mb-0 me-auto">Tommy Green</h6>
                                            </div>
                                            <div class="text-truncate">
                                                last seen 6 hours ago
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
    <client-only>
        <el-drawer
            v-model="drawer"
            title="Chat"
            :direction="direction"
            size="70%"
        >
            <template #default>
                <div class="sidebar sidebar_drawer">

                    <div class="tab-content">

                        <div class="tab-pane fade show active" id="nav-tab-chat" role="tabpanel">

                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <h3 class="mb-0 text-primary">Chat</h3>
                                <!--<div>-->
                                <!--    <button class="btn btn-dark" type="button">New Chat</button>-->
                                <!--</div>-->
                            </div>

                            <div class="form-group input-group-lg search mb-3">
                                <i class="zmdi zmdi-search"></i>
                                <i class="zmdi zmdi-dialpad"></i>
                                <input type="text" class="form-control" v-model="qs_input" @keydown.enter.native="qs_search" placeholder="Search...">
                            </div>

                            <ul class="chat-list">
                                <li class="header d-flex justify-content-between ps-3 pe-3 mb-1">
                                    <span>RECENT CHATS</span>
                                    <div class="dropdown">
                                        <a @click="all_message()" class="btn btn-link px-1 py-0 border-0 text-muted dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="zmdi zmdi-refresh"></i></a>
                                    </div>
                                </li>
                                <li>
                                    <div class="card" @click="check_message(0)">
                                        <div class="card-body">
                                            <div class="media">
                                                <div class="avatar me-3">
                                                    <div class="avatar rounded-circle no-image bg-primary text-light">
                                                        <span><i class="zmdi zmdi-comment-text"></i></span>
                                                    </div>
                                                </div>
                                                <div class="media-body overflow-hidden">
                                                    <div class="d-flex align-items-center mb-1">
                                                        <h6 class="text-truncate mb-0 me-auto">ChatGPT</h6>

                                                    </div>
                                                    <div class="text-truncate">
                                                        <i class="zmdi zmdi-circle text-success"></i> Online
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <el-skeleton :rows="5" animated v-if="data_load"/>
                                <div class="bot_info" v-else v-loading="left_loding">
                                    <li class="online" :class="ms_active==item[item.length-1].session_id?'active':''"
                                        v-for="(item,index) in messages" :key="index">
                                        <div class="hover_action">

                                            <!--<button type="button" class="btn btn-link text-warning"><i class="zmdi zmdi-star"></i>-->
                                            <!--</button>-->
                                            <button type="button" @click="delete_msg(item[item.length-1].session_id)" class="btn btn-link text-danger"><i class="zmdi zmdi-delete"></i>
                                            </button>
                                        </div>
                                        <div class="card" @click="check_message(item[item.length-1].session_id)">
                                            <div class="card-body">
                                                <div class="media">
                                                    <div class="avatar me-3">
                                                        <span class="status rounded-circle"></span>
                                                        <img class="avatar rounded-circle" src="@/assets/images/xs/avatar5.jpg"
                                                             alt="avatar">
                                                    </div>
                                                    <div class="media-body overflow-hidden">
                                                        <div class="d-flex align-items-center mb-1">
                                                            <h6 class="text-truncate mb-0 me-auto">{{
                                                                    item[item.length - 1].question
                                                                }}</h6>
                                                            <p class="small text-muted text-nowrap ms-4 mb-0">
                                                                {{ item[item.length - 1].created_at }}</p>
                                                        </div>
                                                        <div class="text-truncate h-20" v-html="item[item.length - 1].message.replace(/\n/g, '<br />')"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </div>
                            </ul>
                            <el-pagination
                                :current-page="page"
                                :page-size="limit"
                                :pager-count="4"
                                background
                                layout="prev, pager, next"
                                :total="ms_count"
                                @current-change="handleCurrentChange"
                            />
                        </div>
                        <!--this is jiehu-->

                        <!--this is change jiehu-->
                    </div>

                </div>
            </template>

        </el-drawer>
    </client-only>


</template>
<script lang="ts" setup>
import {ref} from 'vue'
import {ElMessage,ElMessageBox,ElDrawer} from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import html2canvas from "html2canvas";
import Prism from 'prismjs'
import hljs from 'highlight.js'
import markdownIt from 'markdown-it'

import { useCounter } from '~/store/counter'
const counter = useCounter()
const renderMarkdown = (markdown: any) => {
    return markdownIt({
        highlight: (str: string, lang: string) => {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return `<pre class="hljs"><span class="pre_copy">Copy</span><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`
                } catch (__) {}
            }

            return `<pre class="hljs"><span class="pre_copy">Copy</span><code>${markdownIt().utils.escapeHtml(str)}</code></pre>`
        },
        breaks: true // 添加breaks插件
    }).render(markdown)
}
useHead({
    title: counter.setting.title,
    meta: [
        { name: 'description', content: counter.setting.description},
        { name: 'keywords', content: counter.setting.keywords}
    ]
})
const token = useCookie('token')
const router = useRouter();
const messages = ref([]) as any
const ms_active = ref(0)
const me_message = ref([]) as any
const loadins = ref(false)
const send_loading = ref(false)
const data_load = ref(true)
const scene_model = ref([]) as any
const m_last = ref({}) as any

const page = ref(1);
const limit = ref(8);
const ms_count = ref(0)
const left_loding = ref(false)


onMounted(async () => {
    console.log('start')
    // 先获取数据
    // nextTick保证你的获取到的已转成html的markdown内容已经更新到HTML的DOM结构中了。
    await nextTick()
    //  然后执行高亮即可
    Prism.highlightAll()
})
// 请求左侧列表
const all_message = () => {
    data_load.value = true
    get_message({
        page: page,
        limit: limit,
    }).then((res: any) => {
        messages.value = res._rawValue.data
        scene_model.value = res._rawValue.scene
        m_last.value = res._rawValue.m_last
        ms_count.value = res._rawValue.count
        left_loding.value = false
        data_load.value = false
    }).catch((err: any) => {
        data_load.value = false
        left_loding.value = false
        console.log(err)
    })
}
all_message()

const handleCurrentChange = (val: number) => {
    console.log(val)
    left_loding.value = true

    get_message({
        page: val,
        limit: limit,
    }).then((res: any) => {
        page.value = val
        messages.value = res._rawValue.data
        ms_count.value = res._rawValue.count
        left_loding.value = false
    }).catch((err: any) => {
        left_loding.value = false
        console.log(err)
    })

}
// 单独请求聊天记录
const check_message = (id: number) => {
    ms_active.value = id
    loadins.value = true
    c_message({
        session_id: id,
    }).then((res: any) => {
        me_message.value = res._rawValue.data
        loadins.value = false
        down_message()
    }).catch((err: any) => {
        loadins.value = false
    })
}

const down_message = () => {
    setTimeout(() => {
        let chat = document.getElementsByClassName('chat-content')[0]
        chat.style.transition = "500ms"; // 过渡时间为0.5秒
        chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
    }, 100)
}
// 发送消息
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    message_input:'',
})

const rules = reactive<FormRules>({
    message_input: [
        {required: true, message: '请输入内容', trigger: 'blur'},
    ],
})
const { public: { baseUrl } } = useRuntimeConfig()


const headers = {
    'Authorization': `Bearer ${token.value}`,
    'Accept': 'text/event-stream',
}
const is_done = ref(true)
const streams = ref()
const  submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            if (!token.value) {
                ElMessage.warning('请先登录')
                router.push({path: "/login"})
                return false
            }
            send_loading.value = true
            me_message.value.push({
                "session_id": ms_active.value,
                "question": ruleForm.message_input,
                "message": "",
            })
            down_message()
            const res = await fetch(`${baseUrl}api/send_bot`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    info: ruleForm.message_input,
                    session_id: ms_active.value
                }),

            })

            console.log(res)
            if (res.status==500){
                send_loading.value = false
                ElMessage.error('服务器错误')
                return false
            }
            if (res.status==401){
                send_loading.value = false
                ElMessage.error('禁止发送违禁词')
                return false
            }
            if (res.status==402){
                send_loading.value = false
                ElMessage.error('发送次数上线或余额不足')
                return false
            }
            const stream = res.body?.getReader();
            const onData = ({ value }: { value: Uint8Array }) => {
                let result = new TextDecoder().decode(value);
                // console.log(result);
                let arr  = result.split('\n\n').map(str => str.replace(/\n/g, ''));
                let new_arr: any[] = [];
                // console.log(arr)
                for (let i = 0; i < arr.length; i++) {
                    is_done.value = false
                        if(arr[i].slice(-2) == ']}' && arr[i].startsWith('data:')){
                            new_arr.push(JSON.parse(arr[i].replace('data:', '')));
                        }else if(arr[i].startsWith('data:') && arr[i].slice(-2) != ']}'){
                            streams.value = arr[i].replace('data:', '');
                        }else if(arr[i].slice(-2) == ']}' && arr[i].startsWith('data:') == false){
                            // 与streams.value拼接成一个字符串
                            let str = streams.value+= arr[i]
                            new_arr.push(JSON.parse(str.replace('data:', '')))
                            streams.value = ''
                        }else{
                            if (arr[i].includes('"error"')){
                                me_message.value[me_message.value.length - 1].message= JSON.parse(arr[i]).error.message
                            }
                            streams.value = ''
                        }

                }


                // console.log(new_arr)
                for (let i = 0; i < new_arr.length; i++) {
                    setTimeout(() => {
                        if (new_arr[i].choices[0].delta.content){
                            me_message.value[me_message.value.length - 1].message += new_arr[i].choices[0].delta.content
                        }
                        down_message()
                    }, 100)

                }

            };


            const read = async () => {
                const result = await stream?.read();
                if (result?.done) {
                    console.log('done')
                    is_done.value = true
                    send_loading.value = false
                    ruleForm.message_input = ''
                    if (ms_active.value==0){
                            all_message()
                            setTimeout(() => {
                                if (ms_active.value == 0){
                                    ms_active.value = m_last.value.session_id
                                }
                                check_message(ms_active.value)
                            }, 2000)

                        }



                } else {
                    send_loading.value = true
                    is_done.value = false
                    onData(result!);
                    await read();
                }
            };
            await read();


        } else {
            console.log('error submit!', fields)
        }
    })
}
const qs_input = ref('')
const qs_search = ()=>{
    if (!qs_input.value) {
        ElMessage.warning('请输入内容')
        return
    }
    searchs({
        search:qs_input.value
    }).then((res: any) => {
        messages.value = res._rawValue.data
        ElMessage.success('搜索完成')
    }).catch((err: any) => {
        ElMessage.error(err.message)
    })
}

const handleCommand = (command: any) => {
    ruleForm.message_input = scene_model.value[command].Instruction
}

const delete_msg = (id: number) => {
    ElMessageBox.confirm('此操作将永久删除该会话, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        del_msg({
            session_id: id,
        }).then((res: any) => {
            ElMessage.success('删除成功')
            all_message()
        }).catch((err: any) => {
            ElMessage.error(err.message)
        })
    }).catch(() => {
        ElMessage.info('已取消删除')
    })
}

const handleClick = (command: any) => {
    const input = document.createElement('input')
    input.setAttribute('readonly', 'readonly')
    input.setAttribute('value', command.replace(/&nbsp;/g, ' '))
    document.body.appendChild(input)
    input.select()
    if (document.execCommand('copy')) {
        document.execCommand('copy')
        ElMessage.success('复制成功')
    }
    document.body.removeChild(input)
}

const  posterimg  = ref();
// 绑定  需要把那个内容生成图片
const  poster  =ref();

const up_new_img = (text: any) => {
    html2canvas(poster.value,{
        backgroundColor:'#fff',//海报的背景颜色
        useCORS:true, // 允许跨域
        // 设置放⼤的倍数
        scale:1,
        scrollX: 0,
        // width:'100%', //生成海报的w
        // height:'100%', //生成海报的h    默认是px
    }).then(canvas=>{
        // canvas 其实就是我们所讲的res 的意思 返回报文的意思
        let  baseImg = canvas.toDataURL("image/png");
        posterimg.value =baseImg;
        let save  = document.createElement('a');
        // <a href=''></a>
        save.href = baseImg;
        // 下载的名字
        save.download = 'yz'
        // 直接回调a的点击事件
        save.click()

    })
}


const drawer = ref(false)
const direction = ref('ltr')
const change_side = () => {
    drawer.value = true
}
</script>

