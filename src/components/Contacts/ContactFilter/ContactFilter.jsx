import { searchAction } from 'components/redux/store';
import { useDispatch, useSelector } from 'react-redux';

export default function ContactFiler() {
  const search = useSelector(state=>state.search)
  const dispatch = useDispatch();
  const handleChange = e => {
    dispatch({ type: searchAction.toString(), payload: `${e.target.value}` });
  };
  return (
    <>

      <h3>Find by name</h3>
      <input onChange={handleChange} value={search}></input>
    </>
  );
}
