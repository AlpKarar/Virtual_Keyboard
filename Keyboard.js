
// "Keyboard" acts like a instance of a proto class.

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    user: "",
    password: "",
    value: "",
    capsLock: false,
  },

  isActivated: {
    user: false,
    password: false,
    value: false
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");

    // Deploy keys on the keyboard
    this.elements.keysContainer.appendChild(this._createKeys());    

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

         
  },

  _createKeys() {    
    const fragment = document.createDocumentFragment();

    const keyLayout = [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
      "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "Clear All",
      "space"
    ];

    // Creates icon on HTML elements
    const createIconHTML = (icon_name) => `<i class="material-cons">${icon_name}</i>`;

    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace", "p", "enter", "Clear All"].indexOf(key) !== -1; 

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("<img class='backspace' src='assets/Keyboard/backspace.png'>");

          keyElement.addEventListener("click", function() {
            if (Keyboard.isActivated.user === true) {
              Keyboard.properties.user = Keyboard.properties.user.substring(0, Keyboard.properties.user.length - 1);

            } else if (Keyboard.isActivated.password === true) {
              Keyboard.properties.password = Keyboard.properties.password.substring(0, Keyboard.properties.password.length - 1);

            } else if (Keyboard.isActivated.value === true) {
              Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.value.length - 1);

            }
            
            Keyboard._triggerEvent("oninput"); 
          });  

          break;

        case "caps":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("<img class='capslock' src='assets/Keyboard/capslock.png'>");
          
          keyElement.addEventListener("click", function() {
            Keyboard._toggleCapsLock();
            if (Keyboard.properties.capsLock) {
              Keyboard.properties.capsLock = false;
              keyElement.classList.remove("keyboard__key--active");
            } else {
              keyElement.classList.add("keyboard__key--active");
              Keyboard.properties.capsLock = true;
            }
          });           

          break;
          
        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("<img class='enter' src='assets/Keyboard/enter.png'>");
            
          keyElement.addEventListener("click", function() {
            if (Keyboard.isActivated.user === true) {
              Keyboard.properties.user += "\n";

            } else if (Keyboard.isActivated.password === true) {
              Keyboard.properties.password += "\n";

            } else if (Keyboard.isActivated.value === true) {
              Keyboard.properties.value += "\n";

            }
                          
            Keyboard._triggerEvent("oninput"); 
          });        

          break;

        case "Clear All":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("<img class='bin' src='assets/Keyboard/bin.png'>");
            
          keyElement.addEventListener("click", function() {
            if (Keyboard.isActivated.user === true) {
              Keyboard.properties.user = "";

            } else if (Keyboard.isActivated.password === true) {
              Keyboard.properties.password = "";

            } else if (Keyboard.isActivated.value === true) {
              Keyboard.properties.value = "";

            }
                          
            Keyboard._triggerEvent("oninput"); 
          });        

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("<img class='space' src='assets/Keyboard/space.png'>");
          
          keyElement.addEventListener("click", function() {                        
            if (Keyboard.isActivated.user === true) {
              Keyboard.properties.user += " ";              

            } else if (Keyboard.isActivated.password === true) {
              Keyboard.properties.password += " ";

            } else if (Keyboard.isActivated.value === true) {
              Keyboard.properties.value += " ";

            }
                          
            Keyboard._triggerEvent("oninput");
          });          

          break;
            
        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("<img class='exit' src='assets/Keyboard/exit.png'>");
             
          keyElement.addEventListener("click", function() {
            Keyboard.close();            
            Keyboard._triggerEvent("onclose");          
          }); 

          break;
            
        default:
          keyElement.textContent = key.toLowerCase();
            
          keyElement.addEventListener("click", function() {
            if (Keyboard.isActivated.user === true) {
              Keyboard.properties.user += Keyboard.properties.capsLock ? key.toUpperCase() : key.toLowerCase();

            } else if (Keyboard.isActivated.password === true) {
              Keyboard.properties.password += Keyboard.properties.capsLock ? key.toUpperCase() : key.toLowerCase();

            } else if (Keyboard.isActivated.value === true) {
              Keyboard.properties.value += Keyboard.properties.capsLock ? key.toUpperCase() : key.toLowerCase();

            }
            
            Keyboard._triggerEvent("oninput");
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
    console.log("Event Triggered! Event Name: " + handlerName);

    // fill textarea
        
    if (Keyboard.isActivated.user === true) {
      var user = document.querySelector(".user__input input");
      user.value = Keyboard.properties.user;

    } else if (Keyboard.isActivated.password === true) {
      var password = document.querySelector(".password__input input");
      password.value = Keyboard.properties.password;

    } else if (Keyboard.isActivated.value === true) {
      var textarea = document.querySelector("textarea");
      textarea.value = Keyboard.properties.value;

    }    

  },

  _toggleCapsLock() {    
    console.log("CapsLock Toggled!");
  },
  
  close() {
    Keyboard.isActivated.user = false;
    Keyboard.isActivated.password = false;
    Keyboard.isActivated.value = false;
    Keyboard.elements.main.classList.add("keyboard--hidden");
    const virtualKeyboard = document.querySelector("#Virtual__Keyboard div img");
    virtualKeyboard.style.backgroundColor = "";
  },
};


// Run the object "Keyboard"

window.addEventListener("DOMContentLoaded", function() {
  Keyboard.init();
  
});

const btnVirtualKey = document.querySelector("#Virtual__Keyboard");

btnVirtualKey.addEventListener("click", function() {
  Keyboard.elements.main.classList.remove("keyboard--hidden");  
  const virtualKeyboard = document.querySelector("#Virtual__Keyboard div img");
  virtualKeyboard.style.backgroundColor = "#66CDAA";  // #66CDAA Green
});


// Activate "user" when clicked on it and deactivate others

const user = document.querySelector(".user__input input");

user.addEventListener("click", function() {
  Keyboard.isActivated.user = true;
  Keyboard.isActivated.password = false;
  Keyboard.isActivated.value = false;
});


// Activate "password" when clicked on it and deactivate others

const password = document.querySelector(".password__input input");

password.addEventListener("click", function() {
  Keyboard.isActivated.user = false;
  Keyboard.isActivated.password = true;
  Keyboard.isActivated.value = false;
});


// Activate "value" when clicked on it and deactivate others

const value = document.querySelector("textarea");

value.addEventListener("click", function() {
  Keyboard.isActivated.user = false;
  Keyboard.isActivated.password = false;
  Keyboard.isActivated.value = true;
});

