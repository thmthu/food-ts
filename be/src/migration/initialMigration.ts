import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1627618836793 implements MigrationInterface {
    name = 'InitialMigration1627618836793';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Featured\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`name\` varchar(255) NOT NULL,
            \`description\` text NOT NULL,
            PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1`);

        await queryRunner.query(`CREATE TABLE \`Users\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`username\` varchar(255) NOT NULL,
            \`email\` varchar(255) NOT NULL,
            \`address\` varchar(255) DEFAULT NULL,
            \`password\` varchar(255) NOT NULL,
            PRIMARY KEY (\`id\`),
            UNIQUE KEY \`IDX_USERNAME\` (\`username\`),
            UNIQUE KEY \`IDX_EMAIL\` (\`email\`)
        ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1`);


        await queryRunner.query(`CREATE TABLE \`Bills\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`email\` varchar(255) NOT NULL,
            \`total\` float DEFAULT NULL,
            \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (\`id\`),
            KEY \`IDX_EMAIL\` (\`email\`),
            CONSTRAINT \`FK_aa34caada04a4188bc1ae3d57cd\` FOREIGN KEY (\`email\`) REFERENCES \`Users\` (\`email\`) ON DELETE CASCADE ON UPDATE NO ACTION
        ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1`);

        await queryRunner.query(`CREATE TABLE \`Restaurants\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`name\` varchar(255) NOT NULL,
            \`image\` varchar(255) NOT NULL,
            \`description\` text NOT NULL,
            \`address\` varchar(255) DEFAULT NULL,
            \`stars\` float DEFAULT NULL,
            \`reviews\` varchar(255) DEFAULT NULL,
            \`category\` varchar(255) DEFAULT NULL,
            \`featured_id\` int DEFAULT NULL,
            PRIMARY KEY (\`id\`),
            KEY \`FK_2cfa525bb2b96c8c7c3d27ef241\` (\`featured_id\`),
            CONSTRAINT \`FK_2cfa525bb2b96c8c7c3d27ef241\` FOREIGN KEY (\`featured_id\`) REFERENCES \`Featured\` (\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION
        ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1`);

        await queryRunner.query(`CREATE TABLE \`Dishes\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`name\` varchar(255) NOT NULL,
            \`description\` text NOT NULL,
            \`price\` float DEFAULT NULL,
            \`image\` varchar(255) NOT NULL,
            \`restaurant_id\` int DEFAULT NULL,
            PRIMARY KEY (\`id\`),
            KEY \`IDX_RESTAURANT_ID\` (\`restaurant_id\`),
            CONSTRAINT \`FK_819a56a5d343d2dc67c80d5bd50\` FOREIGN KEY (\`restaurant_id\`) REFERENCES \`Restaurants\` (\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION
        ) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1`);

        await queryRunner.query(`CREATE TABLE \`BillDetails\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`bill_id\` int NOT NULL,
            \`dish_id\` int NOT NULL,
            \`quantity\` int NOT NULL,
            PRIMARY KEY (\`id\`),
            KEY \`IDX_BILL_ID\` (\`bill_id\`),
            KEY \`IDX_DISH_ID\` (\`dish_id\`),
            CONSTRAINT \`FK_6cfe48897f30f604e1546da8b78\` FOREIGN KEY (\`dish_id\`) REFERENCES \`Dishes\` (\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION,
            CONSTRAINT \`FK_9c910b9c0893eaca7803c744a5b\` FOREIGN KEY (\`bill_id\`) REFERENCES \`Bills\` (\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`BillDetails\``);
        await queryRunner.query(`DROP TABLE \`Dishes\``);
        await queryRunner.query(`DROP TABLE \`Restaurants\``);
        await queryRunner.query(`DROP TABLE \`Bills\``);
        await queryRunner.query(`DROP TABLE \`custom_migration_table\``);
        await queryRunner.query(`DROP TABLE \`Users\``);
        await queryRunner.query(`DROP TABLE \`Featured\``);
    }
}
