import React from 'react';
import PropTypes from 'prop-types';
import ContactItem from 'components/ContactItem/ContactItem';
import style from 'components/ContactsList/ContactsList.module.css'
import { useSelector } from 'react-redux';
import { getFilter } from 'redux/contactsSlice';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from 'redux/contactsAPI';

const ContactsList = () => {
  const { data = [] } = useGetContactsQuery();
  const { filter } = useSelector(state => getFilter(state));
  const [deleteContact] = useDeleteContactMutation();

  const handleDeleteContact = id => deleteContact(id);

  const filterList = () => {
    const normalValue = filter.toLowerCase().trim();
    return data.filter(contact =>
      contact.name.toLowerCase().includes(normalValue)
    );
  };

  const contactsList = filterList();

  return (
    <ul className={style.contacts__list}>
      {contactsList.length > 0 ? (
        filterList().map(({ id, name, phone}) => {
          return (
            <ContactItem
            key={id}
            id={id}
            name={name}
            number={phone}
            onClick={handleDeleteContact}
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
  