import _ from 'lodash';
import moment from 'moment';

class Core {
  // return true if the value is [], {}, "", null, undefined
  empty(val) {
    return _.isEmpty(val) && !_.isNumber(val) && !_.isDate(val);
  }
  saveLocal(prop, val, isObject = true) {
    val = isObject ? JSON.stringify(val) : val;
    localStorage.setItem(prop, val);
  }
  getLocal(prop) {
    let res;
    try {
        res = JSON.parse(localStorage.getItem(prop));
    } catch (err) {
        res = localStorage.getItem(prop);
    }
    return res;
  }
  removeLocal(prop) {
      localStorage.removeItem(prop);
  }
}

export default Core;