// Initialize Firebase with your config
firebase.initializeApp({
    apiKey: "AIzaSyBeYRx91NfqD6yOoFIsGk2_5Ou60Dtvcak",
  authDomain: "plp-syzygy.firebaseapp.com",
  projectId: "plp-syzygy",
  storageBucket: "plp-syzygy.appspot.com",
  messagingSenderId: "526685383607",
  appId: "1:526685383607:web:faaa7320b036a657975632",
  measurementId: "G-7V4YHHGP7P"
  });
  
  const db = firebase.firestore();
  
  // Function to add a task
  function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !== "") {
      db.collection("tasks").add({
        task: task,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      taskInput.value = "";
      console.log("Task added.");
    }
  }
  
// Function to render tasks
function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
      <span>${doc.data().task}</span>
      <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
  }

  // Real-time listener for tasks
db.collection("tasks")
.orderBy("timestamp", "desc")
.onSnapshot(snapshot => {
  const changes = snapshot.docChanges();
  changes.forEach(change => {
    if (change.type === "added") {
      renderTasks(change.doc);
    }
  });
});

// Function to delete a task
function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
    location.reload();
    }