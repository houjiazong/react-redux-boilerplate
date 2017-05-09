import React from 'react'
import {Route, Switch} from 'react-router-dom'

import MainLayout from './containers/MainLayout'
import NotFound from './components/NotFound'
import About from './containers/About'
import Home from './containers/Home'

export const getRoutesConfig = () => [
  {
    name: 'home',
    exact: true,
    path: '/',
    component: Home
  },
  {
    name: 'about',
    path: '/about/',
    component: About
  }
]

export const makeRoutes = () => {
  return (
    <MainLayout>
      <Switch>
        {getRoutesConfig().map(route => <Route {...route} key={route.name} />)}
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  )
}
