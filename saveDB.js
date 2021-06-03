import Model from "./models/indicacao_model.js";

(async () => {
    const model = await Model.create({
        nome_do_indicador: "teste",
        nome_do_indicado: "teste",
        telefone_do_indicado: 9842883151,
        
        indicado_descricao: "teste",
    
        latitude_do_indicado: "String",
        longitude_do_indicado: "String",
        
        indicado_fatura: "String",
    })

    await model.save();
    console.log("com,plete")
})();



