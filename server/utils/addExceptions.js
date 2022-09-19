const Exceptions = require('../models/exceptions');

module.exports =
  () =>
  async ({ userID, ownTableName, ownPrimaryKey, source, message }) => {
    const newException = new Exceptions({
      user_id: userID,
      own_table_name: ownTableName,
      own_primary_key: ownPrimaryKey,
      source,
      message,
    });

    await newException.save();
  };
