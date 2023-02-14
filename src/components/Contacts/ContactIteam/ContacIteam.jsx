import { deleteContactAction } from 'components/redux/store';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
export default function ContactIteam({ contact }) {
  const { id, name, number } = contact;
  const dispatch = useDispatch();
  const handleGetIdContact = () => {
    dispatch({ type: deleteContactAction.toString(), payload: id });
  };
  return (
    <li>
      {name}:{number}
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
    number: PropTypes.string.isRequired,
  }),
};
