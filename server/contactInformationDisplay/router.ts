import type {Request, Response} from 'express';
import express from 'express';
import ContactInformationDisplayCollection from './collection';
import * as contactValidator from './middleware';
import * as userValidator from '../user/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Create a contact information display.
 *
 * @name POST /api/contactInformationDisplay
 *
 * @param {boolean} contactInformationDisplayed - whether the information will be displayed on a user's profile
 * @param {string} username - The username of the user
 * @param {string} contactNumber - contact number of the user
 * @param {string} contactEmail - contact email of the user
 * @param {string} contactWebsite - contact website of the user
 * @param {string} contactAddress - contact address of the user
 * @return {ContactInformationDisplayResponse} - The created contact information display
 * @throws {400} - If contact information is not valid
 * @throws {403} - If the user is not logged in
 * @throws {409} - If the contact information display for a user already exists
 *
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    contactValidator.isDisplayGiven,
    contactValidator.isUsernameGiven,
    contactValidator.isUsernameNotAlreadyInUse,
    contactValidator.isValidBool,
    contactValidator.isValidNumber
  ],
  async (req: Request, res: Response) => {
    const contactInformationDisplay = await ContactInformationDisplayCollection.addOne(req.body.contactInformationDisplayed, req.body.username, req.body.contactNumber, req.body.contactEmail, req.body.contactWebsite, req.body.contactAddress);
    res.status(201).json({
      message: 'Your contact information display was created successfully.',
      contactInformationDisplay: util.constructContactResponse(contactInformationDisplay)
    });
  }
);

/**
 * Update a user's contact information.
 *
 * @name PUT /api/contactInformationDisplay
 *
 * @param {string} username - The username of the user
 * @param {string} body - contains other contact information to be updated- removes information if a field has the value 'delete'
 * @throws {400} - If user contact information is is not valid
 * @throws {403} - If the user is not logged in
 * @throws {404} - If the user contact information does not exist
 *
 */
router.put(
  '/',
  [
    userValidator.isUserLoggedIn,
    contactValidator.isUserContactInformationExists,
    contactValidator.isDisplayGiven,
    contactValidator.isUsernameGiven,
    contactValidator.isValidBool,
    contactValidator.isValidNumber
  ],
  async (req: Request, res: Response) => {
    const contactInformationDisplay = await ContactInformationDisplayCollection.updateOne(req.body.username, req.body);
    res.status(200).json({
      message: 'Your contact information was updated successfully.',
      contactInformationDisplay: util.constructContactResponse(contactInformationDisplay)
    });
  }
);

/**
 * Get a user's contact information by username.
 *
 * @name GET /api/contactInformationDisplay?username=username
 *
 * @return {ContactInformationDisplayResponse} - Contact information of user with username
 * @throws {400} - If username is not given
 * @throws {404} - If user contact information does not exist
 *
 */
router.get(
  '/',
  [
    contactValidator.isUserExists
  ],
  async (req: Request, res: Response) => {
    const contactInformationDisplay = await ContactInformationDisplayCollection.findOneByUsername(req.query.username as string);
    const response = util.constructContactResponse(contactInformationDisplay);
    res.status(200).json(response);
  }
);

export {router as contactInformationDisplayRouter};
