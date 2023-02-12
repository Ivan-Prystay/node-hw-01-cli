const contactsOperations = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.table(contacts);
      break;

    case "get":
      try {
        const contact = await contactsOperations.getContactById(id);
        if (!contact) {
          throw new Error(`Contact with ID: ${id} not found`);
        }
        console.table(contact);
      } catch (error) {
        console.error("\x1B[31m Error: ", error.message);
      }
      break;

    case "add":
      const newContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.table(newContact);
      break;

    case "remove":
      try {
        const deletedContact = await contactsOperations.removeContact(id);
        if (!deletedContact) {
          throw new Error(`Contact with ID: ${id} not found`);
        }
        console.table(deletedContact);
      } catch (error) {
        console.error("\x1B[31m Error: ", error.message);
      }
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

//invokeAction({ action: "remove", id: "10" });

//invokeAction({ action: "get", id: "15" });

invokeAction({ action: "list" });

// invokeAction({
//   action: "add",
//   name: "Santa Babara",
//   email: "oopop@ukr.net",
//   phone: "(892) 359-315",
// });
