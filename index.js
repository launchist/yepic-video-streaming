const getVideoEndpoint =
  "https://yepic-email-validation-zckwps36uq-nw.a.run.app/videos/";
const idParam = "?id=";
console.log("now we get it here");

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

const getVideo = async (id) => {
    isLoading = true;
    await fetch(
      `${getVideoEndpoint}${idParam}${id}`,
      requestOptions
    )
      // .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

let isLoading = false;

const store = {
  id: new URLSearchParams(location.search).get("id"),
//   video: await getVideo(new URLSearchParams(location.search).get("id"))
};
console.log("id", store.id);

document.addEventListener("alpine:init", () => {
  Alpine.store("data", store);
  console.log("init", store);
  getVideo(store.id)
});


