import { Activity, ActivityTC } from '../models/activity';

const ActivityQuery = {
    activityById: ActivityTC.getResolver('findById'),
    activityByIds: ActivityTC.getResolver('findByIds'),
    activityOne: ActivityTC.getResolver('findOne'),
    activityMany: ActivityTC.getResolver('findMany'),
    activityCount: ActivityTC.getResolver('count'),
    activityConnection: ActivityTC.getResolver('connection'),
    activityPagination: ActivityTC.getResolver('pagination'),
}

const ActivityMutation = {
    activityCreateOne: ActivityTC.getResolver('createOne'),
    activityCreateMany: ActivityTC.getResolver('createMany'),
    activityUpdateById: ActivityTC.getResolver('updateById'),
    activityUpdateOne: ActivityTC.getResolver('updateOne'),
    activityUpdateMany: ActivityTC.getResolver('updateMany'),
    activityRemoveById: ActivityTC.getResolver('removeById'),
    activityRemoveOne: ActivityTC.getResolver('removeOne'),
    activityRemoveMany: ActivityTC.getResolver('removeMany'),
}

export { ActivityQuery, ActivityMutation };