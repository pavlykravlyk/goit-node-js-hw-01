const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");
const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return (contact = contacts.find(({ id }) => id === contactId));
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    null;
  }
  const filteredContacts = contacts.filter((_, idx) => idx !== index);
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
  return contacts[index];
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
