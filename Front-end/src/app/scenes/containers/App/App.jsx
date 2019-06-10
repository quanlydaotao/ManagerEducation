import React, { Component, Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { PrivateRoute } from '../../../state/utils';
const PageWrapperAdmin = React.lazy(() => import('../PageWrapperAdmin/PageWrapperAdmin'));

class App extends Component {

	authenticate(){
		return new Promise(resolve => setTimeout(resolve, 2000))
	}
	
	componentDidMount(){
		this.authenticate().then(() => {
		  const ele = document.getElementById('ipl-progress-indicator')
		  if(ele){
			// fade out
			ele.classList.add('available')
			setTimeout(() => {
			  // remove from DOM
			  ele.outerHTML = ''
			}, 2000)
		  }
		})
	  }

	 render() {
	    return (
			<React.Fragment> 
				<Switch>
			        <Suspense fallback="">
		                <Route
		                    exact
		                    path="/"
		                    render={() => (
		                        <Redirect to="/auth/login" />
		                    )}
		                />
		                <Route
		                    exact
		                    path="/auth"
		                    render={() => (
		                        <Redirect to="/auth/login" />
		                    )}
		                />
		                <Route
		                    exact
		                    path="/auth/login"
		                    component={React.lazy(() => import('../LoginWrapper/LoginWrapper'))}
		                />
		                <Route
		                    exact
		                    path="/admin"
		                    render={() => (
		                        <Redirect to="/admin/home" />
		                    )}
		                />
		                <PrivateRoute
		                    path="/admin"
		                    component={PageWrapperAdmin}
		                />
		            </Suspense>
			    </Switch>  
			</React.Fragment> 
		    )
		}
}

export default App;
