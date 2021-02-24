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






  
