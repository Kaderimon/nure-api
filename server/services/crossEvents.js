import { getEvent } from "../controllers";
import moment from "moment";
import _ from "lodash";

const DEF_EMPTY_EVENT = { events: [] };
function empty(val) {
  return _.isEmpty(val) && !_.isNumber(val) && !_.isDate(val);
}

export async function crossEvents(query) {
  console.log(query);
  const { group, auditorie, teacher } = query;
  const selectedGroup = empty(group) ? DEF_EMPTY_EVENT : await getEvent(group, 'group');
  const selectedTeacher = empty(teacher) ? DEF_EMPTY_EVENT : await getEvent(teacher, 'teacher');
  const selectedAuditory = empty(auditorie) ? DEF_EMPTY_EVENT : await getEvent(auditorie, 'auditorie');
  return {
    target:'crossEvents',
    sync: moment().format('llll'),
    events: _.unionWith(
      selectedGroup.events,
      selectedTeacher.events,
      selectedAuditory.events,
      (arrVal, othVal) => moment(arrVal['start_time']).isSame(othVal['start_time'])
    )
  }
}