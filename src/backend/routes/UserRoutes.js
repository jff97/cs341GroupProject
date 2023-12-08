const express = require('express');
const { createUser, deleteUser, getAllNormalUsers } = require('../controllers/UserController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - FirstName
 *         - LastName
 *         - UserName
 *       properties:
 *         UserID:
 *           type: string
 *           description: The auto-generated id of the user
 *           readOnly: true
 *         UserName:
 *           type: string
 *           description: The user's username
 *         FirstName:
 *           type: string
 *           description: The user's first name
 *         LastName:
 *           type: string
 *           description: The user's last name        
 *         Password:
 *           type: string
 *           description: The user's password
 *         Birthdate:
 *           type: string
 *           description: The user's birthdate
 *         RoleID:
 *           type: integer
 *           description: The ID of the user's role
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The user management endpoint
 * /api/user/create:
 *   post:
 *     summary: Creates a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: A success message.
 *       500:
 *         description: Some server error
 * /api/user/delete:
 *   delete:
 *     summary: Deletes a user
 *     tags: [User]
 *     parameters:
 *       - name: UserID
 *         description: The user's ID
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Deleted
 *       500:
 *         description: Some server error
 */

router.post('/create', createUser);
router.delete('/delete', deleteUser);
router.get('/getnormalusers', getAllNormalUsers)

module.exports = router;