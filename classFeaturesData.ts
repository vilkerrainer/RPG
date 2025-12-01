
import { ClassFeatureDefinition, FeatureChoiceDefinition, WIZARD_ARCANE_TRADITION_CHOICES, FIGHTER_MARTIAL_ARCHETYPE_CHOICES, BARBARIAN_PRIMAL_PATH_CHOICES, BARD_COLLEGE_CHOICES, CLERIC_DOMAIN_CHOICES, WARLOCK_PATRON_CHOICES, WARLOCK_PACT_BOON_CHOICES, WARLOCK_INVOCATION_CHOICES, DRUID_CIRCLE_CHOICES, SORCERER_ORIGIN_CHOICES, METAMAGIC_OPTIONS_CHOICES, PALADIN_OATH_CHOICES, ROGUE_ARCHETYPE_CHOICES, MONK_MONASTIC_TRADITION_CHOICES, DRAGON_ANCESTRY_CHOICES } from './types';
import { FIGHTING_STYLE_OPTIONS } from './dndOptions';

// --- Ranger Feature Choices ---
const FAVORED_ENEMY_CHOICES: FeatureChoiceDefinition[] = [
  { value: "aberrations", label: "Aberrações" }, { value: "beasts", label: "Bestas" },
  { value: "celestials", label: "Celestiais" }, { value: "constructs", label: "Construtos" },
  { value: "dragons", label: "Dragões" }, { value: "elementals", label: "Elementais" },
  { value: "fey", label: "Fadas (Fey)" }, { value: "fiends", label: "Infernais (Fiends)" },
  { value: "giants", label: "Gigantes" }, { value: "monstrosities", label: "Monstruosidades" },
  { value: "oozes", label: "Limos (Oozes)" }, { value: "plants", label: "Plantas" },
  { value: "undead", label: "Mortos-Vivos" },
];

const NATURAL_EXPLORER_TERRAIN_CHOICES: FeatureChoiceDefinition[] = [
  { value: "arctic", label: "Ártico" }, { value: "coast", label: "Costa" },
  { value: "desert", label: "Deserto" }, { value: "forest", label: "Floresta" },
  { value: "grassland", label: "Pradaria" }, { value: "mountain", label: "Montanha" },
  { value: "swamp", label: "Pântano" }, { value: "underdark", label: "Subterrâneo (Underdark)" },
];

const RANGER_CONCLAVE_CHOICES: FeatureChoiceDefinition[] = [
    { value: "hunter", label: "Caçador (Hunter Conclave)", description: "Este arquétipo se concentra em caçar ameaças." },
    { value: "beast_master", label: "Mestre das Feras (Beast Master Conclave)", description: "Conexão profunda com um companheiro animal." },
    { value: "gloom_stalker", label: "Caçador das Sombras (Gloom Stalker)", description: "Caçadores destemidos que espreitam nas sombras." },
    { value: "horizon_walker", label: "Andarilho do Horizonte", description: "Guardiões planares." },
    { value: "monster_slayer", label: "Matador de Monstros", description: "Especialistas em derrotar criaturas mágicas." },
    { value: "fey_wanderer", label: "Andarilho Feérico", description: "Guardiões das fronteiras feéricas." },
];

const HUNTER_PREY_CHOICES: FeatureChoiceDefinition[] = [
    { value: "colossus_slayer", label: "Abatedor de Colossos", description: "1d8 dano extra se alvo abaixo do HP máximo (1/turno).", damage: "1d8" },
    { value: "giant_killer", label: "Matador de Gigantes", description: "Reação para atacar criaturas Grandes que te ataquem." },
    { value: "horde_breaker", label: "Quebrador de Horda", description: "Ataque extra contra criatura adjacente ao alvo." },
];
const DEFENSIVE_TACTICS_CHOICES: FeatureChoiceDefinition[] = [
    { value: "escape_the_horde", label: "Fuga da Horda", description: "Ataques de oportunidade contra você têm desvantagem." },
    { value: "multiattack_defense", label: "Defesa contra Ataques Múltiplos", description: "+4 CA contra ataques subsequentes da mesma criatura." },
    { value: "steel_will", label: "Vontade de Aço", description: "Vantagem contra medo." },
];
const MULTIATTACK_CHOICES: FeatureChoiceDefinition[] = [
    { value: "volley", label: "Saraivada", description: "Ataque área de 3m raio à distância." },
    { value: "whirlwind_attack", label: "Ataque Redemoinho", description: "Ataque todos a 1,5m." },
];
const SUPERIOR_HUNTERS_DEFENSE_CHOICES: FeatureChoiceDefinition[] = [
    { value: "evasion", label: "Evasão", description: "Metade do dano em falha de DES, nenhum em sucesso." },
    { value: "stand_against_the_tide", label: "Resistir à Maré", description: "Reação para redirecionar ataque errado para outra criatura." },
    { value: "uncanny_dodge", label: "Esquiva Sobrenatural", description: "Reação para reduzir dano sofrido à metade." },
];
const BATTLE_MASTER_MANEUVER_CHOICES: FeatureChoiceDefinition[] = [
    { value: "ambush", label: "Emboscada", description: "Adiciona dado de superioridade à Furtividade ou Iniciativa." },
    { value: "commanders_strike", label: "Golpe do Comandante", description: "Abdica de ataque para aliado atacar." },
    { value: "disarming_attack", label: "Ataque de Desarme", description: "Tenta desarmar o oponente." },
    { value: "distracting_strike", label: "Ataque de Distração", description: "Dá vantagem ao próximo ataque de aliado." },
    { value: "evasive_footwork", label: "Trabalho de Pés Evasivo", description: "Aumenta CA ao mover." },
    { value: "feinting_attack", label: "Ataque de Finta", description: "Vantagem e dano extra no ataque." },
    { value: "goading_attack", label: "Ataque Provocador", description: "Alvo tem desvantagem para atacar outros." },
    { value: "lunging_attack", label: "Ataque de Estocada", description: "Aumenta alcance em 1,5m." },
    { value: "maneuvering_attack", label: "Ataque de Manobra", description: "Permite aliado mover." },
    { value: "parry", label: "Aparar", description: "Reduz dano sofrido (Reação)." },
    { value: "precision_attack", label: "Ataque de Precisão", description: "Adiciona dado ao acerto." },
    { value: "pushing_attack", label: "Ataque de Empurrão", description: "Empurra alvo 4,5m." },
    { value: "rally", label: "Incentivar", description: "Dá PV temporários a aliado." },
    { value: "riposte", label: "Ripostar", description: "Ataque de reação quando inimigo erra." },
    { value: "sweeping_attack", label: "Ataque Amplo", description: "Dano em criatura adjacente." },
    { value: "trip_attack", label: "Ataque de Derrubada", description: "Derruba alvo." },
];
const TOTEM_SPIRIT_CHOICES: FeatureChoiceDefinition[] = [
    { value: "bear", label: "Urso", description: "Resistência a tudo (exceto psíquico) em fúria." },
    { value: "eagle", label: "Águia", description: "Desvantagem em ataques de oportunidade contra você, Disparada como bônus." },
    { value: "wolf", label: "Lobo", description: "Aliados têm vantagem em ataque contra inimigos a 1,5m de você." },
];
const ASPECT_OF_THE_BEAST_CHOICES: FeatureChoiceDefinition[] = [
    { value: "bear", label: "Urso", description: "Capacidade de carga dobrada, vantagem em testes de Força para empurrar/quebrar." },
    { value: "eagle", label: "Águia", description: "Visão de 1,6km, sem desvantagem em Percepção na penumbra." },
    { value: "wolf", label: "Lobo", description: "Rastrear em ritmo rápido, furtividade em ritmo normal." },
];
const TOTEMIC_ATTUNEMENT_CHOICES: FeatureChoiceDefinition[] = [
    { value: "bear", label: "Urso", description: "Inimigos a 1,5m têm desvantagem para atacar outros." },
    { value: "eagle", label: "Águia", description: "Voo igual ao deslocamento em fúria." },
    { value: "wolf", label: "Lobo", description: "Ação bônus para derrubar criatura Grande ou menor." },
];

// --- RANGER DEFINITIONS ---
export const RANGER_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
  { id: "ranger_favored_enemy_1", level: 1, name: "Inimigo Favorito (1º)", type: 'choice', choices: FAVORED_ENEMY_CHOICES, maxChoices: 1, description: "Vantagem em rastrear e recordar informações." },
  { id: "ranger_natural_explorer_1", level: 1, name: "Explorador Natural (1º)", type: 'choice', choices: NATURAL_EXPLORER_TERRAIN_CHOICES, maxChoices: 1, description: "Benefícios em terreno favorito." },
  { id: "ranger_fighting_style", level: 2, name: "Estilo de Luta", type: 'choice', choices: FIGHTING_STYLE_OPTIONS.filter(o => ["Arquearia","Combate com Duas Armas","Defesa","Duelismo"].includes(o.name)).map(o=>({value:o.name, label:o.name, description:o.description})), maxChoices: 1, description: "Escolha um estilo de combate." },
  { id: "ranger_spellcasting", level: 2, name: "Conjuração", type: 'auto', description: "Conjura magias de patrulheiro." },
  { id: "ranger_conclave", level: 3, name: "Conclave", type: 'choice', choices: RANGER_CONCLAVE_CHOICES, maxChoices: 1, description: "Arquétipo de Patrulheiro." },
  { id: "ranger_hunter_prey", level: 3, name: "Presa do Caçador", type: 'choice', choices: HUNTER_PREY_CHOICES, maxChoices: 1, subclassPrerequisite: { featureId: 'ranger_conclave', choiceValue: 'hunter' }, description: "Tática de combate." },
  { id: "ranger_gloom_stalker_magic", level: 3, name: "Magia do Caçador das Sombras", type: 'auto', subclassPrerequisite: { featureId: 'ranger_conclave', choiceValue: 'gloom_stalker' }, description: "Visão no escuro, invisível para visão no escuro." },
  { id: "ranger_gloom_stalker_dread_ambusher", level: 3, name: "Emboscador Pavoroso", type: 'auto', subclassPrerequisite: { featureId: 'ranger_conclave', choiceValue: 'gloom_stalker' }, description: "Bônus na iniciativa. No primeiro turno, +3m deslocamento e um ataque extra que causa +1d8." },
  { id: "ranger_horizon_walker_magic", level: 3, name: "Magia do Andarilho do Horizonte", type: 'auto', subclassPrerequisite: { featureId: 'ranger_conclave', choiceValue: 'horizon_walker' }, description: "Detectar portais e magias adicionais." },
  { id: "ranger_monster_slayer_magic", level: 3, name: "Magia do Matador de Monstros", type: 'auto', subclassPrerequisite: { featureId: 'ranger_conclave', choiceValue: 'monster_slayer' }, description: "Magias adicionais e Sentido de Caçador." },
  { id: "ranger_fey_wanderer_magic", level: 3, name: "Magia do Andarilho Feérico", type: 'auto', subclassPrerequisite: { featureId: 'ranger_conclave', choiceValue: 'fey_wanderer' }, description: "Magias adicionais e add SAB aos testes de Carisma." },
  { id: "ranger_primeval_awareness", level: 3, name: "Consciência Primitiva", type: 'auto', description: "Detectar criaturas gastando espaço de magia." },
  { id: "ranger_asi_4", level: 4, name: "ASI", type: 'asi', description: "Atributo ou Talento." },
  { id: "ranger_extra_attack", level: 5, name: "Ataque Extra", type: 'auto', description: "Dois ataques por ação." },
  { id: "ranger_favored_enemy_6", level: 6, name: "Inimigo Favorito (2º)", type: 'choice', choices: FAVORED_ENEMY_CHOICES, maxChoices: 1, description: "Segundo inimigo favorito." },
  { id: "ranger_natural_explorer_6", level: 6, name: "Explorador Natural (2º)", type: 'choice', choices: NATURAL_EXPLORER_TERRAIN_CHOICES, maxChoices: 1, description: "Segundo terreno favorito." },
  { id: "ranger_hunter_defensive_tactics", level: 7, name: "Táticas Defensivas", type: 'choice', choices: DEFENSIVE_TACTICS_CHOICES, maxChoices: 1, subclassPrerequisite: { featureId: 'ranger_conclave', choiceValue: 'hunter' }, description: "Defesa aprimorada." },
  { id: "ranger_land_stride", level: 8, name: "Pés Rápidos", type: 'auto', description: "Ignora terreno difícil não mágico." },
  { id: "ranger_natural_explorer_10", level: 10, name: "Explorador Natural (3º)", type: 'choice', choices: NATURAL_EXPLORER_TERRAIN_CHOICES, maxChoices: 1, description: "Terceiro terreno favorito." },
  { id: "ranger_hide_in_plain_sight", level: 10, name: "Mimetismo", type: 'auto', description: "+10 Furtividade se imóvel." },
  { id: "ranger_hunter_multiattack", level: 11, name: "Ataque Múltiplo", type: 'choice', choices: MULTIATTACK_CHOICES, maxChoices: 1, subclassPrerequisite: { featureId: 'ranger_conclave', choiceValue: 'hunter' }, description: "Ataque em área." },
  { id: "ranger_vanish", level: 14, name: "Desaparecer", type: 'auto', description: "Esconder como ação bônus, não pode ser rastreado." },
  { id: "ranger_hunter_superior_defense", level: 15, name: "Defesa Superior", type: 'choice', choices: SUPERIOR_HUNTERS_DEFENSE_CHOICES, maxChoices: 1, subclassPrerequisite: { featureId: 'ranger_conclave', choiceValue: 'hunter' }, description: "Defesa de alto nível." },
];

// --- WIZARD DEFINITIONS ---
export const WIZARD_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
  { id: "wizard_spellcasting", level: 1, name: "Conjuração", type: 'auto', description: "Grimório, rituais, INT." },
  { id: "wizard_arcane_recovery", level: 1, name: "Recuperação Arcana", type: 'auto', description: "Recupera slots em descanso curto." },
  { id: "wizard_arcane_tradition", level: 2, name: "Tradição Arcana", type: 'choice', choices: WIZARD_ARCANE_TRADITION_CHOICES, maxChoices: 1, description: "Escolha sua Escola." },
  { id: "wizard_abjuration_ward", level: 2, name: "Ala Arcana", type: 'auto', subclassPrerequisite: {featureId:'wizard_arcane_tradition', choiceValue:'abjuration'}, description: "Escudo de PV temporários." },
  { id: "wizard_evocation_sculpt", level: 2, name: "Esculpir Magias", type: 'auto', subclassPrerequisite: {featureId:'wizard_arcane_tradition', choiceValue:'evocation'}, description: "Protege aliados de magias de área." },
  { id: "wizard_divination_portent", level: 2, name: "Portento", type: 'auto', subclassPrerequisite: {featureId:'wizard_arcane_tradition', choiceValue:'divination'}, description: "Rola 2d20 e guarda os resultados." },
  { id: "wizard_bladesinging_song", level: 2, name: "Canção da Lâmina", type: 'auto', subclassPrerequisite: {featureId:'wizard_arcane_tradition', choiceValue:'bladesinging'}, description: "Bônus na CA, concentração e deslocamento." },
  { id: "wizard_war_magic_deflection", level: 2, name: "Deflexão Arcana", type: 'auto', subclassPrerequisite: {featureId:'wizard_arcane_tradition', choiceValue:'war_magic'}, description: "Reação para +2 CA ou +4 no teste de resistência." },
  { id: "wizard_necromancy_reap", level: 2, name: "Colheita Macabra", type: 'auto', subclassPrerequisite: {featureId:'wizard_arcane_tradition', choiceValue:'necromancy'}, description: "Recupera PV ao matar com magia." },
  { id: "wizard_conjuration_object", level: 2, name: "Conjuração Menor", type: 'auto', subclassPrerequisite: {featureId:'wizard_arcane_tradition', choiceValue:'conjuration'}, description: "Cria objeto inanimado temporário." },
  { id: "wizard_enchantment_gaze", level: 2, name: "Olhar Hipnótico", type: 'auto', subclassPrerequisite: {featureId:'wizard_arcane_tradition', choiceValue:'enchantment'}, description: "Imobiliza uma criatura com olhar." },
  { id: "wizard_illusion_minor", level: 2, name: "Ilusão Menor Aprimorada", type: 'auto', subclassPrerequisite: {featureId:'wizard_arcane_tradition', choiceValue:'illusion'}, description: "Ilusão Menor ganha som e imagem simultâneos." },
  { id: "wizard_transmutation_alchemy", level: 2, name: "Alquimia Menor", type: 'auto', subclassPrerequisite: {featureId:'wizard_arcane_tradition', choiceValue:'transmutation'}, description: "Transforma material temporariamente." },
  { id: "wizard_scribes_pen", level: 2, name: "Pena Mágica", type: 'auto', subclassPrerequisite: {featureId:'wizard_arcane_tradition', choiceValue:'scribes'}, description: "Cria pena mágica, muda tipo de dano de magias." },
  { id: "wizard_asi_4", level: 4, name: "ASI", type: 'asi', description: "Atributo ou Talento." },
];

// --- FIGHTER DEFINITIONS ---
export const FIGHTER_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
  { id: "fighter_fighting_style", level: 1, name: "Estilo de Luta", type: 'choice', choices: FIGHTING_STYLE_OPTIONS.filter(o=>o.name!=="").map(o=>({value:o.name,label:o.name,description:o.description})), maxChoices: 1, description: "Especialização em combate." },
  { id: "fighter_second_wind", level: 1, name: "Retomar o Fôlego", type: 'auto', description: "Recupera 1d10 + Nível PV (Bônus)." },
  { id: "fighter_action_surge", level: 2, name: "Surto de Ação", type: 'auto', description: "Ação extra no turno (1/descanso)." },
  { id: "fighter_martial_archetype", level: 3, name: "Arquétipo Marcial", type: 'choice', choices: FIGHTER_MARTIAL_ARCHETYPE_CHOICES, maxChoices: 1, description: "Subclasse." },
  { id: "fighter_champion_crit", level: 3, name: "Crítico Aprimorado", type: 'auto', subclassPrerequisite: {featureId:'fighter_martial_archetype', choiceValue:'champion'}, description: "Crítico no 19-20." },
  { id: "fighter_battle_master_combat_superiority", level: 3, name: "Dados de Superioridade", type: 'auto', subclassPrerequisite: {featureId:'fighter_martial_archetype', choiceValue:'battle_master'}, description: "Você tem 4 dados de superioridade (d8)." },
  { id: "fighter_battle_master_maneuver_1", level: 3, name: "Manobra (Opção 1)", type: 'choice', choices: BATTLE_MASTER_MANEUVER_CHOICES, maxChoices: 1, subclassPrerequisite: {featureId:'fighter_martial_archetype', choiceValue:'battle_master'}, description: "Técnica de combate." },
  { id: "fighter_battle_master_maneuver_2", level: 3, name: "Manobra (Opção 2)", type: 'choice', choices: BATTLE_MASTER_MANEUVER_CHOICES, maxChoices: 1, subclassPrerequisite: {featureId:'fighter_martial_archetype', choiceValue:'battle_master'}, description: "Técnica de combate." },
  { id: "fighter_battle_master_maneuver_3", level: 3, name: "Manobra (Opção 3)", type: 'choice', choices: BATTLE_MASTER_MANEUVER_CHOICES, maxChoices: 1, subclassPrerequisite: {featureId:'fighter_martial_archetype', choiceValue:'battle_master'}, description: "Técnica de combate." },
  { id: "fighter_eldritch_knight_spellcasting", level: 3, name: "Conjuração", type: 'auto', subclassPrerequisite: {featureId:'fighter_martial_archetype', choiceValue:'eldritch_knight'}, description: "Magias de Mago (Abjuração/Evocação)." },
  { id: "fighter_samurai_spirit", level: 3, name: "Espírito de Lutador", type: 'auto', subclassPrerequisite: {featureId:'fighter_martial_archetype', choiceValue:'samurai'}, description: "Vantagem em ataques e PV temporários (3/dia)." },
  { id: "fighter_rune_knight_runes", level: 3, name: "Talhador de Runas", type: 'auto', subclassPrerequisite: {featureId:'fighter_martial_archetype', choiceValue:'rune_knight'}, description: "Conhece runas mágicas e Poder do Gigante." },
  { id: "fighter_echo_knight_manifest", level: 3, name: "Manifestar Eco", type: 'auto', subclassPrerequisite: {featureId:'fighter_martial_archetype', choiceValue:'echo_knight'}, description: "Cria um eco para atacar e teleportar." },
  { id: "fighter_cavalier_mark", level: 3, name: "Marca Inabalável", type: 'auto', subclassPrerequisite: {featureId:'fighter_martial_archetype', choiceValue:'cavalier'}, description: "Marca inimigos para desvantagem contra outros." },
  { id: "fighter_arcane_archer_shots", level: 3, name: "Tiro Arcano", type: 'auto', subclassPrerequisite: {featureId:'fighter_martial_archetype', choiceValue:'arcane_archer'}, description: "Opções de flechas mágicas (2/descanso)." },
  { id: "fighter_asi_4", level: 4, name: "ASI", type: 'asi', description: "Atributo ou Talento." },
  { id: "fighter_extra_attack", level: 5, name: "Ataque Extra", type: 'auto', description: "Dois ataques por ação." },
];

// --- BARBARIAN DEFINITIONS ---
export const BARBARIAN_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
  { id: "barbarian_rage", level: 1, name: "Fúria", description: "Vantagem FOR, Res. Dano físico, +Dano.", type: 'auto' },
  { id: "barbarian_unarmored", level: 1, name: "Defesa sem Armadura", description: "CA = 10 + DES + CON.", type: 'auto' },
  { id: "barbarian_reckless", level: 2, name: "Ataque Descuidado", description: "Vantagem no ataque, inimigos têm vantagem contra você.", type: 'auto' },
  { id: "barbarian_primal_path", level: 3, name: "Caminho Primitivo", type: 'choice', choices: BARBARIAN_PRIMAL_PATH_CHOICES, maxChoices: 1, description: "Escolha seu Caminho Primitivo." },
  { id: "barbarian_berserker_frenzy", level: 3, name: "Frenesi", type: 'auto', subclassPrerequisite: {featureId:'barbarian_primal_path', choiceValue:'berserker'}, description: "Ataque como ação bônus (causa exaustão)." },
  { id: "barbarian_totem_spirit", level: 3, name: "Espírito Totêmico", type: 'choice', choices: TOTEM_SPIRIT_CHOICES, maxChoices: 1, subclassPrerequisite: {featureId:'barbarian_primal_path', choiceValue:'totem_warrior'}, description: "Urso, Águia ou Lobo." },
  { id: "barbarian_zealot_divine_fury", level: 3, name: "Fúria Divina", type: 'auto', subclassPrerequisite: {featureId:'barbarian_primal_path', choiceValue:'zealot'}, description: "Dano necrótico ou radiante extra no primeiro ataque." },
  { id: "barbarian_ancestral_protectors", level: 3, name: "Protetores Ancestrais", type: 'auto', subclassPrerequisite: {featureId:'barbarian_primal_path', choiceValue:'ancestral_guardian'}, description: "Inimigo atingido tem desvantagem contra outros." },
  { id: "barbarian_storm_aura", level: 3, name: "Aura da Tempestade", type: 'auto', subclassPrerequisite: {featureId:'barbarian_primal_path', choiceValue:'storm_herald'}, description: "Aura de fogo, gelo ou raio." },
  { id: "barbarian_beast_form", level: 3, name: "Forma da Besta", type: 'auto', subclassPrerequisite: {featureId:'barbarian_primal_path', choiceValue:'beast'}, description: "Mordida, garras ou cauda naturais." },
  { id: "barbarian_wild_magic_surge", level: 3, name: "Surto Selvagem", type: 'auto', subclassPrerequisite: {featureId:'barbarian_primal_path', choiceValue:'wild_magic'}, description: "Efeito aleatório ao entrar em fúria." },
  { id: "barbarian_asi_4", level: 4, name: "ASI", type: 'asi', description: "Atributo ou Talento." },
  { id: "barbarian_extra_attack", level: 5, name: "Ataque Extra", type: 'auto', description: "Dois ataques por ação." },
];

// --- BARD DEFINITIONS ---
export const BARD_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
  { id: "bard_spellcasting", level: 1, name: "Conjuração", type: 'auto', description: "Carisma, rituais." },
  { id: "bard_inspiration", level: 1, name: "Inspiração de Bardo", type: 'auto', description: "Dado bônus para aliados (d6)." },
  { id: "bard_jack", level: 2, name: "Pau para Toda Obra", type: 'auto', description: "Metade proficiência em testes não proficientes." },
  { id: "bard_college", level: 3, name: "Colégio de Bardo", type: 'choice', choices: BARD_COLLEGE_CHOICES, maxChoices: 1, description: "Escolha seu Colégio de Bardo." },
  { id: "bard_lore_skills", level: 3, name: "Proficiências Adicionais", type: 'auto', subclassPrerequisite: {featureId:'bard_college', choiceValue:'lore'}, description: "3 perícias quaisquer." },
  { id: "bard_lore_cutting", level: 3, name: "Palavras Cortantes", type: 'auto', subclassPrerequisite: {featureId:'bard_college', choiceValue:'lore'}, description: "Reduz ataque ou dano inimigo." },
  { id: "bard_valor_combat", level: 3, name: "Inspiração em Combate", type: 'auto', subclassPrerequisite: {featureId:'bard_college', choiceValue:'valor'}, description: "Inspiração adiciona ao dano ou CA." },
  { id: "bard_glamour_mantle", level: 3, name: "Manto de Inspiração", type: 'auto', subclassPrerequisite: {featureId:'bard_college', choiceValue:'glamour'}, description: "PV temp e movimento para aliados." },
  { id: "bard_swords_flourish", level: 3, name: "Floreio de Lâmina", type: 'auto', subclassPrerequisite: {featureId:'bard_college', choiceValue:'swords'}, description: "Efeitos extras em ataques." },
  { id: "bard_whispers_venom", level: 3, name: "Lâminas Psíquicas", type: 'auto', subclassPrerequisite: {featureId:'bard_college', choiceValue:'whispers'}, description: "Dano psíquico extra com inspiração." },
  { id: "bard_eloquence_silver", level: 3, name: "Língua de Prata", type: 'auto', subclassPrerequisite: {featureId:'bard_college', choiceValue:'eloquence'}, description: "Mínimo 10 em Persuasão/Enganação." },
  { id: "bard_creation_mote", level: 3, name: "Mote de Potencial", type: 'auto', subclassPrerequisite: {featureId:'bard_college', choiceValue:'creation'}, description: "Efeitos extras na inspiração." },
  { id: "bard_expertise", level: 3, name: "Aptidão", type: 'auto', description: "Dobra proficiência em 2 perícias." },
  { id: "bard_asi_4", level: 4, name: "ASI", type: 'asi', description: "Atributo ou Talento." },
];

// --- CLERIC DEFINITIONS ---
export const CLERIC_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
  { id: "cleric_spellcasting", level: 1, name: "Conjuração", type: 'auto', description: "Sabedoria, prepara magias." },
  { id: "cleric_domain", level: 1, name: "Domínio Divino", type: 'choice', choices: CLERIC_DOMAIN_CHOICES, maxChoices: 1, description: "Escolha seu Domínio Divino." },
  { id: "cleric_life_disciple", level: 1, name: "Discípulo da Vida", type: 'auto', subclassPrerequisite: {featureId:'cleric_domain', choiceValue:'life'}, description: "Cura adicional (2 + nível magia)." },
  { id: "cleric_war_priest", level: 1, name: "Sacerdote da Guerra", type: 'auto', subclassPrerequisite: {featureId:'cleric_domain', choiceValue:'war'}, description: "Ataque ação bônus (SAB vezes/dia)." },
  { id: "cleric_light_flare", level: 1, name: "Fulgor Protetor", type: 'auto', subclassPrerequisite: {featureId:'cleric_domain', choiceValue:'light'}, description: "Desvantagem em ataque contra você." },
  { id: "cleric_tempest_wrath", level: 1, name: "Ira da Tempestade", type: 'auto', subclassPrerequisite: {featureId:'cleric_domain', choiceValue:'tempest'}, description: "Reação causa dano elétrico/trovejante." },
  { id: "cleric_trickery_blessing", level: 1, name: "Bênção do Trapaceiro", type: 'auto', subclassPrerequisite: {featureId:'cleric_domain', choiceValue:'trickery'}, description: "Vantagem em Furtividade para aliado." },
  { id: "cleric_nature_acolyte", level: 1, name: "Acólito da Natureza", type: 'auto', subclassPrerequisite: {featureId:'cleric_domain', choiceValue:'nature'}, description: "Proficiência pesada, truque druida, perícia." },
  { id: "cleric_knowledge_blessing", level: 1, name: "Bênção do Conhecimento", type: 'auto', subclassPrerequisite: {featureId:'cleric_domain', choiceValue:'knowledge'}, description: "Dois idiomas, perícias com dobro proficiência." },
  { id: "cleric_grave_circle", level: 1, name: "Círculo da Mortalidade", type: 'auto', subclassPrerequisite: {featureId:'cleric_domain', choiceValue:'grave'}, description: "Cura máxima em alvo com 0 PV." },
  { id: "cleric_forge_blessing", level: 1, name: "Bênção da Forja", type: 'auto', subclassPrerequisite: {featureId:'cleric_domain', choiceValue:'forge'}, description: "+1 CA ou ataque/dano em item." },
  { id: "cleric_order_voice", level: 1, name: "Voz de Autoridade", type: 'auto', subclassPrerequisite: {featureId:'cleric_domain', choiceValue:'order'}, description: "Aliado pode atacar quando recebe magia." },
  { id: "cleric_peace_bond", level: 1, name: "Vínculo de Encorajamento", type: 'auto', subclassPrerequisite: {featureId:'cleric_domain', choiceValue:'peace'}, description: "+1d4 em ataques/testes para aliados vinculados." },
  { id: "cleric_twilight_eyes", level: 1, name: "Olhos da Noite", type: 'auto', subclassPrerequisite: {featureId:'cleric_domain', choiceValue:'twilight'}, description: "Visão no escuro 90m (compartilhável)." },
  { id: "cleric_channel", level: 2, name: "Canalizar Divindade", type: 'auto', description: "Expulsar Mortos-Vivos + efeito do domínio." },
  { id: "cleric_asi_4", level: 4, name: "ASI", type: 'asi', description: "Atributo ou Talento." },
];

// --- DRUID DEFINITIONS ---
export const DRUID_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
  { id: "druid_spellcasting", level: 1, name: "Conjuração", type: 'auto', description: "Sabedoria, Druídico." },
  { id: "druid_circle", level: 2, name: "Círculo Druídico", type: 'choice', choices: DRUID_CIRCLE_CHOICES, maxChoices: 1, description: "Subclasse." },
  { id: "druid_wild_shape", level: 2, name: "Forma Selvagem", type: 'auto', description: "Transformar em besta (2/descanso)." },
  { id: "druid_moon_combat", level: 2, name: "Forma de Combate", type: 'auto', subclassPrerequisite: {featureId:'druid_circle', choiceValue:'moon'}, description: "ND 1, ação bônus." },
  { id: "druid_land_recovery", level: 2, name: "Recuperação Natural", type: 'auto', subclassPrerequisite: {featureId:'druid_circle', choiceValue:'land'}, description: "Recupera slots em descanso curto." },
  { id: "druid_dreams_balm", level: 2, name: "Bálsamo da Corte de Verão", type: 'auto', subclassPrerequisite: {featureId:'druid_circle', choiceValue:'dreams'}, description: "Dados de cura (d6) ação bônus." },
  { id: "druid_shepherd_speech", level: 2, name: "Fala da Floresta", type: 'auto', subclassPrerequisite: {featureId:'druid_circle', choiceValue:'shepherd'}, description: "Fala com animais, Silvestre." },
  { id: "druid_spores_entity", level: 2, name: "Entidade Simbiótica", type: 'auto', subclassPrerequisite: {featureId:'druid_circle', choiceValue:'spores'}, description: "PV temp e dano necrótico extra." },
  { id: "druid_stars_form", level: 2, name: "Forma Estrelada", type: 'auto', subclassPrerequisite: {featureId:'druid_circle', choiceValue:'stars'}, description: "Arqueiro, Cálice ou Dragão." },
  { id: "druid_wildfire_spirit", level: 2, name: "Espírito do Fogo Selvagem", type: 'auto', subclassPrerequisite: {featureId:'druid_circle', choiceValue:'wildfire'}, description: "Invoca espírito de fogo." },
  { id: "druid_asi_4", level: 4, name: "ASI", type: 'asi', description: "Atributo ou Talento." },
];

// --- SORCERER DEFINITIONS ---
export const SORCERER_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
  { id: "sorcerer_origin", level: 1, name: "Origem de Feitiçaria", type: 'choice', choices: SORCERER_ORIGIN_CHOICES, maxChoices: 1, description: "Escolha a fonte do seu poder mágico." },
  {
    id: "sorcerer_draconic_ancestry",
    level: 1,
    name: "Ancestral Dracônico (Cor do Dragão)",
    type: 'choice',
    choices: DRAGON_ANCESTRY_CHOICES,
    maxChoices: 1,
    subclassPrerequisite: { featureId: 'sorcerer_origin', choiceValue: 'draconic' },
    description: "Escolha a cor do seu ancestral. Isso determina sua resistência e afinidade."
  },
  { id: "sorcerer_spellcasting", level: 1, name: "Conjuração", type: 'auto', description: "Carisma, magia inata." },
  { id: "sorcerer_draconic_resilience", level: 1, name: "Resiliência Dracônica", type: 'auto', subclassPrerequisite: {featureId:'sorcerer_origin', choiceValue:'draconic'}, description: "CA 13+DES, +1 PV/nível." },
  { id: "sorcerer_wild_surge", level: 1, name: "Surto Selvagem", type: 'auto', subclassPrerequisite: {featureId:'sorcerer_origin', choiceValue:'wild_magic'}, description: "Efeito aleatório em rolagens de 1." },
  { id: "sorcerer_divine_favored", level: 1, name: "Favorecido pelos Deuses", type: 'auto', subclassPrerequisite: {featureId:'sorcerer_origin', choiceValue:'divine_soul'}, description: "2d4 em falha de teste (1/descanso)." },
  { id: "sorcerer_shadow_eyes", level: 1, name: "Olhos do Escuro", type: 'auto', subclassPrerequisite: {featureId:'sorcerer_origin', choiceValue:'shadow'}, description: "Visão no escuro 36m, não morre com 0 PV (chance)." },
  { id: "sorcerer_storm_speech", level: 1, name: "Fala da Tempestade", type: 'auto', subclassPrerequisite: {featureId:'sorcerer_origin', choiceValue:'storm'}, description: "Voo curto ao conjurar." },
  { id: "sorcerer_aberrant_spells", level: 1, name: "Magias Psíquicas", type: 'auto', subclassPrerequisite: {featureId:'sorcerer_origin', choiceValue:'aberrant_mind'}, description: "Magias extras, telepatia." },
  { id: "sorcerer_clockwork_restore", level: 1, name: "Restaurar Equilíbrio", type: 'auto', subclassPrerequisite: {featureId:'sorcerer_origin', choiceValue:'clockwork_soul'}, description: "Anula vantagem/desvantagem." },
  { id: "sorcerer_font_magic", level: 2, name: "Pontos de Feitiçaria", type: 'auto', description: "Recurso para criar slots ou usar metamágica." },
  { id: "sorcerer_metamagic_1", level: 3, name: "Metamágica (Nível 3)", type: 'choice', choices: METAMAGIC_OPTIONS_CHOICES, maxChoices: 1, description: "Escolha UMA opção de Metamágica." },
  { id: "sorcerer_asi_4", level: 4, name: "ASI", type: 'asi', description: "Atributo ou Talento." },
  { id: "sorcerer_metamagic_2", level: 10, name: "Metamágica (Nível 10)", type: 'choice', choices: METAMAGIC_OPTIONS_CHOICES, maxChoices: 1, description: "Escolha mais UMA opção de Metamágica." },
  { id: "sorcerer_metamagic_3", level: 17, name: "Metamágica (Nível 17)", type: 'choice', choices: METAMAGIC_OPTIONS_CHOICES, maxChoices: 1, description: "Escolha mais UMA opção de Metamágica." },
];

// --- WARLOCK DEFINITIONS ---
export const WARLOCK_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
  { id: "warlock_patron", level: 1, name: "Patrono", type: 'choice', choices: WARLOCK_PATRON_CHOICES, maxChoices: 1, description: "Subclasse." },
  { id: "warlock_magic", level: 1, name: "Magia de Pacto", type: 'auto', description: "Slots recarregam em descanso curto." },
  { id: "warlock_fiend_temp_hp", level: 1, name: "Bênção do Tinhoso", type: 'auto', subclassPrerequisite: {featureId:'warlock_patron', choiceValue:'fiend'}, description: "PV temp ao matar." },
  { id: "warlock_archfey_presence", level: 1, name: "Presença Feérica", type: 'auto', subclassPrerequisite: {featureId:'warlock_patron', choiceValue:'archfey'}, description: "Enfeitiçar/Amedrontar em área." },
  { id: "warlock_goo_telepathy", level: 1, name: "Mente Desperta", type: 'auto', subclassPrerequisite: {featureId:'warlock_patron', choiceValue:'great_old_one'}, description: "Telepatia 9m." },
  { id: "warlock_hexblade_warrior", level: 1, name: "Guerreiro Hex", type: 'auto', subclassPrerequisite: {featureId:'warlock_patron', choiceValue:'hexblade'}, description: "Ataque com CAR, prof. média." },
  { id: "warlock_celestial_healing", level: 1, name: "Luz Curativa", type: 'auto', subclassPrerequisite: {featureId:'warlock_patron', choiceValue:'celestial'}, description: "Dados de cura d6." },
  { id: "warlock_fathomless_tentacle", level: 1, name: "Tentáculo do Abismo", type: 'auto', subclassPrerequisite: {featureId:'warlock_patron', choiceValue:'fathomless'}, description: "Tentáculo ataca e reduz velocidade." },
  { id: "warlock_genie_vessel", level: 1, name: "Vaso do Gênio", type: 'auto', subclassPrerequisite: {featureId:'warlock_patron', choiceValue:'genie'}, description: "Dano extra e esconderijo." },
  { id: "warlock_undead_form", level: 1, name: "Forma de Pavor", type: 'auto', subclassPrerequisite: {featureId:'warlock_patron', choiceValue:'undead'}, description: "PV temp e amedrontar ao atacar." },
  { id: "warlock_invocation_1", level: 2, name: "Invocação Mística (Opção 1)", type: 'choice', choices: WARLOCK_INVOCATION_CHOICES, maxChoices: 1, description: "Poder especial." },
  { id: "warlock_invocation_2", level: 2, name: "Invocação Mística (Opção 2)", type: 'choice', choices: WARLOCK_INVOCATION_CHOICES, maxChoices: 1, description: "Poder especial." },
  { id: "warlock_boon", level: 3, name: "Dádiva do Pacto", type: 'choice', choices: WARLOCK_PACT_BOON_CHOICES, maxChoices: 1, description: "Lâmina, Corrente, Tomo ou Talismã." },
  { id: "warlock_asi_4", level: 4, name: "ASI", type: 'asi', description: "Atributo ou Talento." },
];

// --- PALADIN DEFINITIONS ---
export const PALADIN_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
  { id: "paladin_sense", level: 1, name: "Sentido Divino", type: 'auto', description: "Detectar celestial, corruptor, morto-vivo." },
  { id: "paladin_hands", level: 1, name: "Cura Pelas Mãos", type: 'auto', description: "Cura PV total = 5 * Nível." },
  { id: "paladin_style", level: 2, name: "Estilo de Luta", type: 'choice', choices: FIGHTING_STYLE_OPTIONS.filter(o=>["Defesa","Duelismo","Combate com Armas Grandes","Proteção"].includes(o.name)).map(o=>({value:o.name,label:o.name,description:o.description})), maxChoices: 1, description: "Especialização." },
  { id: "paladin_smite", level: 2, name: "Destruição Divina", type: 'auto', description: "Gasta slot para dano radiante." },
  { id: "paladin_oath", level: 3, name: "Juramento Sagrado", type: 'choice', choices: PALADIN_OATH_CHOICES, maxChoices: 1, description: "Subclasse." },
  { id: "paladin_devotion_channel", level: 3, name: "Canalizar: Arma Sagrada", type: 'auto', subclassPrerequisite: {featureId:'paladin_oath', choiceValue:'devotion'}, description: "Add CAR no ataque, luz." },
  { id: "paladin_ancients_channel", level: 3, name: "Canalizar: Ira da Natureza", type: 'auto', subclassPrerequisite: {featureId:'paladin_oath', choiceValue:'ancients'}, description: "Prende inimigos com vinhas." },
  { id: "paladin_vengeance_channel", level: 3, name: "Canalizar: Voto de Inimizade", type: 'auto', subclassPrerequisite: {featureId:'paladin_oath', choiceValue:'vengeance'}, description: "Vantagem contra um inimigo." },
  { id: "paladin_conquest_channel", level: 3, name: "Canalizar: Presença Conquistadora", type: 'auto', subclassPrerequisite: {featureId:'paladin_oath', choiceValue:'conquest'}, description: "Amedronta inimigos." },
  { id: "paladin_redemption_channel", level: 3, name: "Canalizar: Emissário da Paz", type: 'auto', subclassPrerequisite: {featureId:'paladin_oath', choiceValue:'redemption'}, description: "+5 Persuasão." },
  { id: "paladin_glory_channel", level: 3, name: "Canalizar: Atleta Inigualável", type: 'auto', subclassPrerequisite: {featureId:'paladin_oath', choiceValue:'glory'}, description: "Vantagem Atletismo/Acrobacia." },
  { id: "paladin_watchers_channel", level: 3, name: "Canalizar: Vontade do Observador", type: 'auto', subclassPrerequisite: {featureId:'paladin_oath', choiceValue:'watchers'}, description: "Vantagem em testes mentais." },
  { id: "paladin_crown_channel", level: 3, name: "Canalizar: Desafio do Campeão", type: 'auto', subclassPrerequisite: {featureId:'paladin_oath', choiceValue:'crown'}, description: "Impede inimigos de fugir." },
  { id: "paladin_oathbreaker_channel", level: 3, name: "Canalizar: Controlar Morto-Vivo", type: 'auto', subclassPrerequisite: {featureId:'paladin_oath', choiceValue:'oathbreaker'}, description: "Domina um morto-vivo." },
  { id: "paladin_asi_4", level: 4, name: "ASI", type: 'asi', description: "Atributo ou Talento." },
  { id: "paladin_extra_attack", level: 5, name: "Ataque Extra", type: 'auto', description: "Dois ataques por ação." },
  { id: "paladin_aura", level: 6, name: "Aura de Proteção", type: 'auto', description: "+CAR em testes de resistência." },
];

// --- ROGUE DEFINITIONS ---
export const ROGUE_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
  { id: "rogue_sneak", level: 1, name: "Ataque Furtivo", type: 'auto', description: "Dano extra com vantagem/aliado." },
  { id: "rogue_expertise", level: 1, name: "Aptidão", type: 'auto', description: "Dobra proficiência em 2 perícias." },
  { id: "rogue_cunning", level: 2, name: "Ação Astuta", type: 'auto', description: "Correr, Desengajar, Esconder como bônus." },
  { id: "rogue_archetype", level: 3, name: "Arquétipo de Ladino", type: 'choice', choices: ROGUE_ARCHETYPE_CHOICES, maxChoices: 1, description: "Subclasse." },
  { id: "rogue_thief_hands", level: 3, name: "Mãos Rápidas", type: 'auto', subclassPrerequisite: {featureId:'rogue_archetype', choiceValue:'thief'}, description: "Usar Objeto como ação bônus." },
  { id: "rogue_assassin_crit", level: 3, name: "Assassinar", type: 'auto', subclassPrerequisite: {featureId:'rogue_archetype', choiceValue:'assassin'}, description: "Vantagem contra quem não agiu, crítico em surpresa." },
  { id: "rogue_at_spells", level: 3, name: "Conjuração", type: 'auto', subclassPrerequisite: {featureId:'rogue_archetype', choiceValue:'arcane_trickster'}, description: "Magias de Mago (Ilusão/Encantamento)." },
  { id: "rogue_swash_footwork", level: 3, name: "Trabalho de Pés", type: 'auto', subclassPrerequisite: {featureId:'rogue_archetype', choiceValue:'swashbuckler'}, description: "Ataque impede oportunidade, furtivo 1x1." },
  { id: "rogue_inquisitive_ear", level: 3, name: "Ouvido para Mentiras", type: 'auto', subclassPrerequisite: {featureId:'rogue_archetype', choiceValue:'inquisitive'}, description: "Detectar mentiras." },
  { id: "rogue_mastermind_help", level: 3, name: "Mestre das Táticas", type: 'auto', subclassPrerequisite: {featureId:'rogue_archetype', choiceValue:'mastermind'}, description: "Ajudar como ação bônus à distância." },
  { id: "rogue_scout_skirmisher", level: 3, name: "Escaramuçador", type: 'auto', subclassPrerequisite: {featureId:'rogue_archetype', choiceValue:'scout'}, description: "Mover como reação quando inimigo se aproxima." },
  { id: "rogue_phantom_whispers", level: 3, name: "Sussurros dos Mortos", type: 'auto', subclassPrerequisite: {featureId:'rogue_archetype', choiceValue:'phantom'}, description: "Proficiência flutuante." },
  { id: "rogue_soulknife_blades", level: 3, name: "Lâminas Psíquicas", type: 'auto', subclassPrerequisite: {featureId:'rogue_archetype', choiceValue:'soulknife'}, description: "Adagas mentais." },
  { id: "rogue_asi_4", level: 4, name: "ASI", type: 'asi', description: "Atributo ou Talento." },
  { id: "rogue_uncanny", level: 5, name: "Esquiva Sobrenatural", type: 'auto', description: "Reação para reduzir dano à metade." },
];

// --- MONK DEFINITIONS ---
export const MONK_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
  { id: "monk_unarmored", level: 1, name: "Defesa sem Armadura", type: 'auto', description: "CA = 10 + DES + SAB." },
  { id: "monk_martial_arts", level: 1, name: "Artes Marciais", type: 'auto', description: "Desarmado com DES, dano d4, ataque bônus." },
  { id: "monk_ki", level: 2, name: "Ki", type: 'auto', description: "Pontos para habilidades especiais." },
  { id: "monk_movement", level: 2, name: "Movimento sem Armadura", type: 'auto', description: "+Deslocamento." },
  { id: "monk_tradition", level: 3, name: "Tradição Monástica", type: 'choice', choices: MONK_MONASTIC_TRADITION_CHOICES, maxChoices: 1, description: "Subclasse." },
  { id: "monk_open_hand_flurry", level: 3, name: "Técnica da Mão Aberta", type: 'auto', subclassPrerequisite: {featureId:'monk_tradition', choiceValue:'open_hand'}, description: "Efeitos extras na Rajada de Golpes." },
  { id: "monk_shadow_arts", level: 3, name: "Artes das Sombras", type: 'auto', subclassPrerequisite: {featureId:'monk_tradition', choiceValue:'shadow'}, description: "Magias de furtividade com Ki." },
  { id: "monk_elements_discipline", level: 3, name: "Disciplinas Elementais", type: 'auto', subclassPrerequisite: {featureId:'monk_tradition', choiceValue:'four_elements'}, description: "Magias elementais com Ki." },
  { id: "monk_kensei_weapons", level: 3, name: "Armas Kensei", type: 'auto', subclassPrerequisite: {featureId:'monk_tradition', choiceValue:'kensei'}, description: "+2 CA com arma, dano extra à distância." },
  { id: "monk_drunken_technique", level: 3, name: "Técnica do Bêbado", type: 'auto', subclassPrerequisite: {featureId:'monk_tradition', choiceValue:'drunken_master'}, description: "Desengajar e +3m movimento na Rajada." },
  { id: "monk_sun_bolt", level: 3, name: "Raios de Sol", type: 'auto', subclassPrerequisite: {featureId:'monk_tradition', choiceValue:'sun_soul'}, description: "Ataque à distância radiante." },
  { id: "monk_astral_arms", level: 3, name: "Braços do Eu Astral", type: 'auto', subclassPrerequisite: {featureId:'monk_tradition', choiceValue:'astral_self'}, description: "Braços espectrais atacam com SAB." },
  { id: "monk_mercy_healing", level: 3, name: "Mão da Cura/Malefício", type: 'auto', subclassPrerequisite: {featureId:'monk_tradition', choiceValue:'mercy'}, description: "Curar ou causar dano necrótico com Ki." },
  { id: "monk_deflect", level: 3, name: "Defletir Projéteis", type: 'auto', description: "Reduz dano de ataque à distância." },
  { id: "monk_asi_4", level: 4, name: "ASI", type: 'asi', description: "Atributo ou Talento." },
  { id: "monk_slow_fall", level: 4, name: "Queda Lenta", type: 'auto', description: "Reduz dano de queda." },
  { id: "monk_extra_attack", level: 5, name: "Ataque Extra", type: 'auto', description: "Dois ataques por ação." },
  { id: "monk_stun", level: 5, name: "Ataque Atordoante", type: 'auto', description: "Gasta Ki para atordoar." },
];

export const ALL_CLASS_FEATURES_MAP: Record<string, ClassFeatureDefinition[]> = {
  "Bárbaro": BARBARIAN_FEATURES_DEFINITIONS,
  "Bardo": BARD_FEATURES_DEFINITIONS,
  "Bruxo": WARLOCK_FEATURES_DEFINITIONS,
  "Clérigo": CLERIC_FEATURES_DEFINITIONS,
  "Druida": DRUID_FEATURES_DEFINITIONS,
  "Feiticeiro": SORCERER_FEATURES_DEFINITIONS,
  "Guerreiro": FIGHTER_FEATURES_DEFINITIONS,
  "Ladino": ROGUE_FEATURES_DEFINITIONS,
  "Mago": WIZARD_FEATURES_DEFINITIONS,
  "Monge": MONK_FEATURES_DEFINITIONS,
  "Paladino": PALADIN_FEATURES_DEFINITIONS,
  "Patrulheiro": RANGER_FEATURES_DEFINITIONS,
};
