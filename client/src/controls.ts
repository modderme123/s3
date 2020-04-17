import { send, opened } from "./connection";

const classSelector = document.getElementById("class-selector");
let classes = ["Quickshot", "Sniper"];
let selected = 0;
for (let i in classes) {
  const newDiv = document.createElement("img");
  newDiv.src = "/img/spaceCraft" + (+i * 2 + 1) + ".png";
  newDiv.classList.add("circle");
  if (+i == selected) newDiv.classList.add("selected");
  newDiv.addEventListener("click", () => {
    let els = document.querySelectorAll(".selected");
    for (let j = 0; j < els.length; j++) {
      els[j].classList.remove("selected");
    }
    selected = +i;
    newDiv.classList.add("selected");
  });
  classSelector.appendChild(newDiv);
}
document.getElementById("username").focus();
document.getElementById("username").addEventListener("keydown", (e) => {
  if (e.keyCode == 13 && opened) {
    send({
      Spawn: [(document.getElementById("username") as HTMLInputElement).value, classes[selected]],
    });
    document.getElementById("login").style.display = "none";
  }
});

let rightclick = false;
let leftclick = false;
let spacekey = false;
let skey = false;
window.addEventListener("mousemove", (e) => {
  let a = Math.atan2(e.clientX - window.innerWidth / 2, window.innerHeight / 2 - e.clientY);
  if (a < 0) a += 2 * Math.PI;
  send({ Angle: a });
});
window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  return false;
});
window.addEventListener("keydown", (e) => {
  if (e.keyCode == 83) {
    skey = true;
    send({ Split: rightclick || skey });
  }
  if (e.keyCode == 32) {
    spacekey = true;
    send({ Click: leftclick || spacekey });
  }
  if (e.keyCode == 65) {
    send({ Join: true });
  }
  if (e.keyCode == 27) {
    send({ Escape: true });
  }
});
window.addEventListener("keyup", (e) => {
  if (e.keyCode == 83) {
    skey = false;
    send({ Split: rightclick || skey });
  }
  if (e.keyCode == 32) {
    spacekey = false;
    send({ Click: leftclick || spacekey });
  }
  if (e.keyCode == 65) {
    send({ Join: false });
  }
  if (e.keyCode == 27) {
    send({ Escape: false });
  }
});
window.addEventListener("mousedown", (e) => {
  if (e.button == 0) {
    leftclick = true;
    send({ Click: leftclick || spacekey });
  }
  if (e.button == 2) {
    rightclick = true;
    send({ Split: rightclick || skey });
  }
});
window.addEventListener("mouseup", (e) => {
  if (e.button == 0) {
    leftclick = false;
    send({ Click: leftclick || spacekey });
  }
  if (e.button == 2) {
    rightclick = false;
    send({ Split: rightclick || skey });
  }
});
