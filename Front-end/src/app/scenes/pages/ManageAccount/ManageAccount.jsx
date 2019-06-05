import React, { Suspense } from 'react';
import styles from './styles.css';
import { TabBars } from './components/TabBars';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
const Statistical = React.lazy(() => import('./components/Statistical/Statistical'));
const FormSign = React.lazy(() => import('./components/FormSign/FormSign'));
const EnhancedTableAccount = React.lazy(() => import('./components/EnhancedTableAccount/EnhancedTableAccount'));

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

const ManageAccount = () => {
	return (
		<div className={`${styles.mainManageAccount}`}>
			<TabBars />
			<Switch>
				<Route exact path="/admin/account" render={() => (
					<TabContainer>
						<Suspense fallback={''}>
							<Statistical />
						</Suspense>
					</TabContainer>
				)} />
				<Route exact path="/admin/account/list/all" render={() => (
					<TabContainer>
						<Suspense fallback={''}>
							<EnhancedTableAccount listName="DANH SÁCH QUẢN LÝ ĐĂNG NHẬP HỆ THỐNG" />
						</Suspense>
					</TabContainer>
				)} />
				<Route exact path="/admin/account/add/new" render={() => (
					<TabContainer>
						<Suspense fallback={<div>Loading...</div>}>
							<FormSign />
						</Suspense>
					</TabContainer>
				)} />
			</Switch>
		</div>
	);
}

export default ManageAccount;
