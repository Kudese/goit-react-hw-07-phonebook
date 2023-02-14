import s from '../Contacts/Contacts.module.css';
import ContactFiler from './ContactFilter/ContactFilter';
import ContactIteam from './ContactIteam/ContacIteam';

import { useSelector } from 'react-redux';

export default function Contacts() {
  const data = useSelector(state => state.contact);
  const search = useSelector(state => state.search);

  const list = data.filter(el => {
    return el.name.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <div className={s.conteiner}>
      <h2>Contacts</h2>
      <ContactFiler />
      <ul>
        {list.map(el => {
          return <ContactIteam key={el.id} contact={el} />;
        })}
      </ul>
    </div>
  );
}
