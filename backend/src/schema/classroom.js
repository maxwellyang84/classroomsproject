import { Classroom, ClassroomTC } from '../models/classroom';

const ClassroomQuery = {
    classroomById: ClassroomTC.getResolver('findById'),
    classroomByIds: ClassroomTC.getResolver('findByIds'),
    classroomOne: ClassroomTC.getResolver('findOne'),
    classroomMany: ClassroomTC.getResolver('findMany'),
    classroomCount: ClassroomTC.getResolver('count'),
    classroomConnection: ClassroomTC.getResolver('connection'),
    classroomPagination: ClassroomTC.getResolver('pagination'),
}

const ClassroomMutation = {
    classroomCreateOne: ClassroomTC.getResolver('createOne'),
    classroomCreateMany: ClassroomTC.getResolver('createMany'),
    classroomUpdateById: ClassroomTC.getResolver('updateById'),
    classroomUpdateOne: ClassroomTC.getResolver('updateOne'),
    classroomUpdateMany: ClassroomTC.getResolver('updateMany'),
    classroomRemoveById: ClassroomTC.getResolver('removeById'),
    classroomRemoveOne: ClassroomTC.getResolver('removeOne'),
    classroomRemoveMany: ClassroomTC.getResolver('removeMany'),
}

export { ClassroomQuery, ClassroomMutation };