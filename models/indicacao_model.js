// import mongoose from "mongoose";
import mongoose from "../DB_connection.js";

const indicacao_model = mongoose.Schema({
    nome_do_indicador: String,
    nome_do_indicado: String,
    telefone_do_indicado: Number,
    
    indicado_descricao: String,

    latitude_do_indicado: String,
    longitude_do_indicado: String,
    
    indicado_fatura: String,
});

const IndicacaoModel =  mongoose.model("indicacao", indicacao_model);
export default IndicacaoModel;