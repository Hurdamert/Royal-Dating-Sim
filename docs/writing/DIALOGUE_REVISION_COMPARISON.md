# Dialogue revision dialogue-v2 — before / after

Requested: make the dialogue funnier and less AI generated (do extensive research on how to write it) (2026-10-25). Authority: Project owner request in the implementation chat, 2026-10-25

Each scene shows the frozen base text (archives + approved Tavri overlay) and the revised text. Choice IDs, outcomes and heart values are identical; only words changed. Roll back with `CONTENT_REVISION=none npm run content`.

## CORE-FAIL-01 — Shared failure ending

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** The twenty-eight-day courtship season ends. Whatever you learned, there is no royal wedding waiting at the end of this attempt.
- **NARRATOR:** The final day cannot be retrieved with a clever message, an extra training session, or a conveniently timed browser refresh.
- **PLAYER:** "I would like to appeal the deadline."
- **NARRATOR:** An official stamps your appeal *RECEIVED* and immediately stamps a second page *DENIED.*
- **NARRATOR:** It is a disappointing ending, but it does not erase the choices you made. Your journal remains available until you choose to restart or begin a new route.
- **NARRATOR:** **Ending: The Courtship Window Closes.**

</td><td>

- **NARRATOR:** The twenty-eight days are over. There will be no royal wedding this season.
- **NARRATOR:** No clever message, extra training session or well-timed browser refresh can bring the last day back.
- **PLAYER:** “I’d like to appeal the deadline.”
- **NARRATOR:** A clerk stamps your appeal *RECEIVED*, then stamps a second page *DENIED* without reading the first.
- **NARRATOR:** The clerk hands back your journal. Every choice you made is still in it, and it stays yours until you restart or begin a new route.
- **NARRATOR:** **Ending: The Courtship Window Closes.**

</td></tr></table>

## CORE-PRO-01 — Shared prologue

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Last night, you were a software engineer staring at another rejection email. The subject line began with *Unfortunately* and ended before your hope did.
- **PLAYER:** "I'm beginning to think the job market has been balanced by a particularly mean game designer."
- **NARRATOR:** Then the world folded like a poorly tested user interface, and you fell into a kingdom with more castles than entry-level openings.
- **NARRATOR:** A public notice welcomes travelers to the royal courtship season. You have twenty-eight days to form a genuine bond with the princess whose path you choose. The season's deadline will not wait for anyone's perfect speech.
- **PLAYER:** "I was hoping for a recruiter, but all right."
- **NARRATOR:** The royal notice offers practical advice: build your skills, watch the weekly schedule, and remember that the person you're trying to impress can say no.
- **PLAYER:** "Finally, an application process with clear requirements."
- **NARRATOR:** The first morning begins. Your chosen route awaits.

</td><td>

- **NARRATOR:** Last night, you were a software engineer reading rejection email number forty-one.
- **NARRATOR:** It began with *Unfortunately*. They always begin with *Unfortunately*.
- **PLAYER:** “I’m starting to think the job market was balanced by a game designer who hates me personally.”
- **NARRATOR:** Then the world folded like a badly tested dropdown, and you fell out of it into a kingdom with more castles than entry-level openings.
- **NARRATOR:** The first thing you see is a royal notice nailed to a wall: *THE COURTSHIP SEASON IS OPEN. TWENTY-EIGHT DAYS. ONE PRINCESS. GENUINE AFFECTION ONLY. NO EXTENSIONS.*
- **PLAYER:** “I was hoping for a recruiter, but sure.”
- **NARRATOR:** Underneath, in smaller letters: *Improve yourself. Learn her weekly schedule. Remember that the princess is allowed to say no.*
- **PLAYER:** “Finally. An application process with clear requirements.”
- **NARRATOR:** Day one begins. Somewhere in this kingdom, a princess is about to have a very unusual month.

</td></tr></table>

## KAE-EPI-01 — Marriage epilogue: Private Vow

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** The Palace Court has prepared a wedding ceremony with thirteen banners, nine trumpets that nobody will sound today, and a document confirming that both parties consent of their own free will.
- **KAEDRA [PLAYFUL]:** "The consent document is excellent. We should consider removing the trumpets from future events as well."
- **PLAYER:** "The court seems rather proud of them."
- **KAEDRA [NEUTRAL]:** "The court is welcome to marry the trumpets."
- **NARRATOR:** A few guests laugh. Others look surprised that the princess they've feared for years is quietly amused by her own ceremony.
- **HERALD:** "Do you, Princess Kaedra, choose this partnership of your own will?"
- **KAEDRA [NEUTRAL]:** "I do. I remain guardian of the people I serve, and I choose {PLAYER} as my partner—not my subject and not my keeper."
- **HERALD:** "And do you, {PLAYER}, choose Princess Kaedra of your own will?"
- **PLAYER:** "I do. Including the days when she comes home from saving the kingdom and wants five minutes of silence."
- **KAEDRA [PLAYFUL]:** "Ten minutes. I have negotiated the terms."
- **NARRATOR:** The court records your vows. Kaedra keeps her strength, her wings, her duties, and a little more freedom to show the tenderness she has always possessed.
- **NARRATOR:** Later, in the Royal Gardens, she sits close enough for your shoulders to touch. Nobody asks her to stand guard over anything for a moment.
- **KAEDRA [WORRIED]:** "There will still be frightening days. And days when I get things wrong."
- **PLAYER:** "We'll tell each other when we need help. And we'll still be ourselves."
- **KAEDRA [NEUTRAL]:** "That is precisely what I wanted."
- **NARRATOR:** She rests her forehead against yours, a gesture of affection with no audience, no grand magic, and no requirement to be brave about it.
- **KAEDRA [PLAYFUL]:** "For the record, you should know our children will not be permitted to study ceremonial speechwriting until they're old enough to refuse."
- **PLAYER:** "How many children is this hypothetical policy for?"
- **KAEDRA [SURPRISED]:** "I have no intention of approving a figure before the relevant committee has met."
- **NARRATOR:** You both laugh. For once, the silence afterward is neither fear nor duty. It is simply home.

</td><td>

- **NARRATOR:** The Palace Court has prepared a wedding with thirteen banners and nine trumpets that nobody will sound today.
- **NARRATOR:** There is also a document stating that both parties agree of their own free will. Kaedra has read all of it.
- **KAEDRA [PLAYFUL]:** “The document is excellent. I propose we apply the trumpet policy to all future events.”
- **PLAYER:** “They seem proud of the trumpets, though.”
- **KAEDRA [NEUTRAL]:** “The court is welcome to marry the trumpets.”
- **NARRATOR:** A few guests laugh. The rest stare. They have spent years edging toward pillars around this princess. Nobody warned them she was funny.
- **HERALD:** “Do you, Princess Kaedra, enter this partnership of your own free will?”
- **KAEDRA [NEUTRAL]:** “I do. I remain guardian of the people I serve, and I choose {PLAYER} as my partner.”
- **KAEDRA [NEUTRAL]:** “Neither my subject nor my keeper.”
- **HERALD:** “And do you, {PLAYER}, choose Princess Kaedra of your own free will?”
- **PLAYER:** “I do. Including the days she comes home from saving the kingdom and wants five minutes of silence.”
- **KAEDRA [PLAYFUL]:** “Ten minutes. I have negotiated the terms.”
- **NARRATOR:** The court records the vows. Nine trumpeters go home without playing a note.
- **NARRATOR:** Later, in the Royal Gardens, she sits close enough for your shoulders to touch. Nobody asks her to stand guard over anything.
- **KAEDRA [WORRIED]:** “There will still be frightening days. And days when I get things wrong.”
- **PLAYER:** “Then we tell each other when we need help.”
- **KAEDRA [NEUTRAL]:** “Agreed. No document required.”
- **NARRATOR:** She rests her forehead against yours. There is nobody here to see it.
- **KAEDRA [PLAYFUL]:** “For the record, our children will not study ceremonial speechwriting until they are old enough to refuse.”
- **PLAYER:** “How many children is this policy for?”
- **KAEDRA [SURPRISED]:** “I will not approve a figure before the relevant committee has met.”
- **PLAYER:** “Who’s on the committee?”
- **KAEDRA [PLAYFUL]:** “You and I. The minutes will be brief.”

</td></tr></table>

## KAE-EVT-POST-01 — Monster Reputation Rumor

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A young messenger whispers urgently to a nearby court attendant. Whatever has been seen, the account grows two extra horns by the time it reaches the third listener.
- **MESSENGER:** "A monster was seen near the royal paths. Great armored back, enormous claws, impossible stare. The princess was nearby!"
- **KAEDRA [NEUTRAL]:** "I have only the usual number of horns. Please keep that part accurate."
- **PLAYER:** "What did they actually see?"
- **NARRATOR:** A small, moss-backed garden creature emerges from behind a low step, carrying a fallen blossom on its head like a ceremonial crown. It has no weapon and appears mainly interested in a patch of shade.
- **KAEDRA [SURPRISED]:** "Oh. There you are."
- **MESSENGER:** "You know it?"
- **KAEDRA [NEUTRAL]:** "It lives near the gardens. It once stole a judge's lunch and left the plate very clean. The court considers this an act of political commentary."
- **PLAYER:** "Is it dangerous?"
- **KAEDRA [PLAYFUL]:** "Only to unattended sandwiches."
- **NARRATOR:** The creature steps toward a busy walkway. Kaedra calmly asks people to give it room and points out the shaded route back to its usual resting place. Nobody needs to draw a weapon.
- **MESSENGER:** "So there was no monster attack."
- **KAEDRA [NEUTRAL]:** "There was a rumor. People can be frightened by rumors. That part matters even when the story is foolish."
- **NARRATOR:** She watches the small creature amble off, then notices you have stayed beside her rather than joining the speculation.

**Option `KAE-POST-C1-COMPASSION` (correct):** PLAYER: "You protected the people who were scared and made room for a harmless creature. I wish they'd notice that instead of turning both of you into monsters."
  - **KAEDRA [SURPRISED]:** "That is more or less what I was trying to do."
  - **PLAYER:** "The sandwiches may disagree."
  - **KAEDRA [PLAYFUL]:** "Their concerns have been entered into the record."
  - **NARRATOR:** Kaedra smiles without glancing around to see who is watching.
  - **KAEDRA [NEUTRAL]:** "I cannot control every story about me. But I can choose how I act. It helps to have someone notice the difference."

**Option `KAE-POST-C1-DISMISS` (wrong):** PLAYER: "It's just a ridiculous rumor. Ignore everyone, and the whole thing will disappear."
  - **KAEDRA [NEUTRAL]:** "It may. The fear people felt does not become unreal because its cause was mistaken."
  - **PLAYER:** "I was trying to make it sound less serious."
  - **KAEDRA [WORRIED]:** "Sometimes I need you to take me seriously without making me a tragedy."
  - **NARRATOR:** She leaves the messenger to straighten the story while she returns to her duties.

**Option `KAE-POST-C1-CRUEL` (offensive):** PLAYER: "Why bother reassuring them? You're frightening, and so is the creature. Let the villagers be afraid."
  - **KAEDRA [ANNOYED]:** "Fear is not a service I provide."
  - **PLAYER:** "I didn't expect you to take offense."
  - **KAEDRA [NEUTRAL]:** "Then you have not been paying attention."
  - **NARRATOR:** She sees the little creature safely away and ends the conversation.

</td><td>

- **NARRATOR:** A young messenger is whispering urgently to an attendant. By the third listener, the story has grown two extra horns.
- **MESSENGER:** “A monster near the royal paths! Great armored back! Enormous claws! An impossible stare! And the princess was *nearby*!”
- **KAEDRA [NEUTRAL]:** “I have the usual number of horns. Please keep that part accurate.”
- **PLAYER:** “So what did people actually see?”
- **NARRATOR:** A small, moss-backed creature trundles out from behind a step. A fallen blossom sits on its head like a crown.
- **NARRATOR:** It is unarmed. It appears to be looking for shade.
- **KAEDRA [SURPRISED]:** “Oh. There you are.”
- **MESSENGER:** “You *know* it?”
- **KAEDRA [NEUTRAL]:** “It once stole a judge’s lunch and left the plate very clean.”
- **KAEDRA [NEUTRAL]:** “The court considers this political commentary.”
- **PLAYER:** “Does it bite?”
- **KAEDRA [PLAYFUL]:** “Only unattended sandwiches.”
- **NARRATOR:** The creature wanders toward a busy walkway. Kaedra asks people to give it room, then points it down the shaded route home. Nobody draws a weapon.
- **MESSENGER:** “So… there was no monster attack?”
- **KAEDRA [NEUTRAL]:** “There was a rumor. Several people believed it enough to run. One of them ran into a door.”
- **KAEDRA [NEUTRAL]:** “The story was foolish. The door was very real. I take that part seriously.”
- **NARRATOR:** Down the shaded path, the creature trundles out of sight. Kaedra notices you are still standing beside her.

**Option `KAE-POST-C1-COMPASSION` (correct):** PLAYER: “You calmed everyone down and got the little one home. Instead they made monsters out of you both.”
  - **KAEDRA [SURPRISED]:** “That is more or less what I was trying to do.”
  - **PLAYER:** “The sandwiches may disagree.”
  - **KAEDRA [PLAYFUL]:** “Their concerns have been entered into the record.”
  - **NARRATOR:** She smiles. The messenger sees it and starts revising the rumor on the spot.
  - **KAEDRA [NEUTRAL]:** “It helps that someone noticed.”
  - **NARRATOR:** Somewhere down the shaded path, a sandwich is left unattended for the last time.

**Option `KAE-POST-C1-DISMISS` (wrong):** PLAYER: “It’s a ridiculous rumor. Ignore it and it’ll blow over.”
  - **KAEDRA [NEUTRAL]:** “It may. The bruise from the door will take longer.”
  - **PLAYER:** “I was trying to make it sound less serious.”
  - **KAEDRA [WORRIED]:** “Please take me seriously. Just without turning me into a tragedy.”
  - **NARRATOR:** She goes to help the messenger straighten out the story. She does not ask you to come.

**Option `KAE-POST-C1-CRUEL` (offensive):** PLAYER: “Why reassure anyone? You’re frightening. So is that thing. Let them be scared.”
  - **KAEDRA [ANNOYED]:** “Fear is not a service I provide.”
  - **PLAYER:** “I didn’t think you’d take it personally.”
  - **KAEDRA [NEUTRAL]:** “Then you have not been paying attention.”
  - **NARRATOR:** She walks the creature the rest of the way into the shade and does not come back.

</td></tr></table>

## KAE-EVT-PRE-01 — Prince's Fashion Challenge

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A royal prince has arranged a traveling display of ceremonial cloaks. He is loudly explaining why an embroidered cape should be classified as an emergency public service.
- **PRINCE:** "The garment makes a statement. Ideally, the statement is *behold my significance*."
- **KAEDRA [NEUTRAL]:** "My own cape makes a statement too. It says *someone forgot to account for door handles*."
- **PLAYER:** "You sound experienced."
- **KAEDRA [PLAYFUL]:** "I once disabled an entire banquet by turning around too quickly. The curtains fell. Three ministers interpreted it as a declaration of war."
- **NARRATOR:** The prince freezes in admiration. A guard behind him inches toward a convenient pillar.
- **PRINCE:** "Princess Kaedra! A demonstration from our most formidable guest would lend tremendous prestige. Perhaps you could look terrifying while wearing the silver mantle?"
- **KAEDRA [ANNOYED]:** "Does the mantle require anyone to look terrified, or merely the audience?"
- **PRINCE:** "Whichever photographs better."
- **NARRATOR:** A few spectators wait for Kaedra to explode. She doesn't. One wing settles against her back; the tense silence is otherwise broken only by a tailor dropping a pin.
- **KAEDRA [NEUTRAL]:** "I was invited to assess whether the formal fasteners are safe. They are not. The weight is pulling on the collar."
- **PLAYER:** "And the prince wants you to model it?"
- **KAEDRA [PLAYFUL]:** "He believes my face could frighten the stitching into cooperation."
- **NARRATOR:** Kaedra glances toward you, her expression composed. She has made it clear she would rather be heard than displayed.

**Option `KAE-PRE-C1-RESPECT` (correct):** PLAYER: "You were asked for your judgment, not to serve as a scary decoration. Want me to help make sure they hear the safety issue?"
  - **KAEDRA [SURPRISED]:** "You heard the part about the collar."
  - **PLAYER:** "I also heard the part about the curtains. That's a separate safety issue."
  - **KAEDRA [PLAYFUL]:** "Correct. We should not confuse the two departments."
  - **NARRATOR:** Kaedra explains the flawed clasp without raising her voice. The tailor fixes it; the prince announces the resulting adjustment as the latest court trend.
  - **KAEDRA [NEUTRAL]:** "Thank you. I can speak for myself. It helped that you gave me room to do it."

**Option `KAE-PRE-C1-JOKE` (wrong):** PLAYER: "You should wear the cape and show them your legendary terrifying pose. At least it would be funny."
  - **KAEDRA [NEUTRAL]:** "It might be funny for you."
  - **PLAYER:** "I thought you liked jokes."
  - **KAEDRA [WORRIED]:** "I do. I prefer knowing I am in on them."
  - **NARRATOR:** She quietly takes the loose clasp to the tailor herself. The display proceeds, but she offers you no further performance.

**Option `KAE-PRE-C1-FEAR` (offensive):** PLAYER: "They should be afraid of you. Threaten the prince until he does what you say. That's what you're good at."
  - **KAEDRA [ANNOYED]:** "No. I am good at making sure nobody has to be afraid."
  - **PLAYER:** "That wasn't what I meant."
  - **KAEDRA [NEUTRAL]:** "It was what you asked me to do. Please remember the difference."
  - **NARRATOR:** She turns back to the tailor and ends the conversation without another word.

</td><td>

- **NARRATOR:** A prince has brought a traveling display of ceremonial cloaks. He is explaining, loudly, why a cape counts as an emergency public service.
- **PRINCE:** “Every garment makes a statement. Mine says *behold my significance*.”
- **KAEDRA [NEUTRAL]:** “Mine says *someone forgot to account for door handles*.”
- **PLAYER:** “That sounds like experience talking.”
- **KAEDRA [PLAYFUL]:** “I once turned around too quickly at a banquet. The curtains came down.”
- **KAEDRA [NEUTRAL]:** “Three ministers took it as a declaration of war. One of them surrendered.”
- **NARRATOR:** The prince looks thrilled. Behind him, a guard begins inching toward a pillar.
- **PRINCE:** “Princess Kaedra! Our most formidable guest! Will you model the silver mantle? And look *terrifying* in it?”
- **KAEDRA [ANNOYED]:** “Is that a requirement of the mantle, or of me?”
- **PRINCE:** “Whichever photographs better.”
- **NARRATOR:** Several spectators wait for her to explode. She does not. A tailor drops a pin, and three of them flinch.
- **KAEDRA [NEUTRAL]:** “I was invited to assess whether the fasteners are safe. They are not.”
- **KAEDRA [NEUTRAL]:** “The mantle weighs about as much as a small door. All of it hangs from the collar.”
- **PLAYER:** “And he wants you to model it anyway?”
- **KAEDRA [PLAYFUL]:** “He believes my face could frighten the stitching into cooperation.”
- **NARRATOR:** She glances at you. The prince is already miming where the dramatic lighting would go.

**Option `KAE-PRE-C1-RESPECT` (correct):** PLAYER: “You’re here to inspect it, not haunt it. Want help making sure they hear about the collar?”
  - **KAEDRA [SURPRISED]:** “You heard the part about the collar.”
  - **PLAYER:** “And the curtains. But that’s a separate safety issue.”
  - **KAEDRA [PLAYFUL]:** “Correct. We must not confuse the two departments.”
  - **NARRATOR:** Kaedra explains the clasp in four calm sentences. The tailor has it fixed before the prince finishes posing.
  - **PRINCE:** “Reinforced collars! The latest thing at court! I have always said so!”
  - **KAEDRA [NEUTRAL]:** “I could have done that alone.”
  - **KAEDRA [PLAYFUL]:** “It was easier with someone holding the door.”

**Option `KAE-PRE-C1-JOKE` (wrong):** PLAYER: “Oh, wear it. Do your legendary terrifying pose. It’d be hilarious.”
  - **KAEDRA [NEUTRAL]:** “Hilarious for you.”
  - **PLAYER:** “I thought you liked jokes.”
  - **KAEDRA [WORRIED]:** “I do. I like to be in on them.”
  - **NARRATOR:** She takes the loose clasp to the tailor herself. The prince photographs the mantle on its stand, looking formidable without her.

**Option `KAE-PRE-C1-FEAR` (offensive):** PLAYER: “Just threaten him. Scaring people is what you’re good at.”
  - **KAEDRA [ANNOYED]:** “No. I am good at making sure nobody has to be scared.”
  - **PLAYER:** “That’s not what I meant.”
  - **KAEDRA [NEUTRAL]:** “It is what you said.”
  - **NARRATOR:** She turns back to the tailor. By the pillar, the guard stays exactly where he is.

</td></tr></table>

## KAE-FIN-01 — Private Vow (first full marriage proposal)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** The conversation should be ending. Kaedra stays anyway. She looks at you with the same level gaze that has silenced entire rooms, but there is no court to impress here.
- **KAEDRA [PLAYFUL]:** "You are remarkably difficult to intimidate for someone who once described this kingdom's employment prospects as 'a hostile deployment environment.'"
- **PLAYER:** "The description remains accurate."
- **KAEDRA [NEUTRAL]:** "And yet you kept returning."
- **NARRATOR:** A comfortable silence follows. Her wings remain folded, her tail resting still, and for once neither of you needs to fill the quiet with a performance.
- **KAEDRA [WORRIED]:** "There is something I want to say before you assemble a ceremonial argument for why I'm supposed to be impressive."
- **PLAYER:** "I had three pages prepared."
- **KAEDRA [PLAYFUL]:** "Then we may still have time to prevent a disaster."
- **KAEDRA [NEUTRAL]:** "I enjoy protecting people. That is not a burden I secretly want someone to lift from me. But sometimes I come home tired. Sometimes I am unsure. I want to be able to say so without a room going silent."
- **PLAYER:** "You should be able to."
- **KAEDRA [WORRIED]:** "I have been called a weapon, a guardian, and a legend. I would rather be someone's equal. A person they can disagree with, laugh with, and trust to make her own decisions."
- **NARRATOR:** Kaedra reaches toward you, then stops a little short. She is not afraid of rejection because she is weak. She is afraid because this answer matters to her.
- **KAEDRA [NEUTRAL]:** "I care for you. More than I expected. I do not need you to be fearless around me. I only need you to see me clearly."
- **PLAYER:** "Kaedra..."
- **KAEDRA [PLAYFUL]:** "If this is a proposal, please do not begin with a list of my strengths. I know most of them already."
- **NARRATOR:** The three carefully rehearsed pages suddenly seem less useful than one honest sentence.

**Option `KAE-FIN-C1-EQUAL` (correct):** PLAYER: "I love your strength, and I love the gentleness you choose when nobody is watching. You don't have to protect me from every uncertainty, and I won't try to take your decisions away. I want to share an ordinary life with you as well as the extraordinary parts. Kaedra, will you marry me—as my equal?"
  - **KAEDRA [SURPRISED]:** "An ordinary life?"
  - **PLAYER:** "Well, ordinary by this kingdom's standards. We may have to live with a few royal speeches."
  - **KAEDRA [PLAYFUL]:** "I can endure them if I am allowed to object to the page count."
  - **NARRATOR:** Her expression softens. She takes your hand, careful not to treat it as something delicate or something to hold captive.
  - **KAEDRA [NEUTRAL]:** "Yes, {PLAYER}. Not because you need a guardian, and not because I need someone to command my life. Because I choose you, and you have chosen me."
  - **PLAYER:** "I think I can live with that."
  - **KAEDRA [PLAYFUL]:** "Good. Your proposal passed inspection. Barely."

**Option `KAE-FIN-C1-IDOL` (wrong):** PLAYER: "You're the greatest guardian who ever lived. I'd worship you every day. Marry me and I'll never question anything you decide."
  - **KAEDRA [WORRIED]:** "I don't want devotion that makes you disappear."
  - **PLAYER:** "I thought you would appreciate being admired."
  - **KAEDRA [NEUTRAL]:** "Being admired is not the same as being known. I want someone who can tell me when I'm wrong."
  - **NARRATOR:** She gently lets go of your hand. The conversation ends, but not all hope does.

**Option `KAE-FIN-C1-CARETAKER` (wrong):** PLAYER: "I can take over your responsibilities and keep you safe from making another mistake. Marry me and you won't have to be strong anymore."
  - **KAEDRA [ANNOYED]:** "You have misunderstood me. I like being strong."
  - **PLAYER:** "I wanted to make things easier."
  - **KAEDRA [WORRIED]:** "I want room to rest, not someone who takes away my life and calls it kindness."
  - **NARRATOR:** Kaedra steps back. She is not angry at the existence of your feelings, only at the bargain you tried to make with hers.

</td><td>

- **NARRATOR:** The conversation should be ending. Kaedra stays.
- **KAEDRA [PLAYFUL]:** “You are remarkably difficult to intimidate, for someone who once called this kingdom’s job market a hostile deployment environment.”
- **PLAYER:** “Still accurate.”
- **KAEDRA [NEUTRAL]:** “And yet you kept returning.”
- **NARRATOR:** Her wings stay folded. Even her tail has gone still.
- **KAEDRA [WORRIED]:** “I want to say something before you assemble a ceremonial argument for why I am impressive.”
- **PLAYER:** “Too late. I have three pages.”
- **KAEDRA [PLAYFUL]:** “Then there is still time to prevent a disaster.”
- **KAEDRA [NEUTRAL]:** “I like protecting people. I am not hoping someone will take it off my hands.”
- **KAEDRA [NEUTRAL]:** “But some days I come home tired. Some days I am unsure.”
- **KAEDRA [WORRIED]:** “I would like to say so without the room going silent.”
- **PLAYER:** “Say it to me. I won’t go quiet.”
- **KAEDRA [WORRIED]:** “I have been called a weapon. And a guardian. And, in one very long speech, a legend.”
- **KAEDRA [NEUTRAL]:** “Given the choice, I would be someone’s equal. Someone you can argue with, and laugh with, and still trust to decide.”
- **NARRATOR:** She reaches toward you and stops a hand’s width short. The answer matters too much to assume it.
- **KAEDRA [NEUTRAL]:** “I care for you. More than I’d planned to.”
- **KAEDRA [NEUTRAL]:** “You do not need to be fearless around me. I need you to see me clearly.”
- **PLAYER:** “Kaedra…”
- **KAEDRA [PLAYFUL]:** “If this is a proposal, please do not begin with a list of my strengths. I have heard it. Usually with trumpets.”
- **NARRATOR:** You leave the three pages in your pocket. One honest answer will have to do.

**Option `KAE-FIN-C1-EQUAL` (correct):** PLAYER: “No list. I love you strong, tired, and gentle when no one’s looking. Your choices stay yours. Marry me, and share an ordinary life as equals?”
  - **KAEDRA [SURPRISED]:** “An ordinary life?”
  - **PLAYER:** “Ordinary by this kingdom’s standards. There’ll still be royal speeches.”
  - **KAEDRA [PLAYFUL]:** “Acceptable. If I may object to the page count.”
  - **NARRATOR:** She takes your hand. Her grip is firm, and loose enough to let go.
  - **KAEDRA [NEUTRAL]:** “Yes, {PLAYER}.”
  - **KAEDRA [NEUTRAL]:** “You do not need a guardian. I do not need a commander. I choose you anyway.”
  - **PLAYER:** “I can live with that.”
  - **KAEDRA [PLAYFUL]:** “Good. Your proposal passed inspection.”
  - **KAEDRA [NEUTRAL]:** “Barely.”

**Option `KAE-FIN-C1-IDOL` (wrong):** PLAYER: “You’re the greatest guardian who ever lived. I’d worship you every day. Marry me, and I’ll never question a thing you decide.”
  - **KAEDRA [WORRIED]:** “Never?”
  - **PLAYER:** “Never.”
  - **KAEDRA [NEUTRAL]:** “Then who will tell me when I am wrong?”
  - **KAEDRA [NEUTRAL]:** “I have been admired since I was nine. Nobody doing it ever knew me.”
  - **NARRATOR:** She lowers the hand she had reached out with and says goodbye. It sounds provisional.

**Option `KAE-FIN-C1-CARETAKER` (wrong):** PLAYER: “I’ll take over your duties and make sure you never make another mistake. Marry me, and you won’t have to be strong anymore.”
  - **KAEDRA [ANNOYED]:** “You have misunderstood me. I like being strong.”
  - **PLAYER:** “I wanted to make things easier.”
  - **KAEDRA [WORRIED]:** “I asked for somewhere to rest. You are offering to take over my life.”
  - **NARRATOR:** Kaedra steps back and studies the offer like a badly fastened clasp. Then she declines it.

</td></tr></table>

## KAE-FIN-RETRY-01 — Private Vow follow-up (marriage retry)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Kaedra greets you without a formal bow. There is relief in the familiarity, but also a question neither of you has answered yet.
- **KAEDRA [NEUTRAL]:** "I have thought about your proposal. The answer matters enough that I won't pretend we understood each other."
- **PLAYER:** "I've been thinking about it too."
- **KAEDRA [WORRIED]:** "I don't want to be a legend you kneel to. And I don't want a guardian appointed to protect me from myself. Can you see a life with the actual person standing here?"
- **NARRATOR:** She waits steadily. The silence is not a threat; it is room for you to choose your words.

**Option `KAE-FR-C1-PARTNER` (correct):** PLAYER: "Yes. I was wrong to make you into a symbol or someone I needed to manage. I love you as you are: capable, sometimes tired, kind, and free to make your own choices. Will you marry me, and let us build a life where we can both speak honestly?"
  - **KAEDRA [SURPRISED]:** "You have learned to make a short speech."
  - **PLAYER:** "I can make it longer if necessary."
  - **KAEDRA [PLAYFUL]:** "Please don't."
  - **NARRATOR:** She clasps your hand, smiling without the guarded formality of court.
  - **KAEDRA [NEUTRAL]:** "Yes, {PLAYER}. I choose you. As an equal, and as myself."

**Option `KAE-FR-C1-REPEAT` (wrong):** PLAYER: "I can promise never to disagree with you, or I could make every decision for you. Which would you prefer?"
  - **KAEDRA [ANNOYED]:** "Neither."
  - **PLAYER:** "I suppose I still don't understand."
  - **KAEDRA [WORRIED]:** "Then I would rather wait than ask either of us to live in that misunderstanding."
  - **NARRATOR:** She ends the conversation gently. The unanswered proposal remains unanswered.

</td><td>

- **NARRATOR:** Kaedra greets you without a bow. It is friendlier than a bow. It is also a question.
- **KAEDRA [NEUTRAL]:** “I have thought about your proposal. It matters too much to pretend we understood each other.”
- **PLAYER:** “So have I.”
- **KAEDRA [WORRIED]:** “I do not want to be a legend you kneel to. Or to have a guardian appointed to protect me from myself.”
- **KAEDRA [WORRIED]:** “Can you see a life with the actual person standing here?”

**Option `KAE-FR-C1-PARTNER` (correct):** PLAYER: “Yes. I made you a symbol, then a project. Wrong both times. I love the real you: capable, kind, sometimes tired, your own boss. Marry me?”
  - **KAEDRA [SURPRISED]:** “You have learned to make a short speech.”
  - **PLAYER:** “I can make it longer.”
  - **KAEDRA [PLAYFUL]:** “Please do not.”
  - **NARRATOR:** She takes your hand. Her smile has none of the court in it.
  - **KAEDRA [NEUTRAL]:** “Yes, {PLAYER}. I choose you. As your equal, and as myself.”

**Option `KAE-FR-C1-REPEAT` (wrong):** PLAYER: “I can promise never to disagree with you. Or I can make all the decisions. Which would you prefer?”
  - **KAEDRA [ANNOYED]:** “Neither.”
  - **PLAYER:** “I guess I still don’t get it.”
  - **KAEDRA [WORRIED]:** “Then I would rather wait than marry a misunderstanding.”
  - **NARRATOR:** She says goodbye kindly. The proposal stays where it is, unanswered.

</td></tr></table>

## KAE-MID-01 — The Royal Trial (first full midpoint attempt)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** The Palace Court has arranged a formal ceremony called the Royal Trial. Its stated purpose is to recognize the kingdom's guardians. Its unofficial purpose appears to be finding out how much bronze can fit on a podium.
- **KAEDRA [NEUTRAL]:** "This is the sixth speech praising my ability to stand still. I fear my greatest talent has been misidentified."
- **PLAYER:** "Do they know you have others?"
- **KAEDRA [PLAYFUL]:** "One day, I may demonstrate sitting."
- **NARRATOR:** A herald invites Kaedra to lift a ceremonial warding sigil above the platform. Its light is meant to be symbolic, a brief ceremonial flourish.
- **HERALD:** "A gentle flame, Your Highness. Just enough for the audience to admire the court's protection."
- **KAEDRA [NEUTRAL]:** "Understood. Keep the aisle clear."
- **NARRATOR:** Kaedra raises one hand. A narrow band of amber light traces the sigil—then an unexpected spark snaps sideways and pops against the empty edge of the stone platform.
- **NARRATOR:** Nobody is struck. A nearby attendant flinches, and several people crowd toward the same exit, tripping over one another in their hurry. The spark dies before it can reach the banners.
- **HERALD:** "Remain calm! Please move away from the platform in an orderly—oh dear, that's my shoe."
- **KAEDRA [SURPRISED]:** "That was not the pattern I intended."
- **NARRATOR:** Kaedra lowers her hand at once and extinguishes the sigil. Her wings stay folded. You can see that her immediate attention is on the crowded aisle, not her own embarrassment.
- **PLAYER:** "The spark is out. People are bunching up by the doorway."
- **KAEDRA [WORRIED]:** "Yes. They saw it. They saw me lose control for a moment."
- **NARRATOR:** The situation is small but real: frightened people need a clear exit, and Kaedra needs the dignity of being treated as a responsible person rather than a spectacle.

**Option `KAE-MID-C1-SAFETY` (correct):** PLAYER: "Let's give everyone room and ask the attendants to clear the aisle. Your magic is already stopped. Once they're safe, can we talk somewhere quiet?"
  - **KAEDRA [SURPRISED]:** "Yes. Tell the herald the side aisle is clear. I'll check the platform."
  - **NARRATOR:** You help direct the crowd away from the platform while the attendants open an unobstructed route. Kaedra verifies the sigil is extinguished and that nobody is hurt. The remaining onlookers settle.
  - **HERALD:** "The ceremony has concluded. Perhaps we will resume the speeches after an interval of several years."
  - **NARRATOR:** Later, beneath an arch **within Palace Court**, Kaedra stands with her arms folded, not to threaten anyone but to steady herself.
  - **KAEDRA [WORRIED]:** "When the spark went sideways, I knew how to stop it. I also knew what everyone would think. That I had finally become the danger they expected."
  - **PLAYER:** "The spark was unexpected. You stopped it, checked on people, and took responsibility. You can be shaken by that without it defining you."
  - **KAEDRA [NEUTRAL]:** "They ask me to be a shield. A shield, apparently, is never permitted to be frightened."
  - **PLAYER:** "A person can protect other people and still need somewhere safe to speak honestly."
  - **KAEDRA [WORRIED]:** "I was afraid you'd admire the spectacle. Or come here to tell me I need protecting from myself."
  - **PLAYER:** "I came because I care what you're feeling. You decide what happens next."
  - **NARRATOR:** The muscles around her jaw loosen. She exhales, long and slow, no longer measuring every breath against a watching court.
  - **KAEDRA [PLAYFUL]:** "That is an alarmingly sensible answer. I may be forced to invite you to future ceremonies as a precaution."
  - **PLAYER:** "Does it come with fewer speeches?"
  - **KAEDRA [NEUTRAL]:** "No promises I cannot keep. But I could ask you to stay a little longer."

**Option `KAE-MID-C1-ADMIRE` (wrong):** PLAYER: "That flare was incredible. Forget the crowd—show them an even bigger one and they'll respect you."
  - **KAEDRA [ANNOYED]:** "No. A frightened crowd is not an audience I need to impress."
  - **NARRATOR:** She asks the attendants to keep people clear and checks the platform herself. When she returns, her voice is cool.
  - **KAEDRA [NEUTRAL]:** "Please don't mistake the power to frighten people for the wish to do it."
  - **PLAYER:** "I was trying to support you."
  - **KAEDRA [WORRIED]:** "Then perhaps next time we could begin by listening."

**Option `KAE-MID-C1-MANAGE` (wrong):** PLAYER: "You should stand down and let me decide when it's safe for you to use magic again."
  - **KAEDRA [ANNOYED]:** "You do not become responsible for me by declaring yourself in charge."
  - **NARRATOR:** Kaedra turns to the trained court attendants, ensuring the exit is clear and the sigil remains extinguished.
  - **KAEDRA [NEUTRAL]:** "I can account for what happened. You can help people without taking away my decisions."
  - **PLAYER:** "You're right. I spoke for you."
  - **KAEDRA [WORRIED]:** "Then please think about why."

</td><td>

- **NARRATOR:** The Palace Court is holding the Royal Trial, a ceremony to honor the kingdom’s guardians.
- **NARRATOR:** Unofficially, it is testing how much bronze will fit on one podium.
- **KAEDRA [NEUTRAL]:** “Sixth speech. Thirty-one pages. All of them praising my ability to stand still.”
- **PLAYER:** “Do they know you have other talents?”
- **KAEDRA [PLAYFUL]:** “One day I may demonstrate sitting.”
- **NARRATOR:** A herald invites her to light a ceremonial warding sigil above the platform. It is meant to glow for a moment, symbolically.
- **HERALD:** “A gentle flame, Your Highness! Just enough for the court to admire its protection!”
- **KAEDRA [NEUTRAL]:** “Understood. Keep the aisle clear.”
- **NARRATOR:** She raises one hand. A thin band of amber light traces the sigil.
- **NARRATOR:** Then a spark snaps sideways and pops against the empty edge of the platform.
- **NARRATOR:** Nobody is struck. An attendant flinches. Half the front row tries to leave through the same door and trips over the other half.
- **NARRATOR:** The spark fizzles out well short of the banners.
- **HERALD:** “Remain calm! Move away from the platform in an orderly—my shoe! Has anyone seen my shoe?”
- **KAEDRA [SURPRISED]:** “That was not the pattern I intended.”
- **NARRATOR:** She closes her hand, and the sigil goes dark at once. Her wings stay folded. Her eyes are already on the crowded aisle.
- **PLAYER:** “The spark’s out. People are bunching up at the doorway.”
- **KAEDRA [WORRIED]:** “Yes. They saw it. They saw me lose control.”

**Option `KAE-MID-C1-SAFETY` (correct):** PLAYER: “Your magic’s stopped. Let’s give people room and have the attendants clear the aisle. Then talk somewhere quiet?”
  - **KAEDRA [SURPRISED]:** “Yes. Tell the herald the side aisle is clear. I will check the platform.”
  - **NARRATOR:** You steer people toward the side aisle while the attendants open the way. Kaedra checks the platform edge, then every face in the front row.
  - **NARRATOR:** Nobody is hurt. The room settles. Someone hands the herald back his shoe.
  - **HERALD:** “The ceremony has concluded! The speeches will resume after an interval of several years.”
  - **NARRATOR:** Later, under an arch within the Palace Court, Kaedra stands with her arms folded hard, holding herself steady.
  - **KAEDRA [WORRIED]:** “When it went sideways, I knew how to stop it.”
  - **KAEDRA [WORRIED]:** “I also knew what they would think. That I had finally become the danger they were waiting for.”
  - **PLAYER:** “You stopped it in a second, then counted the front row. I watched.”
  - **KAEDRA [NEUTRAL]:** “They ask me to be a shield. Nobody has written the regulations for a shield that gets frightened.”
  - **KAEDRA [WORRIED]:** “I thought you might come here to admire the spectacle.”
  - **KAEDRA [WORRIED]:** “Or to tell me I need protecting from myself.”
  - **PLAYER:** “I came for you, not the spectacle. What happens next is yours.”
  - **NARRATOR:** The line of her jaw loosens. She lets out a long, slow breath.
  - **KAEDRA [PLAYFUL]:** “That is an unreasonably sensible answer. I may have to invite you to future ceremonies. As a precaution.”
  - **PLAYER:** “Do they come with fewer speeches?”
  - **KAEDRA [NEUTRAL]:** “I do not make promises I cannot keep.”
  - **KAEDRA [NEUTRAL]:** “But stay a little longer?”

**Option `KAE-MID-C1-ADMIRE` (wrong):** PLAYER: “That was incredible! Forget the crowd. Do a bigger one and they’ll never forget it.”
  - **KAEDRA [ANNOYED]:** “No.”
  - **NARRATOR:** She turns away to direct the attendants and checks the platform herself. When she comes back, her voice is cool.
  - **KAEDRA [NEUTRAL]:** “A frightened crowd is not an audience I need to impress.”
  - **PLAYER:** “I was trying to be supportive.”
  - **KAEDRA [WORRIED]:** “I know. You meant the bigger one as a compliment.”

**Option `KAE-MID-C1-MANAGE` (wrong):** PLAYER: “Stand down. I’ll decide when it’s safe for you to use magic again.”
  - **KAEDRA [ANNOYED]:** “You are not in charge of me. Help them.”
  - **NARRATOR:** She turns to the attendants. The aisle is clear in under a minute, and the sigil stays dark.
  - **KAEDRA [NEUTRAL]:** “I can account for what happened. You could have helped the people at the door.”
  - **PLAYER:** “You’re right. I spoke over you.”
  - **KAEDRA [WORRIED]:** “You did. I would like you to think about why.”

</td></tr></table>

## KAE-MID-RETRY-01 — The Royal Trial follow-up (midpoint retry)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Kaedra recognizes you before you speak. She gives a small nod, then waits. Whatever she wants to hear, she is not going to write it for you.
- **KAEDRA [NEUTRAL]:** "The court repaired the sigil. The herald has proposed banning speeches over forty pages. Progress comes in strange forms."
- **PLAYER:** "I've been thinking about the trial."
- **KAEDRA [WORRIED]:** "So have I. I needed help making space for people to leave—and someone who could see I was frightened without deciding what that made me."
- **NARRATOR:** She doesn't look away. This time she is giving you the chance to answer plainly.

**Option `KAE-MR-C1-RECOGNIZE` (correct):** PLAYER: "I missed what mattered. You made the magic safe and cared for everyone, and I should have helped make room for them. I'm sorry I treated your feelings or choices as less important. If you'll let me, I'd like to listen now."
  - **KAEDRA [SURPRISED]:** "You came back to say that without an audience."
  - **PLAYER:** "I thought you'd prefer fewer witnesses."
  - **KAEDRA [PLAYFUL]:** "An excellent first observation. Keep making them."
  - **NARRATOR:** She reaches out and rests her hand lightly against yours. There is strength in the gesture, and deliberate gentleness.
  - **KAEDRA [NEUTRAL]:** "I would like to speak with you again. Not as the court's guardian. As myself."

**Option `KAE-MR-C1-EXCUSE` (wrong):** PLAYER: "Everyone overreacted. You shouldn't have felt bad. Can we forget the whole thing?"
  - **KAEDRA [NEUTRAL]:** "I don't need permission to be upset."
  - **PLAYER:** "I thought I was helping."
  - **KAEDRA [WORRIED]:** "Helping might begin with allowing me to tell you what hurt."
  - **NARRATOR:** The conversation ends respectfully, but she is not ready to call the matter settled.

</td><td>

- **NARRATOR:** Kaedra sees you before you speak. She nods once, then waits. She is not going to write your answer for you.
- **KAEDRA [NEUTRAL]:** “The court has repaired the sigil.”
- **KAEDRA [PLAYFUL]:** “Also, the herald has proposed banning speeches over forty pages. The debate is expected to take several speeches.”
- **PLAYER:** “I’ve been thinking about the trial.”
- **KAEDRA [WORRIED]:** “So have I. I needed help making space for people to leave.”
- **KAEDRA [WORRIED]:** “And someone who could see I was frightened, without deciding what that made me.”

**Option `KAE-MR-C1-RECOGNIZE` (correct):** PLAYER: “I missed it. You kept everyone safe, and I should have helped clear the room. I’m sorry I put your choices second. I’m listening now.”
  - **KAEDRA [SURPRISED]:** “You came back to say that without an audience.”
  - **PLAYER:** “I figured you’d want fewer witnesses.”
  - **KAEDRA [PLAYFUL]:** “A correct observation. Keep making them.”
  - **NARRATOR:** She rests her hand against yours. It is a strong hand, and she is being careful with it on purpose.
  - **KAEDRA [NEUTRAL]:** “I would like to talk again. As myself. The guardian can wait outside.”

**Option `KAE-MR-C1-EXCUSE` (wrong):** PLAYER: “Everyone overreacted. It was one spark. Can we just forget it?”
  - **KAEDRA [NEUTRAL]:** “One spark. Yes. I was the one holding it.”
  - **PLAYER:** “I was trying to help.”
  - **KAEDRA [WORRIED]:** “Then let me tell you what hurt, before you decide that nothing did.”
  - **NARRATOR:** She says goodbye politely. Whatever she came to hear, she is still waiting for it.

</td></tr></table>

## KAE-ORD-POST-F01 — Quiet Company

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Kaedra remains nearby without demanding conversation.
- **KAEDRA [NEUTRAL]:** “I have discovered that a silence can be companionable instead of threatening.”
- **PLAYER:** “Shall we keep it?”
- **KAEDRA [NEUTRAL]:** “If you would like.”

**Option `KAE-ORD-POST-F01-C1-YES` (correct):** PLAYER: “Yes. I like sharing the quiet with you.”
  - **KAEDRA [NEUTRAL]:** “So do I, {PLAYER}.”

**Option `KAE-ORD-POST-F01-C1-NO` (wrong):** PLAYER: “Someone ought to say something impressive.”
  - **KAEDRA [WORRIED]:** “I was enjoying not needing to be impressive.”

</td><td>

- **NARRATOR:** Kaedra has been standing beside you without speaking for some time. A passing guard takes the long way around.
- **KAEDRA [NEUTRAL]:** “People assume I am angry when I am silent.”
- **PLAYER:** “Are you?”
- **KAEDRA [NEUTRAL]:** “No. I am deciding whether a joke will land.”
- **PLAYER:** “And?”
- **KAEDRA [NEUTRAL]:** “Undecided. This is a good silence. The joke would have to be better.”

**Option `KAE-ORD-POST-F01-C1-YES` (correct):** PLAYER: “Take your time. I’ll rate it when it lands.”
  - **KAEDRA [NEUTRAL]:** “Out of ten. Agreed.”
  - **NARRATOR:** The silence goes on. A while later, out of nowhere, she snorts at her own joke. She does not explain it.

**Option `KAE-ORD-POST-F01-C1-NO` (wrong):** PLAYER: “Go on, tell it. I could use a laugh.”
  - **KAEDRA [NEUTRAL]:** “Very well. A herald walks into a library. He is still talking.”
  - **KAEDRA [WORRIED]:** “It worked better as a silence.”

</td></tr></table>

## KAE-ORD-POST-F02 — The Long Ladder (was: The Crooked Banner)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A decorative banner hangs crookedly above the open path.
- **KAEDRA [NEUTRAL]:** “I could reach that and straighten it. I could also let the custodians handle it.”
- **PLAYER:** “Which would you prefer?”
- **KAEDRA [NEUTRAL]:** “Today? Perhaps to let someone else have the satisfaction.”

**Option `KAE-ORD-POST-F02-C1-YES` (correct):** PLAYER: “Sounds like a decision you are entitled to make.”
  - **KAEDRA [NEUTRAL]:** “Thank you. I enjoy these surprisingly small freedoms.”

**Option `KAE-ORD-POST-F02-C1-NO` (wrong):** PLAYER: “You are stronger. You should always do the work.”
  - **KAEDRA [WORRIED]:** “Strength does not establish an obligation to do everything.”

</td><td>

- **NARRATOR:** A banner hangs crooked overhead. Kaedra could straighten it without standing on her toes.
- **NARRATOR:** Some way off, a custodian is approaching with a ladder. Slowly. It is a very long ladder.
- **KAEDRA [NEUTRAL]:** “I could fix it. He has been carrying that ladder since before we arrived.”
- **PLAYER:** “So what’s the plan?”
- **KAEDRA [NEUTRAL]:** “Stand here. Very still. Looking at something else.”

**Option `KAE-ORD-POST-F02-C1-YES` (correct):** PLAYER: “I’ll look at something else with you.”
  - **KAEDRA [PLAYFUL]:** “Thank you. I recommend that wall. It has been very well built.”
  - **NARRATOR:** The custodian climbs up and straightens the banner. He climbs down looking like a man who has won something.

**Option `KAE-ORD-POST-F02-C1-NO` (wrong):** PLAYER: “You’re right there, though. Two seconds and it’s done.”
  - **NARRATOR:** She reaches up. The banner is straight in two seconds.
  - **NARRATOR:** The custodian arrives. He looks up at the banner, then lowers his ladder very slowly.
  - **KAEDRA [WORRIED]:** “He was so close.”

</td></tr></table>

## KAE-ORD-POST-F03 — Structural Merit (was: The Courtesy of Disagreement)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Kaedra pauses after hearing a minor difference of opinion.
- **KAEDRA [NEUTRAL]:** “We disagree about something inconsequential. Shall I alert the heralds?”
- **PLAYER:** “Only if they have nothing better to announce.”
- **KAEDRA [NEUTRAL]:** “I have never seen a royal bulletin titled “Two People Remain Fond of Each Other.””

**Option `KAE-ORD-POST-F03-C1-YES` (correct):** PLAYER: “We can disagree and still listen to one another.”
  - **KAEDRA [NEUTRAL]:** “An excellent title for the bulletin, actually.”

**Option `KAE-ORD-POST-F03-C1-NO` (wrong):** PLAYER: “It is safer if I just agree with whatever you say.”
  - **KAEDRA [WORRIED]:** “I prefer a companion who trusts me enough to disagree.”

</td><td>

- **KAEDRA [NEUTRAL]:** “The diagonal cut has no structural merit.”
- **NARRATOR:** You and Kaedra are disagreeing about sandwiches. She cuts straight across. You cut corner to corner.
- **PLAYER:** “It gives you a point to start from. It’s better design.”
- **KAEDRA [NEUTRAL]:** “We disagree about something inconsequential. Shall I alert the heralds?”
- **PLAYER:** “Only if they’ve got nothing better to announce.”
- **KAEDRA [PLAYFUL]:** “I have never seen a royal bulletin titled *Two People Remain Fond of Each Other*.”

**Option `KAE-ORD-POST-F03-C1-YES` (correct):** PLAYER: “Run it. Subheading: *Diagonal Still Correct*.”
  - **KAEDRA [PLAYFUL]:** “The subheading will be contested.”
  - **NARRATOR:** She cuts the next sandwich straight across and hands you half. Then she cuts your half corner to corner.

**Option `KAE-ORD-POST-F03-C1-NO` (wrong):** PLAYER: “You know what, you’re right. Straight across, then.”
  - **KAEDRA [ANNOYED]:** “No. Defend the diagonal. I was enjoying it.”
  - **NARRATOR:** She cuts the next sandwich corner to corner and waits for you to object.

</td></tr></table>

## KAE-ORD-POST-U01 — A Letter of Praise

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Kaedra reads a glowing letter of commendation, then sets it aside.
- **KAEDRA [NEUTRAL]:** “Apparently I possess the courage of a thousand soldiers. A logistical nightmare.”
- **PLAYER:** “Do compliments always sound this grand?”
- **KAEDRA [NEUTRAL]:** “In my experience, yes. The sender forgot the names of the actual soldiers.”

**Option `KAE-ORD-POST-U01-C1-YES` (correct):** PLAYER: “You could thank the whole team, in your own words.”
  - **KAEDRA [NEUTRAL]:** “I shall. Their courage was real, and far more manageable in number.”

**Option `KAE-ORD-POST-U01-C1-NO` (wrong):** PLAYER: “Frame it prominently. People should be in awe of you.”
  - **KAEDRA [WORRIED]:** “I would rather they remember who stood beside me.”

</td><td>

- **KAEDRA [NEUTRAL]:** “Apparently I have the courage of a thousand soldiers.”
- **NARRATOR:** She is holding a letter of commendation. Its wax seal is the size of a saucer.
- **KAEDRA [NEUTRAL]:** “A logistical nightmare. Where would they all sleep?”
- **KAEDRA [NEUTRAL]:** “Also the heart of a lion and the eyes of a hawk. I am becoming a menagerie.”
- **PLAYER:** “Does it mention anyone else?”
- **KAEDRA [NEUTRAL]:** “There were seven of us. The lion got the credit.”

**Option `KAE-ORD-POST-U01-C1-YES` (correct):** PLAYER: “Write back. Name the other six. No lions.”
  - **KAEDRA [PLAYFUL]:** “No lions. Agreed.”
  - **NARRATOR:** She is already writing. The reply runs to two pages: six names, and a sentence about each.

**Option `KAE-ORD-POST-U01-C1-NO` (wrong):** PLAYER: “Frame it. Seriously. People should see this.”
  - **KAEDRA [ANNOYED]:** “Framed. Above the six people it forgot.”
  - **NARRATOR:** She folds the letter around its enormous seal and puts it away.

</td></tr></table>

## KAE-ORD-POST-U02 — Off Duty, Sort Of

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Kaedra takes a moment to sit where the ground is clear. Her wings relax.
- **KAEDRA [NEUTRAL]:** “I am told that sitting down is a respectable activity when nothing is on fire.”
- **PLAYER:** “Does it feel strange?”
- **KAEDRA [NEUTRAL]:** “A little. I keep expecting someone to issue a report about my posture.”

**Option `KAE-ORD-POST-U02-C1-YES` (correct):** PLAYER: “You can take a rest because you want to. No permission needed.”
  - **KAEDRA [NEUTRAL]:** “Then I shall courageously remain seated for another minute.”

**Option `KAE-ORD-POST-U02-C1-NO` (wrong):** PLAYER: “You should stay alert. A guardian cannot afford to relax.”
  - **KAEDRA [WORRIED]:** “A tired guardian is not a more useful one.”

</td><td>

- **NARRATOR:** Kaedra sits down on a low step. Arranging the tail takes a moment. Then the wings. Then the tail again.
- **KAEDRA [NEUTRAL]:** “I am told that sitting is respectable when nothing is on fire.”
- **PLAYER:** “Does it feel strange?”
- **KAEDRA [NEUTRAL]:** “Very. I keep expecting someone to file a report about my posture.”
- **NARRATOR:** Nearby, a clerk with a clipboard glances over. Kaedra sits up straighter.

**Option `KAE-ORD-POST-U02-C1-YES` (correct):** PLAYER: “Stay put. I’ll tell the clipboard you’re testing the step.”
  - **KAEDRA [PLAYFUL]:** “A load test. Yes. Tell him it may take a while.”
  - **NARRATOR:** Her wings loosen. The clerk writes something down and leaves her alone.

**Option `KAE-ORD-POST-U02-C1-NO` (wrong):** PLAYER: “Good call. Rest up so you’re sharp for the next emergency.”
  - **KAEDRA [NEUTRAL]:** “The next emergency. Yes.”
  - **NARRATOR:** She rests for exactly one regulation minute. Then she gets up to inspect a gate that was fine.

</td></tr></table>

## KAE-ORD-POST-U03 — The Unremarkable Clasp

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Kaedra checks a decorative clasp, then leaves it alone.
- **KAEDRA [NEUTRAL]:** “That one is secure. I may be developing a reputation for noticing tiny problems.”
- **PLAYER:** “That seems useful.”
- **KAEDRA [NEUTRAL]:** “It is. I simply wish people noticed when I chose not to make them dramatic.”

**Option `KAE-ORD-POST-U03-C1-YES` (correct):** PLAYER: “I notice. You solve problems without needing an audience.”
  - **KAEDRA [NEUTRAL]:** “You are becoming a dangerously attentive companion.”

**Option `KAE-ORD-POST-U03-C1-NO` (wrong):** PLAYER: “You should make a show of inspecting it.”
  - **KAEDRA [WORRIED]:** “Then the show would become the problem.”

</td><td>

- **NARRATOR:** A courtier stops to tell Kaedra about nothing in particular. While he talks, she refastens the loose clasp on his cloak.
- **NARRATOR:** He does not notice. He bows and leaves, securely fastened.
- **KAEDRA [NEUTRAL]:** “That is the fourth time. He believes he is very good at clasps.”
- **PLAYER:** “You’re never going to tell him?”
- **KAEDRA [NEUTRAL]:** “If I tell him, it becomes an incident. Incidents have forms.”

**Option `KAE-ORD-POST-U03-C1-YES` (correct):** PLAYER: “I saw that, though. Very smooth. He has no idea.”
  - **KAEDRA [SURPRISED]:** “You were watching my hands.”
  - **KAEDRA [PLAYFUL]:** “Noted. I will have to keep an eye on you.”

**Option `KAE-ORD-POST-U03-C1-NO` (wrong):** PLAYER: “Next time, do it where he can see. You should get some credit.”
  - **KAEDRA [WORRIED]:** “Then he would know. And he would stop coming over to talk about nothing.”

</td></tr></table>

## KAE-ORD-POST-U04 — Acknowledged (was: A Question of Praise)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A passerby thanks Kaedra without flinching. She looks faintly startled.
- **KAEDRA [NEUTRAL]:** “They said “thank you” instead of “please don’t incinerate me.” A pleasant development.”
- **PLAYER:** “How did that feel?”
- **KAEDRA [NEUTRAL]:** “New. And quieter than I expected.”

**Option `KAE-ORD-POST-U04-C1-YES` (correct):** PLAYER: “You deserve ordinary kindness, not a constant demonstration of fear.”
  - **KAEDRA [NEUTRAL]:** “I could grow accustomed to that.”

**Option `KAE-ORD-POST-U04-C1-NO` (wrong):** PLAYER: “Fear proves they know you are powerful.”
  - **KAEDRA [WORRIED]:** “And misses nearly everything I hope to be.”

**Option `KAE-ORD-POST-U04-C1-OFF` (offensive):** PLAYER: “You scare everyone because you are a monster. They are right to fear you.”
  - **KAEDRA [ANNOYED]:** “I am not interested in earning approval by accepting an insult.”

</td><td>

- **NARRATOR:** A passer-by says *thank you, Your Highness* on the way past. Nobody edges toward a pillar.
- **KAEDRA [SURPRISED]:** “They said *thank you*. Usually it is *please do not incinerate me*.”
- **PLAYER:** “What did you say back?”
- **KAEDRA [NEUTRAL]:** “*Acknowledged.*”
- **KAEDRA [WORRIED]:** “I panicked.”

**Option `KAE-ORD-POST-U04-C1-YES` (correct):** PLAYER: “*Acknowledged* is a start. Want to practice on me?”
  - **PLAYER:** “Thank you, Your Highness.”
  - **KAEDRA [NEUTRAL]:** “You are welcome.”
  - **KAEDRA [PLAYFUL]:** “That was easier. I could get used to it.”

**Option `KAE-ORD-POST-U04-C1-NO` (wrong):** PLAYER: “The old way was kind of cool, though. Nobody messed with you.”
  - **KAEDRA [NEUTRAL]:** “Very cool. Nobody stopped to talk, either.”

**Option `KAE-ORD-POST-U04-C1-OFF` (offensive):** PLAYER: “Enjoy it. Nobody thanks a monster twice.”
  - **KAEDRA [ANNOYED]:** “*Acknowledged.*”
  - **NARRATOR:** She leaves the way the passer-by went.

</td></tr></table>

## KAE-ORD-POST-U05 — Half a Bench (was: The Garden Shadow)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A patch of shade offers space enough for two, and Kaedra shifts without being asked.
- **KAEDRA [NEUTRAL]:** “A rare architectural achievement: a bench not designed exclusively for narrow shoulders.”
- **PLAYER:** “Do you want company?”
- **KAEDRA [NEUTRAL]:** “Yes. I believe I do.”

**Option `KAE-ORD-POST-U05-C1-YES` (correct):** PLAYER: “Then I’ll sit here, if that still suits you.”
  - **KAEDRA [NEUTRAL]:** “It does. I rather like being asked.”

**Option `KAE-ORD-POST-U05-C1-NO` (wrong):** PLAYER: “I’ll sit. You should make room.”
  - **KAEDRA [WORRIED]:** “I was already making room. The command was unnecessary.”

</td><td>

- **NARRATOR:** Kaedra finds a bench wide enough for her wings and sits on exactly one half of it.
- **KAEDRA [NEUTRAL]:** “A rare achievement. A bench not designed exclusively for narrow shoulders.”
- **NARRATOR:** She looks at the empty half. Then at you. Then at the empty half.
- **KAEDRA [NEUTRAL]:** “By royal decree, this half of the bench is available.”
- **KAEDRA [WORRIED]:** “If you would like it.”

**Option `KAE-ORD-POST-U05-C1-YES` (correct):** PLAYER: “I accept the terms of the decree.”
  - **KAEDRA [PLAYFUL]:** “Good. I had no plan for enforcing it.”
  - **NARRATOR:** You sit. Her tail curls out of your way, a little further than it needs to.

**Option `KAE-ORD-POST-U05-C1-NO` (wrong):** PLAYER: “Sure! Budge up a bit, though?”
  - **NARRATOR:** She budges up. There was already room. Now there is a great deal of room, most of it between you.
  - **KAEDRA [NEUTRAL]:** “Decree amended.”

</td></tr></table>

## KAE-ORD-POST-U06 — Sentries and Signatures

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Kaedra finishes reading a roster and passes it to the next official.
- **KAEDRA [NEUTRAL]:** “The sentries can manage their shifts. Several of them have been doing this longer than I have been alive.”
- **PLAYER:** “That sounds reassuring.”
- **KAEDRA [NEUTRAL]:** “I am learning that leadership does not require touching every single decision.”

**Option `KAE-ORD-POST-U06-C1-YES` (correct):** PLAYER: “Trusting capable people is part of protecting them, too.”
  - **KAEDRA [NEUTRAL]:** “Exactly. It is an oddly difficult form of courage.”

**Option `KAE-ORD-POST-U06-C1-NO` (wrong):** PLAYER: “If you want control, check every shift yourself.”
  - **KAEDRA [WORRIED]:** “Then I would teach them I do not trust their judgment.”

</td><td>

- **NARRATOR:** Kaedra signs a sentry roster and hands it on. Her hand stays out a moment longer than the roster does.
- **KAEDRA [NEUTRAL]:** “The sentries can manage their own shifts. Several have done this longer than I have been alive.”
- **KAEDRA [NEUTRAL]:** “One of them corrected my salute when I was nine. He was right.”
- **PLAYER:** “So you’re not going to check it again?”
- **KAEDRA [NEUTRAL]:** “I am not going to check it again.”
- **NARRATOR:** She looks in the direction the roster went.

**Option `KAE-ORD-POST-U06-C1-YES` (correct):** PLAYER: “The man who fixed your salute can handle a roster. Walk with me?”
  - **KAEDRA [PLAYFUL]:** “He did fix it. Thoroughly.”
  - **NARRATOR:** She walks with you. She only looks back once.

**Option `KAE-ORD-POST-U06-C1-NO` (wrong):** PLAYER: “If it’s bugging you, just check. I always double-check before shipping.”
  - **NARRATOR:** She checks. It is perfect. Across the way, the oldest sentry watches her check it.
  - **KAEDRA [WORRIED]:** “He used to look at my salute like that.”

</td></tr></table>

## KAE-ORD-PRE-F01 — Polishing the Horns

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Kaedra spots her reflection in polished armor and raises an eyebrow.
- **KAEDRA [NEUTRAL]:** “A stylist once recommended gold caps for my horns. For formal occasions, naturally.”
- **PLAYER:** “Did you want them?”
- **KAEDRA [NEUTRAL]:** “I wanted the stylist to stop measuring my head.”

**Option `KAE-ORD-PRE-F01-C1-YES` (correct):** PLAYER: “Your horns look fine as they are, if that is what you prefer.”
  - **KAEDRA [NEUTRAL]:** “I shall record that as the first sensible consultation.”

**Option `KAE-ORD-PRE-F01-C1-NO` (wrong):** PLAYER: “The caps would make you look more frightening.”
  - **KAEDRA [WORRIED]:** “Then they would fulfill precisely the wrong purpose.”

</td><td>

- **NARRATOR:** Kaedra catches her reflection in her own bronze bracer and tilts her head. The horns tilt with it.
- **KAEDRA [NEUTRAL]:** “A stylist once recommended gold caps for my horns. For formal occasions.”
- **PLAYER:** “Did you want them?”
- **KAEDRA [NEUTRAL]:** “I wanted him to stop measuring my head.”
- **KAEDRA [ANNOYED]:** “He used calipers. Then he asked whether they come off for cleaning.”

**Option `KAE-ORD-PRE-F01-C1-YES` (correct):** PLAYER: “Your horns, your call. No calipers.”
  - **KAEDRA [PLAYFUL]:** “I will record that as the first sensible consultation.”
  - **KAEDRA [NEUTRAL]:** “Your fee is waived.”

**Option `KAE-ORD-PRE-F01-C1-NO` (wrong):** PLAYER: “Gold caps, though? Very imposing. Very *keep your distance*.”
  - **KAEDRA [ANNOYED]:** “That was his pitch. Nearly word for word.”
  - **NARRATOR:** She lowers her arm and takes one polite step back, out of measuring range.

</td></tr></table>

## KAE-ORD-PRE-F02 — Nothing Happened (was: The Quiet Report)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Kaedra folds a routine security report into neat thirds.
- **KAEDRA [NEUTRAL]:** “The report says nothing happened. It may be the finest document I have ever signed.”
- **PLAYER:** “Why is that?”
- **KAEDRA [NEUTRAL]:** “Nobody was hurt. The patrols worked. Peace is rarely dramatic.”

**Option `KAE-ORD-PRE-F02-C1-YES` (correct):** PLAYER: “That sounds like excellent work.”
  - **KAEDRA [NEUTRAL]:** “Thank you. It is nice when quiet success is recognized.”

**Option `KAE-ORD-PRE-F02-C1-NO` (wrong):** PLAYER: “It would be more impressive if there had been a fight.”
  - **KAEDRA [WORRIED]:** “I am employed to prevent those.”

</td><td>

- **KAEDRA [NEUTRAL]:** “Four patrols. Nine hours. Nothing happened.”
- **NARRATOR:** She folds the security report into precise thirds, then unfolds it to read it again.
- **KAEDRA [PLAYFUL]:** “It may be the finest document I have ever signed.”
- **PLAYER:** “What’s the best part?”
- **KAEDRA [NEUTRAL]:** “Page two. A suspicious noise was investigated. It was a heron.”
- **KAEDRA [NEUTRAL]:** “The heron was released without charge.”

**Option `KAE-ORD-PRE-F02-C1-YES` (correct):** PLAYER: “That’s excellent work. Frame the heron part.”
  - **KAEDRA [PLAYFUL]:** “Page two, framed. The heron will be insufferable.”
  - **NARRATOR:** She tucks the report inside her collar. It is not going back to the archive.

**Option `KAE-ORD-PRE-F02-C1-NO` (wrong):** PLAYER: “Shame, though. A bit of action would’ve made a better story.”
  - **KAEDRA [NEUTRAL]:** “I am employed to prevent better stories.”
  - **NARRATOR:** She files the report with the others. The heron goes unappreciated.

</td></tr></table>

## KAE-ORD-PRE-F03 — Room for Wings

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A railing leaves just enough room for Kaedra to settle her wings comfortably.
- **KAEDRA [NEUTRAL]:** “Furniture designers continue to act surprised by the existence of wings.”
- **PLAYER:** “Would a wider path help?”
- **KAEDRA [NEUTRAL]:** “Occasionally. I am capable of deciding when.”

**Option `KAE-ORD-PRE-F03-C1-YES` (correct):** PLAYER: “Then tell me what works for you, and I’ll follow your lead.”
  - **KAEDRA [NEUTRAL]:** “How refreshingly free of unsolicited rearrangement.”

**Option `KAE-ORD-PRE-F03-C1-NO` (wrong):** PLAYER: “You should keep your wings out of sight.”
  - **KAEDRA [WORRIED]:** “They are part of me. I do not intend to apologize for them.”

</td><td>

- **NARRATOR:** Kaedra settles beside a railing. Her folded wings fit with one finger’s width to spare. She checks this with one finger.
- **KAEDRA [NEUTRAL]:** “Furniture designers continue to act surprised by the existence of wings.”
- **KAEDRA [NEUTRAL]:** “I spent one entire banquet with a wing caught in the arm of a chair. I was praised for my stillness.”
- **PLAYER:** “Want me to find somewhere with more room?”
- **KAEDRA [NEUTRAL]:** “Sometimes. I will tell you which times.”

**Option `KAE-ORD-PRE-F03-C1-YES` (correct):** PLAYER: “Deal. You call it. Does this railing pass?”
  - **KAEDRA [PLAYFUL]:** “It passes. One finger to spare.”
  - **NARRATOR:** She leans back. The railing creaks once, then decides to cooperate.

**Option `KAE-ORD-PRE-F03-C1-NO` (wrong):** PLAYER: “Could you tuck them in a bit more? Might be comfier.”
  - **KAEDRA [ANNOYED]:** “This is tucked.”
  - **NARRATOR:** She sits forward, away from the railing, and stays that way.

</td></tr></table>

## KAE-ORD-PRE-U01 — The Doorway Debate

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A nearby attendant looks uncertain whether a stone archway offers Kaedra enough room for her folded wings.
- **KAEDRA [NEUTRAL]:** “I appreciate the concern. I have passed through narrower archways than this.”
- **PLAYER:** “Are they trying to help?”
- **KAEDRA [NEUTRAL]:** “Probably. They have not yet asked me what I need.”

**Option `KAE-ORD-PRE-U01-C1-YES` (correct):** PLAYER: “We could ask you instead of deciding for you.”
  - **KAEDRA [NEUTRAL]:** “Excellent. The answer is that I need the door to remain a door.”

**Option `KAE-ORD-PRE-U01-C1-NO` (wrong):** PLAYER: “They should clear the entire building. You look dangerous.”
  - **KAEDRA [WORRIED]:** “There is a difference between making space and making a spectacle.”

**Option `KAE-ORD-PRE-U01-C1-OFF` (offensive):** PLAYER: “Maybe they fear you because you look monstrous.”
  - **KAEDRA [ANNOYED]:** “My appearance does not make me less a person.”

</td><td>

- **NARRATOR:** An attendant is measuring a stone archway with a ribbon. Then he measures Kaedra’s folded wings. Then the archway again.
- **KAEDRA [NEUTRAL]:** “I have been through narrower arches than this. Once while carrying a cake.”
- **PLAYER:** “Has anyone asked you?”
- **KAEDRA [NEUTRAL]:** “He has sent for a second ribbon.”
- **NARRATOR:** A second attendant arrives with a longer ribbon. He approaches her wings the way people approach a bear.

**Option `KAE-ORD-PRE-U01-C1-YES` (correct):** PLAYER: “She’s right here, you know. You could just ask her.”
  - **NARRATOR:** The attendants turn to Kaedra. One of them asks, very politely, what she needs.
  - **KAEDRA [NEUTRAL]:** “I need the door to remain a door.”
  - **NARRATOR:** She walks through. Her wings clear the arch by a hand’s width. Both attendants write this down.

**Option `KAE-ORD-PRE-U01-C1-NO` (wrong):** PLAYER: “Want me to get them to clear the area? Give you a proper runway?”
  - **KAEDRA [NEUTRAL]:** “I do not require a runway. I require a door.”
  - **NARRATOR:** Too late. An attendant has heard *clear the area*. A man halfway through a sandwich is escorted off his bench.

**Option `KAE-ORD-PRE-U01-C1-OFF` (offensive):** PLAYER: “Can you blame them? Nobody wants a monster stuck in their doorway.”
  - **KAEDRA [ANNOYED]:** “Then you will want to stand somewhere else.”
  - **NARRATOR:** She walks through the arch without slowing. It fits. She keeps going.

</td></tr></table>

## KAE-ORD-PRE-U02 — The Safety Manual

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A maintenance notice has been rewritten so often that its margins are full of tiny corrections.
- **KAEDRA [NEUTRAL]:** “A committee spent four meetings deciding whether a loose stair counts as an emergency.”
- **PLAYER:** “Did they repair it?”
- **KAEDRA [NEUTRAL]:** “No. But the report is beautifully bound.”

**Option `KAE-ORD-PRE-U02-C1-YES` (correct):** PLAYER: “A repair matters more than a perfect report.”
  - **KAEDRA [NEUTRAL]:** “A revolutionary concept. I shall alert the carpenters immediately.”

**Option `KAE-ORD-PRE-U02-C1-NO` (wrong):** PLAYER: “At least the paperwork looks professional.”
  - **KAEDRA [WORRIED]:** “The staircase remains unimpressed.”

</td><td>

- **NARRATOR:** Kaedra is reading a maintenance report bound in red leather. It has a ribbon bookmark.
- **KAEDRA [NEUTRAL]:** “Four meetings to decide whether a loose stair is an emergency.”
- **PLAYER:** “What did they decide?”
- **KAEDRA [NEUTRAL]:** “That it is ‘a matter of ongoing concern.’ There is an appendix.”
- **KAEDRA [NEUTRAL]:** “Two members have since tripped on it. They have requested a fifth meeting.”

**Option `KAE-ORD-PRE-U02-C1-YES` (correct):** PLAYER: “Skip the fifth meeting. Who has a hammer?”
  - **KAEDRA [PLAYFUL]:** “The carpenters. They have been waiting since the second meeting.”
  - **KAEDRA [NEUTRAL]:** “I will tell them the committee approved it. The committee can find out afterward.”

**Option `KAE-ORD-PRE-U02-C1-NO` (wrong):** PLAYER: “Can we take a moment to admire the binding?”
  - **KAEDRA [NEUTRAL]:** “The binding is excellent. I will read it aloud to the stair.”

</td></tr></table>

## KAE-ORD-PRE-U03 — Siege Doctrine, Volume Two (was: The Wobbly Display)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A wooden display stand leans slightly to one side. Kaedra corrects its footing with practiced care.
- **KAEDRA [NEUTRAL]:** “Someone suggested I simply smash it to save time.”
- **PLAYER:** “Would that help?”
- **KAEDRA [NEUTRAL]:** “It would make a satisfying noise and create a new procurement request.”

**Option `KAE-ORD-PRE-U03-C1-YES` (correct):** PLAYER: “Stability seems the better solution.”
  - **KAEDRA [NEUTRAL]:** “I am glad someone appreciates the less dramatic kind of strength.”

**Option `KAE-ORD-PRE-U03-C1-NO` (wrong):** PLAYER: “Smashing it would prove how powerful you are.”
  - **KAEDRA [WORRIED]:** “Power is not proof of good judgment.”

</td><td>

- **NARRATOR:** A display stand is leaning to one side. Kaedra kneels and wedges a folded pamphlet under its short leg.
- **NARRATOR:** The pamphlet is *Siege Doctrine, Volume Two*. It is exactly the right thickness.
- **KAEDRA [NEUTRAL]:** “Someone suggested I smash it to save time.”
- **PLAYER:** “Would it?”
- **KAEDRA [NEUTRAL]:** “It would make a very satisfying noise. And a procurement request.”
- **NARRATOR:** She presses on the stand. It holds. She presses again, for the record.

**Option `KAE-ORD-PRE-U03-C1-YES` (correct):** PLAYER: “Volume Two has finally found its calling.”
  - **KAEDRA [PLAYFUL]:** “Volume One has been under my wardrobe for three years.”
  - **KAEDRA [NEUTRAL]:** “It has never been more useful.”

**Option `KAE-ORD-PRE-U03-C1-NO` (wrong):** PLAYER: “Go on, smash it. Show them what you can do.”
  - **KAEDRA [NEUTRAL]:** “They know what I can do. That is why they keep suggesting it.”
  - **NARRATOR:** A passing guard hears the word *smash* and edges toward a pillar.

</td></tr></table>

## KAE-ORD-PRE-U04 — Warm Hands, Cold Rumors

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A nervous passerby steps away when Kaedra warms her hands near a lantern.
- **KAEDRA [NEUTRAL]:** “There appears to be a rumor that I set buildings ablaze by sneezing.”
- **PLAYER:** “Is it true?”
- **KAEDRA [NEUTRAL]:** “Only if buildings are made of exceptionally nervous paper.”

**Option `KAE-ORD-PRE-U04-C1-YES` (correct):** PLAYER: “That sounds frustrating. How would you like to handle it?”
  - **KAEDRA [NEUTRAL]:** “By correcting it calmly. Thank you for asking first.”

**Option `KAE-ORD-PRE-U04-C1-NO` (wrong):** PLAYER: “Maybe you should pretend to breathe fire so they respect you.”
  - **KAEDRA [WORRIED]:** “Fear is not a substitute for respect.”

</td><td>

- **NARRATOR:** Kaedra warms her hands near a lantern. A passer-by carrying a stack of papers swerves wide of her.
- **KAEDRA [NEUTRAL]:** “There is a rumor that I set buildings alight by sneezing.”
- **PLAYER:** “Is it true?”
- **KAEDRA [NEUTRAL]:** “Only if the building is made of exceptionally nervous paper.”
- **NARRATOR:** Her nose twitches. The man with the papers breaks into a jog.
- **KAEDRA [NEUTRAL]:** “Dust. I did not even sneeze.”

**Option `KAE-ORD-PRE-U04-C1-YES` (correct):** PLAYER: “So what do you want to do about it? I could bring pepper.”
  - **KAEDRA [SURPRISED]:** “Pepper.”
  - **KAEDRA [PLAYFUL]:** “A controlled demonstration. I will draft the procedure. You will keep anyone holding paper well back.”

**Option `KAE-ORD-PRE-U04-C1-NO` (wrong):** PLAYER: “Lean into it. Puff a little smoke and nobody will bother you again.”
  - **KAEDRA [NEUTRAL]:** “Then the rumor would be accurate, and I would have to sign it.”
  - **NARRATOR:** She tucks her hands into her sleeves and moves away from the lantern.

</td></tr></table>

## KAE-ORD-PRE-U05 — The Mountain Proverb

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Kaedra reads a decorative inscription twice before setting it aside.
- **KAEDRA [NEUTRAL]:** ““The strongest mountain never bends.” An inspiring saying written by someone who has never seen an avalanche.”
- **PLAYER:** “How would you change it?”
- **KAEDRA [NEUTRAL]:** “I would praise the bridge that knows when to flex.”

**Option `KAE-ORD-PRE-U05-C1-YES` (correct):** PLAYER: “Strength can mean adjusting when others need it.”
  - **KAEDRA [NEUTRAL]:** “Precisely. Stone and stubbornness are not identical.”

**Option `KAE-ORD-PRE-U05-C1-NO` (wrong):** PLAYER: “The mountain sounds right. Never yield to anyone.”
  - **KAEDRA [WORRIED]:** “Then it is a poor teacher of responsibility.”

</td><td>

- **NARRATOR:** Someone has hung a carved plaque nearby. Kaedra reads it twice. The second time, she reads it like an inspector.
- **KAEDRA [NEUTRAL]:** “*The strongest mountain never bends.*”
- **KAEDRA [NEUTRAL]:** “Written by someone who has never met an avalanche.”
- **PLAYER:** “What would you carve instead?”
- **KAEDRA [NEUTRAL]:** “*A good bridge flexes.* I submitted it. They said it was not inspiring.”
- **KAEDRA [PLAYFUL]:** “Neither is a bridge in a river.”

**Option `KAE-ORD-PRE-U05-C1-YES` (correct):** PLAYER: “Carve the load rating. Nothing’s more inspiring than a number you can trust.”
  - **KAEDRA [SURPRISED]:** “*Rated for four hundred people and one cart.*”
  - **KAEDRA [PLAYFUL]:** “I would stand under that.”

**Option `KAE-ORD-PRE-U05-C1-NO` (wrong):** PLAYER: “I kind of like it, though. Never bend. Very you.”
  - **KAEDRA [WORRIED]:** “Very me.”
  - **KAEDRA [NEUTRAL]:** “I will let the avalanche know.”

</td></tr></table>

## KAE-ORD-PRE-U06 — The Heroic Voice (was: A Question of Witnesses)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Two officials debate who should announce that a routine inspection passed. Kaedra waits patiently.
- **KAEDRA [NEUTRAL]:** “I inspected the gate. They are discussing whose voice would sound most heroic announcing it.”
- **PLAYER:** “Which matters to you?”
- **KAEDRA [NEUTRAL]:** “That the gate is safe. The announcement can survive without a hero.”

**Option `KAE-ORD-PRE-U06-C1-YES` (correct):** PLAYER: “We can thank everyone who helped and leave the boasting out.”
  - **KAEDRA [NEUTRAL]:** “Good. A functioning gate is applause enough.”

**Option `KAE-ORD-PRE-U06-C1-NO` (wrong):** PLAYER: “You should take all the credit before someone else does.”
  - **KAEDRA [WORRIED]:** “I would prefer to keep the gate standing.”

</td><td>

- **NARRATOR:** Two officials are arguing over a single sheet of paper. One of them is doing vocal exercises.
- **KAEDRA [NEUTRAL]:** “I inspected a gate. It opens. It closes. It passed.”
- **KAEDRA [NEUTRAL]:** “They are deciding whose voice sounds most heroic announcing it.”
- **NARRATOR:** The second official tries it with a long pause before *closes*. He has requested trumpets.
- **PLAYER:** “Who actually fixed the gate?”
- **KAEDRA [NEUTRAL]:** “The hinge-oiler. He did most of it. Nobody has asked his name.”

**Option `KAE-ORD-PRE-U06-C1-YES` (correct):** PLAYER: “Just read it out the way you said it to me. ‘It opens. It closes. It passed.’”
  - **KAEDRA [NEUTRAL]:** “Very well.”
  - **NARRATOR:** She takes the sheet and reads it out in one breath, then adds: *“Hinges by Tobble.”*
  - **NARRATOR:** One official looks physically pained by the absence of trumpets.

**Option `KAE-ORD-PRE-U06-C1-NO` (wrong):** PLAYER: “Let them have their trumpets. It’s a big moment for a gate.”
  - **KAEDRA [NEUTRAL]:** “It is a medium moment for a gate.”
  - **NARRATOR:** The heroic announcement goes ahead, with trumpets. The hinge-oiler is not in it.

</td></tr></table>

## NER-EPI-01 — Marriage epilogue: A Future She Chooses

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** The quay looks unusually dignified. Pearl-colored ribbons hang above the water; strings of floating lanterns mark the clear channel where ocean guests arrive, while land guests gather safely along the stone railings.
- **NARRATOR:** Someone has produced a seating chart for a celebration in which half the attendees do not require seats. It is being revised with increasing desperation.
- **PLAYER:** "I think the seating chart has declared war on geometry."
- **NERELLE [PLAYFUL]:** "I've told them three times that the currents are not assigned tables."
- **NARRATOR:** Nerelle waits at the waterline in the same pearl-and-ocean-blue royal outfit she chose to wear, her single teal tail moving quietly beneath the surface. No spell changes her form, and nobody asks her to leave her home behind.
- **NERELLE [NEUTRAL]:** "I have an announcement before we begin. I've arranged my responsibilities with the council. I'll continue to serve the ocean court and to make journeys when I choose."
- **NARRATOR:** A murmur rises from the sea guests. A stern-looking court official takes out a list, hesitates, then adds a new heading: *Arrangements Actually Discussed With the Princess.*
- **NERELLE [PLAYFUL]:** "I see reform is already spreading."
- **PLAYER:** "Should I give a speech about our unprecedented cross-cultural scheduling achievements?"
- **NERELLE [SURPRISED]:** "You prepared a speech?"
- **PLAYER:** "Only twelve pages. I cut the appendix."
- **NERELLE [PLAYFUL]:** "How merciful."
- **NARRATOR:** When the formal promises begin, neither speaks about surrender. They speak about asking, listening, remaining honest, and finding each other across the places where land and sea meet.
- **NERELLE [NEUTRAL]:** "I choose you, {PLAYER}. I choose my people, my home, and the questions I haven't asked yet. Thank you for never making me pretend those choices cancel one another."
- **PLAYER:** "I choose you, Nerelle. And I hope you keep telling me when I'm wrong about a current."
- **NERELLE [PLAYFUL]:** "Then we should enjoy a long marriage. You're wrong about currents quite often."
- **NARRATOR:** Later, beside the Gardens canal, Nerelle drifts at ease in the water while you sit on the bank. Beyond you the kingdom remains complicated, beautiful, and unfinished.
- **PLAYER:** "Do you think we planned enough?"
- **NERELLE [NEUTRAL]:** "Enough to begin. We can decide the rest together."
- **NARRATOR:** The water carries the reflection of two figures toward the open channel. Neither has to become the other to share a future.

</td><td>

- **NARRATOR:** Moonwater Quay has never looked so dignified. Pearl ribbons hang over the water, and floating lanterns mark a clear channel for the ocean guests.
- **NARRATOR:** The land guests line the stone railings, leaning over as far as manners allow.
- **NARRATOR:** Someone has made a seating chart for a celebration where half the guests have no use for seats. It is on its ninth revision.
- **PLAYER:** “I think the seating chart has declared war on geometry.”
- **NERELLE [PLAYFUL]:** “Three times I have told them. Currents are not assigned tables.”
- **NARRATOR:** Nerelle waits in the water at the head of the channel.
- **NARRATOR:** Her tail keeps time under the surface. Nobody has brought a spell.
- **NERELLE [NEUTRAL]:** “Before we begin, an announcement. I have arranged my duties with the council.”
- **NERELLE [NEUTRAL]:** “I will go on serving the ocean court. I will also go on making journeys, whenever I see fit.”
- **NARRATOR:** A murmur runs through the sea guests. A stern court official consults a list, hesitates, then adds a new heading.
- **NARRATOR:** *Arrangements Actually Discussed With the Princess.*
- **NERELLE [PLAYFUL]:** “Look at that. Reform is spreading.”
- **PLAYER:** “Should I give a speech about our unprecedented cross-cultural scheduling achievements?”
- **NERELLE [SURPRISED]:** “You prepared a speech?”
- **PLAYER:** “Only twelve pages. I cut the appendix.”
- **NERELLE [PLAYFUL]:** “How merciful.”
- **NARRATOR:** Then come the vows.
- **NERELLE [NEUTRAL]:** “I promise to ask before I decide for both of us. And to keep meeting you where the land runs into the sea.”
- **NERELLE [NEUTRAL]:** “I choose you, {PLAYER}. And my people. And my home. And every question I have not asked yet.”
- **PLAYER:** “I’m yours, Nerelle. Keep telling me when I’m wrong about a current.”
- **NERELLE [PLAYFUL]:** “Then it’ll be a long marriage. You’re wrong about currents quite often.”
- **NARRATOR:** Later, beside the Gardens canal, Nerelle drifts in the water while you sit on the bank with your feet in it beside her.
- **PLAYER:** “Do you think we planned enough?”
- **NERELLE [NEUTRAL]:** “Enough to begin.”
- **NERELLE [PLAYFUL]:** “Also, your foot is in the wrong current. It’s about to visit the sea court without you.”

</td></tr></table>

## NER-EVT-POST-01 — Moonwater Festival

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Ribbons trail from the quay railing. In the water, little floating lanterns bob beside the canal, bright with painted names and small wishes. In daylight, their patterns catch the sun; at dusk, their lights begin to glow.
- **NERELLE [PLAYFUL]:** "Welcome to Moonwater Festival. Our official explanation says the lanterns honor those who guided us home. The unofficial explanation is that everyone enjoys making something float and then pretending it is a solemn tradition."
- **PLAYER:** "Both can be true."
- **NERELLE [NEUTRAL]:** "Exactly. You are getting dangerously good at this."
- **NARRATOR:** A group of young sea-dwellers carefully guides a string of lanterns along the water's edge. Nerelle exchanges a practiced greeting and listens to their questions with complete attention.
- **PLAYER:** "They seem glad you're here."
- **NERELLE [WORRIED]:** "I love this part of my responsibilities. They come to me with genuine concerns. I can sometimes help."
- **PLAYER:** "And the parts you don't love?"
- **NERELLE [NEUTRAL]:** "Those still exist. I used to think the answer was to accept every demand until there was no room left to want anything. Now I'm trying to learn which duties are mine, which I can share, and which are merely habits dressed as laws."
- **NARRATOR:** A lantern drifts into an eddy, circles twice, and points upstream as if it has decided to attend a different festival.
- **NERELLE [PLAYFUL]:** "That one has achieved more independence than half the royal council."
- **PLAYER:** "Does it get to decide where it's going?"
- **NERELLE [WORRIED]:** "Not entirely. Currents are real. But we still choose how to travel with them."
- **NERELLE [NEUTRAL]:** "I want to keep serving my people. I also want to keep learning about yours. Sometimes people hear one wish and assume it cancels the other."
- **NARRATOR:** She watches the lanterns, then turns back to you. She has told you what matters; now she wants to know what you heard.

**Option `NER-POST-C1-ROOM` (correct):** PLAYER: "You don't have to abandon your people to make room for your own life. You can decide what duties matter, where help is possible, and which discoveries you want to make. I'll listen to what you choose."
  - **NERELLE [SURPRISED]:** "It's a surprisingly large relief to be understood without first providing a twelve-page petition."
  - **PLAYER:** "I can provide a form if that would help."
  - **NERELLE [PLAYFUL]:** "Don't tempt me. I know several excellent forms."
  - **NARRATOR:** She steadies the wayward lantern with a small movement of her tail, turning it back into the shared channel instead of fixing it in place.
  - **NERELLE [NEUTRAL]:** "My place in the sea matters to me. So does the part of myself still becoming something new."
  - **PLAYER:** "Those both sound like parts of you."
  - **NERELLE [NEUTRAL]:** "They are. And I would like anyone close to me to love the whole of that."

**Option `NER-POST-C1-SIMPLIFY` (wrong):** PLAYER: "Why not just appoint someone else to do the ceremonies? Then you could spend all your time exploring."
  - **NERELLE [NEUTRAL]:** "Some responsibilities can be shared. Others matter to me personally."
  - **PLAYER:** "I thought that would make things easier."
  - **NERELLE [WORRIED]:** "Perhaps. But I don't want a future that's easier because half of who I am has been removed."
  - **NARRATOR:** The festival carries on around you. Nerelle thanks you for trying, though the conversation ends before she can explain everything.

**Option `NER-POST-C1-SHAME` (offensive):** PLAYER: "All these lanterns and speeches seem pointless. Your people would manage without you, so why pretend the duties matter?"
  - **NERELLE [ANNOYED]:** "They aren't pointless because you haven't learned why they matter."
  - **PLAYER:** "I didn't mean to insult them."
  - **NERELLE [NEUTRAL]:** "Then please stop talking as if being important to others means being unimportant to myself."
  - **NARRATOR:** She joins the festival-goers in the water. You are not asked to follow the conversation further.

</td><td>

- **NARRATOR:** Ribbons hang from the railings. On the water, small lanterns bob in rows, each painted with a name or a wish.
- **NARRATOR:** Lit or unlit, they float. That appears to be the main requirement.
- **NERELLE [PLAYFUL]:** “Welcome to the Moonwater Festival. Officially, the lanterns honor those who guided us home.”
- **NERELLE [NEUTRAL]:** “Unofficially, everyone enjoys making things float, and then we call it solemn.”
- **PLAYER:** “Both can be true.”
- **NERELLE [SURPRISED]:** “Exactly. You’re getting good at this. It’s unsettling.”
- **NARRATOR:** A cluster of young sea-dwellers steers a string of lanterns toward her. Nerelle greets every one of them by name.
- **NARRATOR:** Then she listens to their concerns one at a time, including a long one about a crab.
- **PLAYER:** “They’re glad you’re here.”
- **NERELLE [NEUTRAL]:** “This is my favorite part. They bring me real problems, and sometimes I can help.”
- **NERELLE [PLAYFUL]:** “The crab is a real problem. I have met him.”
- **PLAYER:** “And the parts you don’t love?”
- **NERELLE [WORRIED]:** “Those exist too. I used to accept every demand, until there was no room left to want anything.”
- **NERELLE [NEUTRAL]:** “Now I am sorting them. Duties that are mine. Duties I can share. Habits dressed up as laws.”
- **NERELLE [PLAYFUL]:** “The third pile is the largest. The council is very attached to it.”
- **NARRATOR:** A lantern drifts into an eddy and turns twice. Then it points itself upstream, apparently bound for a different festival.
- **NERELLE [PLAYFUL]:** “That one has more independence than half the council.”
- **PLAYER:** “Does it get a say in where it goes?”
- **NERELLE [NEUTRAL]:** “Partly. Currents are real. How you travel with them is another matter.”
- **NERELLE [NEUTRAL]:** “I want to keep serving my people. I also want to keep learning about yours.”
- **NERELLE [WORRIED]:** “People hear one wish and assume it cancels the other.”
- **NARRATOR:** She turns from the lanterns to you, waiting to find out what you heard.

**Option `NER-POST-C1-ROOM` (correct):** PLAYER: “Keep your people and keep exploring. You sort the piles, and I’ll listen to how they come out.”
  - **NERELLE [SURPRISED]:** “Oh, thank goodness. I had a twelve-page petition prepared.”
  - **PLAYER:** “I can still fill out a form, if it helps.”
  - **NERELLE [PLAYFUL]:** “Don’t tempt me. I know several excellent forms.”
  - **NARRATOR:** She reaches the wayward lantern with a flick of her tail and nudges it back into the channel with the others.
  - **NERELLE [NEUTRAL]:** “The sea is my home. And there is a part of me I am still finding out about.”
  - **NERELLE [NEUTRAL]:** “I would like anyone close to me to love the whole of that.”
  - **PLAYER:** “The whole of it. Crab included.”
  - **NERELLE [PLAYFUL]:** “Especially the crab.”

**Option `NER-POST-C1-SIMPLIFY` (wrong):** PLAYER: “Couldn’t someone else do the ceremonies? Then you’d have all your time for exploring.”
  - **NERELLE [NEUTRAL]:** “Some of them, yes. This one I would not give away.”
  - **PLAYER:** “I thought it’d make things easier.”
  - **NERELLE [WORRIED]:** “It would. The way a boat is lighter with half of it missing.”
  - **NARRATOR:** A young sea-dweller calls her name. She turns to answer, and the conversation ends there.

**Option `NER-POST-C1-SHAME` (offensive):** PLAYER: “This all seems pointless. They’d manage fine without you.”
  - **NERELLE [ANNOYED]:** “You have been here for one lantern. I have been here for all of them.”
  - **PLAYER:** “I didn’t mean it like that.”
  - **NERELLE [NEUTRAL]:** “You did. Now, if you will excuse me, I am going to be pointless with my people.”
  - **NARRATOR:** She swims out among the festival-goers. Nobody in the water asks you to follow.

</td></tr></table>

## NER-EVT-PRE-01 — Surface Souvenir Swap

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A line of small waterproof parcels floats beside the canal railing, each tied to a ribbon so precisely that a court clerk might weep with envy.
- **NERELLE [PLAYFUL]:** "Do you have a moment? I've been conducting an extremely unscientific study of surface souvenirs. The findings are troubling."
- **PLAYER:** "How troubling?"
- **NERELLE [NEUTRAL]:** "You sell seashells to people who already live beside the sea. Then you charge extra if someone has written *Authentic Ocean* on them."
- **PLAYER:** "That's the advertising industry. I used to live in a world with an advanced version."
- **NERELLE [SURPRISED]:** "Advanced? Can it convince a fish it needs to buy water?"
- **PLAYER:** "Give it a few fiscal quarters."
- **NARRATOR:** Nerelle laughs, then nudges one parcel toward the stone lip of the quay. Inside is a polished bit of sea glass beside a neatly folded sketch of a harbor lantern.
- **NERELLE [NEUTRAL]:** "A child in the tide villages gave me the glass. She said it looked like the surface lights when the water is calm. I wanted to understand what she meant."
- **PLAYER:** "Did you ask her?"
- **NERELLE [WORRIED]:** "I did. She was shy when she recognized me. Sometimes a crown makes an ordinary question feel like an examination."
- **NERELLE [PLAYFUL]:** "So I'm trying to learn how to be curious without turning people into a royal research project. My current theory involves fewer official seals."
- **NARRATOR:** She holds out the sketch for your opinion but watches your expression more closely than the paper.

**Option `NER-PRE-C1-LISTEN` (correct):** PLAYER: "Maybe ask what matters to them, then listen without trying to decide what the answer should be. We could start with the lanterns if you'd like."
  - **NERELLE [SURPRISED]:** "The astonishing art of allowing a question to remain a question."
  - **PLAYER:** "They don't teach it in the advanced advertising industry."
  - **NERELLE [PLAYFUL]:** "Their loss."
  - **NARRATOR:** She studies the reflection of a lantern in the water. Her tail fin shifts beneath it, sending the light into a dozen small shapes.
  - **NERELLE [NEUTRAL]:** "The child wasn't explaining the lantern. She was telling me what home looks like from below."
  - **PLAYER:** "That sounds worth remembering."
  - **NERELLE [PLAYFUL]:** "It does. For once, I shall not commission a commemorative plaque."

**Option `NER-PRE-C1-EXPLAIN` (wrong):** PLAYER: "The important thing is that souvenirs are symbolic. Let me explain the entire surface economy of sentimental objects."
  - **NERELLE [NEUTRAL]:** "That sounds informative. It's not quite what I was asking."
  - **PLAYER:** "Sorry. I thought more information would help."
  - **NERELLE [PLAYFUL]:** "It may. But if I wanted a lecture, I'd have invited the royal tax assessor."
  - **NARRATOR:** She keeps the child's sketch tucked safely beside her and returns to the water as the conversation ends.

**Option `NER-PRE-C1-MOCK` (offensive):** PLAYER: "How can you be a princess and still need someone to explain ordinary surface things?"
  - **NERELLE [SURPRISED]:** "Because I am a princess of the sea. I rather thought that distinction was visible."
  - **NERELLE [ANNOYED]:** "Not knowing your customs is not the same as lacking sense."
  - **NARRATOR:** She closes the parcel herself. The polite farewell that follows is considerably shorter than the conversation she had hoped for.

</td><td>

- **NARRATOR:** A row of small waterproof parcels bobs below the railing. Each is tied with a ribbon so precise that a court clerk would weep.
- **NERELLE [PLAYFUL]:** “Do you have a moment? I have been conducting an extremely unscientific study of surface souvenirs.”
- **PLAYER:** “What did you find?”
- **NERELLE [NEUTRAL]:** “You sell seashells. To people living next to the sea.”
- **NERELLE [NEUTRAL]:** “They cost more if someone has written *Authentic Ocean* on them. I checked with the ocean. It denies writing that.”
- **PLAYER:** “That’s advertising. Where I come from, it’s far more advanced.”
- **NERELLE [SURPRISED]:** “More advanced? Could it convince a fish to buy water?”
- **PLAYER:** “Give it a few fiscal quarters.”
- **NARRATOR:** She laughs and nudges one parcel to the edge of the stone.
- **NARRATOR:** Inside are a piece of sea glass and a folded sketch of a harbor lantern.
- **NERELLE [NEUTRAL]:** “A child in the tide villages gave me the glass. She said it looks like the surface lights when the water is calm.”
- **NERELLE [PLAYFUL]:** “The sketch is my attempt to see what she meant. The lantern came out looking like a worried turnip.”
- **PLAYER:** “Did you ask her what she meant?”
- **NERELLE [WORRIED]:** “I tried. She recognized me halfway through and started answering as if she were being graded.”
- **NERELLE [NEUTRAL]:** “It is the crown. It turns ‘what do you mean?’ into an examination.”
- **NERELLE [NEUTRAL]:** “I would like to be curious about people without making them a royal research project.”
- **NERELLE [PLAYFUL]:** “My current theory involves fewer official seals.”
- **NARRATOR:** She holds out the sketch for your opinion, and watches your face instead of the paper.

**Option `NER-PRE-C1-LISTEN` (correct):** PLAYER: “Practice on me. Ask what I see in the lantern. I’ll answer badly, and you’re not allowed to grade it.”
  - **NERELLE [SURPRISED]:** “Ungraded. The council would faint.”
  - **NERELLE [PLAYFUL]:** “Very well. What do you see?”
  - **PLAYER:** “A worried turnip.”
  - **NARRATOR:** She laughs, and turns to the real lantern’s reflection on the water.
  - **NARRATOR:** Her fin moves beneath it, and the reflection breaks into a dozen small lights.
  - **NERELLE [SURPRISED]:** “Oh. This is her sky.”
  - **NERELLE [NEUTRAL]:** “She was telling me what home looks like from below.”
  - **PLAYER:** “Worth remembering.”
  - **NERELLE [PLAYFUL]:** “I’ll remember it. I won’t, however, commission a commemorative plaque.”

**Option `NER-PRE-C1-EXPLAIN` (wrong):** PLAYER: “Oh, I can explain this. Souvenirs are symbolic. There’s a whole economy of sentimental objects.”
  - **NARRATOR:** You explain the whole economy of sentimental objects. It has four sections and a summary.
  - **NERELLE [NEUTRAL]:** “Very thorough. I was asking about one girl and one lantern.”
  - **NERELLE [PLAYFUL]:** “If I had wanted a lecture, I would have invited the royal tax assessor.”
  - **NARRATOR:** She tucks the sketch back into its parcel and reties the ribbon, just as precisely as before.

**Option `NER-PRE-C1-MOCK` (offensive):** PLAYER: “How are you a princess and still need surface stuff explained?”
  - **NERELLE [SURPRISED]:** “I am a princess of the *sea*. I had assumed the tail made that clear.”
  - **NERELLE [ANNOYED]:** “There are nine currents within a mile of here. I can name all of them. Shall I explain them to you, slowly?”
  - **NARRATOR:** She closes the parcel herself. Her goodbye is polite, and very short.

</td></tr></table>

## NER-FIN-01 — A Future She Chooses (first full final proposal)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** As the conversation ends, Nerelle does not swim away. She rests one hand on the waterside stone and looks across the familiar meeting place as though seeing it anew.
- **NERELLE [PLAYFUL]:** "You've become rather good company for a surface traveler. That's not a compliment I award lightly. My standards include knowing which end of a boat belongs in the water."
- **PLAYER:** "Both ends, ideally."
- **NERELLE [SURPRISED]:** "You're improving."
- **NARRATOR:** She laughs, but her attention turns serious. Under the water, her fin settles against the current instead of hurrying her away.
- **NERELLE [WORRIED]:** "There is something I need to tell you before you say whatever you've been rehearsing."
- **PLAYER:** "I might have rehearsed nothing."
- **NERELLE [PLAYFUL]:** "Then this may be our most efficient conversation yet."
- **NERELLE [NEUTRAL]:** "I have spoken with the people responsible for my duties. I can share some of the work. I will keep the responsibilities I believe are mine. And I'll continue exploring the surface-facing waterways when I choose."
- **PLAYER:** "How did that go?"
- **NERELLE [PLAYFUL]:** "With many documents. I believe three council members grew new gray hairs during the discussion."
- **NERELLE [WORRIED]:** "There will be disagreements. Some days my people will need me. Some days I'll need quiet. None of that makes me less interested in a life with you."
- **NERELLE [NEUTRAL]:** "I do not want to leave the ocean to become someone else's idea of a proper bride. Nor do I want to ask you to surrender your life and call it devotion."
- **PLAYER:** "What do you want, then?"
- **NERELLE [NEUTRAL]:** "A partnership we choose, with honest plans, places to meet where water reaches the shore, and room to keep learning. Not every question has to be solved in advance."
- **NARRATOR:** She reaches her hand up from the water, not as someone waiting to be rescued but as someone inviting you to answer as an equal.

**Option `NER-FIN-C1-EQUAL` (correct):** PLAYER: "Nerelle, I love your curiosity and the way you care for people. I love that you know what matters to you. I don't want to choose your future for you. Would you marry me and keep choosing how we build it together?"
  - **NERELLE [SURPRISED]:** "You really heard every word."
  - **PLAYER:** "I tried. I expect I'll need reminders."
  - **NERELLE [PLAYFUL]:** "Good. I've already prepared several, in alphabetical order."
  - **NARRATOR:** For a moment she looks out to the water, where the tide keeps moving. Then she turns back on her own terms.
  - **NERELLE [NEUTRAL]:** "Yes, {PLAYER}. I would choose that life with you. The ocean is still my home. My duties will still be real. But there's room for us, if we keep making that room honestly."
  - **PLAYER:** "I don't know every part of what comes next."
  - **NERELLE [WORRIED]:** "Neither do I. I used to think that meant I'd failed to plan."
  - **PLAYER:** "And now?"
  - **NERELLE [PLAYFUL]:** "Now I think it means we get to write a few pages together. Please use waterproof ink."
  - **NARRATOR:** She takes your offered hand across the waterside stone. Neither of you needs a transformation or a grand rescue to make the answer real.

**Option `NER-FIN-C1-TRANSFORM` (wrong):** PLAYER: "Marry me, and I'll find a spell to give you legs. Then none of these complications will matter."
  - **NERELLE [SURPRISED]:** "Legs?"
  - **PLAYER:** "So we could live together on land."
  - **NERELLE [ANNOYED]:** "You heard me tell you who I am, and answered with a plan to change it."
  - **PLAYER:** "I thought it would be easier."
  - **NERELLE [WORRIED]:** "Easier for whom? I cannot say yes to a future that begins by erasing mine."
  - **NARRATOR:** She does not treat the question as a joke, and she does not agree. The possibility of speaking honestly again remains, but the answer today is no.

**Option `NER-FIN-C1-SACRIFICE` (wrong):** PLAYER: "I'll abandon everything above the water for you. We'll never have to think about the surface again."
  - **NERELLE [WORRIED]:** "You'd give up your entire life because you think I need you to?"
  - **PLAYER:** "That's what devotion is, isn't it?"
  - **NERELLE [NEUTRAL]:** "No. Not for me. I want both of us to remain people with lives and choices, not to become proof that love requires disappearance."
  - **NARRATOR:** The tide moves softly between the quay stones. She leaves you with an honest refusal and the chance to ask with a different understanding.

</td><td>

- **NARRATOR:** The conversation is over, and Nerelle has not swum away. She rests one hand on the waterside stone.
- **NERELLE [PLAYFUL]:** “You have become good company, for a surface traveler. I do not award that lightly.”
- **NERELLE [NEUTRAL]:** “My standards include knowing which end of a boat goes in the water.”
- **PLAYER:** “Both ends, ideally.”
- **NERELLE [SURPRISED]:** “You are improving.”
- **NARRATOR:** She laughs. Then her fin settles against the current, the way it does when she means to stay.
- **NERELLE [WORRIED]:** “I need to say something before you say whatever you have been rehearsing.”
- **PLAYER:** “What if I haven’t rehearsed anything?”
- **NERELLE [PLAYFUL]:** “Then this will be our most efficient conversation yet.”
- **NERELLE [NEUTRAL]:** “I have spoken with the people responsible for my duties. Some of the work, I will share.”
- **NERELLE [NEUTRAL]:** “The duties that are mine, I will keep. And I will go on exploring the surface waterways whenever I wish.”
- **PLAYER:** “How did that go?”
- **NERELLE [PLAYFUL]:** “There were many documents. Three council members went noticeably grayer. I counted.”
- **NERELLE [WORRIED]:** “We will disagree, sometimes. Some days my people will need me. Some days I will need quiet.”
- **NERELLE [NEUTRAL]:** “None of that makes me want a life with you any less.”
- **NERELLE [NEUTRAL]:** “I will not leave the ocean to become someone’s idea of a proper bride.”
- **NERELLE [NEUTRAL]:** “And I will not ask you to give up your life and call it devotion.”
- **PLAYER:** “Then what do you want?”
- **NERELLE [NEUTRAL]:** “A partnership. Honest plans. Places to meet where the water reaches the shore. Room to keep learning.”
- **NARRATOR:** She reaches up from the water and offers her hand, the way one head of state offers it to another.

**Option `NER-FIN-C1-EQUAL` (correct):** PLAYER: “I love your curiosity, your care for people, and that you know your own mind. Your future’s yours. Marry me, and we’ll build it together?”
  - **NERELLE [SURPRISED]:** “You really heard every word.”
  - **PLAYER:** “I tried. I’ll probably need reminders.”
  - **NERELLE [PLAYFUL]:** “Good. I have already prepared several. They are in alphabetical order.”
  - **NARRATOR:** She looks out at the tide for a moment. It keeps moving. Then she turns back to you.
  - **NERELLE [NEUTRAL]:** “Yes, {PLAYER}.”
  - **NERELLE [NEUTRAL]:** “The ocean is still my home. My duties are still real. And there is room for us, if we keep making it.”
  - **PLAYER:** “I don’t know every part of what comes next.”
  - **NERELLE [WORRIED]:** “Neither do I. I used to think that meant I had failed to plan.”
  - **PLAYER:** “And now?”
  - **NERELLE [PLAYFUL]:** “Now I think it means we write a few pages together. In waterproof ink.”
  - **NARRATOR:** She takes your hand across the waterside stone. Hers is cold from the water, and does not let go.

**Option `NER-FIN-C1-TRANSFORM` (wrong):** PLAYER: “Marry me, and I’ll find a spell to give you legs. Then none of this has to be complicated.”
  - **NERELLE [SURPRISED]:** “Legs?”
  - **PLAYER:** “So we could live together on land.”
  - **NERELLE [ANNOYED]:** “You heard me tell you who I am. Then you answered with a plan to change it.”
  - **PLAYER:** “I thought it would make things easier.”
  - **NERELLE [WORRIED]:** “Easier for whom?”
  - **NARRATOR:** She does not say yes. Her hand goes back under the water, though she does not swim away.

**Option `NER-FIN-C1-SACRIFICE` (wrong):** PLAYER: “I’ll give up everything above the water for you. We’ll never have to think about the surface again.”
  - **NERELLE [WORRIED]:** “You would give up your whole life because you think I need you to?”
  - **PLAYER:** “Isn’t that what devotion is?”
  - **NERELLE [NEUTRAL]:** “Not to me. I do not want a love that only works if one of us disappears.”
  - **NARRATOR:** The tide moves between the quay stones. She says no, and leaves room for you to ask again.

</td></tr></table>

## NER-FIN-RETRY-01 — A Future She Chooses follow-up (marriage retry)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NERELLE [NEUTRAL]:** "I've thought about what you asked. I don't want you to mistake my answer for a puzzle with a secret password."
- **PLAYER:** "You wanted us to make a life together without changing who either of us is."
- **NERELLE [WORRIED]:** "Yes. I can make room for love. I cannot promise that my work, my home, and my own choices will vanish."
- **NARRATOR:** The water ripples against the quay. She waits, not impatiently, but unwilling to answer a proposal she cannot recognize as hers.

**Option `NER-FR-C1-PARTNER` (correct):** PLAYER: "I love you as you are. I want to marry you and plan a future we both choose, with room for your home and responsibilities and room for mine. Can we keep making those choices together?"
  - **NERELLE [SURPRISED]:** "That's the future I was trying to describe."
  - **PLAYER:** "This time I actually listened."
  - **NERELLE [PLAYFUL]:** "I'll make a note of this historic event."
  - **NERELLE [NEUTRAL]:** "Yes, {PLAYER}. Let's choose it together."
  - **NARRATOR:** She holds your hand across the waterline. Nothing needs to change shape for the answer to count.

**Option `NER-FR-C1-CONTROL` (wrong):** PLAYER: "If we marry, I can take responsibility for all the plans. You wouldn't have to worry about making choices anymore."
  - **NERELLE [ANNOYED]:** "I appreciate help. I have no intention of retiring from having a will of my own."
  - **PLAYER:** "I was trying to spare you stress."
  - **NERELLE [NEUTRAL]:** "Then begin by trusting me to say when I need help. Please ask again when you mean that."

</td><td>

- **NERELLE [NEUTRAL]:** “I have thought about what you asked. I would not like you to mistake my answer for a puzzle with a secret password.”
- **PLAYER:** “You want a life together where neither of us has to turn into someone else.”
- **NERELLE [WORRIED]:** “Yes. I can make room for love. I cannot promise that my work and my home will vanish to make it.”
- **NERELLE [PLAYFUL]:** “Or my opinions.”
- **NARRATOR:** The water laps at the quay. She is patient about it. She is also not going to answer the wrong question.

**Option `NER-FR-C1-PARTNER` (correct):** PLAYER: “I love you as you are. Marry me, and we’ll plan a future with room for your home and your duties, and for mine?”
  - **NERELLE [SURPRISED]:** “That is the future I was trying to describe.”
  - **PLAYER:** “This time I actually listened.”
  - **NERELLE [PLAYFUL]:** “I’ll mark it on the tide chart. High water: {PLAYER} listened.”
  - **NERELLE [NEUTRAL]:** “Yes, {PLAYER}. Let us plan it together.”
  - **NARRATOR:** She takes your hand across the waterline. With the other, she makes a note.

**Option `NER-FR-C1-CONTROL` (wrong):** PLAYER: “If we marry, I’ll take care of all the planning. You won’t have to make decisions anymore.”
  - **NERELLE [ANNOYED]:** “I appreciate help. I have no intention of retiring from having a will of my own.”
  - **PLAYER:** “Trying to spare you the stress, that’s all.”
  - **NERELLE [NEUTRAL]:** “Then trust me to tell you when I need help. Ask again when you mean that.”

</td></tr></table>

## NER-MID-01 — The Forbidden Journey (first full midpoint attempt)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Nerelle is waiting in the water below the quay, unusually quiet. A folded chart rests on a dry ledge within her reach, weighted beneath a smooth stone.
- **NERELLE [PLAYFUL]:** "Before you ask: no, I have not stolen a map. It belongs to me. The court has simply declared it a terribly inconvenient object for me to own."
- **PLAYER:** "Is this where the official warning says 'forbidden journey'?"
- **NERELLE [NEUTRAL]:** "It says 'unsanctioned surface observation.' If you enlarge the lettering enough, it sounds almost respectable."
- **NARRATOR:** She lifts a hand to the chart. The familiar water-accessible places near Moonwater Quay and the Royal Gardens canal are marked as possible surface-viewing stops: places close enough to hear markets and watch people going about their day.
- **NERELLE [WORRIED]:** "I know those currents. I know the tides and the places where the barges pass. I've helped guide emergency supplies here. Yet when I ask to visit simply because I want to, the answer changes."
- **PLAYER:** "Your court doesn't want you to go?"
- **NERELLE [NEUTRAL]:** "They want me to be safe. They also want me to be available whenever a council member discovers another urgent meeting. Both things are reasonable until there is no time left that belongs to me."
- **NARRATOR:** A surface courier crosses a nearby bridge carrying a stack of documents taller than his head. The top sheet escapes and lands in the canal. Nerelle catches it before it sinks.
- **NERELLE [PLAYFUL]:** "The surface, meanwhile, is defending itself with administrative paperwork. I feel at home already."
- **PLAYER:** "Why tell me about the journey now?"
- **NERELLE [WORRIED]:** "Because I trust you, and that makes this harder. Everyone has an opinion about what I should do. I wanted to hear yours. I'm afraid you'll give me another order, even if it comes dressed as kindness."
- **PLAYER:** "What do you want?"
- **NERELLE [NEUTRAL]:** "I want to learn how people live above the water. I want to remain answerable to the people who rely on me below it. And I want the choice to be mine."
- **NARRATOR:** She waits beside the quay, tail resting in the steady current. The chart stays between you, open to amendment rather than demanding obedience.

**Option `NER-MID-C1-PLAN` (correct):** PLAYER: "Then let's design a visit you actually want. You choose the route and when you're free of court duties. We can plan a safe waterside stop, agree on how you tell your court, and change plans if the tide or your responsibilities need it. I'll help, but it's your call."
  - **NERELLE [SURPRISED]:** "You didn't begin by telling me what I was allowed to do."
  - **PLAYER:** "You already know these waterways better than I ever will. I can help with the surface part."
  - **NERELLE [NEUTRAL]:** "Then here is what I propose. First, I finish my scheduled hearings. Second, I tell the appropriate attendants where I'll be. Third, I explore the garden canal because I want to, not because a task requires it."
  - **PLAYER:** "And if someone decides a private afternoon is scandalous?"
  - **NERELLE [PLAYFUL]:** "I'll ask whether they prefer their scandals alphabetized."
  - **NARRATOR:** She traces the waterway on the map. You suggest where a surface walkway runs alongside it; she corrects you where the current is too swift.
  - **NERELLE [WORRIED]:** "I worried you would make this into a daring rescue. I don't need to be carried away from my life. I need space to live it."
  - **PLAYER:** "Then we make space, together."
  - **NERELLE [NEUTRAL]:** "Together. That sounds less frightening when you say it without deciding the rest for me."
  - **NARRATOR:** They follow the familiar canal waterline for a short distance, comparing its sounds and sights. Nothing about the route is new. The novelty is that Nerelle chose to take it.

**Option `NER-MID-C1-RESCUE` (wrong):** PLAYER: "You shouldn't have to deal with all this. I'll arrange everything and get you away from the court before anyone can object."
  - **NERELLE [ANNOYED]:** "Away from the court? Those are my people. My responsibilities."
  - **PLAYER:** "I only meant to free you."
  - **NERELLE [WORRIED]:** "Free me to do what you've decided? I wanted you to hear my plan, not replace it."
  - **NARRATOR:** She takes back the chart, leaving the conversation unfinished rather than agreeing to a future chosen for her.

**Option `NER-MID-C1-PROHIBIT` (wrong):** PLAYER: "Your court has a point. There are risks, so you should stop asking to visit the surface."
  - **NERELLE [NEUTRAL]:** "I know the risks. I came because I thought we might discuss them as equals."
  - **PLAYER:** "I don't want you hurt."
  - **NERELLE [ANNOYED]:** "Concern is welcome. Treating concern as authority over me is not."
  - **NARRATOR:** She lets the chart float back against the quay and returns to her duties without agreeing to cancel her hope.

</td><td>

- **NARRATOR:** Nerelle is waiting in the water below the quay.
- **NARRATOR:** A folded chart sits on a dry ledge within her reach, weighted down with a smooth stone.
- **NERELLE [PLAYFUL]:** “Before you ask: yes, this map is mine. No, I did not steal it.”
- **NERELLE [NEUTRAL]:** “The court has ruled that it is an inconvenient thing for me to own.”
- **PLAYER:** “Is this the part where the warning says ‘forbidden journey’?”
- **NERELLE [NEUTRAL]:** “It says ‘unsanctioned surface observation.’ Written large enough, that sounds almost respectable.”
- **NARRATOR:** She unfolds the chart. Spots near the quay and along the gardens canal are circled in neat ink.
- **NARRATOR:** From each one, you could hear a market without leaving the water.
- **NARRATOR:** One circle is labeled *bakery (smell only)*.
- **NERELLE [NEUTRAL]:** “I know these tides. I have guided emergency supplies through these channels.”
- **NERELLE [WORRIED]:** “But when I ask to come here because I want to, the answer changes.”
- **PLAYER:** “Your court doesn’t want you to go?”
- **NERELLE [NEUTRAL]:** “They want me safe. They also want me available whenever a council member discovers another urgent meeting.”
- **NERELLE [NEUTRAL]:** “Both are reasonable. Added together, they come to every hour I have.”
- **NARRATOR:** Overhead, a courier crosses a bridge under a stack of documents taller than his head. The top sheet escapes and drops toward the canal.
- **NARRATOR:** Nerelle catches it before it sinks.
- **NERELLE [PLAYFUL]:** “Marked *urgent*. So the surface defends itself with paperwork too. I feel at home already.”
- **PLAYER:** “Why tell me about this now?”
- **NERELLE [WORRIED]:** “Because I trust you. That makes it harder.”
- **NERELLE [NEUTRAL]:** “Everyone has an opinion about what I should do. I wanted to hear yours.”
- **NERELLE [WORRIED]:** “And I am afraid it will be one more order, dressed up as kindness.”
- **PLAYER:** “What do you want?”
- **NERELLE [NEUTRAL]:** “To learn how people live above the water. To stay answerable to everyone below it who relies on me.”
- **NERELLE [NEUTRAL]:** “And for the choice to be mine.”
- **NARRATOR:** She waits in the current with the chart between you. There is a pencil on top of it.

**Option `NER-MID-C1-PLAN` (correct):** PLAYER: “Then let’s plan it. Your route, your timing. We find a safe stop, agree what to tell the court, and reschedule if the tide or council objects.”
  - **NERELLE [SURPRISED]:** “You did not start with what I am allowed to do.”
  - **PLAYER:** “Well, you know this water better than I ever will. I can do the surface bits, if you want them.”
  - **NERELLE [NEUTRAL]:** “Then here is my proposal. First, I finish my scheduled hearings.”
  - **NERELLE [NEUTRAL]:** “Second, I tell the appropriate attendants where I will be.”
  - **NERELLE [PLAYFUL]:** “Third, I explore the garden canal. For no reason at all, except that I want to.”
  - **PLAYER:** “And if somebody calls a private outing scandalous?”
  - **NERELLE [PLAYFUL]:** “I will ask whether they prefer their scandals alphabetized.”
  - **NARRATOR:** She traces the canal on the chart. You point out where a walkway runs along the bank.
  - **NERELLE [NEUTRAL]:** “Not there. The current is too swift by that bridge. You would spend the visit waving at me as I went past.”
  - **NARRATOR:** She moves your finger two bridges down, to where the water slows.
  - **NERELLE [WORRIED]:** “I was afraid you would turn this into a daring rescue.”
  - **NERELLE [NEUTRAL]:** “Nobody needs to carry me away from my life. I would like room to live in it.”
  - **PLAYER:** “No daring rescue. I’ll cancel the horse.”
  - **NERELLE [PLAYFUL]:** “You do not have a horse.”
  - **PLAYER:** “I was going to borrow one.”
  - **NARRATOR:** You follow the canal together, you on the path and she in the water beside you.
  - **NARRATOR:** She points out which bridges echo, and which only pretend to.

**Option `NER-MID-C1-RESCUE` (wrong):** PLAYER: “You shouldn’t have to deal with any of this. I’ll get you away from the court before anyone can object.”
  - **NERELLE [ANNOYED]:** “Away from the court? Those are my people.”
  - **PLAYER:** “I just meant I’d get you free.”
  - **NERELLE [WORRIED]:** “Free to follow your plan instead of theirs?”
  - **NARRATOR:** She folds the chart, slides it back under its stone, and does not unfold it again.

**Option `NER-MID-C1-PROHIBIT` (wrong):** PLAYER: “Your court has a point. It’s risky up here. Maybe stop asking to visit.”
  - **NERELLE [NEUTRAL]:** “I know the risks. I listed them on the back.”
  - **NARRATOR:** She turns the chart over. The list is longer than the route.
  - **PLAYER:** “I just don’t want you to get hurt.”
  - **NERELLE [ANNOYED]:** “Your worry is welcome. It does not outrank me.”
  - **NARRATOR:** She lets the chart drift back against the stone and leaves for her hearings. Every circle stays where it is.

</td></tr></table>

## NER-MID-RETRY-01 — The Forbidden Journey follow-up (midpoint retry)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NERELLE [NEUTRAL]:** "I've still been thinking about the route. And about what you said the last time we discussed it."
- **PLAYER:** "I heard something different from what you were asking."
- **NERELLE [WORRIED]:** "I didn't need someone to save me or someone to forbid me. I need to know we can make difficult decisions together without either of us vanishing inside the other's plans."
- **NARRATOR:** The current shifts gently beneath her. She waits for your answer, patient but unwilling to surrender the question.

**Option `NER-MR-C1-COAUTHOR` (correct):** PLAYER: "You get to choose what you explore and when. I can help plan safe meeting points along the waterways, and we can talk honestly about your duties and the risks. I won't make the choice for you."
  - **NERELLE [SURPRISED]:** "Yes. Precisely that."
  - **NERELLE [PLAYFUL]:** "You may yet become a capable navigator of discussions. Your knowledge of actual water remains a separate matter."
  - **PLAYER:** "I know what a boat is."
  - **NERELLE [NEUTRAL]:** "Then we have enough to begin."
  - **NARRATOR:** She revises her plan in her own hand. The conversation ends with a choice she can recognize as hers.

**Option `NER-MR-C1-DECIDE` (wrong):** PLAYER: "I thought it over. The easiest solution is for you to let me arrange it all. No decisions for you to worry about."
  - **NERELLE [ANNOYED]:** "You have listened with remarkable care, and somehow missed the center of every sentence."
  - **PLAYER:** "That's fair."
  - **NERELLE [NEUTRAL]:** "Then perhaps next time we can begin there."

</td><td>

- **NERELLE [NEUTRAL]:** “The route is still on my mind. So is our last conversation about it.”
- **PLAYER:** “Last time, I answered a different question from the one you asked.”
- **NERELLE [WORRIED]:** “I did not need saving or forbidding.”
- **NERELLE [NEUTRAL]:** “What I need is to know we can make hard decisions together, without one of us vanishing into the other’s plans.”
- **NARRATOR:** The chart is back on its ledge. Every circle is still there.

**Option `NER-MR-C1-COAUTHOR` (correct):** PLAYER: “You pick where and when. I’ll help find safe meeting spots, we’re honest about duties and risks, and I won’t decide for you.”
  - **NERELLE [SURPRISED]:** “Yes. That.”
  - **NERELLE [PLAYFUL]:** “You may yet become a capable navigator of discussions. Your knowledge of actual water remains a separate matter.”
  - **PLAYER:** “I know what a boat is.”
  - **NERELLE [NEUTRAL]:** “A promising start.”
  - **NARRATOR:** She picks up the pencil and starts revising the route. You are trusted with holding the stone.

**Option `NER-MR-C1-DECIDE` (wrong):** PLAYER: “I thought it over. Let me arrange all of it. One less thing for you to worry about.”
  - **NERELLE [ANNOYED]:** “You listened with remarkable care and somehow missed the middle of every sentence.”
  - **PLAYER:** “That’s fair.”
  - **NERELLE [NEUTRAL]:** “Then next time, start with the middle.”

</td></tr></table>

## NER-ORD-POST-F01 — Mermaid or Princess (was: The Shore and the Sea)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Nerelle watches the surface light fracture over a small wave.
- **NERELLE [NEUTRAL]:** “Someone asked whether I am thinking like a mermaid or a princess today.”
- **PLAYER:** “What did you say?”
- **NERELLE [NEUTRAL]:** “I said the question was missing a few possibilities.”

**Option `NER-ORD-POST-F01-C1-YES` (correct):** PLAYER: “You do not have to divide yourself for their convenience.”
  - **NERELLE [NEUTRAL]:** “That is the most useful answer I have heard all day.”

**Option `NER-ORD-POST-F01-C1-NO` (wrong):** PLAYER: “They have a point. Choose one identity.”
  - **NERELLE [WORRIED]:** “I have never found myself improved by being halved.”

</td><td>

- **NARRATOR:** Nerelle is floating on her back, frowning at the sky.
- **NERELLE [NEUTRAL]:** “A courtier asked whether I was thinking like a mermaid or a princess today.”
- **PLAYER:** “What did you say?”
- **NERELLE [NEUTRAL]:** “That the question was missing several options. He did not have time for the list.”
- **NERELLE [PLAYFUL]:** “At present, I am thinking like someone who wants a snack and suspects the gulls of plotting.”

**Option `NER-ORD-POST-F01-C1-YES` (correct):** PLAYER: “Next time, just answer ‘yes.’”
  - **NERELLE [SURPRISED]:** “Yes.”
  - **NERELLE [PLAYFUL]:** “Oh, that’s perfect. It’s technically an answer, and he’ll hate it.”

**Option `NER-ORD-POST-F01-C1-NO` (wrong):** PLAYER: “It’s a fair question, though. Which one do you feel like more?”
  - **NERELLE [PLAYFUL]:** “You and the courtier should meet. You could split the difference.”
  - **NERELLE [NEUTRAL]:** “I have never once been improved by being halved.”

</td></tr></table>

## NER-ORD-POST-F02 — Festival Ribbon

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A loose decorative ribbon bobs against a waterside post.
- **NERELLE [NEUTRAL]:** “People can make ceremonies complicated enough to scare the tide away.”
- **PLAYER:** “Should we rescue this ribbon?”
- **NERELLE [PLAYFUL]:** “Only if it would otherwise tangle a boat.”

**Option `NER-ORD-POST-F02-C1-YES` (correct):** PLAYER: “Let’s keep the water clear, then leave the celebrating to people.”
  - **NERELLE [NEUTRAL]:** “A sensible ordering of priorities. The fish agree.”

**Option `NER-ORD-POST-F02-C1-NO` (wrong):** PLAYER: “We should decorate every patch of water.”
  - **NERELLE [WORRIED]:** “The sea already has a rather successful decorating department.”

</td><td>

- **NARRATOR:** A loose festival ribbon bobs against a post, trailing a long gold streamer into the water.
- **NERELLE [NEUTRAL]:** “Every festival, the surface ties ribbons to everything. Every festival, the ribbons try to escape.”
- **PLAYER:** “Should we rescue it?”
- **NERELLE [NEUTRAL]:** “That depends. Is it likely to tangle a boat?”
- **NERELLE [PLAYFUL]:** “Last year one caught a rowing boat by the oar. The rower spent an hour going festively in circles.”

**Option `NER-ORD-POST-F02-C1-YES` (correct):** PLAYER: “Then it comes out. That rower has suffered enough.”
  - **NARRATOR:** She hooks the ribbon with one fin and flips it up onto the stones at your feet.
  - **NERELLE [PLAYFUL]:** “There. The celebrating is yours. Please do it somewhere dry.”

**Option `NER-ORD-POST-F02-C1-NO` (wrong):** PLAYER: “Leave it, it’s pretty. The water could use a few more.”
  - **NERELLE [NEUTRAL]:** “The sea already has a rather successful decorating department.”
  - **NARRATOR:** Out on the water, a small boat begins to turn in a slow, festive circle.

</td></tr></table>

## NER-ORD-POST-F03 — Bridges and Rooftops (was: The Shared Horizon)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Nerelle traces the far shore with her gaze.
- **NERELLE [NEUTRAL]:** “From this level, I can see the same towers you can. The horizon just frames them differently.”
- **PLAYER:** “I like that.”
- **NERELLE [NEUTRAL]:** “There is room for more than one good vantage point.”

**Option `NER-ORD-POST-F03-C1-YES` (correct):** PLAYER: “We can keep sharing what each of us notices.”
  - **NERELLE [NEUTRAL]:** “I would like that very much.”

**Option `NER-ORD-POST-F03-C1-NO` (wrong):** PLAYER: “Mine is the proper view, though.”
  - **NERELLE [WORRIED]:** “A remarkably quick way to stop learning.”

</td><td>

- **NARRATOR:** Nerelle rests her chin on her folded arms at the water’s edge and looks across at the far bank.
- **NERELLE [NEUTRAL]:** “From down here, I can see under every bridge in the kingdom. Someone has carved initials into most of them.”
- **NERELLE [PLAYFUL]:** “Several have been crossed out. Surface romance is very well documented from below.”
- **PLAYER:** “I can see the rooftops from up here. There’s a cat on one.”
- **NERELLE [SURPRISED]:** “Doing what?”
- **PLAYER:** “Supervising.”

**Option `NER-ORD-POST-F03-C1-YES` (correct):** PLAYER: “Trade? Your bridges for my rooftops, every time we meet.”
  - **NERELLE [NEUTRAL]:** “Agreed. I would like that very much.”
  - **NERELLE [PLAYFUL]:** “I will begin with the initials. You may want to sit down.”

**Option `NER-ORD-POST-F03-C1-NO` (wrong):** PLAYER: “The view’s better up here, though. I can describe it all for you.”
  - **NERELLE [NEUTRAL]:** “Wonderful. Describe the initials under the bridge.”
  - **NARRATOR:** You cannot. She does not tell you what they say.

</td></tr></table>

## NER-ORD-POST-U01 — The Same Buoys (was: Two Sets of Letters)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Nerelle unfolds a waterproof letter at water level.
- **NERELLE [NEUTRAL]:** “One letter asks about the shoreline. Another asks about conditions offshore. Both are important.”
- **PLAYER:** “Are they from your court?”
- **NERELLE [NEUTRAL]:** “Yes. They trust me to make careful decisions, not simply choose a side.”

**Option `NER-ORD-POST-U01-C1-YES` (correct):** PLAYER: “You can answer both in your own way. I’ll listen if you want to talk it through.”
  - **NERELLE [NEUTRAL]:** “Thank you. I would prefer a sounding board to a second sovereign.”

**Option `NER-ORD-POST-U01-C1-NO` (wrong):** PLAYER: “Leave the sea’s concerns behind. You have enough on the surface.”
  - **NERELLE [WORRIED]:** “I will not treat people I serve as disposable.”

**Option `NER-ORD-POST-U01-C1-OFF` (offensive):** PLAYER: “Abandon the ocean court. Your obligations matter less than being with me.”
  - **NERELLE [ANNOYED]:** “I will not trade my responsibilities for anyone’s possession of me.”

</td><td>

- **NARRATOR:** Nerelle holds a waterproof letter in each hand, just above the waterline.
- **NERELLE [NEUTRAL]:** “The shore families want the marker buoys moved further out. The offshore families want them moved further in.”
- **PLAYER:** “Same buoys?”
- **NERELLE [PLAYFUL]:** “The same buoys. Both letters end, ‘as the princess will surely agree.’”
- **NERELLE [WORRIED]:** “Inconveniently, I agree with half of each.”

**Option `NER-ORD-POST-U01-C1-YES` (correct):** PLAYER: “Talk me through it. I’ll be the wall you bounce it off.”
  - **NERELLE [PLAYFUL]:** “A wall. How refreshing. Everyone else offers to be a second sovereign.”
  - **NARRATOR:** She starts reading aloud. By the third paragraph, she is arguing with both letters, and winning.

**Option `NER-ORD-POST-U01-C1-NO` (wrong):** PLAYER: “Do the shore one first. The offshore lot are further out, so they’ll complain slower.”
  - **NERELLE [NEUTRAL]:** “They complain at exactly the same speed. It arrives wetter.”
  - **NARRATOR:** She moves the offshore letter to the top.

**Option `NER-ORD-POST-U01-C1-OFF` (offensive):** PLAYER: “Ditch the ocean court. I’m a better use of your time.”
  - **NERELLE [ANNOYED]:** “Those are families, {PLAYER}. Not a hobby I can put down.”
  - **NARRATOR:** She turns her back to answer them. Both letters get a reply before you get another word.

</td></tr></table>

## NER-ORD-POST-U02 — Here Be Cows (was: The Map’s Edge)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A damp map rests on the stones, its sea lanes drawn more carefully than its roads.
- **NERELLE [NEUTRAL]:** “Mapmakers have a habit of drawing one world in detail and the other as blank space.”
- **PLAYER:** “Which side bothers you more?”
- **NERELLE [PLAYFUL]:** “Whichever someone assumes I cannot understand.”

**Option `NER-ORD-POST-U02-C1-YES` (correct):** PLAYER: “What should a map include to respect both travelers?”
  - **NERELLE [NEUTRAL]:** “Paths that are real for each of them. That is a much better starting point.”

**Option `NER-ORD-POST-U02-C1-NO` (wrong):** PLAYER: “Put roads everywhere. Then nobody will get lost.”
  - **NERELLE [WORRIED]:** “Roads are rarely an improvement to deep water.”

</td><td>

- **NARRATOR:** Two damp maps lie on the stones at the water’s edge, pinned down with pebbles. They disagree about everything.
- **NERELLE [NEUTRAL]:** “This is a surface map. The sea is a blue patch labeled ‘Sea.’”
- **NERELLE [PLAYFUL]:** “Ours, meanwhile, shows the land as a blank patch labeled ‘Dry. Here be cows.’”
- **PLAYER:** “So both sides gave up at the shoreline.”
- **NERELLE [NEUTRAL]:** “Each mapmaker drew home in exquisite detail, and the other side as a rumor.”
- **NARRATOR:** Her tail flicks a little water onto the blank land, as if to see what grows.

**Option `NER-ORD-POST-U02-C1-YES` (correct):** PLAYER: “Teach me one current. Just one. I’ll draw it in.”
  - **NERELLE [PLAYFUL]:** “One. Very well. We start with the shy one.”
  - **NARRATOR:** She guides your finger in a thin blue line across the empty sea. It is the first thing on that map that’s right.

**Option `NER-ORD-POST-U02-C1-NO` (wrong):** PLAYER: “Let’s merge them into one proper map. I’m good at merges.”
  - **NERELLE [SURPRISED]:** “Merge. The sea and the land.”
  - **NARRATOR:** In the blank land of her map, she adds a small note: *Wants to merge the sea.*

</td></tr></table>

## NER-ORD-POST-U03 — Eleven Seconds (was: A Quiet Current)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Nerelle listens to the movement of water against the stone instead of speaking at once.
- **NERELLE [NEUTRAL]:** “Sometimes the current tells me more if I wait a moment.”
- **PLAYER:** “We could wait.”
- **NERELLE [NEUTRAL]:** “Are you sure? Surface people seem to fear pauses.”

**Option `NER-ORD-POST-U03-C1-YES` (correct):** PLAYER: “I’m in no hurry to fill the silence.”
  - **NERELLE [NEUTRAL]:** “Then we can have a very good conversation without much talking.”

**Option `NER-ORD-POST-U03-C1-NO` (wrong):** PLAYER: “Shouldn’t you decide faster? Your people need answers.”
  - **NERELLE [WORRIED]:** “They need considered answers. Speed is not always care.”

</td><td>

- **NARRATOR:** Nerelle folds her arms on the edge and listens to the water against the stone. She says nothing.
- **NARRATOR:** You say nothing too. It gets very quiet.
- **NERELLE [PLAYFUL]:** “Eleven seconds. You are doing very well.”
- **PLAYER:** “Were you timing me?”
- **NERELLE [NEUTRAL]:** “Surface people seem to fear pauses. The best a merchant has managed is seven seconds. Then he told me about his knees.”
- **NERELLE [NEUTRAL]:** “The current talks more when nobody interrupts it.”

**Option `NER-ORD-POST-U03-C1-YES` (correct):** PLAYER: “Then I’m going for the record.”
  - **NARRATOR:** You say nothing. The water says a good deal. At thirty seconds, a gull lands between you and screams once.
  - **NERELLE [PLAYFUL]:** “Forty-one seconds. The gull is disqualified.”

**Option `NER-ORD-POST-U03-C1-NO` (wrong):** PLAYER: “Want me to fill the quiet? I’ve got a story about my knees.”
  - **NERELLE [NEUTRAL]:** “The merchant said that too.”
  - **NERELLE [PLAYFUL]:** “Four seconds. He managed seven.”

</td></tr></table>

## NER-ORD-POST-U04 — The Accidental Decree (was: Advice and Orders)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A nearby clerk mistakes Nerelle’s question for an order and begins scribbling.
- **NERELLE [NEUTRAL]:** “I asked whether the lanterns were safe. Apparently that has become a decree.”
- **PLAYER:** “Should we stop the clerk?”
- **NERELLE [PLAYFUL]:** “Please. I would prefer questions to remain possible.”

**Option `NER-ORD-POST-U04-C1-YES` (correct):** PLAYER: “Let’s clarify what you meant, and let you decide what happens next.”
  - **NERELLE [NEUTRAL]:** “Excellent. My voice can survive the translation intact.”

**Option `NER-ORD-POST-U04-C1-NO` (wrong):** PLAYER: “An order would be easier. Let the clerk invent one.”
  - **NERELLE [WORRIED]:** “Convenience is an unreliable substitute for consent.”

</td><td>

- **NARRATOR:** A clerk on the path is writing very fast. Nerelle, chin resting on the edge of the water, watches his pen with alarm.
- **NERELLE [NEUTRAL]:** “I asked whether the lanterns were safe. He has written it down as a decree.”
- **CLERK:** “‘The lanterns shall be safe.’ By order of Her Highness.”
- **NERELLE [SURPRISED]:** “Oh dear.”
- **CLERK:** “‘Oh dear.’ Second decree. Noted.”
- **NERELLE [PLAYFUL]:** “I’m now afraid to hiccup. He’d declare a holiday.”

**Option `NER-ORD-POST-U04-C1-YES` (correct):** PLAYER: “She was asking a question. Nerelle, what did you want to know?”
  - **NERELLE [NEUTRAL]:** “Thank you. Whether the third lantern is leaking. It is leaning to the left.”
  - **NARRATOR:** The clerk crosses out both decrees. After some thought, he underlines the crossing-out.

**Option `NER-ORD-POST-U04-C1-NO` (wrong):** PLAYER: “Keep it! ‘The lanterns shall be safe’ is a pretty good law.”
  - **CLERK:** “‘A pretty good law.’ Endorsed by Her Highness’s companion. Noted.”
  - **NERELLE [NEUTRAL]:** “Well. Now we are both in the law.”

</td></tr></table>

## NER-ORD-POST-U05 — A Weather Permit

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A sheet of official paper has blown into the water. Nerelle retrieves it and squints.
- **NERELLE [NEUTRAL]:** “A surface office has issued permission for favorable weather. That seems ambitious.”
- **PLAYER:** “Does the sea council do anything similar?”
- **NERELLE [NEUTRAL]:** “We issue warnings, not commands to clouds. The distinction saves embarrassment.”

**Option `NER-ORD-POST-U05-C1-YES` (correct):** PLAYER: “Useful advice beats pretending you control the weather.”
  - **NERELLE [NEUTRAL]:** “If only every office believed that.”

**Option `NER-ORD-POST-U05-C1-NO` (wrong):** PLAYER: “Perhaps you should claim authority over storms, too.”
  - **NERELLE [WORRIED]:** “I have no wish to become personally responsible for thunder.”

</td><td>

- **NARRATOR:** An official-looking sheet drifts by. Nerelle fishes it out and reads it, dripping.
- **NERELLE [NEUTRAL]:** “A surface office has issued a permit for pleasant weather. It has a seal.”
- **PLAYER:** “Does the sea council do anything like that?”
- **NERELLE [NEUTRAL]:** “We issue warnings, not commands to clouds. It saves embarrassment.”
- **NARRATOR:** A single fat raindrop lands on the seal.
- **NERELLE [PLAYFUL]:** “The clouds have replied.”

**Option `NER-ORD-POST-U05-C1-YES` (correct):** PLAYER: “Want to stamp it ‘Declined by the clouds’ and send it back?”
  - **NERELLE [PLAYFUL]:** “Yes. I carry waterproof ink for exactly this.”
  - **NARRATOR:** She writes *Declined by the clouds* across the seal, in a hand much neater than the office’s.

**Option `NER-ORD-POST-U05-C1-NO` (wrong):** PLAYER: “Your council should try one. A permit for one nice day can’t hurt.”
  - **NERELLE [NEUTRAL]:** “And when the permitted day rains, whom do they blame?”
  - **NERELLE [PLAYFUL]:** “I have no wish to become personally responsible for thunder.”

</td></tr></table>

## NER-ORD-POST-U06 — A Changed Tide

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** The tide has turned, and the mooring ropes hang at a different angle.
- **NERELLE [NEUTRAL]:** “The harbor looks familiar, but every current has shifted since we last looked.”
- **PLAYER:** “Does that trouble you?”
- **NERELLE [PLAYFUL]:** “No. A changing place is still home if I can choose how to move through it.”

**Option `NER-ORD-POST-U06-C1-YES` (correct):** PLAYER: “I’m glad you can make those choices without needing my permission.”
  - **NERELLE [NEUTRAL]:** “And I am glad you keep reminding me it is not a lonely task.”

**Option `NER-ORD-POST-U06-C1-NO` (wrong):** PLAYER: “You should settle on one route and never change it.”
  - **NERELLE [WORRIED]:** “A route that never adapts is a danger at sea.”

</td><td>

- **NARRATOR:** The tide has turned. Every rope tied along the edge hangs at a new angle.
- **NERELLE [NEUTRAL]:** “Everything has moved since we last spoke. The eddy by the wall is gone. There is a new one by your foot.”
- **PLAYER:** “Doesn’t that get tiring?”
- **NERELLE [PLAYFUL]:** “It means I get a new place twice a day without the trouble of moving house.”
- **NERELLE [NEUTRAL]:** “Surface people move once a decade and complain about it for a year.”

**Option `NER-ORD-POST-U06-C1-YES` (correct):** PLAYER: “Honestly, where’s the good current now? Quiz me.”
  - **NERELLE [PLAYFUL]:** “Very well. Point to where you would swim.”
  - **NARRATOR:** You point at the calmest patch of water. She points, with great patience, at the patch beside it.
  - **NERELLE [NEUTRAL]:** “Close. Yours would have taken you very politely out to sea.”

**Option `NER-ORD-POST-U06-C1-NO` (wrong):** PLAYER: “You could pick one route and stick to it. Less to keep track of.”
  - **NERELLE [NEUTRAL]:** “I could. For about six hours.”
  - **NERELLE [PLAYFUL]:** “Then the tide turns, and my route goes straight into the wall.”

</td></tr></table>

## NER-ORD-PRE-F01 — A Surface Expression

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Nerelle considers a phrase she overheard near the waterfront.
- **NERELLE [NEUTRAL]:** “Someone said a meeting had “gone swimmingly.” Is that praise or a warning?”
- **PLAYER:** “Usually praise.”
- **NERELLE [NEUTRAL]:** “A pity. Swimming is sometimes quite difficult.”

**Option `NER-ORD-PRE-F01-C1-YES` (correct):** PLAYER: “Maybe the phrase borrowed your skill without understanding it.”
  - **NERELLE [NEUTRAL]:** “Then I shall submit an extremely polite linguistic complaint.”

**Option `NER-ORD-PRE-F01-C1-NO` (wrong):** PLAYER: “It means all swimming is easy, obviously.”
  - **NERELLE [WORRIED]:** “You may wish to discuss that with a strong current.”

</td><td>

- **NERELLE [NEUTRAL]:** “A merchant just told his friend that their meeting went swimmingly.”
- **NERELLE [NEUTRAL]:** “Was the meeting held in a current? Were there eels?”
- **PLAYER:** “It means it went well.”
- **NERELLE [SURPRISED]:** “Well? Half of swimming is not drowning. The other half is eels.”
- **NARRATOR:** Up on the walkway, the merchant is still telling people how swimmingly it went.

**Option `NER-ORD-PRE-F01-C1-YES` (correct):** PLAYER: “So we took your hardest skill and made it mean ‘fine’?”
  - **NERELLE [PLAYFUL]:** “Without asking. I am drafting a complaint.”
  - **NERELLE [NEUTRAL]:** “Polite. Firm. Waterproof.”

**Option `NER-ORD-PRE-F01-C1-NO` (wrong):** PLAYER: “To be fair, swimming must be pretty easy for you.”
  - **NERELLE [NEUTRAL]:** “Easy the way stairs are easy for you.”
  - **NERELLE [PLAYFUL]:** “Ask me again in a riptide.”

</td></tr></table>

## NER-ORD-PRE-F02 — The Floating Leaf

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A leaf circles beside Nerelle without quite moving away.
- **NERELLE [NEUTRAL]:** “This leaf has been following me for several minutes. I suspect an appointment.”
- **PLAYER:** “Does it need your signature?”
- **NERELLE [PLAYFUL]:** “I do not recall issuing permits to leaves.”

**Option `NER-ORD-PRE-F02-C1-YES` (correct):** PLAYER: “Perhaps it simply found a calm place to drift.”
  - **NERELLE [NEUTRAL]:** “A reasonable ambition. The council could learn from it.”

**Option `NER-ORD-PRE-F02-C1-NO` (wrong):** PLAYER: “You should keep it as proof of your authority.”
  - **NERELLE [WORRIED]:** “I doubt a leaf would appreciate being drafted into office.”

</td><td>

- **NARRATOR:** A leaf is turning slow circles beside Nerelle. It shows no sign of leaving.
- **NERELLE [NEUTRAL]:** “It has been waiting there for several minutes. I suspect an appointment.”
- **PLAYER:** “Does it need your signature?”
- **NERELLE [PLAYFUL]:** “I don’t recall issuing permits to leaves.”
- **NARRATOR:** A second leaf drifts up and settles in behind the first. Then a third.
- **NERELLE [SURPRISED]:** “Oh no. It’s a queue.”

**Option `NER-ORD-PRE-F02-C1-YES` (correct):** PLAYER: “Put up a sign: *Back after the tide.* You’re off duty.”
  - **NERELLE [PLAYFUL]:** “Back after the tide. The council would never.”
  - **NARRATOR:** She tells the leaves. They drift off politely, one at a time, in order.

**Option `NER-ORD-PRE-F02-C1-NO` (wrong):** PLAYER: “Keep the first one! Press it and frame it. First official leaf of your reign.”
  - **NERELLE [NEUTRAL]:** “Then the other two will want frames.”
  - **NARRATOR:** The queue grows by a twig.

</td></tr></table>

## NER-ORD-PRE-F03 — The Grandmothers’ Knot (was: A Knot of Questions)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Nerelle examines the knot securing a small floating marker.
- **NERELLE [NEUTRAL]:** “A sailor taught me that knot, then insisted his grandmother invented it.”
- **PLAYER:** “Did she?”
- **NERELLE [NEUTRAL]:** “Possibly. Six other grandmothers have made the same claim.”

**Option `NER-ORD-PRE-F03-C1-YES` (correct):** PLAYER: “Maybe you can admire the knot without settling its ancestry.”
  - **NERELLE [NEUTRAL]:** “A relief. Maritime diplomacy is exhausting enough.”

**Option `NER-ORD-PRE-F03-C1-NO` (wrong):** PLAYER: “Tell the sailor he is wrong. Every argument needs a winner.”
  - **NERELLE [WORRIED]:** “Not every useful discovery requires a dispute.”

</td><td>

- **NARRATOR:** Nerelle reties the knot on a floating marker without looking at her hands.
- **NERELLE [NEUTRAL]:** “A sailor taught me this knot. He insisted his grandmother invented it.”
- **PLAYER:** “Did she?”
- **NERELLE [NEUTRAL]:** “Possibly. Six other grandmothers have made the same claim.”
- **NERELLE [PLAYFUL]:** “Two have written to the council. One enclosed a diagram and a threat.”

**Option `NER-ORD-PRE-F03-C1-YES` (correct):** PLAYER: “Call it the grandmothers’ knot. All seven of them.”
  - **NERELLE [SURPRISED]:** “Seven signatories. That is more than our last trade agreement.”
  - **NERELLE [PLAYFUL]:** “I will propose it. Through a very junior clerk, in case of diagrams.”

**Option `NER-ORD-PRE-F03-C1-NO` (wrong):** PLAYER: “Let’s settle it. Someone must have written down who tied it first.”
  - **NERELLE [SURPRISED]:** “You would take on seven grandmothers?”
  - **NERELLE [NEUTRAL]:** “Brave. I’ll tie something nice for your memorial.”

</td></tr></table>

## NER-ORD-PRE-U01 — The Tide Clock

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A floating marker taps the waterside stone at an even rhythm. Nerelle watches the current carry it back.
- **NERELLE [NEUTRAL]:** “Surface clocks insist every hour is the same length. The tides are less obedient.”
- **PLAYER:** “You prefer tidekeeping?”
- **NERELLE [NEUTRAL]:** “I prefer knowing which clock is answering which question.”

**Option `NER-ORD-PRE-U01-C1-YES` (correct):** PLAYER: “Different measures suit different needs. You know your waters best.”
  - **NERELLE [NEUTRAL]:** “Exactly. A good chart does not ask the sea to behave like a hallway.”

**Option `NER-ORD-PRE-U01-C1-NO` (wrong):** PLAYER: “One clock is simpler. Make the sea match the schedule.”
  - **NERELLE [WORRIED]:** “If you discover how, please inform the moon before the council.”

</td><td>

- **NARRATOR:** A floating marker keeps bumping the waterside stone. Nerelle is counting the bumps.
- **NERELLE [NEUTRAL]:** “Your clock tower claims every hour is the same length. I have been checking.”
- **PLAYER:** “How’s the claim holding up?”
- **NERELLE [NEUTRAL]:** “Poorly. The tide has filed a dissent.”
- **NERELLE [PLAYFUL]:** “At home, we ask the moon what time it is. In emergencies, a very old crab.”

**Option `NER-ORD-PRE-U01-C1-YES` (correct):** PLAYER: “Keep the crab. The tower can have the meetings.”
  - **NERELLE [NEUTRAL]:** “Agreed. I’ll inform the crab.”
  - **NERELLE [PLAYFUL]:** “He has been anxious about his position.”

**Option `NER-ORD-PRE-U01-C1-NO` (wrong):** PLAYER: “We could merge them. One clock, with the tides as a recurring event.”
  - **NERELLE [NEUTRAL]:** “Splendid. Please inform the moon before the council.”
  - **NARRATOR:** The marker bumps the stone again. By the tower’s reckoning, the tide is four minutes behind.

</td></tr></table>

## NER-ORD-PRE-U02 — Bells Underwater

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A distant bell rings above the waterfront. Nerelle lifts her head to listen.
- **NERELLE [NEUTRAL]:** “That bell sounds quite different beneath the surface. The low notes travel farther.”
- **PLAYER:** “Do you hear anything else?”
- **NERELLE [PLAYFUL]:** “Mostly boats. Their owners assume that because I am underwater I cannot complain.”

**Option `NER-ORD-PRE-U02-C1-YES` (correct):** PLAYER: “I’d like to hear how the world sounds from where you are.”
  - **NERELLE [NEUTRAL]:** “An excellent question. Listening is more useful than shouting louder.”

**Option `NER-ORD-PRE-U02-C1-NO` (wrong):** PLAYER: “If the boats are loud, you should just swim somewhere else.”
  - **NERELLE [WORRIED]:** “I have responsibilities here. The boats could also show some courtesy.”

**Option `NER-ORD-PRE-U02-C1-OFF` (offensive):** PLAYER: “Maybe people would listen if you stopped being a strange sea creature.”
  - **NERELLE [ANNOYED]:** “My hearing works perfectly, including when someone is deliberately insulting.”

</td><td>

- **NARRATOR:** A bell rings somewhere above the water. Nerelle ducks under to listen, then surfaces.
- **NERELLE [NEUTRAL]:** “Underwater, that bell is lower and lasts longer. It sounds as if it means it.”
- **PLAYER:** “What else can you hear down there?”
- **NERELLE [PLAYFUL]:** “Mostly boats. Their owners assume that if I am underwater, I cannot complain.”
- **NERELLE [NEUTRAL]:** “I can. There is a barge with a squeaking rudder that I have written to three times.”

**Option `NER-ORD-PRE-U02-C1-YES` (correct):** PLAYER: “What does the squeaky barge sound like from down there?”
  - **NERELLE [PLAYFUL]:** “Like a gull being disappointed very slowly.”
  - **NERELLE [NEUTRAL]:** “Put your ear to the water when it passes. I will provide commentary.”

**Option `NER-ORD-PRE-U02-C1-NO` (wrong):** PLAYER: “Couldn’t you swim further out, away from the noise?”
  - **NERELLE [NEUTRAL]:** “I could. Then the barge would win.”
  - **NARRATOR:** She does not move a fin’s width. Somewhere upstream, a rudder squeaks, and her eyes narrow.

**Option `NER-ORD-PRE-U02-C1-OFF` (offensive):** PLAYER: “Maybe they’d listen if you weren’t so strange.”
  - **NERELLE [ANNOYED]:** “I can hear you perfectly. That is the problem.”
  - **NARRATOR:** She sinks out of sight. She hears the next bell without you.

</td></tr></table>

## NER-ORD-PRE-U03 — Bow or Wave (was: Quayside Etiquette)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Two nearby visitors struggle to decide whether they should bow to Nerelle or wave.
- **NERELLE [NEUTRAL]:** “It appears etiquette has reached an impasse. The hand gestures are becoming competitive.”
- **PLAYER:** “Is there a rule?”
- **NERELLE [NEUTRAL]:** “For greeting me? A kind word works wonderfully.”

**Option `NER-ORD-PRE-U03-C1-YES` (correct):** PLAYER: “I can ask how you prefer to be greeted.”
  - **NERELLE [NEUTRAL]:** “You have just outperformed three ceremonial committees.”

**Option `NER-ORD-PRE-U03-C1-NO` (wrong):** PLAYER: “People ought to bow. You are royalty.”
  - **NERELLE [WORRIED]:** “Some might choose to. I would rather they spoke to me.”

</td><td>

- **NARRATOR:** Two visitors have stopped on the path to greet Nerelle in the water. One bows. The other waves.
- **NARRATOR:** Each notices the other and adds the missing gesture. Now both are bowing and waving at once.
- **NERELLE [NEUTRAL]:** “Etiquette has reached an impasse. The gestures are becoming competitive.”
- **PLAYER:** “Is there an official rule?”
- **NERELLE [NEUTRAL]:** “Three ceremonial committees have studied the question. Their report is in its fourth volume.”
- **NARRATOR:** The taller visitor adds a curtsy. A passing duck receives most of it.

**Option `NER-ORD-PRE-U03-C1-YES` (correct):** PLAYER: “What do you like? A hello? A wave?”
  - **NERELLE [SURPRISED]:** “Three committees, and nobody thought to ask me.”
  - **NERELLE [PLAYFUL]:** “Hello is perfect. A wave is lovely. Bowing to ducks is discouraged.”

**Option `NER-ORD-PRE-U03-C1-NO` (wrong):** PLAYER: “Bow, obviously. You can’t go wrong bowing to royalty.”
  - **NARRATOR:** The visitors overhear and bow low. Sea protocol says a bow must be returned, so Nerelle bows back. They bow again.
  - **NERELLE [NEUTRAL]:** “This is how the last treaty signing took nine days.”

</td></tr></table>

## NER-ORD-PRE-U04 — The Gulls’ Petition

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A gull steals a bit of ribbon from a mooring post, then drops it back into the water.
- **NERELLE [NEUTRAL]:** “I think the gulls are petitioning for better harbor decorations.”
- **PLAYER:** “What does their petition say?”
- **NERELLE [PLAYFUL]:** “Mostly that they approve of unattended crumbs.”

**Option `NER-ORD-PRE-U04-C1-YES` (correct):** PLAYER: “Perhaps we should keep the quay tidy and let them find food naturally.”
  - **NERELLE [NEUTRAL]:** “The harbor birds would protest. The fish would thank you.”

**Option `NER-ORD-PRE-U04-C1-NO` (wrong):** PLAYER: “We can toss them anything they want.”
  - **NERELLE [WORRIED]:** “Please do not train the harbor to expect scraps at every railing.”

</td><td>

- **NARRATOR:** A gull lands beside Nerelle, pulls a ribbon off a post, and drops it in the water in front of her.
- **NERELLE [NEUTRAL]:** “That is the gulls’ fourth petition this week.”
- **PLAYER:** “What are they petitioning for?”
- **NERELLE [NEUTRAL]:** “Better decorations, they claim. Their actual demand is unattended crumbs.”
- **NERELLE [PLAYFUL]:** “I rejected the first three. They ate the third.”
- **NARRATOR:** The gull is now staring at your pocket.

**Option `NER-ORD-PRE-U04-C1-YES` (correct):** PLAYER: “Petition denied. My pocket stays shut.”
  - **NERELLE [PLAYFUL]:** “A united front. The fish thank you.”
  - **NARRATOR:** The gull looks at your pocket, then at your face, and appears to memorize it.

**Option `NER-ORD-PRE-U04-C1-NO` (wrong):** PLAYER: “Aw, one crumb won’t hurt. It’s only one gull.”
  - **NARRATOR:** You toss one crumb. Nine more gulls arrive.
  - **NERELLE [NEUTRAL]:** “Congratulations. You have formally recognized their government.”

</td></tr></table>

## NER-ORD-PRE-U05 — Wave Notation

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Nerelle draws an elegant curve on the wet stone with one finger.
- **NERELLE [NEUTRAL]:** “My court records current strength with marks like these. What did your world use?”
- **PLAYER:** “Usually graphs. And arguments about the graphs.”
- **NERELLE [NEUTRAL]:** “An argument is a universal scientific instrument.”

**Option `NER-ORD-PRE-U05-C1-YES` (correct):** PLAYER: “Your markings tell the story clearly. Could you show me how to read them?”
  - **NERELLE [NEUTRAL]:** “Gladly. Curiosity travels well across borders.”

**Option `NER-ORD-PRE-U05-C1-NO` (wrong):** PLAYER: “My graphs were probably better. You should switch to them.”
  - **NERELLE [WORRIED]:** “Then you have arrived with a verdict before seeing the evidence.”

</td><td>

- **NARRATOR:** Nerelle draws a long curve on the wet stone with one finger, then adds three short ticks.
- **NERELLE [NEUTRAL]:** “Current strength, in court notation. What did your world use?”
- **PLAYER:** “Graphs. And arguments about the graphs.”
- **NERELLE [PLAYFUL]:** “Ah. The argument. The one scientific instrument found in every civilization.”
- **NERELLE [NEUTRAL]:** “Three ticks means strong. *In a mood* has its own mark.”

**Option `NER-ORD-PRE-U05-C1-YES` (correct):** PLAYER: “What’s the mark for ‘in a mood’?”
  - **NARRATOR:** She draws a tight, irritable little spiral.
  - **NERELLE [PLAYFUL]:** “That one. We also use it for the treasury minister.”

**Option `NER-ORD-PRE-U05-C1-NO` (wrong):** PLAYER: “I could turn these into a proper graph for you. Axes, labels, the works.”
  - **NERELLE [NEUTRAL]:** “How generous. Which axis is the mood on?”
  - **NARRATOR:** You do not have an axis for the mood. While you think about it, the curve dries off the stone.

</td></tr></table>

## NER-ORD-PRE-U06 — The Upside-Down City (was: Reflections of the City)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** The buildings shimmer upside down in the water beside Nerelle.
- **NERELLE [NEUTRAL]:** “From down here, your city looks as if it were built beneath mine.”
- **PLAYER:** “Does that make it stranger?”
- **NERELLE [PLAYFUL]:** “Only until the next ripple. Then it belongs to both worlds for a moment.”

**Option `NER-ORD-PRE-U06-C1-YES` (correct):** PLAYER: “I like that you see something different without calling either view wrong.”
  - **NERELLE [NEUTRAL]:** “A rare compliment: one that does not demand I abandon my own view.”

**Option `NER-ORD-PRE-U06-C1-NO` (wrong):** PLAYER: “The real city is up here. The reflection is just a copy.”
  - **NERELLE [WORRIED]:** “A copy can still teach you what you missed from the shore.”

</td><td>

- **NARRATOR:** The towers above the water hang upside down in it, wobbling slightly.
- **NERELLE [NEUTRAL]:** “From down here, your city appears to be built underneath mine. Everyone is walking on the ceiling.”
- **PLAYER:** “Does it look strange?”
- **NERELLE [PLAYFUL]:** “It looks very well run. Nobody in that one has ever asked me to sign anything.”
- **NARRATOR:** A ripple passes through. The towers shiver apart and slowly reassemble.
- **NERELLE [NEUTRAL]:** “Ah. Renovations.”

**Option `NER-ORD-PRE-U06-C1-YES` (correct):** PLAYER: “Hold on. Let me look from your height.”
  - **NARRATOR:** You kneel at the edge until your chin is nearly touching the water. The upside-down towers sway in front of you.
  - **NERELLE [PLAYFUL]:** “Welcome. From here, you’re taller than the palace.”

**Option `NER-ORD-PRE-U06-C1-NO` (wrong):** PLAYER: “Technically the real city’s up here. That’s just light bouncing.”
  - **NERELLE [NEUTRAL]:** “Thank you. We have light under the sea as well. It is how we see boats coming.”
  - **NERELLE [PLAYFUL]:** “I preferred the upside-down city. It never explains things.”

</td></tr></table>

## TAV-EPI-01 — Marriage epilogue

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** The palace celebrates a wedding for two people who have been accused, separately and with convincing evidence, of talking too much.
- **TAVRI [PLAYFUL]:** "I was told the guests expected a speech from the bride. Apparently they know nothing about this family."
- **PLAYER:** "I have a spare speech if you need one."
- **TAVRI [SURPRISED]:** "You kept the original?"
- **PLAYER:** "No. This one's titled *Emergency Speech for Someone Who Is Allowed to Feel Awkward.*"
- **TAVRI [PLAYFUL]:** "A bestseller."
- **NARRATOR:** When the guests settle, Tavri steps forward. For a moment, she looks almost nervous.
- **TAVRI [WORRIED]:** "I used to believe that if I stopped making people smile, I'd lose my place among them. Today, I don't know how to make the perfect speech."
- **NARRATOR:** The room is quiet. You catch her eye; she smiles, not as a performance but as herself.
- **TAVRI [NEUTRAL]:** "I think I'll simply say I'm happy to be here, with the person I chose. That's enough."
- **NARRATOR:** It is. The crowd applauds, but this time the applause isn't the point.
- **NARRATOR:** Later in the gardens, a gossip-scroll claims the newlyweds intend to have fifty children.
- **PLAYER:** "That's a surprisingly specific rumor."
- **TAVRI [PLAYFUL]:** "Shall we begin by seeing whether we can keep one houseplant alive?"
- **PLAYER:** "I can write a maintenance schedule."
- **TAVRI [NEUTRAL]:** "And I can remind you that some things thrive without one."
- **NARRATOR:** Your story ends not with a perfect performance, but with a conversation neither of you needs to rehearse.

</td><td>

- **NARRATOR:** The Palace Court hosts a wedding for two people separately accused, with evidence, of talking too much.
- **TAVRI [PLAYFUL]:** “I’m told the guests expect a speech from the bride. As if they could stop one.”
- **PLAYER:** “I brought a spare, in case.”
- **TAVRI [SURPRISED]:** “Not the one with three key points?”
- **PLAYER:** “New one. It’s called *In Case of Awkwardness, Break Glass.*”
- **TAVRI [PLAYFUL]:** “A bestseller.”
- **NARRATOR:** When the guests settle, Tavri steps forward. Her tail gives one nervous swish.
- **TAVRI [PLAYFUL]:** “I had jokes ready. They were excellent. One of them had a goat in it.”
- **NARRATOR:** She looks at the guests, then at you, and puts her notes away.
- **TAVRI [NEUTRAL]:** “I’m happy to be here, with the person I chose.”
- **NARRATOR:** That’s the whole speech. She sits down looking extremely pleased with herself.
- **NARRATOR:** Later, in the gardens, a gossip scroll flutters down. It claims the newlyweds plan to have fifty children.
- **PLAYER:** “That’s a very specific rumor.”
- **TAVRI [PLAYFUL]:** “Let’s start smaller. One houseplant. See if it survives us.”
- **PLAYER:** “Leave it with me. I’ll draw up a maintenance schedule.”
- **TAVRI [NEUTRAL]:** “I said yes to you without one. Look how well that’s going.”
- **NARRATOR:** You buy a fern. It survives. The maintenance schedule does not.

</td></tr></table>

## TAV-EVT-POST-01 — Unscripted Comedy

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Someone in the Town Square has erected a tiny stage. A hand-painted sign announces: *Royal Comedy Showcase: Participation Voluntary, Embarrassment Inevitable.*
- **TAVRI [PLAYFUL]:** "Excellent. Finally, an event whose organizers understand their audience."
- **PLAYER:** "Are you performing?"
- **TAVRI [NEUTRAL]:** "I volunteered yesterday. Today I'm thinking I'd rather be a person in the crowd."
- **NARRATOR:** Onstage, a wizard pulls a rabbit from a hat. The rabbit takes one look at the audience and pulls the wizard back inside.
- **PLAYER:** "Tough act to follow."
- **TAVRI [WORRIED]:** "The court expects me to be effortlessly brilliant. I don't want to be brilliant on command. But I don't want to disappoint everyone, either."
- **PLAYER:** "What do you actually want?"
- **TAVRI [SURPRISED]:** "That is becoming a rather dangerous question around you."

**Option `TAV-POST-C1-CHOICE` (correct):** PLAYER: "Then don't perform. We can watch terrible jokes together. If you decide to go onstage, I'll cheer. If not, I'll still be here."
  - **TAVRI [WORRIED]:** "I think I'd like to stay. Just stay."
  - **NARRATOR:** The next comedian announces that his act is entirely improvised and immediately reads from a scroll marked *Entirely Improvised Act.*
  - **TAVRI [PLAYFUL]:** "I may have found the only performer in the kingdom less spontaneous than you."
  - **PLAYER:** "That was spontaneous and hurtful."
  - **TAVRI [NEUTRAL]:** "And I didn't need a whole stage for it."

**Option `TAV-POST-C1-PUSH` (wrong):** PLAYER: "You always make people laugh. You'll feel better as soon as you're onstage."
  - **TAVRI [NEUTRAL]:** "Maybe. But it would have been nice to decide that myself."
  - **NARRATOR:** She delivers a competent routine. Everyone applauds. Tavri thanks them, and her smile fades as the crowd disperses.

**Option `TAV-POST-C1-SHAME` (offensive):** PLAYER: "Backing out makes you look weak. A real princess wouldn't disappoint her audience."
  - **TAVRI [ANNOYED]:** "I was hoping I could be myself for once. Now I have another audience to disappoint."
  - **NARRATOR:** She steps away from you and joins the crowd alone.

</td><td>

- **NARRATOR:** Someone in the Town Square has built a very small stage. A hand-painted sign reads *Royal Comedy Showcase: Participation Voluntary, Embarrassment Inevitable.*
- **TAVRI [PLAYFUL]:** “Finally, some honest advertising.”
- **PLAYER:** “Are you going up?”
- **TAVRI [NEUTRAL]:** “I put my name down earlier. Now I’d rather be in the crowd, heckling.”
- **NARRATOR:** Up front, a wizard pulls a rabbit from a hat.
- **NARRATOR:** The rabbit takes one look at the audience and pulls the wizard back inside.
- **PLAYER:** “Tough act to follow.”
- **TAVRI [PLAYFUL]:** “That rabbit has better instincts than I do.”
- **TAVRI [NEUTRAL]:** “The court expects me to be brilliant on command. Like a lamp.”
- **TAVRI [WORRIED]:** “I don’t want to be a lamp. I don’t want to disappoint everyone, either.”
- **PLAYER:** “What do you actually want?”
- **TAVRI [SURPRISED]:** “That’s becoming a dangerous question around you.”
- **NARRATOR:** Her tail points at the stage, then at the crowd, then at you.

**Option `TAV-POST-C1-CHOICE` (correct):** PLAYER: “Go up and I’ll cheer, badly. Stay and we’ll watch terrible jokes together. I’m here either way.”
  - **TAVRI [WORRIED]:** “I think I’d like to stay. Just stay.”
  - **NARRATOR:** The next comedian announces that his act is entirely improvised.
  - **NARRATOR:** He unrolls a scroll labeled *Entirely Improvised Act* and starts reading.
  - **TAVRI [PLAYFUL]:** “Look. Someone even less spontaneous than you.”
  - **PLAYER:** “That was spontaneous and hurtful.”
  - **TAVRI [PLAYFUL]:** “And I didn’t even need the stage.”

**Option `TAV-POST-C1-PUSH` (wrong):** PLAYER: “You’re brilliant at this. You’ll feel better the second you’re up there.”
  - **TAVRI [NEUTRAL]:** “Maybe. I’d have liked to decide that myself.”
  - **NARRATOR:** She goes up and does ten tidy minutes. The crowd loves it.
  - **NARRATOR:** Coming back down, she thanks everyone. Her smile lasts almost to the bottom step.

**Option `TAV-POST-C1-SHAME` (offensive):** PLAYER: “Backing out makes you look weak. A real princess wouldn’t let her public down.”
  - **TAVRI [ANNOYED]:** “Wonderful. A review, and I didn’t even go on.”
  - **NARRATOR:** She walks off into the crowd and doesn’t look back for you.

</td></tr></table>

## TAV-EVT-PRE-01 — Fantasygram Catastrophe

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A paper bird lands beside Tavri and unfolds itself into a glowing, aggressively cheerful scroll.
- **TAVRI [PLAYFUL]:** "Fantastic. Fantasygram has delivered this week's public humiliation by express owl."
- **PLAYER:** "You have a magical account?"
- **TAVRI [ANNOYED]:** "The palace has an account. I have a public-relations emergency disguised as a hobby."
- **NARRATOR:** The scroll projects a portrait of Tavri stepping away from a royal banquet. Its caption reads: *Princess flees dinner after losing a battle with a napkin.*
- **TAVRI [SURPRISED]:** "I was helping a servant clean up a spilled tray. How did they manage to remove the servant, the tray, and every trace of context?"
- **PLAYER:** "The crop tool is the most dangerous spell in the kingdom."
- **TAVRI [PLAYFUL]:** "Finally, a scholar who understands modern sorcery."
- **NARRATOR:** Her smile fades when a second scroll appears. This one is titled *Ten Reasons the Princess Is Secretly Unfit for Polite Society.*
- **TAVRI [WORRIED]:** "If I joke about it first, perhaps nobody will notice I'm bothered. That's the usual plan."
- **PLAYER:** "And if the plan isn't working?"
- **TAVRI [NEUTRAL]:** "Then I suppose my heroic companion gets to decide whether I need a joke or a friend."

**Option `TAV-PRE-C1-SUPPORT` (correct):** PLAYER: "You don't have to perform being unbothered for me. Want help telling the real story—or want to ignore it together?"
  - **TAVRI [SURPRISED]:** "You'd let me choose? Even if my decision is profoundly unprincesslike?"
  - **PLAYER:** "Especially then."
  - **TAVRI [WORRIED]:** "I think I'd like to put the scroll away and be upset for one minute."
  - **NARRATOR:** The paper bird folds itself into a surprisingly judgmental napkin. Tavri laughs once, this time without performing for anyone.

**Option `TAV-PRE-C1-DISMISS` (wrong):** PLAYER: "It's just a rumor. Tell a better joke and everyone will forget it."
  - **TAVRI [NEUTRAL]:** "Yes. That's normally what I do."
  - **PLAYER:** "I was trying to help."
  - **TAVRI [WORRIED]:** "I know. It's simply exhausting to be offered another performance when I hoped for a moment offstage."
  - **NARRATOR:** She pockets the scroll. The conversation ends courteously, but the distance between you is noticeable.

**Option `TAV-PRE-C1-CRUEL` (offensive):** PLAYER: "Maybe they have a point. A competent princess wouldn't give them material."
  - **TAVRI [SURPRISED]:** "Oh."
  - **TAVRI [ANNOYED]:** "Thank you for demonstrating that a cruel comment is much more efficient when delivered in person."
  - **NARRATOR:** She closes the scroll and ends the conversation herself.

</td><td>

- **NARRATOR:** A folded paper owl lands beside Tavri and hoots once. Then it unfolds itself into a glowing scroll.
- **TAVRI [PLAYFUL]:** “Ah. Fantasygram. This week’s public humiliation, delivered by express owl.”
- **PLAYER:** “You’re on Fantasygram?”
- **TAVRI [ANNOYED]:** “The palace has an account. I’m its public-relations emergency.”
- **NARRATOR:** On the scroll, Tavri hurries away from a banquet table.
- **NARRATOR:** The caption reads *Princess Flees Dinner After Losing Fight with Napkin.*
- **TAVRI [SURPRISED]:** “I was helping a servant with a spilled tray! There was gravy on the ceiling!”
- **TAVRI [ANNOYED]:** “They cropped out the servant. They cropped out the tray. They kept the napkin.”
- **PLAYER:** “The crop tool. Most dangerous spell in the kingdom.”
- **TAVRI [PLAYFUL]:** “Finally, a scholar who understands modern sorcery. Point to you.”
- **NARRATOR:** A second paper owl lands. Its scroll is titled *Ten Reasons the Princess Is Secretly Unfit for Polite Society.*
- **TAVRI [PLAYFUL]:** “Ten! Busy week. Number one’s the napkin, I assume. Number two, also the napkin.”
- **TAVRI [PLAYFUL]:** “Number three, ‘laughs like a goose.’ Fair. Number four—”
- **NARRATOR:** She stops reading. Her tail has wrapped itself tight around her ankles.
- **TAVRI [WORRIED]:** “If I joke about it first, nobody notices it bothered me. That’s the usual plan.”
- **PLAYER:** “How’s the plan going?”
- **TAVRI [NEUTRAL]:** “Badly. I’m out of napkin material. Your move.”

**Option `TAV-PRE-C1-SUPPORT` (correct):** PLAYER: “Skip the joke. It’s a rotten scroll. Want to tell people the gravy story, or ignore it with me?”
  - **TAVRI [SURPRISED]:** “You’d let me pick? Even if it’s profoundly unprincesslike?”
  - **PLAYER:** “Especially then.”
  - **TAVRI [WORRIED]:** “Then I’d like to put the scroll away and be upset for one minute.”
  - **NARRATOR:** She puts it away. You wait out the minute with her. Nobody says anything clever.
  - **NARRATOR:** Then the paper owl folds itself into a napkin. A visibly judgmental napkin.
  - **TAVRI [PLAYFUL]:** “Oh, don’t *you* start.”
  - **NARRATOR:** She laughs at a napkin. Loudly. She doesn’t check who heard.

**Option `TAV-PRE-C1-DISMISS` (wrong):** PLAYER: “It’s just gossip. Hit back with something funnier and everyone will forget it.”
  - **TAVRI [NEUTRAL]:** “Something funnier. Yes. That’s what I normally do.”
  - **PLAYER:** “I was trying to help.”
  - **TAVRI [WORRIED]:** “Of course you were. I was hoping for the other one.”
  - **NARRATOR:** She pockets the scroll. The joke she makes about it later is excellent.

**Option `TAV-PRE-C1-CRUEL` (offensive):** PLAYER: “Maybe they’ve got a point. A competent princess wouldn’t give them material.”
  - **TAVRI [SURPRISED]:** “Oh.”
  - **TAVRI [ANNOYED]:** “Number eleven. Thank you. That saves them an owl.”
  - **NARRATOR:** She rolls up both scrolls and goes.

</td></tr></table>

## TAV-FIN-01 — Shared Confession (first full final marriage scene)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** The last of your conversation gives way to a rare, comfortable silence. Tavri looks at you for a long moment.
- **TAVRI [PLAYFUL]:** "Careful. That face says you're about to deliver a speech."
- **PLAYER:** "I prepared one. It's probably a mistake."
- **TAVRI [SURPRISED]:** "You prepared a speech? For me?"
- **PLAYER:** "It has a beginning, three key points, and a conclusion."
- **TAVRI [PLAYFUL]:** "My heart trembles before the power of your formatting."
- **NARRATOR:** You take out the folded paper. Suddenly every neatly arranged sentence seems like a place to hide.
- **PLAYER:** "Actually... I don't want to read it."
- **TAVRI [WORRIED]:** "You can take your time. You don't have to be clever with me."
- **PLAYER:** "That's the point. I came here trying to become the sort of person who could win a princess's affection. You kept showing me that I don't need a perfect line to care about someone."
- **TAVRI [NEUTRAL]:** "And you showed me that someone can stay when the show is over."
- **NARRATOR:** Tavri's tail flicks once. She waits. This time neither of you can blame the silence on a failed joke.

**Option `TAV-FIN-C1-PARTNERS` (correct):** PLAYER: "Tavri, I love the clever things you say. I love the moments you don't know what to say, too. Would you choose to marry me—and keep figuring things out together, as equals?"
  - **TAVRI [SURPRISED]:** "That was disastrously unscripted."
  - **PLAYER:** "I know."
  - **TAVRI [WORRIED]:** "You didn't promise I'd never be frightened again."
  - **PLAYER:** "I couldn't promise that honestly."
  - **TAVRI [PLAYFUL]:** "Good. Because I'd have asked for references."
  - **NARRATOR:** She takes your hand.
  - **TAVRI [NEUTRAL]:** "Yes, {PLAYER}. I choose you. And I would like us both to keep choosing."
  - **NARRATOR:** Your carefully prepared speech slips into the fountain. Neither of you retrieves it.

**Option `TAV-FIN-C1-ROLE` (wrong):** PLAYER: "Marry me, and I'll make sure you're always everyone's favorite princess. You'll never have to disappoint them again."
  - **TAVRI [WORRIED]:** "That's a lovely-sounding cage."
  - **PLAYER:** "I wanted to make you happy."
  - **TAVRI [NEUTRAL]:** "Then please hear me: I don't want to be a flawless princess in your care. I want to be a person beside you."
  - **NARRATOR:** She doesn't close the door on your future, but she cannot answer yes to those words.

**Option `TAV-FIN-C1-PERFORM` (wrong):** PLAYER: "If you say yes, we'll be the most entertaining royal couple in history. Just imagine the applause."
  - **TAVRI [ANNOYED]:** "I can imagine it. I can also imagine us becoming strangers the moment the curtain falls."
  - **TAVRI [WORRIED]:** "Please ask me because you want a life with me. Not because you want an audience."

</td><td>

- **NARRATOR:** The conversation winds down to the sound of the fountain. Nobody rushes to fill the quiet.
- **TAVRI [PLAYFUL]:** “Careful. That’s your speech face.”
- **PLAYER:** “I did prepare one. It might be a mistake.”
- **TAVRI [SURPRISED]:** “A speech? For me? Is there a handout?”
- **PLAYER:** “It has a beginning, three key points and a conclusion.”
- **TAVRI [PLAYFUL]:** “My heart trembles before your formatting.”
- **NARRATOR:** You unfold the paper. Every tidy sentence on it looks like somewhere to hide.
- **PLAYER:** “Actually… I don’t want to read it.”
- **TAVRI [NEUTRAL]:** “Take your time. Skip the clever bits. I’ve got plenty coming out of my ears.”
- **PLAYER:** “I came here trying to become someone who could win a princess.”
- **PLAYER:** “You kept showing me I didn’t need a perfect line to care about someone.”
- **TAVRI [NEUTRAL]:** “And you showed me someone can stay after the last joke.”
- **NARRATOR:** Her tail flicks once. Then she waits.

**Option `TAV-FIN-C1-PARTNERS` (correct):** PLAYER: “I love your clever lines, and the moments you run out of them. Will you marry me, and work out the rest as equals?”
  - **TAVRI [SURPRISED]:** “That was disastrously unscripted.”
  - **PLAYER:** “I know.”
  - **TAVRI [WORRIED]:** “You didn’t promise I’d never be frightened again.”
  - **PLAYER:** “I couldn’t promise that honestly.”
  - **TAVRI [PLAYFUL]:** “Good. I’d have asked for references.”
  - **NARRATOR:** She takes your hand.
  - **TAVRI [NEUTRAL]:** “Yes, {PLAYER}. I choose you too.”
  - **TAVRI [PLAYFUL]:** “That’s my whole speech. One point. No conclusion.”
  - **NARRATOR:** Your prepared speech slips off the edge of the fountain. Nobody fishes it out.

**Option `TAV-FIN-C1-ROLE` (wrong):** PLAYER: “Marry me, and I’ll make sure you’re always everyone’s favorite princess. Nobody will ever be disappointed in you.”
  - **TAVRI [WORRIED]:** “That’s a lovely-sounding cage.”
  - **PLAYER:** “I wanted to make you happy.”
  - **TAVRI [NEUTRAL]:** “Then listen. I don’t want to be a flawless princess in your care. I want to be a person beside you.”
  - **NARRATOR:** She doesn’t walk away. She doesn’t say yes, either.

**Option `TAV-FIN-C1-PERFORM` (wrong):** PLAYER: “Say yes and we’ll be the funniest royal couple in history. Imagine the applause.”
  - **TAVRI [ANNOYED]:** “I can imagine it. I can also imagine us as strangers the minute the curtain falls.”
  - **TAVRI [WORRIED]:** “Ask me because you want a life with me. Not a double act.”

</td></tr></table>

## TAV-FIN-RETRY-01 — Shared Confession follow-up (marriage retry)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **TAVRI [NEUTRAL]:** "I haven't forgotten what you asked me. I also haven't forgotten why I couldn't say yes."
- **PLAYER:** "You wanted to be a person beside me, not a role I could protect or show off."
- **TAVRI [WORRIED]:** "I did. And I still need you to mean it."

**Option `TAV-FR-C1-EQUAL` (correct):** PLAYER: "I want to marry you because I love who you are when nobody is watching. We would choose our future together. Would you still like that future with me?"
  - **TAVRI [SURPRISED]:** "That's what I hoped you meant."
  - **TAVRI [PLAYFUL]:** "And not one numbered point. I'm proud of you."
  - **TAVRI [NEUTRAL]:** "Yes, {PLAYER}. Let's choose it together."

**Option `TAV-FR-C1-PROMISE` (wrong):** PLAYER: "I promise I'll never let you have another bad day if you marry me."
  - **TAVRI [WORRIED]:** "Then you'd be making a promise no one can keep. I need honesty, even when the answer is difficult."
  - **NARRATOR:** She gives you time to reconsider rather than accepting a promise neither of you believes.

</td><td>

- **TAVRI [NEUTRAL]:** “I haven’t forgotten what you asked me. Or why I couldn’t say yes.”
- **PLAYER:** “You want to be a person beside me. Not a role I protect, or show off.”
- **TAVRI [WORRIED]:** “Yes. And I still need you to mean it.”

**Option `TAV-FR-C1-EQUAL` (correct):** PLAYER: “I want to marry the person you are when nobody’s watching. We choose our future together. Would you still want that?”
  - **TAVRI [SURPRISED]:** “That’s what I hoped you meant.”
  - **TAVRI [PLAYFUL]:** “And not one numbered point. Who are you?”
  - **TAVRI [NEUTRAL]:** “Yes, {PLAYER}. Let’s choose it together.”

**Option `TAV-FR-C1-PROMISE` (wrong):** PLAYER: “Marry me, and I promise you’ll never have another bad day.”
  - **TAVRI [WORRIED]:** “Never? That’s a promise nobody can keep.”
  - **TAVRI [NEUTRAL]:** “I’ve met days, {PLAYER}. They don’t take orders.”
  - **NARRATOR:** She waits to see whether you’ll try again.

</td></tr></table>

## TAV-MID-01 — The Private Confession (first full midpoint attempt)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Tavri walks beside you until the noise of the court fades behind a hedge. The Royal Gardens are quiet enough to hear the fountain miss a beat.
- **TAVRI [PLAYFUL]:** "Congratulations. You've earned the rare privilege of my exclusive, invitation-only silence. Reviews are mixed."
- **PLAYER:** "Should I clap?"
- **TAVRI [PLAYFUL]:** "Please don't. I've had quite enough clapping for one lifetime."
- **NARRATOR:** She studies the reflection in the water. Her tail has gone still.
- **TAVRI [WORRIED]:** "Do you know what happens when you're the amusing princess? People don't ask if you're all right. They ask when you're going to be amusing again."
- **PLAYER:** "That sounds lonely."
- **TAVRI [NEUTRAL]:** "It's comfortable, if you never leave the stage. I can make a court laugh. I can turn a scandal into a story."
- **TAVRI [WORRIED]:** "I don't know whether anyone would stay if I had nothing clever left to say."
- **NARRATOR:** For once she does not rescue the silence with a joke.

**Option `TAV-MID-C1-MUTUAL` (correct):** PLAYER: "I hide behind being useful. Where I come from, I kept trying to prove I deserved a place. I don't always know who I am when I'm not succeeding. But I'd still want to sit here with you, even if neither of us said anything clever."
  - **TAVRI [SURPRISED]:** "You? The person who can explain an entire disaster as if it were a tidy list?"
  - **PLAYER:** "The lists are how you know I'm panicking."
  - **TAVRI [WORRIED]:** "That is an alarming amount of honesty for one bench."
  - **PLAYER:** "We could stop."
  - **TAVRI [NEUTRAL]:** "No. I think I'd like to try something."
  - **NARRATOR:** Tavri lowers her voice. "I had a miserable day," she says, plainly. Nothing sparkles. No audience applauds.
  - **PLAYER:** "I'm sorry. Want to tell me about it?"
  - **TAVRI [PLAYFUL]:** "Only if you promise not to file a quarterly report on my feelings."
  - **NARRATOR:** You remain by the fountain. The conversation is not impressive. It is better than that.

**Option `TAV-MID-C1-REASSURE` (wrong):** PLAYER: "That's ridiculous. Everyone loves you. You're the funniest person in the kingdom."
  - **TAVRI [WORRIED]:** "That's precisely the part I'm worried about."
  - **PLAYER:** "I meant it kindly."
  - **TAVRI [NEUTRAL]:** "I know. Perhaps we can talk about it when I find better words."

**Option `TAV-MID-C1-PERFORM` (wrong):** PLAYER: "Then never let them see you slip. I can help you write better jokes."
  - **TAVRI [ANNOYED]:** "I asked whether you would stay if I stopped performing. You offered to improve the show."
  - **PLAYER:** "I didn't hear what you were really asking."
  - **TAVRI [NEUTRAL]:** "Maybe next time."

</td><td>

- **NARRATOR:** Tavri walks with you until the noise of the court is behind a hedge.
- **NARRATOR:** The Royal Gardens are so quiet you can hear the fountain hiccup.
- **TAVRI [PLAYFUL]:** “Congratulations. You’ve been granted my exclusive, invitation-only silence. Reviews are mixed.”
- **PLAYER:** “Should I clap?”
- **TAVRI [PLAYFUL]:** “Please don’t. I’ve been clapped at enough for one lifetime.”
- **NARRATOR:** She sits on the edge of the fountain. Her tail, which never stops, stops.
- **TAVRI [NEUTRAL]:** “Do you know what happens when you’re the funny princess?”
- **TAVRI [WORRIED]:** “Nobody asks if you’re all right. They ask when you’ll be funny again.”
- **PLAYER:** “That sounds lonely.”
- **TAVRI [NEUTRAL]:** “It’s comfortable, as long as you never stop.”
- **TAVRI [PLAYFUL]:** “I can make a whole court laugh. I once made a tax collector laugh. During an audit.”
- **TAVRI [WORRIED]:** “And I don’t know if anyone would stay if I ran out of clever things to say.”
- **NARRATOR:** She waits for the joke that usually comes next. It doesn’t come.

**Option `TAV-MID-C1-MUTUAL` (correct):** PLAYER: “Can I tell you something? I hide behind being useful.”
  - **PLAYER:** “Before I came here, I got turned down for job after job. I kept thinking that if I was useful enough, I’d finally earn a place.”
  - **PLAYER:** “When I’m not succeeding at something, I don’t know who I am.”
  - **PLAYER:** “But I’d sit here with you even if neither of us said anything clever.”
  - **TAVRI [SURPRISED]:** “You? You explain disasters as tidy little lists.”
  - **PLAYER:** “The lists are how you know I’m panicking.”
  - **TAVRI [WORRIED]:** “That’s an alarming amount of honesty for one fountain.”
  - **PLAYER:** “We can stop.”
  - **TAVRI [NEUTRAL]:** “No. I want to try something.”
  - **TAVRI [NEUTRAL]:** “I had a miserable day.”
  - **NARRATOR:** Nothing sparkles after it. She looks startled that she let the sentence out unsupervised.
  - **PLAYER:** “I’m sorry. Want to tell me about it?”
  - **TAVRI [PLAYFUL]:** “Only if you promise not to file a quarterly report on my feelings.”
  - **NARRATOR:** She tells you about it. None of it is funny.
  - **NARRATOR:** Somewhere around the part with the soup, her tail starts moving again.

**Option `TAV-MID-C1-REASSURE` (wrong):** PLAYER: “That’s ridiculous. Everyone adores you. You’re the funniest person in the kingdom.”
  - **TAVRI [WORRIED]:** “Yes. That’s the part I’m worried about.”
  - **PLAYER:** “I meant it kindly.”
  - **TAVRI [NEUTRAL]:** “Oh, I know you did.”
  - **TAVRI [PLAYFUL]:** “Anyway! Have I told you about the duke and the soup?”
  - **NARRATOR:** Her tail is moving again, a little too fast.

**Option `TAV-MID-C1-PERFORM` (wrong):** PLAYER: “Then we make sure you never run out. I’ll help you write new material.”
  - **TAVRI [ANNOYED]:** “I asked if you’d stay when the jokes run out. You offered to improve the show.”
  - **PLAYER:** “That wasn’t what you were asking.”
  - **TAVRI [NEUTRAL]:** “No.”
  - **NARRATOR:** She stands, brushes herself off, and is charming all the way back past the hedge.

</td></tr></table>

## TAV-MID-RETRY-01 — Private Confession follow-up (midpoint retry)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **TAVRI [NEUTRAL]:** "About that conversation by the fountain. I don't need a speech. I think I need to know whether you heard me."
- **PLAYER:** "I did. It took me longer than it should have."
- **TAVRI [WORRIED]:** "Then tell me what you heard. No flourish, please."

**Option `TAV-MR-C1-LISTEN` (correct):** PLAYER: "You're afraid that when the jokes stop, people stop choosing you. I've hidden my own fears behind trying to be useful. I don't want you to have to earn my company."
  - **TAVRI [SURPRISED]:** "That is... exactly it."
  - **TAVRI [PLAYFUL]:** "And I've just heard you say several sentences without accidentally making a presentation. We're both growing."
  - **NARRATOR:** She reaches for your hand, briefly, without looking toward an audience.

**Option `TAV-MR-C1-ADVISE` (wrong):** PLAYER: "You need to stop caring what other people think. Problem solved."
  - **TAVRI [ANNOYED]:** "You make a rather ambitious claim about solving feelings."
  - **TAVRI [NEUTRAL]:** "Perhaps we should try again another day."

</td><td>

- **TAVRI [NEUTRAL]:** “About the fountain. I don’t need a speech. I need to know if you heard me.”
- **PLAYER:** “I did. It took me a while.”
- **TAVRI [WORRIED]:** “Then tell me what you heard. No flourish.”

**Option `TAV-MR-C1-LISTEN` (correct):** PLAYER: “You think that when the jokes stop, people stop choosing you.”
  - **PLAYER:** “And I hide behind being useful. I’ve done it my whole life.”
  - **PLAYER:** “I don’t want you to earn my company.”
  - **TAVRI [SURPRISED]:** “That’s… exactly it.”
  - **TAVRI [PLAYFUL]:** “And you said it without a presentation. Not one diagram.”
  - **NARRATOR:** She takes your hand. Briefly. Then a little longer than briefly.

**Option `TAV-MR-C1-ADVISE` (wrong):** PLAYER: “Easy fix: stop caring what people think. Problem solved.”
  - **TAVRI [ANNOYED]:** “Problem solved. Marvelous. I’ll stop at once.”
  - **TAVRI [NEUTRAL]:** “Try me again another day. Bring fewer solutions.”

</td></tr></table>

## TAV-ORD-POST-F01 — Invitation Without a Script

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Tavri holds out a blank scrap of paper like a formal invitation.
- **TAVRI [PLAYFUL]:** “You are invited to an extremely exclusive occasion: a conversation with no itinerary.”
- **PLAYER:** “What is the dress code?”
- **TAVRI [NEUTRAL]:** “Comfortable uncertainty.”

**Option `TAV-ORD-POST-F01-C1-YES` (correct):** PLAYER: “I accept, no agenda required.”
  - **TAVRI [PLAYFUL]:** “Splendid. I shall be the least prepared hostess in history.”

**Option `TAV-ORD-POST-F01-C1-NO` (wrong):** PLAYER: “At least write a few jokes beforehand.”
  - **TAVRI [WORRIED]:** “That seems to defeat the purpose of this exclusive event.”

</td><td>

- **NARRATOR:** Tavri hands you a blank scrap of paper. There is tremendous ceremony.
- **TAVRI [PLAYFUL]:** “You are cordially invited to a conversation. There is no itinerary.”
- **PLAYER:** “What’s the dress code?”
- **TAVRI [PLAYFUL]:** “Whatever you’re wearing. Theme: none. Refreshments: also none.”
- **NARRATOR:** You check the back for an agenda. There isn’t one.
- **TAVRI [NEUTRAL]:** “I saw that.”

**Option `TAV-ORD-POST-F01-C1-YES` (correct):** PLAYER: “I accept. I’ll try very hard not to bring a list.”
  - **TAVRI [SURPRISED]:** “You’ve already got one, haven’t you.”
  - **PLAYER:** “It’s short.”
  - **TAVRI [PLAYFUL]:** “Fine. Item one: no items.”

**Option `TAV-ORD-POST-F01-C1-NO` (wrong):** PLAYER: “Sure. Want to jot down a few jokes first, so it doesn’t drag?”
  - **TAVRI [NEUTRAL]:** “A few jokes. For the conversation with no itinerary.”
  - **NARRATOR:** She writes some on the back of the invitation. It isn’t blank anymore.

</td></tr></table>

## TAV-ORD-POST-F02 — Sensible Shoes

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Tavri glances at her elegant shoes with theatrical suspicion.
- **TAVRI [PLAYFUL]:** “These are excellent for entrances and terrible for leaving a room discreetly.”
- **PLAYER:** “What would you choose instead?”
- **TAVRI [NEUTRAL]:** “Something that lets me decide where to go next.”

**Option `TAV-ORD-POST-F02-C1-YES` (correct):** PLAYER: “Then choose what lets you move comfortably.”
  - **TAVRI [PLAYFUL]:** “Good. You shall be my adviser in the shocking field of practical decisions.”

**Option `TAV-ORD-POST-F02-C1-NO` (wrong):** PLAYER: “Appearances first. A princess should endure them.”
  - **TAVRI [WORRIED]:** “I have endured quite enough for a small pair of shoes.”

</td><td>

- **NARRATOR:** Tavri lifts one foot and glares at her shoe.
- **NARRATOR:** It has a heel like a nail and a bow the size of a cabbage.
- **TAVRI [PLAYFUL]:** “These are marvelous for entrances. Everyone hears me coming.”
- **TAVRI [NEUTRAL]:** “They’re useless for exits. Everyone hears me going.”
- **PLAYER:** “What would you rather wear?”
- **TAVRI [PLAYFUL]:** “Something that can slip out of a dull party. Slippers. Socks. A small cart.”

**Option `TAV-ORD-POST-F02-C1-YES` (correct):** PLAYER: “Get the slippers. I’ll walk loudly next to you as a decoy.”
  - **TAVRI [PLAYFUL]:** “A decoy! You’re hired. Royal adviser for practical footwear.”
  - **NARRATOR:** She’s already untying the cabbage.

**Option `TAV-ORD-POST-F02-C1-NO` (wrong):** PLAYER: “But they’re fantastic shoes. Isn’t that worth a bit of hobbling?”
  - **TAVRI [NEUTRAL]:** “A bit. Yes.”
  - **NARRATOR:** She sets her foot down with a click. All the way out, everyone hears her going.

</td></tr></table>

## TAV-ORD-POST-F03 — The Space Between Jokes

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Tavri starts to raise an eyebrow, then lets the joke pass.
- **TAVRI [PLAYFUL]:** “I was going to make fun of that sign, but perhaps I just want to look at it.”
- **PLAYER:** “You can do that.”
- **TAVRI [NEUTRAL]:** “You say that as though leisure were legal.”

**Option `TAV-ORD-POST-F03-C1-YES` (correct):** PLAYER: “I like the moments between your jokes, too.”
  - **TAVRI [PLAYFUL]:** “Then I will stop trying to make every moment earn its place.”

**Option `TAV-ORD-POST-F03-C1-NO` (wrong):** PLAYER: “You are getting less entertaining.”
  - **TAVRI [WORRIED]:** “I would rather be honestly dull than endlessly on command.”

</td><td>

- **NARRATOR:** Someone has pinned up a hand-lettered notice: *PLEASE DO NOT TUOCH.*
- **NARRATOR:** Tavri’s ears go up. She opens her mouth, glances at you, and closes it again.
- **TAVRI [NEUTRAL]:** “I have a joke about that sign. A good one.”
- **TAVRI [PLAYFUL]:** “I’ve been holding it for a full minute. It’s getting heavy.”
- **PLAYER:** “Why are you holding it?”
- **TAVRI [NEUTRAL]:** “I’m practicing being a princess who can walk past a typo. It’s agony.”

**Option `TAV-ORD-POST-F03-C1-YES` (correct):** PLAYER: “Walking past it is optional. Tell me the joke.”
  - **TAVRI [SURPRISED]:** “Really?”
  - **TAVRI [PLAYFUL]:** “Right. Whoever wrote this sign has clearly never been tuoched by greatness.”
  - **NARRATOR:** It’s terrible. You laugh anyway, properly, and she looks as if she has won something.

**Option `TAV-ORD-POST-F03-C1-NO` (wrong):** PLAYER: “You don’t have to be funny with me, you know.”
  - **TAVRI [NEUTRAL]:** “I know. I wanted to be.”
  - **NARRATOR:** She walks past the sign. The joke stays where it is, unspent.

</td></tr></table>

## TAV-ORD-POST-U01 — A Comfortable Silence

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** For once, the nearby conversation fades without Tavri racing to fill it.
- **TAVRI [PLAYFUL]:** “We have reached that notorious stage of friendship where nobody has said anything clever for a full minute.”
- **PLAYER:** “Should I panic?”
- **TAVRI [NEUTRAL]:** “Only if you have brought an emergency trumpet.”

**Option `TAV-ORD-POST-U01-C1-YES` (correct):** PLAYER: “We can keep the silence. I like being here with you.”
  - **TAVRI [PLAYFUL]:** “Good. I had almost forgotten how lovely an unscripted pause can be.”

**Option `TAV-ORD-POST-U01-C1-NO` (wrong):** PLAYER: “I can invent a joke if you need entertaining.”
  - **TAVRI [WORRIED]:** “You see? Even our silence has acquired a stage manager.”

</td><td>

- **NARRATOR:** The conversation runs out. Tavri lets it.
- **TAVRI [PLAYFUL]:** “Do you realize neither of us has said anything clever for a full minute?”
- **PLAYER:** “Should I panic?”
- **TAVRI [PLAYFUL]:** “Only if you brought an emergency lute.”
- **TAVRI [NEUTRAL]:** “I’m going for two minutes. That one didn’t count. It was commentary.”
- **NARRATOR:** Her tail twitches toward a joke, then settles.

**Option `TAV-ORD-POST-U01-C1-YES` (correct):** PLAYER: “Go for three. I’ve got nowhere better to be.”
  - **NARRATOR:** You make it to three. Somewhere in the second minute, her shoulder bumps against yours and stays.
  - **TAVRI [PLAYFUL]:** “Three minutes. Palace record. I’ll have it engraved somewhere small.”

**Option `TAV-ORD-POST-U01-C1-NO` (wrong):** PLAYER: “Don’t worry, I’ve got a joke ready if it gets slow.”
  - **TAVRI [NEUTRAL]:** “Oh. Go on, then.”
  - **NARRATOR:** You tell it. She laughs at exactly the right moment, the way she does at court.

</td></tr></table>

## TAV-ORD-POST-U02 — The Badly Drawn Map

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Tavri unrolls a map of the palace whose hallways have been annotated with tiny jokes.
- **TAVRI [PLAYFUL]:** “This corridor is labeled “certain doom.” It leads to a linen cupboard.”
- **PLAYER:** “Did you make this?”
- **TAVRI [NEUTRAL]:** “Anonymously. The laundry staff deserves their own legend.”

**Option `TAV-ORD-POST-U02-C1-YES` (correct):** PLAYER: “The jokes are funny, but maybe let the staff decide whether to share them.”
  - **TAVRI [PLAYFUL]:** “Fair. I would rather give someone a laugh than make them the punch line.”

**Option `TAV-ORD-POST-U02-C1-NO` (wrong):** PLAYER: “You should publish it with everyone’s names beside their mistakes.”
  - **TAVRI [WORRIED]:** “That would turn a silly map into a list of targets.”

</td><td>

- **NARRATOR:** Tavri unrolls a hand-drawn map of the palace. Every corridor has a joke written beside it.
- **TAVRI [PLAYFUL]:** “This corridor is labeled *certain doom.* It leads to a linen cupboard.”
- **PLAYER:** “Did you make this?”
- **TAVRI [NEUTRAL]:** “Anonymously. With my name on the back, in case it got popular.”
- **TAVRI [PLAYFUL]:** “Here’s the stair that ate a duke’s dignity. And here’s where the laundry staff nap.”
- **NARRATOR:** The nap spot is marked with a tiny, very accurate drawing of three people asleep on folded towels.

**Option `TAV-ORD-POST-U02-C1-YES` (correct):** PLAYER: “It’s great. Maybe ask the laundry before you publish their nap spot?”
  - **TAVRI [SURPRISED]:** “Oh. That’s their one hiding place, isn’t it?”
  - **TAVRI [PLAYFUL]:** “Private edition for the laundry, then. *Certain doom* stays.”

**Option `TAV-ORD-POST-U02-C1-NO` (wrong):** PLAYER: “This is brilliant. Copy it and hang one in every corridor.”
  - **NARRATOR:** She looks delighted for exactly as long as it takes to find the nap spot.
  - **TAVRI [NEUTRAL]:** “Maybe not every corridor.”
  - **NARRATOR:** She rolls the map up tight and tucks it away.

</td></tr></table>

## TAV-ORD-POST-U03 — A Blank Playbill

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Someone has left a blank playbill near the princess.
- **TAVRI [PLAYFUL]:** “There are no instructions on it. I find that more intimidating than opening night.”
- **PLAYER:** “What would you put on the program?”
- **TAVRI [NEUTRAL]:** “Perhaps one scene in which everyone can be ordinary and nobody leaves.”

**Option `TAV-ORD-POST-U03-C1-YES` (correct):** PLAYER: “We could call it “A Day with No Auditions.””
  - **TAVRI [PLAYFUL]:** “A terrible title for ticket sales. A perfect title for us.”

**Option `TAV-ORD-POST-U03-C1-NO` (wrong):** PLAYER: “Your greatest speeches, obviously. People want the highlights.”
  - **TAVRI [WORRIED]:** “Perhaps. But I would like a few moments that are not highlights.”

**Option `TAV-ORD-POST-U03-C1-OFF` (offensive):** PLAYER: “You are only worth spending time with when you entertain me.”
  - **TAVRI [ANNOYED]:** “Then our time together will be shorter than you expect.”

</td><td>

- **NARRATOR:** Someone has left a blank playbill lying around. Tavri picks it up like it might bite.
- **TAVRI [PLAYFUL]:** “No title. No cast list. Not even a warning about the interval.”
- **PLAYER:** “What would you put on it?”
- **TAVRI [PLAYFUL]:** “Act one, a princess says something clever. Act two, something cleverer. Act three—”
- **NARRATOR:** She stops.
- **TAVRI [NEUTRAL]:** “Act three, two people sit somewhere, and nobody leaves at the interval.”
- **NARRATOR:** She underlines act three. Twice.

**Option `TAV-ORD-POST-U03-C1-YES` (correct):** PLAYER: “Call it *A Day with No Auditions.* Short run. Very exclusive.”
  - **TAVRI [PLAYFUL]:** “Dreadful title. Nobody will buy a ticket.”
  - **NARRATOR:** She writes it across the top anyway, in her best handwriting.

**Option `TAV-ORD-POST-U03-C1-NO` (wrong):** PLAYER: “Put your best lines in. Everyone loves a greatest hits.”
  - **TAVRI [PLAYFUL]:** “Greatest hits. Naturally. Track one: the napkin.”
  - **NARRATOR:** She fills it in under a minute. Every line is a good one. Act three doesn’t make the cut.

**Option `TAV-ORD-POST-U03-C1-OFF` (offensive):** PLAYER: “You’re only worth the time when you’re being funny.”
  - **TAVRI [ANNOYED]:** “Then I’ll save you the dull part.”
  - **NARRATOR:** She leaves the playbill blank and goes.

</td></tr></table>

## TAV-ORD-POST-U04 — The Unfinished Joke

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Tavri starts a joke, then stops halfway, smiling at the absurdity.
- **TAVRI [PLAYFUL]:** “A fox princess walks into a—oh, I have forgotten the ending.”
- **PLAYER:** “Do you want help remembering?”
- **TAVRI [NEUTRAL]:** “Not particularly. I am enjoying the fact that nothing terrible has happened.”

**Option `TAV-ORD-POST-U04-C1-YES` (correct):** PLAYER: “Then the joke can stay unfinished.”
  - **TAVRI [PLAYFUL]:** “You are dangerously easy to be imperfect around.”

**Option `TAV-ORD-POST-U04-C1-NO` (wrong):** PLAYER: “Try harder. The setup deserves a better ending.”
  - **TAVRI [WORRIED]:** “It seems the pressure has returned for an encore.”

</td><td>

- **TAVRI [PLAYFUL]:** “A fox princess walks into a—”
- **NARRATOR:** Her ears swivel, as if the ending might be lying around nearby.
- **TAVRI [SURPRISED]:** “I’ve forgotten the end.”
- **PLAYER:** “Want help remembering?”
- **TAVRI [NEUTRAL]:** “No. I want to see if anything terrible happens.”
- **NARRATOR:** Nothing terrible happens. Somewhere, a door closes. That’s all.

**Option `TAV-ORD-POST-U04-C1-YES` (correct):** PLAYER: “Leave it. ‘A fox princess walks into a.’ That’s the whole joke.”
  - **TAVRI [PLAYFUL]:** “Experimental. Ahead of its time.”
  - **TAVRI [NEUTRAL]:** “A fox princess walks into a.”
  - **NARRATOR:** You laugh. Her tail does a smug little loop.

**Option `TAV-ORD-POST-U04-C1-NO` (wrong):** PLAYER: “That setup needs an ending, though. Bakery? Library? Duck pond?”
  - **TAVRI [NEUTRAL]:** “Bakery.”
  - **TAVRI [PLAYFUL]:** “A fox princess walks into a bakery and asks for a scone with no expectations. They’re out.”
  - **NARRATOR:** She watches your face until you laugh.

</td></tr></table>

## TAV-ORD-POST-U05 — Weather Without Metaphors

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A breeze lifts Tavri’s hair, and she waits as if preparing a grand pronouncement.
- **TAVRI [PLAYFUL]:** “I was about to compare the wind to the ambitions of kings.”
- **PLAYER:** “And then?”
- **TAVRI [NEUTRAL]:** “Then I remembered it is just wind, and it is pleasant.”

**Option `TAV-ORD-POST-U05-C1-YES` (correct):** PLAYER: “We can enjoy it without making it mean something.”
  - **TAVRI [PLAYFUL]:** “A lovely revolutionary philosophy, {PLAYER}.”

**Option `TAV-ORD-POST-U05-C1-NO` (wrong):** PLAYER: “A proper princess should turn every moment into a story.”
  - **TAVRI [WORRIED]:** “That is exactly the habit I am trying to put down.”

</td><td>

- **NARRATOR:** A breeze comes through an open window. Tavri lifts her chin, ready to say something grand about it.
- **TAVRI [PLAYFUL]:** “The wind, like the ambitions of kings, is restless and—”
- **TAVRI [NEUTRAL]:** “No. It’s wind. It’s nice.”
- **NARRATOR:** Her ears tip back to catch more of it.
- **PLAYER:** “What about the kings?”
- **TAVRI [PLAYFUL]:** “The kings can find their own breeze.”

**Option `TAV-ORD-POST-U05-C1-YES` (correct):** PLAYER: “It *is* nice. Let’s stand in it for a bit.”
  - **NARRATOR:** You stand in it. It is, as reported, nice.
  - **TAVRI [PLAYFUL]:** “Look at us. Two people, one window, no subtext.”

**Option `TAV-ORD-POST-U05-C1-NO` (wrong):** PLAYER: “Ooh, my turn. The wind is like the job market: it never tells you which way it’s going.”
  - **TAVRI [NEUTRAL]:** “Mm. Very good.”
  - **NARRATOR:** She nods at your metaphor the way she nods at ambassadors. The breeze moves on without either of you.

</td></tr></table>

## TAV-ORD-POST-U06 — An Ordinary Laugh

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Tavri laughs suddenly at a minor inconvenience, unpolished and unmistakably sincere.
- **TAVRI [PLAYFUL]:** “Oh, that was an awful noise. My public image may never recover.”
- **PLAYER:** “It sounded like you were having fun.”
- **TAVRI [NEUTRAL]:** “An outrageous accusation.”

**Option `TAV-ORD-POST-U06-C1-YES` (correct):** PLAYER: “I hope I get to hear that laugh again, if you feel like it.”
  - **TAVRI [PLAYFUL]:** “You probably will. It keeps escaping when you are around.”

**Option `TAV-ORD-POST-U06-C1-NO` (wrong):** PLAYER: “Practice a more elegant one for the court.”
  - **TAVRI [WORRIED]:** “I think I have practiced enough for one lifetime.”

</td><td>

- **NARRATOR:** A button pops off Tavri’s cuff, bounces off your nose, and lands in your pocket.
- **NARRATOR:** Tavri laughs. It’s a loud, startled honk, nothing like her court laugh.
- **TAVRI [SURPRISED]:** “Oh no. That was awful. That was a goose.”
- **TAVRI [PLAYFUL]:** “My reputation’s finished. Tell the chroniclers I honked.”
- **PLAYER:** “You sounded like you were having fun.”
- **TAVRI [PLAYFUL]:** “Outrageous accusation.”

**Option `TAV-ORD-POST-U06-C1-YES` (correct):** PLAYER: “Keep the polished one for court. I’ll take the goose.”
  - **TAVRI [PLAYFUL]:** “You’ll get it whether you like it or not. It keeps escaping around you.”
  - **TAVRI [NEUTRAL]:** “Also, you have my button.”

**Option `TAV-ORD-POST-U06-C1-NO` (wrong):** PLAYER: “Ha! Maybe practice a quieter one for court, though?”
  - **TAVRI [NEUTRAL]:** “Quieter. Noted.”
  - **NARRATOR:** She demonstrates. It’s a lovely laugh, with no goose in it anywhere.

</td></tr></table>

## TAV-ORD-PRE-F01 — A Speech for One Cloud (was: An Unrequested Encore)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Tavri taps two fingers against her sleeve as if hearing invisible stage music.
- **TAVRI [PLAYFUL]:** “I nearly delivered a speech about the weather. A full speech. To one cloud.”
- **PLAYER:** “Was the cloud impressed?”
- **TAVRI [NEUTRAL]:** “It refused to offer constructive criticism.”

**Option `TAV-ORD-PRE-F01-C1-YES` (correct):** PLAYER: “Perhaps the cloud just wanted company, not a show.”
  - **TAVRI [PLAYFUL]:** “Remarkably mature of it. I shall try the same.”

**Option `TAV-ORD-PRE-F01-C1-NO` (wrong):** PLAYER: “You should have done the speech. I would rate it.”
  - **TAVRI [WORRIED]:** “I was hoping to avoid a second critic today.”

</td><td>

- **NARRATOR:** Tavri is tapping two fingers on her sleeve, in time with music nobody is playing.
- **TAVRI [PLAYFUL]:** “I nearly gave a speech just now. About the weather. To one cloud.”
- **PLAYER:** “How did it go?”
- **TAVRI [NEUTRAL]:** “It drifted off during the introduction.”
- **TAVRI [PLAYFUL]:** “Shame. I had a whole section on drizzle.”

**Option `TAV-ORD-PRE-F01-C1-YES` (correct):** PLAYER: “Clouds don’t want speeches. They want someone to point and say it looks like a rabbit.”
  - **TAVRI [SURPRISED]:** “It does look like a rabbit.”
  - **TAVRI [PLAYFUL]:** “A smug one. It definitely heard the drizzle section.”
  - **NARRATOR:** You watch it together until it stops looking like anything.

**Option `TAV-ORD-PRE-F01-C1-NO` (wrong):** PLAYER: “Give me the speech instead. I’ll score it out of ten.”
  - **NARRATOR:** She gives you the whole speech, including the drizzle section. It’s excellent.
  - **TAVRI [NEUTRAL]:** “Well? What’s my score?”

</td></tr></table>

## TAV-ORD-PRE-F02 — The Ribbon Question

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Tavri studies a ribbon fastened neatly around a stack of routine papers.
- **TAVRI [PLAYFUL]:** “Someone declared the ribbon a symbol of my extraordinary taste. I picked the only one available.”
- **PLAYER:** “A heroic decision under pressure.”
- **TAVRI [NEUTRAL]:** “The chronicles will be unbearable.”

**Option `TAV-ORD-PRE-F02-C1-YES` (correct):** PLAYER: “The papers matter more than the ribbon; let the compliment pass.”
  - **TAVRI [PLAYFUL]:** “A quiet victory. Nobody needs to write a ballad.”

**Option `TAV-ORD-PRE-F02-C1-NO` (wrong):** PLAYER: “Ask for a more expensive ribbon next time.”
  - **TAVRI [WORRIED]:** “I fear you have mistaken me for a ribbon merchant.”

</td><td>

- **NARRATOR:** Tavri is holding a stack of papers tied with a plain blue ribbon.
- **TAVRI [PLAYFUL]:** “A countess just called this ribbon ‘a daring statement of royal taste.’”
- **TAVRI [NEUTRAL]:** “It was the only ribbon in the drawer. The alternative was string.”
- **PLAYER:** “A heroic decision under pressure.”
- **TAVRI [PLAYFUL]:** “The chronicles will be unbearable. *She chose blue, and the kingdom wept.*”
- **NARRATOR:** Underneath, the papers are covered in small, anxious handwriting.

**Option `TAV-ORD-PRE-F02-C1-YES` (correct):** PLAYER: “Lovely ribbon. Who wrote all that?”
  - **TAVRI [SURPRISED]:** “It’s from the baker. A petition. Their roof leaks onto the bread.”
  - **TAVRI [PLAYFUL]:** “Come on, we’re taking the bread’s side. Bring the ribbon. It can finally do something.”

**Option `TAV-ORD-PRE-F02-C1-NO` (wrong):** PLAYER: “Next time go for velvet. If they love the ribbon, give them more ribbon.”
  - **TAVRI [PLAYFUL]:** “Velvet. Bold. The chronicles will need a second volume.”
  - **NARRATOR:** She makes a note about velvet on the back of the petition.

</td></tr></table>

## TAV-ORD-PRE-F03 — The Revised Program

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** An official program describes Tavri as “effortlessly delightful.”
- **TAVRI [PLAYFUL]:** “Effortlessly. That is adorable. It took the clerk three drafts to spell it.”
- **PLAYER:** “Do you want it changed?”
- **TAVRI [NEUTRAL]:** “I would settle for a word that allows a person a difficult day.”

**Option `TAV-ORD-PRE-F03-C1-YES` (correct):** PLAYER: “How about just your name? You can decide the rest.”
  - **TAVRI [PLAYFUL]:** “I think I am growing fond of that radical editorial policy.”

**Option `TAV-ORD-PRE-F03-C1-NO` (wrong):** PLAYER: “Keep it. People like knowing what to expect.”
  - **TAVRI [WORRIED]:** “I am more than a promise printed on a program.”

</td><td>

- **NARRATOR:** Tavri holds up an official program. Under her name, it says *effortlessly delightful.*
- **TAVRI [PLAYFUL]:** “Effortlessly. Adorable. It took the clerk three drafts to spell it.”
- **TAVRI [PLAYFUL]:** “Draft one said *effortlessly delighful.* I liked that one. It had a flaw in it.”
- **PLAYER:** “Want it changed?”
- **TAVRI [NEUTRAL]:** “To something with room for a bad day? ‘Usually delightful.’ ‘Delightful, terms apply.’”

**Option `TAV-ORD-PRE-F03-C1-YES` (correct):** PLAYER: “Print draft one. The typo’s the most honest word on it.”
  - **TAVRI [SURPRISED]:** “Effortlessly delighful.”
  - **TAVRI [PLAYFUL]:** “A flaw, in print, on purpose. The clerk will faint.”
  - **NARRATOR:** She circles the missing *t* and initials it.

**Option `TAV-ORD-PRE-F03-C1-NO` (wrong):** PLAYER: “Keep it. People like knowing what they’re getting.”
  - **TAVRI [NEUTRAL]:** “Right. Effortlessly delightful.”
  - **TAVRI [PLAYFUL]:** “I’ll schedule my bad days for when the program’s out of print.”

</td></tr></table>

## TAV-ORD-PRE-U01 — The Applause Problem

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A passing admirer bows so deeply that their hat rolls away.
- **TAVRI [PLAYFUL]:** “I fear I have been applauded for standing near a doorway. The doorway performed most of the work.”
- **PLAYER:** “Did you mean to impress them?”
- **TAVRI [NEUTRAL]:** “I merely held it open. Apparently that is a daring new court technique.”

**Option `TAV-ORD-PRE-U01-C1-YES` (correct):** PLAYER: “You were considerate. You do not owe anyone a performance afterward.”
  - **TAVRI [PLAYFUL]:** “That is a strangely generous review. I might frame it beside the door.”

**Option `TAV-ORD-PRE-U01-C1-NO` (wrong):** PLAYER: “At least bow dramatically so they get their money’s worth.”
  - **TAVRI [WORRIED]:** “I was rather hoping for permission to stop bowing.”

**Option `TAV-ORD-PRE-U01-C1-OFF` (offensive):** PLAYER: “You only acted kind so people would applaud you. What a fake.”
  - **TAVRI [ANNOYED]:** “That is a cruel thing to assume about someone trying to help.”

</td><td>

- **NARRATOR:** A courtier carrying a tureen of soup bows to Tavri. His hat keeps going. The soup, narrowly, does not.
- **TAVRI [PLAYFUL]:** “I held a door for that man. That’s all. Three people clapped, and one asked for an encore.”
- **PLAYER:** “An encore of the door?”
- **TAVRI [NEUTRAL]:** “I could hold it again. Slower. Add a little flourish on the hinge.”
- **NARRATOR:** Her tail is already rehearsing the flourish.

**Option `TAV-ORD-PRE-U01-C1-YES` (correct):** PLAYER: “Or you could let the door retire. It’s had a big day.”
  - **TAVRI [SURPRISED]:** “Retire the door.”
  - **TAVRI [PLAYFUL]:** “Radical. Don’t tell the hinge.”

**Option `TAV-ORD-PRE-U01-C1-NO` (wrong):** PLAYER: “Do it. Big flourish. Give them their money’s worth.”
  - **NARRATOR:** She gives the hinge a magnificent flourish. Two more people clap.
  - **TAVRI [NEUTRAL]:** “Wonderful. Now it’s a tradition.”

**Option `TAV-ORD-PRE-U01-C1-OFF` (offensive):** PLAYER: “You only held it so they’d clap. Bit fake, isn’t it?”
  - **TAVRI [ANNOYED]:** “He was carrying soup. But please, keep reviewing me.”
  - **NARRATOR:** She leaves through the door. She does not hold it.

</td></tr></table>

## TAV-ORD-PRE-U02 — The Quill Critic

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A self-writing quill has left an extravagant review of an otherwise ordinary court announcement.
- **TAVRI [PLAYFUL]:** “The quill gave my pronunciation five stars and my actual message one. An impressive insult from stationery.”
- **PLAYER:** “What did you want people to hear?”
- **TAVRI [NEUTRAL]:** “That the servants deserve a day off. The review appears to have missed the subject entirely.”

**Option `TAV-ORD-PRE-U02-C1-YES` (correct):** PLAYER: “Ask them about the day off. That matters more than how charmingly you said it.”
  - **TAVRI [PLAYFUL]:** “I knew there was a reason I preferred you to enchanted stationery.”

**Option `TAV-ORD-PRE-U02-C1-NO` (wrong):** PLAYER: “Next time give it a more glamorous announcement.”
  - **TAVRI [WORRIED]:** “I suspect glamour is exactly what obscured the point.”

</td><td>

- **NARRATOR:** A self-writing quill is reviewing the announcement Tavri just made. It has opinions.
- **TAVRI [PLAYFUL]:** “Five stars for my pronunciation. One star for the actual message.”
- **TAVRI [ANNOYED]:** “Savaged by stationery. There’s a footnote about my vowels.”
- **PLAYER:** “What was the message?”
- **TAVRI [NEUTRAL]:** “That the palace servants should get a day off. The quill found the topic ‘a little worthy.’”
- **NARRATOR:** The quill adds a line: *Princess now glaring at reviewer. Two stars.*

**Option `TAV-ORD-PRE-U02-C1-YES` (correct):** PLAYER: “Has anyone asked the servants which day they want?”
  - **TAVRI [SURPRISED]:** “No. We announced it *at* them. Beautifully, apparently.”
  - **TAVRI [PLAYFUL]:** “Come on, let’s go and ask. The quill can review the walk.”
  - **NARRATOR:** The quill writes *Unexpected. Three stars,* and hurries after you.

**Option `TAV-ORD-PRE-U02-C1-NO` (wrong):** PLAYER: “Easy fix. Next time, make the announcement more dazzling.”
  - **TAVRI [NEUTRAL]:** “More dazzling. A harp, perhaps. Some doves.”
  - **NARRATOR:** The quill gives the doves five stars. Tavri doesn’t read it.

</td></tr></table>

## TAV-ORD-PRE-U03 — A Herald’s Breathing Exercise

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** An anxious herald practices Tavri’s introduction with enough adjectives to exhaust an opera company.
- **TAVRI [PLAYFUL]:** “I have been called luminous, radiant, and devastating. The herald has not yet said my name.”
- **PLAYER:** “Do the adjectives bother you?”
- **TAVRI [NEUTRAL]:** “I begin to fear I must look sufficiently devastating to justify the paperwork.”

**Option `TAV-ORD-PRE-U03-C1-YES` (correct):** PLAYER: “Would you like me to ask him to shorten it to simply Tavri?”
  - **TAVRI [PLAYFUL]:** “Simple. Terrifying. I like it.”

**Option `TAV-ORD-PRE-U03-C1-NO` (wrong):** PLAYER: “He should add majestic. There is room before he runs out of breath.”
  - **TAVRI [WORRIED]:** “There is room in a herald’s lungs, perhaps. Not in my patience.”

</td><td>

- **NARRATOR:** A herald is rehearsing Tavri’s introduction nearby, gulping air between adjectives.
- **HERALD:** “Presenting the illustrious! The indomitable! The magnificent! The incandescent…”
- **TAVRI [PLAYFUL]:** “He’s been at it for a while. He hasn’t reached my name yet.”
- **PLAYER:** “How long is your name?”
- **TAVRI [NEUTRAL]:** “Five letters. He’s on adjective thirty-one.”
- **TAVRI [NEUTRAL]:** “Now I’ll have to be indomitable enough to justify the paperwork.”
- **NARRATOR:** The herald pauses to breathe into a paper bag.

**Option `TAV-ORD-PRE-U03-C1-YES` (correct):** PLAYER: “Want me to ask him to just say ‘Tavri’? Save the man a lung.”
  - **TAVRI [SURPRISED]:** “Just ‘Tavri.’ No adjectives.”
  - **TAVRI [PLAYFUL]:** “Plain. Terrifying. Go, before he finds a thesaurus.”
  - **NARRATOR:** When you ask, the herald sits down on the spot, weak with relief.

**Option `TAV-ORD-PRE-U03-C1-NO` (wrong):** PLAYER: “He’s missing ‘majestic.’ There’s room before his next breath.”
  - **HERALD:** “Majestic! Of course! From the top!”
  - **TAVRI [NEUTRAL]:** “Lovely. I’ll be over here, practicing majestic.”
  - **NARRATOR:** The herald starts again. He still doesn’t reach her name.

</td></tr></table>

## TAV-ORD-PRE-U04 — The Smile Rehearsal

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** Tavri catches her reflection in a polished surface and tries three immaculate smiles in succession.
- **TAVRI [PLAYFUL]:** “There. One for ministers, one for visiting nobles, and one for being asked why I am not smiling.”
- **PLAYER:** “Is there one you actually like?”
- **TAVRI [NEUTRAL]:** “I have not scheduled a meeting with that smile.”

**Option `TAV-ORD-PRE-U04-C1-YES` (correct):** PLAYER: “You can use whichever expression feels real, including none.”
  - **TAVRI [PLAYFUL]:** “A dangerous suggestion. It might start a scandal of relaxed facial muscles.”

**Option `TAV-ORD-PRE-U04-C1-NO` (wrong):** PLAYER: “The third looks best. Use it for everyone.”
  - **TAVRI [WORRIED]:** “How efficient. A single mask for the entire kingdom.”

</td><td>

- **NARRATOR:** Tavri is rehearsing smiles in the back of a spoon. She has three.
- **TAVRI [PLAYFUL]:** “This one’s for ministers. This one’s for visiting nobles.”
- **TAVRI [PLAYFUL]:** “And this one’s for when someone asks why I’m not smiling.”
- **PLAYER:** “Is there one you actually like?”
- **TAVRI [NEUTRAL]:** “I haven’t scheduled a meeting with that one.”
- **NARRATOR:** Upside down in the spoon, all three smiles look equally tired.

**Option `TAV-ORD-PRE-U04-C1-YES` (correct):** PLAYER: “Try none of them. If anyone asks, you’re thinking very hard about soup.”
  - **TAVRI [SURPRISED]:** “No smile at all? In public?”
  - **TAVRI [PLAYFUL]:** “Imagine the headlines. *Princess’s Face Found Relaxed. Court in Uproar.*”
  - **NARRATOR:** She pockets the spoon. Her face settles into something she didn’t rehearse.

**Option `TAV-ORD-PRE-U04-C1-NO` (wrong):** PLAYER: “The third one’s the most convincing. Use it on everyone.”
  - **TAVRI [PLAYFUL]:** “Efficient. One smile, whole kingdom, no refunds.”
  - **NARRATOR:** She puts it on and leaves it there. It’s still there when she says goodbye.

</td></tr></table>

## TAV-ORD-PRE-U05 — A Riddle with No Prize

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A folded riddle card lies beside a royal invitation.
- **TAVRI [PLAYFUL]:** “What walks into a court with no title and leaves with more expectations than it arrived with?”
- **PLAYER:** “A visiting duke?”
- **TAVRI [NEUTRAL]:** “Close. Anyone who was foolish enough to say something clever once.”

**Option `TAV-ORD-PRE-U05-C1-YES` (correct):** PLAYER: “Maybe someone can be clever without being on display all day.”
  - **TAVRI [PLAYFUL]:** “An answer with no punch line. It suits you.”

**Option `TAV-ORD-PRE-U05-C1-NO` (wrong):** PLAYER: “A court jester, obviously. You should tell better riddles.”
  - **TAVRI [WORRIED]:** “And there it is: another performance review.”

</td><td>

- **NARRATOR:** Tavri has found a riddle card tucked inside an invitation. She reads it out with great ceremony.
- **TAVRI [PLAYFUL]:** “‘What enters court with no title and leaves with more expectations than it came with?’”
- **PLAYER:** “A visiting duke?”
- **TAVRI [PLAYFUL]:** “No, a duke leaves with a cold and our second-best spoons.”
- **TAVRI [NEUTRAL]:** “The answer’s on the back. ‘Anyone who said one clever thing, once.’”
- **TAVRI [PLAYFUL]:** “Grim, for a party game! Who writes these? Is it a duke? Is it the spoons?”
- **NARRATOR:** She turns the card over again. Her tail is moving faster than the jokes.

**Option `TAV-ORD-PRE-U05-C1-YES` (correct):** PLAYER: “New rule: one clever thing a day. You’ve used yours. You’re off duty.”
  - **TAVRI [SURPRISED]:** “I’ve used it? Which one?”
  - **PLAYER:** “The spoons.”
  - **TAVRI [PLAYFUL]:** “Oh, good. That’s a decent one to retire on.”

**Option `TAV-ORD-PRE-U05-C1-NO` (wrong):** PLAYER: “Ha! Do another one. I’ll get the next one, I swear.”
  - **TAVRI [PLAYFUL]:** “Another! Yes. Excellent.”
  - **NARRATOR:** She reads three more very fast and doesn’t turn a single one over.

</td></tr></table>

## TAV-ORD-PRE-U06 — A Bow by Reflex (was: Curtain Call)

<table><tr><th>Before</th><th>After</th></tr><tr><td>

- **NARRATOR:** A sudden burst of applause drifts from an unrelated gathering. Tavri starts to bow, then catches herself.
- **TAVRI [PLAYFUL]:** “My reflexes remain impeccable. Someone applauds and my spine performs court protocol.”
- **PLAYER:** “You seem tired.”
- **TAVRI [NEUTRAL]:** “Apparently my body has a standing subscription to approval.”

**Option `TAV-ORD-PRE-U06-C1-YES` (correct):** PLAYER: “We could simply listen until the applause stops. No bow required.”
  - **TAVRI [PLAYFUL]:** “You make doing nothing sound delightfully rebellious.”

**Option `TAV-ORD-PRE-U06-C1-NO` (wrong):** PLAYER: “Go on, take a bow. They might be applauding you.”
  - **TAVRI [WORRIED]:** “That uncertainty is not the part I enjoy.”

</td><td>

- **NARRATOR:** Somewhere nearby, a crowd bursts into clapping. Tavri is halfway into a bow before she stops.
- **TAVRI [PLAYFUL]:** “Ignore that. My spine bows on its own. Beautifully trained, no idea what for.”
- **PLAYER:** “What are they clapping for?”
- **TAVRI [NEUTRAL]:** “No idea. Could be a christening. Could be a goat.”
- **NARRATOR:** The clapping swells. Her tail sweeps once, politely, in its direction.

**Option `TAV-ORD-PRE-U06-C1-YES` (correct):** PLAYER: “Honestly? Let’s stay right here and find out if it’s the goat.”
  - **TAVRI [PLAYFUL]:** “Standing still while people clap. How wildly rebellious.”
  - **NARRATOR:** It is the goat. The goat doesn’t bow either.

**Option `TAV-ORD-PRE-U06-C1-NO` (wrong):** PLAYER: “Go on, take a bow. Maybe it’s for you.”
  - **NARRATOR:** She sweeps into a full court bow. The clapping falters. Someone holds up a goat.
  - **TAVRI [NEUTRAL]:** “It was the goat.”
  - **NARRATOR:** Her ears stay flat for some time afterward.

</td></tr></table>

## Humpty quips and training flavour

- `HD-SQUARE-TS01`: ~~“I once sat on a wall to admire the view. The view was excellent; the wall’s risk assessment was less so.”~~ → “I once sat on a wall to admire the view. Lovely view. I do not recommend the wall.”
- `HD-SQUARE-TS02`: ~~“Royal romance has a deadline. Royal paperwork does not. Consider yourself fortunate.”~~ → “Romance in this kingdom has a deadline. Paperwork does not. I have been waiting on a wall permit for six years.”
- `HD-SQUARE-TS03`: ~~“A schedule is a love letter from the calendar. It is also how one avoids appearing at an empty quay.”~~ → “Every princess keeps a schedule. Learn it. Nothing says ‘devoted’ like waiting at an empty quay, chatting to a gull.”
- `HD-SQUARE-TS04`: ~~“In my experience, no one is charmed by a second breakfast arriving as a security audit.”~~ → “All the king’s horses came to help me once. Lovely animals. Hopeless with glue.”
- `HD-SQUARE-TS05`: ~~“If the court asks whether you know what you are doing, answer only if you have tested that theory.”~~ → “If the court asks whether you know what you are doing, test that theory first. I said yes once. Then I was on a wall.”
- `HD-SQUARE-TS06`: ~~“People keep saying I am difficult to put back together. That is unfair to the very dedicated glue merchants.”~~ → “People call me difficult to put back together. The glue merchants call me a valued long-term customer.”
- `HD-SQUARE-TS07`: ~~“Do not confuse a locked milestone with an angry princess. One is a number. The other can tell you exactly what went wrong.”~~ → “A locked milestone is not an angry princess. The milestone is a number. The princess will tell you exactly what you did.”
- `HD-SQUARE-TS08`: ~~“Some conversations are important enough that the cleverest thing you can say is a question.”~~ → “In an important conversation, the cleverest thing you can say is often a question. I have many questions. Most of them are about walls.”
- `HD-SQUARE-TS09`: ~~“I am available for free advice. The premium package contains the same advice with a longer introduction.”~~ → “My advice is free. The premium package is the same advice, delivered from a lower wall.”
- `HD-SQUARE-TS10`: ~~“The palace insists every problem has a committee. I prefer problems that have a chair.”~~ → “The palace believes every problem needs a committee. I believe every problem needs a chair. Low to the ground. With arms.”
- `HD-SQUARE-TS11`: ~~“When a mermaid tells you the water is the right place for her, I would recommend believing the expert.”~~ → “When a mermaid tells you the water is where she belongs, believe the expert. I feel the same way about the ground.”
- `HD-SQUARE-TS12`: ~~“A formidable dragon princess can open her own doors. You may still ask whether she would like company.”~~ → “A dragon princess can open her own doors, and most walls. You may still ask whether she would like company.”
- `ACT-CHA-READ-L01`: ~~You study a chapter of improbable introductions, then close the book before it can offer advice about winking at royalty.~~ → You read a chapter called “Openers for Royalty.” Opener four is just winking. You close the book before it can suggest opener five.
- `ACT-CHA-READ-L02`: ~~Practicing a line is not the same thing as listening to the reply.~~ → You practice a line on the mirror. The mirror loves it. The mirror is not a princess.
- `ACT-CHA-TALK-L01`: ~~You exchange pleasantries with the townsfolk, learning how often a simple question works better than a polished entrance.~~ → You chat with the townsfolk. One question to a baker earns you twenty minutes on sourdough and a free roll.
- `ACT-CHA-TALK-L02`: ~~Nobody asks for a performance review, which counts as progress of a different kind.~~ → Nobody grades you. Several people ask your name. Progress.
- `ACT-INT-BOOK-L01`: ~~You compare two careful accounts of the same obscure custom and notice where the writers disagree.~~ → You read two histories of the same obscure custom. They disagree about everything, including the custom.
- `ACT-INT-BOOK-L02`: ~~A useful answer now has room for a better question.~~ → You leave with one answer and three better questions. The librarian calls this a good day.
- `ACT-INT-ORACLE-L01`: ~~The enchanted oracle offers an answer with three footnotes and a warning that its confidence is decorative. You check the references.~~ → The oracle answers instantly, with great confidence and three footnotes. Two of the footnotes cite the oracle. You check the sources.
- `ACT-INT-ORACLE-L02`: ~~The oracle politely admits that “probably” is not a proof.~~ → Asked to show its work, the oracle concedes that “probably” was doing most of it.
- `ACT-STR-CAL-L01`: ~~You finish a measured set of bodyweight exercises, treating steady form as more important than impressive noises.~~ → You work through a careful set of push-ups and squats. Form over noise. Mostly.
- `ACT-STR-CAL-L02`: ~~The floor survives another training session.~~ → The floor survives another session. So, narrowly, do you.
- `ACT-STR-GUILD-L01`: ~~You practice controlled movements using the guild’s ordinary training equipment. Nobody has to fight anyone.~~ → You run drills on the guild’s ordinary equipment. A veteran watches, says “Hm,” and leaves. You decide that was praise.
- `ACT-STR-GUILD-L02`: ~~The training target remains intact; this is considered a success.~~ → The training dummy remains intact. The guild counts this as a win for everyone, including the dummy.
- `ACT-KIN-DOG-L01`: ~~You offer patient attention to the garden dogs and make sure they have water and a comfortable place to rest.~~ → You refill the water bowls and find the garden dogs some shade. One of them sits on your foot so you can’t leave.
- `ACT-KIN-DOG-L02`: ~~A wagging tail offers an eloquent but entirely nonnumeric review.~~ → The reviews are in: one wagging tail, one sneeze, no numbers.
- `ACT-KIN-LITTER-L01`: ~~You collect stray scraps around the square, leaving the paths and flowerbeds a little better than you found them.~~ → You pick up litter around the square. The flowerbeds look better. A pigeon looks betrayed.
- `ACT-KIN-LITTER-L02`: ~~The square has one fewer mess and no added parade in your honor.~~ → Nobody throws you a parade. Given what parades leave behind, that’s for the best.
