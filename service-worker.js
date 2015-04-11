'use strict';

var YAHOO_WEATHER_API_ENDPOINT = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22london%2C%20uk%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
var KEY_VALUE_STORE_NAME = 'key-value-store';

var idb;
var usePlainNotification = false;

// avoid opening idb until first call
// function getIdb() {
//   if (!idb) {
//     idb = new IndexDBWrapper('key-value-store', 1, function(db) {
//       db.createObjectStore(KEY_VALUE_STORE_NAME);
//     });
//   }
//   return idb;
// }

function sendToServer() {
  // TODO: implment ;)
}

self.addEventListener('push', function(event) {

  console.log('Received a push message', event);

  if (usePlainNotification) {
    var title = 'Push Notifcations';
    var message = 'On the Open Web - Whoop Whoop';
    var icon = 'images/successkid.jpg';
    var notificationTag = 'simple-push-demo-notification';

    event.waitUntil(
      self.registration.showNotification(title, {
        body: message,
        icon: icon,
        tag: notificationTag
      })
    );
    return;
  }

  // Since this is no payload data with the first version
  // of Push notifications, here we'll grab some data from
  // an API and use it to populate a notification
  event.waitUntil(
    fetch('abc.json').then(function(response) {
    

      // Examine the text in the response

        var title = 'This is noti noti?';
        var message = 'this is body';
        var icon = 'icon.jpg'
        var notificationTag = 'Tag name';

        // Add this to the data of the notification
        var urlToOpen = 'http://www.goibibo.com';

        // Since Chrome doesn't support data at the moment
        // Store the URL in IndexDB
        // getIdb().put(KEY_VALUE_STORE_NAME, notificationTag, urlToOpen);

        return self.registration.showNotification(title, {
          body: message,
          icon: icon,
          tag: notificationTag,
          url : urlToOpen
        });
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  
  console.log('On notification click: ', event);

  
    console.log('clicked')
});

