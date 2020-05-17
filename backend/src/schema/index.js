import { SchemaComposer } from 'graphql-compose';

import db from '../utils/db';

const schemaComposer = new SchemaComposer();

import { ActivityQuery, ActivityMutation} from './activity';
import { ClassroomQuery, ClassroomMutation} from './classroom';
import { BuildingQuery, BuildingMutation} from './building';

schemaComposer.Query.addFields({
    ...ActivityQuery,
    ...ClassroomQuery,
    ...BuildingQuery,
});

schemaComposer.Mutation.addFields({
    ...ActivityMutation,
    ...ClassroomMutation,
    ...BuildingMutation,
})

export default schemaComposer.buildSchema();