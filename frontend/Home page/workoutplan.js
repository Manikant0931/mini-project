function loadSection(section){
    let title = document.getElementById("section-title");
    let content = document.getElementById("content");
}
 if(section === "workout"){
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
    `};