import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import ContactInformationDisplayCollection from '../contactInformationDisplay/collection';

/**
 * Checks if a contact number in req.body is valid, that is, it matches the number regex
 */
const isValidNumber = (req: Request, res: Response, next: NextFunction) => {
  const contactNumberRegex = /[0-9]{10}/;
  if (!contactNumberRegex.test(req.body.contactNumber) && req.body.contactNumber !== '') {
    res.status(400).json({
      error: {
        Number: 'Number must be a 10 digit long string of numeric characters.'
      }
    });
    return;
  }

  next();
};

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
 * Checks if a display option is given
 */
const isDisplayGiven = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.contactInformationDisplayed) {
    res.status(400).json({
      error: {
        contactInformationDisplayed: 'Must determine if information will be displayed.'
      }
    });
    return;
  }

  next();
};

/**
 * Checks if a contact number in req.body is valid, that is, it matches the number regex
 */
const isValidBool = (req: Request, res: Response, next: NextFunction) => {
  if (!(req.body.contactInformationDisplayed === 'yes' || req.body.contactInformationDisplayed === 'no')) {
    res.status(400).json({
      error: {
        contactInformationDisplayed: 'value must be either yes or no (case sensitive)'
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
  const contactInformationDisplay = await ContactInformationDisplayCollection.findOneByUsername(req.body.username);

  // If the current session user wants to change their username to one which matches
  // the current one irrespective of the case, we should allow them to do so
  if (!contactInformationDisplay) {
    next();
    return;
  }

  res.status(409).json({
    error: {
      username: 'Contact Information for this username already exists.'
    }
  });
};

/**
 * Checks if a user current has contact information recorded
 */
const isUserContactInformationExists = async (req: Request, res: Response, next: NextFunction) => {
  const contactInformationDisplay = await ContactInformationDisplayCollection.findOneByUsername(req.body.username);

  if (!contactInformationDisplay) {
    res.status(404).json({
      error: {
        userContactInformationNotFound: 'User does not have created contact information.'
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

  const user = await ContactInformationDisplayCollection.findOneByUsername(req.query.username as string);
  if (!user) {
    res.status(404).json({
      error: `Contact Information for a user with username ${req.query.username as string} does not exist.`
    });
    return;
  }

  next();
};

export {
  isValidNumber,
  isValidBool,
  isUsernameGiven,
  isDisplayGiven,
  isUsernameNotAlreadyInUse,
  isUserContactInformationExists,
  isUserExists
};
