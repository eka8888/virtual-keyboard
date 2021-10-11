const head = document.getElementsByTagName('HEAD')[0];

const link = document.createElement('link');

link.rel = 'stylesheet';

link.href = 'style.css';

head.appendChild(link);


document.body.style.background = 'whitesmoke'
let main1 = document.createElement('div')
document.body.append(main1)
main1.style.cssText = `
margin-top:3rem;
display:flex;
justify-content:center;
align-items:center;
flex-direction: column;
flex-wrap: wrap;
`
let heading = document.createElement('h2')
main1.appendChild(heading)
heading.innerText = "Virtual keyboard"
heading.style.color = "rgb(59, 69, 78)"

main1.appendChild(heading)
heading.innerText = "Virtual keyboard"
heading.style.color = "rgb(59, 69, 78)"

let textarea = document.createElement('textarea')
main1.appendChild(textarea)
textarea.classList.add("use-keyboard-input")
textarea.setAttribute("rows", "15");
textarea.setAttribute("cols", "106");



const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {

        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        textarea.addEventListener("keydown", e => {
            const key = e.key
            const code = e.code
            this.elements.keys.forEach(el => {
                if (el.keyCode === code) {
                    console.log(el.keyCode)
                    console.log(code)
                    console.log(key)
                    el.style.cssText = `
                            border-radius: 50px;
                            background-color: lineargb(0, 255, 136);
                            animation-name: example;
                            animation-duration: 2s;
                            `
                } else if (el.innerText === key) {
                    el.style.cssText = `
                            border-radius: 50px;
                            background-color: lineargb(0, 255, 136);
                            animation-name: example;
                            animation-duration: 4s;
                             `
                } else if (el.textContent.toUpperCase() === key && el.innerText !== key) {
                    console.log(el.textContent.toUpperCase())
                    console.log(key.toUpperCase())
                    console.log(el.innerText)
                    console.log(key)
                    el.style.cssText = `                          
                                              border-radius: 50px;
                                              background-color: lineargb(0, 255, 136);
                                              animation-name: example;
                                              animation-duration: 4s;
                                               `
                }
            });
        });


        textarea.addEventListener("keyup", e => {
            const key = e.key
            const code = e.code
            this.elements.keys.forEach(el => {
                if (el.keyCode === code) {
                    el.style.cssText = `
                                    background-color:rgb(59, 69, 78);
                                    `
                } else if (el.innerText === key) {
                    el.style.cssText = `
                                    background-color:rgb(97, 111, 122);
                                    `
                } else if (el.textContent.toUpperCase() === key && el.innerText !== key) {
                    el.style.cssText = `
                                    background-color:rgb(97, 111, 122);
                                    `
                }
            });

        })


        this.elements.main.appendChild(this.elements.keysContainer);
        main1.appendChild(this.elements.main);
        this.elements.main.style.cssText = `
        width:50rem;
        margin-top:3rem;
        height:35vh;
        background-color:rgb(168, 196, 219);
        border:black solid 3px;
        border-radius:5px;
        text-align:center;
        `

        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue
                });
            });
        });
    },



    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "del",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "ShiftLeft", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "↑", "ShiftRight",
            "ControlLeft", "win", "alt", "space", "alt1", "←", "↓", "→", "ControlRight"
        ];


        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "del", "enter", "shiftRight"].indexOf(key) !== -1;

            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");


            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerText = "Backspace";
                    keyElement.keyCode = "Backspace";

                    textarea.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;
                case "tab":
                    keyElement.classList.add("keyboard__key--tab");
                    keyElement.innerText = "Tab";
                    keyElement.keyCode = "Tab";
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "    ";
                        this._triggerEvent("oninput");
                    });

                    break;
                case "del":
                    keyElement.classList.add("keyboard__key--del");
                    keyElement.innerText = "DEL";
                    keyElement.keyCode = "Delete";

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerText = "CapsLock";
                    keyElement.keyCode = "CapsLock";

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                    });


                    break;


                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerText = "Enter";
                    keyElement.keyCode = "Enter";

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = ""
                    keyElement.keyCode = "Space";

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;
                case "ShiftLeft":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerText = "shift";
                    keyElement.keyCode = "ShiftLeft";

                    break;
                case "ShiftRight":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerText = "shift";
                    keyElement.keyCode = "ShiftRight";

                    break;


                case "ControlLeft":
                    keyElement.classList.add("keyboard__key--tab");
                    keyElement.innerText = "Ctrl";
                    keyElement.keyCode = "ControlLeft";

                    break;
                case "ControlRight":
                    keyElement.classList.add("keyboard__key--tab");
                    keyElement.innerText = "Ctrl";
                    keyElement.keyCode = "ControlRight";

                    break;

                case "alt":
                    keyElement.classList.add("keyboard__key--tab");
                    keyElement.innerText = "alt";
                    keyElement.keyCode = "AltLeft";

                    break;
                case "alt1":
                    keyElement.classList.add("keyboard__key--tab");
                    keyElement.innerText = "alt";
                    keyElement.keyCode = "AltRight";

                    break;

                case "win":
                    keyElement.classList.add("keyboard__key--tab");
                    keyElement.innerText = "Win";
                    keyElement.keyCode = "MetaLeft";

                    break;

                case "\\":
                    keyElement.classList.add("keyboard__key--tab");
                    keyElement.innerText = "\\";
                    keyElement.keyCode = "backSlash";

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\\";
                        this._triggerEvent("oninput");
                    });


                    break;

                case "↑":
                    keyElement.classList.add("keyboard__key--tab");
                    keyElement.innerText = "↑";
                    keyElement.keyCode = "ArrowUp";

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "↑";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "←":
                    keyElement.classList.add("keyboard__key--tab");
                    keyElement.innerText = "←";
                    keyElement.keyCode = "ArrowLeft";

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "←";
                        this._triggerEvent("oninput");
                    });

                    break;
                case "↓":
                    keyElement.classList.add("keyboard__key--tab");
                    keyElement.innerText = "↓";
                    keyElement.keyCode = "ArrowDown";

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "↓";
                        this._triggerEvent("oninput");
                    });

                    break;
                case "→":
                    keyElement.classList.add("keyboard__key--tab");
                    keyElement.innerText = "→";
                    keyElement.keyCode = "ArrowRight";

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "→";
                        this._triggerEvent("oninput");
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }


            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }

        });

        return fragment;
    },


    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },


    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }

};

window.addEventListener("DOMContentLoaded", function() {
    Keyboard.init();
});