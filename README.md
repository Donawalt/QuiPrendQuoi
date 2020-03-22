# QuiPrendQuoi

## Installation 
```
npm install
npm run start 
```

## Amélioration apportées (ou aurait aimer être apportée)
* J'ai voulue tester les notifications push nativement, malheuresement je n'ai pas réussi à le mettre en place même si je pense avoir compris les grandes lignes et souhaite approfondire le sujet plus tard. 
* J'ai tenter d'utiliser la nouvelle version de barba.js un outils qui permet de préfetcher le contenue des pages et de faciliter les transitions de c'elle ci, la aussi je n'ai malheuresement pas réussi, j'ai fait un test sur un autre projet et ça à bien fonctionner. 
* Pour les Notifications j'ai finalement utilisé la librairie push.js que j'ai associer avec socket.io pour prévenir les utilisateurs d'un nouvelle items (commit "add socket.io et push.js")
* J'ai bien sur ajouter mon propre design. 

## Article personnel 
### Socket.io 
Ayant beaucoup passé de temps à essayer de comprendre comment fonctionner l'api Push, et n'ayant pas réussi à lier par la suite Push js au service worker, j'ai décidé de trouver une solution pour quand même notifier aux autres utilisateurs l'ajout d'un item.La solution fonctionne mais ne marche pas en mode hors-ligne car je n'ai pas réussi à lier le service worker. 

Socket Io est une bibliothèque qui permet une communication bi-directionelle en temps réel entre les clients web et les serveurs. Pour son utilisation socket Io fait donc appel à deux fichiers un utiliser côté serveur avec express et un autre côté client, il facilite l'utilisation de l'API Web socket.
C'est cette API qui est généralement utilisée sur les applications de messagerie t'elle que messenger, ou pour des vidéos en live à plusieurs. 

Pour utiliser web socket dans notre projet j'ai conçu un évènement du coté serveur au moment d'un post items que j'ai écouté côté client puis push une notification avec push js.

```javascript
 io.emit("ItemsNotification", {
        sucess: true,
        msg: `un item viens d'être rajouter dans l'évènement situé à cette adresse :  ${process.env.FRONT_URL}:${process.env.PORT}/party/${req.params.id}`
      });
```

```javascript
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
```
Pour plus d'information sur les élèments que j'ai pu tester sur se projet : 
* https://socket.io
* https://barba.js.org
* https://pushjs.org

