import { Table, Column, DataType, Model } from "sequelize-typescript";

@Table({
  tableName: "blogs",
  timestamps: true,
})
class Blog extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public title!: string;

  @Column({
    type: DataType.STRING,
  })
  public content!: string;
}

export default Blog;
