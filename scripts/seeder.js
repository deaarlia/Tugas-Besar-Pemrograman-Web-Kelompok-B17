require('dotenv').config(); // Menghubungkan file .env
const db = require('../lib/db');
const bcrypt = require('bcrypt');

async function runSeeder() {
    try {
        console.log("Memulai seeder...");

        const plainPassword = process.env.SEEDER_PASSWORD;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

        await db.query(`INSERT IGNORE INTO roles (id, name) VALUES (1, 'Admin'), (2, 'Mahasiswa'), (3, 'WD2')`);

        const [admin] = await db.query(
            `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, 
            ['Admin Akademik', 'admin@unand.ac.id', hashedPassword]
        );
        const [mahasiswa] = await db.query(
            `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, 
            ['Mahasiswa', 'mahasiswa@student.unand.ac.id', hashedPassword]
        );
        const [wd2] = await db.query(
            `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, 
            ['Wakil Dekan 2', 'wd2@unand.ac.id', hashedPassword]
        );

        await db.query(`INSERT INTO model_has_roles (role_id, model_id) VALUES (1, ?)`, [admin.insertId]);
        await db.query(`INSERT INTO model_has_roles (role_id, model_id) VALUES (2, ?)`, [mahasiswa.insertId]);
        await db.query(`INSERT INTO model_has_roles (role_id, model_id) VALUES (3, ?)`, [wd2.insertId]);

        console.log("Seeder berhasil! Gunakan password dari .env untuk login.");
        process.exit();
    } catch (error) {
        console.error("Gagal seeder:", error.message);
        process.exit(1);
    }
}

runSeeder();