import { useState, useEffect } from "react";
import Section from "../../Section";
import Modal from "../Modal/Modal";
import ContactForm from "../ContactForm";
import ContactFilter from "../ContactFilter";
import ContactList from "../ContactList";
import { FirstToUpperCase, isName, toNumber } from "../../../utils";
import { nanoid } from "nanoid";

export default function PhonebookApp({ initialContacts }) {
    const contactName = "contact";
    const [contact, setContact] = useState(initialContacts);
    const [filter, setFilter] = useState('');
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(s => !s);
    };

    const addContact = ({ name, tel }) => {
        const newName = FirstToUpperCase(name);
        const isContact = contact.some(contact => contact.name.toLowerCase() === name.toLowerCase());

        if (isContact) {
            alert(`${newName} is already in contacts.`);
            return;
        }

        if (!isContact) {
            const newContact = {
                name: newName,
                tel: toNumber(tel),
                id: nanoid(),
            };
            setContact(s => [newContact, ...s]);
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

    useEffect(
        () => {
            const localeContact = JSON.parse(localStorage.getItem(contactName));
            if (localeContact) {
                setContact(localeContact);
                return;
            }
            if (!localeContact) {
                localStorage.setItem(contactName, JSON.stringify(contact));
                return;
            }
        },
        []
    );

    useEffect(
        () => {
            localStorage.setItem(contactName, JSON.stringify(contact));
        },
        [contact]
    );

    return (
        <div>
            <h2>Phonebook</h2>

            <Section title='ContactForm'>
                <button type="button" onClick={toggleModal}>Add contact</button>
                <Modal showModal={showModal} onClose={toggleModal}>
                    <ContactForm onSubmit={addContact} />
                </Modal>
            </Section>

            <Section title='Filter'>
                <ContactFilter
                    value={filter}
                    onChange={onContactFilterChange}
                />
            </Section>

            <Section title='Contacts'>
                <ContactList
                    contacts={getFilterContacts()}
                    onDelete={deleteContact}
                />
            </Section>
        </div>
    );
};