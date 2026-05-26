'use strict';

const env = require('../config/env');

/**
 * Exports a single User model based on DB_TYPE.
 * - mysql/postgres -> Sequelize model
 * - mongodb        -> Mongoose model
 */

let UserModel;

if (env.DB_TYPE === 'mysql' || env.DB_TYPE === 'postgres') {
  const { DataTypes } = require('sequelize');
  const { getSequelize } = require('../config/database');
  const sequelize = getSequelize();

  UserModel = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(180),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      passwordHash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'password_hash',
      },
      role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user',
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_active',
      },
    },
    {
      tableName: 'users',
      indexes: [{ unique: true, fields: ['email'] }],
    }
  );
} else if (env.DB_TYPE === 'mongodb') {
  const mongoose = require('mongoose');

  const schema = new mongoose.Schema(
    {
      name: { type: String, required: true, trim: true, maxlength: 120 },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      passwordHash: { type: String, required: true },
      role: { type: String, enum: ['user', 'admin'], default: 'user' },
      isActive: { type: Boolean, default: true },
    },
    {
      timestamps: true,
      toJSON: {
        virtuals: true,
        transform: (_doc, ret) => {
          ret.id = ret._id;
          delete ret._id;
          delete ret.__v;
          delete ret.passwordHash;
          return ret;
        },
      },
    }
  );

  UserModel = mongoose.models.User || mongoose.model('User', schema);
} else {
  throw new Error(`Unsupported DB_TYPE: ${env.DB_TYPE}`);
}

module.exports = UserModel;
