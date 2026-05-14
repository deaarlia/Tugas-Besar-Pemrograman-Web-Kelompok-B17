const db = require('../lib/db');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = users[0];
        const isMatch = users.length > 0 && await bcrypt.compare(password, user.password);

        if (!user || !isMatch) {
            return res.status(401).json({ message: "Email atau password salah!" });
        }
        
        const [roles] = await db.query('SELECT role_id FROM model_has_roles WHERE model_id = ?', [user.id]);
        const roleId = roles.length > 0 ? roles[0].role_id : null;

        req.session.regenerate((err) => {
            if (err) return res.status(500).json({ message: "Terjadi kesalahan server." });

            req.session.userId = user.id;
            req.session.roleId = roleId;

            res.json({ message: "Login berhasil!", roleId });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server." });
    }
};

exports.checkSession = (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Belum login!" });
    }
    res.json({ 
        message: "Session aktif", 
        roleId: req.session.roleId 
    });
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: "Gagal logout." });
        res.clearCookie('connect.sid');
        res.json({ message: "Berhasil logout." });
    });
};