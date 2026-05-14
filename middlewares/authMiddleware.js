exports.checkRole = (requiredRoleId) => {
    return (req, res, next) => {
        if (!req.session.userId) {
            return res.status(401).json({ message: "Harap login terlebih dahulu!" });
        }
        if (req.session.roleId !== requiredRoleId) {
            return res.status(403).json({ message: "Akses Ditolak! Anda bukan Admin/WD2." });
        }
        next();
    };
};