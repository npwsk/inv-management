import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations } from '../actions/location.js';

const useLocations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  const locations = useSelector((state) => state.locations);

  return locations;
};

export default useLocations;
