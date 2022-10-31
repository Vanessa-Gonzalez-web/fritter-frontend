import type {HydratedDocument} from 'mongoose';
import type {Followers} from './model';

type FollowersResponse = {
  username: string;
  followers: string[];
  following: string[];
};

/**
 * Transform a raw Contact object from the database into an object
 * with all the information needed by the frontend
 * (in this case, removing the password for security)
 *
 * @param {HydratedDocument<Followers>} contact - A user object
 * @returns {FollowersResponse} - The followers object
 */
const constructFollowersResponse = (follower: HydratedDocument<Followers>): FollowersResponse => {
  const followerCopy: Followers = {
    ...follower.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return {
    ...followerCopy,
    username: followerCopy.username,
    followers: followerCopy.followers,
    following: followerCopy.following
  };
};

export {
  constructFollowersResponse
};
