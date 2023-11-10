<script setup lang="ts">
import { cdBn, nanoid } from '@cd-vuejs3/utils'
import { ref, reactive } from 'vue'
import CdNav from './NavView.vue'

const nanoidRes = ref<string | undefined>(undefined)

const bnObj = reactive<{
  addA: any
  addB: any
  addRes: any
  addList: any[]
  addAllRes: any

  subA: any
  subB: any
  subRes: any
  subListA: any[]
  subListB: any[]
  subAllRes: any

  mulA: any
  mulB: any
  mulRes: any
  mulList: any[]
  mulAllRes: any

  divA: any
  divB: any
  divRes: any
  divListA: any[]
  divListB: any[]
  divAllRes: any
}>({
  addA: undefined,
  addB: undefined,
  addRes: undefined,
  addList: [undefined, undefined, undefined],
  addAllRes: undefined,

  subA: undefined,
  subB: undefined,
  subRes: undefined,
  subListA: [undefined, undefined, undefined],
  subListB: [undefined, undefined, undefined],
  subAllRes: undefined,

  mulA: undefined,
  mulB: undefined,
  mulRes: undefined,
  mulList: [undefined, undefined, undefined],
  mulAllRes: undefined,

  divA: undefined,
  divB: undefined,
  divRes: undefined,
  divListA: [undefined, undefined, undefined],
  divListB: [undefined, undefined, undefined],
  divAllRes: undefined
})

const add = () => {
  bnObj.addRes = cdBn.add(bnObj.addA, bnObj.addB)
}
const addAll = () => {
  bnObj.addAllRes = cdBn.addAll([...bnObj.addList])
}

const addToAddList = () => {
  bnObj.addList.push(undefined)
}

const resetAddList = () => {
  bnObj.addList = [undefined, undefined, undefined]
  bnObj.addAllRes = undefined
}

const sub = () => {
  bnObj.subRes = cdBn.sub(bnObj.subA, bnObj.subB)
}
const subAll = () => {
  bnObj.subAllRes = cdBn.subAll([...bnObj.subListA], [...bnObj.subListB])
}

const subToSubListA = () => {
  bnObj.subListA.push(undefined)
}
const subToSubListB = () => {
  bnObj.subListB.push(undefined)
}

const resetSubListA = () => {
  bnObj.subListA = [undefined, undefined, undefined]
  bnObj.subAllRes = undefined
}

const resetSubListB = () => {
  bnObj.subListB = [undefined, undefined, undefined]
  bnObj.subAllRes = undefined
}

const mul = () => {
  bnObj.mulRes = cdBn.mul(bnObj.mulA, bnObj.mulB)
}
const mulAll = () => {
  bnObj.mulAllRes = cdBn.mulAll([...bnObj.mulList])
}

const mulToMulList = () => {
  bnObj.mulList.push(undefined)
}

const resetMulList = () => {
  bnObj.mulList = [undefined, undefined, undefined]
  bnObj.mulAllRes = undefined
}

const div = () => {
  bnObj.divRes = cdBn.div(bnObj.divA, bnObj.divB)
}
const divAll = () => {
  bnObj.divAllRes = cdBn.divAll([...bnObj.divListA], [...bnObj.divListB])
}

const divToDivListA = () => {
  bnObj.divListA.push(undefined)
}
const divToDivListB = () => {
  bnObj.divListB.push(undefined)
}

const resetDivListA = () => {
  bnObj.divListA = [undefined, undefined, undefined]
  bnObj.divAllRes = undefined
}

const resetDivListB = () => {
  bnObj.divListB = [undefined, undefined, undefined]
  bnObj.divAllRes = undefined
}
</script>

<template>
  <div class="contains">
    <CdNav />
    <h1 class="title">test utils</h1>

    <div class="sections">
      <div class="section">
        <div class="t-c">
          <div>test big number: add</div>
          <div>(a + b)</div>
        </div>
        <el-input v-model="bnObj.addA" type="number" clearable @input="add">
          <template #prepend>a</template>
        </el-input>
        <el-input v-model="bnObj.addB" type="number" clearable @input="add">
          <template #prepend>b</template>
        </el-input>
        <div v-if="!!bnObj.addRes" class="mt-5 c-g">result: {{ bnObj.addRes }}</div>
      </div>

      <div class="section">
        <div class="t-c">
          <div>test big number: add all</div>
          <div>(a + b + c + ...)</div>
        </div>
        <template v-for="(addItem, i) in bnObj.addList" :key="i">
          <el-input v-model="bnObj.addList[i]" type="number" clearable @input="addAll" />
        </template>

        <el-button type="warning" class="button-new-tag ml-1 mt-5" @click="addToAddList">
          + new item
        </el-button>
        <el-button type="warning" class="button-new-tag ml-1 mt-5" @click="resetAddList">
          reset
        </el-button>
        <div v-if="!!bnObj.addAllRes" class="mt-5 c-g">result: {{ bnObj.addAllRes }}</div>
      </div>

      <div class="section">
        <div class="t-c">
          <div>test big number: sub</div>
          <div>(a - b)</div>
        </div>
        <el-input v-model="bnObj.subA" type="number" clearable @input="sub">
          <template #prepend>a</template>
        </el-input>
        <el-input v-model="bnObj.subB" type="number" clearable @input="sub">
          <template #prepend>b</template>
        </el-input>
        <div v-if="!!bnObj.subRes" class="mt-5 c-g">result: {{ bnObj.subRes }}</div>
      </div>

      <div class="section">
        <div class="t-c">
          <div>test big number: sub all</div>
          <div>(a0 + b0 + c0 + ...) - (A1 + B1 + C1 + ...)</div>
        </div>
        <template v-for="(subItem, i) in bnObj.subListA" :key="i">
          <el-input v-model="bnObj.subListA[i]" type="number" clearable @input="subAll" />
        </template>
        <el-button type="warning" class="mt-5 mb-5" @click="subToSubListA"> + new item</el-button>
        <el-button type="warning" class="mt-5 mb-5" @click="resetSubListA"> reset</el-button>

        <template v-for="(subItem, i) in bnObj.subListB" :key="i">
          <el-input v-model="bnObj.subListB[i]" type="number" clearable @input="subAll" />
        </template>
        <el-button type="warning" class="button-new-tag ml-1 mt-5" @click="subToSubListB">
          + new item
        </el-button>
        <el-button type="warning" class="button-new-tag ml-1 mt-5" @click="resetSubListB">
          reset
        </el-button>

        <div v-if="!!bnObj.subAllRes" class="mt-5 c-g">result: {{ bnObj.subAllRes }}</div>
      </div>

      <div class="section">
        <div class="t-c">
          <div>test big number: mul</div>
          <div>(a * b)</div>
        </div>
        <el-input v-model="bnObj.mulA" type="number" clearable @input="mul">
          <template #prepend>a</template>
        </el-input>
        <el-input v-model="bnObj.mulB" type="number" clearable @input="mul">
          <template #prepend>b</template>
        </el-input>
        <div v-if="!!bnObj.mulRes" class="mt-5 c-g">result: {{ bnObj.mulRes }}</div>
      </div>

      <div class="section">
        <div class="t-c">
          <div>test big number: mul all</div>
          <div>(a * b * c * ...)</div>
        </div>
        <template v-for="(mulItem, i) in bnObj.mulList" :key="i">
          <el-input v-model="bnObj.mulList[i]" type="number" clearable @input="mulAll" />
        </template>

        <el-button type="warning" class="button-new-tag ml-1 mt-5" @click="mulToMulList">
          + new item
        </el-button>
        <el-button type="warning" class="button-new-tag ml-1 mt-5" @click="resetMulList">
          reset
        </el-button>
        <div v-if="!!bnObj.mulAllRes" class="mt-5 c-g">result: {{ bnObj.mulAllRes }}</div>
      </div>

      <div class="section">
        <div class="t-c">
          <div>test big number: div</div>
          <div>(a / b)</div>
        </div>
        <el-input v-model="bnObj.divA" type="number" clearable @input="div">
          <template #prepend>a</template>
        </el-input>
        <el-input v-model="bnObj.divB" type="number" clearable @input="div">
          <template #prepend>b</template>
        </el-input>
        <div v-if="!!bnObj.divRes" class="mt-5 c-g">result: {{ bnObj.divRes }}</div>
      </div>

      <div class="section">
        <div class="t-c">
          <div>test big number: div all</div>
          <div>(a0 * b0 * c0 * ...) / (A1 * B1 * C1 * ...)</div>
        </div>
        <template v-for="(divItem, i) in bnObj.divListA" :key="i">
          <el-input v-model="bnObj.divListA[i]" type="number" clearable @input="divAll" />
        </template>
        <el-button type="warning" class="button-new-tag ml-1 mt-5 mb-5" @click="divToDivListA">
          + new item
        </el-button>
        <el-button type="warning" class="button-new-tag ml-1 mt-5 mb-5" @click="resetDivListA">
          reset
        </el-button>

        <template v-for="(divItem, i) in bnObj.divListB" :key="i">
          <el-input v-model="bnObj.divListB[i]" type="number" clearable @input="divAll" />
        </template>
        <el-button type="warning" class="button-new-tag ml-1 mt-5" @click="divToDivListB">
          + new item
        </el-button>
        <el-button type="warning" class="button-new-tag ml-1 mt-5" @click="resetDivListB">
          reset
        </el-button>

        <div v-if="!!bnObj.divAllRes" class="mt-5 c-g">result: {{ bnObj.divAllRes }}</div>
      </div>

      <div class="section t-c">
        <div>random nanoid</div>
        <el-tag
          v-if="nanoidRes"
          type="success"
          closable
          @close="nanoidRes = undefined"
          class="block"
        >
          {{ nanoidRes }}
        </el-tag>
        <el-button type="primary" @click="nanoidRes = nanoid()">nanoid</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  text-align: center;
}

.mt-5 {
  margin-top: 5px;
}

.mb-5 {
  margin-bottom: 5px;
}

.bc-g {
  border: 1px solid seagreen;
}

.c-g {
  color: seagreen;
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
  min-width: 300px;
  background-color: #fcfcfc;

  .el-input {
    display: flex;
    min-width: 300px;
    max-width: 600px;
  }
}
</style>
