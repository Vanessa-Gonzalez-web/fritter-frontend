import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import FollowersCollection from './collection';

/**
 * Checks if a username is given
 */
const isUsernameGiven = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.username) {
    res.status(400).json({
      error: {
        username: 'Username must be given.'
      }
    });
    return;
  }

  next();
};

/**
 * Checks if a username is given
 */
const isBothUsernamesGiven = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.usernameOfFollowed || !req.body.usernameOfFollower) {
    res.status(400).json({
      error: {
        username: 'Both usernames must be given.'
      }
    });
    return;
  }

  next();
};

/**
 * Checks if a username in req.body is valid, that is, it matches the username regex
 */
const isBothValidUsername = (req: Request, res: Response, next: NextFunction) => {
  const usernameRegex = /^\w+$/i;
  if (!usernameRegex.test(req.body.usernameOfFollowed) || !usernameRegex.test(req.body.usernameOfFollower)) {
    res.status(400).json({
      error: {
        usernames: 'Both usernames must be nonempty alphanumeric strings.'
      }
    });
    return;
  }

  next();
};

/**
 * Checks if a username in req.body is already in use
 */
const isUsernameNotAlreadyInUse = async (req: Request, res: Response, next: NextFunction) => {
  const follower = await FollowersCollection.findOneByUsername(req.body.username);

  // If the current session user wants to change their username to one which matches
  // the current one irrespective of the case, we should allow them to do so
  if (!follower) {
    next();
    return;
  }

  res.status(409).json({
    error: {
      username: 'Follower view for this username already exists.'
    }
  });
};

/**
 * Checks if a user current has contact information recorded
 */
const isUserFollowerInformationExists = async (req: Request, res: Response, next: NextFunction) => {
  const followers = await FollowersCollection.findOneByUsername(req.body.username);

  if (!followers) {
    res.status(404).json({
      error: {
        userFollowerViewNotFound: 'User does not have created follower view.'
      }
    });
    return;
  }

  next();
};

/**
 * Checks if a user current has contact information recorded
 */
const isBothUserFollowerInformationExists = async (req: Request, res: Response, next: NextFunction) => {
  const user1 = await FollowersCollection.findOneByUsername(req.body.usernameOfFollowed);
  const user2 = await FollowersCollection.findOneByUsername(req.body.usernameOfFollower);

  if (!user1 || !user2) {
    res.status(404).json({
      error: {
        userFollowerViewNotFound: 'User does not have created follower view.'
      }
    });
    return;
  }

  next();
};

/**
 * Checks if a user with the given username in req.query has contact information that exists
 */
const isUserExists = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.username) {
    res.status(400).json({
      error: 'Provided author username must be nonempty.'
    });
    return;
  }

  const user = await FollowersCollection.findOneByUsername(req.query.username as string);
  if (!user) {
    res.status(404).json({
      error: `Follower View for a user with username ${req.query.username as string} does not exist.`
    });
    return;
  }

  next();
};

/**
 * Checks if a user with the given username in req.query has contact information that exists
 */
const isBothUsersExists = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.username) {
    res.status(400).json({
      error: 'Provided author username must be nonempty.'
    });
    return;
  }

  const user1 = await FollowersCollection.findOneByUsername(req.query.usernameOfFollowed as string);
  const user2 = await FollowersCollection.findOneByUsername(req.query.usernameOfFollower as string);
  if (!user1 || !user2) {
    res.status(404).json({
      error: `Follower views for either user with username ${req.query.usernameOfFollowed as string} or user with username ${req.query.usernameOfFollower as string} does not exist.`
    });
    return;
  }

  next();
};

export {
  isUsernameGiven,
  isBothUsernamesGiven,
  isBothValidUsername,
  isUsernameNotAlreadyInUse,
  isUserFollowerInformationExists,
  isBothUserFollowerInformationExists,
  isUserExists,
  isBothUsersExists
};
