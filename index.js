console.log('123')
const getVideoEndpoint = "https://yepic-email-validation-zckwps36uq-nw.a.run.app/videos/?"
console.log('now we get it here')
console.log(321)

const store = {
    id: new URLSearchParams(location.search).get('id')
}

document.addEventListener("alpine:init", () => {
    Alpine.store("data", store);
  });

console.log('id', store.id)