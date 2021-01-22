import { Model, DataTypes } from 'sequelize';

class Test extends Model {
  static init(sequelize) {
    super.init(
      {
        score: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Test;
