
import { RacialFeatureDefinition, FeatureChoiceDefinition, DRAGON_ANCESTRY_CHOICES } from './types'; 
import { ALL_AVAILABLE_SPELLS } from './spells'; 

const WIZARD_CANTRIPS_FOR_HIGH_ELF: FeatureChoiceDefinition[] = ALL_AVAILABLE_SPELLS
    .filter(spell => spell.classes.includes("Mago") && spell.level === 0)
    .map(spell => ({ value: spell.name, label: spell.name, description: spell.description }));

// --- Shared Elf Features ---
const ELF_DARKVISION: RacialFeatureDefinition = { id: "elf_darkvision", name: "Visão no Escuro (Elfo)", description: "Acostumado a florestas crepusculares e ao céu noturno, você tem visão superior em condições de escuridão e penumbra. Você enxerga na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse na penumbra. Você não pode discernir cores no escuro, apenas tons de cinza.", type: 'auto' };
const ELF_KEEN_SENSES: RacialFeatureDefinition = { id: "elf_keen_senses", name: "Sentidos Aguçados", description: "Você tem proficiência na perícia Percepção.", type: 'auto', grantsSkillProficiency: 'perception' };
const ELF_FEY_ANCESTRY: RacialFeatureDefinition = { id: "elf_fey_ancestry", name: "Ancestralidade Feérica", description: "Você possui vantagem em testes de resistência contra ser enfeitiçado, e magia não pode colocá-lo para dormir.", type: 'auto' };
const ELF_TRANCE: RacialFeatureDefinition = { id: "elf_trance", name: "Transe", description: "Elfos não precisam dormir. Ao invés disso, eles meditam profundamente, permanecendo semiconscientes, durante 4 horas por dia. Depois de descansar dessa forma, você ganha os mesmos benefícios que um humano depois de 8 horas de sono.", type: 'auto' };
const ELF_WEAPON_TRAINING: RacialFeatureDefinition = { id: "elf_weapon_training", name: "Treinamento Élfico em Armas", description: "Você tem proficiência com espadas longas, espadas curtas, arcos longos e arcos curtos.", type: 'auto' };

// --- Shared Dwarf Features ---
const DWARF_DARKVISION: RacialFeatureDefinition = { id: "dwarf_darkvision", name: "Visão no Escuro (Anão)", description: "Acostumado à vida subterrânea, você tem visão superior em condições de escuridão e penumbra. Você enxerga na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse na penumbra. Você não pode discernir cores no escuro, apenas tons de cinza.", type: 'auto' };
const DWARF_RESILIENCE: RacialFeatureDefinition = { id: "dwarf_resilience", name: "Resiliência Anã", description: "Você possui vantagem em testes de resistência contra veneno e resistência a dano de veneno.", type: 'auto' };
const DWARF_COMBAT_TRAINING: RacialFeatureDefinition = { id: "dwarf_combat_training", name: "Treinamento Anão em Combate", description: "Você tem proficiência com machados de batalha, machadinhas, martelos leves e martelos de guerra.", type: 'auto' };
const DWARF_TOOL_PROFICIENCY_CHOICE: FeatureChoiceDefinition[] = [
    {value: "ferreiro", label:"Ferramentas de Ferreiro"}, 
    {value:"cervejeiro", label:"Suprimentos de Cervejeiro"}, 
    {value:"pedreiro", label:"Ferramentas de Pedreiro"}
];
const DWARF_TOOL_PROFICIENCY: RacialFeatureDefinition = { 
    id: "dwarf_tool_proficiency", name: "Proficiência com Ferramentas de Anão", 
    description: "Você ganha proficiência com um tipo de ferramenta de artesão à sua escolha: ferramentas de ferreiro, de cervejeiro ou de pedreiro.", 
    type: 'choice', 
    choices: DWARF_TOOL_PROFICIENCY_CHOICE,
    maxChoices: 1,
};
const DWARF_STONECUNNING: RacialFeatureDefinition = { id: "dwarf_stonecunning", name: "Afinidade com Rochas", description: "Sempre que você realizar um teste de Inteligência (História) relacionado à origem de um trabalho em pedra, você é considerado proficiente na perícia História e adiciona o dobro do seu bônus de proficiência ao teste, ao invés do seu bônus de proficiência normal.", type: 'auto' };

// --- Hill Dwarf Racial Features ---
const HILL_DWARF_RACIAL_FEATURES: RacialFeatureDefinition[] = [
  DWARF_DARKVISION, DWARF_RESILIENCE, DWARF_COMBAT_TRAINING, DWARF_TOOL_PROFICIENCY, DWARF_STONECUNNING,
  {
    id: "hill_dwarf_toughness", name: "Robustez Anã (Anão da Colina)",
    description: "Seu máximo de pontos de vida aumenta em 1, e aumenta em 1 novamente cada vez que você ganha um nível.",
    type: 'auto',
  }
];
// --- Mountain Dwarf Racial Features ---
const MOUNTAIN_DWARF_RACIAL_FEATURES: RacialFeatureDefinition[] = [
  DWARF_DARKVISION, DWARF_RESILIENCE, DWARF_COMBAT_TRAINING, DWARF_TOOL_PROFICIENCY, DWARF_STONECUNNING,
  { id: "mountain_dwarf_armor_training", name: "Treinamento Anão em Armaduras (Anão da Montanha)", description: "Você tem proficiência em armaduras leves e médias.", type: 'auto'}
];


// --- High Elf Racial Features ---
const HIGH_ELF_RACIAL_FEATURES: RacialFeatureDefinition[] = [
  ELF_DARKVISION, ELF_KEEN_SENSES, ELF_FEY_ANCESTRY, ELF_TRANCE, ELF_WEAPON_TRAINING,
  {
    id: "high_elf_cantrip", name: "Truque de Alto Elfo",
    description: "Você conhece um truque à sua escolha da lista de truques de mago. Inteligência é sua habilidade de conjuração para ele.",
    type: 'choice',
    selectionPrompt: "Escolha um Truque de Mago:",
    choices: WIZARD_CANTRIPS_FOR_HIGH_ELF,
    maxChoices: 1,
  },
  {
    id: "high_elf_extra_language", name: "Idioma Adicional (Alto Elfo)",
    description: "Você pode falar, ler e escrever um idioma adicional à sua escolha.",
    type: 'auto', 
  }
];

// --- Wood Elf Racial Features ---
const WOOD_ELF_RACIAL_FEATURES: RacialFeatureDefinition[] = [
  ELF_DARKVISION, ELF_KEEN_SENSES, ELF_FEY_ANCESTRY, ELF_TRANCE, ELF_WEAPON_TRAINING,
  {
    id: "wood_elf_fleet_of_foot", name: "Pés Ligeiros (Elfo da Floresta)",
    description: "Seu deslocamento base de caminhada aumenta para 10,5 metros.",
    type: 'auto',
  },
  {
    id: "wood_elf_mask_of_the_wild", name: "Máscara da Natureza",
    description: "Você pode tentar se esconder mesmo quando você está apenas levemente obscurecido por folhagem, chuva forte, neve caindo, névoa ou outro fenômeno natural.",
    type: 'auto',
  }
];

// Drow Elf Racial Features
const DROW_ELF_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    { ...ELF_DARKVISION, id: "drow_superior_darkvision", name: "Visão no Escuro Superior (Drow)", description: "Sua visão no escuro tem alcance de 36 metros." },
    ELF_KEEN_SENSES, ELF_FEY_ANCESTRY, ELF_TRANCE,
    { id: "drow_sunlight_sensitivity", name: "Sensibilidade à Luz Solar", description: "Você possui desvantagem nas jogadas de ataque e testes de Sabedoria (Percepção) relacionados a visão quando você, o alvo do seu ataque, ou qualquer coisa que você está tentando perceber, esteja sob luz solar direta.", type: 'auto' },
    { id: "drow_drow_magic", name: "Magia Drow", description: "Você conhece o truque globos de luz. Quando você alcança o 3° nível, você pode conjurar a magia fogo das fadas. Quando você alcança o 5° nível, você pode conjurar escuridão. Você precisa terminar um descanso longo para poder conjurar as magias desse traço novamente. Carisma é sua habilidade chave para conjurar essas magias.", type: 'auto' }, 
    { id: "drow_weapon_training", name: "Treinamento Drow em Armas", description: "Você tem proficiência com rapieiras, espadas curtas e bestas de mão.", type: 'auto' },
];

// Sea Elf Racial Features
const SEA_ELF_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    { ...ELF_DARKVISION }, ELF_KEEN_SENSES, ELF_FEY_ANCESTRY, ELF_TRANCE,
    { id: "sea_elf_swim", name: "Filho do Mar", description: "Você tem um deslocamento de natação de 9 metros e pode respirar ar e água.", type: 'auto' },
    { id: "sea_elf_friend_of_sea", name: "Amigo do Mar", description: "Usando gestos e sons, você pode comunicar ideias simples a qualquer besta que tenha um deslocamento de natação, inato ou não.", type: 'auto' },
    { id: "sea_elf_weapon_training", name: "Treinamento do Mar", description: "Você tem proficiência com lanças, tridentes, bestas leves e redes.", type: 'auto' }
];

// Shadar-Kai Racial Features
const SHADAR_KAI_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    { ...ELF_DARKVISION }, ELF_KEEN_SENSES, ELF_FEY_ANCESTRY, ELF_TRANCE,
    { id: "shadar_kai_necrotic_resistance", name: "Resistência Necrótica", description: "Você tem resistência a dano necrótico.", type: 'auto' },
    { id: "shadar_kai_blessing_raven_queen", name: "Bênção da Rainha de Rapina", description: "Como uma ação bônus, você pode se teleportar magicamente até 9 metros para um espaço desocupado que você possa ver. Você pode usar este traço um número de vezes igual ao seu bônus de proficiência, e recupera todos os usos gastos quando termina um descanso longo. A partir do 3º nível, você também ganha resistência a todo dano quando se teleporta usando este traço. A resistência dura até o início do seu próximo turno.", type: 'auto' }
];


// --- Shared Halfling Features ---
const HALFLING_LUCKY: RacialFeatureDefinition = { id: "halfling_lucky", name: "Sortudo", description: "Quando você obtiver um 1 natural em uma jogada de ataque, teste de habilidade ou teste de resistência, você pode jogar de novo o dado e deve utilizar o novo resultado.", type: 'auto' };
const HALFLING_BRAVE: RacialFeatureDefinition = { id: "halfling_brave", name: "Bravura", description: "Você tem vantagem em testes de resistência contra ficar amedrontado.", type: 'auto' };
const HALFLING_NIMBLENESS: RacialFeatureDefinition = { id: "halfling_nimbleness", name: "Agilidade Halfling", description: "Você pode mover-se através do espaço de qualquer criatura que for de um tamanho maior que o seu.", type: 'auto' };

const LIGHTFOOT_HALFLING_RACIAL_FEATURES: RacialFeatureDefinition[] = [
  HALFLING_LUCKY, HALFLING_BRAVE, HALFLING_NIMBLENESS,
  {
    id: "lightfoot_halfling_naturally_stealthy", name: "Furtividade Natural (Halfling Pés Leves)",
    description: "Você pode tentar se esconder mesmo quando possuir apenas a cobertura de uma criatura que for no mínimo um tamanho maior que o seu.",
    type: 'auto',
  }
];
const STOUT_HALFLING_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    HALFLING_LUCKY, HALFLING_BRAVE, HALFLING_NIMBLENESS,
    { id: "stout_halfling_resilience", name: "Resiliência dos Robustos (Halfling Robusto)", description: "Você tem vantagem em testes de resistência contra veneno e tem resistência contra dano de veneno.", type: 'auto' }
];

// --- Dragonborn Racial Features ---
const DRAGONBORN_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    {
        id: "dragonborn_draconic_ancestry", name: "Ancestralidade Dracônica",
        description: "Você possui ancestralidade dracônica. Escolha um tipo de dragão da lista. Sua arma de sopro e resistência a dano são determinadas pelo tipo de dragão, como mostrado na tabela (a descrição da sua escolha mostrará os detalhes).",
        type: 'choice',
        selectionPrompt: "Escolha sua Ancestralidade Dracônica:",
        choices: DRAGON_ANCESTRY_CHOICES,
        maxChoices: 1,
    },
    {
        id: "dragonborn_breath_weapon", name: "Arma de Sopro",
        description: "Você pode usar sua ação para exalar energia destrutiva. Sua ancestralidade dracônica determina o tamanho, forma e tipo de dano da exalação. Quando você usa sua arma de sopro, cada criatura na área da exalação deve fazer um teste de resistência, o tipo do qual é determinado por sua ancestralidade. A CD para este teste de resistência é 8 + seu modificador de Constituição + seu bônus de proficiência. Uma criatura sofre 2d6 de dano em uma falha no teste, e metade do dano em um sucesso. O dano aumenta para 3d6 no 6° nível, 4d6 no 11° nível e 5d6 no 16° nível. Depois de usar sua arma de sopro, você não pode usá-la novamente até completar um descanso curto ou longo.",
        type: 'auto', 
    },
    {
        id: "dragonborn_damage_resistance", name: "Resistência a Dano",
        description: "Você possui resistência ao tipo de dano associado à sua ancestralidade dracônica.",
        type: 'auto', 
    }
];

const TIEFLING_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    {
        id: "tiefling_darkvision", name: "Visão no Escuro (Tiefling)",
        description: "Graças à sua herança infernal, você tem visão superior em condições de escuridão e penumbra. Você enxerga na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse na penumbra. Você não pode discernir cores no escuro, apenas tons de cinza.",
        type: 'auto',
    },
    {
        id: "tiefling_hellish_resistance", name: "Resistência Infernal",
        description: "Você possui resistência a dano de fogo.",
        type: 'auto',
    },
    {
        id: "tiefling_infernal_legacy", name: "Legado Infernal",
        description: "Você conhece o truque Taumaturgia. Quando você alcança o 3º nível, você pode conjurar a magia Repreensão Infernal como uma magia de 2º nível uma vez com esta característica e recupera a habilidade de fazê-lo quando termina um descanso longo. Quando você alcança o 5º nível, você pode conjurar a magia Escuridão uma vez com esta característica e recupera a habilidade de fazê-lo quando termina um descanso longo. Carisma é sua habilidade de conjuração para essas magias.",
        type: 'auto', 
    }
];

// --- Human Racial Features ---
const HUMAN_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    { id: "human_ability_score_increase_all", name: "Incremento no Valor de Habilidade (Todos)", description: "Todos os seus valores de habilidade aumentam em 1.", type: 'auto' },
    { id: "human_languages_common_extra", name: "Idiomas (Humano)", description: "Você pode falar, ler e escrever Comum e um idioma adicional de sua escolha.", type: 'auto'}
];

// --- Shared Gnome Features ---
const GNOME_DARKVISION: RacialFeatureDefinition = { id: "gnome_darkvision", name: "Visão no Escuro (Gnomo)", description: "Acostumado à vida subterrânea, você tem visão superior em condições de escuridão e penumbra...", type: 'auto' };
const GNOME_CUNNING: RacialFeatureDefinition = { id: "gnome_cunning", name: "Esperteza Gnômica", description: "Você possui vantagem em todos os testes de resistência de Inteligência, Sabedoria e Carisma contra magia.", type: 'auto' };

// --- Forest Gnome Racial Features ---
const FOREST_GNOME_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    GNOME_DARKVISION, GNOME_CUNNING,
    { id: "forest_gnome_natural_illusionist", name: "Ilusionista Nato", description: "Você conhece o truque ilusão menor. Inteligência é a sua habilidade usada para conjurá-la.", type: 'auto' },
    { id: "forest_gnome_speak_with_small_beasts", name: "Falar com Bestas Pequenas", description: "Através de sons e gestos, você pode comunicar ideias simples para Bestas pequenas ou menores. Gnomos da floresta amam os animais e normalmente possuem esquilos, doninhas, coelhos, toupeiras, pica-paus e outras criaturas como amados animais de estimação.", type: 'auto' }
];

// --- Rock Gnome Racial Features ---
const ROCK_GNOME_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    GNOME_DARKVISION, GNOME_CUNNING,
    { id: "rock_gnome_artificers_lore", name: "Conhecimento de Artífice", description: "Toda vez que você fizer um teste de Inteligência (História) relacionado a itens mágicos, objetos alquímicos ou mecanismos tecnológicos, você pode adicionar o dobro do seu bônus de proficiência, ao invés de qualquer bônus de proficiência que você normalmente use.", type: 'auto' },
    { id: "rock_gnome_tinker", name: "Engenhoqueiro", description: "Você possui proficiência com ferramentas de artesão (ferramentas de engenhoqueiro). Usando essas ferramentas, você pode gastar 1 hora e 10 po em materiais para construir um mecanismo Miúdo.", type: 'auto' } 
];

// --- Deep Gnome Racial Features ---
const DEEP_GNOME_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    { ...GNOME_DARKVISION, description: "Visão no escuro superior de 36 metros." },
    GNOME_CUNNING,
    { id: "deep_gnome_stone_camouflage", name: "Camuflagem na Pedra", description: "Você tem vantagem em testes de Destreza (Furtividade) para se esconder em terrenos rochosos.", type: 'auto' }
];

// --- Half-Elf Racial Features ---
const HALF_ELF_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    { id: "half_elf_darkvision", name: "Visão no Escuro (Meio-Elfo)", description: "Graças ao seu sangue élfico, você tem visão superior em condições de escuridão e penumbra...", type: 'auto' },
    ELF_FEY_ANCESTRY, 
    { id: "half_elf_skill_versatility", name: "Versatilidade em Perícia", description: "Você ganha proficiência em duas perícias, à sua escolha (selecione abaixo).", type: 'auto' } 
];

// --- Half-Orc Racial Features ---
const HALF_ORC_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    { id: "half_orc_darkvision", name: "Visão no Escuro (Meio-Orc)", description: "Graças ao seu sangue orc, você tem visão superior em condições de escuridão e penumbra...", type: 'auto' },
    { id: "half_orc_menacing", name: "Ameaçador", description: "Você adquire proficiência na perícia Intimidação.", type: 'auto', grantsSkillProficiency: 'intimidation' },
    { id: "half_orc_relentless_endurance", name: "Resistência Implacável", description: "Quando você é reduzido a 0 pontos de vida mas não é completamente morto, você pode voltar para 1 ponto de vida. Você não pode usar essa característica novamente até completar um descanso longo.", type: 'auto' },
    { id: "half_orc_savage_attacks", name: "Ataques Selvagens", description: "Quando você atinge um ataque crítico com uma arma corpo-a-corpo, você pode rolar um dos dados de dano da arma mais uma vez e adicioná-lo ao dano extra causado pelo acerto crítico.", type: 'auto' }
];

// --- Anadino Racial Features ---
const ANADINO_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    {
        id: "anadino_asi", name: "Aumento no Valor de Habilidade (Anadino)",
        description: "+2 em Destreza e +1 em Carisma (ou vice-versa, ajuste manualmente se necessário). Crescem rápido (adultos aos 5), vivem até 60 anos.",
        type: 'auto'
    },
    {
        id: "anadino_speed", name: "Deslocamento e Natação",
        description: "Seu deslocamento base de caminhada é de 9 metros. Você também tem um deslocamento de natação de 9 metros.",
        type: 'auto'
    },
    {
        id: "anadino_waterproof_feathers", name: "Penas Impermeáveis",
        description: "Você tem vantagem em testes e salvaguardas contra ficar molhado atrapalhando ações (como terreno escorregadio, lama etc).",
        type: 'auto'
    },
    {
        id: "anadino_sharp_peck", name: "Bicada Afiada",
        description: "Você tem um ataque natural com o bico. Dano: 1d4 perfurante. Usa Destreza ou Força. Conta como ataque desarmado.",
        type: 'auto'
    },
    {
        id: "anadino_splash_jump", name: "Salto Espirrado",
        description: "Você pode usar uma ação bônus para dar um salto de até 3 metros em qualquer direção, desde que tenha espaço para bater as patas no chão.",
        type: 'auto'
    },
    {
        id: "anadino_languages", name: "Línguas (Anadino)",
        description: "Você fala Comum, Élfico e Anadino (uma língua cheia de guinchos, grasnadas e insultos involuntários).",
        type: 'auto'
    }
];

// --- Aasimar Racial Features ---
const AASIMAR_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    { id: "aasimar_darkvision", name: "Visão no Escuro (Aasimar)", description: "Graças à sua herança celestial, você tem visão superior em condições de escuridão e penumbra.", type: 'auto' },
    { id: "aasimar_celestial_resistance", name: "Resistência Celestial", description: "Você tem resistência a dano necrótico e radiante.", type: 'auto' },
    { id: "aasimar_healing_hands", name: "Mãos Curativas", description: "Com uma ação, você pode tocar uma criatura e fazer com que ela recupere um número de pontos de vida igual ao seu nível. Uma vez que você use essa característica, você não pode usá-la de novo até terminar um descanso longo.", type: 'auto' },
    { id: "aasimar_light_bearer", name: "Portador da Luz", description: "Você conhece o truque luz. Carisma é sua habilidade de conjuração para ele.", type: 'auto' }
];

// --- Goliath Racial Features ---
const GOLIATH_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    { id: "goliath_natural_athlete", name: "Atleta Natural", description: "Você tem proficiência na perícia Atletismo.", type: 'auto', grantsSkillProficiency: 'athletics' },
    { id: "goliath_stones_endurance", name: "Resistência da Pedra", description: "Você pode focar em si mesmo para ocasionalmente ignorar ferimentos. Quando você sofre dano, você pode usar sua reação para rolar um d12. Adicione seu modificador de Constituição ao número rolado e reduza o dano por esse total. Após usar essa característica, você não pode usá-la de novo até terminar um descanso longo.", type: 'auto' },
    { id: "goliath_powerful_build", name: "Compleição Poderosa", description: "Você conta como uma categoria de tamanho maior para determinar sua capacidade de carga e o peso que você pode empurrar, arrastar ou erguer.", type: 'auto' },
    { id: "goliath_mountain_born", name: "Nascido nas Montanhas", description: "Você está aclimatado a grandes altitudes, incluindo elevações acima de 6.000 metros. Você também é naturalmente adaptado a climas frios.", type: 'auto' }
];

// --- Tabaxi Racial Features ---
const TABAXI_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    { id: "tabaxi_darkvision", name: "Visão no Escuro (Tabaxi)", description: "Você tem a visão de um gato no escuro.", type: 'auto' },
    { id: "tabaxi_feline_agility", name: "Agilidade Felina", description: "Seus reflexos e agilidade permitem que você se mova com uma explosão de velocidade. Quando você se move no seu turno em combate, você pode dobrar seu deslocamento até o final do turno. Uma vez que você use essa característica, você não pode usá-la de novo até se mover 0 metros em um de seus turnos.", type: 'auto' },
    { id: "tabaxi_cats_claws", name: "Garras de Gato", description: "Por causa de suas garras, você tem um deslocamento de escalada de 6 metros. Além disso, suas garras são armas naturais, que você pode usar para fazer ataques desarmados. Se você acertar com elas, você causa dano cortante igual a 1d4 + seu modificador de Força, ao invés do dano de concussão normal de um ataque desarmado.", type: 'auto' },
    { id: "tabaxi_cats_talent", name: "Talento Felino", description: "Você tem proficiência nas perícias Percepção e Furtividade.", type: 'auto' } 
];

// --- Aarakocra ---
const AARAKOCRA_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    { id: "aarakocra_flight", name: "Voo", description: "Você tem um deslocamento de voo de 15 metros. Para usar esse deslocamento, você não pode estar vestindo armadura média ou pesada.", type: 'auto' },
    { id: "aarakocra_talons", name: "Garras", description: "Suas garras são armas naturais, que você pode usar para fazer ataques desarmados. Se você acertar com elas, você causa dano cortante igual a 1d4 + seu modificador de Força, ao invés do dano de concussão normal de um ataque desarmado.", type: 'auto' }
];

// --- Changeling ---
const CHANGELING_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    { id: "changeling_shapechanger", name: "Metamorfo", description: "Como uma ação, você pode mudar sua aparência e voz. Você determina os detalhes das mudanças, incluindo sua coloração, comprimento do cabelo e sexo. Você também pode ajustar sua altura e peso, mas não tanto a ponto de seu tamanho mudar. Suas estatísticas de jogo não mudam. Você volta à sua forma verdadeira se morrer.", type: 'auto' },
    { id: "changeling_instincts", name: "Instintos de Metamorfo", description: "Você ganha proficiência em duas das seguintes perícias à sua escolha: Enganação, Intimidação, Intuição e Persuasão.", type: 'auto' }
];

// --- Duergar ---
const DUERGAR_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    { id: "duergar_darkvision", name: "Visão no Escuro Superior (Duergar)", description: "Sua visão no escuro tem alcance de 36 metros.", type: 'auto' },
    { id: "duergar_resilience", name: "Resiliência Duergar", description: "Você tem vantagem em testes de resistência contra ilusões e contra ser enfeitiçado ou paralisado.", type: 'auto' },
    { id: "duergar_magic", name: "Magia Duergar", description: "A partir do 3º nível, você pode conjurar a magia aumentar/reduzir em si mesmo uma vez com este traço, usando apenas a opção de aumentar do feitiço. A partir do 5º nível, você pode conjurar a magia invisibilidade em si mesmo uma vez com este traço. Você recupera a capacidade de conjurar essas magias com este traço quando termina um descanso longo. Inteligência é sua habilidade de conjuração para essas magias.", type: 'auto' },
    { id: "duergar_sunlight_sensitivity", name: "Sensibilidade à Luz Solar", description: "Você tem desvantagem nas jogadas de ataque e testes de Sabedoria (Percepção) que dependem da visão quando você, o alvo do seu ataque ou o que quer que você esteja tentando perceber está sob luz solar direta.", type: 'auto' }
];

// --- Eladrin ---
const ELADRIN_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    { ...ELF_DARKVISION }, ELF_KEEN_SENSES, ELF_FEY_ANCESTRY, ELF_TRANCE,
    { id: "eladrin_fey_step", name: "Passo Feérico", description: "Como uma ação bônus, você pode se teleportar magicamente até 9 metros para um espaço desocupado que você possa ver. Depois de usar essa característica, você não pode fazê-lo novamente até terminar um descanso curto ou longo.", type: 'auto' }
];

// --- Fairy ---
const FAIRY_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    { id: "fairy_flight", name: "Voo Feérico", description: "Você tem um deslocamento de voo igual ao seu deslocamento de caminhada. Você não pode usar esse deslocamento de voo se estiver vestindo armadura média ou pesada.", type: 'auto' },
    { id: "fairy_magic", name: "Magia das Fadas", description: "Você conhece o truque druidismo. A partir do 3º nível, você pode conjurar a magia fogo das fadas com este traço. A partir do 5º nível, você pode conjurar a magia aumentar/reduzir com este traço. Uma vez que você conjure fogo das fadas ou aumentar/reduzir com este traço, você não pode conjurar essa magia com ele novamente até terminar um descanso longo.", type: 'auto' }
];

// --- Firbolg ---
const FIRBOLG_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    { id: "firbolg_magic", name: "Magia Firbolg", description: "Você pode conjurar detectar magia e disfarçar-se com este traço, usando Sabedoria como sua habilidade de conjuração. Depois de conjurar qualquer uma dessas magias com este traço, você não pode conjurar essa magia com ele novamente até terminar um descanso curto ou longo.", type: 'auto' },
    { id: "firbolg_hidden_step", name: "Passo Oculto", description: "Como uma ação bônus, você pode ficar magicamente invisível até o início do seu próximo turno ou até atacar, fazer uma jogada de dano ou forçar alguém a fazer um teste de resistência. Você pode usar este traço uma vez por descanso curto ou longo.", type: 'auto' },
    { id: "firbolg_powerful_build", name: "Compleição Poderosa", description: "Você conta como uma categoria de tamanho maior para determinar sua capacidade de carga e o peso que você pode empurrar, arrastar ou erguer.", type: 'auto' },
    { id: "firbolg_speech_beast_leaf", name: "Fala da Besta e da Folha", description: "Você tem a habilidade de comunicar de maneira limitada com bestas e plantas. Eles podem entender o significado de suas palavras, embora você não tenha nenhuma habilidade especial para entendê-los em troca.", type: 'auto' }
];

// --- Genasi ---
const GENASI_AIR_FEATURES: RacialFeatureDefinition[] = [
    { id: "genasi_unending_breath", name: "Fôlego Interminável", description: "Você pode prender a respiração indefinidamente enquanto não estiver incapacitado.", type: 'auto' },
    { id: "genasi_mingle_wind", name: "Misturar-se ao Vento", description: "Você pode conjurar a magia levitação uma vez com este traço, não exigindo componentes materiais, e você recupera a capacidade de conjurá-la dessa maneira quando termina um descanso longo. Constituição é sua habilidade de conjuração para esta magia.", type: 'auto' }
];
const GENASI_EARTH_FEATURES: RacialFeatureDefinition[] = [
    { id: "genasi_earth_walk", name: "Caminhada na Terra", description: "Você pode se mover através de terreno difícil feito de terra ou pedra sem gastar movimento extra.", type: 'auto' },
    { id: "genasi_merge_stone", name: "Fundir-se à Pedra", description: "Você pode conjurar a magia passos sem pegadas uma vez com este traço, não exigindo componentes materiais, e você recupera a capacidade de conjurá-la dessa maneira quando termina um descanso longo. Constituição é sua habilidade de conjuração para esta magia.", type: 'auto' }
];
const GENASI_FIRE_FEATURES: RacialFeatureDefinition[] = [
    { id: "genasi_darkvision", name: "Visão no Escuro (Genasi do Fogo)", description: "Você pode ver na penumbra a até 18 metros de você como se fosse luz plena, e na escuridão como se fosse penumbra.", type: 'auto' },
    { id: "genasi_fire_resistance", name: "Resistência ao Fogo", description: "Você tem resistência a dano de fogo.", type: 'auto' },
    { id: "genasi_reach_blaze", name: "Alcance das Chamas", description: "Você conhece o truque criar chamas. A partir do 3º nível, você pode conjurar a magia mãos flamejantes uma vez com este traço como uma magia de 1º nível, e você recupera a capacidade de conjurá-la dessa maneira quando termina um descanso longo. Constituição é sua habilidade de conjuração para essas magias.", type: 'auto' }
];
const GENASI_WATER_FEATURES: RacialFeatureDefinition[] = [
    { id: "genasi_acid_resistance", name: "Resistência Ácida", description: "Você tem resistência a dano ácido.", type: 'auto' },
    { id: "genasi_amphibious", name: "Anfíbio", description: "Você pode respirar ar e água.", type: 'auto' },
    { id: "genasi_swim", name: "Natação", description: "Você tem um deslocamento de natação de 9 metros.", type: 'auto' },
    { id: "genasi_call_wave", name: "Chamado da Onda", description: "Você conhece o truque moldar água. A partir do 3º nível, você pode conjurar a magia criar ou destruir água como uma magia de 2º nível uma vez com este traço, e você recupera a capacidade de conjurá-la dessa maneira quando termina um descanso longo. Constituição é sua habilidade de conjuração para essas magias.", type: 'auto' }
];

// --- Githyanki & Githzerai ---
const GITHYANKI_FEATURES: RacialFeatureDefinition[] = [
    { id: "githyanki_decadent_mastery", name: "Maestria Decadente", description: "Você aprende um idioma de sua escolha e ganha proficiência com um tipo de perícia ou ferramenta de sua escolha.", type: 'auto' },
    { id: "githyanki_martial_prodigy", name: "Prodígio Marcial", description: "Você é proficiente com armaduras leves e médias e com espadas curtas, espadas longas e espadas largas.", type: 'auto' },
    { id: "githyanki_psionics", name: "Psiônica Githyanki", description: "Você conhece o truque mãos mágicas (a mão é invisível). No 3º nível, você pode conjurar a magia salto uma vez com este traço (recupera em descanso longo). No 5º nível, você pode conjurar a magia passo nebuloso uma vez com este traço (recupera em descanso longo).", type: 'auto' }
];
const GITHZERAI_FEATURES: RacialFeatureDefinition[] = [
    { id: "githzerai_mental_discipline", name: "Disciplina Mental", description: "Você tem vantagem em testes de resistência contra as condições de enfeitiçado e amedrontado.", type: 'auto' },
    { id: "githzerai_psionics", name: "Psiônica Githzerai", description: "Você conhece o truque mãos mágicas (a mão é invisível). No 3º nível, você pode conjurar a magia escudo arcano uma vez com este traço (recupera em descanso longo). No 5º nível, você pode conjurar a magia detectar pensamentos uma vez com este traço (recupera em descanso longo).", type: 'auto' }
];

// --- Harengon ---
const HARENGON_FEATURES: RacialFeatureDefinition[] = [
    { id: "harengon_hare_trigger", name: "Gatilho de Lebre", description: "Você pode adicionar seu bônus de proficiência às suas jogadas de iniciativa.", type: 'auto' },
    { id: "harengon_leporine_senses", name: "Sentidos Leporinos", description: "Você tem proficiência na perícia Percepção.", type: 'auto', grantsSkillProficiency: 'perception' },
    { id: "harengon_lucky_footwork", name: "Trabalho de Pés Sortudo", description: "Quando você falha em um teste de resistência de Destreza, você pode usar sua reação para rolar um d4 e adicioná-lo ao teste de resistência, potencialmente transformando a falha em um sucesso.", type: 'auto' },
    { id: "harengon_rabbit_hop", name: "Pulo do Coelho", description: "Como uma ação bônus, você pode pular um número de metros igual a 5 vezes seu bônus de proficiência, sem provocar ataques de oportunidade. Você pode usar esse pulo apenas se seu deslocamento for maior que 0. Você pode usá-lo um número de vezes igual ao seu bônus de proficiência por descanso longo.", type: 'auto' }
];

// --- Kenku ---
const KENKU_FEATURES: RacialFeatureDefinition[] = [
    { id: "kenku_expert_forgery", name: "Falsificação Especializada", description: "Você pode duplicar a escrita e o artesanato de outras criaturas. Você tem vantagem em todos os testes feitos para produzir falsificações ou duplicatas de objetos existentes.", type: 'auto' },
    { id: "kenku_mimicry", name: "Mímica", description: "Você pode imitar sons que ouviu, incluindo vozes. Uma criatura que ouve os sons pode dizer que são imitações com um teste bem-sucedido de Sabedoria (Intuição) contestado pelo seu teste de Carisma (Enganação).", type: 'auto' },
    { id: "kenku_training", name: "Treinamento Kenku", description: "Você é proficiente em duas perícias de sua escolha entre Acrobacia, Enganação, Furtividade e Prestidigitação.", type: 'auto' }
];

// --- Tortle ---
const TORTLE_FEATURES: RacialFeatureDefinition[] = [
    { id: "tortle_claws", name: "Garras", description: "Suas garras são armas naturais, causando 1d4 + FOR de dano cortante.", type: 'auto' },
    { id: "tortle_hold_breath", name: "Prender a Respiração", description: "Você pode prender a respiração por até 1 hora.", type: 'auto' },
    { id: "tortle_natural_armor", name: "Armadura Natural", description: "Sua carapaça fornece uma CA base de 17 (seu modificador de Destreza não afeta esse número). Você não pode usar armadura leve, média ou pesada, mas se estiver usando um escudo, pode aplicar o bônus do escudo normalmente.", type: 'auto' },
    { id: "tortle_shell_defense", name: "Defesa de Casco", description: "Você pode se recolher em seu casco como uma ação. Até emergir, você ganha +4 na CA e tem vantagem em testes de resistência de Força e Constituição. Enquanto estiver em seu casco, você está caído, seu deslocamento é 0 e não pode aumentar, você tem desvantagem em testes de resistência de Destreza, não pode realizar reações e a única ação que pode realizar é uma ação bônus para emergir de seu casco.", type: 'auto' }
];

// --- Triton ---
const TRITON_FEATURES: RacialFeatureDefinition[] = [
    { id: "triton_amphibious", name: "Anfíbio", description: "Você pode respirar ar e água.", type: 'auto' },
    { id: "triton_control_air_water", name: "Controle de Ar e Água", description: "Você pode conjurar névoa obscurecente (Nível 1), lufada de vento (Nível 3) e muralha de água (Nível 5) uma vez cada por descanso longo. Carisma é sua habilidade de conjuração.", type: 'auto' },
    { id: "triton_emissary_sea", name: "Emissário do Mar", description: "Você pode se comunicar com bestas que têm deslocamento de natação.", type: 'auto' },
    { id: "triton_guardians_depths", name: "Guardiões das Profundezas", description: "Adaptado até mesmo às profundezas mais extremas do oceano, você tem resistência a dano de frio.", type: 'auto' }
];

// --- Bugbear ---
const BUGBEAR_FEATURES: RacialFeatureDefinition[] = [
    { id: "bugbear_darkvision", name: "Visão no Escuro (Bugbear)", description: "Você enxerga na penumbra a até 18m como luz plena e no escuro como penumbra.", type: 'auto' },
    { id: "bugbear_long_limbed", name: "Membros Longos", description: "Quando você faz um ataque corpo-a-corpo no seu turno, seu alcance para ele é 1,5 metro maior do que o normal.", type: 'auto' },
    { id: "bugbear_powerful_build", name: "Compleição Poderosa", description: "Você conta como uma categoria de tamanho maior para carga.", type: 'auto' },
    { id: "bugbear_sneaky", name: "Sorrateiro", description: "Você é proficiente na perícia Furtividade.", type: 'auto', grantsSkillProficiency: 'stealth' },
    { id: "bugbear_surprise_attack", name: "Ataque Surpresa", description: "Se você surpreender uma criatura e acertá-la com um ataque no seu primeiro turno em combate, o ataque causa 2d6 de dano extra a ela.", type: 'auto' }
];

// --- Goblin ---
const GOBLIN_FEATURES: RacialFeatureDefinition[] = [
    { id: "goblin_darkvision", name: "Visão no Escuro (Goblin)", description: "Você enxerga na penumbra a até 18m como luz plena e no escuro como penumbra.", type: 'auto' },
    { id: "goblin_fury_small", name: "Fúria dos Pequenos", description: "Quando você causa dano a uma criatura com um ataque ou magia e o tamanho da criatura é maior que o seu, você pode fazer com que o ataque ou magia cause dano extra igual ao seu nível. Uma vez que use essa característica, deve terminar um descanso curto ou longo para usá-la de novo.", type: 'auto' },
    { id: "goblin_nimble_escape", name: "Escapada Ágil", description: "Você pode realizar a ação de Desengajar ou Esconder-se como uma ação bônus em cada um dos seus turnos.", type: 'auto' }
];

// --- Hobgoblin ---
const HOBGOBLIN_FEATURES: RacialFeatureDefinition[] = [
    { id: "hobgoblin_darkvision", name: "Visão no Escuro (Hobgoblin)", description: "Você enxerga na penumbra a até 18m como luz plena e no escuro como penumbra.", type: 'auto' },
    { id: "hobgoblin_martial_training", name: "Treinamento Marcial", description: "Você é proficiente com duas armas marciais de sua escolha e com armadura leve.", type: 'auto' },
    { id: "hobgoblin_saving_face", name: "Salvar a Face", description: "Se você errar um ataque ou falhar em um teste de habilidade ou resistência, pode ganhar um bônus na rolagem igual ao número de aliados que você pode ver a até 9m de você (máximo +5). Recupera em descanso curto/longo.", type: 'auto' }
];

// --- Kobold ---
const KOBOLD_FEATURES: RacialFeatureDefinition[] = [
    { id: "kobold_darkvision", name: "Visão no Escuro (Kobold)", description: "Você enxerga na penumbra a até 18m como luz plena e no escuro como penumbra.", type: 'auto' },
    { id: "kobold_draconic_cry", name: "Grito Dracônico", description: "Como ação bônus, você solta um grito. Até o início do seu próximo turno, você e seus aliados têm vantagem nas jogadas de ataque contra inimigos a até 3m de você que possam ouvi-lo. Usos = bônus proficiência (recupera em descanso longo).", type: 'auto' },
    { id: "kobold_legacy", name: "Legado Kobold", description: "Escolha um: (1) Vantagem em testes de resistência contra amedrontado, (2) Conhece um truque de feiticeiro (INT/SAB/CAR), ou (3) Proficiência em Arcana, Investigação, Medicina, Prestidigitação ou Sobrevivência.", type: 'auto' }
];

// --- Lizardfolk ---
const LIZARDFOLK_FEATURES: RacialFeatureDefinition[] = [
    { id: "lizardfolk_bite", name: "Mordida", description: "Sua mandíbula é uma arma natural (1d6 + FOR perfurante).", type: 'auto' },
    { id: "lizardfolk_cunning_artisan", name: "Artesão Astuto", description: "Como parte de um descanso curto, pode criar escudo, clava, azagaia ou 1d4 dardos/munição usando ossos/couro de animal morto.", type: 'auto' },
    { id: "lizardfolk_hold_breath", name: "Prender a Respiração", description: "Pode prender a respiração por 15 minutos.", type: 'auto' },
    { id: "lizardfolk_hunters_lore", name: "Conhecimento do Caçador", description: "Proficiência em duas: Adestrar Animais, Natureza, Percepção, Furtividade ou Sobrevivência.", type: 'auto' },
    { id: "lizardfolk_natural_armor", name: "Armadura Natural", description: "Sua CA é 13 + mod. Destreza quando não usa armadura.", type: 'auto' },
    { id: "lizardfolk_hungry_jaws", name: "Mandíbulas Famintas", description: "Ação bônus para atacar com mordida. Se acertar, ganha PV temporários igual ao bônus de proficiência. (Recupera em descanso curto/longo).", type: 'auto' }
];

// --- Minotaur ---
const MINOTAUR_FEATURES: RacialFeatureDefinition[] = [
    { id: "minotaur_horns", name: "Chifres", description: "Armas naturais (1d6 + FOR perfurante).", type: 'auto' },
    { id: "minotaur_goring_rush", name: "Investida de Chifres", description: "Se usar a ação de Disparada e mover pelo menos 6m, pode fazer um ataque com chifres como ação bônus.", type: 'auto' },
    { id: "minotaur_hammering_horns", name: "Chifres de Martelo", description: "Imediatamente após atingir criatura com ataque corpo-a-corpo no seu turno, pode usar ação bônus para empurrá-la 3m (teste de Força CD 8+prof+FOR).", type: 'auto' }
];

// --- Orc ---
const ORC_FEATURES: RacialFeatureDefinition[] = [
    { id: "orc_darkvision", name: "Visão no Escuro (Orc)", description: "Você enxerga na penumbra a até 18m como luz plena e no escuro como penumbra.", type: 'auto' },
    { id: "orc_adrenaline_rush", name: "Surto de Adrenalina", description: "Pode usar ação bônus para Disparada. Ganha PV temporários igual ao bônus de proficiência. Usos = bônus proficiência (recupera em descanso longo).", type: 'auto' },
    { id: "orc_powerful_build", name: "Compleição Poderosa", description: "Você conta como uma categoria de tamanho maior para carga.", type: 'auto' },
    { id: "orc_relentless_endurance", name: "Resistência Implacável", description: "Quando reduzido a 0 PV, pode cair a 1 PV. (1/descanso longo).", type: 'auto' }
];

// --- Yuan-Ti ---
const YUAN_TI_FEATURES: RacialFeatureDefinition[] = [
    { id: "yuanti_darkvision", name: "Visão no Escuro (Yuan-Ti)", description: "Você enxerga na penumbra a até 18m como luz plena e no escuro como penumbra.", type: 'auto' },
    { id: "yuanti_magic_resistance", name: "Resistência à Magia", description: "Vantagem em testes de resistência contra magias.", type: 'auto' },
    { id: "yuanti_poison_resilience", name: "Resistência a Veneno", description: "Imunidade a dano de veneno e condição envenenado (ou resistência dependendo da versão, geralmente imunidade na versão Volo, resistência na MotM). Assumindo vantagem/resistência do MotM para balanceamento.", type: 'auto' },
    { id: "yuanti_serpent_casting", name: "Conjuração da Serpente", description: "Conhece o truque rajada de veneno. Pode conjurar amizade animal (cobras apenas) à vontade. No 3º nível, sugestão (1/descanso longo). CAR/INT/SAB é o atributo (escolha).", type: 'auto' }
];

// --- Satyr ---
const SATYR_FEATURES: RacialFeatureDefinition[] = [
    { id: "satyr_fey", name: "Fada", description: "Seu tipo de criatura é fada, em vez de humanoide.", type: 'auto' },
    { id: "satyr_ram", name: "Chifrada", description: "Você pode usar sua cabeça e chifres para fazer ataques desarmados (1d6 + Força).", type: 'auto' },
    { id: "satyr_magic_resistance", name: "Resistência à Magia", description: "Você tem vantagem em testes de resistência contra magias e outros efeitos mágicos.", type: 'auto' },
    { id: "satyr_mirthful_leaps", name: "Saltos Alegres", description: "Sempre que você fizer um salto em distância ou em altura, você pode rolar um d8 e adicionar o número rolado ao número de metros que você cobrir.", type: 'auto' },
    { id: "satyr_reveler", name: "Folião", description: "Você tem proficiência nas perícias Atuação e Persuasão, e com um instrumento musical de sua escolha.", type: 'auto' }
];

// --- Shifter ---
const SHIFTER_FEATURES: RacialFeatureDefinition[] = [
    { id: "shifter_darkvision", name: "Visão no Escuro", description: "Você enxerga na penumbra a até 18m como luz plena e no escuro como penumbra.", type: 'auto' },
    { id: "shifter_shifting", name: "Transformação", description: "Como uma ação bônus, você pode assumir uma aparência mais bestial. Essa transformação dura 1 minuto, até você morrer, ou até você revertê-la como uma ação bônus. Quando você se transforma, você ganha pontos de vida temporários iguais ao seu nível + seu modificador de Constituição. Você também ganha um benefício que depende da sua sub-raça (Fera, Caçador, Dentes-Longos ou Pele-de-Vento).", type: 'auto' }
];

// --- Centaur ---
const CENTAUR_FEATURES: RacialFeatureDefinition[] = [
    { id: "centaur_fey", name: "Fada", description: "Seu tipo de criatura é fada, em vez de humanoide.", type: 'auto' },
    { id: "centaur_charge", name: "Investida", description: "Se você se mover pelo menos 9 metros em linha reta em direção a um alvo e atingi-lo com um ataque corpo a corpo com arma no mesmo turno, você pode imediatamente seguir com um ataque com seus cascos como uma ação bônus.", type: 'auto' },
    { id: "centaur_hooves", name: "Cascos", description: "Seus cascos são armas naturais corpo a corpo (1d6 + Força).", type: 'auto' },
    { id: "centaur_equine_build", name: "Constituição Equina", description: "Você conta como um tamanho maior para determinar sua capacidade de carga. Qualquer escalada que exija mãos e pés é difícil para você (custa 4 metros de movimento para cada 1 metro).", type: 'auto' },
    { id: "centaur_survivor", name: "Sobrevivente", description: "Você tem proficiência em uma das seguintes perícias: Adestrar Animais, Medicina, Natureza ou Sobrevivência.", type: 'auto' }
];

// --- Grung ---
const GRUNG_FEATURES: RacialFeatureDefinition[] = [
    { id: "grung_arboreal_alertness", name: "Alerta Arbóreo", description: "Você tem proficiência na perícia Percepção.", type: 'auto', grantsSkillProficiency: 'perception' },
    { id: "grung_amphibious", name: "Anfíbio", description: "Você pode respirar ar e água.", type: 'auto' },
    { id: "grung_poison_immunity", name: "Imunidade a Veneno", description: "Você é imune a dano de veneno e à condição de envenenado.", type: 'auto' },
    { id: "grung_poisonous_skin", name: "Pele Venenosa", description: "Qualquer criatura que agarre você ou que de outra forma entre em contato direto com a sua pele deve passar em um teste de resistência de Constituição (CD 12) ou ficar envenenada por 1 minuto. Uma criatura envenenada não pode mais ficar envenenada dessa maneira.", type: 'auto' },
    { id: "grung_standing_leap", name: "Salto Parado", description: "Seu salto longo é de até 7,5 metros e seu salto em altura é de até 4,5 metros, com ou sem uma corrida.", type: 'auto' },
    { id: "grung_water_dependency", name: "Dependência de Água", description: "Se você não ficar imerso em água por pelo menos 1 hora durante um dia, você sofre um nível de exaustão no final do dia. Você só pode se recuperar dessa exaustão através de magia ou imergindo-se na água por pelo menos 1 hora.", type: 'auto' }
];

// --- Locathah ---
const LOCATHAH_FEATURES: RacialFeatureDefinition[] = [
    { id: "locathah_natural_armor", name: "Armadura Natural", description: "Sua pele é dura e escamosa. Quando você não está vestindo armadura, sua CA é 12 + seu modificador de Destreza.", type: 'auto' },
    { id: "locathah_observant_athletic", name: "Observador e Atlético", description: "Você tem proficiência nas perícias Atletismo e Percepção.", type: 'auto' },
    { id: "locathah_leviathan_will", name: "Vontade de Leviatã", description: "Você tem vantagem em testes de resistência contra ser enfeitiçado, amedrontado, paralisado, envenenado, atordoado ou colocado para dormir.", type: 'auto' },
    { id: "locathah_limited_amphibiousness", name: "Anfíbio Limitado", description: "Você pode respirar ar e água, mas precisa ser submerso pelo menos uma vez a cada 4 horas para evitar sufocamento.", type: 'auto' }
];

// --- Owlin ---
const OWLIN_FEATURES: RacialFeatureDefinition[] = [
    { id: "owlin_flight", name: "Voo", description: "Você tem um deslocamento de voo igual ao seu deslocamento de caminhada. Você não pode usar esse deslocamento de voo se estiver vestindo armadura média ou pesada.", type: 'auto' },
    { id: "owlin_darkvision", name: "Visão no Escuro (Owlin)", description: "Você pode ver na penumbra a até 36 metros de você como se fosse luz plena e na escuridão como se fosse penumbra.", type: 'auto' },
    { id: "owlin_silent_feathers", name: "Penas Silenciosas", description: "Você tem proficiência na perícia Furtividade.", type: 'auto', grantsSkillProficiency: 'stealth' }
];

// --- Verdan ---
const VERDAN_FEATURES: RacialFeatureDefinition[] = [
    { id: "verdan_black_blood_healing", name: "Cura de Sangue Negro", description: "Quando você rola um 1 ou 2 em qualquer Dado de Vida gasto no final de um descanso curto, você pode jogar o dado novamente e deve usar o novo resultado.", type: 'auto' },
    { id: "verdan_limited_telepathy", name: "Telepatia Limitada", description: "Você pode falar telepaticamente com qualquer criatura que você possa ver a até 9 metros de você. Você não precisa compartilhar um idioma com a criatura para que ela entenda suas transmissões telepáticas, mas a criatura deve ser capaz de entender pelo menos um idioma.", type: 'auto' },
    { id: "verdan_persuasive", name: "Persuasivo", description: "Você tem proficiência na perícia Persuasão.", type: 'auto', grantsSkillProficiency: 'persuasion' },
    { id: "verdan_telepathic_insight", name: "Percepção Telepática", description: "Você tem vantagem em todos os testes de resistência de Sabedoria e Carisma.", type: 'auto' }
];


export const ALL_RACIAL_FEATURES_MAP: Record<string, RacialFeatureDefinition[]> = {
  "Alto Elfo": HIGH_ELF_RACIAL_FEATURES,
  "Elfo da Floresta": WOOD_ELF_RACIAL_FEATURES,
  "Elfo Negro (Drow)": DROW_ELF_RACIAL_FEATURES,
  "Elfo do Mar": SEA_ELF_RACIAL_FEATURES,
  "Shadar-Kai": SHADAR_KAI_RACIAL_FEATURES,
  "Anão da Colina": HILL_DWARF_RACIAL_FEATURES,
  "Anão da Montanha": MOUNTAIN_DWARF_RACIAL_FEATURES,
  "Halfling Pés Leves": LIGHTFOOT_HALFLING_RACIAL_FEATURES,
  "Halfling Robusto": STOUT_HALFLING_RACIAL_FEATURES,
  "Humano": HUMAN_RACIAL_FEATURES,
  "Draconato": DRAGONBORN_RACIAL_FEATURES,
  "Gnomo da Floresta": FOREST_GNOME_RACIAL_FEATURES,
  "Gnomo das Rochas": ROCK_GNOME_RACIAL_FEATURES,
  "Gnomo das Profundezas (Svirfneblin)": DEEP_GNOME_RACIAL_FEATURES,
  "Meio-Elfo": HALF_ELF_RACIAL_FEATURES,
  "Meio-Orc": HALF_ORC_RACIAL_FEATURES,
  "Tiefling": TIEFLING_RACIAL_FEATURES,
  "Anadino": ANADINO_RACIAL_FEATURES,
  "Aasimar": AASIMAR_RACIAL_FEATURES,
  "Golias": GOLIATH_RACIAL_FEATURES,
  "Tabaxi": TABAXI_RACIAL_FEATURES,
  "Aarakocra": AARAKOCRA_RACIAL_FEATURES,
  "Changeling (Metamorfo)": CHANGELING_RACIAL_FEATURES,
  "Duergar": DUERGAR_RACIAL_FEATURES,
  "Eladrin": ELADRIN_RACIAL_FEATURES,
  "Fada (Fairy)": FAIRY_RACIAL_FEATURES,
  "Firbolg": FIRBOLG_RACIAL_FEATURES,
  "Genasi do Ar": GENASI_AIR_FEATURES,
  "Genasi da Terra": GENASI_EARTH_FEATURES,
  "Genasi do Fogo": GENASI_FIRE_FEATURES,
  "Genasi da Água": GENASI_WATER_FEATURES,
  "Githyanki": GITHYANKI_FEATURES,
  "Githzerai": GITHZERAI_FEATURES,
  "Harengon": HARENGON_FEATURES,
  "Kenku": KENKU_FEATURES,
  "Tortle": TORTLE_FEATURES,
  "Tritão (Triton)": TRITON_FEATURES,
  "Bugbear": BUGBEAR_FEATURES,
  "Goblin": GOBLIN_FEATURES,
  "Hobgoblin": HOBGOBLIN_FEATURES,
  "Kobold": KOBOLD_FEATURES,
  "Lizardfolk (Povo Lagarto)": LIZARDFOLK_FEATURES,
  "Minotauro": MINOTAUR_FEATURES,
  "Orc": ORC_FEATURES,
  "Yuan-Ti": YUAN_TI_FEATURES,
  "Sátiro": SATYR_FEATURES,
  "Centauro": CENTAUR_FEATURES,
  "Shifter (Transformista)": SHIFTER_FEATURES,
  "Grung": GRUNG_FEATURES,
  "Locathah": LOCATHAH_FEATURES,
  "Owlin": OWLIN_FEATURES,
  "Verdan": VERDAN_FEATURES,
};
