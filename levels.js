/**
 * Handles the transition between levels by removing previous level's elements, 
 * setting up the environment, updating the tileset, and spawning new enemies.
 * Also updates the player's position and other level-specific attributes like coin color and map name.
 *
 * This function handles the environment setup based on the current level, including tile groups and enemies.
 *
 * @function changeLevel
 * @returns {void} Does not return a value.
 * 
 * @see {@link setEnviroment} For setting up the tileset based on the level.
 * @see {@link updateTileset} For updating the current tileset.
 * @see {@link spawnEnemies} For spawning the enemies specific to the current level.
 * @see {@link resetplayer} For resetting the player's state at the beginning of the new level.
 * @see {@link initializeBoss} For initializing the boss encounter when the level is a boss room.
 * @see {@link allSpritesGroup} For the usage of allSpritesGroup
 * @see {@link enemyGrouo} For the usage of enemyGrouo
 * @see https://p5play.org/docs/global.html#allSprites for the allSprites Group documentation
 */
function changeLevel(){
    //Remove Previous Level(Removes all sprites except player, sensors and UI)
    for (let i = 0; i < allSprites.length; i++) {
        if (
            allSprites[i] != lizard &&
            allSprites[i] != groundSensor &&
            allSprites[i] != cameraSensor &&
            allSprites[i] != leftSensor &&
            allSprites[i] != rightSensor &&
            allSprites[i] != topSensor &&
            !allSprites[i].isPerm
        ) {
            allSpritesGroup.add(allSprites[i]);
        }
    }
    allSpritesGroup.removeAll();
    //Create new level
        //Changes which tileset is used depnding on the level
        if(currentLevel == 0){
            setEnviroment(forestTiles);
            enemyGroup = {e1: fly, e2: leaf}

        }else if(levels[currentLevel].map != levels[currentLevel - 1].map){ //Checks if the current level is different than the previous one
            switch(levels[currentLevel].map){
                case 'forest':
                    currentMap = 'forest';
	                updateTileset(forestTiles);
                    enemyGroup = {e1: fly, e2: leaf}
                    break;
                case 'mountain':
                    currentMap = 'mountain';
                    updateTileset(mountainTiles);
                    enemyGroup = {e1: bat, e2: cobra}
                    break;
                case 'entrance':
                    currentMap = 'entrance';
                    updateTileset(castleTiles);
                    enemyGroup = {e1:imp , e2:ghoul}
                    break;
                case 'castle':
                    currentMap = 'castle';
                    updateTileset(castleTiles);
                    enemyGroup = {e1:imp , e2:ghoul}
                    break;
                case 'bossRoom':
                    enemyGroup = {e1:frog , e2:witch}
                    currentMap = 'bossRoom';
                    break;
            }
        }

        //New Level Tiles
        tileGroup = new Tiles(levels[currentLevel].platforms, 0, 0, ground.w, ground.h);
        //Change coin color
        for(let c of coins) c.changeAni(currentMap);
        //update map name
        currentMap = levels[currentLevel].map;
        //reset player to spawn point
        if(currentLevel>0) resetplayer(resetCamera = true, resetHealth = false);

        currentLevel++;

        if(currentMap=='bossRoom') initializeBoss();

	    spawnEnemies(enemyGroup.e1, enemyGroup.e2);
}

/**
 * Preloads the level data by populating the `levels` array with information about platforms, maps, and level number.
 * Sets `currentLevel` to the level of the first entry.
 *
 * @function preloadLevels
 * @returns {void} 
 * 
 * @see {@link levels} For the array that stores the information of all levels in the game.
 * @see {@link currentLevel} For the variable that tracks the current level during gameplay.
 */
function preloadLevels() {
    levels.push({
        platforms: [
"........................................................................................................................................................................................................................................................",
"........................................................................................................................................................................................................................................................",
"........................................................................................................................................................................................................................................................",
"........................................................................................................................................................................................................................................................",
"........................................................................................................................................................................................................................................................",
"........................................................................................................................................................................................................................................................",
"........................................................................................................................................................................................................................................................",
"........................................................................................................................................................................................................................................................",
"........................................................................................................................................................................................................................................................",
"........................................................................................................................................................................................................................g...............................",
"...............................................................................................1......c........................................c.......................................................................<b...............................",
".....................................................................................................ff..............................fffffff...ffff..............................................................f....<bb...............................",
"..........................................................................................fffffffff.................................................f................................................................<bbb..ffff.........................",
"..................................................1..........................................................................................................................................................f......<bbbb...............................",
"................................................................c.......................f.........................................c..................f...............1..........f....................c.............<bbbbb........ffff...................",
"......c...................................<g>.......f..........fff......................................fff.......................f......................g...g...............g.....g.............ffffffff.........<bbbbbb...............................",
"b.....f..............................fff..rbl..f.......f..<g>.......................fff...........................................1.....................<b...b>.............<b.....b>............................<bbbbbbb..............fff..............",
"b........fffff...............f.<g>........rbl.....f.......rbl......f.........................................f.........................................<bb...bb>...........<bb.....bb>..........................<bbbbbbbb...............................",
"b..............................rbb>.......rbl.............rbl....................f................c...................f.......f...f...f...............<bbb...bbb>.........<bbb.....bbb>........................<bbbbbbbbb.........ff....................",
"b...............<gg>.......ff..rbbb>......................rbl........ff.............f............c.c.................................................<bbbb...bbbb>.......<bbbb.....bbbb>......................<bbbbbbbbbb...............................",
"b.........S.....rbbl.........2.rbbbb>............2....2...rbl.............................2..g......................................................<bbbbbnnnbbbbb>.....<bbbbbnnnnnbbbbb>............2.......<bbbbbbbbbbb.ccc.................E.........",
"bgggggggggggggggbbbbgggggggggggbbbbbbgggggggggggggggggggggbbbgggggggggggg...gggggggggggggggggbggg...ggggggggggggggggggggggggggggggggggggggggggggggggbbbbbbbbbbbbbbbgggggbbbbbbbbbbbbbbbbbggggggggggggggggggggbbbbbbbbbbbbggggggggggggggggggggggggggggggg",
"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbnnnbbbbbbbbbbbbbbbbbbbbbnnnbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        ],
        map: "forest",
        level: 0
    });
    levels.push({
        platforms: [
"............................................................................................................................................................................................................................................................",
"............................................................................................................................................................................................................................................................",
"............................................................................................................................................................................................................................................................",
"............................................................................................................................................................................................................................................................",
"............................................................................................................................................................................................................................................................",
"............................................................................................................................................................................................................................................................",
"............................................................................................................................................................................................................................................................",
"............................................................................................................................................................................................................................................................",
"..............................................................................................................1.............................................................................................................................................",
"............................................................................................................................................................................................................................................................",
"................................................................................................................b...........................................................................................................................................",
"................................................................................................................b..................c...........................................................................................c............................",
"................................................................................................................b...........................................................................................................................................",
".......................................1....................................................................c...b................f...f...................................................................................<g>................................",
"..............................c.........................................c..............................<gg..g...b......................................................................<.ffff............................rbl...fffffff......................",
".................................................................................................<g>...rbbnnbnnnb..............f.......f..............1...............................<b...............1...............g.rbl................................",
"................................g..g..........c...................<gg......................<g>...rbl...rbbbbbbbbb..........................................<ggfff....................<b.......fff......................b.rbl................................",
"............................g...b..b............................<gbb....................f..rbl...rbl...rbl...................f...........f.................rbl......................<b...............................<.b.rbl...........ffff.................",
"............................b...b..b.g.........................<bbb........................rbl...rbl...rbl..............................................f..rblc..ffff..............<b.............ff................<b.b.rbl................................",
".........................g..b...b..b.b...g...................<gbbbb..................f.....rbl...rbl.......................f...............f...........ff..rbl....................<bbc..ffff.......................<bb.b.rbl........f.......................",
"............S.........g..b..b...b..b.b...b..g.............<ggbbbb................2.........rbbnnnbbl..............................................2........rbl...............2...<bbbgg...........................<bbb.b.rbl.........................E............",
"ggggggggggggggggggggggbnnbnnbnnnbnnbnbnnnbnnbgggggggggggggbbbbbbbnnnnnnngggggggggggggggggggbbbbbbbbbgggggggggggggggggggggggggnnnnnnnnnnnnngggggggggggggggggbbbgggggggggggggggggggbbbbbbnnnngggggggggggggggggggggggbbbbnbnbbbgggggggggggggggggggggggggggggggggggggg",
"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        ],
        map: "forest",
        level: 1
    });
    levels.push({
        platforms: [
".......r......................................l",
".......r......................................l",
".......r......................................l",
".......r......................................l",
".......r......................................l",
".......r......................................l",
".......r......................................l",
".......r......................................l",
".......r....................1.................l",
".......r..............................................l",
".......r..........g...2......2.............E...........l",
".......r......ffffbffffffffffffffffffffffffffffffffffff",
".......r......................................l",
".......r...f..................................l",
".......r......................................l",
".......r.f....................................l",
".......r...f....c..f..f..f..f.................l",
".......r.....f................g...............l",
".......r........<gnnnnnnnnnnnnb.f.....c.......l",
".......r........bbbbbbbbbbbbbbb...f...........l",
".......r............................fffff.....l",
".......r......................................l",
".......r..................................f...l",
".......r......................................l",
".......r............f.....f....f....f.......f.l",
".......r.........f......................f.....l",
".......r...............f.....f....f...f...ff..l",
".......r.......f..............................l",
".......r......................................l",
".......r.....f................................l",
".......r......................................l",
".......r...f..................................l",
".......r...............1......................l",
".......r.f....................................l",
".......r.....f.f.fffff...ffff..fffff...f......l",
".......r..ff............................f.....l",
".......r.................................f....l",
".......r......................................l",
".......r...................................f..l",
".......r................c.....................l",
".......r................f................f....l",
".......r........................2.............l",
".......rc........ffffg.....gffffg..gffff......l",
".......bg>....f......bnnnnnb....bnnb..........l",
".......bbb>...........bbbbb......bb...........l",
".......bbbb>..................................l",
".......bbbbb>.................................l",
".......bbbbbb>................................l",
".......bbbbbbb>...............................l",
".......bbbbbbbb>..............................l",
".......bbbbbbbbb>.............................l",
".......bbbbbbbbbb>............................l",
".......bbbbbbbbbbb>...........................l",
"bbbbbbbbbbbbbbbbbbb>.f........................l",
"........................fff...................l",
".............................ffff.............l",
"..................................fffff.......l",
".....................................1...f....l",
"..............................................l",
".................................fffffff......l",
"...........................fffff..............l",
".b............................................l",
".b.....................fff..................c.l",
".b...........S................................l",
"ggggggggggggggggggggggggggggggggggggggggggggggb",
"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        ],
        map: "mountain",
        level: 2
    });
    levels.push({
        platforms: [
".......................................................",
".......................................................",
".......................................................",
".......................................................",
".......................................................",
".......................................................",
".......................................................",
".......................................................",
".......................................................",
".......................................................",
".......................................................",
".......................................................",
".......................................................",
".......................................................",
".......................................................",
".......................................................",
".......................................................",
".......................................................",
".......................................................",
"b......................................................",
"b......................................................",
"b......................................................",
"b........S.............................E...............",
"ggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
],
        map: "entrance",
        level: 3
    });
 
    levels.push({
        platforms: [
"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
"lttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttr",
"l......................................................................................................................................................................................................r",
"l......................................................................................................................................................................................................r",
"l......................................................................................................................................................................................................r",
"l.....................................................................................................................2................................................................................r",
"l.....................................................................................................................<>........<ggg..>................................................................r",
"l.....................................................................................................................rl........r....fb>...............................................................r",
"l...........................................................................................................f.....c...rl.......<b.....bb>....c.........................................................rbbbbbbbbbbbbbbbbbbbbbbbbbb",
"l..........................c..........................................................................1...............rl......<bb...f.bbb>.............................................................rbbbbbbbbbbbbbbbbbbbbbbbbbb",
"l...........................................................................................<gg>...<ggggg>.....<ggggggbb.....<bbb.....bbbb>............................................................rbbbbbbbbbbbbbbbbbbbbbbbbbb",
"l........................................................................................f..bbbb...bbbbbbb.....bbbbbbbbb.....rbbbf....bbbbb>...........................................................rbbbbbbbbbbbbbbbbbbbbbbbbbb",
"l..................f...f...f...f...f...f....................................c...............................................<bbbbfff..bbbbbb>..........................................................rbbbbbbbbbbbbbbbbbbbbbbbbbb",
"...............f..........................f..........................f...............fff...................f................rbbbb....fbbbbbbb>.........................................................rtttttttttttttttttttttttttt",
".............................................f...................g.......g.................................................<bbbbb.....bbbbbbbb>...................................................................................",
".............f................................................g..b.......b.........f..........................f...........<bbbbbbcc.f.bbbbbbbbb>..................................................................................",
".........S.................................c..........1.......b..b2....2gb...............................................<bbbbbbb2c...bbbbbbbbbb>...........1g........2g....1......2g.............E...............................",
"nnggggggggggggggnnnnnnnnnnnnnnnnnnnnnnnnnnggggggggggggggggggggbggbggggggbbggggggggggggnnnnnnnnnnnnnnnnnnnnnnnnnngggggggggbbbbbbbbgggggbbbbbbbbbbbggggggggggggbgggggggggbggggggggggggbggggggggggggggggggggggggggggggggggggggggggggg",
"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
],
        map: "castle",
        level: 4
    });

    levels.push({
        platforms: [
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".............E...........................................",
".........................................................",
"b.....................b..................................",
"b.....................b..................................",
"b.....................b..................................",
"b.......S.........B.T.b..................................",
"iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",
],
        map: "bossRoom",
        level: 5
    });

    levels.push({
        platforms: [
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".........................................................",
".............E...........................................",
".........................................................",
"b.....................b..................................",
"b.....................b..................................",
"b.....................b..................................",
"b.......S......2...1..b..................................",
"iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",
],
        map: "bossRoom",
        level: 6
    });
    
    currentLevel = levels[0].level;
}