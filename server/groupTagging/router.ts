import type {Request, Response} from 'express';
import express from 'express';
import GroupTaggingCollection from './collection';
import * as userValidator from '../user/middleware';
import * as groupTaggingValidator from './middleware';
import * as util from './util';

const router = express.Router();

/**
 * Create a new group.
 *
 * @name POST /api/groupTagging
 *
 * @param {string} groupUsername - The username of the group
 * @return {GroupTaggingResponse} - The created group
 * @throws {400} - If username is not given
 * @throws {403} - If user is not logged in
 * @throws {404} - If group creator with the given username does not exist
 * @throws {409} - If group with the given username already exists
 *
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    groupTaggingValidator.isGroupUsernameNotAlreadyInUse,
    groupTaggingValidator.isUserExists
  ],
  async (req: Request, res: Response) => {
    const group = await GroupTaggingCollection.createGroup(req.body.groupUsername, req.body.groupCreatorUsername);
    res.status(201).json({
      message: 'Your group was created successfully.',
      group: util.constructGroupTaggingResponse(group)
    });
  }
);

/**
 * Add a member to a group.
 *
 * @name PUT /api/groupTagging?groupUsername=username1&addedGroupMemberUsername=username2&action=addMember
 *
 * @param {string} groupUsername - The name of the group
 * @param {string} addedGroupMemberUsername - The username the user being added to the group
 * @throws {400} - If user with username is not given
 * @throws {403} - If user is not logged in
 * @throws {404} - If group with the given username does not exist or user with given username does not exist
 *
 */
/**
 * Remove a member from a group.
 *
 * @name PUT /api/groupTagging?groupUsername=username1&removedGroupMemberUsername=username2&action=removeMember
 *
 * @param {string} groupUsername - The name of the group
 * @param {string} removedGroupMemberUsername - The username the user being removed from the group
 * @throws {400} - If user with username is not given
 * @throws {403} - If user is not logged in
 * @throws {404} - If group with the given username does not exist or user with given username does not exist
 *
 */
/**
 * Add an admin to a group.
 *
 * @name PUT /api/groupTagging?groupUsername=username1&addedAdminUsername=username2&action=addAdmin
 *
 * @param {string} groupUsername - The name of the group
 * @param {string} addedAdminUsername - The username the user being added to the group admin
 * @throws {400} - If user with username is not given
 * @throws {403} - If user is not logged in
 * @throws {404} - If group with the given username does not exist or user with given username does not exist
 *
 */
/**
 * Remove an admin from a group.
 *
 * @name PUT /api/groupTagging?usernameOfFollowed=username1&removedAdminUsername=username2&action=removeAdmin
 *
 * @param {string} groupUsername - The name of the group
 * @param {string} removedAdminUsername - The username the user being removed from the group admin
 * @throws {400} - If user with username is not given
 * @throws {403} - If user is not logged in
 * @throws {404} - If group with the given username does not exist or user with given username does not exist
 *
 */
/**
 * Add freet id of a freet containing a group tag to a group.
 *
 * @name PUT /api/groupTagging?groupUsername=username1&taggedFreetId=freetId&action=addTag
 *
 * @param {string} groupUsername - The name of the group
 * @param {string} taggedFreetId - The id of the freet containing the grouptag
 * @throws {400} - If freet Id is not given
 * @throws {403} - If user is not logged in
 * @throws {404} - If group with the given username does not exist
 *
 */
router.put(
  '/',
  [
    userValidator.isUserLoggedIn,
    groupTaggingValidator.isGroupUsernameExist,
    groupTaggingValidator.isUserExists
  ],
  async (req: Request, res: Response) => {
    if (req.body.action === 'addMember') {
      const group = await GroupTaggingCollection.addGroupMember(req.body.groupUsername, req.body.addedGroupMemberUsername);
      res.status(200).json({
        message: 'Your group membership was updated successfully (added member).',
        group: util.constructGroupTaggingResponse(group)
      });
    } else if (req.body.action === 'removeMember') {
      const group = await GroupTaggingCollection.removeGroupMember(req.body.groupUsername, req.body.removedGroupMemberUsername);
      res.status(200).json({
        message: 'Your group membership was updated successfully. (removed member)',
        group: util.constructGroupTaggingResponse(group)
      });
    } else if (req.body.action === 'addAdmin') {
      const group = await GroupTaggingCollection.addAdmin(req.body.groupUsername, req.body.addedAdminUsername);
      res.status(200).json({
        message: 'Your group admin was updated successfully (added admin).',
        group: util.constructGroupTaggingResponse(group)
      });
    } else if (req.body.action === 'removeAdmin') {
      const group = await GroupTaggingCollection.removeAdmin(req.body.groupUsername, req.body.removedAdminUsername);
      res.status(200).json({
        message: 'Your group admin was updated successfully. (removed admin)',
        group: util.constructGroupTaggingResponse(group)
      });
    } else if (req.body.action === 'addTag') {
      const group = await GroupTaggingCollection.tagGroup(req.body.groupUsername, req.body.taggedFreetId);
      res.status(200).json({
        message: 'Your group tags was updated successfully.',
        group: util.constructGroupTaggingResponse(group)
      });
    }
  }
);

/**
 * Get a group's information.
 *
 * @name GET /api/groupTagging?groupUsername=username
 *
 * @return {GroupTaggingResponse} - List of a user's followers
 * @throws {404} - If group with the given username does not exist
 *
 */
router.get(
  '/',
  [
    groupTaggingValidator.isGroupUsernamePresent
  ],
  async (req: Request, res: Response) => {
    const group = await GroupTaggingCollection.findOneByUsername(req.query.groupUsername as string);
    res.status(200).json({
      message: 'Your group information was found successfully.',
      group: util.constructGroupTaggingResponse(group)
    });
  }
);

export {router as groupTaggingRouter};
