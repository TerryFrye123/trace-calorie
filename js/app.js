class CalorieTracker {
	constructor() {
		this._calorieLimit = 2000;
		this._totalCalories = 0;
		this._meals = [];
		this._workouts = [];

		this._displayCaloriesLimit();
		this._displayCaloriesTotal();
		this._displayCaloriesConsumed();
		this._displayCaloriesBurned();
		this._displayCaloriesRemaining();
		this._displayCalorieProgress();
	}

	// public API
	addMeal(meal) {
		this._meals.push(meal);
		this._totalCalories += meal.calories;
		this._render();
	}

	addWorkout(workout) {
		console.log(workout);
		this._workouts.push(workout);
		this._totalCalories -= workout.calories;
		this._render();
	}

	// private methods

	_displayCaloriesTotal() {
		const totalCaloriesEl = document.getElementById('calories-total');
		totalCaloriesEl.innerHTML = this._totalCalories;
	}

	_displayCaloriesLimit() {
		const totalLimitEl = document.getElementById('calories-limit');
		totalLimitEl.innerHTML = this._calorieLimit;
	}

	_displayCaloriesConsumed() {
		const caloriesConsumedEl = document.getElementById('calories-consumed');

		const consumed = this._meals.reduce(
			(total, meal) => total + meal.calories,
			0
		);

		caloriesConsumedEl.innerHTML = consumed;
	}

	_displayCaloriesBurned() {
		const caloriesBurnedEl = document.getElementById('calories-burned');

		const burned = this._workouts.reduce(
			(total, workout) => total + workout.calories,
			0
		);
		caloriesBurnedEl.innerHTML = burned;
	}

	_displayCaloriesRemaining() {
		const caloriesRemainingEl = document.getElementById('calories-remaining');
		const progressBarEl = document.getElementById('calorie-progress');

		const remaining = this._calorieLimit - this._totalCalories;

		caloriesRemainingEl.innerHTML = remaining;

		if (remaining <= 0) {
			caloriesRemainingEl.parentElement.parentElement.classList.remove(
				'bg-light'
			);
			caloriesRemainingEl.parentElement.parentElement.classList.add(
				'bg-danger'
			);
			progressBarEl.classList.remove('bg-success');
			progressBarEl.classList.add('bg-danger');
		} else {
			caloriesRemainingEl.parentElement.parentElement.classList.add(
				'bg-light'
			);
			caloriesRemainingEl.parentElement.parentElement.classList.remove(
				'bg-danger'
			);
			progressBarEl.classList.add('bg-success');
			progressBarEl.classList.remove('bg-danger');
		}
	}

	_displayCalorieProgress() {
		const progressBarEl = document.getElementById('calorie-progress');

		const progressPercent = (this._totalCalories / this._calorieLimit) * 100;
		const width = Math.min(progressPercent, 100);
		progressBarEl.style = `width: ${width}%`;
	}
	_render() {
		this._displayCaloriesTotal();
		this._displayCaloriesConsumed();
		this._displayCaloriesBurned();
		this._displayCaloriesRemaining();
		this._displayCalorieProgress();
	}
}

class Meal {
	constructor(name, calories) {
		this._displayCaloriesLimit;
		this.id = Math.random().toString(16).slice(2);
		this.name = name;
		this.calories = calories;
	}
}

class Workout {
	constructor(name, calories) {
		this.id = Math.random().toString(16).slice(2);
		this.name = name;
		this.calories = calories;
	}
}

class App {
	constructor() {
		this._tracker = new CalorieTracker();

		document
			.getElementById('meal-form')
			.addEventListener('submit', this._newMeal.bind(this));
		document
			.getElementById('workout-form')
			.addEventListener('submit', this._newWorkout.bind(this));
	}

	_newMeal(e) {
		e.preventDefault();

		const name = document.getElementById('meal-name');
		const calories = document.getElementById('meal-calories');

		if (name.value === '' || calories.value === '') {
			alert('Please fill in all fields');
			return;
		}

		const meal = new Meal(name.value, +calories.value);
		this._tracker.addMeal(meal);

		name.value = '';
		calories.value = '';

		const collapseMeal = document.getElementById('collapse-meal');
		const bsCollapse = new bootstrap.Collapse(collapseMeal, {
			toggle: true,
		});
	}

	_newWorkout(e) {
		e.preventDefault();
		const name = document.getElementById('workout-name');
		const calories = document.getElementById('workout-calories');

		if (name.value === '' || calories.value === '') {
			alert('Please fill in all fields');
			return;
		}

		const workout = new Workout(name.value, +calories.value);
		this._tracker.addWorkout(workout);

		name.value = '';
		calories.value = '';

		const collapseWorkout = document.getElementById('collapse-workout');
		const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
			toggle: true,
		});
	}
}

const app = new App();

// const tracker = new CalorieTracker();

// const breakfast = new Meal('Breakfast', 400);
// const lunch = new Meal('Lunch', 1400);
// const dinner = new Meal('Dinner', 100);
// tracker.addMeal(breakfast);
// tracker.addMeal(lunch);
// tracker.addMeal(dinner);

// const run = new Workout('Morning Run', 275);
// tracker.addWorkout(run);

// console.log(tracker._meals);
// console.log(tracker._workouts);
// console.log(tracker._totalCalories);
