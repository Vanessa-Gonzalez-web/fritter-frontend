import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

/**
 * This file defines the properties stored for Contact Information Display
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Contact Information Display on the backend
export type ContactInformationDisplay = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  contactInformationDisplayed: boolean;
  username: string;
  contactNumber: string;
  contactEmail: string;
  contactWebsite: string;
  contactAddress: string;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Contact Information Display stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const ContactInformationDisplaySchema = new Schema({
  // Determines whether contact Information will be displayed
  contactInformationDisplayed: {
    type: Boolean,
    required: true
  },
  // Username of user where contact information will be displayed
  username: {
    type: String,
    required: true
  },
  // Contact Information Number, will be displayed as blank if left empty
  contactNumber: {
    type: String,
    required: false
  },
  // Contact Information Email, will be displayed as blank if left empty
  contactEmail: {
    type: String,
    required: false
  },
  // Contact Information Website, will be displayed as blank if left empty
  contactWebsite: {
    type: String,
    required: false
  },
  // Contact Information Address, will be displayed as blank if left empty
  contactAddress: {
    type: String,
    required: false
  }
});

const ContactInformationDisplayModel = model<ContactInformationDisplay>('ContactInformationDisplay', ContactInformationDisplaySchema);
export default ContactInformationDisplayModel;
