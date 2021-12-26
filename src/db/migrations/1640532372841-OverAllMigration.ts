import {MigrationInterface, QueryRunner} from "typeorm";

export class OverAllMigration1640532372841 implements MigrationInterface {
    name = 'OverAllMigration1640532372841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "meeting" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "zoomUrl" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "employeeIdFk" varchar)`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "managerIdFk" varchar)`);
        await queryRunner.query(`CREATE TABLE "contact_info" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "phone" varchar, "email" varchar NOT NULL, "employeeIdFk" varchar, CONSTRAINT "REL_ec4a214d7578a8ef47af9563e0" UNIQUE ("employeeIdFk"))`);
        await queryRunner.query(`CREATE TABLE "employee_meetings" ("employeeIdFk" varchar NOT NULL, "meetingIdFk" integer NOT NULL, PRIMARY KEY ("employeeIdFk", "meetingIdFk"))`);
        await queryRunner.query(`CREATE INDEX "IDX_582cce10fa6af6a6a211ef838e" ON "employee_meetings" ("employeeIdFk") `);
        await queryRunner.query(`CREATE INDEX "IDX_cdf12573b66f1264f729111010" ON "employee_meetings" ("meetingIdFk") `);
        await queryRunner.query(`CREATE TABLE "temporary_task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "employeeIdFk" varchar, CONSTRAINT "FK_59b9e78fdb7102e8bc54cfa4990" FOREIGN KEY ("employeeIdFk") REFERENCES "employee" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_task"("id", "name", "employeeIdFk") SELECT "id", "name", "employeeIdFk" FROM "task"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`ALTER TABLE "temporary_task" RENAME TO "task"`);
        await queryRunner.query(`CREATE TABLE "temporary_employee" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "managerIdFk" varchar, CONSTRAINT "FK_b60635f692ffdd6faabb43c7d18" FOREIGN KEY ("managerIdFk") REFERENCES "employee" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_employee"("id", "name", "managerIdFk") SELECT "id", "name", "managerIdFk" FROM "employee"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`ALTER TABLE "temporary_employee" RENAME TO "employee"`);
        await queryRunner.query(`CREATE TABLE "temporary_contact_info" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "phone" varchar, "email" varchar NOT NULL, "employeeIdFk" varchar, CONSTRAINT "REL_ec4a214d7578a8ef47af9563e0" UNIQUE ("employeeIdFk"), CONSTRAINT "FK_ec4a214d7578a8ef47af9563e03" FOREIGN KEY ("employeeIdFk") REFERENCES "employee" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_contact_info"("id", "phone", "email", "employeeIdFk") SELECT "id", "phone", "email", "employeeIdFk" FROM "contact_info"`);
        await queryRunner.query(`DROP TABLE "contact_info"`);
        await queryRunner.query(`ALTER TABLE "temporary_contact_info" RENAME TO "contact_info"`);
        await queryRunner.query(`DROP INDEX "IDX_582cce10fa6af6a6a211ef838e"`);
        await queryRunner.query(`DROP INDEX "IDX_cdf12573b66f1264f729111010"`);
        await queryRunner.query(`CREATE TABLE "temporary_employee_meetings" ("employeeIdFk" varchar NOT NULL, "meetingIdFk" integer NOT NULL, CONSTRAINT "FK_582cce10fa6af6a6a211ef838ea" FOREIGN KEY ("employeeIdFk") REFERENCES "employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_cdf12573b66f1264f7291110103" FOREIGN KEY ("meetingIdFk") REFERENCES "meeting" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("employeeIdFk", "meetingIdFk"))`);
        await queryRunner.query(`INSERT INTO "temporary_employee_meetings"("employeeIdFk", "meetingIdFk") SELECT "employeeIdFk", "meetingIdFk" FROM "employee_meetings"`);
        await queryRunner.query(`DROP TABLE "employee_meetings"`);
        await queryRunner.query(`ALTER TABLE "temporary_employee_meetings" RENAME TO "employee_meetings"`);
        await queryRunner.query(`CREATE INDEX "IDX_582cce10fa6af6a6a211ef838e" ON "employee_meetings" ("employeeIdFk") `);
        await queryRunner.query(`CREATE INDEX "IDX_cdf12573b66f1264f729111010" ON "employee_meetings" ("meetingIdFk") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_cdf12573b66f1264f729111010"`);
        await queryRunner.query(`DROP INDEX "IDX_582cce10fa6af6a6a211ef838e"`);
        await queryRunner.query(`ALTER TABLE "employee_meetings" RENAME TO "temporary_employee_meetings"`);
        await queryRunner.query(`CREATE TABLE "employee_meetings" ("employeeIdFk" varchar NOT NULL, "meetingIdFk" integer NOT NULL, PRIMARY KEY ("employeeIdFk", "meetingIdFk"))`);
        await queryRunner.query(`INSERT INTO "employee_meetings"("employeeIdFk", "meetingIdFk") SELECT "employeeIdFk", "meetingIdFk" FROM "temporary_employee_meetings"`);
        await queryRunner.query(`DROP TABLE "temporary_employee_meetings"`);
        await queryRunner.query(`CREATE INDEX "IDX_cdf12573b66f1264f729111010" ON "employee_meetings" ("meetingIdFk") `);
        await queryRunner.query(`CREATE INDEX "IDX_582cce10fa6af6a6a211ef838e" ON "employee_meetings" ("employeeIdFk") `);
        await queryRunner.query(`ALTER TABLE "contact_info" RENAME TO "temporary_contact_info"`);
        await queryRunner.query(`CREATE TABLE "contact_info" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "phone" varchar, "email" varchar NOT NULL, "employeeIdFk" varchar, CONSTRAINT "REL_ec4a214d7578a8ef47af9563e0" UNIQUE ("employeeIdFk"))`);
        await queryRunner.query(`INSERT INTO "contact_info"("id", "phone", "email", "employeeIdFk") SELECT "id", "phone", "email", "employeeIdFk" FROM "temporary_contact_info"`);
        await queryRunner.query(`DROP TABLE "temporary_contact_info"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME TO "temporary_employee"`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "managerIdFk" varchar)`);
        await queryRunner.query(`INSERT INTO "employee"("id", "name", "managerIdFk") SELECT "id", "name", "managerIdFk" FROM "temporary_employee"`);
        await queryRunner.query(`DROP TABLE "temporary_employee"`);
        await queryRunner.query(`ALTER TABLE "task" RENAME TO "temporary_task"`);
        await queryRunner.query(`CREATE TABLE "task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "employeeIdFk" varchar)`);
        await queryRunner.query(`INSERT INTO "task"("id", "name", "employeeIdFk") SELECT "id", "name", "employeeIdFk" FROM "temporary_task"`);
        await queryRunner.query(`DROP TABLE "temporary_task"`);
        await queryRunner.query(`DROP INDEX "IDX_cdf12573b66f1264f729111010"`);
        await queryRunner.query(`DROP INDEX "IDX_582cce10fa6af6a6a211ef838e"`);
        await queryRunner.query(`DROP TABLE "employee_meetings"`);
        await queryRunner.query(`DROP TABLE "contact_info"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "meeting"`);
    }

}
