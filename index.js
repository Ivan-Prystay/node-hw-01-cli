const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const colorMessage = {
  red: "\x1B[41m",
  green: "\x1B[42m",
  yellow: "\x1B[43m\x1B[36m",
};

const contactsOperations = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    //!     get All

    case "list":
      const contacts = await contactsOperations.listContacts();
      console.table(contacts);
      console.log(
        `${colorMessage.green}Congratulation, found ${contacts.length} contacts!`
      );
      break;

    //!             get  ID

    case "get":
      try {
        const contact = await contactsOperations.getContactById(id);
        if (!contact) {
          throw new Error(`Contact with ID: ${id} not found`);
        }
        console.table(contact);
      } catch (error) {
        console.error(`${colorMessage.red} Error: `, error.message);
      }
      break;

    //!         add  Contact

    case "add":
      const newContact = await contactsOperations.addContact({
        name,
        email,
        phone,
      });
      console.table(newContact);
      break;

    //!         remove  Contact

    case "remove":
      try {
        const deletedContact = await contactsOperations.removeContact(id);
        if (!deletedContact) {
          throw new Error(`Contact with ID: ${id} not found`);
        }
        console.table(deletedContact);
      } catch (error) {
        console.error(`${colorMessage.red} Error: `, error.message);
      }
      break;
    default:
      console.warn(`${colorMessage.yellow} Unknown action type!`);
  }
}

const { argv } = yargs(hideBin(process.argv));
invokeAction(argv);
