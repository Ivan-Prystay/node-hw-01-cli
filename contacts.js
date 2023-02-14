const { v4: uuidv4 } = require("uuid");

const path = require("path");
const fs = require("fs/promises");

const contactsPath = path.join(__dirname, "db/contacts.json");
// *     get All
async function listContacts() {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    return contacts;
  } catch (error) {
    console.error(error.message);
  }
}
//*             get  ID
async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    console.error(error.message);
  }
}
// *         add  Contact
async function addContact(data) {
  try {
    const contacts = await listContacts();
    const newContact = { id: uuidv4(), ...data };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
}
//*         remove  Contact
async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index === -1) {
      return null;
    }
    const [deletedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deletedContact;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
