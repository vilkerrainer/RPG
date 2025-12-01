
export interface Feat {
  id: string;
  name: string;
  description: string;
}

export interface FeatSelection {
  featId: string;
  featName: string;
  description: string;
  levelAcquired: number; 
}

export interface CharacterAttributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface Character {
  id: string;
  photoUrl: string;
  name: string;
  background: string;
  race: string;
  charClass: string;
  age: number;
  alignment: string;
  coins: number;
  level: number;
  hp: number;
  hpt: number;
  ac: number;
  attributes: CharacterAttributes;
  proficientSkills: string[];
  skillNotes: string;
  items: string;
  abilities: string; // General racial/class abilities not tied to level progression choices
  fightingStyle: string; 
  magic?: MagicInfo;
  classFeatures?: ClassFeatureSelection[]; 
  racialFeatures?: RacialFeatureSelection[]; 
  feats?: FeatSelection[];
  rank?: Rank; 

  // Hit Dice
  maxHitDice: number;
  currentHitDice: number;
  hitDieType: number; 

  // Legacy Explicit Fields (kept for backward compatibility where needed, 
  // but new logic prefers storing in classFeatures/racialFeatures)
  currentRages?: number;
  maxRages?: number;
  currentBardicInspirations?: number;
  maxBardicInspirations?: number;
  currentChannelDivinityUses?: number;
  maxChannelDivinityUses?: number;
  currentSecondWindUses?: number;
  maxSecondWindUses?: number;
  currentActionSurgeUses?: number;
  maxActionSurgeUses?: number;
  currentKiPoints?: number;
  maxKiPoints?: number;
  currentLayOnHandsPool?: number;
  maxLayOnHandsPool?: number;
  currentRelentlessEnduranceUses?: number;
  maxRelentlessEnduranceUses?: number;
  currentBreathWeaponUses?: number;
  maxBreathWeaponUses?: number;
}

export interface Spell {
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  classes: string[];
}

export interface MagicInfo {
  spellcastingAbilityName?: AttributeName;
  spellSaveDC: number;
  spellAttackBonus: number;
  cantripsKnown: string[];
  spellsKnownPrepared: string[];
  spellbook?: string[]; 
  spellSlots: number[]; // Max spell slots per level (index 0 for 1st level, etc.)
  currentSpellSlots: number[]; // Current available spell slots per level
}

export type AttributeName = keyof CharacterAttributes;

export const ATTRIBUTE_NAMES: AttributeName[] = [
  'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'
];

export const ATTRIBUTE_LABELS: Record<AttributeName, string> = {
  strength: 'Força (FOR)',
  dexterity: 'Destreza (DES)',
  constitution: 'Constituição (CON)',
  intelligence: 'Inteligência (INT)',
  wisdom: 'Sabedoria (SAB)',
  charisma: 'Carisma (CAR)',
};

// Types for Class/Racial Feature Selection System
export interface FeatureChoiceDefinition {
  value: string;
  label: string;
  description?: string;
  damage?: string; // e.g., "1d8 extra damage"
  damageType?: string; 
  breathWeaponDescription?: string;
  cost?: number; // Cost in resource points (e.g. Sorcery Points)
}

interface BaseFeatureDefinition {
  id: string; 
  name: string; 
  description: string;
  type: 'auto' | 'choice' | 'asi'; 
  selectionPrompt?: string; 
  choices?: FeatureChoiceDefinition[]; 
  maxChoices?: number;
  prerequisiteFeatureId?: string; 
  subclassPrerequisite?: {
    featureId: string;
    choiceValue: string;
  };
}

export interface ClassFeatureDefinition extends BaseFeatureDefinition {
  level: number; 
}

export interface RacialFeatureDefinition extends BaseFeatureDefinition {
  grantsSkillProficiency?: string; 
}

interface BaseFeatureSelection {
  featureId: string;      
  featureName: string;   
  type: 'auto' | 'choice' | 'asi';
  description?: string;   
  choiceValue?: string;   
  choiceLabel?: string;   
  customChoiceText?: string;
  appliesTo?: string; 
  asiChoice?: 'asi' | 'feat';
  
  // New resource tracking fields
  currentUses?: number;
  maxUses?: number;
  recoveryType?: 'short' | 'long' | 'other';
  
  // Cost for abilities that spend other resources (e.g. Metamagic spends Sorcery Points)
  cost?: number;
}

export interface ClassFeatureSelection extends BaseFeatureSelection {
  levelAcquired: number;
}

export interface RacialFeatureSelection extends BaseFeatureSelection {
}


export const RANKS = ["Ferro", "Bronze", "Prata", "Ouro", "Platina", "Diamante"] as const;
export type Rank = typeof RANKS[number];

export interface BackgroundDefinition {
  name: string;
  skillProficiencies: string[];
  toolProficiencies: string[];
  languages: string[];
}

export const WIZARD_ARCANE_TRADITION_CHOICES: FeatureChoiceDefinition[] = [
    { value: "abjuration", label: "Escola de Abjuração", description: "Foco em magias de proteção e negação." },
    { value: "evocation", label: "Escola de Evocação", description: "Foco em magias destrutivas e elementais." },
    { value: "conjuration", label: "Escola de Conjuração", description: "Foco em magias de invocação e criação."},
    { value: "divination", label: "Escola de Adivinhação", description: "Foco em magias de conhecimento e previsão."},
    { value: "enchantment", label: "Escola de Encantamento", description: "Foco em magias de manipulação mental."},
    { value: "illusion", label: "Escola de Ilusão", description: "Foco em magias de engano e falsidade."},
    { value: "necromancy", label: "Escola de Necromancia", description: "Foco em magias que manipulam vida e morte."},
    { value: "transmutation", label: "Escola de Transmutação", description: "Foco em magias que alteram matéria e energia."},
    { value: "war_magic", label: "Magia de Guerra", description: "Combina princípios de evocação e abjuração para dominar o campo de batalha." },
    { value: "bladesinging", label: "Lâmina Cantante (Bladesinging)", description: "Magos que dominam uma tradição de magia que incorpora esgrima e dança." },
    { value: "scribes", label: "Ordem dos Escribas", description: "Magos que buscam dominar a palavra escrita e a essência mágica dos livros." },
];

export const FIGHTER_MARTIAL_ARCHETYPE_CHOICES: FeatureChoiceDefinition[] = [
    { value: "champion", label: "Campeão", description: "O arquétipo Campeão foca no desenvolvimento de poder físico bruto, levado a uma perfeição mortal." },
    { value: "battle_master", label: "Mestre de Batalha", description: "Mestres de Batalha usam técnicas especiais conhecidas como manobras para controlar o campo de batalha e capacitar seus ataques." },
    { value: "eldritch_knight", label: "Cavaleiro Arcano", description: "Cavaleiros Arcanos combinam a maestria marcial com o estudo cuidadoso da magia." },
    { value: "samurai", label: "Samurai", description: "Guerreiros que usam seu espírito inquebrável para superar adversidades." },
    { value: "arcane_archer", label: "Arqueiro Arcano", description: "Guerreiros que tecem magia em seus disparos." },
    { value: "cavalier", label: "Cavaleiro", description: "Especialistas em combate montado e proteção de aliados." },
    { value: "echo_knight", label: "Cavaleiro do Eco", description: "Guerreiros que invocam ecos de si mesmos de linhas do tempo alternativas." },
    { value: "rune_knight", label: "Cavaleiro Rúnico", description: "Guerreiros que usam runas de gigantes para aumentar suas capacidades." },
];

export const BARBARIAN_PRIMAL_PATH_CHOICES: FeatureChoiceDefinition[] = [
    { value: "berserker", label: "Caminho do Furioso (Berserker)", description: "Para alguns bárbaros, a fúria é um meio para um fim – esse fim é a violência." },
    { value: "totem_warrior", label: "Caminho do Guerreiro Totêmico", description: "O Caminho do Guerreiro Totêmico é uma jornada espiritual, à medida que o bárbaro aceita um espírito animal como guia." },
    { value: "zealot", label: "Caminho do Fanático", description: "Guerreiros que canalizam sua fúria em demonstrações poderosas de poder divino." },
    { value: "ancestral_guardian", label: "Guardião Ancestral", description: "Bárbaros que invocam os espíritos de seus ancestrais para proteger a tribo." },
    { value: "storm_herald", label: "Arauto da Tempestade", description: "Bárbaros que emitem a fúria da tempestade ao seu redor." },
    { value: "beast", label: "Caminho da Fera", description: "Bárbaros que manifestam aspectos bestiais durante a fúria." },
    { value: "wild_magic", label: "Caminho da Magia Selvagem", description: "Bárbaros infundidos com magia selvagem que surge durante a fúria." },
];

export const BARD_COLLEGE_CHOICES: FeatureChoiceDefinition[] = [
    { value: "lore", label: "Colégio do Conhecimento", description: "Bardos do Colégio do Conhecimento conhecem algo sobre a maioria das coisas." },
    { value: "valor", label: "Colégio da Bravura", description: "Bardos do Colégio da Bravura são escaldos destemidos cujos contos mantêm viva a memória dos grandes heróis." },
    { value: "glamour", label: "Colégio do Glamour", description: "Bardos que dominaram sua arte no reino das fadas." },
    { value: "swords", label: "Colégio das Espadas", description: "Bardos que usam suas armas para realizar proezas impressionantes." },
    { value: "whispers", label: "Colégio dos Sussurros", description: "Bardos que usam seu conhecimento para manipular e aterrorizar." },
    { value: "eloquence", label: "Colégio da Eloquência", description: "Mestres da oratória e persuasão." },
    { value: "creation", label: "Colégio da Criação", description: "Bardos que canalizam a canção da criação para animar objetos." },
];

export const CLERIC_DOMAIN_CHOICES: FeatureChoiceDefinition[] = [
    { value: "life", label: "Domínio da Vida", description: "O domínio da Vida foca na vívida energia positiva que sustenta toda a vida." },
    { value: "knowledge", label: "Domínio do Conhecimento", description: "Os deuses do conhecimento valorizam o estudo e compreensão acima de tudo." },
    { value: "light", label: "Domínio da Luz", description: "Deuses da luz promovem os ideais do renascimento e renovação, verdade, vigilância e beleza." },
    { value: "nature", label: "Domínio da Natureza", description: "Os deuses da natureza são tão variados como a própria natureza do mundo." },
    { value: "tempest", label: "Domínio da Tempestade", description: "Deuses cujo portfólio contenha o domínio da Tempestade governam tormentas, mares e céus." },
    { value: "trickery", label: "Domínio da Enganação", description: "Deuses da enganação são causadores de travessuras e instigadores." },
    { value: "war", label: "Domínio da Guerra", description: "A guerra tem muitas manifestações. Os clérigos de tais deuses se sobressaem em batalha." },
    { value: "grave", label: "Domínio da Sepultura", description: "Deuses da sepultura vigiam a linha entre a vida e a morte." },
    { value: "forge", label: "Domínio da Forja", description: "Deuses da forja são patronos de artesãos e ferreiros." },
    { value: "order", label: "Domínio da Ordem", description: "Deuses da ordem focam na disciplina e na lei." },
    { value: "peace", label: "Domínio da Paz", description: "Deuses da paz inspiram a resolução de conflitos." },
    { value: "twilight", label: "Domínio do Crepúsculo", description: "Deuses que guardam a transição entre luz e escuridão." },
];

export const WARLOCK_PATRON_CHOICES: FeatureChoiceDefinition[] = [
  { value: "archfey", label: "A Arquifada", description: "Seu patrono é um senhor ou senhora das fadas, uma criatura de lenda." },
  { value: "fiend", label: "O Corruptor", description: "Você fez um pacto com um corruptor dos planos inferiores." },
  { value: "great_old_one", label: "O Grande Antigo", description: "Seu patrono é uma entidade misteriosa cuja natureza é totalmente alheia ao tecido da realidade." },
  { value: "hexblade", label: "O Hexblade (Lâmina Maldita)", description: "Você fez um pacto com uma entidade misteriosa de Shadowfell – uma força que se manifesta em armas mágicas sencientes." },
  { value: "celestial", label: "O Celestial", description: "Seu patrono é uma entidade poderosa dos planos superiores." },
  { value: "fathomless", label: "O Insondável", description: "Você fez um pacto com uma entidade das profundezas do oceano." },
  { value: "genie", label: "O Gênio", description: "Você fez um pacto com um gênio nobre." },
  { value: "undead", label: "O Morto-Vivo", description: "Seu patrono é uma entidade que transcendeu a morte." },
];

export const WARLOCK_PACT_BOON_CHOICES: FeatureChoiceDefinition[] = [
  { value: "chain", label: "Pacto da Corrente", description: "Aprende convocar familiar; formas especiais: diabrete, pseudodragão, quasit ou sprite." },
  { value: "blade", label: "Pacto da Lâmina", description: "Pode criar uma arma de pacto corpo-a-corpo." },
  { value: "tome", label: "Pacto do Tomo", description: "Recebe um grimório (Livro das Sombras) com três truques de qualquer classe." },
  { value: "talisman", label: "Pacto do Talismã", description: "Você recebe um amuleto que pode ajudar quem o usa." },
];

export const WARLOCK_INVOCATION_CHOICES: FeatureChoiceDefinition[] = [
  { value: "agonizing_blast", label: "Rajada Agonizante", description: "Pré-requisito: truque rajada mística. Adiciona mod. Carisma ao dano de rajada mística." },
  { value: "armor_of_shadows", label: "Armadura de Sombras", description: "Pode conjurar armadura arcana à vontade." },
  { value: "eldritch_spear", label: "Lança Mística", description: "Pré-requisito: truque rajada mística. Alcance de rajada mística torna-se 90m." },
  { value: "devil_sight", label: "Visão Diabólica", description: "Você pode ver normalmente na escuridão, tanto mágica quanto não mágica, a uma distância de 36 metros." },
  { value: "thirsting_blade", label: "Lâmina Sedenta", description: "Pré-requisito: 5º nível, Pacto da Lâmina. Você pode atacar com sua arma de pacto duas vezes, ao invés de uma, quando usa a ação de Ataque." },
  { value: "lifedrinker", label: "Sugador de Vida", description: "Pré-requisito: 12º nível, Pacto da Lâmina. Adiciona dano necrótico igual ao mod. Carisma aos ataques." },
  { value: "mask_of_many_faces", label: "Máscara de Muitas Faces", description: "Pode conjurar disfarçar-se à vontade." },
  { value: "misty_visions", label: "Visões Enevoadas", description: "Pode conjurar imagem silenciosa à vontade." },
  { value: "repelling_blast", label: "Rajada Repulsora", description: "Pré-requisito: truque rajada mística. Empurra criatura 3m ao acertar." },
];

export const DRUID_CIRCLE_CHOICES: FeatureChoiceDefinition[] = [
  { value: "land", label: "Círculo da Terra", description: "Místicos e sábios que salvaguardam conhecimento e ritos antigos." },
  { value: "moon", label: "Círculo da Lua", description: "Ferrenhos guardiões na natureza, mestres da transformação em besta." },
  { value: "dreams", label: "Círculo dos Sonhos", description: "Druidas que têm fortes laços com a Feywild e seus reinos oníricos." },
  { value: "shepherd", label: "Círculo do Pastor", description: "Protetores dos espíritos da natureza e das bestas." },
  { value: "spores", label: "Círculo dos Esporos", description: "Druidas que encontram beleza na decomposição e nos fungos." },
  { value: "stars", label: "Círculo das Estrelas", description: "Druidas que extraem poder da luz das estrelas." },
  { value: "wildfire", label: "Círculo do Fogo Selvagem", description: "Druidas que entendem que a destruição é precursora da criação." },
];

export const SORCERER_ORIGIN_CHOICES: FeatureChoiceDefinition[] = [
  { value: "draconic", label: "Linhagem Dracônica", description: "Sua magia inata vem de magia dracônica misturada ao seu sangue." },
  { value: "wild_magic", label: "Magia Selvagem", description: "Sua magia inata vem das forças selvagens do caos." },
  { value: "divine_soul", label: "Alma Favorecida (Divine Soul)", description: "Sua magia vem de uma fonte divina que foi infundida em sua alma." },
  { value: "shadow", label: "Magia das Sombras", description: "Sua magia vem de Shadowfell." },
  { value: "storm", label: "Feitiçaria da Tempestade", description: "Sua magia vem do poder do ar elemental." },
  { value: "aberrant_mind", label: "Mente Aberrante", description: "Uma influência alienígena envolveu sua mente." },
  { value: "clockwork_soul", label: "Alma Mecânica", description: "O poder de Mechanus infunde sua alma." },
];

export const METAMAGIC_OPTIONS_CHOICES: FeatureChoiceDefinition[] = [
    { value: "careful", label: "Magia Cuidadosa", description: "Proteja criaturas de magias de área.", cost: 1 },
    { value: "distant", label: "Magia Distante", description: "Dobre o alcance ou torne toque em 9m.", cost: 1 },
    { value: "empowered", label: "Magia Fortalecida", description: "Rerrole dados de dano.", cost: 1 },
    { value: "extended", label: "Magia Estendida", description: "Dobre a duração (máx 24h).", cost: 1 },
    { value: "heightened", label: "Magia Elevada", description: "Desvantagem no primeiro teste de resistência do alvo.", cost: 3 },
    { value: "quickened", label: "Magia Acelerada", description: "Conjure como ação bônus.", cost: 2 },
    { value: "subtle", label: "Magia Sutil", description: "Sem componentes somáticos ou verbais.", cost: 1 },
    { value: "twinned", label: "Magia Duplicada", description: "Afete um segundo alvo (Custo = Nível da Magia, Min 1).", cost: 1 }, // Variable cost, defaulted to 1 for generic button
    { value: "seeking", label: "Magia Perseguidora", description: "Rerrole ataque se errar.", cost: 2 },
    { value: "transmuted", label: "Magia Transmutada", description: "Mude o tipo de dano elemental.", cost: 1 },
];

export const PALADIN_OATH_CHOICES: FeatureChoiceDefinition[] = [
    { value: "devotion", label: "Juramento de Devoção", description: "Vincula o paladino aos mais sublimes ideias de justiça, virtude e ordem." },
    { value: "ancients", label: "Juramento dos Anciões", description: "Antigo quanto a raça dos elfos e os rituais dos druidas, focado na luz e na vida." },
    { value: "vengeance", label: "Juramento de Vingança", description: "Um comprometimento solene de punir aqueles que cometeram pecados graves." },
    { value: "conquest", label: "Juramento da Conquista", description: "Aqueles que fazem este juramento buscam trazer ordem através do poder esmagador." },
    { value: "redemption", label: "Juramento da Redenção", description: "Paladinos que acreditam que a violência é o último recurso." },
    { value: "glory", label: "Juramento da Glória", description: "Paladinos que acreditam que o destino chama para atos de heroísmo." },
    { value: "watchers", label: "Juramento da Vigília", description: "Paladinos que protegem o plano material de invasores extraplanares." },
    { value: "crown", label: "Juramento da Coroa", description: "Paladinos dedicados a servir a lei e a civilização." },
    { value: "oathbreaker", label: "Quebra-Juramento", description: "Um paladino que quebrou seus votos sagrados para perseguir uma ambição sombria." },
];

export const ROGUE_ARCHETYPE_CHOICES: FeatureChoiceDefinition[] = [
    { value: "thief", label: "Ladrão (Thief)", description: "Aprimora habilidades de furto, agilidade e uso de objetos." },
    { value: "assassin", label: "Assassino (Assassin)", description: "Foca na arte da morte, disfarce e ataques surpresa mortais." },
    { value: "arcane_trickster", label: "Trapaceiro Arcano (Arcane Trickster)", description: "Incrementa furtividade e agilidade com magia, principalmente ilusão e encantamento." },
    { value: "swashbuckler", label: "Espadachim", description: "Foca na velocidade, elegância e charme em combate." },
    { value: "inquisitive", label: "Inquisitivo", description: "Excelente em descobrir segredos e ler pessoas." },
    { value: "mastermind", label: "Mentor", description: "Foca em intriga, táticas e manipulação." },
    { value: "scout", label: "Batedor", description: "Especialista em sobrevivência e furtividade na natureza." },
    { value: "phantom", label: "Fantasma", description: "Caminha na linha entre a vida e a morte." },
    { value: "soulknife", label: "Lâmina da Alma", description: "Ataca com lâminas psíquicas." },
];

export const MONK_MONASTIC_TRADITION_CHOICES: FeatureChoiceDefinition[] = [
    { value: "open_hand", label: "Caminho da Mão Aberta", description: "Mestres das artes marciais, usando técnicas para controlar oponentes e curar a si mesmos." },
    { value: "shadow", label: "Caminho da Sombra", description: "Ninjas ou dançarinos das sombras, focados em furtividade e subterfúgio." },
    { value: "four_elements", label: "Caminho dos Quatro Elementos", description: "Ensina a dominar os elementos, moldando-os como uma extensão do próprio corpo." },
    { value: "kensei", label: "Caminho do Kensei", description: "Monges que treinam incansavelmente com suas armas até que a arma se torne uma extensão do corpo." },
    { value: "drunken_master", label: "Caminho do Mestre Bêbado", description: "Imita os movimentos de um bêbado para confundir inimigos." },
    { value: "sun_soul", label: "Caminho da Alma Solar", description: "Canaliza a força vital em raios de luz." },
    { value: "astral_self", label: "Caminho da Alma Astral", description: "Manifesta partes do seu eu astral." },
    { value: "mercy", label: "Caminho da Misericórdia", description: "Manipula a força vital para curar ou ferir." },
];


export const DRAGON_ANCESTRY_CHOICES: FeatureChoiceDefinition[] = [
  { value: "black", label: "Negro", description: "Resistência a Ácido. Sopro: Linha de 1,5m por 9m de ácido (Teste de DES).", damageType: "Ácido", breathWeaponDescription: "Linha de 1,5m por 9m (Teste de DES)" },
  { value: "blue", label: "Azul", description: "Resistência a Relâmpago. Sopro: Linha de 1,5m por 9m de relâmpago (Teste de DES).", damageType: "Relâmpago", breathWeaponDescription: "Linha de 1,5m por 9m (Teste de DES)" },
  { value: "brass", label: "Latão", description: "Resistência a Fogo. Sopro: Linha de 1,5m por 9m de fogo (Teste de DES).", damageType: "Fogo", breathWeaponDescription: "Linha de 1,5m por 9m (Teste de DES)" },
  { value: "bronze", label: "Bronze", description: "Resistência a Relâmpago. Sopro: Linha de 1,5m por 9m de relâmpago (Teste de DES).", damageType: "Relâmpago", breathWeaponDescription: "Linha de 1,5m por 9m (Teste de DES)" },
  { value: "copper", label: "Cobre", description: "Resistência a Ácido. Sopro: Linha de 1,5m por 9m de ácido (Teste de DES).", damageType: "Ácido", breathWeaponDescription: "Linha de 1,5m por 9m (Teste de DES)" },
  { value: "gold", label: "Ouro", description: "Resistência a Fogo. Sopro: Cone de 4,5m de fogo (Teste de DES).", damageType: "Fogo", breathWeaponDescription: "Cone de 4,5m (Teste de DES)" },
  { value: "green", label: "Verde", description: "Resistência a Veneno. Sopro: Cone de 4,5m de gás venenoso (Teste de CON).", damageType: "Veneno", breathWeaponDescription: "Cone de 4,5m (Teste de CON)" },
  { value: "red", label: "Vermelho", description: "Resistência a Fogo. Sopro: Cone de 4,5m de fogo (Teste de DES).", damageType: "Fogo", breathWeaponDescription: "Cone de 4,5m (Teste de DES)" },
  { value: "silver", label: "Prata", description: "Resistência a Frio. Sopro: Cone de 4,5m de frio (Teste de CON).", damageType: "Frio", breathWeaponDescription: "Cone de 4,5m (Teste de CON)" },
  { value: "white", label: "Branco", description: "Resistência a Frio. Sopro: Cone de 4,5m de frio (Teste de CON).", damageType: "Frio", breathWeaponDescription: "Cone de 4,5m (Teste de CON)" },
];
