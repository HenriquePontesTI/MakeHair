var connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        var { id } = req.body;
        var ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();
        if (!ong) {
            return res.status(400).json({ error: "Nenhuma ONG encontrada" });

        }
        return res.json({ ong });
    }

}
