module.exports = (sequelize, DataTypes) => {
    const Simulation = sequelize.define("Simulations", {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      paymentTerm: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    return Simulation;
  };
  