import db from './database.js';

import{
  User,
  Reply,
  Conversation,
  Activity,
  Tag,
  Cohort,
} from './models/index.js'

Reply.belongsTo(Conversation);
Conversation.hasMany(Reply);

Tag.belongsToMany(Conversation, { through: 'convotags' });
Conversation.belongsToMany(Tag, { through: 'convotags' });

User.hasMany(Reply);
Reply.belongsTo(User);

User.hasMany(Conversation);
Conversation.belongsTo(User);

Activity.belongsTo(Reply);
Reply.hasMany(Activity);

Activity.belongsTo(User);
User.hasMany(Activity);

Cohort.hasMany(User);
User.belongsTo(Cohort);

Cohort.hasMany(Conversation);
Conversation.belongsTo(Cohort);

export {
  db,
  User,
  Reply,
  Conversation,
  Activity,
  Tag,
  Cohort,
};
