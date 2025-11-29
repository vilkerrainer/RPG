


import { Spell } from './types';

// Example spells - a full list would be extensive
export const ALL_AVAILABLE_SPELLS: Spell[] = [
  // Cantrips (Level 0)
  {
    name: "Rajada de Fogo (Fire Bolt)",
    level: 0,
    school: "Evocação",
    castingTime: "1 ação",
    range: "36 metros",
    components: "V, S",
    duration: "Instantânea",
    description: "Você arremessa uma partícula de fogo em uma criatura ou objeto dentro do alcance. Faça um ataque à distância com magia contra o alvo. Se atingir, o alvo sofre 1d10 de dano de fogo. Um objeto inflamável atingido por esta magia se incendeia se não estiver sendo vestido ou carregado.",
    classes: ["Mago", "Feiticeiro"]
  },
  {
    name: "Raio de Gelo (Ray of Frost)",
    level: 0,
    school: "Evocação",
    castingTime: "1 ação",
    range: "18 metros",
    components: "V, S",
    duration: "Instantânea",
    description: "Um raio de energia frígida parte em direção de uma criatura dentro do alcance. Realize uma jogada de ataque mágico à distância contra o alvo. Se atingir, o alvo sofre 1d8 de dano de frio e seu deslocamento é reduzido em 3 metros até o início do seu próximo turno.",
    classes: ["Mago", "Feiticeiro", "Bruxo"] // Bruxo pode pegar com Pact of the Tome
  },
  {
    name: "Toque Arrepiante (Chill Touch)",
    level: 0,
    school: "Necromancia",
    castingTime: "1 ação",
    range: "36 metros",
    components: "V, S",
    duration: "1 rodada",
    description: "Você cria uma mão esquelética fantasmagórica no espaço de uma criatura dentro do alcance. Faça um ataque à distância com magia contra a criatura para atingi-la com o toque fantasmagórico. Se atingir, a criatura sofre 1d8 de dano necrótico, e não pode recuperar pontos de vida até o início do seu próximo turno. Até lá, a mão se agarra ao alvo. Se você atingir um alvo morto-vivo, ele também tem desvantagem nas jogadas de ataque contra você até o final do seu próximo turno.",
    classes: ["Mago", "Feiticeiro", "Bruxo"]
  },
  {
    name: "Mãos Mágicas (Mage Hand)",
    level: 0,
    school: "Conjuração",
    castingTime: "1 ação",
    range: "9 metros",
    components: "V, S",
    duration: "1 minuto",
    description: "Uma mão espectral flutuante aparece num ponto, à sua escolha, dentro do alcance. A mão permanece pela duração ou até você dissipa-la com uma ação. A mão some se estiver a mais de 9 metros de você ou se você conjurar essa magia novamente. Você pode usar sua ação para controlar a mão. Você pode usar a mão para manipular um objeto, abrir uma porta ou recipiente destrancado, guardar ou pegar um item de um recipiente aberto, ou derramar o conteúdo de um frasco. Você pode mover a mão até 9 metros cada vez que a usa. A mão não pode atacar, ativar itens mágicos, ou carregar mais de 5 quilos.",
    classes: ["Mago", "Bardo", "Bruxo", "Feiticeiro"]
  },
  {
    name: "Luz (Light)",
    level: 0,
    school: "Evocação",
    castingTime: "1 ação",
    range: "Toque",
    components: "V, M (um vaga-lume ou musgo fosforescente)",
    duration: "1 hora",
    description: "Você toca um objeto que não tenha mais 3 metros em qualquer dimensão. Até a magia acabar, o objeto emite luz plena num raio de 6 metros e penumbra por 6 metros adicionais. A magia termina se você conjurá-la novamente ou dissipá-la com uma ação.",
    classes: ["Mago", "Bardo", "Clérigo", "Feiticeiro"]
  },
  {
    name: "Prestidigitação (Prestidigitation)",
    level: 0,
    school: "Transmutação",
    castingTime: "1 ação",
    range: "3 metros",
    components: "V, S",
    duration: "Até 1 hora",
    description: "Essa magia é um truque mágico simples que conjuradores iniciantes usam para praticar. Você cria um dos seguintes efeitos mágicos dentro do alcance: Você cria um efeito sensorial inofensivo instantâneo, como uma chuva de faíscas, um sopro de vento, notas musicais fracas, ou um odor estranho. Você instantaneamente acende ou apaga uma vela, uma tocha, ou uma pequena fogueira. Você instantaneamente limpa ou suja um objeto de não mais que 1 pé cúbico. Você esfria, esquenta, ou tempera até 1 pé cúbico de matéria não viva por 1 hora. Você faz uma cor, uma pequena marca, ou um símbolo aparecer em um objeto ou superfície por 1 hora. Você cria uma bugiganga não mágica ou uma imagem ilusória que caiba na sua mão e que dura até o final do seu próximo turno. Se você conjurar esta magia múltiplas vezes, você pode ter até três de seus efeitos não instantâneos ativos ao mesmo tempo, e você pode dissipar tal efeito com uma ação.",
    classes: ["Mago", "Bardo", "Bruxo", "Feiticeiro", "Druida"]
  },
  {
    name: "Consertar (Mending)",
    level: 0,
    school: "Transmutação",
    castingTime: "1 minuto",
    range: "Toque",
    components: "V, S, M (dois ímãs)",
    duration: "Instantânea",
    description: "Esta magia repara um única quebra ou rasgo em um objeto que você toca, como um elo quebrado de uma corrente, duas metades de uma chave partida, um manto rasgado ou o vazamento em um odre. Contanto que a quebra ou rasgo não seja maior que 30 centímetros em qualquer dimensão, você o remenda, não deixando qualquer vestígio do dano anterior.",
    classes: ["Bardo", "Clérigo", "Druida", "Mago", "Feiticeiro"] // Artífice removido, pois não está na lista de classes
  },
  {
    name: "Chama Sagrada (Sacred Flame)",
    level: 0,
    school: "Evocação",
    castingTime: "1 ação",
    range: "18 metros",
    components: "V, S",
    duration: "Instantânea",
    description: "Radiação similar a uma chama descende sobre uma criatura que você cansa ver, dentro do alcance. O alvo deve ser bem sucedido num teste de resistência de Destreza ou sofrerá 1d8 de dano radiante. O alvo não recebe qualquer benefício de cobertura contra esse teste de resistência.",
    classes: ["Clérigo"]
  },
  {
    name: "Orientação (Guidance)",
    level: 0,
    school: "Adivinhação",
    castingTime: "1 ação",
    range: "Toque",
    components: "V, S",
    duration: "Concentração, até 1 minuto",
    description: "Você toca uma criatura voluntária. Uma vez, antes da magia acabar, o alvo pode rolar um d4 e adicionar o número rolado a um teste de habilidade à escolha dele. Ele pode rolar o dado antes ou depois de realizar o teste de habilidade. Então, a magia termina.",
    classes: ["Clérigo", "Druida"]
  },
  {
    name: "Rajada Mística (Eldritch Blast)",
    level: 0,
    school: "Evocação",
    castingTime: "1 ação",
    range: "36 metros",
    components: "V, S",
    duration: "Instantânea",
    description: "Um feixe de energia crepitante voa em direção a uma criatura dentro do alcance. Faça um ataque à distância com magia contra o alvo. Se atingir, o alvo sofre 1d10 de dano de energia. A magia cria mais de um feixe quando você alcança níveis mais altos: dois feixes no 5º nível, três feixes no 11º nível, e quatro feixes no 17º nível. Você pode direcionar os feixes para o mesmo alvo ou para diferentes. Faça uma jogada de ataque separada para cada feixe.",
    classes: ["Bruxo"]
  },
  {
    name: "Resistência (Resistance)",
    level: 0,
    school: "Abjuração",
    castingTime: "1 ação",
    range: "Toque",
    components: "V, S, M (um manto em miniatura)",
    duration: "Concentração, até 1 minuto",
    description: "Você toca uma criatura voluntária. Uma vez antes da magia acabar, o alvo pode rolar um d4 e adicionar o número rolado a um teste de resistência de sua escolha. Ele pode rolar o dado antes ou depois de fazer o teste de resistência. Então a magia acaba.",
    classes: ["Clérigo", "Druida"]
  },
  {
    name: "Espadanada Ácida (Acid Splash)",
    level: 0,
    school: "Conjuração",
    castingTime: "1 ação",
    range: "18 metros",
    components: "V, S",
    duration: "Instantânea",
    description: "Você arremessa uma bolha de ácido. Escolha uma ou duas criaturas que você possa ver dentro do alcance que estejam a até 1,5 metro uma da outra. Um alvo deve ser bem-sucedido em um teste de resistência de Destreza ou sofrerá 1d6 de dano de ácido.",
    classes: ["Mago", "Feiticeiro"]
  },
  {
    name: "Zombaria Viciosa (Vicious Mockery)",
    level: 0,
    school: "Encantamento",
    castingTime: "1 ação",
    range: "18 metros",
    components: "V",
    duration: "Instantânea",
    description: "Você desfere uma série de insultos atados com sutis encantamentos em uma criatura que você pode ver dentro do alcance. Se o alvo puder ouvi-lo (embora não precise entendê-lo), ele deve ser bem-sucedido em um teste de resistência de Sabedoria ou sofrerá 1d4 de dano psíquico e terá desvantagem na próxima jogada de ataque que fizer antes do final de seu próximo turno.",
    classes: ["Bardo"]
  },
  {
    name: "Druidismo (Druidcraft)",
    level: 0,
    school: "Transmutação",
    castingTime: "1 ação",
    range: "Pessoal (raio de 9m para alguns efeitos)",
    components: "V, S",
    duration: "Instantânea ou 1 rodada (ver descrição)",
    description: "Sussurrando para os espíritos da natureza, você cria um dos seguintes efeitos: Você cria um efeito sensorial minúsculo e inofensivo que prevê como será o clima em sua localização nas próximas 24 horas. O efeito pode se manifestar como um globo dourado para céu claro, uma nuvem para chuva, flocos de neve para neve, e assim por diante. Este efeito persiste por 1 rodada. Você instantaneamente faz uma flor desabrochar, uma semente brotar, ou uma folha amadurecer. Você cria um efeito sensorial instantâneo, como folhas caindo, um sopro de vento, o som de um pequeno animal, ou o leve odor de um gambá. O efeito deve caber em um cubo de 1,5 metro. Você instantaneamente acende ou apaga uma vela, uma tocha ou uma pequena fogueira.",
    classes: ["Druida"]
  },
  {
    name: "Chicote de Espinhos (Thorn Whip)",
    level: 0,
    school: "Transmutação",
    castingTime: "1 ação",
    range: "9 metros",
    components: "V, S, M (o caule de uma planta com espinhos)",
    duration: "Instantânea",
    description: "Você cria um longo chicote de vinhas coberto de espinhos que açoita ao seu comando em direção a uma criatura dentro do alcance. Faça um ataque à distância com magia contra o alvo. Se o ataque atingir, a criatura sofre 1d6 de dano perfurante, e se a criatura for Grande ou menor, você a puxa até 3 metros para perto de você.",
    classes: ["Druida"]
  },

  // 1st Level Spells
  {
    name: "Mísseis Mágicos (Magic Missile)",
    level: 1,
    school: "Evocação",
    castingTime: "1 ação",
    range: "36 metros",
    components: "V, S",
    duration: "Instantânea",
    description: "Você cria três dardos brilhantes de energia mística. Cada dardo atinge uma criatura, à sua escolha, que você possa ver, dentro do alcance. Um dardo causa 1d4 + 1 de dano de energia ao alvo. Os dardos atingem simultaneamente e você pode direcioná-los para um ou vários alvos.",
    classes: ["Mago", "Feiticeiro"]
  },
  {
    name: "Escudo Arcano (Shield)",
    level: 1,
    school: "Abjuração",
    castingTime: "1 reação, que você faz quando é atingido por um ataque ou alvo da magia mísseis mágicos",
    range: "Pessoal",
    components: "V, S",
    duration: "1 rodada",
    description: "Uma barreira de energia invisível aparece e protege você. Até o início do seu próximo turno, você recebe +5 de bônus na CA, incluindo contra o ataque que desencadeou a magia, e você não sofre dano de mísseis mágicos.",
    classes: ["Mago", "Feiticeiro"]
  },
  {
    name: "Sono (Sleep)",
    level: 1,
    school: "Encantamento",
    castingTime: "1 ação",
    range: "27 metros",
    components: "V, S, M (uma pitada de areia fina, pétalas de rosas ou um grilo)",
    duration: "1 minuto",
    description: "Essa magia põem as criaturas num entorpecimento mágico. Jogue 5d8; o total é a quantidade de pontos de vida de criaturas afetados pela magia. As criaturas dentro de 6 metros de um ponto que você escolher dentro do alcance são afetadas em ordem ascendente de seus pontos de vida atuais (ignorando criaturas inconscientes). Começando pela criatura com menos pontos de vida atuais, cada criatura afetada por esta magia cai inconsciente até a magia acabar, o adormecido sofrer dano, ou alguém usar uma ação para sacudir ou esbofetear o adormecido para acordá-lo. Subtraia os pontos de vida de cada criatura do total antes de passar para a próxima criatura com menos pontos de vida. Os pontos de vida de uma criatura devem ser iguais ou menores que o total restante para que ela seja afetada. Mortos-vivos e criaturas imunes a serem enfeitiçadas não são afetados por esta magia.",
    classes: ["Mago", "Bardo", "Feiticeiro"]
  },
  {
    name: "Armadura Arcana (Mage Armor)",
    level: 1,
    school: "Abjuração",
    castingTime: "1 ação",
    range: "Toque",
    components: "V, S, M (um pedaço de couro curado)",
    duration: "8 horas",
    description: "Você toca uma criatura voluntária que não esteja vestindo armadura e uma energia mágica protetora a envolve até a magia acabar. A CA base do alvo se torna 13 + o modificador de Destreza dele. A magia termina se o alvo vestir armadura ou se você dissipar a magia com uma ação.",
    classes: ["Mago", "Feiticeiro"]
  },
   {
    name: "Detectar Magia (Detect Magic)",
    level: 1,
    school: "Adivinhação (ritual)",
    castingTime: "1 ação",
    range: "Pessoal",
    components: "V, S",
    duration: "Concentração, até 10 minutos",
    description: "Pela duração, você sente a presença de magia a até 9 metros de você. Se você sentir magia dessa maneira, você pode usar sua ação para ver uma aura tênue em volta de qualquer criatura ou objeto visível na área que porte magia, e você aprende sua escola de magia, se houver. A magia pode penetrar a maioria das barreiras, mas é bloqueada por 1 pé de pedra, 1 polegada de metal comum, uma fina folha de chumbo, ou 3 pés de madeira ou terra.",
    classes: ["Mago", "Bardo", "Clérigo", "Druida", "Paladino", "Patrulheiro", "Feiticeiro", "Bruxo"]
  },
  {
    name: "Área Escorregadia (Grease)",
    level: 1,
    school: "Conjuração",
    castingTime: "1 ação",
    range: "18 metros",
    components: "V, S, M (um pouco de pele de porco ou manteiga)",
    duration: "1 minuto",
    description: "Graxa escorregadia cobre o solo em um quadrado de 3 metros centrado em um ponto, dentro do alcance, tornando essa área em terreno difícil pela duração. Quando a graxa aparece, cada criatura parada em sua área deve ser bem-sucedida em um teste de resistência de Destreza ou cairá. Uma criatura que entrar na área ou terminar seu turno lá deve também ser bem-sucedida em um teste de resistência de Destreza ou cairá.",
    classes: ["Mago"]
  },
  {
    name: "Alarme (Alarm)",
    level: 1,
    school: "Abjuração (ritual)",
    castingTime: "1 minuto",
    range: "9 metros",
    components: "V, S, M (um pequeno sino e um pequeno fio de prata)",
    duration: "8 horas",
    description: "Você coloca um alarme para intrusos desavisados. Escolha uma porta, uma janela, ou uma área dentro do alcance que não seja maior que um cubo de 6 metros. Até a magia acabar, um alarme alerta você sempre que uma criatura Miúda ou maior tocar ou entrar na área protegida. Quando você conjura a magia, você pode designar criaturas que não ativarão o alarme. Você também escolhe se o alarme é mental ou audível. Um alarme mental alerta você com um silvo em sua mente se você estiver a até 1,5 quilômetro da área protegida. Este silvo o acorda se você estiver dormindo. Um alarme audível produz o som de um sino de mão por 10 segundos dentro de 18 metros.",
    classes: ["Mago", "Patrulheiro"]
  },
  {
    name: "Curar Ferimentos (Cure Wounds)",
    level: 1,
    school: "Evocação",
    castingTime: "1 ação",
    range: "Toque",
    components: "V, S",
    duration: "Instantânea",
    description: "Uma criatura que você tocar recupera um número de pontos de vida igual a 1d8 + seu modificador de habilidade de conjuração. Essa magia não produz efeito em mortos-vivos ou construtos.",
    classes: ["Bardo", "Clérigo", "Druida", "Paladino", "Patrulheiro"]
  },
  {
    name: "Palavra Curativa (Healing Word)",
    level: 1,
    school: "Evocação",
    castingTime: "1 ação bônus",
    range: "18 metros",
    components: "V",
    duration: "Instantânea",
    description: "Uma criatura de sua escolha que você possa ver dentro do alcance recupera pontos de vida iguais a 1d4 + seu modificador de habilidade de conjuração. Esta magia não tem efeito em mortos-vivos ou construtos.",
    classes: ["Bardo", "Clérigo", "Druida"]
  },
  {
    name: "Bênção (Bless)",
    level: 1,
    school: "Encantamento",
    castingTime: "1 ação",
    range: "9 metros",
    components: "V, S, M (uma borrifada de água benta)",
    duration: "Concentração, até 1 minuto",
    description: "Você abençoa até três criaturas, à sua escolha, dentro do alcance. Sempre que um alvo realizar uma jogada de ataque ou um teste de resistência antes da magia acabar, o alvo pode rolar um d4 e adicionar o valor rolado ao ataque ou teste de resistência.",
    classes: ["Clérigo", "Paladino"]
  },
  {
    name: "Comando (Command)",
    level: 1,
    school: "Encantamento",
    castingTime: "1 ação",
    range: "18 metros",
    components: "V",
    duration: "1 rodada",
    description: "Você pronuncia uma palavra de comando para uma criatura que você possa ver dentro do alcance. O alvo deve ser bem sucedido num teste de resistência de Sabedoria ou seguirá o comando no próximo turno dele. A magia não produz efeito se o alvo for um morto-vivo, se ele não compreender seu idioma ou se seu comando for diretamente nocivo a ele. Exemplos de comando: Aproxime-se, Largue, Fuja, Deite-se, Pare.",
    classes: ["Clérigo", "Paladino", "Bruxo"]
  },
  {
    name: "Marca do Caçador (Hunter's Mark)",
    level: 1,
    school: "Adivinhação",
    castingTime: "1 ação bônus",
    range: "27 metros",
    components: "V",
    duration: "Concentração, até 1 hora",
    description: "Você escolhe uma criatura que possa ver dentro do alcance e a marca misticamente como sua presa. Até a magia acabar, você causa 1d6 de dano extra ao alvo sempre que o atingir com um ataque com arma e você tem vantagem em qualquer teste de Sabedoria (Percepção) ou Sabedoria (Sobrevivência) feito para encontrá-lo. Se o alvo cair a 0 pontos de vida antes desta magia acabar, você pode usar uma ação bônus em um turno subsequente seu para marcar uma nova criatura.",
    classes: ["Patrulheiro"]
  },
  {
    name: "Bom Fruto (Goodberry)",
    level: 1,
    school: "Transmutação",
    castingTime: "1 ação",
    range: "Toque",
    components: "V, S, M (um raminho de visco)",
    duration: "Instantânea",
    description: "Até dez bagas surgem em sua mão e são infundidas com magia pela duração. Uma criatura pode usar sua ação para comer uma baga. Comer uma baga restaura 1 ponto de vida, e a baga fornece sustento suficiente para um dia. As bagas perdem sua potência se não forem consumidas em 24 horas.",
    classes: ["Druida", "Patrulheiro"]
  },
  {
    name: "Amizade Animal (Animal Friendship)",
    level: 1,
    school: "Encantamento",
    castingTime: "1 ação",
    range: "9 metros",
    components: "V, S, M (um punhado de comida)",
    duration: "24 horas",
    description: "Esta magia permite que você convença uma besta que você não é uma ameaça. Escolha uma besta que você pode ver dentro do alcance. Ela deve ver e ouvir você. Se a Inteligência da besta for 4 ou maior, a magia falha. Caso contrário, a besta deve ser bem-sucedida em um teste de resistência de Sabedoria ou ficará enfeitiçada por você pela duração. Se você ou um de seus companheiros ferir o alvo, a magia termina.",
    classes: ["Bardo", "Druida", "Patrulheiro"]
  },
  {
    name: "Falar com Animais (Speak with Animals)",
    level: 1,
    school: "Adivinhação (ritual)",
    castingTime: "1 ação",
    range: "Pessoal",
    components: "V, S",
    duration: "10 minutos",
    description: "Você adquire a habilidade de compreender e se comunicar verbalmente com bestas pela duração. O conhecimento e consciência de muitas bestas é limitado por sua inteligência, mas, no mínimo, bestas podem dar informações sobre locais próximos e monstros, incluindo qualquer coisa que eles possam perceber ou que tenham percebido no dia passado. A seu critério, você pode tentar persuadir uma besta a fazer um pequeno favor para você.",
    classes: ["Bardo", "Druida", "Patrulheiro"]
  },
  {
    name: "Enfeitiçar Pessoa (Charm Person)",
    level: 1,
    school: "Encantamento",
    castingTime: "1 ação",
    range: "9 metros",
    components: "V, S",
    duration: "1 hora",
    description: "Você tenta enfeitiçar um humanoide que você possa ver dentro do alcance. Ele deve realizar um teste de resistência de Sabedoria, e recebe vantagem nesse teste se você ou seus companheiros estiverem lutando com ele. Se ele falhar no teste de resistência, ele fica enfeitiçado por você até a magia acabar ou até você ou seus companheiros fazerem qualquer coisa nociva para ele. A criatura enfeitiçada o considera um conhecido amigável. Quando a magia acabar, a criatura saberá que foi enfeitiçada por você.",
    classes: ["Bardo", "Druida", "Mago", "Feiticeiro", "Bruxo"]
  },
  {
    name: "Névoa Obscurecente (Fog Cloud)",
    level: 1,
    school: "Conjuração",
    castingTime: "1 ação",
    range: "36 metros",
    components: "V, S",
    duration: "Concentração, até 1 hora",
    description: "Você cria uma esfera de névoa de 6 metros de raio centrada em um ponto dentro do alcance. A esfera se espalha por cantos, e sua área é fortemente obscurecida. Ela dura pela duração ou até um vento de velocidade moderada ou maior (pelo menos 16 quilômetros por hora) a dispersar.",
    classes: ["Mago", "Feiticeiro", "Druida", "Patrulheiro"]
  },
  {
    name: "Salto (Jump)",
    level: 1,
    school: "Transmutação",
    castingTime: "1 ação",
    range: "Toque",
    components: "V, S, M (uma perna de gafanhoto)",
    duration: "1 minuto",
    description: "Você toca uma criatura. A distância de salto da criatura é triplicada até a magia acabar.",
    classes: ["Mago", "Feiticeiro", "Druida", "Patrulheiro"]
  },
  {
    name: "Raio Adoecente (Ray of Sickness)",
    level: 1,
    school: "Necromancia",
    castingTime: "1 ação",
    range: "18 metros",
    components: "V, S",
    duration: "Instantânea",
    description: "Um raio de energia esverdeada e enjoativa atinge uma criatura de sua escolha dentro do alcance. Faça um ataque à distância com magia contra o alvo. Se atingir, o alvo sofre 2d8 de dano de veneno e deve fazer um teste de resistência de Constituição. Em uma falha, ele também é envenenado até o final do seu próximo turno.",
    classes: ["Mago", "Feiticeiro"]
  },
  {
    name: "Onda Trovejante (Thunderwave)",
    level: 1,
    school: "Evocação",
    castingTime: "1 ação",
    range: "Pessoal (cubo de 4,5 metros)",
    components: "V, S",
    duration: "Instantânea",
    description: "Uma onda de força trovejante varre a partir de você. Cada criatura em um cubo de 4,5 metros originado de você deve fazer um teste de resistência de Constituição. Em uma falha, uma criatura sofre 2d8 de dano de trovão e é empurrada 3 metros para longe de você. Em um sucesso, a criatura sofre metade do dano e não é empurrada. Além disso, objetos desprotegidos que estão totalmente dentro da área de efeito são automaticamente empurrados 3 metros para longe de você pela magia, e a magia emite um estrondo trovejante audível a até 90 metros.",
    classes: ["Mago", "Bardo", "Feiticeiro", "Druida"]
  },
  {
    name: "Repreensão Infernal (Hellish Rebuke)",
    level: 1,
    school: "Evocação",
    castingTime: "1 reação, que você usa em resposta a sofrer dano de uma criatura dentro de 18 metros de você que você possa ver",
    range: "18 metros",
    components: "V, S",
    duration: "Instantânea",
    description: "Você aponta seu dedo, e a criatura que o feriu é momentaneamente cercada por chamas infernais. A criatura deve fazer um teste de resistência de Destreza. Ela sofre 2d10 de dano de fogo em uma falha, ou metade do dano em um sucesso.",
    classes: ["Bruxo", "Tiefling"] // Tiefling racial
  },
  {
    name: "Maldição (Hex)",
    level: 1,
    school: "Encantamento",
    castingTime: "1 ação bônus",
    range: "27 metros",
    components: "V, S, M (a pétala de um olho de um newt)",
    duration: "Concentração, até 1 hora",
    description: "Você coloca uma maldição em uma criatura que você pode ver dentro do alcance. Até a magia acabar, você causa um extra 1d6 de dano necrótico ao alvo sempre que o atinge com um ataque. Além disso, escolha uma habilidade quando você conjura a magia. O alvo tem desvantagem em testes de habilidade feitos com a habilidade escolhida. Se o alvo cair a 0 pontos de vida antes desta magia acabar, você pode usar uma ação bônus em um turno subsequente seu para amaldiçoar uma nova criatura. Uma magia remover maldição conjurada no alvo termina esta magia precocemente.",
    classes: ["Bruxo"]
  },
  {
    name: "Escudo da Fé (Shield of Faith)",
    level: 1,
    school: "Abjuração",
    castingTime: "1 ação bônus",
    range: "18 metros",
    components: "V, S, M (um pequeno pergaminho com um texto sagrado escrito nele)",
    duration: "Concentração, até 10 minutos",
    description: "Um campo cintilante aparece ao redor de uma criatura de sua escolha dentro do alcance, concedendo-lhe um bônus de +2 na CA pela duração.",
    classes: ["Clérigo", "Paladino"]
  },

  // 2nd Level Spells (NEW)
  {
    name: "Passo Nebuloso (Misty Step)",
    level: 2,
    school: "Conjuração",
    castingTime: "1 ação bônus",
    range: "Pessoal",
    components: "V",
    duration: "Instantânea",
    description: "Brevemente cercado por uma névoa prateada, você se teleporta até 9 metros para um espaço desocupado que você possa ver.",
    classes: ["Mago", "Feiticeiro", "Bruxo", "Druida (Círculo da Terra - Costa)"]
  },
  {
    name: "Imobilizar Pessoa (Hold Person)",
    level: 2,
    school: "Encantamento",
    castingTime: "1 ação",
    range: "18 metros",
    components: "V, S, M (uma peça pequena, reta de ferro)",
    duration: "Concentração, até 1 minuto",
    description: "Escolha um humanoide que você possa ver dentro do alcance. O alvo deve ser bem-sucedido em um teste de resistência de Sabedoria ou ficará paralisado pela duração. No final de cada um de seus turnos, o alvo pode fazer outro teste de resistência de Sabedoria. Em um sucesso, a magia termina.",
    classes: ["Bardo", "Clérigo", "Druida", "Mago", "Feiticeiro", "Bruxo"]
  },
  {
    name: "Invisibilidade (Invisibility)",
    level: 2,
    school: "Ilusão",
    castingTime: "1 ação",
    range: "Toque",
    components: "V, S, M (um cílio envolto em goma arábica)",
    duration: "Concentração, até 1 hora",
    description: "Uma criatura que você tocar se torna invisível até a magia terminar. Qualquer coisa que o alvo esteja vestindo ou carregando é invisível enquanto estiver na posse do alvo. A magia termina para um alvo se ele atacar ou conjurar uma magia.",
    classes: ["Bardo", "Mago", "Feiticeiro", "Bruxo"]
  },
  {
    name: "Raio Ardente (Scorching Ray)",
    level: 2,
    school: "Evocação",
    castingTime: "1 ação",
    range: "36 metros",
    components: "V, S",
    duration: "Instantânea",
    description: "Você cria três raios de fogo e os arremessa em alvos dentro do alcance. Você pode arremessá-los em um alvo ou em vários. Faça um ataque à distância com magia para cada raio. Se atingir, o alvo sofre 2d6 de dano de fogo.",
    classes: ["Mago", "Feiticeiro"]
  },
  {
    name: "Estilhaçar (Shatter)",
    level: 2,
    school: "Evocação",
    castingTime: "1 ação",
    range: "18 metros",
    components: "V, S, M (um pedaço de mica)",
    duration: "Instantânea",
    description: "Um som alto e agudo, dolorosamente intenso, surge em um ponto à sua escolha dentro do alcance. Cada criatura em uma esfera de 3 metros de raio centrada no ponto deve fazer um teste de resistência de Constituição. Uma criatura sofre 3d8 de dano trovejante em uma falha, ou metade do dano em um sucesso. Criaturas feitas de material inorgânico como pedra, cristal ou metal têm desvantagem no teste de resistência.",
    classes: ["Bardo", "Mago", "Feiticeiro", "Bruxo"]
  },
  {
    name: "Arma Espiritual (Spiritual Weapon)",
    level: 2,
    school: "Evocação",
    castingTime: "1 ação bônus",
    range: "18 metros",
    components: "V, S",
    duration: "1 minuto",
    description: "Você cria uma arma espectral flutuante dentro do alcance que dura pela duração ou até você conjurá-la novamente. Quando você conjura a magia, você pode fazer um ataque corpo-a-corpo com magia contra uma criatura a até 1,5 metro da arma. Se atingir, o alvo sofre dano de força igual a 1d8 + seu modificador de habilidade de conjuração. Como uma ação bônus no seu turno, você pode mover a arma até 6 metros e repetir o ataque.",
    classes: ["Clérigo"]
  },

  // 3rd Level Spells (NEW)
  {
    name: "Bola de Fogo (Fireball)",
    level: 3,
    school: "Evocação",
    castingTime: "1 ação",
    range: "45 metros",
    components: "V, S, M (uma pequena bola de guano de morcego e enxofre)",
    duration: "Instantânea",
    description: "Um raio brilhante de luz pisca do seu dedo indicador para um ponto que você escolher dentro do alcance e então floresce com um rugido baixo em uma explosão de chamas. Cada criatura em uma esfera de 6 metros de raio centrada no ponto deve fazer um teste de resistência de Destreza. Um alvo sofre 8d6 de dano de fogo em uma falha, ou metade do dano em um sucesso.",
    classes: ["Mago", "Feiticeiro"]
  },
  {
    name: "Relâmpago (Lightning Bolt)",
    level: 3,
    school: "Evocação",
    castingTime: "1 ação",
    range: "Pessoal (linha de 30 metros)",
    components: "V, S, M (um pouco de pele e um bastão de vidro ou cristal)",
    duration: "Instantânea",
    description: "Um relâmpago formando uma linha de 30 metros de comprimento e 1,5 metro de largura explode de você em uma direção à sua escolha. Cada criatura na linha deve fazer um teste de resistência de Destreza. Uma criatura sofre 8d6 de dano elétrico em uma falha, ou metade do dano em um sucesso.",
    classes: ["Mago", "Feiticeiro"]
  },
  {
    name: "Contra-mágica (Counterspell)",
    level: 3,
    school: "Abjuração",
    castingTime: "1 reação",
    range: "18 metros",
    components: "S",
    duration: "Instantânea",
    description: "Você tenta interromper uma criatura no processo de conjurar uma magia. Se a criatura estiver conjurando uma magia de 3º nível ou inferior, a magia falha e não tem efeito. Se estiver conjurando uma magia de 4º nível ou superior, faça um teste de habilidade usando sua habilidade de conjuração. A CD é 10 + o nível da magia. Em um sucesso, a magia da criatura falha.",
    classes: ["Mago", "Feiticeiro", "Bruxo"]
  },
  {
    name: "Dissipar Magia (Dispel Magic)",
    level: 3,
    school: "Abjuração",
    castingTime: "1 ação",
    range: "36 metros",
    components: "V, S",
    duration: "Instantânea",
    description: "Escolha uma criatura, objeto ou efeito mágico dentro do alcance. Qualquer magia de 3º nível ou inferior no alvo termina. Para cada magia de 4º nível ou superior no alvo, faça um teste de habilidade usando sua habilidade de conjuração. A CD é 10 + o nível da magia. Em um sucesso, a magia termina.",
    classes: ["Bardo", "Clérigo", "Druida", "Mago", "Feiticeiro", "Paladino", "Bruxo"]
  },
  {
    name: "Voo (Fly)",
    level: 3,
    school: "Transmutação",
    castingTime: "1 ação",
    range: "Toque",
    components: "V, S, M (uma pena de asa de qualquer ave)",
    duration: "Concentração, até 10 minutos",
    description: "Você toca uma criatura voluntária. O alvo ganha um deslocamento de voo de 18 metros pela duração. Quando a magia acabar, o alvo cai se ainda estiver no ar, a menos que possa parar a queda.",
    classes: ["Mago", "Feiticeiro", "Bruxo"]
  },
  {
    name: "Velocidade (Haste)",
    level: 3,
    school: "Transmutação",
    castingTime: "1 ação",
    range: "9 metros",
    components: "V, S, M (uma lasca de raiz de alcaçuz)",
    duration: "Concentração, até 1 minuto",
    description: "Escolha uma criatura voluntária que você possa ver dentro do alcance. Até a magia acabar, o deslocamento do alvo é dobrado, ele ganha um bônus de +2 na CA, tem vantagem em testes de resistência de Destreza e ganha uma ação adicional em cada um de seus turnos. Essa ação pode ser usada apenas para realizar as ações de Ataque (um ataque com arma apenas), Disparada, Desengajar, Esconder ou Usar um Objeto. Quando a magia acaba, o alvo não pode se mover ou realizar ações até depois do seu próximo turno, pois uma onda de letargia o percorre.",
    classes: ["Mago", "Feiticeiro"]
  },
  {
    name: "Revivificar (Revivify)",
    level: 3,
    school: "Necromancia",
    castingTime: "1 ação",
    range: "Toque",
    components: "V, S, M (diamantes no valor de 300 po, que a magia consome)",
    duration: "Instantânea",
    description: "Você toca uma criatura que tenha morrido no último minuto. Essa criatura retorna à vida com 1 ponto de vida. Essa magia não pode retornar à vida uma criatura que tenha morrido de velhice, nem pode restaurar quaisquer partes do corpo perdidas.",
    classes: ["Clérigo", "Paladino", "Patrulheiro (Tasha)"]
  },
  {
    name: "Espíritos Guardiões (Spirit Guardians)",
    level: 3,
    school: "Conjuração",
    castingTime: "1 ação",
    range: "Pessoal (4,5 metros de raio)",
    components: "V, S, M (um símbolo sagrado)",
    duration: "Concentração, até 10 minutos",
    description: "Você convoca espíritos para protegê-lo. Eles flutuam ao seu redor a uma distância de 4,5 metros pela duração. Quando você conjura essa magia, você pode designar qualquer número de criaturas que você possa ver para serem ignoradas por ela. A área afetada é considerada terreno difícil para inimigos. Quando uma criatura entra na área pela primeira vez em um turno ou começa seu turno nela, ela deve fazer um teste de resistência de Sabedoria. Em uma falha, a criatura sofre 3d8 de dano radiante (se você for bom ou neutro) ou necrótico (se você for mau). Em um sucesso, a criatura sofre metade do dano.",
    classes: ["Clérigo"]
  }
];

export const ALL_SPELLS_MAP: Record<string, Spell> = ALL_AVAILABLE_SPELLS.reduce((acc, spell) => {
    acc[spell.name] = spell;
    return acc;
}, {} as Record<string, Spell>);

export const getCantripsByClass = (className: string): Spell[] => {
  return ALL_AVAILABLE_SPELLS.filter(spell => spell.level === 0 && spell.classes.includes(className));
};

export const getSpellsByClassAndLevel = (className: string, level: number): Spell[] => {
  return ALL_AVAILABLE_SPELLS.filter(spell => spell.level === level && spell.classes.includes(className));
};
