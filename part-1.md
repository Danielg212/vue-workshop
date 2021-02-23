  # Hello and welcome to part 1 of Vue+TS workshop
  
  In this part we will create the vue components
  first of all, we want our todo app to have the following functionallity as a start:
  
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
```



  
