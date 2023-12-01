import { useState, useEffect } from "react";
import Section from "../../Section";
import Modal from "../Modal/Modal";
import ContactForm from "../ContactForm";
import ContactFilter from "../ContactFilter";
import ContactList from "../ContactList";
import { FirstToUpperCase, isName, toNumber, useLocalStorage } from "../../../utils";
import { nanoid } from "nanoid";

export default function PhonebookApp({ initialContacts = [] }) {
    const contactId = "contact";
    const [contact, setContact] = useLocalStorage(contactId, initialContacts);
    const [filter, setFilter] = useState('');
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(s => !s);
    };

    const addContact = ({ name, tel }) => {
        const newName = FirstToUpperCase(name);
        const isContact = contact ? contact.some(contact => contact.name.toLowerCase() === name.toLowerCase()) : false;

        if (isContact) {
            alert(`${newName} is already in contacts.`);
            return;
        }

        if (!isContact) {
            const newContact = {
                id: nanoid(),
                name: newName,
                tel: toNumber(tel),
            };

            setContact(
                s => {
                    if (s) return [newContact, ...s];
                    if (!s) return [newContact];
                }
            );
        }
    };

    const deleteContact = deleteId => {
        setContact(s => s.filter(({ id }) => (id !== deleteId))
        )
    };

    const onContactFilterChange = ({ target }) => {
        const { value } = target;
        setFilter(value.toLowerCase());
    };

    const getFilterContacts = () => {
        const filterContacts = contact.filter(
            ({ name, tel }) => {
                const n = name.toLowerCase();
                if (isName(filter)) return n.includes(filter);

                const t = toNumber(tel);
                return t.includes(toNumber(filter));
            }
        );
        return filterContacts;
    };

    return (
        <div>
            <h2>Phonebook</h2>

            <Section title='ContactForm'>
                <button type="button" onClick={toggleModal}>Add contact</button>
                <Modal show={showModal} onClose={toggleModal}>
                    <ContactForm onSubmit={addContact} />
                </Modal>
            </Section>

            {
                (contact.length >= 2) &&
                <Section title='Filter'>
                    <ContactFilter
                        value={filter}
                        onChange={onContactFilterChange}
                    />
                </Section>
            }

            {
                !(contact.length === 0) &&
                <Section title='Contacts'>
                    <ContactList
                        contacts={getFilterContacts()}
                        onDelete={deleteContact}
                    />
                </Section>
            }
        </div>
    );
};