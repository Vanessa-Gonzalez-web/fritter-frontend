import type {HydratedDocument} from 'mongoose';
import type {ContactInformationDisplay} from './model';

type ContactInformationDisplayResponse = {
  _id: string;
  contactInformationDisplayed: boolean;
  username: string;
  contactNumber: string;
  contactEmail: string;
  contactWebsite: string;
  contactAddress: string;
};

/**
 * Transform a raw Contact object from the database into an object
 * with all the information needed by the frontend
 * (in this case, removing the password for security)
 *
 * @param {HydratedDocument<ContactInformationDisplay>} contact - A user object
 * @returns {ContactInformationDisplayResponse} - The user object without the password
 */
const constructContactResponse = (contact: HydratedDocument<ContactInformationDisplay>): ContactInformationDisplayResponse => {
  const ContactInformationDisplayCopy: ContactInformationDisplay = {
    ...contact.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return {
    ...ContactInformationDisplayCopy,
    _id: ContactInformationDisplayCopy._id.toString(),
    contactInformationDisplayed: ContactInformationDisplayCopy.contactInformationDisplayed,
    username: ContactInformationDisplayCopy.username,
    contactNumber: ContactInformationDisplayCopy.contactNumber,
    contactEmail: ContactInformationDisplayCopy.contactEmail,
    contactWebsite: ContactInformationDisplayCopy.contactWebsite,
    contactAddress: ContactInformationDisplayCopy.contactAddress
  };
};

export {
  constructContactResponse
};
