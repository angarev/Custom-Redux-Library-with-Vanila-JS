//Helper function to generate uniq id
function generateId() {
  return (
    Math.random()
      .toString(36)
      .substring(2) + new Date().getTime().toString(36)
  );
}

// Library code (custom)
// function createStore(reducer) {
//   // The store should have four parts
//   // 1. The state tree
//   // 2. a way to get the state tree
//   // 3. a way to listen and respond to the state changing
//   // 4. a way to update the state

//   let state;
//   let listeners = [];

//   const getState = () => state;

//   const subscribe = listener => {
//     listeners.push(listener);
//     return () => {
//       listeners = listeners.filter(l => l !== listener);
//     };
//   };

//   const dispatch = action => {
//     state = reducer(state, action);
//     listeners.forEach(listener => listener());
//   };

//   return {
//     getState,
//     subscribe,
//     dispatch
//   };
// }

const actions = {
  ADD_TODO: "ADD_TODO",
  REMOVE_TODO: "REMOVE_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  ADD_GOAL: "ADD_GOAL",
  REMOVE_GOAL: "REMOVE_GOAL"
};

//Create deff actions
function addTodoAction(todo) {
  return {
    type: actions.ADD_TODO,
    todo
  };
}

function removeTodoAction(id) {
  return {
    type: actions.REMOVE_TODO,
    id
  };
}

function toggleTodoAction(id) {
  return {
    type: actions.TOGGLE_TODO,
    id
  };
}

function addGoalAction(goal) {
  return {
    type: actions.ADD_GOAL,
    goal
  };
}

function removeGoalAction(id) {
  return {
    type: actions.REMOVE_GOAL,
    id
  };
}

function todos(state = [], action) {
  switch (action.type) {
    case actions.ADD_TODO:
      return state.concat([action.todo]);
    case actions.REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case actions.TOGGLE_TODO:
      return state.map(todo =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch (action.type) {
    case actions.ADD_GOAL:
      return state.concat([action.goal]);
    case actions.REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.id);
    default:
      return state;
  }
}

//Custom root reducer
// function app(state = {}, action) {
//   return {
//     todos: todos(state.todos, action),
//     goals: goals(state.goals, action)
//   };
// }

//Create store with custome store function
// const store = createStore(app);

//Use Redix as middleware. Add check if do you want to buy a bitcoin in todo and goal list
// function checkAndDispatch(store, action) {
//   if (
//     action.type === actions.ADD_TODO &&
//     action.todo.name.toLowerCase().includes("bitcoin")
//   ) {
//     return alert("Nope. That's a bad idea.");
//   }
  
//   if (
//     action.type === actions.ADD_GOAL &&
//     action.goal.name.toLowerCase().includes("bitcoin")
//   ) {
//     return alert("Nope. That's a bad idea.");
//   }

//   return store.dispatch(action);
// }

const store = Redux.createStore(
  Redux.combineReducers({
    todos,
    goals
  })
);

// store.subscribe(() => {
//   const { goals, todos } = store.getState();

//   document.getElementById("goals").innerHTML = "";
//   document.getElementById("todos").innerHTML = "";
//   goals.forEach(addGoalToDom);
//   todos.forEach(addTodoToDom);
// });

// //DOM code
// function addTodo() {
//   const input = document.getElementById("todo");
//   const name = input.value;
//   input.value = "";
//   checkAndDispatch(store, 
//     addTodoAction({
//       name,
//       complete: false,
//       id: generateId()
//     })
//   );
// }

// function addGoal() {
//   const input = document.getElementById("goal");
//   const name = input.value;
//   input.value = "";
//   checkAndDispatch(store, 
//     addGoalAction({
//       id: generateId(),
//       name
//     })
//   );
// }

// document.getElementById("todoBtn").addEventListener("click", addTodo);
// document.getElementById("goalBtn").addEventListener("click", addGoal);

// function createRemoveButton(onClick) {
//   const removeBtn = document.createElement("button");
//   removeBtn.innerHTML = "X";
//   removeBtn.addEventListener("click", onClick);
//   return removeBtn;
// }

// function addTodoToDom(todo) {
//   const node = document.createElement("li");
//   const text = document.createTextNode(todo.name);

//   const removeButton = createRemoveButton(() => {
//     checkAndDispatch(store, removeTodoAction(todo.id));
//   });

//   node.appendChild(text);
//   node.appendChild(removeButton);
//   node.style.textDecoration = todo.complete ? "line-through" : "none";
//   node.addEventListener("click", () => {
//     checkAndDispatch(store, toggleTodoAction(todo.id));
//   });

//   document.getElementById("todos").appendChild(node);
// }

// function addGoalToDom(goal) {
//   const node = document.createElement("li");
//   const text = document.createTextNode(goal.name);

//   const removeButton = createRemoveButton(() => {
//     checkAndDispatch(store, removeGoalAction(goal.id));
//   });
//   node.appendChild(text);
//   node.appendChild(removeButton);
//   document.getElementById("goals").appendChild(node);
// }
