import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const withAuthentication = ( WrappedComponent ) => {
    const WithAuthentication = ( props ) => {
        console.log(props.isAuthenticated);
        if ( !props.isAuthenticated ) {
            return <Redirect to="/login" />;
        }

        return ( <WrappedComponent { ...props } /> );
    };

    WithAuthentication.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
    };

}

const mapStateToProps = state => ({
    isAuthenticated: state.session.sessionReducer,
});

export default connect(mapStateToProps, null)( withAuthentication );