import Push from "push.js";
import io from "socket.io-client";

Push.config({
  serviceWorker: "./sw.js",
  fallback: function(payload) {
    console.log("There are not support for Push Notification");
  }
});

let socket = io.connect("http://localhost:3000");

socket.on("PushNotification", function(data) {
  if (!Push.Permission.has()) {
    Push.create("Hello", {
      body: data.msg,
      icon: "/icone.png",
      timeout: 4000,
      vibrate: 500,
      onClick: function() {
        window.focus();
        this.close();
      }
    });
  }
});

socket.on("PartyNotification", function(data) {
  Push.create("Un nouveau évènement viens d'être rajouter", {
    body: data.msg,
    icon: "/icone.png",
    timeout: 4000,
    vibrate: 500,
    onClick: function() {
      window.focus();
      this.close();
    }
  });
});

socket.on("ItemsNotification", function(data) {
  Push.create("Un nouvelle item viens d'être rajouter", {
    body: data.msg,
    icon: "/icone.png",
    timeout: 4000,
    vibrate: 500,
    onClick: function() {
      window.focus();
      this.close();
    }
  });
});
