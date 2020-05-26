import {Day, DayTC} from '../models/day'

const DayQuery = {
    dayById: DayTC.getResolver('findById'),
    dayByIds: DayTC.getResolver('findByIds'),
    dayOne: DayTC.getResolver('findOne'),
    dayMany: DayTC.getResolver('findMany'),
    dayCount: DayTC.getResolver('count'),
    dayConnection: DayTC.getResolver('connection'),
    dayPagination: DayTC.getResolver('pagination'),
}

const DayMutation = {
    dayCreateOne: DayTC.getResolver('createOne'),
    dayCreateMany: DayTC.getResolver('createMany'),
    dayUpdateById: DayTC.getResolver('updateById'),
    dayUpdateOne: DayTC.getResolver('updateOne'),
    dayUpdateMany: DayTC.getResolver('updateMany'),
    dayRemoveById: DayTC.getResolver('removeById'),
    dayRemoveOne: DayTC.getResolver('removeOne'),
    dayRemoveMany: DayTC.getResolver('removeMany'),
}

export {DayQuery, DayMutation}