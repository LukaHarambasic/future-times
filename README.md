# Future Times

[TBD Game](https://lukaharambasic.github.io/future-times/)

## Concept

Modern times (1936)

### Scene

**Background**
The game will be about the first 20 minutes of the movie. At this time, Charlie works in a factory on an assembly line tightening bolts n a moving conveyer belt. He struggles to keep up with the speed. During that time, it also gets clear that he might be close to a mental breakdown based on how he moves while he isn't working. During this time, also a robot is presented, demonstrating how human productivity could be increased with machines or even replaced.

**Motivation**
This first 20 minutes set the stage for the entire movie, as it explains why he gets into the hospital, gets into prison, and is restlessly searching for a new job. I chose this chapter as it is almost 90 years old but seems very relevant in the current discussion around AI. Will jobs be replaced? Which jobs we'll be replaced, and how does society handle this.

**Game**
The game will visualize the factory with the assembly line. The player has to tighten bolts on parts moving on the conveyer belt. Therefore the user has to press a button at the perfect moment; the better the timing, the more points the player gets. The AI shows up if the player misses a specific number of pieces. This will use a third-party API like OpenAI to let the user interact with the AI. The user must prove to the AI that he/she is worth doing this job. If the player fails, another worker on the line will be replaced by a robot until one Charlie is left. If the question satisfies the AI, everyone keeps their jobs. The game doesn't aim to give an answer to these highly complex questions, but it might spark some fruitful conversations.

## Mechanics

- No timer, it's just about surviving -> the highscore is a "word cloud" with everyone who survived, it get's bigger the more often you survived

## Tasks

- [ ] Generic
  - [ ] (3) Go over open TODO & OPTIONAL
  - [ ] (3) Remove console.log()
  - [x] Font
- [ ] Game
  - [x] (1) Winning mechanics
    - [x] (1) User has one try to convince the AI
    - [x] (1) Count compacted chests for highscore
  - [x] (1) Add belt
  - [x] (1) Add game over screen
  - [ ] (2) Background decoration
  - [ ] (3) Add atmospheric sounds
  - [x] (1) Align hammer with box compression
  - [x] (1) Add explanation until user follows them
  - [ ] Chat
    - [ ] (3) Fix bug about styling texts accordingly
    - [ ] (3) Add speech bubbels
    - [ ] (3) Gradient background?
    - [x] (1) Limit the AI responses
    - [x] Integrate API
  - [ ] Chat Input
    - [ ] (1) Add cursor like for name?
    - [ ] (1) Add border for input box
    - [ ] (2) Loading indicator until Chat is shown again
- [ ] Loading
  - [ ] (2) Slogan instead of lorem ipsum
  - [ ] (2) Check for testing left overs
  - [ ] (3) Loading animation
  - [x] Main game input touch/ press space (text shown until user presses it)
- [ ] Menu
  - [ ] ?? Animate something
- [ ] Highscore
  - [ ] (1) Visuals
  - [ ] (1) Scrollable
  - [ ] (3) Rename to highscore
  - [ ] (3) Back icon
- [ ] Credits
  - [ ] Visuals
  - [ ] (2) Explain movie adaption
  - [ ] (2) Add story about AI discussion
  - [ ] (3) Back icon
- [ ] Misc
  - [ ] ?? Analytics
  - [ ] ?? PWA
  - [ ] ?? "Mobile mode" for desktop - screen height (90%) : 1/2 ratio
  - [x] Global highscore on Supabase
- [x] Name
  - [x] Ask for player name in the beginning

## Checklist

TBD

## Development

```bash
npm install
```

### Default

Netlify function isn't running, you might would need to change to the production endpoint, buuuuut i always get CORS problems and I'm not able to fix it. So I recommend "With Netlify functions" as this spins up one server containing everything which eliminates this problem.

```bash
npm run dev
```

### With Netlify functions

```bash
netlify dev
```

https://docs.netlify.com/functions/create/?fn-language=js#test-locally-2
