import type {HydratedDocument, Types} from 'mongoose';
import type {ContactInformationDisplay} from './model';
import ContactInformationDisplayModel from './model';

/**
 * This file contains a class with functionality to interact with contact information displays stored
 * in MongoDB, including adding, finding, updating, and deleting. Feel free to add
 * additional operations in this file.
 *
 * Note: HydratedDocument<ContactInformationDisplay> is the output of the ContactInformationDisplayModel() constructor,
 * and contains all the information in ContactInformationDisplay. https://mongoosejs.com/docs/typescript.html
 */
class ContactInformationDisplayCollection {
  /**
   * Add a new contact information display
   *
   * @param {boolean} contactInformationDisplayed - whether the information will be displayed on a user's profile
   * @param {string} username - The username of the user
   * @param {string} contactNumber - contact number of the user
   * @param {string} contactEmail - contact email of the user
   * @param {string} contactWebsite - contact website of the user
   * @param {string} contactAddress - contact address of the user
   * @return {Promise<HydratedDocument<ContactInformationDisplay>>} - The newly created contact information display
   */
  static async addOne(contactInformationDisplayed: boolean, username: string, contactNumber: string, contactEmail: string, contactWebsite: string, contactAddress: string): Promise<HydratedDocument<ContactInformationDisplay>> {
    const contactInformation = new ContactInformationDisplayModel({contactInformationDisplayed, username, contactNumber, contactEmail, contactWebsite, contactAddress});
    await contactInformation.save();
    return contactInformation;
  }

  /**
   * Update user's contact information
   *
   * @param {string} username - The username of the user to update
   * @param {Object} contactDetails - An object with the user's updated contact information
   * @return {Promise<HydratedDocument<ContactInformationDisplay>>} - The updated contact information display
   */
  static async updateOne(username: string, contactDetails: any): Promise<HydratedDocument<ContactInformationDisplay>> {
    const contactInformation = await ContactInformationDisplayModel.findOne({username});

    // Only update information if a value is given
    if (contactDetails.contactInformationDisplayed) {
      contactInformation.contactInformationDisplayed = contactDetails.contactInformationDisplayed as boolean;
    }

    // If a value of 'delete' is given, remove the previous value from the display
    if (contactDetails.contactNumber) {
      if (contactDetails.contactNumber === 'delete') {
        contactInformation.contactNumber = '';
      } else {
        contactInformation.contactNumber = contactDetails.contactNumber as string;
      }
    }

    if (contactDetails.contactEmail) {
      if (contactDetails.contactEmail === 'delete') {
        contactInformation.contactEmail = '';
      } else {
        contactInformation.contactEmail = contactDetails.contactEmail as string;
      }
    }

    if (contactDetails.contactWebsite) {
      if (contactDetails.contactWebsite === 'delete') {
        contactInformation.contactWebsite = '';
      } else {
        contactInformation.contactWebsite = contactDetails.contactWebsite as string;
      }
    }

    if (contactDetails.contactAddress) {
      if (contactDetails.contactAddress === 'delete') {
        contactInformation.contactAddress = '';
      } else {
        contactInformation.contactAddress = contactDetails.contactAddress as string;
      }
    }

    await contactInformation.save();
    return contactInformation;
  }

  /**
   * Find a user by username (case insensitive).
   *
   * @param {string} username - The username of the user to find
   * @return {Promise<HydratedDocument<ContactInformationDisplay>> | Promise<null>} - The user with the given username, if any
   */
  static async findOneByUsername(username: string): Promise<HydratedDocument<ContactInformationDisplay>> {
    return ContactInformationDisplayModel.findOne({username: new RegExp(`^${username.trim()}$`, 'i')});
  }
}

export default ContactInformationDisplayCollection;
