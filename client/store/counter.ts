import { defineStore } from 'pinia'

interface CounterState {
    setting:any
}

// @ts-ignore
export const useCounter = defineStore('counter', {
    state: (): CounterState => ({
        setting: {}
    }),

    actions: {
        increment() {
            this.setting
        }
    },

    persist: process.client && {
        storage: localStorage,
        paths: ['setting']
    }
})
