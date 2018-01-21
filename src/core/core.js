import _ from 'lodash';

class Core {
  // return true if the value is [], {}, "", null, undefined
  static empty(val) {
    return _.isEmpty(val) && !_.isNumber(val) && !_.isDate(val);
  }
  static saveLocal(prop, val, isObject = true) {
    val = isObject ? JSON.stringify(val) : val;
    localStorage.setItem(prop, val);
  }
  static getLocal(prop) {
    let res;
    try {
        res = JSON.parse(localStorage.getItem(prop));
    } catch (err) {
        res = localStorage.getItem(prop);
    }
    return res;
  }
  static removeLocal(prop) {
      localStorage.removeItem(prop);
  }
}

export default Core;