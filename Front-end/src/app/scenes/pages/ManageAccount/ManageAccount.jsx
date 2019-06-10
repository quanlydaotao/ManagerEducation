import React, { Suspense } from 'react';
import styles from './styles.css';
import { TabBars } from './components/TabBars';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
const Statistical = React.lazy(() => import('./components/Statistical/Statistical'));
const FormSign = React.lazy(() => import('./components/FormSign/FormSign'));
const EnhancedTableAccount = React.lazy(() => import('./components/EnhancedTableAccount/EnhancedTableAccount'));
const EditAccount  = React.lazy(() => import('./components/EditAccount/EditAccount'));

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 0 }}>
			{props.children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

const ManageAccount = ({ match }) => {
	return (
		<div className={`${styles.mainManageAccount}`}>
			<TabBars />
			<Switch>
				<Route exact path={`${match.url}/users`} render={() => (
					<TabContainer>
						<Suspense fallback={''}>
							<EnhancedTableAccount listName="DANH SÁCH QUẢN LÝ ĐĂNG NHẬP HỆ THỐNG" />
						</Suspense>
					</TabContainer>
				)} />
				<Route exact path={`${match.url}/new`} render={() => (
					<TabContainer>
						<Suspense fallback={<div>Loading...</div>}>
							<FormSign />
						</Suspense>
					</TabContainer>
				)} />
				<Route exact path={`${match.url}/users/:id`} component={EditAccount} />
			</Switch>
		</div>
	);
}

export default withRouter(ManageAccount);
