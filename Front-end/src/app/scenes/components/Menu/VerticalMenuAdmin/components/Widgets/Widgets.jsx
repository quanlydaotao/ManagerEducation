import React from 'react';
import styles from './styles.css';

const Widgets = () => {
    return (
        <div className={`${styles.widgets}`} style={{textAlign: 'center'}}>
            <button type="button" class="btn btn-info"><i class="fa fa-info-circle" aria-hidden="true"></i></button>
            <button style={{color: '#fff'}} type="button" class="btn btn-warning"><i class="fa fa-calendar-times-o" aria-hidden="true"></i></button>
            <button type="button" class="btn btn-danger"><i class="fa fa-cog" aria-hidden="true"></i></button>
        </div>
    );
}

export default Widgets;
