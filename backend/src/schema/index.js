import { SchemaComposer } from 'graphql-compose';

import db from '../utils/db';

const schemaComposer = new SchemaComposer();

import { ActivityQuery, ActivityMutation} from './activity';
import { ClassroomQuery, ClassroomMutation} from './classroom';
import { BuildingQuery, BuildingMutation} from './building';
import {DayQuery, DayMutation} from './day';

schemaComposer.Query.addFields({
    ...ActivityQuery,
    ...ClassroomQuery,
    ...BuildingQuery,
    ...DayQuery,
});

schemaComposer.Mutation.addFields({
    ...ActivityMutation,
    ...ClassroomMutation,
    ...BuildingMutation,
    ...DayMutation,
})

export default schemaComposer.buildSchema();