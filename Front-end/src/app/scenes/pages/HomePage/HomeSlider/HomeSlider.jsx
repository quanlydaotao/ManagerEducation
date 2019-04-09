import React, { Component } from 'react';
import styles from './style.css';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Indications } from './components/Indicators';
import { Inner } from './components/Inner';
import { Controls } from './components/Controls';
import { bannerShape } from '../../../propTypes';
import { bannerOperations } from '../../../../state/ducks/banner';

class HomeSlider extends Component {
    componentDidMount() {
        if (this.props.banners.length === 0) {
            this.props.fetchListBanner();
        }
    }
    render() {
        const { banners } = this.props;
        var count = 0;
        return (
            <div id="carouselId" className="carousel slide" data-ride="carousel">
                <Indications banners={banners}/>
                <Inner banners={banners}/>
                <Controls />
            </div>
        );
    }
}

HomeSlider.PropTypes = {
    banners: PropTypes.arrayOf(bannerShape).isRequired,
    fetchListBanner: PropTypes.func.isRequired
}

HomeSlider.defaultProps = {
    banners: []
}

const mapStateToProps = state => ({
    banners : state.bannerReducer
});

const mapDispatchToProps = {
    fetchListBanner: bannerOperations.fetchListBanner,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeSlider);
