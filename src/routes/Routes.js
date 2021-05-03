import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Task1 } from '../view/task1';
import { Task2 } from '../view/task2';

export const Routes = (props) => {
	return (
		<Router>
			{props.children}
			<Switch>
				<Route exact path={'/task1'} component={Task1} />
				<Route exact path={'/task2'} component={Task2} />
				<Route component={Task1} />
			</Switch>
		</Router>
	)
}