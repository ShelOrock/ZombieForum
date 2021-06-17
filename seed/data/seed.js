import {
  User,
  Reply,
  Conversation,
  Tag,
  Cohort,
} from '../../server/database/index.js';
import whitelist from '../../whitelist.js';
import { usersList, cohortList } from './index.js';
import fullstackDB from '../../fullstackDB.js';

const seed = async () => {
    await Cohort.bulkCreate(cohortList);

    await Promise.all(
      usersList.map(user => {
        return User.create({ ...user, cohortId: Math.ceil(Math.random() * 6) });
      })
    );

    const createdTags = await Promise.all(
      Object.keys(whitelist).map(name =>
        Tag.create({
          name,
        })
      )
    );
    const titles = Object.keys(fullstackDB);

    const createdConversation = await Promise.all(
      titles.map(title => {
        let answer = false;
        if (fullstackDB[title].length > 1) {
          answer = true;
        }
        return Conversation.create({
          title: title,
          userId: Math.ceil(Math.random() * 7),
          hasAnswer: answer,
          views: Math.ceil(Math.random() * 100),
          cohortId: Math.ceil(Math.random() * 6),
          seen: false,
        });
      })
    );
    
    await createdConversation.map(convObj => {
      return Promise.all(
        fullstackDB[convObj.title].map((reply, i) => {
          if (i === 0) {
            Reply.create({
              body: reply,
              userId: convObj.userId,
              conversationId: convObj.id,
              postNumber: i + 1,
            });
          } else {
            Reply.create({
              body: reply,
              userId: Math.ceil(Math.random() * 7),
              conversationId: convObj.id,
              postNumber: i + 1,
            });
          }
        })
      );
    });

    for (let i = 0; i < createdConversation.length; i++) {
      let randomTag = createdTags[Math.round(Math.random() * 100) % createdTags.length];
      await createdConversation[i].addTag(randomTag);
    }

};

export default seed;
