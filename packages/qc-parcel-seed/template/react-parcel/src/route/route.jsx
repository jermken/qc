import React from "react"
import { HashRouter, Route, Redirect } from "react-router-dom"
import Loadable from 'react-loadable'

const RouteList = Loadable.Map({
    loader: {
        home: () => import('../pages/home/home.jsx')
    },
    loading: () => null,
    render: (loaded, props) => Object.entries(loaded).map(item => <Route key={item[0]} path={`/${item[0]}`} component={item[1].default}></Route>)
})

const Routes = () => {
	return (
		<HashRouter>
			<Route path="/" exact render={() => <Redirect to="/home" />} />
            <RouteList/>
		</HashRouter>
	)
}

export default Routes
