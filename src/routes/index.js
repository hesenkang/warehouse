import Vue from 'vue'
import Router from 'vue-router'
import Warehouse from '@/components/warehouse/Warehouse'
import Task from '@/components/task/Task'
import TaskTableUpdate from '@/components/task/TableUpdate'
import Card from '@/components/card/Card'
import CardLogin from '@/components/card/CardLogin'
import Setting from '@/components/setting/Setting'
import Error from '@/components/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/warehouse'
    },
    {
      path: '/warehouse',
      name: 'Warehouse',
      component: Warehouse
    },
    {
      path: '/task',
      name: 'Task',
      component: Task
    },
    {
      path: '/task-table-update',
      name: 'TaskTableUpdate',
      component: TaskTableUpdate
    },
    {
      path: '/card',
      name: 'Card',
      component: Card
    },
    {
      path: '/cardlogin',
      name: 'CardLogin',
      component: CardLogin
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '*',
      name: 'Error',
      component: Error
    }
  ]
})
