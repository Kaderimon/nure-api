function customError (response) {
  this.name = response.status;
  this.message = response.statusText;
  this.stack = (new Error()).stack;
}

customError.prototype = Object.create(Error.prototype);
customError.prototype.constructor = customError;

function handleErrors (response) {
  if (!response.ok) {
    throw new customError(response);
  }
  return response.json();
}

export default class Transport {
  static get (uri) {
    return fetch(uri, {
      method: 'get',
      credentials: 'include'
    }).then(handleErrors)
    .then((response) => ({ response }))
    .catch(error => ({ error }));
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
    .then((response) => ({ response }))
    .catch(error => ({ error }));
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
