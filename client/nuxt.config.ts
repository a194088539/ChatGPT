// https://nuxt.com/docs/api/configuration/nuxt-config

import { loadEnv } from 'vite'

import prismjs from 'vite-plugin-prismjs'

export default defineNuxtConfig({
    telemetry: false,
    app: {
        head: {
           title: 'ChatGPT中文网 - 免费AI问答',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: 'chatGPT专业版，免费AI问答功能，采用GPT-3机器人，答案更精准，实现AI回答轻松获取，智能答案免去千篇一律，自动代码输出，引导程序员、办公人员、学生等写作思路' },
                { hid: 'description', name: 'keywords', content: 'chatgpt,openai,人工智能对话,在线聊天,免费ai问答' },

            ],
            link: [
                { rel: "icon", href: "/favicon.ico", type: 'image/x-icon'},
            ],
        }
    },
    css: [
        '~/assets/css/bootstrap-datepicker.min.css',
        '~/assets/fonts/material-icon/css/material-design-iconic-font.min.css',
        '~/assets/css/style.min.css',
        '~/assets/css/main.css',
    ],
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        '@nuxt/content'


    ],
    runtimeConfig: { // 运行时常量
        public:
            { // 客户端-服务的都能访问
                baseUrl: loadEnv(process.argv[process.argv.length - 1], './env').VITE_SERVER_NAME
            }
    },
    vite: {
        plugins: [
            prismjs({
                // 添加支持的高亮的语言, 如果需要支持全部的话改成这样:  languages: "all"
                languages: ['cpp',
                    'javascript',
                    'bash',
                    'dart',
                    'sql',
                    'css',
                    'html',
                    'java',
                    'json',
                    'sass',
                    'scss',
                    'c',
                    'log',
                    'swift',
                    'md',
                    'nginx',
                    'yaml',
                    'xml',
                    'shell',
                    'ts'
                ],
                // 配置prism插件 toolbar是后面两个插件依赖的插件.
                // show-language: 显示语言名。
                // copy-to-clipboard: 添加复制代码功能。
                plugins: ['toolbar', 'show-language', 'copy-to-clipboard'],
                // 主题名称,支持的主题可以在 node_moduels中安装此库的目录下寻找。
                theme: "tomorrow",
                css: true
            })
        ]
    },
    nitro: {
        devProxy: {
            "/api": {
                target: "http://127.0.0.1:58080",
                changeOrigin: true,
                prependPath: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            },
        },
    },


})
