import React, { Fragment } from 'react';

export const Navigation = () => {
	return (
		<Fragment>
			<div className="navigation-content">
				<a className="navigation-content-item" href={'/task1'}>Task 1</a>
				<a className="navigation-content-item" href={'/task2'}>Task 2</a>
			</div>
		</Fragment>
	)
}
