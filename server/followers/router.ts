import type {Request, Response} from 'express';
import express from 'express';
import FollowersCollection from './collection';
import * as userValidator from '../user/middleware';
import * as followersValidator from './middleware';
import * as util from './util';

const router = express.Router();

/**
 * Create a follower view for a user.
 *
 * @name POST /api/followers
 *
 * @param {string} username - The username of the user
 * @return {FollowersResponse} - The created follower view of the user
 * @throws {400} - If username is not given
 * @throws {403} - If user is not logged in
 * @throws {409} - If user follower view already exists
 *
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    followersValidator.isUsernameGiven,
    followersValidator.isUsernameNotAlreadyInUse
  ],
  async (req: Request, res: Response) => {
    const followers = await FollowersCollection.createFollowerView(req.body.username);
    res.status(201).json({
      message: 'Your follower view was created successfully.',
      followers: util.constructFollowersResponse(followers)
    });
  }
);

/**
 * Add a follower to a user.
 *
 * @name PUT /api/followers?usernameOfFollowed=username1&usernameOfFollower=username2&add=true
 *
 * @param {string} usernameOfFollowed - The username of the user that is being followed
 * @param {string} usernameOfFollower - The username of the user that is becoming a follower of the first user
 * @throws {400} - If either of the usernames are not given or are not valid
 * @throws {403} - If user is not logged in
 * @throws {404} - If either user does not have a follower view
 *
 */
/**
 * Remove a follower of a user.
 *
 * @name PUT /api/followers?usernameOfFollowed=username1&usernameOfFollower=username2&add=false
 *
 * @param {string} usernameOfFollowed - The username of the user that was being followed
 * @param {string} usernameOfFollower - The username of the user that is being removed as a follower of the first user
 * @throws {400} - If either of the usernames are not given or are not valid
 * @throws {403} - If user is not logged in
 * @throws {404} - If either user does not have a follower view
 */
router.put(
  '/',
  [
    userValidator.isUserLoggedIn,
    followersValidator.isBothUsernamesGiven,
    followersValidator.isBothUserFollowerInformationExists,
    followersValidator.isBothValidUsername
  ],
  async (req: Request, res: Response) => {
    if (req.body.add === 'true') {
      const followers = await FollowersCollection.addFollower(req.body.usernameOfFollowed, req.body.usernameOfFollower);
      const user2 = await FollowersCollection.findOneByUsername(req.body.usernameOfFollower);
      res.status(200).json({
        message: 'Your follower view was updated successfully (added follower).',
        usernameOfFollowed: util.constructFollowersResponse(followers),
        usernameOfFollower: util.constructFollowersResponse(user2)
      });
    } else {
      const followers = await FollowersCollection.removeFollower(req.body.usernameOfFollowed, req.body.usernameOfFollower);
      const user2 = await FollowersCollection.findOneByUsername(req.body.usernameOfFollower);
      res.status(200).json({
        message: 'Your follower view was updated successfully. (removed follower)',
        usernameOfFollowed: util.constructFollowersResponse(followers),
        usernameOfFollower: util.constructFollowersResponse(user2)
      });
    }
  }
);

/**
 * Get a user's followers.
 *
 * @name GET /api/followers?username=username&followers=true
 *
 * @return {string[]} - List of a user's followers
 * @throws {400} - If username is not valid
 * @throws {404} - If user follower view does not exist
 *
 */
/**
 * Get a user's following.
 *
 * @name GET /api/followers?username=username&followers=false
 *
 * @return {string[]} - List of a user's following
 * @throws {400} - If username is not valid
 * @throws {404} - If user follower view does not exist
 *
 */
router.get(
  '/',
  [
    followersValidator.isUserExists
  ],
  async (req: Request, res: Response) => {
    if (req.query.followers === 'true') {
      const user = await FollowersCollection.findOneByUsername(req.query.username as string);
      const response = {followers: user.followers};
      res.status(200).json(response);
    } else {
      const user = await FollowersCollection.findOneByUsername(req.query.username as string);
      const response = {following: user.following};
      res.status(200).json(response);
    }
  }
);

export {router as followerRouter};
