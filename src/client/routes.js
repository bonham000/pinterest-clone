import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'

import About from './components/About'
import Dashboard from './containers/Dashboard'
import MyImages from './containers/MyImages'
import ViewAll from './containers/ViewAll'
import PassportAuth from './containers/PassportAuth'

export default (
  <Route name = 'home' component = {App}>
  	<Route path = '/' name = 'about' component = {About} />
  	<Route path = 'dashboard' name = 'dashboard' component = {Dashboard} />
  	<Route path = 'my-images' name = 'my-images' component = {MyImages} />
  	<Route path = 'view-all' name = 'view-all' component = {ViewAll} />
  	<Route path = 'account' name = 'account' component = {PassportAuth} />
  </Route>
);
