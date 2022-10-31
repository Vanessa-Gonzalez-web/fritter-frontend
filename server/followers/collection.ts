import type {HydratedDocument, Types} from 'mongoose';
import type {Followers} from './model';
import FollowersModel from './model';

/**
 * This file contains a class with functionality to interact with followers stored
 * in MongoDB, including adding, finding, and updating. Feel free to add
 * additional operations in this file.
 *
 * Note: HydratedDocument<Followers> is the output of the FollowersModel() constructor,
 * and contains all the information in Followers. https://mongoosejs.com/docs/typescript.html
 */
class FollowersCollection {
  /**
   * Create a follower view for a user
   *
   * @param {string} username - The username of the user that is getting a follower view
   * @return {Promise<HydratedDocument<Followers>>} - The newly created Follower view
   */
  static async createFollowerView(username: string): Promise<HydratedDocument<Followers>> {
    const followers = new FollowersModel({username});
    await followers.save(); // Saves user to MongoDB
    return followers;
  }

  /**
   * Find a user's follower view by username (case insensitive).
   *
   * @param {string} username - The username of the user to find
   * @return {Promise<HydratedDocument<Followers>> | Promise<null>} - The user with the given username, if any
   */
  static async findOneByUsername(username: string): Promise<HydratedDocument<Followers>> {
    return FollowersModel.findOne({username: new RegExp(`^${username.trim()}$`, 'i')});
  }

  /**
   * Add a new follower to a user
   *
   * @param {string} usernameOfFollowed - The username of the user that is being followed
   * @param {string} usernameOfFollower - The username of the user that is becoming a follower of the first user
   * @return {Promise<HydratedDocument<Followers>>} - Edited Followed User
   */
  static async addFollower(usernameOfFollowed: string, usernameOfFollower: string): Promise<HydratedDocument<Followers>> {
    // Marks that usernameOfFollowed gained usernameOfFollower as a follower
    const followed = await this.findOneByUsername(usernameOfFollowed);
    // Only allow a user to be added to the list once
    if (!followed.followers.includes(usernameOfFollower)) {
      followed.followers.push(usernameOfFollower);
      await followed.save(); // Saves user to MongoDB
    }

    // Marks that usernameOfFollower started following usernameOfFollowed
    const following = await this.findOneByUsername(usernameOfFollower);
    // Only allow a user to be added to the list once
    if (!following.following.includes(usernameOfFollowed)) {
      following.following.push(usernameOfFollowed);
      await following.save(); // Saves user to MongoDB
    }

    return followed;
  }

  /**
   * Remove a follower from a user
   *
   * @param {string} usernameOfFollowed - The username of the user that was followed
   * @param {string} usernameOfFollower - The username of the user that is being removed as a follower of the first user
   * @return {Promise<HydratedDocument<Followers>>} - Edited Followed User
   */
  static async removeFollower(usernameOfFollowed: string, usernameOfFollower: string): Promise<HydratedDocument<Followers>> {
    const followed = await this.findOneByUsername(usernameOfFollowed);
    const index1 = followed.followers.indexOf(usernameOfFollower);
    // Only remove follower if they are found in the list
    if (index1 !== -1) {
      followed.followers.splice(index1, 1);
    }

    await followed.save(); // Saves user to MongoDB

    const following = await this.findOneByUsername(usernameOfFollower);
    const index2 = following.following.indexOf(usernameOfFollowed);
    // Only remove following if they are found in the list
    if (index2 !== -1) {
      following.following.splice(index2, 1);
    }

    await following.save(); // Saves user to MongoDB
    return followed;
  }
}

export default FollowersCollection;
