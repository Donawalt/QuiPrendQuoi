# QuiPrendQuoi

## Installation 
```
npm install
npm run start 
```

## Amélioration apportées (ou aurait aimer être apportée)
* J'ai voulue tester les notifications push nativement, malheuresement je n'ai pas réussi à le mettre en place même si je pense avoir compris les grandes lignes. 
* J'ai tenter d'utiliser la nouvelle version de barba.js un outils qui permet de préfetcher le contenue des pages et de faciliter les transitions de c'elle ci , la aussi je n'ai malheuresement pas réussi, j'ai fait un test sur un autre projet et ça à bien fonctionner. 
* Pour les Notifications j'ai finalement uriliser la librairie push.js que j'ai associer avec socket.io pour prévenir les utilisateurs d'un nouvelle items (commit "add socket.io et push.js")
* J'ai bien sur ajouter mon propre design. 

## Article personnel 
### Socket.io 
Ayant beaucoup passer de temps à essayer de comprendre comment fonctionner l'api Push, et n'ayant pas réussie à lier par la suite Push.js au service worker, j'ai décider de trouver une solution pour quand même notifier aux autres utilisateur l'ajout d'un item.
La solution fonctionne malheuresement ne marche pas en mode hors-ligne car je n'ai pas réussi à lier le service worker. 

Socket.io est une bibliothéque qui permet une communication bi-directionelle en temps-réel entre les clients web et les serveurs. 
Pour sont utilisation socket.io fait donc appel à deux fichiers un utiliser coté serveur avec express et un autre coté client, il facilite l'utilisation de l'API WebSocket.
C'est cette API qui est généralement utiliser sur les application de messagerie t'elle que messenger , ou pour des vidéos en live à plusieurs. 

Pour utiliser websocket dans notre projet j'ai conçu un évènement du coté serveur au moment d'un post vers items que j'ai écouter coté client puis push un notification avec push.js.

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


