import React, { Component } from 'react';
import styles from './styles.css';
import Button from '@material-ui/core/Button';

class Search extends Component {
    render() {
        return (
            <div className={`${styles.Search}`}>
                <form className="card card-sm">
                    <div className={`row no-gutters align-items-center ${styles.cardBodyFix}`}>
                        <div className="col-auto">
                            <i className="fa fa-search h6 text-body" />
                            <select className={`${styles.Select}`}>
                                <option value="">Tìm kiếm theo</option>
                                <option value="">NĂM HỌC ĐÀO TẠO</option>
                                <option value="">KHÓA</option>
                            </select>
                        </div>
                        <div className="col">
                            <input className={`form-control form-control ${styles.formControlBorderless}`} type="search" placeholder="Nội dung tìm kiếm..." />
                        </div>
                        <div className="col-auto">
                            <Button className={`${styles.buttonSearch}`}  type="submit">Tìm kiếm</Button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Search;
