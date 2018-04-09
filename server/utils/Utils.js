import _ from "lodash";
export function eventLessonCounter(subjects, item) {
  if (!_.has(subjects, item.subject_id)) {
    subjects[item.subject_id] = [
      {
        [item.type]: 1,
        groups: item.groups
      }
    ];
    return 1;
  }
  const subject = subjects[item.subject_id];
  const subjectObj = _.find(subject, obj => { 
    const diff = _.difference(obj.groups, item.groups);
    return diff.length === 0;
  });
  if (subjectObj) {
    return _.has(subjectObj, item.type) ? ++subjectObj[item.type] : 1;
  } else {
    subject.push({
      [item.type]: 1,
      groups: item.groups
    });
    return 1;
  }
}
