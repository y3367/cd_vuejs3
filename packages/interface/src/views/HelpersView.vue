<script setup lang="ts">
import { cdFeedback, cdLoading, cdStorage, setKeyWithEnv } from '@cd-vuejs3/helpers'
import { reactive } from 'vue'
import CdNav from './NavView.vue'

const helpersObj = reactive<{
  envKey: any
  envKeyRes: any
  storageKey: any
  storageValue: any
  storageRes: any
}>({
  envKey: undefined,
  envKeyRes: undefined,
  storageKey: 'test-storage',
  storageValue: undefined,
  storageRes: undefined
})

const openLoadingGlobal = () => {
  cdLoading.open()
  setTimeout(() => {
    cdLoading.close()
  }, 2000)
}

const openLoadingLayout = () => {
  cdLoading.open({ target: '#cd-layout' }, undefined, 'layout')
  setTimeout(() => {
    cdLoading.close(undefined, undefined, 'layout')
  }, 2000)
}

const setStorage = () => {
  cdStorage.set(helpersObj.storageKey, helpersObj.storageValue)
  getStorage()
}
const getStorage = () => {
  helpersObj.storageRes = cdStorage.get(helpersObj.storageKey)
}
const removeStorage = () => {
  cdStorage.remove(helpersObj.storageKey)
  getStorage()
}
</script>

<template>
  <div>
    <CdNav />
    <h1 class="title">test helpers</h1>

    <div class="sections">
      <div class="section">
        <div>test env key</div>
        <el-input
          v-model="helpersObj.envKey"
          type="text"
          placeholder="env key value"
          clearable
          @input="helpersObj.envKeyRes = setKeyWithEnv(helpersObj.envKey)"
        />
        <el-input v-model="helpersObj.envKeyRes" disabled clearable />
      </div>

      <div class="section">
        <div>test loading layout</div>
        <el-button type="warning" @click="openLoadingGlobal()">loading global</el-button>
      </div>

      <div id="cd-layout" class="section">
        <div>test loading layout</div>
        <el-button type="primary" @click="openLoadingLayout()">loading layout</el-button>
      </div>

      <div class="section">
        <div>test storage, key: {{ setKeyWithEnv(helpersObj.storageKey) }}</div>
        <el-input
          v-model="helpersObj.storageValue"
          type="text"
          placeholder="to storage value"
          clearable
        />
        <el-input v-model="helpersObj.storageRes" disabled clearable />
        <el-button-group>
          <el-button type="primary" @click="getStorage()">get</el-button>
          <el-button type="warning" @click="setStorage()">set</el-button>
          <el-button type="warning" @click="removeStorage()">remove</el-button>
        </el-button-group>
      </div>

      <div class="section">
        <div>test feedback</div>
        <el-button-group>
          <el-button type="success" @click="cdFeedback.notifySuccess('Tip success')"
            >notify success(top-right)
          </el-button>
          <el-button
            type="success"
            @click="cdFeedback.notifySuccess('Tip success', { position: 'top-left' })"
            >notify success(top-left)
          </el-button>
          <el-button
            type="success"
            @click="cdFeedback.notifySuccess('Tip success', { position: 'bottom-left' })"
            >notify success(bottom-left)
          </el-button>
          <el-button
            type="success"
            @click="cdFeedback.notifySuccess('Tip success', { position: 'bottom-right' })"
            >notify success(bottom-right)
          </el-button>
        </el-button-group>
        <el-button-group>
          <el-button type="warning" @click="cdFeedback.notifyWarning('Tip warning')"
            >notify warning
          </el-button>
          <el-button type="danger" @click="cdFeedback.notifyError('Tip danger')"
            >notify danger
          </el-button>
          <el-button type="info" @click="cdFeedback.notifyInfo('Tip info')">notify info</el-button>
        </el-button-group>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  text-align: center;
}

.t-c {
  text-align: center;
}

.block {
  display: block;
}

.sections {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.section {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
}
</style>
