
import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import style from 'components/ContactForm/contactForm.module.css'
import {
  useGetContactsQuery,
  useCreateContactMutation,
} from 'redux/contactsAPI';

export default function ContactForm(){

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
 
  const { data: contacts } = useGetContactsQuery();
  const [createContact] = useCreateContactMutation();

  const handleNameChange = e => {
    setName(e.currentTarget.value);
  }
    const handleNumberChange = e => {
      setNumber(e.currentTarget.value);
    };

 const handleSubmit = e => {
    e.preventDefault();
    const newContact = {
      name,
      number,
      id: shortid.generate(),
    };
  contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
  ? alert(`${name} is already in contacts`)
  : createContact(newContact);
reset();
};
const reset = () => {
  setName('');
  setNumber('');
};
  
    return (
      <div className={style.border}>
        <form className={style.form} onSubmit={handleSubmit}>
          <label className={style.label}>Name</label>
          <input
              className={style.input}
              type="text"
              name="name"
              value={name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={handleNameChange}
            />
          <label className={style.label}>Number</label>
          <input
              className={style.input}
              type="tel"
              name="number"
              value={number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={handleNumberChange}
            />
          <button className={style.button} type="submit">Add contact</button>
        </form>
      </div>
    );
  }


  ContactForm.propTypes = {
    handleSubmit: PropTypes.func
  };
  

