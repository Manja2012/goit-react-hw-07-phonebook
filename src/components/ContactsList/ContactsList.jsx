import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ContactItem from 'components/ContactItem/ContactItem';
import style from 'components/ContactsList/ContactsList.module.css'
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import {deleteContact, fetchContacts} from 'redux/contactsAPI';

const ContactsList = () => {
  const dispatch = useDispatch();

  const onDelete = (id) => {
    dispatch(deleteContact(id));
  };

  const filter = useSelector(getFilter);
  

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const { contacts } = useSelector(getContacts);

  const filterContacts = () => {
    if (filter !== '') {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return contacts;
  };

  const filteredContacts = filterContacts();
  return (
    <ul className={style.contacts__list}>
      {filteredContacts && filteredContacts.length > 0 ? (
        filterContacts().map(({ id, name, phone}) => {
          return (
            <ContactItem
            key={id}
            id={id}
            name={name}
            number={phone}
            onClick={onDelete}
          />
        );
        })
  )  : 'No matches found'}
    </ul>
  )
  };
  
  ContactsList.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
    deleteContact: PropTypes.func,
  };
  
  export default ContactsList;
  