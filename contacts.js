const shortid = require("shortid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const contacts = JSON.parse(data);
      console.table(contacts);
    })
    .catch((err) => console.log(err));
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const contacts = JSON.parse(data);

      const existingContact = contacts.find(
        (contact) => contact.id === contactId
      );

      if (!existingContact) {
        console.warn("\x1B[31m The contact doesn't exist!");
        return;
      }

      const searchedContact = contacts.find(
        (contact) => contact.id === contactId
      );
      console.table(searchedContact);
    })
    .catch((err) => console.log(err));
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const contacts = JSON.parse(data);

      const contactPresence = contacts.find(
        (contact) => contact.id === contactId
      );

      if (!contactPresence) {
        console.warn("\x1B[31m There is no contact to remove!");
        return;
      }

      const updatedContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
      const updatedDB = JSON.stringify(updatedContacts);
      fs.writeFile(contactsPath, updatedDB);

      const searchedContact = contacts.find(
        (contact) => contact.id === contactId
      );
      console.log("The following contact has been removed:");
      console.table(searchedContact);
    })
    .catch((err) => console.log(err));
}

function addContact(name, email, phone) {
  const newContact = {
    id: shortid.generate(),
    name,
    email,
    phone,
  };

  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const contacts = JSON.parse(data);

      const existingContact = contacts.find(
        (contact) => contact.name === newContact.name
      );

      if (existingContact) {
        console.warn("\x1B[31m This contact already exists!");
        return;
      }

      const allContacts = [newContact, ...contacts];
      const updatedDB = JSON.stringify(allContacts);
      fs.writeFile(contactsPath, updatedDB);

      console.log("The following contact has been added:");
      console.table(newContact);
    })
    .catch((err) => console.log(err));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
