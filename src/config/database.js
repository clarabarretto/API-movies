module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '100115',
  database: 'movies',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  dialectOptions: {
    timezone: 'America/Sao_Paulo',
  },
  timezone: 'America/Sao_Paulo',

};
