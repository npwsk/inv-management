import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStaffMembers } from '../actions/staff.js';

const useStaffMembers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStaffMembers());
  }, [dispatch]);

  const staffMembers = useSelector((state) => state.staff);

  return staffMembers;
};

export default useStaffMembers;
