  // 🔔 Função para mostrar pop-up
    function mostrarToast(mensagem, tipo = "") {
      const toast = document.getElementById("toast");
      toast.textContent = mensagem;
      toast.className = `show ${tipo}`;
      setTimeout(() => {
        toast.className = toast.className.replace("show", "").trim();
      }, 3000);
    }
  
    const perguntas = [
      "Gosto de analisar e examinar as coisas em detalhes.",
      "Levo jeito e gosto de atividades artísticas.",
      "Gosto de ensinar e orientar os outros.",
      "Gosto de dar minha opinião fundamentada em fatos.",
      "Consigo controlar minhas emoções.",
      "Sou criativo e tenho ideias diferentes e originais.",
      "Sou crítico e frio nos julgamentos que faço.",
      "Sou minucioso e quero sempre conhecer aspectos específicos.",
      "Fico emocionado e demonstro meus sentimentos.",
      "Sou ligado no espírito e na alma.",
      "Sou extrovertido.",
      "Basta-me uma visão geral das coisas que eu já entendo.",
      "Tenho imaginação.",
      "Gosto de terminar o que começo.",
      "Sei juntar as partes para entender o todo.",
      "Relaciono-me com facilidade com as pessoas.",
      "Sou introvertido.",
      "Tenho intuição e não preciso de fatos e dados.",
      "Tenho raciocínio lógico.",
      "Tenho talento e interesse por música, canto e dança.",
      "Sou organizado.",
      "Penso antes de fazer e gosto de planejar antes de executar.",
      "Gosto de números e cálculos matemáticos.",
      "Gosto de lidar com os problemas um de cada vez."
    ];
  
    const perguntasContainer = document.getElementById("perguntas");
  
    perguntas.forEach((pergunta, index) => {
      const div = document.createElement("div");
      div.className = "pergunta";
      div.innerHTML = `
        ${index + 1}. ${pergunta}
        <div class="options">
  <input type="radio" id="q${index + 1}_0" name="q${index + 1}" value="0" required>
  <label for="q${index + 1}_0"><span>0</span></label>

  <input type="radio" id="q${index + 1}_2" name="q${index + 1}" value="2">
  <label for="q${index + 1}_2"><span>2</span></label>

  <input type="radio" id="q${index + 1}_4" name="q${index + 1}" value="4">
  <label for="q${index + 1}_4"><span>4</span></label>

  <input type="radio" id="q${index + 1}_8" name="q${index + 1}" value="8">
  <label for="q${index + 1}_8"><span>8</span></label>
</div>
      `;
      perguntasContainer.appendChild(div);
    });
  
    document.querySelectorAll('.options2').forEach(group => {
      const checkboxes = group.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
          const checked = [...checkboxes].filter(c => c.checked);
          if (checked.length > 4) {
            cb.checked = false;
            alert('Você só pode selecionar 4 opções.');
          }
        });
      });
    });
  
    document.getElementById("perfilForm").addEventListener("submit", function(e) {
  e.preventDefault();

const form = e.target;

  // 🧠 VALIDAÇÃO PARTE 1
  const respostas = document.querySelectorAll('#perguntas input[type="radio"]:checked');
  if (respostas.length !== 24) {
    mostrarToast("❌ Você deve responder exatamente 24 perguntas na parte 1.", "error");
    return;
  }

  const contagem = { "0": 0, "2": 0, "4": 0, "8": 0 };
  respostas.forEach(r => {
    contagem[r.value]++;
  });

  for (let valor of [0, 2, 4, 8]) {
    if (contagem[valor.toString()] !== 6) {
      mostrarToast("❌ Você deve escolher exatamente 6 vezes cada valor: 0, 2, 4 e 8.", "error");
      return;
    }
  }

  // 🧠 VALIDAÇÃO PARTE 4: evitar valores repetidos dentro de cada Situação (s1a a s10d)
  for (let i = 1; i <= 10; i++) {
    const respostas = [
      form.querySelector(`select[name="s${i}a"]`)?.value,
      form.querySelector(`select[name="s${i}b"]`)?.value,
      form.querySelector(`select[name="s${i}c"]`)?.value,
      form.querySelector(`select[name="s${i}d"]`)?.value
    ];

    const preenchidas = respostas.filter(v => v !== "");
    const distintas = new Set(preenchidas);

    if (preenchidas.length < 4) {
      mostrarToast(`❌ Preencha todas as opções da Situação ${i}.`, "error");
      return;
    }

    if (distintas.size !== 4) {
      mostrarToast(`❌ Os valores de intensidade na Situação ${i} devem ser diferentes entre si.`, "error");
      return;
    }
  }

  mostrarToast("⏳ Enviando respostas...", "");

const formData = new FormData(form);
const data = {};

formData.forEach((value, key) => {
  if (data[key]) {
    if (Array.isArray(data[key])) {
      data[key].push(value);
    } else {
      data[key] = [data[key], value];
    }
  } else {
    data[key] = value;
  }
});

fetch("https://script.google.com/macros/s/AKfycbyxXdIeV-SiwsbaytbxIeg6OkaSOCeMJMsXnx5ek8gB4hzig_0QtlnX6qiTKa0CB7BkjA/exec", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})

.then(() => {
  // Opcional: mostrar toast
  mostrarToast("✅ Respostas enviadas com sucesso!", "success");

  // Aguarda um curto tempo para o usuário ver o toast (opcional)
  setTimeout(() => {
    window.location.href = "agradecimento.html";
  }, 1000); // redireciona após 1 segundo
})
.catch(() => {
  mostrarToast("❌ Erro ao enviar respostas. Tente novamente.", "error");
});
}); 

const parte4 = [
  {
    titulo: "Situação: Atingir metas",
    a: "Agir rápido com independência e autonomia",
    b: "Agir de acordo com uma decisão consensada em grupo",
    c: "Agir com a possibilidade de buscar informação em fontes seguras",
    d: "Agir podendo garantir que não haverá conflitos pessoais decorrentes"
  },
  {
    titulo: "Situação: Resolver um problema",
    a: "Agir para vencer o desafio e comprovar a sua competência",
    b: "Agir podendo consultar pessoas e ser consultado por elas",
    c: "Agir com a oportunidade de usar a análise lógica para encontrar a solução",
    d: "Agir com o cuidado necessário para não melindrar as pessoas envolvidas"
  },
  {
    titulo: "Situação: Tomar uma decisão",
    a: "Agir sem perder tempo",
    b: "Agir usando o seu talento pessoal e recorrendo ao talento de outras pessoas",
    c: "Agir com tempo suficiente para garantir qualidade do que precisa ser feito",
    d: "Agir com o controle sobre como as pessoas vão reagir"
  },
  {
    titulo: "Situação: No dia a dia com os liderados",
    a: "Agir com a prioridade de obter resultados, com os liderados tendo a iniciativa de acompanhar e contribuir",
    b: "Agir promovendo e comprovando o crescimento profissional dos liderados",
    c: "Agir com a certeza de que sempre haverá bom senso e ponderação nas relações com os liderados",
    d: "Agir com a certeza de que os liderados compreendem o seu papel de Líder"
  },
  {
    titulo: "Situação: Em reunião com os liderados",
    a: "Agir incentivando: Sei que vocês são capazes!",
    b: "Agir dizendo: Preciso da ajuda de vocês!",
    c: "Agir com o pedido: Pensem antes de agir!",
    d: "Agir com o lembrete: Ajudem uns aos outros!"
  },
  {
    titulo: "Situação: Para incentivar liderados",
    a: "Agir com a filosofia: 'O importante são os resultados!'",
    b: "Agir com a filosofia: 'Ninguém faz nada sozinho!'",
    c: "Agir com a filosofia: 'A pressa é inimiga da perfeição!'",
    d: "Agir com a filosofia: 'As pessoas precisam se esforçar para entender as diferenças individuais!'"
  },
  {
    titulo: "Situação: Para servir de exemplo aos liderados",
    a: "Agir através da palavra-chave: EXECUÇÃO",
    b: "Agir através da palavra-chave: PARTICIPAÇÃO",
    c: "Agir através da palavra-chave: PLANEJAMENTO",
    d: "Agir através da palavra-chave: HARMONIA"
  },
  {
    titulo: "Situação: Para ter a sensação de um trabalho bem feito",
    a: "Agir e no final ser reconhecido pela rapidez de alcance dos resultados",
    b: "Agir e no final ser reconhecido pelo grupo",
    c: "Agir e no final ser reconhecido pela ótima relação custo-benefício conseguida",
    d: "Agir e no final não ter magoado ninguém"
  },
  {
    titulo: "Situação: Para vencer um desafio",
    a: "Agir sem ficar dependendo de ninguém",
    b: "Agir coordenando um grupo de trabalho",
    c: "Agir com tempo para pensar",
    d: "Agir com a aprovação e o apoio de todos os envolvidos"
  },
  {
    titulo: "Situação: Ao chegar em um grupo de trabalho para atuar",
    a: "Agir encontrando rapidez",
    b: "Agir encontrando cooperação",
    c: "Agir encontrando segurança",
    d: "Agir encontrando aceitação"
  }
];

const parte4Container = document.getElementById("parte4");

parte4.forEach((situacao, i) => {
  const container = document.createElement("div");
  container.className = "container";
  container.innerHTML = `
    <div class="question">${situacao.titulo}</div>
    <div class="options2">
      ${["a", "b", "c", "d"].map(letra => `

          ${situacao[letra]}
          <select name="s${i+1}${letra}" required>
            <option value="">Selecione</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </label>
      `).join("")}
    </div>
  `;
  parte4Container.appendChild(container);
});

const parte5 = [
  {
    pergunta: "Não gosto do novo método de trabalho. O método antigo é muito melhor!",
    opcoes: [
      "O novo método é muito melhor! Veja...",
      "Entendo...Quais são as vantagens do método antigo?",
      "O antigo pode até ser bom, mas apresenta estes problemas...",
      "Você vai acabar mudando de opinião..."
    ]
  },
  {
    pergunta: "Eu realmente não estou convencido de que errei!",
    opcoes: [
      "Entendo, mas veja o que você fez...",
      "Gostaria que você refletisse a respeito.",
      "Quais são as suas dúvidas sobre o ocorrido?",
      "Porque você não está reconhecendo o seu erro?"
    ]
  },
  {
    pergunta: "As metas são difíceis de alcançar!",
    opcoes: [
      "Sei que as metas são altas, mas vai valer à pena atingi-las!",
      "Todo mundo sempre achará isso!",
      "Precisamos destes resultados! Não reclame antes de tentar!",
      "Pode me esclarecer melhor o que você está considerando nesta sua avaliação?"
    ]
  },
  {
    pergunta: "A empresa nunca cumpre o combinado!",
    opcoes: [
      "Teve problemas com a empresa? Quais são as suas queixas?",
      "Nunca é exagero! Você está sendo injusto!",
      "Não vamos falar do passado! Pode ficar tranquilo que desta vez não haverá problemas!",
      "Tudo bem...mas considere que a empresa pode ter tido os seus motivos."
    ]
  },
  {
    pergunta: "Não consigo aprender o novo método. É muito complicado!",
    opcoes: [
      "Preciso que você tenha paciência...",
      "Entendo...Mas é fundamental adotar o novo método.",
      "Não vejo nenhuma complicação. Você vai conseguir!",
      "Como assim? Pode me esclarecer melhor?"
    ]
  },
  {
    pergunta: "Tenho uma sugestão melhor do que sua para resolvermos o problema!",
    opcoes: [
      "Pode me explicar as vantagens da sua proposta?",
      "Como assim “melhor”?",
      "Minha sugestão também é boa!",
      "Entendo, mas veja as vantagens da minha sugestão..."
    ]
  },
  {
    pergunta: "Só me relaciono com pessoas que conheço muito bem!",
    opcoes: [
      "Não seja desconfiado!",
      "Quais as suas preocupações com relação às pessoas?",
      "Entendo...mas é importante se dar bem com todos! Para isso você precisa se relacionar!",
      "Que tal não fazer pré-julgamentos?"
    ]
  },
  {
    pergunta: "Vou estudar a sua proposta. Mantenho contato quando decidir.",
    opcoes: [
      "Conto com a sua aprovação!",
      "Sua prudência é sinal de bom senso, mas posso tentar convencê-lo?",
      "Não demore muito!",
      "Qual aspecto gostaria de estudar melhor? Onde estão suas principais dúvidas?"
    ]
  },
  {
    pergunta: "Sua proposta não me serve de maneira nenhuma!",
    opcoes: [
      "Se você mudar de ideia, procure-me.",
      "Será que você não está se precipitando: deixe-me explicar-lhe melhor!",
      "Você vai perder uma ótima proposta! Veja lá se não vai se arrepender.",
      "Especificamente, o que lhe preocupa? Onde posso melhorar a minha proposta?"
    ]
  },
  {
    pergunta: "Não vejo nenhuma vantagem para mim!",
    opcoes: [
      "Onde você acha que está perdendo? O que esperava obter?",
      "Como não! Existem muitas vantagens! Será que você compreendeu bem?",
      "Pense bem!",
      "Compreendo...mas deixe-me explicar-lhe mais uma vez."
    ]
  },
  {
    pergunta: "Só aceito se você me der mais vantagens!",
    opcoes: [
      "Não tem jeito! Minha proposta é justa!",
      "Porque você precisa delas? O que exatamente não lhe satisfaz?",
      "Veja bem, já lhe concedi muitas vantagens. Vou lhe mostrar...",
      "Vou lhe dar mais tempo para pensar."
    ]
  },
  {
    pergunta: "Já recebi propostas deste tipo: são todas iguais!",
    opcoes: [
      "Analise os seguintes pontos da minha proposta e verá o quanto ela é diferente.",
      "Reflita e verá o quanto minha proposta é diferente.",
      "Só aparentemente. Na verdade, você não está percebendo os seguintes detalhes...",
      "O que você considera como diferenciais importantes?"
    ]
  }
];

const parte5Container = document.getElementById("parte5");

parte5.forEach((item, index) => {
  const container = document.createElement("div");
  container.className = "container";
  container.innerHTML = `
    <div class="question">${item.pergunta}</div>
    <div class="options2">
      ${item.opcoes.map((opcao, i) => `
        <input type="radio" id="p5_${index + 1}_${i + 1}" name="parte5_${index + 1}" value="${opcao}" required>
        <label for="p5_${index + 1}_${i + 1}">${opcao}</label>
      `).join("")}
    </div>
  `;
  parte5Container.appendChild(container);

});

  const parte6 = [
    {
      pergunta: "Seus liderados não estão mais apresentando o desempenho desejado após mudanças no método de trabalho.",
      opcoes: [
        "Faria um acompanhamento individual para identificar e corrigir a causa das deficiências no desempenho.",
        "Faria uma reunião com toda a equipe para analisar a situação.",
        "Faria um acompanhamento individual para explicar novamente as metas e o método para alcançá-las.",
        "Confiaria nos liderados, acreditando que eles serão capazes de reverter a situação."
      ]
    },
    {
      pergunta: "Você treinou e controla de perto seus liderados, mas alguns reclamam das 'rédeas curtas'.",
      opcoes: [
        "Conversaria individualmente com quem está reclamando para justificar o meu comportamento, mas o manteria.",
        "Daria mais liberdade e autonomia para a equipe.",
        "Faria uma reunião com toda a equipe para ouvir a opinião de todos e debater a situação.",
        "Aumentaria ainda mais o controle sobre a equipe."
      ]
    },
    {
      pergunta: "Seus liderados superam as metas, mas houve um desentendimento entre eles, já resolvido.",
      opcoes: [
        "Conversaria individualmente para reforçar a importância da união do grupo.",
        "Não faria nada.",
        "Providenciaria um treinamento sobre trabalho de grupo e espírito de equipe.",
        "Faria uma reunião com toda a equipe para descobrir o que aconteceu e ouvir opiniões."
      ]
    },
    {
      pergunta: "Liderados sugerem mudança no método de trabalho. Eles são experientes e superam metas.",
      opcoes: [
        "Analisaria a sugestão. Se aprovada, autorizaria o próprio grupo a implantar a mudança.",
        "Analisaria a sugestão. Se aprovada, assumiria pessoalmente a implantação da mudança.",
        "Analisaria a sugestão. Se aprovada, faria uma reunião com a equipe para planejar a implantação.",
        "Analisaria a sugestão. Se aprovada, faria uma reunião para explicar como será a implantação."
      ]
    },
    {
      pergunta: "Liderados não alcançam as metas e estão inseguros, mesmo após treinamento.",
      opcoes: [
        "Esperaria um pouco para ver se o grupo melhora.",
        "Teria conversas individuais para conscientizar sobre a importância das metas e do método.",
        "Faria um acompanhamento 'corpo a corpo' para tirar dúvidas e orientar.",
        "Faria uma reunião com toda a equipe para debater a situação."
      ]
    },
    {
      pergunta: "Você assumiu a liderança de uma nova equipe insatisfeita com o líder anterior.",
      opcoes: [
        "Faria uma reunião com toda a equipe para ouvir sugestões sobre o estilo de liderança.",
        "Faria um acompanhamento 'corpo a corpo' para avaliar o desempenho de cada um.",
        "Deixaria a equipe trabalhar sem pressão.",
        "Faria uma reunião com a equipe para explicar minha forma de atuar."
      ]
    },
    {
      pergunta: "Você planeja mudanças importantes e sua equipe é competente e experiente.",
      opcoes: [
        "Implantaria as mudanças pessoalmente.",
        "Faria uma reunião com a equipe para debater e ouvir sugestões.",
        "Faria uma reunião para explicar como as mudanças serão implementadas.",
        "Explicaria as mudanças e daria 'carta branca' para os liderados implementarem."
      ]
    },
    {
      pergunta: "Você acompanha de perto o trabalho de uma equipe de alta performance.",
      opcoes: [
        "Diminuiria o acompanhamento.",
        "Conversaria com cada um para explicar os motivos do acompanhamento.",
        "Continuaria o acompanhamento para garantir a continuidade dos resultados.",
        "Faria uma reunião para ouvir a opinião da equipe."
      ]
    },
    {
      pergunta: "Você decide criar dois turnos e promove um liderado para liderar o segundo turno.",
      opcoes: [
        "Confiaria o recrutamento ao novo chefe.",
        "Faria o recrutamento com ele, dando a aprovação final.",
        "Faria o recrutamento do pessoal para o chefe.",
        "Faria o recrutamento em conjunto com o novo chefe."
      ]
    },
    {
      pergunta: "Um liderado está inseguro com o método de trabalho, mas tem vontade de aprender.",
      opcoes: [
        "Faria uma reunião para ouvi-lo e descobrir a causa da insegurança.",
        "Faria um acompanhamento imediato para corrigir a falha.",
        "Confiaria no liderado e deixaria ele se autodesenvolver.",
        "Faria acompanhamento e depois orientaria numa conversa."
      ]
    },
    {
      pergunta: "Você contratou um novo liderado para uma equipe muito experiente.",
      opcoes: [
        "Eu me encarregaria sozinho da integração e treinamento.",
        "Faria uma reunião com a equipe para planejarmos e executarmos juntos.",
        "Ouviria a equipe e depois eu mesmo faria a integração.",
        "Deixaria a equipe responsável pela integração e treinamento."
      ]
    },
    {
      pergunta: "Você precisa decidir o horário de um treinamento para equipe responsável e competente.",
      opcoes: [
        "Convenceria a equipe a fazer o treinamento fora do expediente.",
        "Deixaria a equipe decidir o horário.",
        "Determinaria o treinamento fora do expediente.",
        "Faria uma reunião para decidir em conjunto."
      ]
    }
  ];
  
  const parte6Container = document.getElementById("parte6");
  
  parte6.forEach((item, index) => {
    const container = document.createElement("div");
    container.className = "container";
    container.innerHTML = `
      <div class="question">${index + 1} – ${item.pergunta}</div>
      <div class="options2">
        ${item.opcoes.map((opcao, i) => `
          <input type="radio" id="p6_${index + 1}_${i + 1}" name="parte6_${index + 1}" value="${opcao}" required>
          <label for="p6_${index + 1}_${i + 1}">${opcao}</label>
        `).join("")}
      </div>
    `;
    parte6Container.appendChild(container);
  });

  // Aplica classe 'selecionado' manualmente, compatível com Power Pages
function aplicarSelecaoVisual() {
  const inputs = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');

  inputs.forEach(input => {
    input.addEventListener('change', () => {
      // Para radios, remove seleção dos irmãos
      if (input.type === "radio") {
        const radios = document.querySelectorAll(`input[name="${input.name}"]`);
        radios.forEach(r => {
          const lbl = document.querySelector(`label[for="${r.id}"]`);
          lbl?.classList.remove("selecionado");
        });
      }

      const label = document.querySelector(`label[for="${input.id}"]`);
      if (input.checked) {
        label?.classList.add("selecionado");
      } else {
        label?.classList.remove("selecionado");
      }
    });
  });
}

// Executa após o carregamento inicial do DOM
window.addEventListener("DOMContentLoaded", aplicarSelecaoVisual);
