import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

/**
 * This file defines the properties stored in a Follower
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Followers on the backend
export type Followers = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  username: string;
  following: string[];
  followers: string[];
};

// Mongoose schema definition for interfacing with a MongoDB table
// Followers stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const FollowersSchema = new Schema({
  // The user's username of this follow view
  username: {
    type: String,
    required: true
  },
  // The usernames of other users that this user follows
  following: {
    type: [String],
    required: false
  },
  // The usernames of other users that follow this user
  followers: {
    type: [String],
    required: false
  }
});

const FollowersModel = model<Followers>('Followers', FollowersSchema);
export default FollowersModel;
