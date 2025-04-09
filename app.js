const express = require('express')
const app = express()
const port = 8086

app.get('/feriados', function(req, res){
    fetch("https://brasilapi.com.br/api/feriados/v1/2025")
        .then((response) => response.json())
        .then((feriados) => {
            let resultado = feriados.map(f => 
                `Data: ${f.date}\nFeriado: ${f.name}\nTipo: ${f.type}\n`
            ).join('\n');
            res.send(resultado);
        })
        .catch(error => {
            console.log("Erro ao acessar o link", error);
            res.send("Ops, houve um erro");
        });
});

app.get('/taxas', function(req, res){
    const codigo = req.params.codigo;
    fetch("https://brasilapi.com.br/api/taxas/v1/" + "CDI")
        .then((response) => response.json())
        .then((t) => {
            res.send(`Nome: ${t.nome}\n Valor: ${t.valor}`);
        })
        .catch(error => {
            console.log("Erro ao acessar o link", error);
            res.send("Ops, houve um erro");
        });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}...`)
})