let user = localStorage.getItem("loggedInUser");

if(user && user !== "null"){
    document.getElementById("username").innerText = "Welcome, " + user;
} else {
    document.getElementById("username").innerText = "Welcome Guest";
}

function loadSection(section){
    let title = document.getElementById("section-title");
    let content = document.getElementById("content");

    if(section === "home"){
    title.innerText = "Home";
    content.className = "home-bg";
    content.innerHTML = `
      <div class="overlay">
        <h1 class="home-title">WELCOME TO ALL-FIT </h1>
        <p class="home-subtitle">Your Fitness Journey Starts Here</p>
      </div>
    `;
}
    else if(section === "workout"){
    title.innerText = "Workout Plan";

    content.innerHTML = `
    <style>
        .workout-container {
            font-family: Arial, sans-serif;
            padding: 15px;
            max-height: 250px;
            overflow-y: auto;
        }

        .workout-container h2 {
            text-align: center;
            margin-bottom: 20px;
        }

        .day-card {
            background: #1e1e1e;
            color: white;
            padding: 15px;
            margin: 10px 0;
            border-radius: 10px;
            cursor: pointer;
        }

        .day-title {
            font-size: 18px;
            font-weight: bold;
            color: #00ffcc;
        }

        .exercise-list {
            margin-top: 10px;
            display: none;
            font-size: 14px;
            line-height: 1.6;
        }

        .active .exercise-list {
            display: block;
        }
    </style>

    <div class="workout-container">

        <h2>Weekly Workout Plan</h2>

        <div class="day-card">
            <div class="day-title">Monday - Chest + Tricep</div>
            <div class="exercise-list">
                • Bench Press <br>
                • Incline Dumbbell Press <br>
                • Chest Fly <br>
                • Tricep Dips <br>
                • Pushdown
            </div>
        </div>

        <div class="day-card">
            <div class="day-title">Tuesday - Back + Bicep</div>
            <div class="exercise-list">
                • Pull-ups <br>
                • Barbell Row <br>
                • Lat Pulldown <br>
                • Bicep Curl <br>
                • Hammer Curl
            </div>
        </div>

        <div class="day-card">
            <div class="day-title">Wednesday - Shoulder + Core</div>
            <div class="exercise-list">
                • Shoulder Press <br>
                • Lateral Raise <br>
                • Rear Delt Fly <br>
                • Plank <br>
                • Leg Raises
            </div>
        </div>

        <div class="day-card">
            <div class="day-title">Thursday - Chest + Tricep</div>
            <div class="exercise-list">
                • Incline Bench Press <br>
                • Cable Fly <br>
                • Skull Crushers <br>
                • Overhead Extension
            </div>
        </div>

        <div class="day-card">
            <div class="day-title">Friday - Back + Bicep</div>
            <div class="exercise-list">
                • Deadlift <br>
                • T-Bar Row <br>
                • Face Pull <br>
                • Preacher Curl
            </div>
        </div>

        <div class="day-card">
            <div class="day-title">Saturday - Legs + Core</div>
            <div class="exercise-list">
                • Squats <br>
                • Lunges <br>
                • Leg Press <br>
                • Calf Raises <br>
                • Hanging Leg Raises
            </div>
        </div>

    </div>
    `;

    const cards = document.querySelectorAll(".day-card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("active");
        });
    });
}
   else if(section === "myworkout"){
    title.innerText = "My Workout";

    content.innerHTML = `
    <style>
        .container { padding:15px; 
        font-family: Arial; }
        .day { margin-bottom:15px; padding:10px; background:#1e1e1e; color:white; border-radius:8px; }
        .day h3 { margin-bottom:8px; color:#00ffcc; }
        select { padding:5px; margin-top:5px; }
        .result { margin-top:8px; color:#ffd700; }
    </style>

    <div class="container">

        <div class="day">
            <h3>Monday</h3>
            <select onchange="showWorkout(this, 'mon')">
                <option value="">Select Exercise</option>
                <option>Bench Press</option>
                <option>Chest Fly</option>
                <option>Tricep Dips</option>
            </select>
            <div class="result" id="mon"></div>
        </div>

        <div class="day">
            <h3>Tuesday</h3>
            <select onchange="showWorkout(this, 'tue')">
                <option value="">Select Exercise</option>
                <option>Pull-ups</option>
                <option>Barbell Row</option>
                <option>Bicep Curl</option>
            </select>
            <div class="result" id="tue"></div>
        </div>

        <div class="day">
            <h3>Wednesday</h3>
            <select onchange="showWorkout(this, 'wed')">
                <option value="">Select Exercise</option>
                <option>Shoulder Press</option>
                <option>Lateral Raise</option>
                <option>Plank</option>
            </select>
            <div class="result" id="wed"></div>
        </div>

        <div class="day">
            <h3>Thursday</h3>
            <select onchange="showWorkout(this, 'thu')">
                <option value="">Select Exercise</option>
                <option>Incline Bench</option>
                <option>Cable Fly</option>
                <option>Skull Crushers</option>
            </select>
            <div class="result" id="thu"></div>
        </div>

        <div class="day">
            <h3>Friday</h3>
            <select onchange="showWorkout(this, 'fri')">
                <option value="">Select Exercise</option>
                <option>Deadlift</option>
                <option>T-Bar Row</option>
                <option>Preacher Curl</option>
            </select>
            <div class="result" id="fri"></div>
        </div>

        <div class="day">
            <h3>Saturday</h3>
            <select onchange="showWorkout(this, 'sat')">
                <option value="">Select Exercise</option>
                <option>Squats</option>
                <option>Lunges</option>
                <option>Leg Press</option>
            </select>
            <div class="result" id="sat"></div>
        </div>

    </div>
    `;

    // Simple JS function
    window.showWorkout = function(select, id){
        const value = select.value;
        document.getElementById(id).innerText =
            value ? "You selected: " + value : "";
    }
}
    else if(section === "challenge"){
        title.innerText = "Daily Challenges";
        content.innerHTML = "<p>Complete today's challenge </p>";
    }
    else if(section === "diet"){
        title.innerText = "Diet Plan";
        content.innerHTML = "<p>Your diet plan </p>";
    }
}