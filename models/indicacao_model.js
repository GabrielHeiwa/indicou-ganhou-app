const mongo = require("mongoose");
const { Schema } = mongo;

const indicacao_model = new Schema({
    nome_do_indicador: String,
    nome_do_indicado: String,
    telefone_do_indicado: Number,

    descricao_do_indicado: String,

    latitude_do_indicado: String,
    longitude_do_indicado: String,

    fatura_do_indicado: String,
});

const IndicacaoModel = mongo.model("indicacao", indicacao_model);
module.exports = IndicacaoModel;