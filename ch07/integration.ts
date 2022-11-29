import * as globals from "./globals";

class GlobalLogger {
  public static logGlobalsToConsole() {
    for (let email of globals.CONTACT_EMAIL_ARRAY) {
      console.log(`found contact: ${email}`);
    }
  }
}

window.onload = () => {
  GlobalLogger.logGlobalsToConsole();
};

globals.FirstNamespace.SecondNamespace.ThirsNamespace.log("test");
