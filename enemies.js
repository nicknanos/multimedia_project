/**
 * Initializes various enemy groups and assigns their properties, animations, and behaviors.
 * Each enemy group is configured with specific attributes such as size, movement type, sprite sheet, 
 * animations, and other properties like speed, friction, and scale. The function also sets their initial 
 * animations to 'stand'.
 * 
 * @function initializeEnemies
 * @returns {void}
 * 
 * @description 
 * This function creates multiple types of enemies with different behaviors and characteristics. The enemies 
 * include flying enemies (like `fly` and `bat`), ground-based enemies (like `leaf`, `cobra`, `imp`, and `ghoul`), 
 * as well as special enemies like `boss`, `witch`, and `frog`. Each enemy type is configured with a sprite sheet, 
 * animations (stand, move, attack, death, etc.), speed, friction, and other relevant properties. The function 
 * ensures each enemy is set to its idle 'stand' animation upon initialization.
 * 
 * 
 * @example 
 * //Enemy Properties explanation
 * 
 * 	enemy = new enemies.Group(); (Subgroup of enemies Group)
 *	enemy.w = number;  (enemy width)
 *	enemy.h = number;  (enemy height)
 *	enemy.layer = number;   (Determines the layer of a Sprite in case of overlapping)
 *	enemy.flying = false;	(attribute determining if an enemy can fly)
 *	enemy.rotationLock = 'true'; (Prevents sprite from spinning)
 *	enemy.spriteSheet = 'img';   (Sets animation spritesheet to group) 
 *	enemy.mass = 'number;	     (Sprites mass, is affected by gravity)
 *	enemy.speed = 0.015;  		 (Enemy speed, used in chasing)
 *	enemy.friction = 0;			 (Sprite friction with other sprites)
 *	enemy.anis.w= 32;			 (Widht of animation frame in spritesheet)
 *	enemy.anis.h= 32;			 (Height of animation frame in spritesheet)
 *	enemy.scale = 1.7;			 (Sprite size scalling)
 *	enemy.anis.offset.x = 0;	 (x cord offset of the animation frame to the center of the sprite)
 *	enemy.anis.offset.y = -2.4;  (y cord offset of the animation frame to the center of the sprite)
 *	enemy.addAnis({										(Determines which part of the spritesheet is corresponds to each animation)
 *		stand: { row: 0, frames: 4, frameDelay: 10 },	
 *		move: { row: 1, frames: 8, frameDelay: 10 },
 *		attack: { row: 2, frames: 6, frameDelay: 13 },
 *      death: { row: 4, frames: 6, frameDelay: 10},
 *      dead: { row: 20, frames: 0}
 *	});
 * 
 */
function initializeEnemies(){
	enemies = new Group();

    fly = new enemies.Group();
	fly.w = 8;
	fly.h = 8;
	fly.collider = 'none'
	fly.flying = true;
	fly.layer = 5;
	fly.rotationLock = 'true';
	fly.spriteSheet = flyImg;
	fly.speed = 0.01;
	fly.friction = 0;
	fly.anis.w = 32;
	fly.anis.h = 32;
	fly.scale = 1.5;
	fly.addAnis({
		stand: { row: 0, frames: 4, frameDelay: 10 },
		move: { row: 0, frames: 4, frameDelay: 10 },
		attack: { row: 2, frames: 4, frameDelay: 13 },
        death: { row: 3, frames: 6, frameDelay: 10},
        dead: { row: 5, frames: 0}
	});

    for(f of fly) f.changeAni('stand');


    leaf = new enemies.Group();
	leaf.w = 5;
	leaf.h = 5;
	leaf.layer = 5;
	leaf.flying = false;
	leaf.rotationLock = 'true';
	leaf.spriteSheet = leafImg;
	leaf.mass = 100;
	leaf.speed = 0.01;
	leaf.friction = 0;
	leaf.anis.w= 32;
	leaf.anis.h= 32;
	leaf.scale = 1.5;
	leaf.anis.offset.x = 1;
	leaf.anis.offset.y = -4.5;
	leaf.addAnis({
		stand: { row: 0, frames: 5, frameDelay: 10 },
		move: { row: 1, frames: 5, frameDelay: 10 },
		attack: { row: 5, frames: 6, frameDelay: 13 },
        death: { row: 4, frames: 7, frameDelay: 10},
        dead: { row: 20, frames: 0}
	});

    for(l of leaf) l.changeAni('stand');

	bat = new enemies.Group();
	bat.w = 5;
	bat.h = 5;
	bat.layer = 5;
	bat.collider = 'none'
	bat.flying = true;
	bat.rotationLock = 'true';
	bat.spriteSheet = batImg;
	bat.speed = 0.01;
	bat.friction = 0;
	bat.anis.w= 16;
	bat.anis.h= 16;
	bat.scale = 2;
	bat.anis.offset.x = 1;
	bat.anis.offset.y = -4.5;
	bat.addAnis({
		stand: { row: 0, frames: 5, frameDelay: 10 },
		move: { row: 1, frames: 5, frameDelay: 10 },
		attack: { row: 5, frames: 6, frameDelay: 13 },
        death: { row: 2, frames: 5, frameDelay: 10},
        dead: { row: 20, frames: 0}
	});

    for(b of bat) b.changeAni('stand');

	cobra = new enemies.Group();
	cobra.w = 9;
	cobra.h = 7;
	cobra.layer = 5;
	cobra.flying = false;
	cobra.rotationLock = 'true';
	cobra.spriteSheet = cobraImg;
	cobra.mass = 100;
	cobra.speed = 0.01;
	cobra.friction = 0;
	cobra.anis.w= 32;
	cobra.anis.h= 16;
	cobra.scale = 2;
	cobra.anis.offset.x = 2;
	cobra.anis.offset.y = 0;
	cobra.addAnis({
		stand: { row: 0, frames: 8, frameDelay: 10 },
		move: { row: 1, frames: 8, frameDelay: 10 },
		attack: { row: 3, frames: 8, frameDelay: 13 },
        death: { row: 2, frames: 8, frameDelay: 10},
        dead: { row: 20, frames: 0}
	});

    for(c of cobra) c.changeAni('stand');

	ghoul = new enemies.Group();
	ghoul.w = 6;
	ghoul.h = 10;
	ghoul.layer = 5;
	ghoul.flying = false;
	ghoul.rotationLock = 'true';
	ghoul.spriteSheet = ghoulImg;
	ghoul.mass = 100;
	ghoul.speed = 0.015;
	ghoul.friction = 0;
	ghoul.anis.w= 32;
	ghoul.anis.h= 32;
	ghoul.scale = 1.7;
	ghoul.anis.offset.x = 0;
	ghoul.anis.offset.y = -2.4;
	ghoul.addAnis({
		stand: { row: 0, frames: 4, frameDelay: 10 },
		move: { row: 1, frames: 8, frameDelay: 10 },
		attack: { row: 2, frames: 6, frameDelay: 13 },
        death: { row: 4, frames: 6, frameDelay: 10},
        dead: { row: 20, frames: 0}
	});

    for(g of ghoul) g.changeAni('stand');

	imp = new enemies.Group();
	imp.w = 6;
	imp.h = 6;
	imp.layer = 5;
	imp.flying = false;
	imp.rotationLock = 'true';
	imp.spriteSheet = impImg;
	imp.mass = 100;
	imp.speed = 0.01;
	imp.friction = 0;
	imp.anis.w= 32;
	imp.anis.h= 32;
	imp.scale = 2;
	imp.anis.offset.x = 0;
	imp.anis.offset.y = -4.5;
	imp.addAnis({
		stand: { row: 0, frames: 7, frameDelay: 10 },
		move: { row: 1, frames: 8, frameDelay: 10 },
		attack: { row: 2, frames: 6, frameDelay: 13 },
        death: { row: 4, frames: 6, frameDelay: 10},
        dead: { row: 20, frames: 0}
	});

    for(i of imp) i.changeAni('stand');

	boss = new Group();
	boss.w = 15;
	boss.h = 20;
	boss.rotationLock = 'false';
	boss.spriteSheet = bossImg;
	boss.friction = 0;
	boss.speed = 0.01;
	boss.health  = 4;
	boss.anis.w = 64;
	boss.anis.h = 64;
	boss.scale = 2;
	boss.anis.offset.x = 0;
	boss.anis.offset.y = -5.5;
	boss.addAnis({
		stand: { row: 0, frames: 3, frameDelay: 10 },
		move: { row: 1, frames: 5, frameDelay: 10 },
		damage: { row: 6, frames: 4, frameDelay: 10 },
		bounceU: {row: 9, frames: 5, frameDelay: 10},
		bounceD: {row: 10, frames: 6, frameDelay: 10},
        death: { row: 7, frames: 10, frameDelay: 10},
        dead: { row: 4, frames: 1}
	})
    for(b of boss) b.changeAni('stand');


	witch = new enemies.Group();
	witch.w = 6;
	witch.h = 10;
	witch.scale = 2;
	witch.layer = 5;
	witch.mirror.x = true;
	witch.rotationLock = 'true';
	witch.spriteSheet = witchImg;
	witch.anis.offset.x = 0;
	witch.anis.offset.y = -2;
	witch.anis.frameDelay = 6;
	witch.friction = 0;
	witch.anis.w=32;
	witch.anis.h=32;
	witch.addAnis({
		stand: { row: 0, frames: 4, frameDelay: 10},
		run: { row: 1, frames: 8 },
        hex: { row: 2, frames: 8, frameDelay: 10},
        death: { row: 4, frames: 10, frameDelay: 10},
        dead: { row: 20, frames: 0, frameDelay: 10},
        fly: { row: 5, frames: 4, frameDelay: 10},
        hit: { row: 3, frames: 4, frameDelay: 10}
	});
	for (w of witch) w.changeAni('stand');


	frog = new enemies.Group();
	frog.w = 5;
	frog.h = 5;
	frog.scale = 2;
	frog.layer = 5;
	frog.mirror.x = true;
	frog.rotationLock = true;
	frog.friction = 0;
	frog.spriteSheet = frogImg;
	frog.anis.offset.x = 0;
	frog.anis.offset.y = -5;
	frog.anis.frameDelay = 10;
	frog.anis.w=32;
	frog.anis.h=32;
	frog.addAnis({
		stand: { row: 0, frames: 4 },
		move: { row: 1, frames: 6, frameDelay:5 },
		jump: { row: 2, frames: 5, frameDelay: 10 },
		death: { row: 0, frames: 1, frameDelay: 10},
        dead: { row: 20, frames: 0, frameDelay: 10},
	});
	for(f of frog)  f.changeAni('stand');
}

/**
 * Enemy Y coordinate at begging of chase
 * @type {number}
 * @see enemyProximity for use
 */
let enemyCurrentY

/**
 * Constantly checks if an enemy is near the player and updates enemy behavior accordingly.
 * If the enemy is within a specified proximity of the player, it will start chasing the player.
 * It also handles enemy orientation, movement, and interactions with environmental elements like spikes and platforms.
 * 
 * @function enemyProximity
 * @returns {void}
 * 
 * @description 
 * This function iterates over all the enemies in the map and checks if any of them are near the player.
 * The proximity is determined by a distance check (100 units in both the X and Y axes).
 * If an enemy is within this range, the following actions occur:
 * - Enemy orientation is adjusted based on the player's position.
 * - If the enemy is not already chasing, it begins chasing the player, and its Y-coordinate is tracked.
 * - If the enemy's Y-coordinate changes significantly (i.e., falls to a lower level), it applies a downward force.
 * - Flying enemies can move freely toward the player, while walking enemies are limited to moving along the X-axis.
 * - Enemies also interact with environmental hazards (e.g., spikes) by dying upon overlap.
 * 
 */
function enemyProximity() {
	for(e of enemies){
		if(e.overlaps(spikes)) killEnemy(e); //enemies die on spikes
		if ((abs(lizard.x - e.x))<100 && (abs(lizard.y - e.y))<100){		//Checks distance
			if((lizard.x - e.x)<0){ //fixes enemy orientation
				e.mirror.x = true;
				e.dir = 1;
			}else{
				e.mirror.x = false;
				e.dir = -1;
				}	
			if(!chasing){				//At the moment of chasing grabs enemy Y and changes to movement animation
				enemyCurrentY = e.y
				e.changeAni('move');
				chasing = true;
			}			
			if(((e.y - enemyCurrentY) > 0.5 || (e.y - enemyCurrentY) < -0.5)&& !e.flying ) {	//Updates Y cord in case enemy falls to lower level
				enemyCurrentY = e.y;
				e.applyForceScaled(0, 50)	//Pushes enemy down
			} else e.mass = 0	//Pushes enemy down
			if(e.flying){	//Flying enemies move freely
				e.moveTowards(lizard, e.groups[2].speed)	
			}else{		//Walking enemies move only on the X axis
				e.moveTowards(lizard.x - (20*e.dir),enemyCurrentY, e.groups[2].speed)	
			}
		}
	}
}
/**
 * Initializes the boss character and its associated attack area.
 * 
 * @function initializeBoss
 * @returns {void} Does not return a value.
 * 
 * @description 
 * This function creates an instance of the boss (Goblin King) at the boss spawner location
 * and sets up its attack area. The boss attack area is an invisible sprite that overlaps 
 * with both the boss and the player (lizard) to detect attacks. The function configures the 
 * boss's visual properties, its attack area, and the animation states for the attack area.
 * 
 */
function initializeBoss(){
	for(sp of bossSpawner){		
		goblinKing = new boss.Sprite(sp.position.x, sp.position.y)
		goblinKing.mirror.x = true;
		bossAttackArea = new Sprite(goblinKing.x-50,goblinKing.y,75,4);
		bossAttackArea.scale = 2;
		bossAttackArea.overlaps(goblinKing);
		bossAttackArea.overlaps(lizard);
		bossAttackArea.visible = false;
		bossAttackArea.canDmg = false;
		bossAttackArea.spriteSheet = bossAttackAreaImg;
		bossAttackArea.anis.w = 64;
		bossAttackArea.anis.h = 64;
		bossAttackArea.anis.offset.x = -5;
		bossAttackArea.addAnis({
			active: {row: 0, frames: 12, frameDelay: 5},
			inactive: {row:10, frames:0}
		})
		bossAttackArea.changeAni('inactive')
   }
}

/**
 * Sprite spawned when the boss is defeated
 * representing the defeated boss body
 * @type {Sprite}
 */
let bossBody; 

/**
 * Indicator of the boss dying
 * @type {boolean}
 */
let deathTrigger = false;

/**
 * Handles the behavior and logic of the boss character during gameplay.
 * 
 * @async
 * @function bossAI
 * @returns {Promise<void>} Resolves when the boss's death sequence is complete.
 * 
 * @description 
 * This asynchronous function manages the boss's actions and state transitions. If the boss's health is greater than zero, 
 * it performs its attacks. When the boss's health reaches zero, the function triggers its death sequence, including removing 
 * its attack area, transitioning its animations, and handling its removal from the game.
 * 
 */
async function bossAI(){
	if(goblinKing.health>0){
		bossAttack();
	}else if(!deathTrigger){
		deathTrigger = true;
		bossAttackArea.remove();
		bossBody = new boss.Sprite(goblinKing.x, goblinKing.y)
		bossBody.overlaps(goblinKing);
		bossBody.overlaps(lizard);
		goblinKing.remove();
		await bossBody.changeAni(['death','dead']);
	}
}

/**
 * Timer ID for managing boss attack intervals.
 * @type {number}
 * @see bossAttack
 */
let bossAttackAreaTimer;

/**
 * Flag indicating when the boss can attack
 * @type {boolean}
 * @see bossAttack
 */
let canBossAttack = true; 

/**
 * Stores the frame of the time of a boss attack
 * Used to calculate when the boss can attack again
 * @type {number}
 * @see bossAttack
 */
let bossPrevFrame;

/**
 * Executes the boss's attack behavior, including animation transitions and damage logic.
 * 
 * @async
 * @function bossAttack
 * @returns {Promise<void>} Resolves when the attack sequence is complete.
 * 
 * @details 
 * - **Attack Triggering**: 
 *   - The attack can only occur if `canBossAttack` is `true`.
 *   - Sets a cooldown for the boss's attack by toggling `canBossAttack` and storing the frame count in `bossPrevFrame`.
 * - **Animation Sequence**:
 *   - Plays an upward and downward bounce animation for the boss (`bounceU` and `bounceD`).
 *   - Activates the attack area by making it visible, enabling damage, and switching to the 'active' animation state.
 *   - After the attack, transitions the boss back to its 'stand' animation state.
 * - **Damage Logic**:
 *   - If the attack area overlaps with the player (`lizard`), the `damage` function is triggered.
 * - **Attack Reset**:
 *   - After a specific number of frames, the attack area is deactivated by hiding it, disabling damage, and changing its animation state to 'inactive'.
 *   - Once the cooldown period is reached (350 frames), the boss is ready to attack again by setting `canBossAttack` to `true`.
 */
async function bossAttack(){
	if(canBossAttack){
		canBossAttack = false
		bossPrevFrame = frameCount;
		await goblinKing.changeAni(['bounceU','bounceD']);
		bossAttackArea.canDmg = true;
		bossAttackArea.visible = true;
		bossAttackArea.changeAni('active');
		await goblinKing.changeAni('stand');
		if(abs(bossPrevFrame-frameCount)>80){
			bossAttackArea.visible = false;
			bossAttackArea.canDmg = false;
			bossAttackArea.changeAni('inactive')
		}
		if (bossAttackArea.overlapping(lizard)) damage();
	}
	if(abs(bossPrevFrame-frameCount)>350){
		canBossAttack = true
	}	
}

/**
 * Handles applying damage to the boss when certain conditions are met.
 * 
 * @async
 * @function damageBoss
 * @param {Sprite} area - The sprite or representing the bosses attack area.
 * @returns {Promise<void>} Resolves after the boss's damage animation sequence is complete.
 * 
 * @description 
 * Checks if the boss can damage the player and then if the player is within range. If so, it reduces the boss's health, 
 * plays a sound effect, and transitions the boss through its damage animation sequence.
 * 
 */
async function damageBoss(area){
	if(!bossAttackArea.canDmg){
		if(abs(goblinKing.x - area.x) < 30 && abs(goblinKing.y - area.y) < 30){
			canDamage = false;
			defeatSound.play();
			await goblinKing.changeAni(['damage','stand'])
			goblinKing.health--
			canDamage = true;
		}
	}
}