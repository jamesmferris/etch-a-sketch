document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("grid-container");
  const colorPicker = document.getElementById("color-picker");
  const clearButton = document.getElementById("clear-button");
  let isLeftMousePressed = false;
  let isRightMousePressed = false;
  let selectedColor = "#000000";

  // Update selected color when color picker value changes
  colorPicker.addEventListener("input", function (event) {
    selectedColor = event.target.value;
  });

  // Function to change color on hover
  function changeColor(event) {
    if (isLeftMousePressed) {
      event.target.style.backgroundColor = selectedColor;
    } else if (isRightMousePressed) {
      event.target.style.backgroundColor = "#f0f0f0";
    }
  }

  // Function to change color on left click
  function changeColorOnClick(event) {
    if (event.button === 0) {
      event.target.style.backgroundColor = selectedColor;
    }
  }

  // Function to erase color on right click
  function eraseColorOnClick(event) {
    if (event.button === 2) {
      event.target.style.backgroundColor = "#f0f0f0";
    }
  }

  // for loop to create the grid
  const numSquares = 32; // 32x32 grid
  const squareSize = 640 / numSquares; // Calculate size based on container size

  for (let i = 0; i < numSquares * numSquares; i++) {
    const div = document.createElement("div");
    div.classList.add("square");
    div.style.width = `${squareSize}px`;
    div.style.height = `${squareSize}px`;
    container.appendChild(div);

    // Add event listeners for mouse events
    div.addEventListener("mouseover", changeColor);
    div.addEventListener("mousedown", changeColorOnClick);
    div.addEventListener("mousedown", eraseColorOnClick);
  }

  // Add event listeners to handle mouse press down and up events
  document.addEventListener("mousedown", function (event) {
    if (event.button === 0) {
      isLeftMousePressed = true;
    } else if (event.button === 2) {
      isRightMousePressed = true;
    }
  });

  document.addEventListener("mouseup", function (event) {
    if (event.button === 0) {
      isLeftMousePressed = false;
    } else if (event.button === 2) {
      isRightMousePressed = false;
    }
  });

  // Prevent context menu from appearing on right click
  document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
  });

  // Clear the board with shake animation
  clearButton.addEventListener("click", function () {
    container.classList.add("shake");

    setTimeout(() => {
      container.classList.remove("shake");

      // Clear the board
      const squares = document.querySelectorAll(".square");
      squares.forEach((square) => {
        square.style.backgroundColor = "#f0f0f0";
      });
    }, 1000); // Duration of shake animation
  });
});
