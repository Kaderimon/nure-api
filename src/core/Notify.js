import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import 'alertifyjs/build/css/themes/default.css';

class Notify {
  static success(text) {
    alertify.success(text);
  }
  static error(text) {
    alertify.error(text);
  }
}

export default Notify;