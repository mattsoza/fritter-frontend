import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import FreetCollection from './collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as pageValidator from '../pages/middleware';
import * as util from './util';
import type {Freet} from './model';
import e from 'express';

const router = express.Router();

/**
 * Get all the freets
 *
 * @name GET /api/freets
 *
 * @return {FreetResponse[]} - A list of all the freets sorted in descending
 *                      order by date modified
 */
/**
 * Get freets by author.
 *
 * @name GET /api/freets?author=username
 *
 * @return {FreetResponse[]} - An array of freets created by user with username, author
 * @throws {400} - If author is not given
 * @throws {404} - If no user has given author
 *
 */
router.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if author query parameter was supplied
    if (req.query.author !== undefined) {
      next();
      return;
    }

    if (req.query.tag !== undefined) {
      const allFreets = await FreetCollection.findAllWithTag(req.query.tag as string);
    }

    const allFreets = await FreetCollection.findAll();
    const response = allFreets.map(util.constructFreetResponse);
    res.status(200).json(response);
  },
  [
    userValidator.isAuthorExists
  ],
  async (req: Request, res: Response) => {
    const authorFreets = await FreetCollection.findAllByUsername(req.query.author as string);
    const response = authorFreets.map(util.constructFreetResponse);
    res.status(200).json(response);
  }
);

/**
 * Get an individual tweet
 *
 * @name GET /api/freets/:id
 *
 * @return {freetResponse} - A single freet with the given id
 * @throws {404} - if no tweet with the given id exists
 */
router.get(
  '/:freetId?',
  [
    freetValidator.isFreetExists
  ],
  async (req: Request, res: Response) => {
    const freet = await FreetCollection.findOne(req.params.freetId);
    res.status(200).json([freet].map(util.constructFreetResponse));
  }
);

/**
 * Get the comments to a tweet
 *
 * @name GET /api/freets/:id/comments?forum=value&page=pageNumber
 *
 * @return {freetResponse[]} An array of freets that are comments to the id
 * @throws {404} - If no tweet with the given id exists
 */
router.get(
  '/:freetId/comments',
  [
    freetValidator.isFreetExists,
    pageValidator.isPageNumberValid
  ],
  async (req: Request, res: Response) => {
    const freet = await FreetCollection.findOne(req.params.freetId);
    const freetCommentsPromises = [];
    for (const id of freet.comments) {
      freetCommentsPromises.push(FreetCollection.findOne(id));
    }

    let freetComments;
    if (req.query.forum === 'forum') {
      freetComments = (await Promise.all(freetCommentsPromises)).filter(
        (freet: Freet) => freet.forum
      ).reverse().map(util.constructFreetResponse);
    } else if (req.query.forum === 'freet') {
      freetComments = (await Promise.all(freetCommentsPromises)).filter(
        (freet: Freet) => !freet.forum
      ).reverse().map(util.constructFreetResponse);
    } else {
      // Freetcomments are started in parallel and then await is used to delay response until ready
      freetComments = (await Promise.all(freetCommentsPromises)).reverse().map(util.constructFreetResponse);
    }

    if (req.query.page) {
      const pageNum = Number(req.query.page);
      res.status(200).json(freetComments.slice((pageNum - 1) * 20, pageNum * 20));
    } else {
      res.status(200).json(freetComments);
    }
  }
);

/**
 * Create a new freet.
 *
 * @name POST /api/freets
 *
 * @param {string} content - The content of the freet
 * @return {FreetResponse} - The created freet
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the freet content is empty or a stream of empty spaces
 * @throws {413} - If the freet content is more than 140 characters long
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isValidFreetContent
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    let freet;
    if (req.body.tag) {
      freet = await FreetCollection.addOne(userId, req.body.content, null, [req.body.tag]);
    } else {
      freet = await FreetCollection.addOne(userId, req.body.content);
    }

    res.status(201).json({
      message: 'Your freet was created successfully.',
      freet: util.constructFreetResponse(freet)
    });
  }
);

/**
 * Create a new comment to a freet.
 *
 * @name POST /api/freets/:id
 *
 * @param {string} content - The content of the freet
 * @return {FreetResponse} - The created freet
 * @throws {403} - If the user is not logged in
 * @throws {404} - If the freetId doesn't exist
 * @throws {400} - If the comment content is empty or a stream of empty spaces
 * @throws {413} - If the comment content is more than 140 characters long and not part of a forum
 */
router.post(
  '/:freetId',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExists,
    freetValidator.isValidComment
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const freet = await FreetCollection.addOne(userId, req.body.content, req.params.freetId);

    res.status(201).json({
      message: 'Your comment was created successfully.',
      freet: util.constructFreetResponse(freet)
    });
  }
);

/**
 * Delete a freet
 *
 * @name DELETE /api/freets/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the freet
 * @throws {404} - If the freetId is not valid
 */
router.delete(
  '/:freetId?',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExists,
    freetValidator.isValidFreetModifier
  ],
  async (req: Request, res: Response) => {
    await FreetCollection.deleteOne(req.params.freetId);
    res.status(200).json({
      message: 'Your freet was deleted successfully.'
    });
  }
);

/**
 * Modify a freet
 *
 * @name PATCH /api/freets/:id
 *
 * @param {string} content - the new content for the freet
 * @return {FreetResponse} - the updated freet
 * @throws {403} - if the user is not logged in or not the author of
 *                 of the freet
 * @throws {404} - If the freetId is not valid
 * @throws {400} - If the freet content is empty or a stream of empty spaces
 * @throws {413} - If the freet content is more than 140 characters long
 */
router.patch(
  '/:freetId?',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExists,
    freetValidator.isValidFreetModifier,
    freetValidator.isValidFreetContent
  ],
  async (req: Request, res: Response) => {
    const freet = await FreetCollection.updateOne(req.params.freetId, req.body.content);
    res.status(200).json({
      message: 'Your freet was updated successfully.',
      freet: util.constructFreetResponse(freet)
    });
  }
);

export {router as freetRouter};
