export interface Guide {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  category: 'beginner' | 'intermediate' | 'advanced' | 'mechanics' | 'quests';
  content: string;
}

export const guides: Guide[] = [
  {
    id: '1',
    title: 'Getting Started with 77-bit',
    description: 'A beginner\'s guide to the world of 77-bit',
    image: '/images/guide-beginner.jpg',
    slug: 'getting-started',
    category: 'beginner',
    content: `
# Getting Started with 77-bit

Welcome to the world of 77-bit! This guide will help you navigate the basics of the game and get you started on your journey.

## Character Creation

When you first enter the game, you'll be prompted to create your character. Here are some tips:

- Choose a class that matches your playstyle
- Distribute stat points based on your chosen class
- Customize your appearance to stand out in the crowd

## First Steps

After creating your character, you'll find yourself in the starting town. Here's what you should do first:

1. Talk to the town elder for your first quest
2. Explore the town and meet the NPCs
3. Visit the marketplace to check out available equipment
4. Complete the tutorial quest to earn your first rewards

## Basic Controls

- WASD: Movement
- Spacebar: Jump
- E: Interact
- Tab: Inventory
- M: Map

Good luck on your adventures in the world of 77-bit!
    `
  },
  {
    id: '2',
    title: 'Combat Mechanics Explained',
    description: 'Learn the ins and outs of the combat system',
    image: '/images/guide-combat.jpg',
    slug: 'combat-mechanics',
    category: 'mechanics',
    content: `
# Combat Mechanics Explained

77-bit features a deep and engaging combat system. This guide will help you understand how to master it.

## Basics of Combat

Combat in 77-bit is skill-based and requires good timing and positioning. Here are the fundamentals:

- **Light Attack**: Quick, low damage attacks that can be chained
- **Heavy Attack**: Slower but more powerful attacks
- **Block**: Reduces incoming damage
- **Dodge**: Avoid damage completely with proper timing

## Advanced Techniques

Once you've mastered the basics, try these advanced techniques:

### Perfect Block

Timing your block just as an enemy attack is about to hit will execute a Perfect Block, stunning your opponent and opening them up for a counter-attack.

### Combo System

Alternating between light and heavy attacks in specific patterns will unlock powerful combos:

| Combo Name | Input Pattern | Effect |
|------------|--------------|--------|
| Swift Strike | Light, Light, Heavy | Extra damage + bleed |
| Ground Breaker | Heavy, Heavy, Light | AoE damage + knockdown |
| Phantom Rush | Light, Dodge, Heavy | Teleport strike + critical chance |

## Element System

Different weapons have different elemental properties:

- **Fire**: DoT damage
- **Ice**: Slows enemies
- **Lightning**: Chain damage to nearby foes
- **Earth**: Increased stagger effect

Mix and match elements for devastating combos!
    `
  },
  {
    id: '3',
    title: 'Main Quest Walkthrough',
    description: 'A complete guide to the main storyline',
    image: '/images/guide-quests.jpg',
    slug: 'main-quest-walkthrough',
    category: 'quests',
    content: `
# Main Quest Walkthrough

This guide will walk you through the main storyline of 77-bit, helping you complete each quest efficiently.

## Act 1: The Awakening

### Quest: The First Byte

**Location**: Starting Town  
**Quest Giver**: Elder Datamancer  
**Objectives**:
- Find the corrupted data node in the forest
- Defeat the Byte Guardian
- Return the purified node to the Elder

**Rewards**:
- 500 XP
- Basic Weapon of Choice
- Access to the first dungeon

**Tips**:
The Byte Guardian has a weakness to lightning attacks. If you have access to any lightning abilities or weapons, be sure to use them.

### Quest: Digital Divide

**Location**: Northern Plains  
**Quest Giver**: Scout Reyna  
**Objectives**:
- Cross the Digital Divide
- Find the hidden encampment
- Speak with the Resistance Leader

**Rewards**:
- 750 XP
- Uncommon Accessory
- New skill point

**Tips**:
The Digital Divide has invisible platforms. Use the "Reveal" ability gained from the previous quest to see them.

## Act 2: The Corruption

*More quest details coming soon...*
    `
  }
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find(guide => guide.slug === slug);
}

export function getAllGuides(): Guide[] {
  return guides;
}

export function getGuidesByCategory(category: Guide['category']): Guide[] {
  return guides.filter(guide => guide.category === category);
} 