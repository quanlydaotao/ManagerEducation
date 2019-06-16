import React, { Component, Suspense } from 'react';
import styles from './styles.css';
import { PropTypes } from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { TabBars } from './components/TabBars';
import Typography from '@material-ui/core/Typography';
const Statistical = React.lazy(() => import('./components/Statistical/Statistical'));
const Years = React.lazy(() => import('./components/Years/Years'));
const Class = React.lazy(() => import('./components/Class/Class'));


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

class ManageClass extends Component {
    render() {
        return (
            <div className={`${styles.mainManageClass}`}>
                <TabBars />
                <Switch>
                    <Route exact path="/admin/edu" render={() => (
                        <TabContainer>
                            aaaa
                        </TabContainer>
                    )} />
                    <Route path="/admin/edu/years" render={() => (
                        <TabContainer>
                            <Suspense fallback={'Loading...'}>
                                <Years />
                            </Suspense>
                        </TabContainer>
                    )} />
                    <Route path="/admin/edu/classes" render={() => (
                        <TabContainer>
                            <Suspense fallback={'Loading...'}>
                                <Class />
                            </Suspense>
                        </TabContainer>
                    )} />
                    <Route exact path="/admin/edu/courses" render={() => (
                        <TabContainer>
                            <Suspense fallback={'Loading...'}>
                                <div>Add new class</div>
                            </Suspense>
                        </TabContainer>
                    )} />
                    <Route exact path="/admin/edu/timetables" render={() => (
                        <TabContainer>
                            <Suspense fallback={'Loading...'}>
                                <Statistical />
                            </Suspense>
                        </TabContainer>
                    )} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(ManageClass);
