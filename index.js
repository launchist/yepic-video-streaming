const getVideoEndpoint =
  "https://yepic-email-validation-zckwps36uq-nw.a.run.app/videos/";
// const getVideoEndpoint = "https://0a54-207-188-136-240.eu.ngrok.io/videos/";
const getVideoDetailsSlug = "get-video-details";
const getVideoSlug = "video";
console.log("now we get it here");

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

const params = new URLSearchParams(window.location.search);

const idFromQueryParam = params.get("id");
const refCode = params.get("ref_code");
const refSource = params.get("ref_source");

const store = {
  getVideoEndpoint,
  id: idFromQueryParam,
  getStreamUrl: `${getVideoEndpoint}${getVideoSlug}?id=${idFromQueryParam}`,
  video: null,
  membership: null,
  refCode,
  refSource,
};

let isLoading = false;

const getMembership = async () => {
  if (!store.id) return;
  isLoading = true;
  let resp = await fetch(
    `${getVideoEndpoint}${getVideoDetailsSlug}?id=${store.id}`,
    requestOptions
  );
  let res = await resp.json();
  isLoading = false;
  return res?.details;
};

document.addEventListener("alpine:init", async () => {
  Alpine.store("data", store);
  const video = document.getElementById("my-video");
  var player = videojs(video);

  player.log("window.player created", player);

  player.loadMedia({
    src: [
      {
        src: store.getStreamUrl,
        type: "video/mp4",
      },
    ],
  });
  const membership = await getMembership();
  store.membership = membership;
  console.log("init");
});
