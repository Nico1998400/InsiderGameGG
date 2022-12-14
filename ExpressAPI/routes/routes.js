import express, { application } from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors"


const route = express.Router();
route.use(cors());


let userList = [
  {
    title: "",
    host: "Host",
    username: "one",
    score: 0,
    secretWord: "Unknown",
    id: "10c5848c-6dc2-4683-bd14-af2aaedb60a1",
    voteCount: 0,
    hasVoted: false
  },
  {
    title: "",
    host: "",
    username: "two",
    score: 0,
    secretWord: "Unknown",
    id: "94a09932-790e-431a-a34c-2f8af03687d5",
    voteCount: 0,
    hasVoted: false
  },
  {
    title: "",
    host: "",
    username: "three",
    score: 0,
    secretWord: "Unknown",
    id: "793e98bb-aa87-425b-809f-09a1b4001145",
    voteCount: 0,
    hasVoted: false
  },
  {
    title: "",
    host: "",
    username: "four",
    score: 0,
    secretWord: "Unknown",
    id: "305898e8-c484-437d-a2c3-b2044241f4b7",
    voteCount: 0,
    hasVoted: false
  },
  {
    title: "",
    host: "",
    username: "five",
    score: 0,
    secretWord: "Unknown",
    id: "323897e8-c484-437d-a2c3-b2044241f3t1",
    voteCount: 0,
    hasVoted: false
  }
];

let hostedLobby = [


];



route.get("/lobbylist", (req, res) => {
  res.send(hostedLobby);
});

route.post("/add/lobby/:username", (req, res) => {
  const user = {
    username: req.params.username,
    title:'',
    id: uuidv4(),
    host:'',
    score: 0,
    voteCount:0,
    hasVoted: false

    
  };
  hostedLobby.push(user);
  res.send(user);
});


route.delete("/delete/lobbyuser/:username", (req, res) => {
  hostedLobby = hostedLobby.filter(
    (user) => user.username !== req.params.username
  );
  res.status(200).send();
});

/**
 * @swagger
 *   /insider/allusers:
 *     get:
 *       description: Get all user by username
 *       produces:
 *         - application/json
 *       parameters:
 *           schema:
 *             properties:
 *               username:
 *                 type: string
 *       responses:
 *          200:
 *            description: Succes
 */
route.get("/allusers", (req, res) => {
  res.send(userList);
});

/**
 * @swagger
 *   /insider/username/{username}:
 *     get:
 *       description: Get a single post by username
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: username
 *           description: The username of the requested post
 *           schema:
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *       responses:
 *          200:
 *            description: Succes
 */
route.get("/username/:username", (req, res) => {
  const user = userList.find(
    (user) => user.username === req.params.username
  );
  res.send(user || "no such username found");
  console.log(user)
});

/**
 * @swagger
 *   /insider/add/user/{username}:
 *     post:
 *       description: Add user by username
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: username
 *           description: The username of the requested post
 *           schema:
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *       responses:
 *          200:
 *            description: Succes
 */
route.post("/add/user/:username", (req, res) => {
  const user = {
    score: 0,
    username: req.params.username,
    id: uuidv4(),
  };
  userList.push(user);
  res.send(user);
});

/**
 * @swagger
 *   /insider/start/{userAndWord}:
 *     put:
 *       description: Start game by entering secret word and username
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: userAndWord
 *           description: The username of the requested post
 *           schema:
 *             type: array
 *             required:
 *               - userAndWord
 *             properties:
 *               userAndWord:
 *                 type: string
 *       responses:
 *          200:
 *            description: Succes
 * 
 */

route.put("/host/:username", (req, res) => {
  resetTitles();
  console.log("Hosten har maxat detta spelet:")

  const host = req.params.username
   
  let objUser = userList.filter(x => x.username === host)
  .reduce((prev) => prev)

  objUser.host = "Host"

  res.status(200).send();
})

route.put("/start/", (req, res) => {
    resetTitles();
    console.log("SPELET ??R IG??NG:")
  
    res.status(200).send();
  
    randomizedRoles();
  })
  
  function resetTitles() {
    for (let x of userList) {
      x.title = "";
      x.secretWord = "";
      x.voteCount = 0;
      x.hasVoted = false;
    }
  }
  
  function random(int) { return Math.round(Math.random() * (int)) }
  
  function randomizedRoles() {
    //let randomizedInt = 0;
    //const user = avrunda(slumpm??ssigt tal(mellan 0.000000000-1.000000000)*anv??ndare)
    const randomizedMaster = random(userList.length - 1);
    let randomizedInsider = random(userList.length - 1)
    while(randomizedInsider == randomizedMaster){
      randomizedInsider = random(userList.length - 1)
    }
    console.log(
  `Master = ${userList[randomizedMaster].username}
  Insider = ${userList[randomizedInsider].username}`)
  
    userList[randomizedMaster].title = "Master"
    userList[randomizedInsider].title = "Insider"
  /*
    if (userList[randomizedUser].username !== objUser.username) {
  
      userList[randomizedUser].title = "Insider";
      userList[randomizedUser].secretWord = objUser.secretWord;
    } else {
      //console.log("hit host")
      randomizedRoles(objUser);
    }
    */
  
    for (let player of userList) {
      if (player.title == "Master")   continue
      if (player.title == "Insider")  continue
      player.title = "Player"
    }
  }


/**
 * @swagger
 *   /insider/delete/username/{username}:
 *     delete:
 *       description: Delete user by username
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: username
 *           description: The username of the requested post
 *           schema:
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *       responses:
 *          200:
 *            description: Succes
 */
route.delete("/delete/id/:id", (req, res) => {
  userList = userList.filter(
    (user) => user.id !== req.params.id
  );
  res.status(200).send();
});


/**
 * @swagger
 *   /insider/vote/{userAndGuess}:
 *     put:
 *       description: End game by entering Username word and guess of the insider
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: userAndGuess
 *           description: The username of the insider-guess
 *           schema:
 *             type: array
 *             required:
 *               - userAndGuess
 *             properties:
 *               userAndGuess:
 *                 type: string
 *       responses:
 *          200:
 *            description: Succes
 */
route.put("/vote/:userAndGuess", (req, res) => {

  console.log(" R??stningen ??R IG??NG:")

  const userAndGuess = req.params.userAndGuess;
  console.log(userAndGuess)
  let youUsername = userAndGuess.split(",")[0];
  let guessUsername = userAndGuess.split(",")[1];

  let objyou = userList.filter(x => x.username === youUsername)
    .reduce((prev) => prev)


  let objGuess = userList.filter(x => x.username === guessUsername)
    .reduce((prev) => prev)

  if (objyou.hasVoted === false) {
    objyou.hasVoted = true;
    objGuess.voteCount += 1;
  }


  console.log(objyou)
  console.log(objGuess)


  res.status(200).send();

  // randomizeInsider(objUser);
})


/**
 * @swagger
 *   /insider/status:
 *     get:
 *       description: Get status of the game
 *       produces:
 *         - application/json
 *       parameters:
 *           schema:
 *             properties:
 *               username:
 *                 type: string
 *       responses:
 *          200:
 *            description: Succes
 */
route.get('/status/', (req, res) => {
  // ge status ifall spelet ??r ig??ng, genom att kolla ifall n??gon ??r Game Host
  let gameRunning = false;
  for (let x of userList) {
    if (x.title === "Game host") {
      gameRunning = true
    }
  }
  if (gameRunning) {
    console.log("Spelet ??r ig??ng")
  } else {
    console.log("Spelet ??r inte ig??ng")
  }


  // ifall spelet ??r ??ver, visa hur m??nga som inte har r??stat

  const votes = userList.map(x => x.hasVoted === true ? 1 : 0)
    .reduce((prev, curr) => prev + curr, 0)



  // Ifall alla har r??stat, s?? ska r??sterna kontrolleras och resultatet skrivas ut. 
  let objInsider = userList.filter(x => x.title === "Insider")
    .reduce((prev => prev))

  if (votes === userList.length) {
    console.log(" Alla har r??stat")
    if (objInsider.voteCount > (userList.length / 2)) {
      console.log("Majoriteten har r??stat r??tt")

      for(let x of userList){
        if (x.title !== "Insider" )
        x.score +=1
      }

    } else {
      console.log("Majoriteten har r??stat fel")
      objInsider.score += 2
    }

  } else {
    console.log(votes + " av " + userList.length + " har r??stat")
  }



let scoreboard = userList.map(x => x.username + ": " + x.score +  ", " )
console.log(scoreboard)


  res.send(scoreboard)

})


/**
 * //@swagger
 *   /insider/username/{username}/score:
 *     put:
 *       description: Update score
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: username
 *         - in: path
 *           score: score
 *           description: Update score for user
 *           schema:
 *             required:
 *               - username
 *               - score
 *             properties:
 *               username:
 *                 type: string
 *               score:
 *                 type: int
 *       responses:
 *          200:
 *            description: Succes
 */
// route.put("/username/:username/score", (req, res) => {
//   const oldpost = posts.find((post) => post.id === req.params.id);

//   const updatedPost = {
//     ...oldpost,
//     ...req.body,
//     edited: new Date().toLocaleString(),
//   };

//   posts = posts.map((post) =>
//     post.id === updatedPost.id ? updatedPost : post
//   );

//   res.send(updatedPost);
// });

export default route;
