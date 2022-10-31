import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import GroupTaggingModel from './model';
import GroupTaggingCollection from './collection';
import UserCollection from '../user/collection';
import FreetCollection from '../freet/collection';

/**
 * Checks if a group username in req.body is already in use before creation
 */
const isGroupUsernameNotAlreadyInUse = async (req: Request, res: Response, next: NextFunction) => {
  const group = await GroupTaggingCollection.findOneByUsername(req.body.groupUsername);

  if (!group) {
    next();
    return;
  }

  res.status(409).json({
    error: {
      groupUsername: 'A Group with this username already exists.'
    }
  });
};

/**
 * Checks if a group username in req.body is already in use when searching
 */
const isGroupUsernameExist = async (req: Request, res: Response, next: NextFunction) => {
  const group = await GroupTaggingCollection.findOneByUsername(req.body.groupUsername);

  if (!group) {
    res.status(404).json({
      error: {
        groupUsername: 'A Group with this username does not exists.'
      }
    });
    return;
  }

  next();
};

/**
 * Checks if a group username in req.body is already in use when searching
 */
const isGroupUsernamePresent = async (req: Request, res: Response, next: NextFunction) => {
  const group = await GroupTaggingCollection.findOneByUsername(req.query.groupUsername as string);

  if (!group) {
    res.status(404).json({
      error: {
        groupUsername: 'A Group with this username does not exists.'
      }
    });
    return;
  }

  next();
};

/**
 * Checks if users in req.body exist
 */
const isUserExists = async (req: Request, res: Response, next: NextFunction) => {
  let user;

  if (req.body.groupCreatorUsername) {
    user = await UserCollection.findOneByUsername(req.body.groupCreatorUsername);
  } else if (req.body.addedGroupMemberUsername) {
    user = await UserCollection.findOneByUsername(req.body.addedGroupMemberUsername);
  } else if (req.body.removedGroupMemberUsername) {
    user = await UserCollection.findOneByUsername(req.body.removedGroupMemberUsername);
  } else if (req.body.addedAdminUsername) {
    user = await UserCollection.findOneByUsername(req.body.addedAdminUsername);
  } else if (req.body.removedAdminUsername) {
    user = await UserCollection.findOneByUsername(req.body.removedAdminUsername);
  } else if (req.body.taggedFreetId) {
    user = await FreetCollection.findOne(req.body.taggedFreetId);
  } else {
    res.status(400).json({
      error: {
        userOrFreetId: 'User or Freet Id must be given.'
      }
    });
    return;
  }

  if (!user) {
    res.status(404).json({
      error: {
        user: 'A user with this username does not exists.'
      }
    });
    return;
  }

  next();
};

export {
  isGroupUsernameNotAlreadyInUse,
  isGroupUsernameExist,
  isUserExists,
  isGroupUsernamePresent
};
