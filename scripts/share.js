if (navigator.share) {
  console.log("Support du partage !");
  document.querySelectorAll("[data-share-url]").forEach($sharEl => {
    const $button = document.createElement("button");
    $button.innerHTML = "Partager";
    $sharEl.parentNode.append($button);
    $button.addEventListener("click", shareToF.bind(this, $sharEl, $button));
  });
}

function shareToF($sharEl, $button) {
  console.log("Click !");
  navigator.share({
    title: $shareEl.getAttribute("data-share-title"),
    text: $shareEl.getAttribute("data-share-text"),
    url: $shareEl.getAttribute("data-share-url")
  });
}
