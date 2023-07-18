import ContactForm from './ContactForm/ContactForm.jsx';
import ContactsList from './ContactsList/ContactsList.jsx';
import Filter from './Filter/filter.jsx';

export default function App(){
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm/>
      <h2>Contacts</h2>
      <Filter/>
      <ContactsList/>
    </div> 
  );
  }
