import React, { useEffect, useState } from 'react';
import '../ContactList/ContactList.css';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal'; // Import the modal component

const ContactList = () => {
    // State for storing contacts
    const [contacts, setContacts] = useState([]);
    // State for tracking which message is visible
    const [visibleMessage, setVisibleMessage] = useState(null);
    // State for controlling the visibility of the delete confirmation modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    // State for storing the ID of the contact to be deleted
    const [contactToDelete, setContactToDelete] = useState(null);

    // Fetch contacts from the server when the component mounts
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch('http://localhost:4000/allcontacts');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setContacts(data);
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        };

        fetchContacts();
    }, []);

    // Mark a contact as contacted
    const handleContacted = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/contacted/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setContacts(contacts.map(contact =>
                contact._id === id ? { ...contact, contacted: true } : contact
            ));
        } catch (error) {
            console.error("Error updating contact status:", error);
        }
    };

    // Handle contact deletion
    const handleDelete = async () => {
        if (contactToDelete) {
            try {
                const response = await fetch('http://localhost:4000/removecontact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ _id: contactToDelete }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                setContacts(contacts.filter(contact => contact._id !== contactToDelete));
                setContactToDelete(null);
                setIsModalOpen(false);
            } catch (error) {
                console.error("Error deleting contact:", error);
            }
        }
    };

    // Toggle the visibility of a contact's message
    const toggleMessageVisibility = (id) => {
        setVisibleMessage(visibleMessage === id ? null : id);
    };

    // Open the delete confirmation modal
    const openDeleteModal = (id) => {
        setContactToDelete(id);
        setIsModalOpen(true);
    };

    // Close the delete confirmation modal
    const closeDeleteModal = () => {
        setIsModalOpen(false);
        setContactToDelete(null);
    };

    return (
        <div className="contact-list">
            <h1>Contact Requests</h1>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact => (
                        <tr key={contact._id}>
                            <td>{contact.firstName}</td>
                            <td>{contact.lastName}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone}</td>
                            <td>
                                <button
                                    className="contact-list-show-message"
                                    onClick={() => toggleMessageVisibility(contact._id)}
                                >
                                    {visibleMessage === contact._id ? 'Hide Message' : 'Show Message'}
                                </button>
                                {visibleMessage === contact._id && (
                                    <div className="contact-list-message contact-list-message-visible">
                                        {contact.message}
                                    </div>
                                )}
                            </td>
                            <td>{new Date(contact.date).toLocaleDateString()}</td>
                            <td>
                                {!contact.contacted ? (
                                    <button
                                        className="contact-list-contact-button"
                                        onClick={() => handleContacted(contact._id)}
                                    >
                                        Contact
                                    </button>
                                ) : (
                                    <button
                                        className="contact-list-contacted-button"
                                        disabled
                                    >
                                        Contacted
                                    </button>
                                )}
                                <button
                                    className="contact-list-delete-button"
                                    onClick={() => openDeleteModal(contact._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isModalOpen && (
                <ConfirmDeleteModal 
                    message="Are you sure you want to delete this contact?"
                    onConfirm={handleDelete}
                    onCancel={closeDeleteModal}
                />
            )}
        </div>
    );
};

export default ContactList;
