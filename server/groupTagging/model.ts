import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

/**
 * This file defines the properties stored in a GroupTagging
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for GroupTagging on the backend
export type GroupTagging = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  groupUsername: string;
  groupMembers: string[];
  groupTags: string[]; // Contains freet ids of freets containing a group tag
  groupAdmin: string[];
};

// Mongoose schema definition for interfacing with a MongoDB table
// GroupTagging stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const GroupTaggingSchema = new Schema({
  // The groups's username
  groupUsername: {
    type: String,
    required: true
  },
  // The usernames of the group's members
  groupMembers: {
    type: [String],
    required: true
  },
  // The freetId of all freets containing the group's tag
  groupTags: {
    type: [String],
    required: false
  },
  // The usernames of the group's admin
  groupAdmin: {
    type: [String],
    required: true
  }
});

const GroupTaggingModel = model<GroupTagging>('GroupTagging', GroupTaggingSchema);
export default GroupTaggingModel;
