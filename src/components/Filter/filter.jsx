import React from 'react';
import PropTypes from 'prop-types';
import style from 'components/Filter/filter.module.css';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch(setFilter);


  const handleFilterChange = e => dispatch(setFilter(e.currentTarget.value));
  return (
  <div>
    <label className={style.label_filter} htmlFor=""> Filtr by Name</label>
    <input 
    className={style.input_filter} 
    type="text" 
    onChange={handleFilterChange} />
  </div>
  
);
}
Filter.propTypes = {
  onChange: PropTypes.func,
};

export default Filter;
