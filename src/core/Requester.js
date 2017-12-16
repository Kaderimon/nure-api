import Notify from "./Notify";
import _ from "lodash";

async function handleErrors (response) {
  const res = await response.json();
  if (!response.ok) {
    Notify.error(res.message);
    throw new Error(res.message);
  } else {

    return res;    
  }
}

export default class Transport {
  static get (uri) {
    return fetch(uri, {
      method: 'get',
      credentials: 'include'
    }).then(handleErrors)
    .then(response => response)
    .catch(error => { console.log(error) });
  }
  static post (uri, body) {
    return fetch(uri, {
      method: 'post',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body
    }).then(handleErrors)
    .then(response => {Notify.success(_.get(response, 'message', 'Успех')); return response;})
    .catch(error => { console.log(error) });
  }
  static put (uri, body) {
    return fetch(uri, {
      method: 'put',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body
    }).then(handleErrors)
    .then((response) => ({ response }))
    .catch(error => ({ error }));
  }
  static delete (uri) {
    return fetch(uri, {
      method: 'delete',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(handleErrors)
    .then((response) => ({ response }))
    .catch(error => ({ error }));
  }
}
