# Future Times

[Game](https://future-times.netlify.app/)

## Concept

Modern times (1936)

### Scene

**Background**
The game will be about the first 20 minutes of the movie. At this time, Charlie works in a factory on an assembly line tightening bolts n a moving conveyer belt. He struggles to keep up with the speed. During that time, it also gets clear that he might be close to a mental breakdown based on how he moves while he isn't working. During this time, also a robot is presented, demonstrating how human productivity could be increased with machines or even replaced.

**Motivation**
This first 20 minutes set the stage for the entire movie, as it explains why he gets into the hospital, gets into prison, and is restlessly searching for a new job. I chose this chapter as it is almost 90 years old but seems very relevant in the current discussion around AI. Will jobs be replaced? Which jobs we'll be replaced, and how does society handle this.

**Game**
The game will visualize the factory with the assembly line. The player has to tighten bolts on parts moving on the conveyer belt. Therefore the user has to press a button at the perfect moment; the better the timing, the more points the player gets. The AI shows up if the player misses a specific number of pieces. This will use a third-party API like OpenAI to let the user interact with the AI. The user must prove to the AI that he/she is worth doing this job. If the player fails, another worker on the line will be replaced by a robot until one Charlie is left. If the question satisfies the AI, everyone keeps their jobs. The game doesn't aim to give an answer to these highly complex questions, but it might spark some fruitful conversations.


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
