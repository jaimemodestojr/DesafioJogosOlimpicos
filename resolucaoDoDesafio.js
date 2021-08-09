let olympicsMedalTable = [
  {
    id: 1,
    country: "BRASIL",
    gold: 7,
    silver: 6,
    bronze: 6,
    continent: "AMERICA DO SUL",
  },
  {
    id: 2,
    country: "USA",
    gold: 46,
    silver: 37,
    bronze: 17,
    continent: "AMERICA DO NORTE",
  },
  {
    id: 3,
    country: "CHINA",
    gold: 26,
    silver: 18,
    bronze: 26,
    continent: "ASIA",
  },
  {
    id: 4,
    country: "RUSSIA",
    gold: 19,
    silver: 18,
    bronze: 19,
    continent: "EUROPA",
  },
  {
    id: 5,
    country: "REINO UNIDO",
    gold: 27,
    silver: 23,
    bronze: 17,
    continent: "EUROPA",
  },
  {
    id: 6,
    country: "ALEMANHA",
    gold: 17,
    silver: 10,
    bronze: 15,
    continent: "EUROPA",
  },
  {
    id: 7,
    country: "JAPÃO",
    gold: 12,
    silver: 8,
    bronze: 21,
    continent: "ASIA",
  },
  {
    id: 8,
    country: "ARGENTINA",
    gold: 3,
    silver: 1,
    bronze: 0,
    continent: "AMERICA DO SUL",
  },
  {
    id: 9,
    country: "ITALIA",
    gold: 8,
    silver: 12,
    bronze: 8,
    continent: "EUROPA",
  },
  {
    id: 10,
    country: "QUÊNIA",
    gold: 6,
    silver: 6,
    bronze: 1,
    continent: "AFRICA",
  },
];

Array.prototype.customFind = function (fCondicao) {
  // find precisa receber uma função de condição e retornar o primeiro valor atende essa condição
  // a função condição pode receber qualquer coisa, mas deve retornar boolean
  let achou = false;
  let indice = 0;
  let valor = undefined;
  while (!achou && indice < this.length) {
    if (fCondicao(this[indice])) {
      valor = this[indice];
      achou = true;
    }
    indice++;
  }
  return valor;
};

Array.prototype.customSome = function (fCondicao) {
  // some precisa receber uma função de condição e retornar o boolean
  // a função condição pode receber qualquer coisa, mas deve retornar boolean
  let achou = false;
  let indice = 0;
  while (!achou && indice < this.length) {
    if (fCondicao(this[indice])) {
      achou = true;
    }
    indice++;
  }
  return achou;
};

Array.prototype.customFilter = function (fCondicao) {
  // filter precisa receber uma função de condição e retornar todos valores que atendem essa condição
  // a função condição pode receber qualquer coisa, mas deve retornar boolean
  let indice = 0;
  let valores = [];
  while (indice < this.length) {
    if (fCondicao(this[indice])) {
      valores.push(this[indice]);
    }
    indice++;
  }
  return valores;
};

Array.prototype.customMap = function (funcaoCb) {
  // map precisa receber uma função que realiza alguma interação com o array e deve retornar um novo array, do mesmo tamanho, com as alterações realizadas
  // a função de callback deve receber um retornar um valor alterado
  let valores = [];
  for (let index = 0; index < this.length; index++) {
    valores.push(funcaoCb(this[index]));
  }
  return valores;
};

const somaArray = (acumulador, valorAtual) => acumulador + valorAtual;
const multiplicaArray = (acc, cur) => acc * cur;

// Código modelo utilizando filter, map e reduce
const resultFilterMapReduce = olympicsMedalTable
  .filter((i) => i.continent === "ASIA") // JAPÃO e CHINA
  .map((i) => i.gold) // 26 e 12
  .reduce((total, quantity) => total + quantity);

console.log(
  `Medalhas de Ouro no continente Asiático: ${resultFilterMapReduce}`
);

// Implemente as funções customizadas - customFilter, customMap e customReduce e verique se o retorno é igual ao do código modelo
const resultByCustomFilterMapReduce = olympicsMedalTable
  .customFilter((i) => i.continent === "ASIA")
  .customMap((i) => i.gold)
  .customReduce((total, quantity) => total + quantity, 0);

console.log(
  `Resultado custom - Medalhas de Ouro no continente Asiático: ${resultByCustomFilterMapReduce}`
);

/* DESAFIOS - CONCLUA AS FUNÇÕES customSome, customFind E UTILIZANDO TODAS AS FUNÇÕES 'CUSTOM' CONCLUA OS DESAFIOS ABAIXO: */

// 1 - Crie um algoritmo que encontre o único pais do continente Africano
const paisAfricano1 = olympicsMedalTable.customFind(
  (x) => x.continent === "AFRICA"
).country;
console.log(paisAfricano1);
const paisAfricano2 = olympicsMedalTable.find(
  (x) => x.continent === "AFRICA"
).country;
console.log(paisAfricano2);

// 2 - Crie um algoritmo que retorne o total de medalhas por país
const somaMedalhas = (acc, curr) => acc + curr;
const medalhasPorPais1 = olympicsMedalTable.customMap((x) => {
  const arrayMedalhas = [x.gold, x.silver, x.bronze];
  const totalMedalhas = arrayMedalhas.customReduce(somaMedalhas, 0);
  return { país: x.country, totalMedalhas };
});
console.log(medalhasPorPais1);

const medalhasPorPais2 = olympicsMedalTable.map((x) => {
  const arrayMedalhas = [x.gold, x.silver, x.bronze];
  const totalMedalhas = arrayMedalhas.reduce(somaMedalhas, 0);
  return { país: x.country, totalMedalhas };
});
console.log(medalhasPorPais2);

// 3 - Crie um algoritmo para encontrar os países que conquistaram mais que 10 medalhas de ouro
const paisesCom10MedalhasOuroNoMinimo = olympicsMedalTable
  .customFilter((x) => x.gold >= 10)
  .customMap((x) => ({ país: x.country, ouro: x.gold }));
console.log(paisesCom10MedalhasOuroNoMinimo);

// 4 - Crie um algoritmo para encontrar os países que conquistaram no minímo 30 medalhas (Ouro, Prata e Bronze)
const paisesCom30MedalhasNoMinimo = olympicsMedalTable
  .customMap((x) => {
    const arrayMedalhas = [x.gold, x.silver, x.bronze];
    const totalMedalhas = arrayMedalhas.customReduce(somaMedalhas, 0);
    return { país: x.country, totalMedalhas };
  })
  .customFilter((x) => x.totalMedalhas > 30);
console.log(paisesCom30MedalhasNoMinimo);

// 5 - Crie um algoritmo para verificar se o continente América do Sul conquistou pelo menos 20 medalhas de ouro
const paisesComPeloMenos20MedalhasDeOUro = olympicsMedalTable
  .customFilter((x) => x.continent === "AMERICA DO SUL")
  .customMap((x) => {
    const arrayMedalhas = [x.gold, x.silver, x.bronze];
    const totalMedalhas = arrayMedalhas.customReduce(somaMedalhas, 0);
    return { país: x.country, totalMedalhas };
  })
  .customFilter((x) => x.totalMedalhas > 20);
console.log(paisesComPeloMenos20MedalhasDeOUro);
