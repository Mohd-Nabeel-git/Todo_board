# 🗂️ Kanban Board

A basic yet functional Kanban Board app to manage daily tasks under different columns – Todo, In Progress, and Done.

## 🛠 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Hook Form, React Router
- **Backend:** Node.js, Express.js, MongoDB

## 🔗 Live Link

The app is live here:  
👉 [Live App](https://todo-board-eta.vercel.app/)

## ⚙️ How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Mohd-Nabeel-git/Todo_board.git
```

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Setup Backend

```bash
cd backend
npm install
node index.js
```

> MongoDB connection string is added directly in the backend `index.js` file (no .env used).

## ✨ Features

- Login and Register functionality
- Create / Edit / Delete tasks
- View tasks under columns: Todo, In Progress, Done
- Simple task assignment logic
- Conflict prevention while updating tasks

## 🧠 Smart Assign (Simple Explanation)

When a task is created without selecting a user, the system automatically checks who has the least number of tasks and assigns the task to them.

## ⚔️ Conflict Handling (Simple Explanation)

If two people try to update the same task at the same time, the app compares the updatedAt timestamps. If there’s a conflict, the update is stopped and a warning is shown to the user.

---

Made with 💻 by **Mohd Nabeel**  
🔗 GitHub: [@Mohd-Nabeel-git](https://github.com/Mohd-Nabeel-git)  
📧 mohdnabeel5036@gmail.com
