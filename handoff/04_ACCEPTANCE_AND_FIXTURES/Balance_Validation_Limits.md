# Abstract reachability witness caveats

The supplied Python check (run during authoring only, not included as gameplay implementation) searched the discrete princess-eligible calendar for success paths using ordinary correct (+2 half-hearts), wrong (+1), midpoint fail/success, marriage first-attempt failure, marriage retry success, and optional missed days. It found day 15 Tavri/Nerelle, day 16 Kaedra perfect completions and day 27 recovery completions with 4 missed eligible days, 4 wrong ordinary answers, 1 failed midpoint, and 1 failed proposal.

**These are ABSTRACT scheduling witnesses, not engine tests, full state-space reachability proofs, or approval of every intermediate transaction.** The fixture CSV explicitly marks this status. Eleven training sessions (7 primary + 4 secondary) can be packed in nonencounter slots before successful midpoint in these witnesses; the future source-based validator must recheck session increments and authored-choice IDs.

Missing exact action contract and original Gate 1 source prevents claiming full formal verification. Do not use these witnesses as proof that every possible decision path can win. Negative paths should intentionally fail.
