import { Sequelize } from 'sequelize-typescript';
import pg from 'pg';
import { PetClient } from 'src/modules/pet-client/pet-client.model';
import { Appointment } from 'src/modules/appointment/appointment.model';
import { User } from 'src/modules/user/user.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',

    useFactory: async () => {

      const sequelize = new Sequelize({

        dialect: 'postgres',

        host: process.env.HOST,

        port: 5432,

        username: process.env.USER,

        password: process.env.PASSWORD,

        database: 'postgres',

        dialectModule: pg, //Necessário para o deploy na vercel

        dialectOptions: { //Necessário para usar o servidor Postgre no Azure

          ssl: {

            require: true,

          }

        }

      });

      sequelize.addModels([ PetClient, Appointment, User]) //Todos os modelos devem ser adicionados aqui

      await sequelize.sync();

      try {

        await sequelize.authenticate();

        console.log('Conexão com o banco de dados estabelecida com sucesso 🚀');

      } catch (erro) {

        console.error('Conexão com o banco de dados falhou', erro);

      }

    },

  },

];