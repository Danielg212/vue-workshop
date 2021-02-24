  # Hello and welcome to part 1 of Vue+TS workshop
  
   In this part we will create the vue components.
   
   First of all, we want our todo app to have the following functionallity as a start:
  
  - adding a new task and mark task as done
  - display list of tasks
  
  <b>Let's go!</b>
  
First of all, let's create the relevant components in `@/components/todo-list ` by the following commends:

``` 
cd todo-list 
```
   
and then
   
```  
vgc generate component src/components/todo-list
vgc -s src/components/todo-list/AddTask
vgc -s src/components/todo-list/TaskItem
vgc -s src/components/todo-list/TaskList
vgc -s src/components/todo-list/TasksStatus
```

now, we will add todo-list to the router.
Add the following to *router/index.ts* : 

```javascript
import TodoList from '@/components/todo-list/todo-list.component.vue'

...

const routes: Array<RouteConfig> = [
  {
    ...
     children:[
      {
       path:'todo',
       component:TodoList
      }
      ...
   }
 ]
```

next, add Task model to *src/models/task.ts* (create it)

```typescript
export interface Task {
  id:string;
  done: boolean;
  description: string;
}
```

now, we will add the logic and build the realtions between the components:

> In *todo-list.component.ts* add
```typescript
import AddTask from '@/components/todo-list/AddTask.vue'
import TaskList from '@/components/todo-list/TaskList.vue'
import TasksStatus from '@/components/todo-list/TasksStatus.vue'
import { Task } from '@/models/Task';

@Component({
  components:{AddTask,TaskList,TasksStatus}
})
export default class TodoListComponent extends Vue {
  private tasks: Array<Task> = []

  addTask(task: Task){    
    this.tasks.push(task);
  }

  removeTask(id: string){
    const taskIndex: number = this.tasks.findIndex(t => t.id === id)
    taskIndex > -1 ? this.tasks.splice(taskIndex, 1) : new Error('Invalid index');
  }

}
```
and in its html:
```html
<v-container style="max-width: 500px">
  <add-task @addTaskEvent="addTask"></add-task>
  <tasks-status :tasks="tasks"></tasks-status>
  <task-list :tasks="tasks" @delete="removeTask"></task-list>
</v-container>
```
In the TS file we add the functionallaty for adding task and removing task from our tasks container.
In the html we passing the tasks array as props to `tasks-status` and `task-list`. Also, we add event handler when task added in `add-task` tag.

*A small notice:* In Vue, `add-task` is allias for `AddTask` tag in the html...

> In *AddTask.vue* add

```vue
<template>
  <div class="add-task">
    <v-text-field
      v-model="task"
      label="What are you working on?"
      solo
      @keydown.enter="task.trim().length && emitTask()"
    >
      <v-fade-transition slot="append">
        <div>
          <v-icon v-if="task" @click.stop="emitTask">
            add_circle
          </v-icon>
        </div>
      </v-fade-transition>
    </v-text-field>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { v4 as uuid } from 'uuid'

@Component({})
export default class AddTaskComponent extends Vue {
  public task = ''

  emitTask() {
    const id: string = uuid()
    this.$emit('addTaskEvent', { id: id, description: this.task })
    this.task = ''
  }
}
</script>
```
We have` task` as a model for each item as we pass it with `v-model` for two-way data binding, this is how we create a reactivity in Vue.

We also adding click event-listener each time the use add new task description, we handle this event by emmiting it to the parent.

> In *TasksStatus.vue* add
```vue
<template>
  <v-layout my-1 align-center>
    <strong class="mx-3 info--text text--darken-3">
      Remaining: {{ remainingTasks }}
    </strong>

    <strong class="mx-3 black--text"> Completed: {{ completedTasks }} </strong>

    <v-spacer></v-spacer>
    <v-progress-circular :value="progress" class="mr-2"></v-progress-circular>
  </v-layout>
</template>

<script lang="ts">
import { Task } from '@/models/Task'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component({})
export default class TasksStatus extends Vue {
  @Prop({ type: [Array], default: () => [] }) tasks!: Task[]

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

we want to have some indicators about our progress with our tasks. so we have *computed functions* that change the view each time change detected in our data that we want to compute, in this case its the `tasks` prop (it's a copy since we are using `filter` that create a new array).

> In *TaskListComponent.vue* add:
```vue

<template>
  <div class="task-list">
    <v-card v-if="tasks.length > 0">
      <v-slide-y-transition class="py-0" group tag="v-list">
        <template v-for="(task, i) in tasks">
          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
          <task-item
            :task="task"
            :key="`${i}-${task.text}`"
            @delete="onDeleate"
          ></task-item>
        </template>
      </v-slide-y-transition>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Task } from '@/models/Task'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import TaskItem from '@/components/todo-list/TaskItem.vue'

@Component({
  components: { TaskItem }
})
export default class TaskListComponent extends Vue {
  @Prop({ type: [Array], default: () => [] }) tasks!: Task[]

  onDeleate(val: string) {
    this.$emit('delete', val)
  }
}
</script>

<style scoped lang="scss">
.task-list {
}
</style>
```

As you can see, In TaskListComponent we get the tasks container as props and we iterting over it and printing its items by passing a `task` object to `task-item` component as props. In `task-item` we also have an `@delete` event listener that emit to the parent 'delete' event with the item's id to delete.  

> In *TaskListComponent.vue* add:
```vue
<template>
  <div class="task-item">
    <v-list-item class="text-wrap">
      <v-list-item-action>
        <v-checkbox v-model="task.done" color="info darken-3">
          <div
            slot="label"
            :class="(task.done && 'grey--text') || 'text--primary'"
            class="ml-3"
            v-text="task.description"
          ></div>
        </v-checkbox>
      </v-list-item-action>

      <v-spacer></v-spacer>
      <v-scroll-x-transition class="indicators" group tag="div">
        <span v-if="!task.done" class="btns" :key="'edit'">
          <v-btn
            @click.stop="$emit('delete', task.id)"
            class="pa-2"
            color="primary"
            fab
            x-small
            dark
          >
            <v-icon>
              delete
            </v-icon>
          </v-btn>
        </span>

        <v-icon key="'success'" v-if="task.done" color="success">
          check
        </v-icon>
      </v-scroll-x-transition>
    </v-list-item>
  </div>
</template>
<script lang="ts">
import { Task } from '@/models/Task'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component({})
export default class TaskItemComponent extends Vue {
  @Prop({ type: [Object] }) task!: Task
}
</script>

<style scoped lang="scss">
.task-item {
}
</style>

```

  
