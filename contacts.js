const { v4: uuidv4 } = require("uuid");

const path = require("path");
const fs = require("fs/promises");

const contactsPath = path.resolve("db", "contacts.json");

// TODO: задокументувати кожну функцію

// *     get All

async function listContacts() {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  return contacts;
}

//*             get  ID

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

// *         add  Contact

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

//*         remove  Contact
async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  console.table(contacts);
  console.log("Log contacts.js", deletedContact);

  return deletedContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
