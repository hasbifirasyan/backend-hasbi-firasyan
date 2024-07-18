'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: 'Product A1',
          price: 10000,
          merchantId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Product A2',
          price: 20000,
          merchantId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Product B1',
          price: 30000,
          merchantId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Product B2',
          price: 40000,
          merchantId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  }
};
