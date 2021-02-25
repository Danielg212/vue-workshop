# Vuex store + TS 
   ### Motivation
   In part #1 we have the parant component that works as controller e.g. - having a single source that need to be updated by binding to other compontnes and         listners when the source is changing. This is consider a bad practice since that bloat our app an make our state very hard to maintan an understandble. 
   
   ### Solution  🦸‍♂️
Adding a [Vuex-store]( https://vuex.vuejs.org ) (TS) for having a shared state between all components in one shared global store.

Let's do it!! 💪
> ## creating our store
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
```Typescript 
import Vue from 'vue'
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

> ## Linking our components with the store
 Before we start, since we want to work with typescript and make our code elegant and crear as possible let's install *vuex binding helpers*.

 let's run: `npm install --save vuex-class`.
 
 now, let's add the binding annotations in our components and delete the "bad" old approach.
 
 firs of all, let's delete the shared state we passing and maneging from the parent `todo-list.component.html` and `todo-list.component.ts`:
```html
<v-container style="max-width: 500px">
  <add-task></add-task>
  <tasks-status></tasks-status>
  <task-list></task-list>
</v-container>
```
```Typescript
...
@Component({
  components: { AddTask, TaskList, TasksStatus }
})
export default class TodoListComponent extends Vue {
}

```
now in `AddTask.vue`
```Typescript
import { Action } from 'vuex-class'

@Component({})
export default class AddTaskComponent extends Vue {
  @Action('addTask') addTask!: any

  public task = ''

  emitTask() {
    const id: string = uuid()
    this.addTask({ id: id, description: this.task })
    this.task = ''
  }
}
```
and `TaskList.vue`
```Typescript
import { Getter, Action } from 'vuex-class'

@Component({
  components: { TaskItem }
})
export default class TaskListComponent extends Vue {
  @Getter('tasks') tasks!: Array<Task>
  @Action('removeTask') removeTask!: any

  onDeleate(val: string) {
    this.removeTask(val)
  }
}
```
and `TasksStatus.vue`
```Typescript
import { Getter } from 'vuex-class'

@Component({})
export default class TasksStatus extends Vue {
  @Getter('tasks') tasks!: Array<Task>

  get remainingTasks(): number {
    return this.tasks.filter(t => !t.done).length
  }

  get completedTasks(): number {
    return this.tasks.filter(t => t.done).length
  }

  get progress(): number {
    return this.completedTasks
      ? (this.completedTasks / this.tasks.length) * 100
      : 0
  }
}
```

> ## Persist our state 
 what if we want to persist our state? thats easy! just install `vuex-persistedstate` by running `npm install --save vuex-persistedstate`
 afterward we will add it in store/index.ts as plugin:
 ```typescript
 ...
 import createPersistedState from 'vuex-persistedstate'
   ...
   const store: StoreOptions<Response<Task[]>> = {
   state: {
      ...
     },
  plugins: [createPersistedState({ storage: window.localStorage })] // you can use sessionStorage also
}
```

# Thats it! 🎉🎉🎉🎉

 
 
`



