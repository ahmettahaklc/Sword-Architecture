# Sword Architecture 🏛️

Sword Architecture is a monolithic full-stack web application designed for architectural firms or individual architects to showcase their portfolios and manage project details dynamically.

The project follows the **MVC (Model-View-Controller)** pattern and is built using the **Node.js** ecosystem.

## 🏗️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ODM)
* **View Engine:** Handlebars (HBS)
* **Authentication:** Express-Session & Cookie-Parser
* **File Handling:** Express-Fileupload (for project images)
* **Styling:** Custom CSS

## 🌟 Key Features

* **User Authentication:** Secure registration and login system.
* **Project Management:** Full CRUD (Create, Read, Update, Delete) functionality for architectural projects.
* **Dynamic Routing:** Specialized routes for single project views and category-based indexing.
* **Image Uploads:** Ability to upload and display project-specific images.
* **Responsive UI:** A clean interface designed with Handlebars partials for a consistent layout.

## 📂 Project Structure

```text
📁 sword-architecture
 ├── 📄 app.js             # Entry point & Middleware configurations
 ├── 📄 dbs.js             # Database connection setup
 ├── 📁 model              # Mongoose Schemas (User, Content)
 ├── 📁 router             # Express Routes (Auth, Pages, CRUD)
 ├── 📁 views              # Handlebars Templates
 │    ├── 📁 layouts       # Main application wrapper
 │    ├── 📁 partials      # Reusable components (Header, Footer)
 │    └── 📁 site          # Page-specific views
 └── 📁 public             # Static files (CSS, JS, Images)
