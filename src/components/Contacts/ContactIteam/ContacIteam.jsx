// import { deleteContactAction } from 'components/redux/store';
import { deleteContact } from 'components/redux/contact.thunk';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
export default function ContactIteam({ contact }) {
  const { id, name, phone } = contact;
  const dispatch = useDispatch();
  const handleGetIdContact = () => {
    dispatch(deleteContact(id));
  };
  return (
    <li>
      {name}:{phone}
      <button type="button" onClick={handleGetIdContact}>
        Delete
      </button>
    </li>
  );
}
ContactIteam.propTypes = {
  contact: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
};
