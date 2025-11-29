
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Character, AttributeName, ATTRIBUTE_NAMES, ATTRIBUTE_LABELS, MagicInfo, Spell, 
  ClassFeatureDefinition, ClassFeatureSelection, FeatureChoiceDefinition, 
  RacialFeatureDefinition, RacialFeatureSelection, 
  RANKS, Rank, Feat, FeatSelection
} from '../types';
import { ALL_SKILLS, SkillDefinition, calculateProficiencyBonus } from '../skills';
import { 
    RACES, CLASSES, ALIGNMENTS, FIGHTING_STYLE_OPTIONS, 
    CLASS_SPELLCASTING_ABILITIES, getHitDieTypeForClass,
    getMaxRages, getMaxBardicInspirations, getMaxChannelDivinityUses,
    getMaxRelentlessEnduranceUses, getMaxSecondWindUses, getMaxActionSurgeUses,
    getMaxBreathWeaponUses, getMaxKiPoints, getMaxLayOnHandsPool,
    CLASS_SKILL_OPTIONS, BACKGROUND_DETAILS, BACKGROUNDS, calculateRaceAttributeBonuses
} from '../dndOptions';
import { ALL_AVAILABLE_SPELLS, getCantripsByClass, getSpellsByClassAndLevel } from '../spells'; 
import { ALL_FEATS, ALL_FEATS_MAP } from '../feats';
import { 
  getClassSpellSlots, 
  getClassCantripsKnownCount, 
  getClassSpellsKnownCount,
  getWizardLevel1SpellsForSpellbook,
  getClassMaxSpellLevel 
} from '../classFeatures'; 
import { ALL_CLASS_FEATURES_MAP } from '../classFeaturesData';
import { ALL_RACIAL_FEATURES_MAP } from '../racialFeaturesData'; 
import { calculateModifier, formatModifier } from './AttributeField';

import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';

interface CharacterFormProps {
  onSave: (character: Character) => void;
  initialData?: Character | null; 
}

interface SelectInputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string | number; label: string; description?: string }[];
  required?: boolean;
  disabled?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, name, value, onChange, options, required, disabled }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
    >
      <option value="" disabled>Selecione...</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} title={opt.description}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

interface StringSelectInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
}

const StringSelectInput: React.FC<StringSelectInputProps> = ({ label, name, value, onChange, options, required }) => (
  <SelectInput
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    options={options.map(opt => ({ value: opt, label: opt }))}
    required={required}
  />
);

const initialCharacterValues: Omit<Character, 'id' | 'magic' | 'classFeatures' | 'racialFeatures' | 'feats'> & { id?: string; magic: MagicInfo; classFeatures: ClassFeatureSelection[]; racialFeatures: RacialFeatureSelection[]; feats: FeatSelection[]; rank: Rank } = {
  photoUrl: '',
  name: '',
  background: BACKGROUNDS[0],
  race: RACES[0],
  charClass: CLASSES[0],
  age: 18,
  alignment: ALIGNMENTS[0],
  coins: 0,
  level: 1,
  hp: 10,
  hpt: 10,
  ac: 10,
  attributes: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  },
  proficientSkills: [],
  skillNotes: '',
  items: '',
  abilities: '',
  fightingStyle: FIGHTING_STYLE_OPTIONS.find(fso => fso.name === "")?.name || FIGHTING_STYLE_OPTIONS[0].name,
  magic: {
    spellcastingAbilityName: undefined,
    spellSaveDC: 0,
    spellAttackBonus: 0,
    cantripsKnown: [],
    spellsKnownPrepared: [],
    spellbook: [], 
    spellSlots: Array(9).fill(0),
    currentSpellSlots: Array(9).fill(0),
  },
  classFeatures: [],
  racialFeatures: [], 
  feats: [],
  rank: RANKS[0],
  maxHitDice: 1,
  currentHitDice: 1,
  hitDieType: getHitDieTypeForClass(CLASSES[0]),
  maxRages: getMaxRages(1),
  currentRages: getMaxRages(1),
  maxBardicInspirations: getMaxBardicInspirations(10),
  currentBardicInspirations: getMaxBardicInspirations(10),
  maxChannelDivinityUses: getMaxChannelDivinityUses(CLASSES[0], 1),
  currentChannelDivinityUses: getMaxChannelDivinityUses(CLASSES[0], 1),
  maxSecondWindUses: getMaxSecondWindUses(CLASSES[0]),
  currentSecondWindUses: getMaxSecondWindUses(CLASSES[0]),
  maxActionSurgeUses: getMaxActionSurgeUses(CLASSES[0], 1),
  currentActionSurgeUses: getMaxActionSurgeUses(CLASSES[0], 1),
  maxKiPoints: getMaxKiPoints(CLASSES[0], 1),
  currentKiPoints: getMaxKiPoints(CLASSES[0], 1),
  maxLayOnHandsPool: getMaxLayOnHandsPool(CLASSES[0], 1),
  currentLayOnHandsPool: getMaxLayOnHandsPool(CLASSES[0], 1),
  maxRelentlessEnduranceUses: getMaxRelentlessEnduranceUses(RACES[0]),
  currentRelentlessEnduranceUses: getMaxRelentlessEnduranceUses(RACES[0]),
  maxBreathWeaponUses: getMaxBreathWeaponUses(RACES[0]),
  currentBreathWeaponUses: getMaxBreathWeaponUses(RACES[0]),
};


export const CharacterForm: React.FC<CharacterFormProps> = ({ onSave, initialData }) => {
  const [formData, setFormData] = useState<Character>(() => {
    const baseData = initialData && initialData.id 
      ? { 
          ...initialCharacterValues, 
          ...initialData, 
          classFeatures: initialData.classFeatures || [], 
          racialFeatures: initialData.racialFeatures || [], 
          feats: initialData.feats || [],
          rank: initialData.rank || initialCharacterValues.rank,
          maxHitDice: initialData.maxHitDice || initialData.level || 1,
          currentHitDice: initialData.currentHitDice !== undefined ? initialData.currentHitDice : (initialData.level || 1),
          hitDieType: initialData.hitDieType || getHitDieTypeForClass(initialData.charClass || CLASSES[0]),
        } 
      : { 
          ...initialCharacterValues, 
          id: '', 
          proficientSkills: initialData?.proficientSkills || [], 
          classFeatures: [], 
          racialFeatures: [], 
          feats: [],
          rank: initialCharacterValues.rank,
          maxHitDice: initialCharacterValues.level,
          currentHitDice: initialCharacterValues.level,
          hitDieType: getHitDieTypeForClass(initialCharacterValues.charClass),
        };
    
    const initialSpellSlots = getClassSpellSlots(baseData.charClass, baseData.level);
    baseData.magic = {
      ...(initialCharacterValues.magic), 
      ...(baseData.magic || {}), 
      spellSlots: initialSpellSlots,
      currentSpellSlots: baseData.magic?.currentSpellSlots && baseData.magic.currentSpellSlots.length === 9 
                         ? baseData.magic.currentSpellSlots
                         : [...initialSpellSlots],
      cantripsKnown: baseData.magic?.cantripsKnown || [],
      spellsKnownPrepared: baseData.magic?.spellsKnownPrepared || [],
      spellbook: baseData.magic?.spellbook || [],
    };
    
    const initialPrimaryAbility = CLASS_SPELLCASTING_ABILITIES[baseData.charClass] || undefined;
    baseData.magic.spellcastingAbilityName = baseData.magic.spellcastingAbilityName || initialPrimaryAbility;
        
    const fightingStyleExists = FIGHTING_STYLE_OPTIONS.some(fso => fso.name === baseData.fightingStyle);
    if (!baseData.fightingStyle || !fightingStyleExists) {
        baseData.fightingStyle = FIGHTING_STYLE_OPTIONS.find(fso => fso.name === "")?.name || FIGHTING_STYLE_OPTIONS[0].name;
    }

    baseData.maxRages = initialData?.maxRages ?? getMaxRages(baseData.level);
    baseData.currentRages = initialData?.currentRages ?? baseData.maxRages;
    baseData.maxBardicInspirations = initialData?.maxBardicInspirations ?? getMaxBardicInspirations(baseData.attributes.charisma);
    baseData.currentBardicInspirations = initialData?.currentBardicInspirations ?? baseData.maxBardicInspirations;
    baseData.maxChannelDivinityUses = initialData?.maxChannelDivinityUses ?? getMaxChannelDivinityUses(baseData.charClass, baseData.level);
    baseData.currentChannelDivinityUses = initialData?.currentChannelDivinityUses ?? baseData.maxChannelDivinityUses;
    baseData.maxSecondWindUses = initialData?.maxSecondWindUses ?? getMaxSecondWindUses(baseData.charClass);
    baseData.currentSecondWindUses = initialData?.currentSecondWindUses ?? baseData.maxSecondWindUses;
    baseData.maxActionSurgeUses = initialData?.maxActionSurgeUses ?? getMaxActionSurgeUses(baseData.charClass, baseData.level);
    baseData.currentActionSurgeUses = initialData?.currentActionSurgeUses ?? baseData.maxActionSurgeUses;
    baseData.maxKiPoints = initialData?.maxKiPoints ?? getMaxKiPoints(baseData.charClass, baseData.level);
    baseData.currentKiPoints = initialData?.currentKiPoints ?? baseData.maxKiPoints;
    baseData.maxLayOnHandsPool = initialData?.maxLayOnHandsPool ?? getMaxLayOnHandsPool(baseData.charClass, baseData.level);
    baseData.currentLayOnHandsPool = initialData?.currentLayOnHandsPool ?? baseData.maxLayOnHandsPool;
    baseData.maxRelentlessEnduranceUses = initialData?.maxRelentlessEnduranceUses ?? getMaxRelentlessEnduranceUses(baseData.race);
    baseData.currentRelentlessEnduranceUses = initialData?.currentRelentlessEnduranceUses ?? baseData.maxRelentlessEnduranceUses;
    baseData.maxBreathWeaponUses = initialData?.maxBreathWeaponUses ?? getMaxBreathWeaponUses(baseData.race);
    baseData.currentBreathWeaponUses = initialData?.currentBreathWeaponUses ?? baseData.maxBreathWeaponUses;

    return baseData;
  });

  const [chosenClassSkills, setChosenClassSkills] = useState<string[]>([]);
  const [chosenHalfElfSkills, setChosenHalfElfSkills] = useState<string[]>([]);
  
  const [prevRace, setPrevRace] = useState<string>(initialData?.race || RACES[0]);

  const [availableCantrips, setAvailableCantrips] = useState<Spell[]>([]);
  const [numCantripsAllowed, setNumCantripsAllowed] = useState<number>(0);
  
  const [availableL1WizardSpells, setAvailableL1WizardSpells] = useState<Spell[]>([]);
  const numInitialWizardSpellbookSpells = getWizardLevel1SpellsForSpellbook(); 

  const [availableSpellsForSelection, setAvailableSpellsForSelection] = useState<Spell[]>([]);
  const [numSpellsKnownAllowed, setNumSpellsKnownAllowed] = useState<number>(0);

  const [expandedSpellName, setExpandedSpellName] = useState<string | null>(null);

  const [calculatedSpellSaveDC, setCalculatedSpellSaveDC] = useState<number | null>(null);
  const [calculatedSpellAttackBonus, setCalculatedSpellAttackBonus] = useState<string | null>(null);
  const [selectedFightingStyleDescription, setSelectedFightingStyleDescription] = useState<string>('');


  const currentClassFeaturesDefinitions = useMemo(() => {
    return ALL_CLASS_FEATURES_MAP[formData.charClass] || [];
  }, [formData.charClass]);

  const currentRacialFeaturesDefinitions = useMemo(() => {
    return ALL_RACIAL_FEATURES_MAP[formData.race] || [];
  }, [formData.race]);

  const autoGrantedSkills = useMemo(() => {
    const skills = new Map<string, string>(); 
    const backgroundDetails = BACKGROUND_DETAILS[formData.background];
    if (backgroundDetails) {
        backgroundDetails.skillProficiencies.forEach(skillKey => {
            skills.set(skillKey, 'do Antecedente');
        });
    }
    const racialFeatures = ALL_RACIAL_FEATURES_MAP[formData.race] || [];
    racialFeatures.forEach(feature => {
        if (feature.grantsSkillProficiency) {
            skills.set(feature.grantsSkillProficiency, 'da Raça');
        }
    });
    return skills;
  }, [formData.background, formData.race]);

  const classSkillConfig = useMemo(() => CLASS_SKILL_OPTIONS[formData.charClass], [formData.charClass]);
  const isHalfElf = useMemo(() => formData.race === 'Meio-Elfo', [formData.race]);

  useEffect(() => {
    if (initialData?.proficientSkills) {
      const autoSkills = autoGrantedSkills; 
      const chosen = initialData.proficientSkills.filter(s => !autoSkills.has(s));
      
      const classChoices: string[] = [];
      const halfElfChoices: string[] = [];
      
      const isInitialDataHalfElf = initialData.race === 'Meio-Elfo';
      const initialClassSkillOptions = CLASS_SKILL_OPTIONS[initialData.charClass]?.options || [];

      chosen.forEach(skill => {
        if (isInitialDataHalfElf && !initialClassSkillOptions.includes(skill)) {
           halfElfChoices.push(skill);
        } else if (initialClassSkillOptions.includes(skill)) {
           classChoices.push(skill);
        }
      });
      
      setChosenClassSkills(classChoices);
      setChosenHalfElfSkills(halfElfChoices);
    }
  }, [initialData]); 

  useEffect(() => {
    setChosenClassSkills([]);
    setChosenHalfElfSkills([]);
  }, [formData.charClass, formData.race]);

  useEffect(() => {
    const finalSkills = new Set([
        ...Array.from(autoGrantedSkills.keys()),
        ...chosenClassSkills,
        ...chosenHalfElfSkills
    ]);
    setFormData(prev => {
        const newProficientSkills = Array.from(finalSkills);
        if (JSON.stringify(prev.proficientSkills.sort()) !== JSON.stringify(newProficientSkills.sort())) {
            return { ...prev, proficientSkills: newProficientSkills };
        }
        return prev;
    });
  }, [autoGrantedSkills, chosenClassSkills, chosenHalfElfSkills]);


  useEffect(() => {
    const baseData = initialData && initialData.id 
      ? { 
          ...initialCharacterValues, 
          ...initialData, 
          classFeatures: initialData.classFeatures || [], 
          racialFeatures: initialData.racialFeatures || [], 
          feats: initialData.feats || [],
          rank: initialData.rank || initialCharacterValues.rank,
          maxHitDice: initialData.maxHitDice || initialData.level || 1,
          currentHitDice: initialData.currentHitDice !== undefined ? initialData.currentHitDice : (initialData.level || 1),
          hitDieType: initialData.hitDieType || getHitDieTypeForClass(initialData.charClass || CLASSES[0]),
        }
      : { 
          ...initialCharacterValues, 
          id: '', 
          proficientSkills: initialData?.proficientSkills || [], 
          classFeatures: initialCharacterValues.classFeatures, 
          racialFeatures: initialCharacterValues.racialFeatures, 
          feats: initialCharacterValues.feats,
          rank: initialCharacterValues.rank,
          maxHitDice: initialCharacterValues.level,
          currentHitDice: initialCharacterValues.level,
          hitDieType: getHitDieTypeForClass(initialCharacterValues.charClass),
        };

    const initialSpellSlots = getClassSpellSlots(baseData.charClass, baseData.level);
    baseData.magic = {
      ...(initialCharacterValues.magic),
      ...(baseData.magic || {}),
      spellSlots: initialSpellSlots,
      currentSpellSlots: baseData.magic?.currentSpellSlots && baseData.magic.currentSpellSlots.length === 9 
                         ? baseData.magic.currentSpellSlots 
                         : [...initialSpellSlots],
      cantripsKnown: baseData.magic?.cantripsKnown || [],
      spellsKnownPrepared: baseData.magic?.spellsKnownPrepared || [],
      spellbook: baseData.magic?.spellbook || [],
    };
    
    const initialPrimaryAbility = CLASS_SPELLCASTING_ABILITIES[baseData.charClass] || undefined;
    baseData.magic.spellcastingAbilityName = baseData.magic.spellcastingAbilityName || initialPrimaryAbility;
    
    const fightingStyleExists = FIGHTING_STYLE_OPTIONS.some(fso => fso.name === baseData.fightingStyle);
    if (!baseData.fightingStyle || !fightingStyleExists) {
        baseData.fightingStyle = FIGHTING_STYLE_OPTIONS.find(fso => fso.name === "")?.name || FIGHTING_STYLE_OPTIONS[0].name;
    }

    baseData.maxRages = initialData?.maxRages ?? getMaxRages(baseData.level);
    baseData.currentRages = initialData?.currentRages ?? baseData.maxRages;
    baseData.maxBardicInspirations = initialData?.maxBardicInspirations ?? getMaxBardicInspirations(baseData.attributes.charisma);
    baseData.currentBardicInspirations = initialData?.currentBardicInspirations ?? baseData.maxBardicInspirations;
    baseData.maxChannelDivinityUses = initialData?.maxChannelDivinityUses ?? getMaxChannelDivinityUses(baseData.charClass, baseData.level);
    baseData.currentChannelDivinityUses = initialData?.currentChannelDivinityUses ?? baseData.maxChannelDivinityUses;
    baseData.maxSecondWindUses = initialData?.maxSecondWindUses ?? getMaxSecondWindUses(baseData.charClass);
    baseData.currentSecondWindUses = initialData?.currentSecondWindUses ?? baseData.maxSecondWindUses;
    baseData.maxActionSurgeUses = initialData?.maxActionSurgeUses ?? getMaxActionSurgeUses(baseData.charClass, baseData.level);
    baseData.currentActionSurgeUses = initialData?.currentActionSurgeUses ?? baseData.maxActionSurgeUses;
    baseData.maxKiPoints = initialData?.maxKiPoints ?? getMaxKiPoints(baseData.charClass, baseData.level);
    baseData.currentKiPoints = initialData?.currentKiPoints ?? baseData.maxKiPoints;
    baseData.maxLayOnHandsPool = initialData?.maxLayOnHandsPool ?? getMaxLayOnHandsPool(baseData.charClass, baseData.level);
    baseData.currentLayOnHandsPool = initialData?.currentLayOnHandsPool ?? baseData.maxLayOnHandsPool;
    baseData.maxRelentlessEnduranceUses = initialData?.maxRelentlessEnduranceUses ?? getMaxRelentlessEnduranceUses(baseData.race);
    baseData.currentRelentlessEnduranceUses = initialData?.currentRelentlessEnduranceUses ?? baseData.maxRelentlessEnduranceUses;
    baseData.maxBreathWeaponUses = initialData?.maxBreathWeaponUses ?? getMaxBreathWeaponUses(baseData.race);
    baseData.currentBreathWeaponUses = initialData?.currentBreathWeaponUses ?? baseData.maxBreathWeaponUses;


    setFormData(baseData);
  }, [initialData]);


  useEffect(() => {
    const fightingStyleFeatureSelection = formData.classFeatures?.find(
      cf => cf.featureId.includes('fighting_style') 
    );
    let currentFightingStyleName = formData.fightingStyle;

    if (fightingStyleFeatureSelection && fightingStyleFeatureSelection.choiceValue) {
      currentFightingStyleName = fightingStyleFeatureSelection.choiceValue;
      if (formData.fightingStyle !== currentFightingStyleName) {
         setFormData(prev => ({...prev, fightingStyle: currentFightingStyleName!}));
      }
    }
    
    const style = FIGHTING_STYLE_OPTIONS.find(fs => fs.name === currentFightingStyleName);
    setSelectedFightingStyleDescription(style ? style.description : (FIGHTING_STYLE_OPTIONS[0]?.description || ''));

  }, [formData.classFeatures, formData.fightingStyle]);


  useEffect(() => {
    const className = formData.charClass;
    const level = formData.level;
    const attributes = formData.attributes;
    const race = formData.race;

    setExpandedSpellName(null); 

    let currentAvailableCantrips: Spell[] = [];
    let currentNumCantripsAllowed = 0;
    let currentAvailableL1WizardSpells: Spell[] = [];
    let currentAvailableSpellsForSelection: Spell[] = [];
    let currentNumSpellsKnownAllowed = 0;

    if (className && level >= 1) {
      currentAvailableCantrips = getCantripsByClass(className);
      currentNumCantripsAllowed = getClassCantripsKnownCount(className, level);

      if (className === 'Mago') {
        currentAvailableL1WizardSpells = getSpellsByClassAndLevel('Mago', 1);
      } else if (['Patrulheiro', 'Feiticeiro', 'Bardo', 'Bruxo'].includes(className)) {
        const maxSpellLvlForClass = getClassMaxSpellLevel(className, level);
        let learnableSpells: Spell[] = [];
        for (let spellLvl = 1; spellLvl <= maxSpellLvlForClass; spellLvl++) {
          learnableSpells = [...learnableSpells, ...getSpellsByClassAndLevel(className, spellLvl)];
        }
        currentAvailableSpellsForSelection = learnableSpells;
        currentNumSpellsKnownAllowed = getClassSpellsKnownCount(className, level);
      } else if (['Clérigo', 'Druida', 'Paladino'].includes(className)){
        const maxSpellLvlForClass = getClassMaxSpellLevel(className, level);
        let preparableSpells: Spell[] = [];
         for (let spellLvl = 1; spellLvl <= maxSpellLvlForClass; spellLvl++) {
          preparableSpells = [...preparableSpells, ...getSpellsByClassAndLevel(className, spellLvl)];
        }
        currentAvailableSpellsForSelection = preparableSpells;
        currentNumSpellsKnownAllowed = Infinity; 
      }
    }
    
    setAvailableCantrips(currentAvailableCantrips);
    setNumCantripsAllowed(currentNumCantripsAllowed);
    setAvailableL1WizardSpells(currentAvailableL1WizardSpells);
    setAvailableSpellsForSelection(currentAvailableSpellsForSelection);
    setNumSpellsKnownAllowed(currentNumSpellsKnownAllowed);

    setFormData(prev => {
      const currentClass = prev.charClass;
      const currentRace = prev.race;
      const currentLevel = prev.level;
      const currentAttributes = prev.attributes;
      let updatedClassFeatures = [...(prev.classFeatures || [])];
      let updatedRacialFeatures = [...(prev.racialFeatures || [])];
      let fightingStyleFromFeature: string | undefined = undefined;

      const featuresForClass = ALL_CLASS_FEATURES_MAP[currentClass] || [];
      featuresForClass.forEach(featureDef => {
        if (featureDef.level <= currentLevel) {
          const existingFeatureIndex = updatedClassFeatures.findIndex(cf => cf.featureId === featureDef.id);
          if (existingFeatureIndex === -1) { 
            if (featureDef.type === 'auto' || featureDef.type === 'asi') {
              updatedClassFeatures.push({
                featureId: featureDef.id,
                featureName: featureDef.name,
                levelAcquired: featureDef.level,
                type: featureDef.type,
                description: featureDef.description,
              });
            }
          } else { 
             updatedClassFeatures[existingFeatureIndex] = {
                 ...updatedClassFeatures[existingFeatureIndex],
                 featureName: featureDef.name, 
                 description: featureDef.description, 
                 levelAcquired: featureDef.level, 
             };
          }
           if (featureDef.id.includes('fighting_style') && updatedClassFeatures[existingFeatureIndex]?.choiceValue) {
             fightingStyleFromFeature = updatedClassFeatures[existingFeatureIndex].choiceValue;
           }
        }
      });
      updatedClassFeatures = updatedClassFeatures.filter(cf => {
        const featureDef = featuresForClass.find(fdef => fdef.id === cf.featureId);
        if(!featureDef) return false;

        if(featureDef.type === 'asi' && cf.asiChoice === 'feat') {
             const originalFeatureDef = (ALL_CLASS_FEATURES_MAP[prev.charClass] || []).find(fdef => fdef.id === cf.featureId);
             return !!originalFeatureDef;
        }

        return featureDef.level <= currentLevel; 
      });

      const featuresForRace = ALL_RACIAL_FEATURES_MAP[currentRace] || [];
      const newRacialFeatures: RacialFeatureSelection[] = [];
      featuresForRace.forEach(racialDef => {
          const existingSelection = updatedRacialFeatures.find(rf => rf.featureId === racialDef.id);
          if (racialDef.type === 'auto') {
              newRacialFeatures.push({
                  featureId: racialDef.id,
                  featureName: racialDef.name,
                  type: racialDef.type,
                  description: racialDef.description,
              });
          } else if (racialDef.type === 'choice' && existingSelection) {
              newRacialFeatures.push(existingSelection);
          } else if (racialDef.type === 'choice' && !existingSelection) {
              newRacialFeatures.push({
                  featureId: racialDef.id,
                  featureName: racialDef.name,
                  type: racialDef.type,
                  description: racialDef.description,
              });
          }
      });
      updatedRacialFeatures = newRacialFeatures;
      
      const updatedMagic = { ...(prev.magic || initialCharacterValues.magic) };
      const primaryAbility = CLASS_SPELLCASTING_ABILITIES[currentClass] || undefined;
      
      if (updatedMagic.spellcastingAbilityName !== primaryAbility && 
        (!updatedMagic.spellcastingAbilityName || CLASS_SPELLCASTING_ABILITIES[initialData?.charClass || ''] !== updatedMagic.spellcastingAbilityName)) {
           if(CLASS_SPELLCASTING_ABILITIES[currentClass]) { 
             updatedMagic.spellcastingAbilityName = primaryAbility;
           }
      }
        
      const newMaxSpellSlots = getClassSpellSlots(currentClass, currentLevel);
      updatedMagic.spellSlots = newMaxSpellSlots;
      if(JSON.stringify(prev.magic?.spellSlots) !== JSON.stringify(newMaxSpellSlots)) {
        updatedMagic.currentSpellSlots = [...newMaxSpellSlots];
      }


      const validCantripNames = getCantripsByClass(currentClass).map(s => s.name);
      updatedMagic.cantripsKnown = (updatedMagic.cantripsKnown || []).filter(spellName => 
        validCantripNames.includes(spellName)
      );
      
      const highElfCantripFeatureSelection = updatedRacialFeatures.find(rf => rf.featureId === 'high_elf_cantrip');
      if (currentRace === 'Alto Elfo' && highElfCantripFeatureSelection?.choiceValue && !updatedMagic.cantripsKnown.includes(highElfCantripFeatureSelection.choiceValue)) {
         updatedMagic.cantripsKnown.push(highElfCantripFeatureSelection.choiceValue);
      } else if (currentRace !== 'Alto Elfo' && highElfCantripFeatureSelection?.choiceValue) {
         updatedMagic.cantripsKnown = updatedMagic.cantripsKnown.filter(c => c !== highElfCantripFeatureSelection.choiceValue);
      }


      if (currentClass === 'Mago') {
        const allWizardSpellNames = [];
        for(let i=0; i<=9; i++) allWizardSpellNames.push(...getSpellsByClassAndLevel('Mago', i).map(s => s.name));
        
        updatedMagic.spellbook = (updatedMagic.spellbook || []).filter(spellName =>
          allWizardSpellNames.includes(spellName)
        );
         updatedMagic.spellsKnownPrepared = (updatedMagic.spellsKnownPrepared || []).filter(spellName =>
            allWizardSpellNames.includes(spellName)
        );

      } else if (['Patrulheiro', 'Feiticeiro', 'Bardo', 'Bruxo'].includes(currentClass)) {
        const maxSpellLvl = getClassMaxSpellLevel(currentClass, currentLevel);
        let validKnownSpellNames: string[] = [];
        for (let spellLvl = 1; spellLvl <= maxSpellLvl; spellLvl++) {
          validKnownSpellNames = [...validKnownSpellNames, ...getSpellsByClassAndLevel(currentClass, spellLvl).map(s => s.name)];
        }
        updatedMagic.spellsKnownPrepared = (updatedMagic.spellsKnownPrepared || []).filter(spellName => 
          validKnownSpellNames.includes(spellName)
        );
      } else if (['Clérigo', 'Druida', 'Paladino'].includes(currentClass)) {
        const maxSpellLvl = getClassMaxSpellLevel(currentClass, currentLevel);
        let validPreparableSpellNames: string[] = [];
        for (let spellLvl = 1; spellLvl <= maxSpellLvl; spellLvl++) {
          validPreparableSpellNames = [...validPreparableSpellNames, ...getSpellsByClassAndLevel(currentClass, spellLvl).map(s => s.name)];
        }
        updatedMagic.spellsKnownPrepared = (updatedMagic.spellsKnownPrepared || []).filter(spellName =>
            validPreparableSpellNames.includes(spellName)
        );
      }
      
      let finalFightingStyle = prev.fightingStyle;
      if (fightingStyleFromFeature) {
        finalFightingStyle = fightingStyleFromFeature;
      }

      const newMaxHitDice = currentLevel > 0 ? currentLevel : 1;
      const newHitDieType = getHitDieTypeForClass(currentClass);
      let newCurrentHitDice = prev.currentHitDice;

      if (prev.maxHitDice !== newMaxHitDice || prev.hitDieType !== newHitDieType || 
          (initialData === null && prev.level !== currentLevel) ) { 
        newCurrentHitDice = newMaxHitDice;
      }
      newCurrentHitDice = Math.min(newCurrentHitDice, newMaxHitDice);

      const newMaxRages = getMaxRages(currentLevel);
      const newMaxBardicInspirations = getMaxBardicInspirations(currentAttributes.charisma);
      const newMaxChannelDivinityUses = getMaxChannelDivinityUses(currentClass, currentLevel);
      const newMaxSecondWindUses = getMaxSecondWindUses(currentClass);
      const newMaxActionSurgeUses = getMaxActionSurgeUses(currentClass, currentLevel);
      const newMaxKiPoints = getMaxKiPoints(currentClass, currentLevel);
      const newMaxLayOnHandsPool = getMaxLayOnHandsPool(currentClass, currentLevel);
      const newMaxRelentlessEnduranceUses = getMaxRelentlessEnduranceUses(currentRace);
      const newMaxBreathWeaponUses = getMaxBreathWeaponUses(currentRace);


      let newCurrentRages = prev.currentRages;
      if(prev.maxRages !== newMaxRages) newCurrentRages = newMaxRages;
      newCurrentRages = Math.min(newCurrentRages ?? newMaxRages, newMaxRages);
      
      let newCurrentBardicInspirations = prev.currentBardicInspirations;
      if(prev.maxBardicInspirations !== newMaxBardicInspirations) newCurrentBardicInspirations = newMaxBardicInspirations;
      newCurrentBardicInspirations = Math.min(newCurrentBardicInspirations ?? newMaxBardicInspirations, newMaxBardicInspirations);

      let newCurrentChannelDivinityUses = prev.currentChannelDivinityUses;
      if(prev.maxChannelDivinityUses !== newMaxChannelDivinityUses) newCurrentChannelDivinityUses = newMaxChannelDivinityUses;
      newCurrentChannelDivinityUses = Math.min(newCurrentChannelDivinityUses ?? newMaxChannelDivinityUses, newMaxChannelDivinityUses);

      let newCurrentSecondWindUses = prev.currentSecondWindUses;
      if(prev.maxSecondWindUses !== newMaxSecondWindUses) newCurrentSecondWindUses = newMaxSecondWindUses;
      newCurrentSecondWindUses = Math.min(newCurrentSecondWindUses ?? newMaxSecondWindUses, newMaxSecondWindUses);

      let newCurrentActionSurgeUses = prev.currentActionSurgeUses;
      if(prev.maxActionSurgeUses !== newMaxActionSurgeUses) newCurrentActionSurgeUses = newMaxActionSurgeUses;
      newCurrentActionSurgeUses = Math.min(newCurrentActionSurgeUses ?? newMaxActionSurgeUses, newMaxActionSurgeUses);
      
      let newCurrentKiPoints = prev.currentKiPoints;
      if(prev.maxKiPoints !== newMaxKiPoints) newCurrentKiPoints = newMaxKiPoints;
      newCurrentKiPoints = Math.min(newCurrentKiPoints ?? newMaxKiPoints, newMaxKiPoints);

      let newCurrentLayOnHandsPool = prev.currentLayOnHandsPool;
      if(prev.maxLayOnHandsPool !== newMaxLayOnHandsPool) newCurrentLayOnHandsPool = newMaxLayOnHandsPool;
      newCurrentLayOnHandsPool = Math.min(newCurrentLayOnHandsPool ?? newMaxLayOnHandsPool, newMaxLayOnHandsPool);

      let newCurrentRelentlessEnduranceUses = prev.currentRelentlessEnduranceUses;
      if(prev.maxRelentlessEnduranceUses !== newMaxRelentlessEnduranceUses) newCurrentRelentlessEnduranceUses = newMaxRelentlessEnduranceUses;
      newCurrentRelentlessEnduranceUses = Math.min(newCurrentRelentlessEnduranceUses ?? newMaxRelentlessEnduranceUses, newMaxRelentlessEnduranceUses);

      let newCurrentBreathWeaponUses = prev.currentBreathWeaponUses;
      if(prev.maxBreathWeaponUses !== newMaxBreathWeaponUses) newCurrentBreathWeaponUses = newMaxBreathWeaponUses;
      newCurrentBreathWeaponUses = Math.min(newCurrentBreathWeaponUses ?? newMaxBreathWeaponUses, newMaxBreathWeaponUses);


      if (JSON.stringify(prev.magic) !== JSON.stringify(updatedMagic) || 
          JSON.stringify(prev.classFeatures) !== JSON.stringify(updatedClassFeatures) ||
          JSON.stringify(prev.racialFeatures) !== JSON.stringify(updatedRacialFeatures) ||
          prev.fightingStyle !== finalFightingStyle ||
          prev.maxHitDice !== newMaxHitDice ||
          prev.currentHitDice !== newCurrentHitDice ||
          prev.hitDieType !== newHitDieType ||
          prev.maxRages !== newMaxRages || prev.currentRages !== newCurrentRages ||
          prev.maxBardicInspirations !== newMaxBardicInspirations || prev.currentBardicInspirations !== newCurrentBardicInspirations ||
          prev.maxChannelDivinityUses !== newMaxChannelDivinityUses || prev.currentChannelDivinityUses !== newCurrentChannelDivinityUses ||
          prev.maxSecondWindUses !== newMaxSecondWindUses || prev.currentSecondWindUses !== newCurrentSecondWindUses ||
          prev.maxActionSurgeUses !== newMaxActionSurgeUses || prev.currentActionSurgeUses !== newCurrentActionSurgeUses ||
          prev.maxKiPoints !== newMaxKiPoints || prev.currentKiPoints !== newCurrentKiPoints ||
          prev.maxLayOnHandsPool !== newMaxLayOnHandsPool || prev.currentLayOnHandsPool !== newCurrentLayOnHandsPool ||
          prev.maxRelentlessEnduranceUses !== newMaxRelentlessEnduranceUses || prev.currentRelentlessEnduranceUses !== newCurrentRelentlessEnduranceUses ||
          prev.maxBreathWeaponUses !== newMaxBreathWeaponUses || prev.currentBreathWeaponUses !== newCurrentBreathWeaponUses
          ) {
        return { 
            ...prev, 
            magic: updatedMagic, 
            classFeatures: updatedClassFeatures, 
            racialFeatures: updatedRacialFeatures, 
            fightingStyle: finalFightingStyle,
            maxHitDice: newMaxHitDice,
            currentHitDice: newCurrentHitDice,
            hitDieType: newHitDieType,
            maxRages: newMaxRages,
            currentRages: newCurrentRages,
            maxBardicInspirations: newMaxBardicInspirations,
            currentBardicInspirations: newCurrentBardicInspirations,
            maxChannelDivinityUses: newMaxChannelDivinityUses,
            currentChannelDivinityUses: newCurrentChannelDivinityUses,
            maxSecondWindUses: newMaxSecondWindUses,
            currentSecondWindUses: newCurrentSecondWindUses,
            maxActionSurgeUses: newMaxActionSurgeUses,
            currentActionSurgeUses: newCurrentActionSurgeUses,
            maxKiPoints: newMaxKiPoints,
            currentKiPoints: newCurrentKiPoints,
            maxLayOnHandsPool: newMaxLayOnHandsPool,
            currentLayOnHandsPool: newCurrentLayOnHandsPool,
            maxRelentlessEnduranceUses: newMaxRelentlessEnduranceUses,
            currentRelentlessEnduranceUses: newCurrentRelentlessEnduranceUses,
            maxBreathWeaponUses: newMaxBreathWeaponUses,
            currentBreathWeaponUses: newCurrentBreathWeaponUses,
        };
      }
      return prev; 
    });

  }, [formData.charClass, formData.level, formData.race, formData.attributes.charisma, initialData]);


  useEffect(() => {
    const spellcastingAbility = formData.magic?.spellcastingAbilityName;
    const attributes = formData.attributes;
    const level = formData.level;

    if (spellcastingAbility && attributes[spellcastingAbility] && level >= 1) {
      const abilityScore = attributes[spellcastingAbility];
      const racialBonuses = calculateRaceAttributeBonuses(formData.race, formData.racialFeatures);
      const bonus = racialBonuses[spellcastingAbility] || 0;
      const totalScore = abilityScore + bonus;

      const modifier = calculateModifier(totalScore);
      const proficiency = calculateProficiencyBonus(level);

      setCalculatedSpellSaveDC(8 + proficiency + modifier);
      setCalculatedSpellAttackBonus(formatModifier(proficiency + modifier));
    } else {
      setCalculatedSpellSaveDC(null);
      setCalculatedSpellAttackBonus(null);
    }
  }, [formData.magic?.spellcastingAbilityName, formData.attributes, formData.level, formData.race, formData.racialFeatures]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'file' && name === 'photoUrlFile') {
      return; 
    }
    
    if (name.startsWith('attributes.')) {
      const attributeName = name.split('.')[1] as AttributeName;
      setFormData(prev => {
        const updatedAttributes = {
            ...prev.attributes,
            [attributeName]: type === 'number' ? parseInt(value) || 0 : value,
        };
        const racialBonuses = calculateRaceAttributeBonuses(prev.race, prev.racialFeatures);
        const chaBonus = racialBonuses.charisma || 0;
        const totalCharisma = (updatedAttributes.charisma || 0) + chaBonus;

        const newMaxBardic = getMaxBardicInspirations(totalCharisma);
        return {
            ...prev,
            attributes: updatedAttributes,
            maxBardicInspirations: newMaxBardic,
            currentBardicInspirations: Math.min(prev.currentBardicInspirations ?? newMaxBardic, newMaxBardic)
        }
      });
    } else if (name.startsWith('magic.')) {
        const magicField = name.split('.')[1];
        if (magicField === 'spellSlots' || magicField === 'currentSpellSlots') {
            if (magicField === 'currentSpellSlots') {
               const index = parseInt(name.split('.')[2]);
               setFormData(prev => {
                   const newSlots = [...(prev.magic?.currentSpellSlots || [])];
                   newSlots[index] = parseInt(value) || 0;
                   return { ...prev, magic: { ...prev.magic!, currentSpellSlots: newSlots }};
               });
            }
        } else if (magicField === 'spellcastingAbilityName') {
            setFormData(prev => ({
                ...prev,
                magic: {
                ...(prev.magic || initialCharacterValues.magic),
                spellcastingAbilityName: value as AttributeName || undefined,
                }
            }));
        } else if (['cantripsKnown', 'spellsKnownPrepared', 'spellbook'].includes(magicField) && e.target.type === 'textarea') {
            setFormData(prev => ({
                ...prev,
                magic: {
                    ...(prev.magic || initialCharacterValues.magic),
                    [magicField]: value.split(',').map(s => s.trim()).filter(s => s),
                }
            }));
        } else {
            setFormData(prev => ({
            ...prev,
            magic: {
                ...(prev.magic || initialCharacterValues.magic),
                [magicField]: type === 'number' ? parseInt(value) || 0 : value,
            }
            }));
        }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value) || 0 : value,
      }));
    }
  };

  const handleClassFeatureChange = (featureId: string, choiceValue: string) => {
    setFormData(prev => {
        const featureDef = (ALL_CLASS_FEATURES_MAP[prev.charClass] || []).find(f => f.id === featureId);
        if (!featureDef) return prev;

        const choiceDef = featureDef.choices?.find(c => c.value === choiceValue);
        const newClassFeatures = [...(prev.classFeatures || [])];
        const existingFeatureIndex = newClassFeatures.findIndex(cf => cf.featureId === featureId);

        const selection: ClassFeatureSelection = {
            featureId: featureDef.id,
            featureName: featureDef.name,
            levelAcquired: featureDef.level,
            type: featureDef.type,
            choiceValue: choiceValue,
            choiceLabel: choiceDef?.label || choiceValue,
            description: choiceDef?.description || featureDef.description, 
        };

        if (existingFeatureIndex !== -1) {
            newClassFeatures[existingFeatureIndex] = selection;
        } else {
            newClassFeatures.push(selection);
        }

        return { ...prev, classFeatures: newClassFeatures };
    });
  };

  const handleClassFeatureMultiChoiceChange = (featureId: string, choiceValue: string, isChecked: boolean) => {
    setFormData(prev => {
        const featureDef = (ALL_CLASS_FEATURES_MAP[prev.charClass] || []).find(f => f.id === featureId);
        if (!featureDef) return prev;

        const newClassFeatures = [...(prev.classFeatures || [])];
        const existingFeatureIndex = newClassFeatures.findIndex(cf => cf.featureId === featureId);
        
        let selection: ClassFeatureSelection;
        if (existingFeatureIndex !== -1) {
            selection = { ...newClassFeatures[existingFeatureIndex] };
        } else {
            selection = {
                featureId: featureDef.id,
                featureName: featureDef.name,
                levelAcquired: featureDef.level,
                type: featureDef.type,
                description: featureDef.description,
                customChoiceText: '',
            };
        }

        let currentChoices = selection.customChoiceText ? selection.customChoiceText.split(',').filter(c => c) : [];
        if (isChecked) {
            if (currentChoices.length < (featureDef.maxChoices || 0) && !currentChoices.includes(choiceValue)) {
                currentChoices.push(choiceValue);
            }
        } else {
            const index = currentChoices.indexOf(choiceValue);
            if (index > -1) {
                currentChoices.splice(index, 1);
            }
        }
        
        selection.customChoiceText = currentChoices.join(',');

        if (existingFeatureIndex !== -1) {
            newClassFeatures[existingFeatureIndex] = selection;
        } else {
            newClassFeatures.push(selection);
        }

        return { ...prev, classFeatures: newClassFeatures };
    });
  };

  const handleAsiChange = (featureId: string, type: 'asi' | 'feat', value: string) => {
      setFormData(prev => {
          const featureDef = (ALL_CLASS_FEATURES_MAP[prev.charClass] || []).find(f => f.id === featureId);
          if(!featureDef) return prev;

          const newClassFeatures = [...(prev.classFeatures || [])];
          const existingFeatureIndex = newClassFeatures.findIndex(cf => cf.featureId === featureId);

          let selection: ClassFeatureSelection = {
              featureId: featureDef.id,
              featureName: featureDef.name,
              levelAcquired: featureDef.level,
              type: 'asi',
              asiChoice: type,
              description: featureDef.description
          };

          if (type === 'feat') {
              const feat = ALL_FEATS.find(f => f.id === value);
              selection.choiceValue = value;
              selection.choiceLabel = feat?.name;
              selection.description = feat?.description; 
          } else {
              selection.choiceValue = undefined;
              selection.choiceLabel = undefined;
          }

          if(existingFeatureIndex !== -1) {
              newClassFeatures[existingFeatureIndex] = selection;
          } else {
              newClassFeatures.push(selection);
          }
          return { ...prev, classFeatures: newClassFeatures };
      });
  };

  const handleRacialFeatureChange = (featureId: string, choiceValue: string) => {
    setFormData(prev => {
        const featureDef = (ALL_RACIAL_FEATURES_MAP[prev.race] || []).find(f => f.id === featureId);
        if (!featureDef) return prev;

        const choiceDef = featureDef.choices?.find(c => c.value === choiceValue);
        const newRacialFeatures = [...(prev.racialFeatures || [])];
        const existingFeatureIndex = newRacialFeatures.findIndex(rf => rf.featureId === featureId);

        const selection: RacialFeatureSelection = {
            featureId: featureDef.id,
            featureName: featureDef.name,
            type: featureDef.type,
            choiceValue: choiceValue,
            choiceLabel: choiceDef?.label || choiceValue,
            description: choiceDef?.description || featureDef.description, 
        };

        if (existingFeatureIndex !== -1) {
            newRacialFeatures[existingFeatureIndex] = selection;
        } else {
            newRacialFeatures.push(selection);
        }

        let updatedMagic = prev.magic ? {...prev.magic} : {...initialCharacterValues.magic};
        if (featureId === 'high_elf_cantrip') {
            const oldSelection = prev.racialFeatures?.find(rf => rf.featureId === 'high_elf_cantrip');
            let currentCantrips = [...(updatedMagic.cantripsKnown || [])];
            if (oldSelection?.choiceValue) {
                currentCantrips = currentCantrips.filter(c => c !== oldSelection.choiceValue);
            }
            if (choiceValue && !currentCantrips.includes(choiceValue)) {
                currentCantrips.push(choiceValue);
            }
            updatedMagic.cantripsKnown = currentCantrips;
        }

        return { ...prev, racialFeatures: newRacialFeatures, magic: updatedMagic };
    });
  };

  const handleRacialFeatureMultiChoiceChange = (featureId: string, choiceValue: string, isChecked: boolean) => {
    setFormData(prev => {
        const featureDef = (ALL_RACIAL_FEATURES_MAP[prev.race] || []).find(f => f.id === featureId);
        if (!featureDef) return prev;

        const newRacialFeatures = [...(prev.racialFeatures || [])];
        const existingFeatureIndex = newRacialFeatures.findIndex(rf => rf.featureId === featureId);
        
        let selection: RacialFeatureSelection;
        if (existingFeatureIndex !== -1) {
            selection = { ...newRacialFeatures[existingFeatureIndex] };
        } else {
            selection = {
                featureId: featureDef.id,
                featureName: featureDef.name,
                type: featureDef.type,
                description: featureDef.description,
                customChoiceText: '',
            };
        }

        let currentChoices = selection.customChoiceText ? selection.customChoiceText.split(',').filter(c => c) : [];
        if (isChecked) {
            if (currentChoices.length < (featureDef.maxChoices || 0) && !currentChoices.includes(choiceValue)) {
                currentChoices.push(choiceValue);
            }
        } else {
            const index = currentChoices.indexOf(choiceValue);
            if (index > -1) {
                currentChoices.splice(index, 1);
            }
        }
        
        selection.customChoiceText = currentChoices.join(',');

        if (existingFeatureIndex !== -1) {
            newRacialFeatures[existingFeatureIndex] = selection;
        } else {
            newRacialFeatures.push(selection);
        }

        return { ...prev, racialFeatures: newRacialFeatures };
    });
  };
  
  const handleMagicArrayChange = (field: keyof MagicInfo, value: string, isChecked: boolean, limit: number) => {
      setFormData(prev => {
          const currentArray = (prev.magic?.[field] as string[]) || [];
          let newArray = [...currentArray];
          
          if (isChecked) {
              if (newArray.length < limit && !newArray.includes(value)) {
                  newArray.push(value);
              }
          } else {
              newArray = newArray.filter(item => item !== value);
          }
          
          return {
              ...prev,
              magic: {
                  ...(prev.magic || initialCharacterValues.magic),
                  [field]: newArray
              }
          };
      });
  };

  const handleSkillChoiceChange = (skillKey: string, type: 'class' | 'half-elf') => {
    if (type === 'class') {
      setChosenClassSkills(prev => {
        if (prev.includes(skillKey)) {
          return prev.filter(s => s !== skillKey);
        } else {
          if (prev.length < (classSkillConfig?.count || 0)) {
            return [...prev, skillKey];
          }
          return prev;
        }
      });
    } else if (type === 'half-elf') {
      setChosenHalfElfSkills(prev => {
        if (prev.includes(skillKey)) {
          return prev.filter(s => s !== skillKey);
        } else {
          if (prev.length < 2) {
            return [...prev, skillKey];
          }
          return prev;
        }
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const renderSpellDetails = (spell: Spell) => (
    <div className="mt-2 p-3 bg-sky-100 dark:bg-slate-600/80 rounded text-xs text-slate-700 dark:text-slate-300 space-y-1 shadow-inner">
      <p><strong>Nível:</strong> {spell.level === 0 ? "Truque" : spell.level}</p>
      <p><strong>Escola:</strong> {spell.school}</p>
      <p><strong>Tempo de Conjuração:</strong> {spell.castingTime}</p>
      <p><strong>Alcance:</strong> {spell.range}</p>
      <p><strong>Componentes:</strong> {spell.components}</p>
      <p><strong>Duração:</strong> {spell.duration}</p>
      <p className="mt-1 whitespace-pre-wrap text-justify"><strong>Descrição:</strong> {spell.description}</p>
    </div>
  );

  const renderSpellListItem = (spell: Spell, field: keyof MagicInfo, selectedList: string[] | undefined, limit: number) => {
    const isSelected = selectedList?.includes(spell.name) || false;
    const isLimitReached = (selectedList?.length || 0) >= limit;
    const isDisabled = !isSelected && isLimitReached;

    return (
      <div key={spell.name} className="border border-slate-200 dark:border-slate-700 rounded-md p-2 mb-2 bg-white dark:bg-slate-800">
        <div className="flex items-start">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => handleMagicArrayChange(field, spell.name, e.target.checked, limit)}
            disabled={isDisabled}
            className="mt-1 h-4 w-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500 disabled:opacity-50"
          />
          <div className="ml-2 flex-grow">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedSpellName(expandedSpellName === spell.name ? null : spell.name)}>
               <label className={`text-sm font-medium ${isDisabled ? 'text-slate-400' : 'text-slate-700 dark:text-slate-200'} cursor-pointer`}>
                {spell.name}
              </label>
              <span className="text-xs text-sky-600 dark:text-sky-400 hover:underline">
                  {expandedSpellName === spell.name ? 'Ocultar' : 'Ver'}
              </span>
            </div>
            {expandedSpellName === spell.name && renderSpellDetails(spell)}
          </div>
        </div>
      </div>
    );
  };

  const renderClassFeatures = () => {
    if (!formData.charClass) {
        return (
            <div className="my-4 p-4 bg-sky-100 dark:bg-sky-900 border border-sky-200 dark:border-sky-800 rounded-md text-center">
                <p className="text-sm text-sky-700 dark:text-sky-300">
                    Selecione uma Classe e Nível para ver as Características de Classe.
                </p>
            </div>
        );
    }
    if (currentClassFeaturesDefinitions.length === 0) {
        return <p className="text-sm text-slate-500 dark:text-slate-400">Nenhuma característica de classe listada para {formData.charClass} até este nível.</p>;
    }

    return currentClassFeaturesDefinitions.filter(f => f.level <= formData.level).map(featureDef => {
        const currentSelection = formData.classFeatures?.find(cf => cf.featureId === featureDef.id);
        const choiceDescription = currentSelection?.choiceValue ? featureDef.choices?.find(c => c.value === currentSelection.choiceValue)?.description : null;
        
        if (featureDef.subclassPrerequisite) {
            const prereqSelection = formData.classFeatures?.find(cf => cf.featureId === featureDef.subclassPrerequisite!.featureId);
            if (prereqSelection?.choiceValue !== featureDef.subclassPrerequisite.choiceValue) {
                return null;
            }
        }

        return (
            <div key={featureDef.id} className="mb-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md shadow-sm">
                <h6 className="font-semibold text-slate-700 dark:text-slate-200">{featureDef.name} (Nível {featureDef.level})</h6>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 whitespace-pre-wrap">{featureDef.description}</p>
                
                {featureDef.type === 'choice' && featureDef.choices && (!featureDef.maxChoices || featureDef.maxChoices === 1) && (
                    <>
                        <SelectInput
                            label={featureDef.selectionPrompt || `Escolha para ${featureDef.name}:`}
                            name={`classFeature-${featureDef.id}`}
                            value={currentSelection?.choiceValue || ""}
                            options={featureDef.choices.map(c => ({ value: c.value, label: c.label, description: c.description }))}
                            onChange={(e) => handleClassFeatureChange(featureDef.id, e.target.value)}
                            required
                        />
                        {choiceDescription && (
                             <div className="mt-2 p-2 bg-sky-50 dark:bg-sky-900/50 rounded text-xs text-slate-700 dark:text-slate-300 shadow-inner">
                                <p className="font-semibold">Detalhes da Escolha ({currentSelection?.choiceLabel}):</p>
                                <p className="whitespace-pre-wrap text-justify">{choiceDescription}</p>
                            </div>
                        )}
                    </>
                )}

                {featureDef.type === 'choice' && featureDef.choices && featureDef.maxChoices && featureDef.maxChoices > 1 && (
                    <div className="mt-2 space-y-2">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{featureDef.selectionPrompt || `Escolha até ${featureDef.maxChoices}:`}</p>
                        {featureDef.choices.map(choice => {
                            const selectedChoices = currentSelection?.customChoiceText?.split(',') || [];
                            const isChecked = selectedChoices.includes(choice.value);
                            const isDisabled = !isChecked && selectedChoices.length >= (featureDef.maxChoices || 0);
                            return (
                                <div key={choice.value} className="flex items-start p-2 rounded-md bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                                    <input
                                        type="checkbox"
                                        id={`class-feature-${featureDef.id}-${choice.value}`}
                                        checked={isChecked}
                                        disabled={isDisabled}
                                        onChange={(e) => handleClassFeatureMultiChoiceChange(featureDef.id, choice.value, e.target.checked)}
                                        className="h-4 w-4 mt-0.5 text-sky-600 border-slate-300 rounded focus:ring-sky-500"
                                    />
                                    <label htmlFor={`class-feature-${featureDef.id}-${choice.value}`} className={`ml-3 block text-sm ${isDisabled ? 'text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'}`}>
                                        <span className="font-semibold">{choice.label}</span>
                                        {choice.description && <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{choice.description}</p>}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                )}

                {featureDef.type === 'asi' && (
                    <div className="mt-2 space-y-2">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Escolha: Incremento no Valor de Habilidade ou Talento</p>
                        <div className="flex space-x-4">
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio text-sky-600" name={`asi-type-${featureDef.id}`} value="asi" 
                                    checked={!currentSelection?.asiChoice || currentSelection.asiChoice === 'asi'} 
                                    onChange={() => handleAsiChange(featureDef.id, 'asi', '')} 
                                />
                                <span className="ml-2 text-sm text-slate-800 dark:text-slate-200">Atributos</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio text-sky-600" name={`asi-type-${featureDef.id}`} value="feat"
                                    checked={currentSelection?.asiChoice === 'feat'}
                                    onChange={() => {}} 
                                    onClick={() => handleAsiChange(featureDef.id, 'feat', currentSelection?.choiceValue || '')}
                                />
                                <span className="ml-2 text-sm text-slate-800 dark:text-slate-200">Talento</span>
                            </label>
                        </div>
                        
                        {currentSelection?.asiChoice === 'feat' && (
                            <div className="mt-2">
                                <SelectInput 
                                    label="Selecione um Talento" 
                                    name={`feat-select-${featureDef.id}`}
                                    value={currentSelection?.choiceValue || ''}
                                    options={ALL_FEATS.map(f => ({value: f.id, label: f.name, description: f.description}))}
                                    onChange={(e) => handleAsiChange(featureDef.id, 'feat', e.target.value)}
                                />
                                {currentSelection.choiceValue && (
                                    <div className="mt-1 p-2 bg-slate-100 dark:bg-slate-800 rounded text-xs text-slate-700 dark:text-slate-300">
                                        {ALL_FEATS.find(f => f.id === currentSelection.choiceValue)?.description}
                                    </div>
                                )}
                            </div>
                        )}
                        {(!currentSelection?.asiChoice || currentSelection.asiChoice === 'asi') && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
                                Ajuste seus atributos na seção de "Atributos" acima.
                            </p>
                        )}
                    </div>
                )}
            </div>
        );
    });
  };

  const renderRacialFeatures = () => {
    if (!formData.race) {
        return (
            <div className="my-4 p-4 bg-sky-100 dark:bg-sky-900 border border-sky-200 dark:border-sky-800 rounded-md text-center">
                <p className="text-sm text-sky-700 dark:text-sky-300">
                    Selecione uma Raça para ver as Características Raciais.
                </p>
            </div>
        );
    }
    if (currentRacialFeaturesDefinitions.length === 0) {
        return <p className="text-sm text-slate-500 dark:text-slate-400">Nenhuma característica racial listada para {formData.race}.</p>;
    }

    return currentRacialFeaturesDefinitions.map(featureDef => {
        const currentSelection = formData.racialFeatures?.find(rf => rf.featureId === featureDef.id);
        const choiceDescription = currentSelection?.choiceValue ? featureDef.choices?.find(c => c.value === currentSelection.choiceValue)?.description : null;

        return (
            <div key={featureDef.id} className="mb-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md shadow-sm">
                <h6 className="font-semibold text-slate-700 dark:text-slate-200">{featureDef.name}</h6>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 whitespace-pre-wrap">{featureDef.description}</p>
                {featureDef.type === 'choice' && featureDef.choices && (!featureDef.maxChoices || featureDef.maxChoices === 1) && (
                    <>
                        <SelectInput
                            label={featureDef.selectionPrompt || `Escolha para ${featureDef.name}:`}
                            name={`racialFeature-${featureDef.id}`}
                            value={currentSelection?.choiceValue || ""}
                            options={featureDef.choices.map(c => ({ value: c.value, label: c.label, description: c.description }))}
                            onChange={(e) => handleRacialFeatureChange(featureDef.id, e.target.value)}
                            required
                        />
                        {choiceDescription && (
                             <div className="mt-2 p-2 bg-sky-50 dark:bg-sky-900/50 rounded text-xs text-slate-700 dark:text-slate-300 shadow-inner">
                                <p className="font-semibold">Detalhes da Escolha ({currentSelection?.choiceLabel}):</p>
                                <p className="whitespace-pre-wrap text-justify">{choiceDescription}</p>
                            </div>
                        )}
                    </>
                )}
                {featureDef.type === 'choice' && featureDef.choices && featureDef.maxChoices && featureDef.maxChoices > 1 && (
                    <div className="mt-2 space-y-2">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{featureDef.selectionPrompt || `Escolha até ${featureDef.maxChoices}:`}</p>
                        {featureDef.choices.map(choice => {
                            const selectedChoices = currentSelection?.customChoiceText?.split(',') || [];
                            const isChecked = selectedChoices.includes(choice.value);
                            const isDisabled = !isChecked && selectedChoices.length >= (featureDef.maxChoices || 0);
                            return (
                                <div key={choice.value} className="flex items-start p-2 rounded-md bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                                    <input
                                        type="checkbox"
                                        id={`racial-feature-${featureDef.id}-${choice.value}`}
                                        checked={isChecked}
                                        disabled={isDisabled}
                                        onChange={(e) => handleRacialFeatureMultiChoiceChange(featureDef.id, choice.value, e.target.checked)}
                                        className="h-4 w-4 mt-0.5 text-sky-600 border-slate-300 rounded focus:ring-sky-500"
                                    />
                                    <label htmlFor={`racial-feature-${featureDef.id}-${choice.value}`} className={`ml-3 block text-sm ${isDisabled ? 'text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'}`}>
                                        <span className="font-semibold">{choice.label}</span>
                                        {choice.description && <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{choice.description}</p>}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    });
  };


  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white dark:bg-slate-800 shadow-xl rounded-lg space-y-6 max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-bold text-sky-700 dark:text-sky-400 text-center mb-6">{initialData && initialData.id ? 'Editar Personagem' : 'Criar Novo Personagem'}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Nome do Personagem" name="name" value={formData.name} onChange={handleChange} required />
        <StringSelectInput label="Raça" name="race" value={formData.race} onChange={handleChange} options={RACES} required/>
        <StringSelectInput label="Classe" name="charClass" value={formData.charClass} onChange={handleChange} options={CLASSES} required/>
        <StringSelectInput label="Antecedentes" name="background" value={formData.background} onChange={handleChange} options={BACKGROUNDS} required/>
        
        <div className="mb-4 md:col-span-2">
          <label htmlFor="photoUrlFile" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            Foto do Personagem
          </label>
          <input
            id="photoUrlFile"
            name="photoUrlFile"
            type="file"
            accept="image/png, image/jpeg, image/gif, image/webp"
            onChange={handleChange}
            className="mt-1 block w-full text-sm text-slate-500 dark:text-slate-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-sky-100 dark:file:bg-sky-800 file:text-sky-700 dark:file:text-sky-300
              hover:file:bg-sky-200 dark:hover:file:bg-sky-700
              focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-sky-500 dark:focus:ring-sky-500
              text-slate-900 dark:text-slate-100"
          />
          {formData.photoUrl && (
            <div className="mt-2">
              <span className="text-xs text-slate-600 dark:text-gray-400">Prévia:</span>
              <img src={formData.photoUrl} alt="Prévia" className="mt-1 w-24 h-24 object-cover rounded shadow" />
            </div>
          )}
        </div>

        <Input label="Idade" name="age" type="number" value={formData.age} onChange={handleChange} />
        <StringSelectInput label="Tendência" name="alignment" value={formData.alignment} onChange={handleChange} options={ALIGNMENTS} required/>
        <Input label="Nível" name="level" type="number" value={formData.level} onChange={handleChange} min="1" />
        <StringSelectInput label="Rank do Jogador" name="rank" value={formData.rank || RANKS[0]} onChange={handleChange} options={RANKS as any} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input label="HP Atual" name="hp" type="number" value={formData.hp} onChange={handleChange} />
        <Input label="HP Máximo (HPT)" name="hpt" type="number" value={formData.hpt} onChange={handleChange} />
        <Input label="Classe de Armadura (CA)" name="ac" type="number" value={formData.ac} onChange={handleChange} />
        <Input label="Moedas" name="coins" type="number" value={formData.coins} onChange={handleChange} />
      </div>

      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-semibold text-sky-600 dark:text-sky-400 mb-2">Atributos (Valor Base)</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Insira o valor base. O total com bônus raciais é mostrado ao lado.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {ATTRIBUTE_NAMES.map(attrName => {
            const racialBonuses = calculateRaceAttributeBonuses(formData.race, formData.racialFeatures);
            const bonus = racialBonuses[attrName] || 0;
            const baseVal = formData.attributes[attrName] || 10;
            const total = baseVal + bonus;

            return (
                <div key={attrName} className="flex flex-col">
                    <Input
                    label={ATTRIBUTE_LABELS[attrName]}
                    name={`attributes.${attrName}`}
                    type="number"
                    value={baseVal}
                    onChange={handleChange}
                    min="1" max="30"
                    />
                    <div className="text-xs text-right mt-[-10px] mr-2 font-medium text-slate-600 dark:text-slate-400">
                        {bonus > 0 
                            ? <span className="text-sky-600 dark:text-sky-400">{baseVal} (+{bonus} Racial) = {total}</span> 
                            : <span>Total: {total}</span>
                        }
                    </div>
                </div>
            );
          })}
        </div>
      </div>

      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-4 border-b border-slate-300 dark:border-slate-600 pb-2">
            Características Raciais: {formData.race}
        </h3>
        {renderRacialFeatures()}
      </div>
      
      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-4 border-b border-slate-300 dark:border-slate-600 pb-2">
            Características de Classe: {formData.charClass} (Nível {formData.level})
        </h3>
        {renderClassFeatures()}
      </div>

       {selectedFightingStyleDescription && formData.fightingStyle && !ALL_CLASS_FEATURES_MAP[formData.charClass]?.some(f => f.name.toLowerCase().includes("estilo de luta") && f.level <= formData.level && f.type === 'choice') && (
         <div>
            <StringSelectInput 
                label="Estilo de Luta (Legado/Manual)" 
                name="fightingStyle" 
                value={formData.fightingStyle} 
                onChange={handleChange} 
                options={FIGHTING_STYLE_OPTIONS.map(opt => opt.name)} 
            />
            <div className="mt-2 p-3 bg-sky-50 dark:bg-sky-900 rounded text-sm text-slate-700 dark:text-slate-300 shadow-inner">
                <p className="font-semibold">Descrição do Estilo de Luta:</p>
                <p className="whitespace-pre-wrap text-justify">{selectedFightingStyleDescription}</p>
            </div>
         </div>
        )}


      <div>
        <h3 className="text-lg font-semibold text-sky-600 dark:text-sky-400 mb-3">Perícias</h3>
        
        <div className="mb-4">
            <h4 className="text-md font-medium text-slate-700 dark:text-slate-300 mb-2">Perícias Concedidas Automaticamente:</h4>
            {autoGrantedSkills.size > 0 ? (
                <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400">
                    {Array.from(autoGrantedSkills.entries()).map(([skillKey, source]) => {
                        const skillLabel = ALL_SKILLS.find(s => s.key === skillKey)?.label || skillKey;
                        return <li key={skillKey}>{skillLabel} <span className="italic">({source})</span></li>;
                    })}
                </ul>
            ) : <p className="text-sm text-slate-500 dark:text-slate-400 italic">Nenhuma por enquanto.</p>}
        </div>

        {classSkillConfig && classSkillConfig.count > 0 && (
            <div className="mb-4 p-4 border border-sky-200 dark:border-sky-800 rounded-md bg-sky-50 dark:bg-sky-900/50">
                <h4 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-2">
                    Escolhas de Perícia da Classe ({formData.charClass}): 
                    <span className="font-bold text-sky-600 dark:text-sky-400"> {chosenClassSkills.length} / {classSkillConfig.count}</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {classSkillConfig.options.map(skillKey => {
                        const skill = ALL_SKILLS.find(s => s.key === skillKey);
                        if (!skill) return null;
                        
                        const isAuto = autoGrantedSkills.has(skillKey);
                        if (isAuto) return null; 

                        const isChecked = chosenClassSkills.includes(skillKey);
                        const isDisabled = !isChecked && chosenClassSkills.length >= classSkillConfig.count;
                        
                        return (
                            <div key={skill.key} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`skill-class-${skill.key}`}
                                    checked={isChecked}
                                    onChange={() => handleSkillChoiceChange(skill.key, 'class')}
                                    disabled={isDisabled}
                                    className="h-4 w-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500 disabled:opacity-50"
                                />
                                <label htmlFor={`skill-class-${skill.key}`} className={`ml-2 block text-sm ${isDisabled ? 'text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-300'}`}>
                                    {skill.label} <span className="text-xs text-slate-500 dark:text-gray-400">({ATTRIBUTE_LABELS[skill.attribute].substring(0,3)})</span>
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>
        )}
        
        {isHalfElf && (
             <div className="mb-4 p-4 border border-emerald-200 dark:border-emerald-800 rounded-md bg-emerald-50 dark:bg-emerald-900/50">
                <h4 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-2">
                    Versatilidade em Perícia (Meio-Elfo): 
                    <span className="font-bold text-emerald-600 dark:text-emerald-400"> {chosenHalfElfSkills.length} / 2</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">Escolha duas perícias quaisquer.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {ALL_SKILLS.map(skill => {
                        const isAuto = autoGrantedSkills.has(skill.key);
                        if (isAuto) return null;

                        const isChecked = chosenHalfElfSkills.includes(skill.key);
                        const isDisabled = !isChecked && chosenHalfElfSkills.length >= 2;

                        return (
                             <div key={`skill-halfelf-${skill.key}`} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`skill-halfelf-${skill.key}`}
                                    checked={isChecked}
                                    onChange={() => handleSkillChoiceChange(skill.key, 'half-elf')}
                                    disabled={isDisabled}
                                    className="h-4 w-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 disabled:opacity-50"
                                />
                                <label htmlFor={`skill-halfelf-${skill.key}`} className={`ml-2 block text-sm ${isDisabled ? 'text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-300'}`}>
                                    {skill.label} <span className="text-xs text-slate-500 dark:text-gray-400">({ATTRIBUTE_LABELS[skill.attribute].substring(0,3)})</span>
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>
        )}
      </div>
      
      <Textarea label="Notas sobre Perícias e Habilidades" name="skillNotes" value={formData.skillNotes} onChange={handleChange} placeholder="Notas sobre perícias, talentos, etc." />
      <Textarea label="Inventário (Itens)" name="items" value={formData.items} onChange={handleChange} />
      <Textarea label="Habilidades Gerais (Raça/Outros)" name="abilities" value={formData.abilities} onChange={handleChange} placeholder="Habilidades raciais, de antecedentes, etc."/>
      
      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-4 border-b border-slate-300 dark:border-slate-600 pb-2">Magia</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
           <SelectInput 
            label="Habilidade de Conjuração Principal" 
            name="magic.spellcastingAbilityName"
            value={formData.magic?.spellcastingAbilityName || ''}
            onChange={handleChange}
            options={[
                { value: '', label: 'Nenhuma' },
                ...ATTRIBUTE_NAMES.map(attr => ({ value: attr, label: ATTRIBUTE_LABELS[attr] }))
            ]}
          />
          <div>
            <Input label="CD de Magia (Informado)" name="magic.spellSaveDC" type="number" value={formData.magic?.spellSaveDC || 0} onChange={handleChange} />
            {calculatedSpellSaveDC !== null && (
              <p className="text-xs text-slate-600 dark:text-gray-400 mt-1" aria-live="polite">CD Calculado: {calculatedSpellSaveDC}</p>
            )}
          </div>
          <div>
            <Input label="Bônus de Ataque Mágico (Informado)" name="magic.spellAttackBonus" type="number" value={formData.magic?.spellAttackBonus || 0} onChange={handleChange} />
             {calculatedSpellAttackBonus !== null && (
              <p className="text-xs text-slate-600 dark:text-gray-400 mt-1" aria-live="polite">Bônus Ataque Calculado: {calculatedSpellAttackBonus}</p>
            )}
          </div>
        </div>

        {!(formData.charClass && formData.level >= 1 && (ALL_CLASS_FEATURES_MAP[formData.charClass]?.some(f => f.name.toLowerCase().includes("conjuração") && f.level <= formData.level) || CLASS_SPELLCASTING_ABILITIES[formData.charClass])) && (
          <div className="my-4 p-4 bg-sky-100 dark:bg-sky-900 border border-sky-200 dark:border-sky-800 rounded-md text-center">
            <p className="text-sm text-sky-700 dark:text-sky-300">
             Esta classe não parece ter conjuração neste nível, ou selecione Classe e Nível para ver opções de magia.
            </p>
          </div>
        )}

        {formData.charClass && formData.level >= 1 && (ALL_CLASS_FEATURES_MAP[formData.charClass]?.some(f => f.name.toLowerCase().includes("conjuração") && f.level <= formData.level) || CLASS_SPELLCASTING_ABILITIES[formData.charClass]) && (
          <>
            <div className="my-6">
              <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
                Truques Conhecidos{' '}
                {numCantripsAllowed > 0 && availableCantrips.length > 0
                  ? `(Escolha. Limite da classe: ${numCantripsAllowed})`
                  : formData.charClass && getClassCantripsKnownCount(formData.charClass, formData.level) === 0
                  ? '(Nenhum para esta classe/nível)'
                  : numCantripsAllowed > 0 && availableCantrips.length === 0 
                  ? `(Limite da classe: ${numCantripsAllowed}, nenhum truque cadastrado para seleção)`
                  : ''}
              </h4>
              {numCantripsAllowed > 0 ? (
                availableCantrips.length > 0 ? (
                  <div className="space-y-3">
                    {availableCantrips.map(spell => renderSpellListItem(spell, 'cantripsKnown', formData.magic?.cantripsKnown, numCantripsAllowed))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-gray-400">Nenhum truque disponível para esta classe/nível ou lista de truques não carregada/cadastrada.</p>
                )
              ) : (
                 getClassCantripsKnownCount(formData.charClass, formData.level) === 0 && <p className="text-sm text-slate-500 dark:text-gray-400">Esta classe/nível não concede truques.</p>
              )}
            </div>

            {formData.charClass === 'Mago' && (
              <div className="my-6">
                <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
                  Grimório - Magias de 1º Nível{' '}
                  {availableL1WizardSpells.length > 0 
                    ? `(Escolha. Limite inicial: ${numInitialWizardSpellbookSpells})`
                    : `(Limite inicial: ${numInitialWizardSpellbookSpells}, nenhuma magia de 1º nível cadastrada para seleção)`}
                </h4>
                {availableL1WizardSpells.length > 0 ? (
                  <div className="space-y-3">
                    {availableL1WizardSpells.map(spell => renderSpellListItem(spell, 'spellbook', formData.magic?.spellbook, numInitialWizardSpellbookSpells))}
                  </div>
                ) : (
                   <p className="text-sm text-slate-500 dark:text-gray-400">Nenhuma magia de 1º nível disponível para Magos neste momento ou lista não carregada/cadastrada.</p>
                )}
              </div>
            )}

            {['Patrulheiro', 'Feiticeiro', 'Bardo', 'Bruxo'].includes(formData.charClass) && numSpellsKnownAllowed > 0 && numSpellsKnownAllowed !== Infinity && (
              <div className="my-6">
                <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
                  Magias Conhecidas{' '}
                  {availableSpellsForSelection.length > 0
                    ? `(Escolha. Limite da classe: ${numSpellsKnownAllowed})`
                    : `(Limite da classe: ${numSpellsKnownAllowed}, nenhuma magia cadastrada para seleção)`}
                </h4>
                {availableSpellsForSelection.length > 0 ? (
                  <div className="space-y-3">
                    {availableSpellsForSelection.map(spell => renderSpellListItem(spell, 'spellsKnownPrepared', formData.magic?.spellsKnownPrepared, numSpellsKnownAllowed))}
                  </div>
                ) : (
                   <p className="text-sm text-slate-500 dark:text-gray-400">Nenhuma magia disponível para seleção para esta classe/nível, ou lista de magias não carregada/cadastrada.</p>
                )}
              </div>
            )}
            
            { (['Clérigo', 'Druida', 'Paladino'].includes(formData.charClass) || formData.charClass === 'Mago' ) && (
              <Textarea 
                label={`Magias ${formData.charClass === 'Mago' ? 'Preparadas do Grimório' : 'Preparadas'} (lista separada por vírgulas)`}
                name="magic.spellsKnownPrepared" 
                value={Array.isArray(formData.magic?.spellsKnownPrepared) ? formData.magic.spellsKnownPrepared.join(', ') : (formData.magic?.spellsKnownPrepared || '')}
                onChange={handleChange}
                placeholder={`Liste as magias ${formData.charClass === 'Mago' ? 'preparadas do grimório' : 'que você preparou para hoje'}`}
              />
            )}
             {['Patrulheiro', 'Feiticeiro', 'Bardo', 'Bruxo'].includes(formData.charClass) && numSpellsKnownAllowed === 0 && ( 
                <Textarea 
                    label="Magias Conhecidas (lista separada por vírgulas)" 
                    name="magic.spellsKnownPrepared" 
                    value={Array.isArray(formData.magic?.spellsKnownPrepared) ? formData.magic.spellsKnownPrepared.join(', ') : (formData.magic?.spellsKnownPrepared || '')}
                    onChange={handleChange}
                    placeholder="Ex: Curar Ferimentos, Marca do Caçador"
                />
            )}
            
            <div>
              <h4 className="text-md font-semibold text-slate-800 dark:text-slate-100 my-3">Espaços de Magia por Nível (Manual/Automático):</h4>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={`spellSlotDisplay${i+1}`} className="mb-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                      {i+1}º Nível
                    </label>
                    <Input
                        name={`magic.currentSpellSlots.${i}`}
                        type="number"
                        value={formData.magic?.currentSpellSlots?.[i] ?? 0}
                        onChange={handleChange}
                        min="0"
                        className="w-full"
                        aria-label={`Espaços de magia atuais de ${i+1}º nível`}
                     />
                    <span className="text-xs text-slate-500 dark:text-gray-400">/ {formData.magic?.spellSlots?.[i] ?? 0}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-8 text-center">
        <Button type="submit" className="w-full md:w-auto px-12 py-3 text-lg font-bold">
          {initialData && initialData.id ? 'Salvar Alterações' : 'Criar Personagem'}
        </Button>
      </div>
    </form>
  );
};
