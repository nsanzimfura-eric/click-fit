"use strict";

// NOTE:
//  -  Password is not hashed, and there is no authentication;
module.exports = {
  async up(queryInterface, Sequelize) {
    const existingUsers = await queryInterface.sequelize.query(
      `SELECT * FROM users;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (existingUsers.length === 0) {
      await queryInterface.bulkInsert("users", [
        {
          fullName: process.env.ADMIN_NAME,
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          type: "admin",
          active: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } else {
      console.log("Seeding skipped: users already exist.");
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
