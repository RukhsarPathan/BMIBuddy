// ---------- INDEX PAGE LOGIC ----------
if (window.location.pathname.includes("./index.html") || window.location.pathname === "/") {
  setTimeout(() => {
    document.body.style.transition = "opacity 0.3s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {
      window.location.href = "./selection.html";
    }, 300);
  }, 2000);
}

// ---------- SELECTION PAGE LOGIC ----------
if (window.location.pathname.includes("./selection.html")) {
  // Gender logic
  let selectedGender = null;
  window.selectGender = function (gender) {
    selectedGender = gender;
    document.querySelector('.gender-m').classList.remove('active');
    document.querySelector('.gender-f').classList.remove('active');

    if (gender === 'male') {
      document.querySelector('.gender-m').classList.add('active');
    } else {
      document.querySelector('.gender-f').classList.add('active');
    }
  };

  // Plus-minus & input logic
  window.updateValue = function (type, change) {
    const input = document.getElementById(`${type}Value`);
    let current = parseInt(input.value);
    if (isNaN(current)) current = 1;
    const newValue = Math.max(1, current + change);
    input.value = newValue;
  };

  // Go to result page
  window.goToResult = function () {
    const feet = parseInt(document.getElementById("heightFeet").value);
    const inches = parseInt(document.getElementById("heightInches").value);
    const weightLbs = parseInt(document.getElementById("weightValue").value);
    const age = parseInt(document.getElementById("ageValue").value);

    if (!selectedGender) {
      alert("Please select a gender.");
      return;
    }

    if (isNaN(feet) || isNaN(inches)) {
      alert("Please enter your height in feet and inches.");
      return;
    }

    // Convert ft + in to inches, then to meters
    const totalInches = feet * 12 + inches;
    const heightMeters = totalInches * 0.0254;

    // Convert lbs to kg
    const weightKg = weightLbs * 0.453592;

    const bmi = weightKg / (heightMeters * heightMeters);
    window.location.href = `result.html?bmi=${bmi.toFixed(1)}`;
  };
}

// ---------- RESULT PAGE LOGIC ----------
const path = window.location.pathname;
if (path.endsWith("result.html") || path === "/" || path === "/BMI-Buddy/") 
{
  // Redirect when clicking header or hourglass
  const heading = document.getElementById("heading-click");
  const hourglass = document.getElementById("hourglass-click");

  if (heading) {
    heading.addEventListener("click", () => {
      window.location.href = "./selection.html";
    });
  }

  if (hourglass) {
    hourglass.addEventListener("click", () => {
      window.location.href = "./selection.html";
    });
  }

  const params = new URLSearchParams(window.location.search);
  const bmi = parseFloat(params.get("bmi"));

  const bmiValueElement = document.getElementById("bmi-value");
  const bmiCategoryElement = document.getElementById("bmi-category");
  const bmiRangeElement = document.getElementById("bmi-range");
  const recommendationTitle = document.getElementById("recommendation-title");
  const caloriesList = document.getElementById("calories-list");
  const nutrientsList = document.getElementById("nutrients-list");

  const recommendations = {
    underweight: {
      title: "Underweight",
      color: "#B2FF66",
      calories: [
        "Consume more high-calorie foods like nuts, avocados, and healthy oils",
        "Increase portion sizes during meals"
      ],
      nutrients: [
        "Focus on foods rich in protein (lean meats, fish, eggs, legumes)",
        "Include complex carbohydrates (whole grains, sweet potatoes)",
        "Eat plenty of fruits and vegetables"
      ]
    },
    normal: {
      title: "Normal",
      color: "#00FF99",
      calories: [
        "Continue balanced diet with whole foods",
        "Maintain regular physical activity"
      ],
      nutrients: [
        "Eat a variety of fruits, vegetables, lean proteins, and whole grains",
        "Limit sugary snacks and processed foods"
      ]
    },
    overweight: {
      title: "Overweight",
      color: "#FFA500",
      calories: [
        "Reduce high-calorie snacks and processed foods",
        "Control portion sizes"
      ],
      nutrients: [
        "Eat more fiber-rich foods and lean proteins",
        "Choose low-calorie cooking methods (steaming, grilling)"
      ]
    },
    obese: {
      title: "Obese",
      color: "#FF4C4C",
      calories: [
        "Work with a dietitian to build a calorie deficit plan",
        "Avoid sugary drinks and fast food"
      ],
      nutrients: [
        "Prioritize high-fiber vegetables, lean proteins, and healthy fats",
        "Exercise regularly with low-impact routines (walking, swimming)"
      ]
    }
  };

  function getBMICategory(bmi) {
    if (bmi < 18.5) return "underweight";
    if (bmi < 25) return "normal";
    if (bmi < 30) return "overweight";
    return "obese";
  }

  function renderResult() {
    if (isNaN(bmi)) {
      bmiValueElement.textContent = "--";
      bmiCategoryElement.textContent = "Unknown";
      return;
    }

    const category = getBMICategory(bmi);
    const data = recommendations[category];

    bmiValueElement.textContent = bmi.toFixed(1);
    bmiCategoryElement.textContent = data.title;
    bmiCategoryElement.style.color = data.color;
    bmiRangeElement.value = bmi;
    recommendationTitle.textContent = data.title;

    caloriesList.innerHTML = data.calories.map(item => `<li>${item}</li>`).join('');
    nutrientsList.innerHTML = data.nutrients.map(item => `<li>${item}</li>`).join('');
  }

  renderResult();
}
