
import React, { useState, useEffect, useCallback } from 'react';
import { Character, ClassFeatureSelection, RANKS, FeatSelection } from './types';
import { CharacterForm } from './components/CharacterForm';
import CharacterSheetDisplay from './components/CharacterSheetDisplay';
import RoleSelectionScreen from './components/RoleSelectionScreen';
import DMCharacterListView from './components/DMCharacterListView';
import PlayerCharacterList from './components/PlayerCharacterList';
import { 
    CLASSES, 
    getHitDieTypeForClass, getMaxRages, getMaxBardicInspirations, getMaxChannelDivinityUses,
    getMaxRelentlessEnduranceUses, getMaxSecondWindUses, getMaxActionSurgeUses,
    getMaxBreathWeaponUses, getMaxKiPoints, getMaxLayOnHandsPool
} from './dndOptions'; 
import * as supabaseService from './supabaseService';
import { getClassSpellSlots } from './classFeatures';
import { ALL_FEATS_MAP } from './feats';

const LOCAL_STORAGE_ROLE_KEY = 'dndUserRole';
const LOCAL_STORAGE_VIEWING_CHARACTER_ID_KEY = 'dndAppViewingCharacterId';
const LOCAL_STORAGE_ACTIVE_SCREEN_KEY = 'dndAppActiveScreen';

type Screen = 'role' | 'dm_list' | 'player_char_list' | 'player_sheet' | 'player_form';

const deriveFeatsFromClassFeatures = (classFeatures?: ClassFeatureSelection[]): FeatSelection[] => {
    const selectedFeats: FeatSelection[] = [];
    if (classFeatures) {
        for (const feature of classFeatures) {
            if (feature.type === 'asi' && feature.asiChoice === 'feat' && feature.choiceValue) {
                const featData = ALL_FEATS_MAP[feature.choiceValue];
                if (featData) {
                    selectedFeats.push({
                        featId: featData.id,
                        featName: featData.name,
                        description: featData.description,
                        levelAcquired: feature.levelAcquired,
                    });
                }
            }
        }
    }
    return selectedFeats;
};

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [viewingCharacter, setViewingCharacter] = useState<Character | null>(null);
  const [screen, setScreen] = useState<Screen>('role');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  const clearViewingStateFromStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_VIEWING_CHARACTER_ID_KEY);
    localStorage.removeItem(LOCAL_STORAGE_ACTIVE_SCREEN_KEY);
  };

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const savedRole = localStorage.getItem(LOCAL_STORAGE_ROLE_KEY);
      const savedViewingCharId = localStorage.getItem(LOCAL_STORAGE_VIEWING_CHARACTER_ID_KEY);
      const savedActiveScreen = localStorage.getItem(LOCAL_STORAGE_ACTIVE_SCREEN_KEY) as Screen | null;

      let fetchedCharacters = await supabaseService.getCharacters();
      
      const processedCharacters: Character[] = fetchedCharacters.map(c => {
        let updatedChar = { ...c };
        if (!updatedChar.rank) updatedChar.rank = RANKS[0];
        if (!updatedChar.classFeatures) updatedChar.classFeatures = [];
        if (!updatedChar.racialFeatures) updatedChar.racialFeatures = [];
        updatedChar.feats = deriveFeatsFromClassFeatures(updatedChar.classFeatures);
        
        // Hit Dice
        updatedChar.maxHitDice = updatedChar.maxHitDice || updatedChar.level || 1;
        updatedChar.currentHitDice = updatedChar.currentHitDice !== undefined 
            ? Math.min(updatedChar.currentHitDice, updatedChar.maxHitDice) 
            : updatedChar.maxHitDice; 
        updatedChar.hitDieType = updatedChar.hitDieType || getHitDieTypeForClass(updatedChar.charClass || CLASSES[0]);

        // Magic Info
        const maxSpellSlots = getClassSpellSlots(updatedChar.charClass, updatedChar.level);
        if (updatedChar.magic) {
            updatedChar.magic.cantripsKnown = updatedChar.magic.cantripsKnown || [];
            updatedChar.magic.spellsKnownPrepared = updatedChar.magic.spellsKnownPrepared || [];
            updatedChar.magic.spellbook = updatedChar.magic.spellbook || [];
            updatedChar.magic.spellSlots = updatedChar.magic.spellSlots && updatedChar.magic.spellSlots.length === 9 
                                            ? updatedChar.magic.spellSlots 
                                            : maxSpellSlots;
            updatedChar.magic.currentSpellSlots = updatedChar.magic.currentSpellSlots && updatedChar.magic.currentSpellSlots.length === 9
                                            ? updatedChar.magic.currentSpellSlots
                                            : [...updatedChar.magic.spellSlots]; 
        } else { 
            updatedChar.magic = {
                spellcastingAbilityName: undefined,
                spellSaveDC: 0,
                spellAttackBonus: 0,
                cantripsKnown: [],
                spellsKnownPrepared: [],
                spellbook: [],
                spellSlots: maxSpellSlots,
                currentSpellSlots: [...maxSpellSlots],
            };
        }

        // Limited Use Abilities - Class
        updatedChar.maxRages = updatedChar.maxRages ?? getMaxRages(updatedChar.level);
        updatedChar.currentRages = updatedChar.currentRages ?? updatedChar.maxRages;
        
        updatedChar.maxBardicInspirations = updatedChar.maxBardicInspirations ?? getMaxBardicInspirations(updatedChar.attributes.charisma);
        updatedChar.currentBardicInspirations = updatedChar.currentBardicInspirations ?? updatedChar.maxBardicInspirations;

        updatedChar.maxChannelDivinityUses = updatedChar.maxChannelDivinityUses ?? getMaxChannelDivinityUses(updatedChar.charClass, updatedChar.level);
        updatedChar.currentChannelDivinityUses = updatedChar.currentChannelDivinityUses ?? updatedChar.maxChannelDivinityUses;

        updatedChar.maxSecondWindUses = updatedChar.maxSecondWindUses ?? getMaxSecondWindUses(updatedChar.charClass);
        updatedChar.currentSecondWindUses = updatedChar.currentSecondWindUses ?? updatedChar.maxSecondWindUses;

        updatedChar.maxActionSurgeUses = updatedChar.maxActionSurgeUses ?? getMaxActionSurgeUses(updatedChar.charClass, updatedChar.level);
        updatedChar.currentActionSurgeUses = updatedChar.currentActionSurgeUses ?? updatedChar.maxActionSurgeUses;
        
        updatedChar.maxKiPoints = updatedChar.maxKiPoints ?? getMaxKiPoints(updatedChar.charClass, updatedChar.level);
        updatedChar.currentKiPoints = updatedChar.currentKiPoints ?? updatedChar.maxKiPoints;

        updatedChar.maxLayOnHandsPool = updatedChar.maxLayOnHandsPool ?? getMaxLayOnHandsPool(updatedChar.charClass, updatedChar.level);
        updatedChar.currentLayOnHandsPool = updatedChar.currentLayOnHandsPool ?? updatedChar.maxLayOnHandsPool;

        // Limited Use Abilities - Racial
        updatedChar.maxRelentlessEnduranceUses = updatedChar.maxRelentlessEnduranceUses ?? getMaxRelentlessEnduranceUses(updatedChar.race);
        updatedChar.currentRelentlessEnduranceUses = updatedChar.currentRelentlessEnduranceUses ?? updatedChar.maxRelentlessEnduranceUses;

        updatedChar.maxBreathWeaponUses = updatedChar.maxBreathWeaponUses ?? getMaxBreathWeaponUses(updatedChar.race);
        updatedChar.currentBreathWeaponUses = updatedChar.currentBreathWeaponUses ?? updatedChar.maxBreathWeaponUses;

        return updatedChar;
      });

      setCharacters(processedCharacters);

      if (savedRole) {
        setUserRole(savedRole);
        if (savedRole === 'dm') {
            setScreen('dm_list');
        } else {
            if (savedActiveScreen === 'player_sheet' && savedViewingCharId) {
                const charToView = processedCharacters.find(c => c.id === savedViewingCharId);
                if (charToView) {
                    setViewingCharacter(charToView);
                    setScreen('player_sheet');
                } else {
                    setScreen('player_char_list');
                    clearViewingStateFromStorage();
                }
            } else if (savedActiveScreen === 'player_form') {
                 setScreen('player_char_list');
                 clearViewingStateFromStorage();
            } else {
                setScreen('player_char_list');
            }
        }
      } else {
        setScreen('role');
      }

    } catch (err: any) {
      setError(err.message || 'Falha ao carregar dados.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRoleSelect = (role: 'player' | 'dm') => {
    setUserRole(role);
    localStorage.setItem(LOCAL_STORAGE_ROLE_KEY, role);
    if (role === 'dm') {
      setScreen('dm_list');
      localStorage.setItem(LOCAL_STORAGE_ACTIVE_SCREEN_KEY, 'dm_list');
    } else {
      setScreen('player_char_list');
      localStorage.setItem(LOCAL_STORAGE_ACTIVE_SCREEN_KEY, 'player_char_list');
    }
  };

  const handleSaveCharacter = async (characterData: Character) => {
    setIsLoading(true);
    try {
        const saved = await supabaseService.saveCharacter(characterData);
        if (saved) {
            setCharacters(prev => {
                const exists = prev.findIndex(c => c.id === saved.id);
                if (exists !== -1) {
                    const newChars = [...prev];
                    newChars[exists] = saved;
                    return newChars;
                }
                return [...prev, saved];
            });
            setScreen('player_char_list');
            localStorage.setItem(LOCAL_STORAGE_ACTIVE_SCREEN_KEY, 'player_char_list');
            setEditingCharacter(null);
        }
    } catch (e) {
        console.error(e);
        setError("Erro ao salvar personagem.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleDeleteCharacter = async (characterId: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este personagem?")) return;
    setIsLoading(true);
    try {
        const success = await supabaseService.deleteCharacter(characterId);
        if (success) {
            setCharacters(prev => prev.filter(c => c.id !== characterId));
            if (viewingCharacter?.id === characterId) {
                setViewingCharacter(null);
                setScreen('player_char_list');
                clearViewingStateFromStorage();
            }
        }
    } catch (e) {
        console.error(e);
        setError("Erro ao excluir personagem.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleUpdateCharacter = async (characterId: string, updates: Partial<Character>) => {
      setCharacters(prev => prev.map(c => c.id === characterId ? { ...c, ...updates } : c));
      if (viewingCharacter?.id === characterId) {
          setViewingCharacter(prev => prev ? { ...prev, ...updates } : null);
      }

      try {
          await supabaseService.updateCharacter(characterId, updates);
      } catch (e) {
          console.error("Failed to update character remotely", e);
      }
  };

  if (isLoading && characters.length === 0) {
      return <div className="flex justify-center items-center h-screen dark:bg-slate-900"><div className="text-xl text-sky-600 dark:text-sky-400">Carregando...</div></div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-200 overflow-x-hidden">
      {screen === 'role' && (
        <div className="flex-grow flex items-center justify-center">
            <RoleSelectionScreen onSelectRole={handleRoleSelect} />
        </div>
      )}

      {screen === 'dm_list' && (
        <div className="flex-grow">
            <DMCharacterListView 
                characters={characters} 
                onDMUpdateCharacter={handleUpdateCharacter}
                onDeleteCharacter={handleDeleteCharacter}
            />
        </div>
      )}

      {screen === 'player_char_list' && (
        <div className="flex-grow">
            <PlayerCharacterList 
                characters={characters}
                onCreateCharacter={() => {
                    setEditingCharacter(null);
                    setScreen('player_form');
                    localStorage.setItem(LOCAL_STORAGE_ACTIVE_SCREEN_KEY, 'player_form');
                }}
                onViewCharacter={(char) => {
                    setViewingCharacter(char);
                    setScreen('player_sheet');
                    localStorage.setItem(LOCAL_STORAGE_ACTIVE_SCREEN_KEY, 'player_sheet');
                    localStorage.setItem(LOCAL_STORAGE_VIEWING_CHARACTER_ID_KEY, char.id);
                }}
                onEditCharacter={(char) => {
                    setEditingCharacter(char);
                    setScreen('player_form');
                    localStorage.setItem(LOCAL_STORAGE_ACTIVE_SCREEN_KEY, 'player_form');
                }}
                onDeleteCharacter={handleDeleteCharacter}
            />
        </div>
      )}

      {screen === 'player_form' && (
        <div className="container mx-auto flex-grow pb-10">
            <button 
                onClick={() => {
                    setScreen('player_char_list');
                    localStorage.setItem(LOCAL_STORAGE_ACTIVE_SCREEN_KEY, 'player_char_list');
                }}
                className="mt-4 ml-4 text-sky-600 hover:underline dark:text-sky-400"
            >
                &larr; Voltar para Lista
            </button>
            <CharacterForm 
                onSave={handleSaveCharacter} 
                initialData={editingCharacter} 
            />
        </div>
      )}

      {screen === 'player_sheet' && viewingCharacter && (
        <div className="flex-grow">
            <CharacterSheetDisplay 
                character={viewingCharacter}
                onEdit={() => {
                    setEditingCharacter(viewingCharacter);
                    setScreen('player_form');
                    localStorage.setItem(LOCAL_STORAGE_ACTIVE_SCREEN_KEY, 'player_form');
                }}
                onBackToList={() => {
                    setScreen('player_char_list');
                    setViewingCharacter(null);
                    clearViewingStateFromStorage();
                }}
                onCharacterUpdate={handleUpdateCharacter}
            />
        </div>
      )}
    </div>
  );
};

export default App;
