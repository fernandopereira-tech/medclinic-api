import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1789071022703 implements MigrationInterface {
    name = 'CreateUsersTable1789071022703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_perfil_enum" AS ENUM('admin', 'attendant')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(150) NOT NULL, "email" character varying(100) NOT NULL, "senha" character varying(255) NOT NULL, "perfil" "public"."users_perfil_enum" NOT NULL DEFAULT 'attendant', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_perfil_enum"`);
    }

}
