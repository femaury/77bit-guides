# Weapon Info

Let's breakdown all the information related to the weapon item themselves.

![image.png](/content/all-about-weapons/image.png)

## Weapon Types

There are 9 different weapon types in the game, each with their own attack patterns, speed and range. Here is the list:

### Ranged

- Droid (drone animation)
- Glitch (orb animation)
- Slinger (shurikens animation)

### Melee

- Yoroi-dōshi (daggers animation)
- Board (plank animation)
- Gauntlet (fists animation)
- Greatsword (scissors animation)
- Glaive (scissors animation)
- Sabre (scissors animation)

Some of these weapons attack faster than others, or have more range than others. Also, even with equal weapon damage, it seems not all weapons do the same amount of damage. This might depend on your character stats…

Need to gather a lot more data to get numbers on this. `Work in progress`

## Weapon Rarity (color)

The game has 4 different weapon rarities, each represented by its own colour. Each rarity affects the number of extra stats a weapon has on top of its base damage stat (which all weapons have). 

In order of least rare to most rare:

- Street (white)
- Preem (red +1 stat)
- Vandal (green +2 stats)
- Mod-Tech (purple +3 stats)

![77bit_weapon_rarity (1).png](/content/all-about-weapons/77bit_weapon_rarity_(1).png)

## Weapon Stats

Here is the list of each stat a weapon of rarity Preem or higher can roll (on top of its base damage). Street weapons never roll extra stats.

| Base Damage | Weapon Damage | Physical Strength | Pixel Strength | Max Health | Critical Chance (%) | Critical Damage (%) | Dodge Chance (%) | Cooldown Reduction (%) | Healing Multiplier (%) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 11 | 11 | 9 | 9 | 15 | 1.05 | 2.15 | 1.03 | 1.02 | 1.25 |
| 21 | 21 | 17 | 17 | 29 | 1.10 | 2.30 | 1.06 | 1.02 | 1.50 |
| 31 | 31 | 25 | 25 | 43 | 1.15 | 2.45 | 1.09 | 1.05 | 1.75 |
| 41 | 41 | 33 | 33 | 57 | 1.20 | 2.60 | 1.12 | 1.06 | 2.00 |
| 50 | 50 | 41 | 41 | 70 | 1.25 | 2.75 | 1.15 | 1.08 | 2.25 |
| 51 | 51 | 41 | 41 | 70 | 1.25 | 2.75 | 1.15 | 1.08 | 2.25 |
| 110 | 110 | 82 | 82 | 150 | 1.55 | 4.00 | 1.35 | 1.12 | 2.80 |
| 240 | 240 | 167 | 167 | 320 | 2.20 | 7.00 | 1.80 | 1.5 | 6.00 |

> 💡
> 
> You'll notice the first stat is weapon damage. This basically means your weapon will have **2x the base damage**! It also means the weapon will get **2x more damage per level upgrade**.
> 
> This is the best stat to roll in the game on any weapon and will make a 82 base (so 41 with weapon damage stat) scaler higher than a 110 base damage.


When you see a Preem weapon with only damage, a Vandal weapon with only 1 extra stat or a Mod-Tech weapon with only 2 extra stats, it's because they rolled the Weapon Damage stat, which is added to the always displayed base damage.

Preem weapon where the extra stat is visible (not Weapon Damage)

![Screenshot 2025-03-22 182224.png](/content/all-about-weapons/f54ebfc2-94c4-43f4-bd1d-815608074ac0.png)

Preem weapon where the extra stat is **not** visible (Weapon Damage)

![Screenshot 2025-03-22 182217.png](/content/all-about-weapons/f69312cd-164e-493f-925c-6fd7cebfb1b9.png)

### Pixel/Physical Strength

While the other stats are pretty straightforward and common in other video games, you might be wondering how pixel and physical strength affect your gameplay in 77-Bit. Until I can take the time to fully test and compare them in-game, here is the info from the official handbook:

> Some abilities might scale with Pixel Power, others with Physical Power, or even both.


> [Basic] Attacks vary based on the equipped weapon's type, affecting their speed, reach, and damage profile. All attacks scale with both Pixel and Power, ensuring they remain useful regardless of your chosen class.
> 

We know for example that the Technomancer's damage abilities scale with Pixel Strength, and not with Physical Strength. It would be fair to assume that the opposite is true for the Hacker and Sentinel classes.

`Work In Progress` 

### Weapon Damage Scaling

| Base Damage | Tier 0 lvl 10 | +1 lvl 10 | +2 lvl 10 | +3 lvl 10 | +4 lvl 10 | +5 lvl 10 |
| ----------- | ------------- | --------- | --------- | --------- | --------- | --------- |
| 11          | 38            | 92        | 173       | 281       | 416       | 578       |
| 21          | 48            | 102       | 183       | 291       | 426       | 588       |
| 22 (11x2)   | 76            | 184       | 346       | 562       | 832       | 1156      |
| 31          | 58            | 112       | 193       | 201       | 436       | 598       |
| 41          | 68            | 122       | 203       | 211       | 446       | 608       |
| 42 (21x2)   | 96            | 204       | 366       | 582       | 852       | 1176      |
| 50          | 77            | 131       | 212       | 220       | 455       | 617       |
| 51          | 78            | 132       | 213       | 221       | 456       | 618       |
| 62 (31x2)   | 116           | 224       | 386       | 602       | 872       | 1196      |
| 82 (41x2)   | 136           | 244       | 406       | 622       | 892       | 1216      |
| 100 (50x2)  | 154           | 262       | 424       | 640       | 910       | 1234      |
| 102 (51x2)  | 156           | 264       | 426       | 642       | 912       | 1236      |
| 110         | 137           | 191       | 272       | 280       | 515       | 677       |
| 220 (110x2) | 274           | 382       | 544       | 760       | 1030      | 1354      |
| 240         | 267           | 321       | 402       | 510       | 645       | 807       |
| 480 (240x2) | 534           | 642       | 804       | 1020      | 1290      | 1614      |

# Acquiring a Weapon

There are a two different ways to acquire weapons in the game. Either by buying them directly from NPCs in Byte City, or by opening weapon lootboxes to receive a random weapon.

## Buying from NPCs

In Byte City there are two NPCs which sell weapons for pixels:

- Multi-Arms Dealer 
Has a basic weapon of *almost* each type (missing glitch and board).
Weapons are sold at prefixes none, Debugged and Overclocked.
- Cryptomancer (VIP Only)
Has a special VIP shop selling better weapons (including the earth glitch).
Weapons are sold with 3 tiers of damage and are Preem with an extra stat.

> ⚠️
> 
> The weapons purchased in the VIP shop are currently bugged and have no stats! Buy and use at your own risk…
> 

## Lootboxes

The other way to get weapons is through lootboxes. These have a fixed set of possible weapons inside and you will randomly receive one when you open the lootbox. You need to go to the Cryptomancer in Byte City to open your lootboxes.

Lootboxes can award you with weapons of all rarities with the following odds:

![Screenshot 2025-03-27 at 12.37.13.png](/content/all-about-weapons/e10e9310-2667-47ee-8d6d-805058e0b42b.png)

### Quest/Battlepass Lootboxes

Completing the quests in-game and the missions in your battlepass will sometimes reward you with lootboxes.

- These boxes range from 11 base damage to 51 base damage.
- These boxes can drop glitch type weapons

### Dungeon Lootboxes

Killing the boss in either dungeon rewards you with a lootbox.

- Both dungeons give the same lootbox
- Weapons inside have a base damage of 41
- There are no ranged weapons

### Darknet Lootboxes

There are 3 tiers of weapon lootboxes you can purchase with your Darknet currency.

- Base damage for tier 1 is 50 (up to 100 with weapon damage stat)
- Base damage for tier 2 is 110 (up to 220 with weapon damage stat)
- Base damage for tier 3 is 240 (up to 480 with weapon damage stat)
- All weapons inside are Pixel weapons
- There is a glitch type weapon (pixel glitch)

### Premium Lootboxes

The premium shop sells weapon lootboxes as well. Currently for the beta is the Beta Lootbox, which has the same stats as a second tier Darknet weapon lootbox.

- Base damage of the Beta lootbox is 110
- There are ranged weapons inside, but no glitches

> 💡
> 
> **REMINDER**
> 
> The best stat you can obtain on a weapon is double damage. Weapons without double damage are not worth reforging as they give 2x less damage per upgrade.
> 

# Upgrading a Weapon

Each weapon in the game can be upgraded to increase both its damage and its stats. To upgrade a weapon you must go to the Cybersmith Engineer in Byte City.

![Screenshot 2025-02-28 at 14.00.38.png](/content/all-about-weapons/Screenshot_2025-02-28_at_14.00.38.png)

Each weapon you obtain starts at the first tier (0). There are a total of 6 weapon tiers (0, +1, +2, +3, +4 and +5) . 

Each tier has 10 levels, where each level gives more damage to the weapon (and also boosts other weapon stats if there are any). 

Once reaching level 10, you can Reforge the weapon to the next tier. Reforging resets the level back to 1 removing the increased stats from the previous levels. Each upgrade after that will increase the stats even more than for the previous tier. 

Reforging may fail and destroy the weapon.

![Screenshot 2025-03-23 234522.png](/content/all-about-weapons/Screenshot_2025-03-23_234522.png)

> 💡
> 
> It is highly recommended to have a backup weapon when reforging so you are not stuck unable to farm with a shitty weapon if the reforge fails and your weapon breaks.
> 
> Make sure you have enough chromium to upgrade the weapon back to a high enough level (3 to 6 levels depending on the tier) after reforge to also not be stuck with a less powerful weapon than you had before.
> 

### Stats Increase per Level Upgrade

Each time you upgrade the weapon's level, each of these stats (if present on the weapon) will increase by the corresponding amount according to the weapon's current tier, adding on top of the weapon's base value for that stat.

| Tier | Weapon Dmg | Crit Chance | Crit Dmg | Phys Str | Pixel Str | Dodge | Heal Multi | CDR | Max HP |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | +3 | +0.017% | +0.06% | +2 | +2 | +0.01% | +0.057% | +0.01% | +3 |
| +1 | +9 | +0.051% | +0.18% | +6 | +6 | +0.03% | +0.171% | +0.03% | +9 |
| +2 | +18 | +0.102% | +0.36% | +12 | +12 | +0.06% | +0.342% | +0.06% | +18 |
| +3 | +30 | +0.170% | +0.60% | +20 | +20 | +0.10% | +0.570% | +0.10% | +30 |
| +4 | +45 | +0.255% | +0.90% | +30 | +30 | +0.15% | +0.855% | +0.15% | +45 |
| +5 | +63 | +0.357% | +1.26% | +42 | +42 | +0.21% | +1.197% | +0.21% | +63 |

> 💡
> 
> When a weapon has the Weapon Damage stat (so its base damage is doubled), **the increase of damage per level for each upgrade is also doubled** since both the base damage and the stat increase!
> 
> This means that a Preem weapon with 82 base damage (instead of 41), will get +6 dmg per level at Tier 0, +18 dmg at Tier +1, +36 dmg at Tier +2, etc…
> 
> **AGAIN, THIS IS THE MOST IMPORTANT STAT TO HAVE ON A WEAPON.**
> 

### Upgrade Costs

Upgrading a weapon's level will cost both pixels (p) and chromium (C). There are 6 different types of chromium: Petty (C1), Lesser (C2), Common (C3), Rare (C4), Mega (C5) and Giga (C6).

Petty chromium can be bought from the Relic Retailer for pixels (14 pixel per unit), the others can either be bought in the premium shop for bits, or farmed in the two dungeons (from mobs and secret rooms) and the Darknet (supply packs contain chromium).

For each reforge, you will also need one schematic of the correct weapon type. These can also be purchased through the premium shop or farmed in the dungeons.

| Tier | Level up cost | Lvl 10 cost | Reforge cost | Reforge success rate |
| --- | --- | --- | --- | --- |
| 0 | 50p + 10 C1 | 450p + 90 C1 | 200p + 1 schema | 85% |
| +1 | 100p + 20 C1 + 10 C2 | 900p + 180 C1 + 90 C2 | 500p + 1 schema | 70% |
| +2 | 300p + 40 C1 + 20 C2 + 10 C3 | 2700p + 360 C1 + 180 C2 + 90 C3 | 1000p + 1 schema | 55% |
| +3 | 500p + 40 C2 + 20 C3 + 10 C4 | 4500p + 360 C2 + 180 C3 + 90 C4 | 7000p + 1 schema | 40% |
| +4 | 4000p + 40 C3 + 20 C4 + 10 C5 | 36000p + 360 C3 + 180 C4 + 90 C5 | 65000p + 1 schema | 25% |
| +5 | 35000p + 40 C4 + 20 C5 + 10 C6 | 315000p + 360 C4 + 180 C5 + 90 C6 | N/A | N/A |

![Screenshot 2025-03-23 035206.png](/content/all-about-weapons/6e507efe-3eeb-49a0-ad60-3ee2bfd8aff4.png)

# Using a Weapon

You can only equip one weapon to use at a time. To do so simply open your inventory and either double click on the weapon or right click + equip.

Once equipped, you can use the left mouse click to perform the weapon's basic attack where your cursor is pointing. Each weapon also has a charged attack which can be performed by using the right mouse click button. Holding the right click will charge the attack, increasing its damage (this is currently not worth using, but will be improved in the future).

Every class can use every weapon, both ranged or melee.

> ⚠️
> 
> The Sentinel class cannot generate Bytecell (energy) when using Glitch type weapons to attack. Also does not seem to work with Slinger type weapons. Droids work though...
> I am not sure if this is intended or a bug.
> 
