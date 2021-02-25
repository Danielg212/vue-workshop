# Vuex store + TS 
   ### Motivation
   In part #1 we have the parant component that works as controller e.g. - having a single source that need to be updated by binding to other compontnes and         listners when the source is changing. This is consider a bad practice since that bloat our app an make our state very hard to maintan an understandble. 
   
   ### Solution  🦸‍♂️
Adding a [Vuex-store]( https://vuex.vuejs.org ) (TS) for having a shared state between all components in one shared global store.

Let's do it!! 💪

Step 1: run the following vue cli commend: `vue add vuex`.
Vue will add `store/store.ts` file and include it in the project in `main.ts` file.

Step 2: In the store folder create Result Generic Model
```Typescript
export interface Result<T> {
    success: boolean;
    message?: string;
    errorCode?: number;
    data: T;
}
```

Step 3: Open store/index.ts file and and change the code
```Typescriptimport Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { Response } from './response'
import { Task } from '@/models/Task'

Vue.use(Vuex)

const store: StoreOptions<Response<Task[]>> = {
  state: {
    success: true,
    data: new Array<Task>()
  },
  mutations: {
    addTask(state, task: Task) {
      state.data.push(task)
    },
    removeTask(state, id: string) {
      const taskIndex: number = state.data.findIndex(t => t.id === id)
      taskIndex > -1
        ? state.data.splice(taskIndex, 1)
        : new Error('Invalid index')
    }
  },
  actions: {
    addTask(contex, task: Task) {
      contex.commit('addTask', task)
    },
    removeTask(context, id: string) {
      context.commit('removeTask', id)
    }
  },
  getters: {
    tasks(state): Array<Task> {
      return state.data
    }
  }
}

export default new Vuex.Store<Response<Task[]>>(store)
```

> *I just prefer to store the data in a single file, You can also separate store to Multiple files*

### Mutations
The only way to actually change state in a Vuex store is by committing a mutation.

### Actions
Actions are similar to mutations, the differences being that actions are asynchronous methods.
