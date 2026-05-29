# AI-Powered Schema Visualizer & SQL Query Generator

## Overview

AI-Powered Schema Visualizer & SQL Query Generator is a full-stack web application that transforms natural language requirements into structured database schemas and SQL queries. The application leverages OpenAI models to automatically generate relational database designs, visualize entity relationships through interactive diagrams, and create SQL queries based on user requirements.

The platform helps students, developers, database designers, and analysts rapidly prototype database structures without manually designing schemas or writing complex SQL statements.

---

## Features

### Schema Generation

* Generate relational database schemas from natural language descriptions.
* Automatic table creation with columns, primary keys, and foreign keys.
* Structured JSON schema output.

### Interactive Schema Visualization

* Dynamic Entity-Relationship (ER) style diagram generation.
* Visual representation of table relationships.
* Interactive node movement and zoom controls using React Flow.

### SQL Query Generation

* Generate SQL queries from plain English prompts.
* Context-aware query creation using generated schemas.
* Supports schema-assisted query generation for improved accuracy.

### Productivity Features

* Copy generated schema JSON to clipboard.
* Copy generated SQL queries instantly.
* Responsive and user-friendly interface.
* Real-time API-driven workflow.

---

## System Architecture

User Prompt
    │
    ▼
OpenAI API
    │
    ▼
Schema Generation Engine
    │
    ▼
JSON Schema Output
    │
    ▼
React Flow Visualization
    │
    ▼
SQL Query Generation
    │
    ▼
Generated SQL Query

---

## Technology Stack

### Frontend

* React.js
* JavaScript (ES6+)
* React Flow
* CSS3

### Backend

* Node.js
* Express.js

### AI Integration

* OpenAI API

### Development Tools

* Vite
* Git
* GitHub

---

## Project Structure

```text
client/
├── src/
│   ├── App.jsx
│   ├── PromptPanel.jsx
│   ├── QueryPanel.jsx
│   ├── FlowDiagram.jsx
│   ├── styles.css
│   └── main.jsx

server/
├── index.js
├── .env

README.md
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd schema-visualizer-sql-generator
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the server directory:

```env
OPENAI_API_KEY=your_openai_api_key
```

Start the backend server:

```bash
npm start
```

---

## Usage

### Generate Database Schema

1. Open the application.
2. Enter a business requirement or system description.
3. Click **Generate Schema**.
4. View the generated schema and relationship diagram.

### Generate SQL Queries

1. Navigate to **Query Generator**.
2. Enter a query requirement in natural language.
3. Generate SQL using the schema context.
4. Copy and use the generated SQL query.

---

## Example Input

```text
Design a database for an online bookstore with customers, books, orders, and payments.
```

## Example Output

* Customer Table
* Books Table
* Orders Table
* Payments Table
* Relationship Diagram
* SQL Queries Generated Automatically

---

## Key Achievements

* Developed an AI-assisted database design workflow.
* Automated schema generation from natural language requirements.
* Built interactive ER-style visualization using React Flow.
* Integrated OpenAI models for schema and SQL generation.
* Designed a responsive full-stack architecture using React and Node.js.

---

## Future Enhancements

* Multi-database support (MySQL, PostgreSQL, SQL Server).
* Schema export to SQL scripts.
* Authentication and user management.
* Query execution and result visualization.
* Database migration generation.
* Cloud deployment support.

---

## Author

Bhanu Prakash Sharma

GitHub: https://github.com/gbpsharma

LinkedIn: https://linkedin.com/in/gbpsharma
