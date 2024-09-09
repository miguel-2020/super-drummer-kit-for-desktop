class DrumKit {
  static keys = {
    w: "hihat-closed-audio",
    s: "hihat-open-audio",
    x: "snare-audio",
    " ": "kick-audio",
    e: "clash-audio",
    d: "tom-1-audio",
    c: "tom-2-audio",
    r: "ride-audio",
    f: "tom-3-audio",
  };
  constructor() {
    // Drum container

    this.container = document.querySelector(".drum");

    if (!this.container) {
      throw new Error("please provide a drum container");
    }
    // get the drum components
    this.drumset = this.container.children;
    // Audio
    this.kickAudio = document.querySelector(".kick-audio");
    this.hihatOpen = document.querySelector(".hihat-open-audio");
    this.hihatClose = document.querySelector(".hihat-closed-audio");
    this.clashAudio = document.querySelector(".clash-audio");
    this.rideAudio = document.querySelector(".ride-audio");
    this.snareAudio = document.querySelector(".snare-audio");
    this.tom1Audio = document.querySelector(".tom-1-audio");
    this.tom2Audio = document.querySelector(".tom-2-audio");
    this.tom3Audio = document.querySelector(".tom-3-audio");
  }
}


window.addEventListener("DOMContentLoaded",main)


function main(){


// Instanciate the drumkit
const drum = new DrumKit();
const HTMKeyList = document.createElement("ul");
HTMKeyList.classList.add("drumKeyList");
// Generate the allowed keys for this drumset
for (let [key, value] of Object.entries(DrumKit.keys)) {
  const li = document.createElement("li");
  if (key.trim() == "") {
    key = "space";
  }
  li.innerText = `${key} -> ${value}`;
  HTMKeyList.appendChild(li);
}

document.body.appendChild(HTMKeyList);

// Add click events to the drum components
for (const item of drum.drumset) {
  item.addEventListener("click", playAudio);
}

// Play sounds based on the key specified
window.addEventListener("keypress", (evt) => {
  const key = evt.key;
  const htmlEl = document.querySelector(`[data-id=${DrumKit.keys[key.toLocaleLowerCase()]}]`);

  if (!htmlEl) return;

  playAudio({
    currentTarget: htmlEl,
  });
});



async function playAudio(evt) {
  const drumElement = evt.currentTarget;
  const { id } = drumElement.dataset;

  try {
    const selectedAudio = selectAudio(id);
    await selectedAudio.play();
    drumElement.classList.add("active");
    drumElement.addEventListener("animationend", () => {
      drumElement.classList.remove("active");
      selectedAudio.currentTime = 0.0;
    });
  } catch (error) {}
}

/**
 * The function `selectAudio` takes an ID as input and returns the corresponding audio component from a
 * drum set based on the id.
 * @param id - The id for the drum compent.
 * @returns An HTMLAudioElement
 * @throws Will throw an error if drum element is not valid
 */
function selectAudio(id) {
  let audio = null;
  switch (id) {
    case "hihat-closed-audio":
      audio = drum.hihatClose;
      break;
    case "clash-audio":
      audio = drum.clashAudio;
      break;
    case "ride-audio":
      audio = drum.rideAudio;
      break;
    case "kick-audio":
      audio = drum.kickAudio;
      break;
    case "hihat-open-audio":
      audio = drum.hihatOpen;
      break;
    case "snare-audio":
      audio = drum.snareAudio;
      break;
    case "tom-1-audio":
      audio = drum.tom1Audio;
      break;
    case "tom-2-audio":
      audio = drum.tom2Audio;
      break;
    case "tom-3-audio":
      audio = drum.tom3Audio;
      break;
    default:
      throw new Error("Please select a valid drum component");
  }

  return audio;
}

}