const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(new Date().toISOString(), req.method, req.originalUrl);
    next();
});

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/allfit";
mongoose.connect(mongoUri)
    .then(() => console.log("DB Connected"))
    .catch(err => console.log("DB Connection Error:", err));

const User = require("./models/user");
const Plan = require("./models/plan");
const Task = require("./models/task");
const Progress = require("./models/progress");

const bcrypt = require("bcrypt");

app.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, message: 'Missing email or password' });

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ success: false, message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            ...req.body,
            password: hashedPassword
        });

        await user.save();

        const safeUser = (({ name, email, age, height, weight, goal, time, level }) => ({ name, email, age, height, weight, goal, time, level }))(user);
        res.status(201).json({ success: true, user: safeUser });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message || err });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Wrong password' });
        }

        res.json({ success: true, email: user.email, name: user.name });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message || err });
    }
});

app.get('/user', async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).send('Missing email');

        const user = await User.findOne({ email }).select('-password -__v');
        if (!user) return res.status(404).send('User not found');

        res.json(user);
    } catch (err) {
        res.status(500).send(err.message || err);
    }
});

app.put('/user', async (req, res) => {
    try {
        const { email, name, goal, time, level, age, height, weight } = req.body;
        if (!email) return res.status(400).send('Missing email');

        const update = {};
        if (name !== undefined) update.name = name;
        if (goal !== undefined) update.goal = goal;
        if (time !== undefined) update.time = time;
        if (level !== undefined) update.level = level;
        if (age !== undefined) update.age = age;
        if (height !== undefined) update.height = height;
        if (weight !== undefined) update.weight = weight;

        const user = await User.findOneAndUpdate({ email }, { $set: update }, { new: true }).select('-password -__v');
        if (!user) return res.status(404).send('User not found');

        res.json(user);
    } catch (err) {
        res.status(500).send(err.message || err);
    }
});

app.get('/plans', async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).send('Missing email');
        const plans = await Plan.find({ ownerEmail: email }).sort({ createdAt: -1 }).limit(10);
        res.json(plans);
    } catch (err) {
        res.status(500).send(err.message || err);
    }
});

app.get('/plans/:id', async (req, res) => {
    try {
        const p = await Plan.findById(req.params.id);
        if (!p) return res.status(404).send('Not found');
        res.json(p);
    } catch (err) { res.status(500).send(err.message || err); }
});

app.post('/plans', async (req, res) => {
    try {
        const payload = req.body;
        if (!payload.ownerEmail) return res.status(400).send('Missing ownerEmail');
        const plan = new Plan(payload);
        await plan.save();
        res.json(plan);
    } catch (err) {
        res.status(500).send(err.message || err);
    }
});

app.post('/plans/regenerate', async (req, res) => {
    try {
        const { email, days = 4, goal = 'General fitness', time = 45, level = 'Beginner' } = req.body;
        if (!email) return res.status(400).send('Missing email');

        const baseWorkouts = {
            'General fitness': ['Full Body Circuit', 'Cardio Blast', 'Mobility Flow', 'Core & Stability'],
            'Bulk': ['Push Hypertrophy', 'Pull Hypertrophy', 'Leg Strength', 'Accessory & Core'],
            'Cutting / Fat loss': ['HIIT Sprints', 'Full Body Metcon', 'Cardio Endurance', 'Circuit Strength'],
            'Strength': ['Heavy Push', 'Heavy Pull', 'Squat Focus', 'Olympic Lift Technique'],
            'Mobility': ['Yoga Flow', 'Myofascial Release', 'Joint Mobility', 'Active Recovery']
        };

        const choices = baseWorkouts[goal] || baseWorkouts['General fitness'];
        const generated = { ownerEmail: email, title: `${goal} Plan`, days: [] };

        for (let i = 0; i < days; i++) {
            const w = choices[i % choices.length] || 'Workout';
            const workouts = [];

            const activityCount = Math.max(2, Math.min(6, Math.floor(time / 15)));
            for (let j = 0; j < activityCount; j++) {
                workouts.push({
                    name: `${w} - Part ${j + 1}`,
                    sets: level === 'Advanced' ? 4 : 3,
                    reps: level === 'Beginner' ? '8-12' : (level === 'Intermediate' ? '6-10' : '4-8'),
                    durationMin: Math.max(5, Math.floor(time / activityCount)),
                    notes: ''
                });
            }

            generated.days.push({ dayIndex: i + 1, workouts });
        }

        const plan = new Plan(generated);
        await plan.save();
        res.json(plan);
    } catch (err) {
        res.status(500).send(err.message || err);
    }
});

app.delete('/plans/:id', async (req, res) => {
    try {
        await Plan.findByIdAndDelete(req.params.id);
        res.send('Deleted');
    } catch (err) { res.status(500).send(err.message || err); }
});

app.get('/tasks', async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).send('Missing email');
        const tasks = await Task.find({ ownerEmail: email }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).send(err.message || err);
    }
});

app.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).send(err.message || err);
    }
});

app.put('/tasks/:id', async (req, res) => {
    try {
        const t = await Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!t) return res.status(404).send('Not found');
        res.json(t);
    } catch (err) { res.status(500).send(err.message || err); }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.send('Deleted');
    } catch (err) { res.status(500).send(err.message || err); }
});

app.get('/progress', async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).send('Missing email');
        const items = await Progress.find({ ownerEmail: email }).sort({ date: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).send(err.message || err);
    }
});

app.post('/progress', async (req, res) => {
    try {
        const p = new Progress(req.body);
        await p.save();
        res.json(p);
    } catch (err) {
        res.status(500).send(err.message || err);
    }
});

app.put('/progress/:id', async (req, res) => {
    try {
        const p = await Progress.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!p) return res.status(404).send('Not found');
        res.json(p);
    } catch (err) { res.status(500).send(err.message || err); }
});

app.delete('/progress/:id', async (req, res) => {
    try {
        await Progress.findByIdAndDelete(req.params.id);
        res.send('Deleted');
    } catch (err) { res.status(500).send(err.message || err); }
});

app.post('/diet/regenerate', async (req, res) => {
    try {
        const { email, goal = 'General fitness' } = req.body;
        if (!email) return res.status(400).send('Missing email');
        const templates = {
            'General fitness': ['Oatmeal + Fruit', 'Chicken Salad', 'Grilled Fish + Veggies'],
            'Bulk': ['Eggs + Toast', 'Steak + Rice', 'Protein Shake + Nuts'],
            'Cutting / Fat loss': ['Greek Yogurt + Berries', 'Tuna Salad', 'Veg Stir Fry'],
            'Strength': ['Porridge + Peanut', 'Chicken + Sweet Potato', 'Beef + Quinoa']
        };
        const meals = templates[goal] || templates['General fitness'];
        res.json({ ownerEmail: email, goal, meals });
    } catch (err) { res.status(500).send(err.message || err); }
});

app.get('/challenges', (req, res) => {
    res.json([
        { id: 'c1', title: '10k Steps', desc: 'Walk 10,000 steps today' },
        { id: 'c2', title: '30-min Cardio', desc: 'Do 30 minutes of cardio' },
        { id: 'c3', title: 'Plank 3x', desc: 'Hold plank 3 times for 60s' }
    ]);
});

app.get('/_routes', (req, res) => {
    try {
        const routes = [];
        app._router.stack.forEach(mw => {
            if (mw.route && mw.route.path) {
                routes.push({ path: mw.route.path, methods: mw.route.methods });
            }
        });
        res.json(routes);
    } catch (e) {
        res.status(500).send(e.message || e);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
