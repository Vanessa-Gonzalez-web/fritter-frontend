import type {HydratedDocument, Types} from 'mongoose';
import type {GroupTagging} from './model';
import GroupTaggingModel from './model';

/**
 * This files contains a class that has the functionality to explore GroupTagging
 * stored in MongoDB, including adding, finding, and updating groups.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<GroupTagging> is the output of the GroupTaggingModel() constructor,
 * and contains all the information in GroupTagging. https://mongoosejs.com/docs/typescript.html
 */
class GroupTaggingCollection {
  /**
   * Create a group
   *
   * @param {string} groupUsername - The intended name of the new group
   * @param {string} groupCreatorUsername - The username the new group creator
   * @return {Promise<HydratedDocument<GroupTagging>>} - The newly created group
   */
  static async createGroup(groupUsername: string, groupCreatorUsername: string): Promise<HydratedDocument<GroupTagging>> {
    const group = new GroupTaggingModel({
      groupUsername,
      groupMembers: [groupCreatorUsername],
      groupTags: [],
      groupAdmin: [groupCreatorUsername]
    });
    await group.save(); // Saves freet to MongoDB
    return group;
  }

  /**
   * Find a group by its username (case insensitive).
   *
   * @param {string} groupUsername - The username of the group to find
   * @return {Promise<HydratedDocument<GroupTagging>> | Promise<null>} - The group with the given username, if any
   */
  static async findOneByUsername(groupUsername: string): Promise<HydratedDocument<GroupTagging>> {
    return GroupTaggingModel.findOne({groupUsername: new RegExp(`^${groupUsername}$`, 'i')});
  }

  /**
   * Add a member to a group
   *
   * @param {string} groupUsername - The name of the group
   * @param {string} addedGroupMemberUsername - The username the user being added to the group
   * @return {Promise<HydratedDocument<GroupTagging>>} - The newly edited group
   */
  static async addGroupMember(groupUsername: string, addedGroupMemberUsername: string): Promise<HydratedDocument<GroupTagging>> {
    const group = await this.findOneByUsername(groupUsername);
    // Only adds members that are not already in the group
    if (!group.groupMembers.includes(addedGroupMemberUsername)) {
      group.groupMembers.push(addedGroupMemberUsername);
    }

    await group.save(); // Saves freet to MongoDB
    return group;
  }

  /**
   * Removed a member from a group
   *
   * @param {string} groupUsername - The name of the group
   * @param {string} removedGroupMemberUsername - The username the user being removed from the group
   * @return {Promise<HydratedDocument<GroupTagging>>} - The newly edited group
   */
  static async removeGroupMember(groupUsername: string, removedGroupMemberUsername: string): Promise<HydratedDocument<GroupTagging>> {
    const group = await this.findOneByUsername(groupUsername);
    const index = group.groupMembers.indexOf(removedGroupMemberUsername);
    // Only remove user if they are currently a member of the group
    if (index !== -1) {
      group.groupMembers.splice(index, 1);
    }

    await group.save(); // Saves freet to MongoDB
    return group;
  }

  /**
   * Add an admin member to a group
   *
   * @param {string} groupUsername - The name of the group
   * @param {string} addedAdminUsername - The username the user being added to the group admin
   * @return {Promise<HydratedDocument<GroupTagging>>} - The newly edited group
   */
  static async addAdmin(groupUsername: string, addedAdminUsername: string): Promise<HydratedDocument<GroupTagging>> {
    const group = await this.findOneByUsername(groupUsername);
    // Only adds admin that are not already admins
    if (!group.groupAdmin.includes(addedAdminUsername)) {
      group.groupAdmin.push(addedAdminUsername);
    }

    // Adds user to group if they were not already a member
    if (!group.groupMembers.includes(addedAdminUsername)) {
      group.groupMembers.push(addedAdminUsername);
    }

    await group.save(); // Saves freet to MongoDB
    return group;
  }

  /**
   * Removed an admin member from a group
   *
   * @param {string} groupUsername - The name of the group
   * @param {string} removedAdminUsername - The username the user being removed from the group admin
   * @return {Promise<HydratedDocument<GroupTagging>>} - The newly edited group
   */
  static async removeAdmin(groupUsername: string, removedAdminUsername: string): Promise<HydratedDocument<GroupTagging>> {
    const group = await this.findOneByUsername(groupUsername);
    const index = group.groupAdmin.indexOf(removedAdminUsername);
    // Only remove admin if they were already an admin
    if (index !== -1) {
      group.groupAdmin.splice(index, 1);
    }

    await group.save(); // Saves freet to MongoDB
    return group;
  }

  /**
   * Add a tagged Freet to a group
   *
   * @param {string} groupUsername - The name of the group
   * @param {string} taggedFreetId - The id of the freet containing the grouptag
   * @return {Promise<HydratedDocument<GroupTagging>>} - The newly edited group
   */
  static async tagGroup(groupUsername: string, taggedFreetId: string): Promise<HydratedDocument<GroupTagging>> {
    const group = await this.findOneByUsername(groupUsername);
    // Only adds admin that are not already admins
    if (!group.groupTags.includes(taggedFreetId)) {
      group.groupTags.push(taggedFreetId);
    }

    await group.save(); // Saves freet to MongoDB
    return group;
  }
}

export default GroupTaggingCollection;
