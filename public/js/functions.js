// document.addEventListener("click", e => {
//   console.log(e.target);
// });

// Global scheme and variant
const schema = {
  id1: { scheme: "monochromatic", num: 4 },
  id2: { scheme: "contrast", num: 8 },
  id3: { scheme: "triade", num: 12 },
  id4: { scheme: "tetrade", num: 16 },
  id5: { scheme: "analogic", num: 12 }
};
const schemaValues = Object.values(schema);
const variant = ["default", "pastel", "soft", "light", "hard", "pale"];

////////////////////////////////////////////////
// ------ Global random checks -----------------
const checkboxScheme = document.getElementById("checkbox-scheme");
const checkboxVariant = document.getElementById("checkbox-variant");
const checkboxHue = document.getElementById("checkbox-hue");
checkboxHue.onmousedown = event => {
  event.preventDefault();
};
checkboxVariant.onmousedown = event => {
  event.preventDefault();
};
checkboxScheme.onmousedown = event => {
  event.preventDefault();
};

// Canvas variables
let canvasActive = false;
let canvasColors;

///////////////////////////////////////////////
// End variables -------------------------------

// get random number
function getRand(num) {
  return Math.floor(Math.random() * num);
}

// Functions to update menu text

// Capitalize a string
function capitlalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Function that creates num grid elements and pushes them
// to gridContainer.
export function createGrid(gridContainer, bgContainer) {
  let j = 0;
  let m = 0;

  //grid loop
  for (let i = 0; i < 25; i++) {
    let div = document.createElement("div" + i);
    div.className = "grid-item";
    div.matches("div0") ||
    div.matches("div1") ||
    div.matches("div2") ||
    div.matches("div3") ||
    div.matches("div4")
      ? (div.className += " grid-button")
      : 0;

    setTimeout(() => {
      gridContainer.appendChild(div);
    }, (j += 20));
  }
  j = 0;

  //slider loop
  for (let k = 0; k < 10; k++) {
    let div = document.createElement("div");
    div.className = "slider";
    setTimeout(() => {
      bgContainer.appendChild(div);
    }, (m += 20));
  }
  m = 0;
}

// // Returns random scheme
function randScheme() {
  return schemaValues[getRand(5)].scheme;
}

// // Returns random variant
function randVariation() {
  return variant[getRand(6)];
}

// Stop pulse effect on all grid-buttons
function stopPulse() {
  document.querySelectorAll(".grid-button").forEach(el => {
    return (el.style.animation = "none");
  });
}

// Get a random Hue
function randHue() {
  return getRand(360);
}

// Takes colors in Hex format and lights or darkens them by amt
function LightenDarkenColor(col, amt) {
  var usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}
//////////////////////////////////////////////////////////////////////////
/// Canvas ---------------------
const fullModal = document.querySelector(".full-modal");
const canvasWrapper = document.querySelector(".canvas-wrapper");
const jpgBtn = document.getElementById("jpgBtn");
const pngBtn = document.getElementById("pngBtn");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;

// save canvas as image via jpg or png
canvasWrapper.addEventListener("click", e => {
  let dataURL;
  e.target === jpgBtn
    ? ((dataURL = canvas.toDataURL("image/jpeg")), (jpgBtn.href = dataURL))
    : "";
  e.target === pngBtn
    ? ((dataURL = canvas.toDataURL("image/png")), (pngBtn.href = dataURL))
    : "";
});

function separatedColors() {

  // seperates single color into 5 (2 darker, 2 lighter)
  function arrangeColors(col) {
    let arranged = [];
    let num = -60;
    while (arranged.length < 5) {
      arranged.push(LightenDarkenColor(col, num));
      num += 30;
    }
    return arranged;
  }
  let separatedColors = [];

  canvasColors.map(color => {
    separatedColors.push(arrangeColors(color));
  });

  return separatedColors;
}

function fillCanvas() {
  // fill canvas with colors
  if (canvasColors.length === 4) {
    canvas.height = 320;
    let separated = separatedColors();

    ctx.fillStyle = separated[0][0];
    ctx.fillRect(0, 0, 80, 80);
    ctx.fillStyle = separated[0][1];
    ctx.fillRect(80, 0, 80, 80);
    ctx.fillStyle = separated[0][2];
    ctx.fillRect(160, 0, 80, 80);
    ctx.fillStyle = separated[0][3];
    ctx.fillRect(240, 0, 80, 80);
    ctx.fillStyle = separated[0][4];
    ctx.fillRect(320, 0, 80, 80);

    ctx.fillStyle = separated[1][0];
    ctx.fillRect(0, 80, 80, 80);
    ctx.fillStyle = separated[1][1];
    ctx.fillRect(80, 80, 80, 80);
    ctx.fillStyle = separated[1][2];
    ctx.fillRect(160, 80, 80, 80);
    ctx.fillStyle = separated[1][3];
    ctx.fillRect(240, 80, 80, 80);
    ctx.fillStyle = separated[1][4];
    ctx.fillRect(320, 80, 80, 80);

    ctx.fillStyle = separated[2][0];
    ctx.fillRect(0, 160, 80, 80);
    ctx.fillStyle = separated[2][1];
    ctx.fillRect(80, 160, 80, 80);
    ctx.fillStyle = separated[2][2];
    ctx.fillRect(160, 160, 80, 80);
    ctx.fillStyle = separated[2][3];
    ctx.fillRect(240, 160, 80, 80);
    ctx.fillStyle = separated[2][4];
    ctx.fillRect(320, 160, 80, 80);

    ctx.fillStyle = separated[3][0];
    ctx.fillRect(0, 240, 80, 80);
    ctx.fillStyle = separated[3][1];
    ctx.fillRect(80, 240, 80, 80);
    ctx.fillStyle = separated[3][2];
    ctx.fillRect(160, 240, 80, 80);
    ctx.fillStyle = separated[3][3];
    ctx.fillRect(240, 240, 80, 80);
    ctx.fillStyle = separated[3][4];
    ctx.fillRect(320, 240, 80, 80);
  } else {
    let separated = separatedColors();
    canvas.height = 400;
    ctx.fillStyle = separated[0][0];
    ctx.fillRect(0, 0, 80, 80);
    ctx.fillStyle = separated[0][1];
    ctx.fillRect(80, 0, 80, 80);
    ctx.fillStyle = separated[0][2];
    ctx.fillRect(160, 0, 80, 80);
    ctx.fillStyle = separated[0][3];
    ctx.fillRect(240, 0, 80, 80);
    ctx.fillStyle = separated[0][4];
    ctx.fillRect(320, 0, 80, 80);

    ctx.fillStyle = separated[1][0];
    ctx.fillRect(0, 80, 80, 80);
    ctx.fillStyle = separated[1][1];
    ctx.fillRect(80, 80, 80, 80);
    ctx.fillStyle = separated[1][2];
    ctx.fillRect(160, 80, 80, 80);
    ctx.fillStyle = separated[1][3];
    ctx.fillRect(240, 80, 80, 80);
    ctx.fillStyle = separated[1][4];
    ctx.fillRect(320, 80, 80, 80);

    ctx.fillStyle = separated[2][0];
    ctx.fillRect(0, 160, 80, 80);
    ctx.fillStyle = separated[2][1];
    ctx.fillRect(80, 160, 80, 80);
    ctx.fillStyle = separated[2][2];
    ctx.fillRect(160, 160, 80, 80);
    ctx.fillStyle = separated[2][3];
    ctx.fillRect(240, 160, 80, 80);
    ctx.fillStyle = separated[2][4];
    ctx.fillRect(320, 160, 80, 80);

    ctx.fillStyle = separated[3][0];
    ctx.fillRect(0, 240, 80, 80);
    ctx.fillStyle = separated[3][1];
    ctx.fillRect(80, 240, 80, 80);
    ctx.fillStyle = separated[3][2];
    ctx.fillRect(160, 240, 80, 80);
    ctx.fillStyle = separated[3][3];
    ctx.fillRect(240, 240, 80, 80);
    ctx.fillStyle = separated[3][4];
    ctx.fillRect(320, 240, 80, 80);

    ctx.fillStyle = separated[4][0];
    ctx.fillRect(0, 320, 80, 80);
    ctx.fillStyle = separated[4][1];
    ctx.fillRect(80, 320, 80, 80);
    ctx.fillStyle = separated[4][2];
    ctx.fillRect(160, 320, 80, 80);
    ctx.fillStyle = separated[4][3];
    ctx.fillRect(240, 320, 80, 80);
    ctx.fillStyle = separated[4][4];
    ctx.fillRect(320, 320, 80, 80);
  }
  setTimeout(() => {
    toggleCanvas();
  }, 100);
}

function toggleCanvas() {
  canvasActive
    ? ((canvasWrapper.style.display = "none"),
      (fullModal.style.display = "none"),
      (canvasActive = false))
    : ((canvasActive = true),
      (fullModal.style.display = "block"),
      (canvasWrapper.style.display = "flex"));
}
// if canvas is active and user clicks anywhere but the canvas wrapper, close modal.
document.addEventListener("click", e => {
  if (canvasActive) {
    e.target !== canvasWrapper ? toggleCanvas() : "";
  }
});
//////////////////////////////////////////////////////////////////////////
//------------ Grid Class -----------------
export class Grid {
  constructor(gridContainer, bgContainer) {
    // Grid Schemes and Variants
    this.schema = {
      id1: { scheme: "monochromatic", num: 4 },
      id2: { scheme: "contrast", num: 8 },
      id3: { scheme: "triade", num: 12 },
      id4: { scheme: "tetrade", num: 16 },
      id5: { scheme: "analogic", num: 12 }
    };
    this.variant = ["default", "pastel", "soft", "light", "hard", "pale"];
    this.schemaValues = Object.values(this.schema);

    ////////////////////////////////////////////
    // ----- Grid Bools ------------------------
    this.colorComplements = false;
    let colorComplements = this.colorComplements;
    this.randSchemeCheck = false;
    this.randVariantCheck = false;
    this.randHueCheck = false;
    this.gridLocked = false;

    // Complement Toggle Btn
    // Toggle colorcomplements and select analogic scheme if turned on
    this.toggleComplements = function() {
      // Turn of random schemes if currently on
      if (this.randSchemeCheck) {
        this.randSchemeCheck = false;
      }

      !this.colorComplements
        ? ((this.schemeList[3].style.backgroundColor = "#e7563c"),
          setTimeout(() => {
            this.schemeList[3].style.backgroundColor = "";
          }, 300),
          (this.colorComplements = true),
          (colorComplements = this.colorComplements),
          (this.currentScheme = this.schema.id5.scheme),
          (this.currentNum = this.updateNum()),
          this.updateText(),
          this.updateColors(),
          (this.complementBtn.style.backgroundColor = "aliceblue"),
          (this.complementBtn.style.color = "#24292e"),
          (this.complementBtn.innerHTML = "Complements On"))
        : (((this.colorComplements = false),
          (colorComplements = this.colorComplements)),
          (this.currentNum = this.updateNum()),
          this.updateText(),
          this.updateColors(),
          (this.complementBtn.style.backgroundColor = "#24292e"),
          (this.complementBtn.style.color = "aliceblue"),
          (this.complementBtn.innerHTML = "Complements Off"));
    };

    /////////////////////////////////////////////
    // ------------Grid Variables ---------------
    this.gridContainer = gridContainer;
    this.bgContainer = bgContainer;
    let randomScheme = randScheme();
    let randomVariant = randVariation();
    this.currentScheme = randomScheme;
    this.currentVariant = randomVariant;
    this.currentHue = randHue();
    this.canvasColors = [];
    /////////////////////////////////////////////////
    // ------ Grid Menu && Dom Selectors -----------------------------
    this.menu = this.gridContainer.parentElement.querySelector(".menu");
    this.modal = this.menu.querySelector(".grid-modal");

    // Modal buttons
    this.randHueBtn = this.modal.children[0].children[0].children[0];
    this.gridLockBtn = this.modal.children[0].children[0].children[1];
    this.randSchemeBtn = this.modal.children[0].children[0].children[2];
    this.randVariantBtn = this.modal.children[0].children[0].children[3];
    this.canvasBtn = this.modal.children[0].children[0].children[4];

    // Modal button icons
    this.randHueIcon = this.randHueBtn.children[0];
    this.gridLockIcon = this.gridLockBtn.children[0];
    this.randSchemeIcon = this.randSchemeBtn.children[0];
    this.randVariantIcon = this.randVariantBtn.children[0];
    this.modalActive = false;

    // Toggle grid modal
    this.toggleModal = function() {
      !this.modalActive
        ? ((this.modal.style.display = "flex"), (this.modalActive = true))
        : ((this.modal.style.display = "none"), (this.modalActive = false));
    };

    /////////////////////////////////////////////
    // ------- Modal Toggle Buttons ------------
    this.toggleRandHue = function() {
      !this.randHueCheck
        ? ((this.randHueCheck = true),
          (this.randHueIcon.style.color = "aliceblue"))
        : ((this.randHueCheck = false),
          (this.randHueIcon.style.color = "#15142c"));
    };
    this.toggleGridLock = function() {
      !this.gridLocked
        ? ((this.gridLocked = true),
          (this.gridLockIcon.style.color = "aliceblue"))
        : ((this.gridLocked = false),
          (this.gridLockIcon.style.color = "#15142c"));
    };
    this.toggleRandScheme = function() {
      !this.randSchemeCheck
        ? ((this.randSchemeCheck = true),
          (this.randSchemeIcon.style.color = "aliceblue"))
        : ((this.randSchemeCheck = false),
          (this.randSchemeIcon.style.color = "#15142c"));
    };
    this.toggleRandVariant = function() {
      !this.randVariantCheck
        ? ((this.randVariantCheck = true),
          (this.randVariantIcon.style.color = "aliceblue"))
        : ((this.randVariantCheck = false),
          (this.randVariantIcon.style.color = "#15142c"));
    };

    ////////////////////////////////////////////
    // ----- Dropdown objects ------------------
    this.topDropdown = {
      menu: this.menu.querySelector("#schemes"),
      active: false
    };
    this.sideDropdown = {
      menu: this.menu.querySelector("#variant"),
      active: false
    };
    this.hueDropdown = {
      menu: this.menu.querySelector(".text-container"),
      active: false
    };
    this.canvasDropdown = {
      menu: this.menu.querySelector("#canvas-prompt"),
      active: false
    };

    // List Li's
    this.schemeList = this.topDropdown.menu.children;
    this.variantList = this.sideDropdown.menu.children;
    this.gridSchemaText = this.hueDropdown.menu.children[0];
    this.canvasText = this.canvasDropdown.menu;

    // Hex Dom Selectors
    this.hueText = this.gridSchemaText.querySelector(".hue-text");
    this.variantText = this.gridSchemaText.querySelector(".variant-text");
    this.schemeText = this.gridSchemaText.querySelector(".scheme-text");
    this.hexDropdown = this.menu.querySelector("#rgbWindow");
    this.rgbWindow = this.hexDropdown.children;
    let rgbWindow = this.rgbWindow;

    //Hue Slider
    this.hueSlider = this.menu.querySelector("#hue-slider");

    // Complement button - Analogic only
    this.complementBtn = this.topDropdown.menu.querySelector(
      "#complement-button"
    );

    // Hex Text
    this.bgText = this.rgbWindow[0].children[0];
    this.primaryText = this.rgbWindow[1].children[0];
    this.accentText = this.rgbWindow[2].children[0];
    this.highlightText = this.rgbWindow[3].children[0];
    this.complementText = this.rgbWindow[4].children[0];
    ///////////////////////////////////////////////
    // ------ Grid Variables ---------------------
    // Set initial grid num
    this.updateNum = function() {
      let num;
      switch (this.currentScheme) {
        case "monochromatic":
          num = 4;
          break;
        case "contrast":
          num = 8;
          break;
        case "triade":
          num = 12;
          break;
        case "analogic":
          this.colorComplements ? (num = 16) : (num = 12);
          break;
        case "tetrade":
          num = 16;
      }
      return num;
    };
    this.currentNum = this.updateNum();

    // Get colors from selected scheme, variant and hue
    this.schemeSelector = function() {
      let scheme = new ColorScheme();
      scheme
        .from_hue(this.currentHue)
        .scheme(this.currentScheme)
        .variation(this.currentVariant);
      let colors = scheme.colors();
      return colors;
    };

    // Generate random colors onclick
    this.colorSchemer = function() {
      const createUnique = () => {
        let randArr = [];
        let uniques = [];
        while (uniques.length < this.currentNum) {
          randArr.push(getRand(this.currentNum));
          uniques = [...new Set(randArr)];
        }

        return uniques;
      };

      let randColors = createUnique();

      let result = {
        bg: "#" + gridColors[randColors[0]],
        primary: "#" + gridColors[randColors[1]],
        accent: "#" + gridColors[randColors[2]],
        highlight: "#" + gridColors[randColors[3]],
        complement: "#" + gridColors[randColors[4]]
      };
      return result;
    };

    // Grid colors and text for generateGrid
    this.gridColors = this.schemeSelector();
    let gridColors = this.gridColors;
    this.gridText = this.colorSchemer();
    let gridText = this.gridText;
    this.gridActive = false;
    let colors;

    ///////////////////////////////////////////////
    // ---- Functions ----------------------------
    // Set initial hue slider to current hue value
    this.hueSlider.value = this.currentHue;

    // Hue slider Input
    this.hueSlider.oninput = () => {
      this.currentHue = this.hueSlider.value;
      this.updateHue();
    };

    // Update Scheme text
    this.updateScheme = function() {
      this.schemeText.innerHTML =
        "Scheme:" + " " + capitlalize(this.currentScheme);
    };
    //Update Variant text
    this.updateVariant = function() {
      this.variantText.innerHTML =
        "Variant:" + " " + capitlalize(this.currentVariant);
    };
    // Update Hue text
    this.updateHue = function() {
      this.hueText.innerHTML = "Hue:" + " " + this.currentHue;
    };

    // Update all grid text
    this.updateText = function() {
      this.updateScheme();
      this.updateVariant();
      this.updateHue();
    };

    //Update the current color scheme
    this.updateColors = function() {
      let scheme = new ColorScheme();
      this.colorComplements
        ? ((scheme = scheme
            .from_hue(this.currentHue)
            .scheme(this.currentScheme)
            .variation(this.currentVariant)
            .add_complement(true)),
          (colors = scheme.colors()),
          (gridColors = colors))
        : scheme
            .from_hue(this.currentHue)
            .scheme(this.currentScheme)
            .variation(this.currentVariant),
        (colors = scheme.colors()),
        (gridColors = colors);
    };

    // Randomize scheme variant and/or hue regardless of grid rand bools
    this.randGridGlobal = function() {
      if (checkboxScheme.checked) {
        if (this.colorComplements) {
          this.toggleComplements();
        }
        this.currentScheme = randScheme();
      } else {
        this.currentScheme = this.currentScheme;
      }

      // Randomize variant
      checkboxVariant.checked
        ? (this.currentVariant = randVariation())
        : (this.currentVariant = this.currentVariant);

      // Randomize hue
      checkboxHue.checked
        ? (this.currentHue = randHue())
        : (this.currentHue = this.currentHue);

      this.currentNum = this.updateNum();
      this.updateText();
      this.updateColors();
      this.hueSlider.value = this.currentHue;
    };

    // Randomizes scheme variant and/or hue
    this.randGrid = function() {
      // Randomize scheme. Toggle color complements off if it is currently on.
      if (this.randSchemeCheck) {
        if (this.colorComplements) {
          this.toggleComplements();
        }
        this.currentScheme = randScheme();
      } else {
        this.currentScheme = this.currentScheme;
      }

      // Randomize variant
      this.randVariantCheck
        ? (this.currentVariant = randVariation())
        : (this.currentVariant = this.currentVariant);

      // Randomize hue
      this.randHueCheck
        ? (this.currentHue = randHue())
        : (this.currentHue = this.currentHue);

      this.currentNum = this.updateNum();
      this.updateText();
      this.updateColors();
      this.hueSlider.value = this.currentHue;
    };

    // Create new grid object
    this.createGrid = createGrid;

    // Generate colors for the grid object
    this.generateGrid = function() {
      // Change el background-color to color with staggered animation
      const changeColor = (el, color) => {
        let i = 0;
        let j = 0;

        for (let g = 0; g < el.length; g++) {
          setTimeout(() => {
            el[g].style.backgroundColor = "aliceblue";
          }, (j += 20));
          setTimeout(() => {
            el[g].style.backgroundColor = color;
          }, (i += 30));
        }
      };

      // Grids seperated to loop through individually.
      const skipGrid = [
        this.gridContainer.children[0],
        this.gridContainer.children[1],
        this.gridContainer.children[2],
        this.gridContainer.children[5],
        this.gridContainer.children[6],
        this.gridContainer.children[7],
        this.gridContainer.children[13],
        this.gridContainer.children[14],
        this.gridContainer.children[18],
        this.gridContainer.children[19],
        this.gridContainer.children[23],
        this.gridContainer.children[24]
      ];
      const highlightGrid = [
        this.gridContainer.children[3],
        this.gridContainer.children[4],
        this.gridContainer.children[8],
        this.gridContainer.children[9]
      ];
      const accentGrid = [
        this.gridContainer.children[10],
        this.gridContainer.children[11],
        this.gridContainer.children[12],
        this.gridContainer.children[15],
        this.gridContainer.children[16],
        this.gridContainer.children[17],
        this.gridContainer.children[20],
        this.gridContainer.children[21],
        this.gridContainer.children[22]
      ];
      const complementGrid = [
        this.gridContainer.children[13],
        this.gridContainer.children[14],
        this.gridContainer.children[18],
        this.gridContainer.children[19],
        this.gridContainer.children[23],
        this.gridContainer.children[24]
      ];
      const bgGrid = [
        this.bgContainer.children[0],
        this.bgContainer.children[1],
        this.bgContainer.children[2],
        this.bgContainer.children[3],
        this.bgContainer.children[4],
        this.bgContainer.children[5],
        this.bgContainer.children[6],
        this.bgContainer.children[7],
        this.bgContainer.children[8],
        this.bgContainer.children[9]
      ];
      // Grid colors -----------------------------------
      let gridColors = gridText;

      this.gridActive
        ? (gridColors = this.colorSchemer())
        : (gridColors = gridText);

      // BG slider -------------------------------------
      const bgColor = gridColors.bg;
      changeColor(bgGrid, bgColor);

      // Grid ------------------------------------------
      const primaryColor = gridColors.primary;
      changeColor(skipGrid, primaryColor);

      // Accent Grid -----------------------------------
      const accentColor = gridColors.accent;
      changeColor(accentGrid, accentColor);

      // Highlight Grid --------------------------------
      const highlightColor = gridColors.highlight;
      changeColor(highlightGrid, highlightColor);

      // Complement Grid -------------------------------
      const complementColor = gridColors.complement;
      if (this.colorComplements) {
        setTimeout(() => {
          changeColor(complementGrid, complementColor);
        }, 200);
      }

      // Export colors for canvas
      this.colorComplements
        ? (this.canvasColors = [
            bgColor,
            primaryColor,
            accentColor,
            highlightColor,
            complementColor
          ])
        : (this.canvasColors = [
            bgColor,
            primaryColor,
            accentColor,
            highlightColor
          ]);

      // Change rgb text to display current RGB colors
      function updateRGB() {
        const blockColors = [
          bgColor,
          primaryColor,
          accentColor,
          highlightColor,
          complementColor
        ];

        function updateColorBlocks() {
          let j;
          colorComplements ? (j = 5) : (j = 4);
          for (let i = 0; i < j; i++) {
            rgbWindow[4].children[1].style.backgroundColor = "transparent";
            rgbWindow[
              i
            ].children[1].style.backgroundColor = `${blockColors[i]}`;
          }
        }

        //------------ Update RGB text ----------------------
        rgbWindow[0].children[0].innerHTML = "Background: " + blockColors[0];
        rgbWindow[1].children[0].innerHTML = "Primary: " + blockColors[1];
        rgbWindow[2].children[0].innerHTML = "Accent: " + blockColors[2];
        rgbWindow[3].children[0].innerHTML = "Highlight: " + blockColors[3];
        colorComplements
          ? (rgbWindow[4].children[0].innerHTML =
              "Complement: " + blockColors[4])
          : (rgbWindow[4].children[0].innerHTML = "Complement:");

        updateColorBlocks();
      }

      //////////////////////////////////////////////
      // ------- Random modifiers ------------------

      if (
        checkboxScheme.checked ||
        checkboxHue.checked ||
        checkboxVariant.checked
      ) {
        this.randGridGlobal();
      } else if (
        this.randSchemeCheck ||
        this.randVariantCheck ||
        this.randHueCheck
      ) {
        this.randGrid();
      }
      updateRGB();
      this.gridActive ? this.updateText() : null;
    };
  }
}
// ------ End Grid ----------------------
//////////////////////////////////////////
// Open and close grid menus
function toggleMenu() {
  this.active
    ? ((this.style.maxHeight = null), (this.active = false))
    : ((this.style.maxHeight = this.scrollHeight + "px"),
      (this.style.opacity = 1),
      (this.active = true));
}

// Copy argument text value to clipboard
function copyToClipboard(containerid) {
  // Create a new textarea element and give it id='temp_element'
  var textarea = document.createElement("textarea");
  textarea.id = "temp_element";
  // Optional step to make less noise on the page, if any!
  textarea.style.height = 0;
  // Now append it to your page somewhere, I chose <body>
  document.body.appendChild(textarea);
  // Give our textarea a value of whatever inside the div of id=containerid
  textarea.value = containerid;
  // Now copy whatever inside the textarea to clipboard
  let selector = document.querySelector("#temp_element");
  selector.select();
  document.execCommand("copy");
  // Remove the textarea
  document.body.removeChild(textarea);
}

// create a new grid on click
export function newGrid(obj) {
  obj.gridActive = true;
  obj.gridContainer.classList.toggle("closed-grid");
  obj.createGrid(obj.gridContainer, obj.bgContainer);
  obj.bgContainer = obj.bgContainer;
  obj.gridContainer = obj.gridContainer;
  obj.gridButtons = obj.gridContainer.children;
  obj.hueText = obj.gridSchemaText.querySelector(".hue-text");
  obj.variantText = obj.gridSchemaText.querySelector(".variant-text");
  obj.schemeText = obj.gridSchemaText.querySelector(".scheme-text");

  ////////////////////////////////////////////////
  // ------ Select grid dynamic elements ---------

  // Bind dropdown menus to toggleMenus
  let toggleScheme = toggleMenus.bind(obj.topDropdown.menu);
  let toggleVariant = toggleMenus.bind(obj.sideDropdown.menu);
  let toggleHue = toggleMenus.bind(obj.hueDropdown.menu);
  let toggleCanvasMenu = toggleMenus.bind(obj.canvasDropdown.menu);
  // toggleHex does not have to be closed if others are opened
  let toggleHex = toggleMenu.bind(obj.hexDropdown);

  // Open menu and close other menus if open
  function toggleMenus() {
    let menus = [
      obj.topDropdown,
      obj.sideDropdown,
      obj.hueDropdown,
      obj.canvasDropdown
    ];
    return menus.forEach(el => {
      if (el.active) {
        (el.menu.style.maxHeight = null),
          (el.active = false),
          (el.menu.style.pointerEvents = "none");
      } else if (el.menu === this)
        (el.menu.style.maxHeight = el.menu.scrollHeight + "px"),
          (el.menu.style.opacity = 1),
          (el.menu.style.pointerEvents = "auto"),
          (el.active = true);
    });
  }

  /////////////////////////////////////////////////
  // Wait for createGrid to finish add event listener
  setTimeout(() => {
    obj.gridContainer.addEventListener("mousedown", () => {
      switch (event.target) {
        case obj.gridButtons[0]:
          toggleScheme();
          stopPulse();
          break;
        case obj.gridButtons[1]:
          toggleVariant();
          stopPulse();
          break;
        case obj.gridButtons[2]:
          toggleHue();
          stopPulse();
          break;
        case obj.gridButtons[3]:
          toggleHex();
          stopPulse();
          break;
        case obj.gridButtons[4]:
          toggleCanvasMenu();
          stopPulse();
          break;
      }
    });
    obj.generateGrid(obj);
  }, 500);

  ////////////////////////////////////////////////
  // ---------- Menu buttons ---------------------

  // ComplementBtn
  obj.menu.addEventListener("mousedown", () => {
    // Toggle colorComplements
    if (event.target === obj.complementBtn) {
      obj.toggleComplements();
    }

    // li buttons --------------------------------
    if (
      event.target.matches("li") &&
      event.target.parentElement.className === "dropdown"
    ) {
      const that = event.target;
      // Change color, close accordian, return scheme/variant
      that.style.backgroundColor = "#e7563c";
      setTimeout(() => {
        that.style.backgroundColor = "";
      }, 300);

      // Change scheme on scheme menu click
      if (event.target.parentElement.id === "schemes") {
        schemaValues.forEach(val =>
          val.scheme === event.target.innerHTML.toLowerCase()
            ? (obj.colorComplements && val.scheme !== "analogic"
                ? (complementToggle(), (obj.currentScheme = val.scheme))
                : (obj.currentScheme = val.scheme),
              (obj.currentNum = obj.updateNum()),
              obj.updateText(),
              obj.updateColors())
            : (obj.currentScheme = obj.currentScheme)
        );
      }
    }

    // Change variant on variant menu click
    if (event.target.parentElement.id === "variant") {
      variant.forEach(val =>
        val === event.target.innerHTML.toLowerCase()
          ? ((obj.currentVariant = val), obj.updateText(), obj.updateColors())
          : (obj.currentVariant = obj.currentVariant)
      );
    }

    // Export colors and open canvas
    if (event.target.parentElement.id === "canvas-prompt") {
      canvasColors = obj.canvasColors;
      fillCanvas();
    }

    //Copy Hex to clipboard
    if (event.target.parentElement.id === "rgbWindow") {
      const that = event.target.children[0];
      const bgThat = event.target;
      copyToClipboard(event.target.children[0].innerHTML.split(" ")[1]);
      let currentText = event.target.children[0].innerHTML;

      // Selection flash
      bgThat.style.backgroundColor = "#e7563c";
      that.innerHTML = "Copied to clipboard!";
      setTimeout(() => {
        bgThat.style.backgroundColor = "";
        that.innerHTML = currentText;
      }, 500);
    }
  });

  //////////////////////////////////////////////
  // Toggle modal menu
  obj.gridContainer.parentElement.addEventListener("mousedown", () => {
    if (
      event.target.parentElement === obj.gridContainer &&
      event.target.className !== "grid-item grid-button"
    ) {
      obj.toggleModal();
    }

    if (event.target === obj.modal) {
      obj.toggleModal();
    }
  });
  obj.modal.addEventListener("mousedown", () => {
    switch (event.target) {
      case obj.randHueBtn:
        obj.toggleRandHue();
        break;
      case obj.gridLockBtn:
        obj.toggleGridLock();

        break;
      case obj.randSchemeBtn:
        obj.toggleRandScheme();

        break;
      case obj.randVariantBtn:
        obj.toggleRandVariant();
        break;
    }
  });
}
