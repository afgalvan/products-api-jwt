import { connect } from 'mongoose';

import mongo from '../config/mongo';

try {
  (async () =>
    await connect(mongo.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }))();

  console.log('Database is connected');
} catch (err) {
  console.error(err);
}
