import { useDispatch, useSelector } from 'react-redux';

import getModal from './getModal.js';
import { removeModal } from '../../slices/modalSlice.js';

const Modal = () => {
  const { isOpen, type } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(removeModal());
  const Component = getModal(type);

  return (
    Component ? <Component isOpen={isOpen} close={handleClose} /> : null
  );
};

export default Modal;
