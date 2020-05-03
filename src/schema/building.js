import { Building, BuildingTC } from '../models/Building';

const BuildingQuery = {
    buildingById: BuildingTC.getResolver('findById'),
    buildingByIds: BuildingTC.getResolver('findByIds'),
    buildingOne: BuildingTC.getResolver('findOne'),
    buildingMany: BuildingTC.getResolver('findMany'),
    buildingCount: BuildingTC.getResolver('count'),
    buildingConnection: BuildingTC.getResolver('connection'),
    buildingPagination: BuildingTC.getResolver('pagination'),
}

const BuildingMutation = {
    buildingCreateOne: BuildingTC.getResolver('createOne'),
    buildingCreateMany: BuildingTC.getResolver('createMany'),
    buildingUpdateById: BuildingTC.getResolver('updateById'),
    buildingUpdateOne: BuildingTC.getResolver('updateOne'),
    buildingUpdateMany: BuildingTC.getResolver('updateMany'),
    buildingRemoveById: BuildingTC.getResolver('removeById'),
    buildingRemoveOne: BuildingTC.getResolver('removeOne'),
    buildingRemoveMany: BuildingTC.getResolver('removeMany'),
}

export { BuildingQuery, BuildingMutation };