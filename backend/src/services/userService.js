const db = require("../config/db");

/**
 * Create a new user
 */
const createUser = async (userData) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone,
    dob,
    gender,
    address,
    role_id,
  } = userData;
  const query = `
    INSERT INTO user (first_name, last_name, email, password, phone, dob, gender, address, role_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await db
      .promise()
      .query(query, [
        first_name,
        last_name,
        email,
        password,
        phone,
        dob,
        gender,
        address,
        role_id,
      ]);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Get all users
 */
const getAllUsers = async () => {
  const query = "SELECT * FROM user";

  try {
    const [results] = await db.promise().query(query);
    return results;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Get a user by ID
 */
const getUserById = async (userId) => {
  const query = "SELECT * FROM user WHERE id = ?";

  try {
    const [results] = await db.promise().query(query, [userId]);
    if (results.length === 0) {
      throw new Error("User not found");
    }
    return results[0];
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Update a user by ID
 */
const updateUser = async (userId, userData) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone,
    dob,
    gender,
    address,
    role_id,
  } = userData;
  const query = `
    UPDATE user
    SET first_name = ?, last_name = ?, email = ?, password = ?, phone = ?, dob = ?, gender = ?, address = ?, role_id = ?
    WHERE id = ?
  `;

  try {
    const [result] = await db
      .promise()
      .query(query, [
        first_name,
        last_name,
        email,
        password,
        phone,
        dob,
        gender,
        address,
        role_id,
        userId,
      ]);
    if (result.affectedRows === 0) {
      throw new Error("User not found");
    }
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Delete a user by ID
 */
const deleteUser = async (userId) => {
  const query = "DELETE FROM user WHERE id = ?";

  try {
    const [result] = await db.promise().query(query, [userId]);
    if (result.affectedRows === 0) {
      throw new Error("User not found");
    }
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
