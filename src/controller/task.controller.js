import pool from "../db.js";

class TaskController {
  async createTask(req, res) {
    const { title, description, priority, status, deadline, today } = req.body;
    const deadlineDate = deadline && new Date(deadline).toISOString().slice(0, 10);
    await pool.query(
      `INSERT INTO tasks (title, description, priority, status, deadline, today) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        title,
        description || null,
        priority || null,
        status,
        deadlineDate || null,
        today,
      ]
    );
    res.status(200).json({ message: `Задача ${title} успешно создана!` });
  }
  async updateTask(req, res) {
    const { id, title, description, priority, status, deadline, today } =
      req.body;
    await pool.query(
      `UPDATE tasks set title = $2, description = $3, priority = $4, status = $5, deadline = $6, today = $7 WHERE id = $1 RETURNING *`,
      [id, title, description, priority, status, deadline, today]
    );
    res
      .status(200)
      .json({ message: `Задача ${title} успешно отредактирована!` });
  }
  async deleteTask(req, res) {
    const id = req.params.id;
    await pool.query(`DELETE FROM tasks WHERE id = $1`, [id]);
    res.status(200).json({ message: `Задача с id ${id} успешно удалена!` });
  }
  async getTasks(req, res) {
    let { priority, deadline } = req.query;
    let dbValues = [];
    let conditions = [];
  
    if (priority) {
      conditions.push("priority = $1");
      dbValues.push(priority);
    }
  
    if (deadline) {
      let deadlineDate = new Date(deadline).toISOString().slice(0, 10);
      conditions.push(`deadline <= $${dbValues.length + 1}`); 
      dbValues.push(deadlineDate);
    }
  
    let whereClause =
      conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";
  
    const query = {
      text: `SELECT * FROM tasks ${whereClause}`,
      values: dbValues,
    };
    console.log(query.text, query.values);
    const tasks = await pool.query(query.text, query.values);
    tasks.rows.forEach((task) => {
      if (task.deadline) {
        task.deadline = new Date(task.deadline).toISOString();
      }
    });
    res.status(200).json(tasks.rows);
  }
  
}

export default new TaskController();
