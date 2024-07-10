const lightTheme = "styles/light.css";
    const darkTheme = "styles/dark.css";
    const sunIcon = "assets/SunIcon.svg";
    const moonIcon = "assets/MoonIcon.svg";
    const themeIcon = document.getElementById("theme-icon");
    const res = document.getElementById("result");
    const toast = document.getElementById("toast");

    function calculate(value) {
      const invalidPattern = /(\^|\+|\-|\*|\/|%|\.)\1|[\+\-\*\/%]{2,}|^\^|^\*|^\%|^\//;
      const expression = value.replace(/\^/g, '**');
      let calculatedValue;
    
      try {
        if (invalidPattern.test(value)) {
          throw new Error("Invalid expression");
        }
        calculatedValue = eval(expression);
      } catch (e) {
        calculatedValue = NaN;
      }
    
      if (isNaN(calculatedValue)) {
        if (invalidPattern.test(value)) {
          res.value = "Invalid expression: please check your input";
        } else {
          res.value = "Can't divide 0 with 0";
        }
        setTimeout(() => {
          res.value = "";
        }, 1300);
      } else {
        res.value = calculatedValue;
      }
    }
    
    

    function changeTheme() {
      const theme = document.getElementById("theme");

      if (theme.getAttribute("href") === lightTheme) {
        theme.setAttribute("href", darkTheme);
        themeIcon.setAttribute("src", sunIcon);
      } else {
        theme.setAttribute("href", lightTheme);
        themeIcon.setAttribute("src", moonIcon);
      }
    }

    function liveScreen(enteredValue) {
      if (!res.value) {
        res.value = "";
      }
      res.value += enteredValue;
    }

    document.addEventListener("keydown", keyboardInputHandler);

    function back() {
      const resultInput = res.value;
      res.value = resultInput.substring(0, res.value.length - 1);
    }

    function keyboardInputHandler(e) {
      e.preventDefault();

      //numbers
      if (e.key >= "0" && e.key <= "9") {
        res.value += e.key;
      }

      //operators
      if (["+", "-", "*", "/", "%", "^"].includes(e.key)) {
        res.value += e.key;
      }

      //decimal key
      if (e.key === ".") {
        res.value += ".";
      }

      //press enter to see result
      if (e.key === "Enter") {
        calculate(res.value);
      }

      //backspace for removing the last input
      if (e.key === "Backspace") {
        back();
      }
    }