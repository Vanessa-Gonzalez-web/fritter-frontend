import type {HydratedDocument} from 'mongoose';
import type {GroupTagging} from './model';

type GroupTaggingResponse = {
  groupUsername: string;
  groupMembers: string[];
  groupTags: string[];
  groupAdmin: string[];
};

/**
 * Transform a raw Contact object from the database into an object
 * with all the information needed by the frontend
 * (in this case, removing the password for security)
 *
 * @param {HydratedDocument<Followers>} contact - A user object
 * @returns {GroupTaggingResponse} - The followers object
 */
const constructGroupTaggingResponse = (group: HydratedDocument<GroupTagging>): GroupTaggingResponse => {
  const groupCopy: GroupTagging = {
    ...group.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return {
    ...groupCopy,
    groupUsername: groupCopy.groupUsername,
    groupMembers: groupCopy.groupMembers,
    groupTags: groupCopy.groupTags,
    groupAdmin: groupCopy.groupAdmin
  };
};

export {
  constructGroupTaggingResponse
};
