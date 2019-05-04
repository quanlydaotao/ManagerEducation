import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styles from './styles.css';
import ViewListIcon from '@material-ui/icons/ViewListRounded';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import { EnhancedTableAccount } from './components/EnhancedTableAccount';
import { FormSign } from './components/FormSign';

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

const style = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class TabBars extends React.Component {
    state = {
        value: 'one',
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="inherit" className={`${styles.HeaderAppBar}`}>
                    <Tabs value={value} onChange={this.handleChange} indicatorColor="inherit">
                        <Tab value="one" icon={<ViewListIcon />} label="DANH SÁCH CHI TIẾT TÀI KHOẢN"/>
                        <Tab value="two" icon={<PersonAddIcon />} label="THÊM MỚI TÀI KHOẢN" />
                    </Tabs>
                </AppBar>
                {value === 'one' && <TabContainer><EnhancedTableAccount listName="DANH SÁCH TÀI KHOẢN" /></TabContainer>}
                {value === 'two' && <TabContainer><FormSign /></TabContainer>}
            </div>
        );
    }
}

TabBars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(TabBars);