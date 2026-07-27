# CR-67 Low Voltage: The Plain-English Study Guide

A friendly, from-scratch introduction to every foundational idea the CR-67 Low
Voltage Communications Systems exam leans on. No experience assumed. If you can
read a ruler and do a little arithmetic, you can learn this.

This guide was built by reading all 160 questions in the practice bank and
pulling out the concepts they keep testing. It teaches the ideas the way this
exam expects you to answer them. Codes change, so always confirm against the
current NEC/NFPA before doing real work.

**How to use it:** read a section, then go do those questions in the quiz app.
The concepts stick a lot faster when you immediately practice them.

---

## Table of contents

1. [Electricity in sixty seconds](#1-electricity-in-sixty-seconds)
2. [Ohm's Law (the one formula to rule them all)](#2-ohms-law)
3. [Power, watts, and the pie wheel](#3-power-watts-and-the-pie-wheel)
4. [Series vs parallel circuits](#4-series-vs-parallel-circuits)
5. [Voltage drop (why the switch only saw 1.2 volts)](#5-voltage-drop)
6. [AC, DC, and sine waves](#6-ac-dc-and-sine-waves)
7. [Reading an oscilloscope](#7-reading-an-oscilloscope)
8. [Measuring instruments](#8-measuring-instruments)
9. [Wire gauge (AWG)](#9-wire-gauge-awg)
10. [Conductor insulation letter codes](#10-conductor-insulation-letter-codes)
11. [The low-voltage cable naming system](#11-the-low-voltage-cable-naming-system)
12. [Plenum, riser, and shaft](#12-plenum-riser-and-shaft)
13. [Grounding and bonding](#13-grounding-and-bonding)
14. [The codes: NEC and NFPA 72](#14-the-codes)
15. [Fire alarm essentials](#15-fire-alarm-essentials)
16. [Separation and clearance numbers](#16-separation-and-clearance-numbers)
17. [Audio, video, and telecom grab bag](#17-audio-video-and-telecom-grab-bag)
18. [Cheat sheet: formulas, numbers, and units](#18-cheat-sheet)

---

## 1. Electricity in sixty seconds

Electricity is just **electrons moving through a wire**. Three words describe
almost everything:

- **Voltage (volts, V):** the *push*. Think of it as water pressure in a pipe.
- **Current (amperes, amps, A):** the *flow*. How much water actually moves.
- **Resistance (ohms, Ω):** the *pushback*. A narrow or clogged pipe resists flow.

The water-pipe picture is worth memorizing because every exam question about
volts, amps, and ohms is really this picture:

> More pressure (voltage) pushes more water (current). A narrower pipe (more
> resistance) lets less water through.

That single sentence is Ohm's Law in words.

---

## 2. Ohm's Law

The relationship between the three:

```
V = I × R
```

Where **V** = volts, **I** = current in amps, **R** = resistance in ohms.
(Engineers use "I" for current, from the French *intensité*.)

Rearrange it depending on what you are solving for:

| You want | Formula |
|----------|---------|
| Voltage  | V = I × R |
| Current  | I = V ÷ R |
| Resistance | R = V ÷ I |

**Memory trick, the "VIR triangle":** write V on top, I and R on the bottom.
Cover the one you want; the other two show you the math.

```
      ( V )
     ( I | R )
```

Cover V, you see I × R. Cover I, you see V/R. Cover R, you see V/I.

---

## 3. Power, watts, and the pie wheel

**Power (watts, W)** is how much work the electricity does (heat, light,
sound). The basic formula:

```
P = V × I      (watts = volts × amps)
```

Example from the bank: a 12 volt system drawing 0.25 amps uses
`12 × 0.25 = 3 watts`.

Combine with Ohm's Law and you also get `P = I² × R` and `P = V² ÷ R`. You do
not need to memorize all of them; memorize `P = V × I` and `V = I × R`, and you
can derive the rest.

**The Ohm's Law / Watt's Law wheel** puts all four quantities (V, I, R, P) in
one circle so any two known values get you the other two. If you like charts,
search "Ohm's Law pie wheel" and keep one handy.

---

## 4. Series vs parallel circuits

How components are wired changes how you add up resistance.

**Series** (one path, components in a line, like a single chain):

- Current is the **same** everywhere.
- Voltages **add up**.
- Resistances **add up**: `R_total = R1 + R2 + R3 ...`
- A **series** circuit that looks like a straight line; break it anywhere and
  everything stops (old Christmas lights).

**Parallel** (multiple paths, like rungs of a ladder):

- Voltage is the **same** across each branch.
- Currents **add up**.
- Resistance formula: `1 / R_total = 1/R1 + 1/R2 + 1/R3 ...`
- For exactly **two** resistors there is a shortcut:
  `R_total = (R1 × R2) ÷ (R1 + R2)` (often called "product over sum").
- A circuit whose branches look like a **ladder** is parallel.

**Key fact the exam loves:** adding resistors in parallel *lowers* total
resistance (you gave the current more paths). Total parallel resistance is
always smaller than the smallest single resistor.

**Worked example (from the diagram question):** a 10 volt circuit has 1, 6, and
3 ohm resistors in series in one branch: `1 + 6 + 3 = 10 ohms`. That 10 ohm
branch sits in parallel with another 10 ohm resistor:
`(10 × 10) ÷ (10 + 10) = 100 ÷ 20 = 5 ohms`. That 5 ohms is then in series with
a 2 and a 3 ohm resistor: `2 + 5 + 3 = 10 ohms total`.

**Another (all parallel):** 20, 30, and 40 ohm resistors in parallel:
`1/20 + 1/30 + 1/40 = 0.05 + 0.0333 + 0.025 = 0.1083`, so
`R_total = 1 ÷ 0.1083 ≈ 9.2 ohms`. Notice it is smaller than 20, the smallest
resistor. That is your sanity check.

---

## 5. Voltage drop

Every resistance "uses up" some voltage as current passes through it. The amount
used up is `V = I × R` across that component. Add up all the drops in a series
circuit and they equal the source voltage. This is **Kirchhoff's voltage law**,
but you can just think "the volts have to go somewhere."

**Why this matters (a real bank question):** a line starts at 12 volts with a
3.2 ohm resistor, but only 1.2 volts reaches the switch. Where did the other
~10.8 volts go? Something in the path is eating the voltage that should not be:
a bad connection or **bad switch** adding unexpected resistance. Unexpected
voltage drop = unexpected resistance = a fault to hunt down.

---

## 6. AC, DC, and sine waves

Two kinds of current:

- **DC (direct current):** flows one direction only (batteries, most
  electronics inside).
- **AC (alternating current):** reverses direction continuously, back and forth
  (wall power, signals on a line).

When AC "reverses direction continuously," if you graph its voltage over time
you get a smooth, repeating S-curve. That shape is a **sine wave**, also called
a **sinusoidal waveform**. They are two names for the same thing. A sine wave is
symmetrical: equal amount above the zero line (positive) and below it (negative).

**Frequency** is how many complete cycles happen per second, measured in
**Hertz (Hz)**. **Impedance** is AC's version of resistance (it includes
frequency-dependent effects) and is still measured in **ohms**.

---

## 7. Reading an oscilloscope

An **oscilloscope** draws a signal's voltage (vertical) against time
(horizontal) on a grid of squares called **divisions**. The exam shows you a
sine wave on a grid and asks you to read values. Two labels tell you the scale:

- **VOLTS = .5/DIV** means each vertical square is worth 0.5 volts.
- **TIME = 10ms/DIV** means each horizontal square is worth 10 milliseconds.

Then it is just counting squares and multiplying:

- **Voltage between two points** = (number of vertical divisions) × (volts per div).
  Example: point A is 2 divisions above the reference line Y, at 0.5 V/div, so
  `2 × 0.5 = 1 volt`.
- **Time between two points** = (number of horizontal divisions) × (time per div).
  Example: 5 divisions apart at 10 ms/div = `5 × 10 = 50 ms`. Four divisions
  between waves = `4 × 10 = 40 ms`.

**Remember:** find the per-division scale first, count divisions second,
multiply third. That is the whole trick.

---

## 8. Measuring instruments

Match the meter to the quantity:

| Measures | Instrument | How it connects |
|----------|-----------|-----------------|
| Voltage  | **Voltmeter** | across the component (parallel) |
| Current  | **Ammeter** | in the path (series) |
| Resistance | **Ohmmeter** | across a de-energized component |

To get a **true measure of voltage**, use a **voltmeter**. "Ampacity" is a
different thing (see below), not something you read off a meter.

**Ampacity** = the maximum current (amperes) a conductor can carry continuously
without overheating. What changes a conductor's temperature: the current through
it, the surrounding (ambient) temperature, and nearby load-carrying conductors.
Applied *voltage* by itself does not.

---

## 9. Wire gauge (AWG)

Wire thickness is measured in **AWG (American Wire Gauge)**. The one rule that
trips everyone up:

> **Bigger AWG number = THINNER wire. Smaller number = THICKER wire.**

So 22 AWG is skinny; 6 AWG is fat. Thicker wire (smaller number) carries more
current and has less resistance. A rough feel for the ladder: every 3 gauge
numbers roughly doubles or halves the cross-sectional area.

Numbers worth knowing from the bank:

- Most common **communication** cable sizes: **18 to 24 AWG**.
- Minimum **Class 1** circuit conductor: **18 AWG**.
- Minimum **non-power-limited fire alarm** conductor: **18 AWG**.
- Minimum **communications grounding** conductor: **14 AWG**.
- Minimum **antenna** grounding conductor (copper): **10 AWG**.
- **CATV bonding jumper** to the power ground: **6 AWG**.
- **DC grounding electrode** conductor: not smaller than **8 AWG** copper.

---

## 10. Conductor insulation letter codes

Wire types like THHN or XHHW look like alphabet soup, but each letter means
something. Decode them:

| Letter | Meaning |
|--------|---------|
| **T** | Thermoplastic insulation |
| **H** | Heat resistant (to 75°C) |
| **HH** | High heat resistant (to 90°C) |
| **W** | **W**et locations rated |
| **N** | **N**ylon jacket (tough outer coat) |
| **X** | Cross-linked polyethylene |
| **U** | **U**nderground |
| **SE / USE** | Service Entrance / Underground Service Entrance |
| **UF** | Underground Feeder |

Now they read like words:

- **THHN** = Thermoplastic, High-Heat, Nylon. Great in dry/damp conduit. **No W, so not for wet.**
- **THW / THHW** = Thermoplastic Heat, Wet-rated.
- **XHHW** = Cross-linked, High-Heat, Wet-rated. A go-to for wet locations.
- **USE** = Underground Service Entrance: rated for **direct burial**.
- **UF** = Underground Feeder: also for direct burial (the "tough gray cable").
- **TW** = Thermoplastic, Wet.

**The exam pattern:** "which is *not* allowed in a wet location?" The answer is
usually **THHN**, because it lacks the **W**. "Which is used for direct burial?"
**USE** (or **UF**). Look for the letter that matches the condition.

**Fun fact from the bank:** UF is tough against water and soil acid, but gophers
and ground squirrels love to chew it, which is why metal conduit is sometimes
worth the extra cost underground.

---

## 11. The low-voltage cable naming system

This is the single biggest topic on the exam, and it is completely learnable
because it is a system, not a list to memorize blindly.

### Step 1: the family tells you the application (and NEC Article)

| Prefix | Family | NEC Article |
|--------|--------|-------------|
| **CM** | Communications (phone, data) | 800 |
| **CATV** (coax) | Community Antenna TV / coax | 820 |
| **CL2 / CL3** | Class 2 / Class 3 signaling and control | 725 |
| **FPL** | Power-Limited Fire Alarm | 760 |
| **NPLF** | Non-Power-Limited Fire Alarm | 760 |
| **OFN / OFC** | Optical Fiber, Nonconductive / Conductive | 770 |

### Step 2: the suffix tells you *where it can go*

Add a letter to the family name to rate it for tougher environments:

| Suffix | Meaning | Where |
|--------|---------|-------|
| **P** | **Plenum** | air-handling spaces (the strictest) |
| **R** | **Riser** | vertical runs between floors / in shafts |
| *(none)* | General purpose | general indoor use |
| **X** | Limited use | dwellings, small/short runs |

So **CMP** = Communications, Plenum. **CMR** = Communications, Riser.
**CM** = general. **CMX** = limited use. Same ladder applies to the other
families: **CL3P, CL3R, CL3**; **FPLP, FPLR, FPL**; **CATVP, CATVR, CATV, CATVX**;
**OFNP, OFNR, OFN**.

### Step 3: the substitution pyramid

You may always use a **higher-rated** cable in place of a lower one, never the
reverse. Picture a pyramid, best at the top:

```
            Plenum  (P)          <- can go anywhere below it
              |
           Riser   (R)
              |
        General purpose
              |
         Limited (X)             <- most restricted
```

**Rule:** substitute UP the pyramid, never down. Plenum-rated cable can replace
riser or general cable. A general cable can NOT be used where plenum is
required. This is exactly what the "CL2P is being replaced, what can substitute?"
questions test: pick something equal or higher (for CL2P you could use CL3P or a
plenum-rated communications type).

**Memory hook:** **P**lenum > **R**iser > (general) > **X** = "**P**retty
**R**ough **G**oing e**X**treme," or just remember plenum is the top of the food
chain because it is the hardest environment (moving air spreads fire and smoke).

---

## 12. Plenum, riser, and shaft

Why the P/R ladder exists at all: fire and smoke.

- **Plenum:** a space used to move heating/cooling air, most often the gap above
  a drop ceiling used as an air-return path. Because moving air can carry flame
  and toxic smoke through a building fast, plenum cable has a special low-smoke,
  flame-resistant jacket. Highest requirement. Cable rated for **both plenum and
  ducts/general** is the top tier (for example, **CMP**).
- **Riser:** a **vertical** run that passes from floor to floor. Fire climbs, so
  riser cable resists carrying flame **up** between floors.
- **Shaft:** a vertical opening (like an elevator or utility shaft). For cabling
  purposes it is treated like a riser, so **riser-rated** cable (for example,
  **CMR**) is what goes in a vertical shaft.

If a cable must pass a duct or plenum and is not plenum-rated, it must be
installed inside proper **metal conduit** instead.

---

## 13. Grounding and bonding

People mix these up. The exam wants you to keep them straight:

- **Grounding** = connecting to the **earth**. It gives lightning and stray
  energy a path to ground and sets a common voltage reference.
- **Bonding** = connecting metal parts **to each other** so they sit at the same
  electrical potential and give fault current a reliable path back to the source.
  "Two conductive metals joined to complete a safety circuit" is **bonding**.

Color code:

- **Equipment grounding conductor:** **green**, green with a yellow stripe, or
  bare copper.
- Grounded (neutral) conductor: white or gray. (Not the same as the green
  equipment ground.)

Sizing highlights (see section 9 for the full list): communications ground min
**14 AWG**, antenna ground min **10 AWG** copper, CATV bonding jumper min
**6 AWG**, DC grounding electrode conductor min **8 AWG** copper.

Bonding methods that are acceptable: pressure connectors, clamps, and lugs.
**Sheet-metal screws are NOT an acceptable bonding method.** For an antenna, a
**radial** ground (wires spreading out like spokes) is the preferred type.

---

## 14. The codes

Two rule books cover almost every code question:

- **NFPA 70 = the National Electrical Code (NEC).** Wiring methods, cable types,
  conductors, grounding, separations. This is the big one.
- **NFPA 72 = the National Fire Alarm and Signaling Code.** Detectors,
  notification appliances, backup power, testing intervals.

**How to read a code citation:** `800.53` means **Article 800**, Section **53**.
Parentheses add subsections: `110.26(A)(2)`. Handy articles to recognize:

| Article | Covers |
|---------|--------|
| 100 | Definitions |
| 110.26 | Working space around equipment |
| 250 | Grounding and bonding |
| 300 | General wiring methods (holes in studs, firestopping) |
| 310 | Conductors and insulation types |
| 725 | Class 1, 2, 3 circuits (CL2/CL3) |
| 760 | Fire alarm circuits (FPL/NPLF) |
| 770 | Optical fiber (OFN/OFC) |
| 800 | Communications circuits (CM) |
| 810 | Antennas |
| 820 | CATV / coax |

On the real exam, references get tagged **"Allowed in Test"** or **"Not allowed
in Test."** That just tells you which code edition/book you may open during the
exam; it is not part of the answer.

If a material substitution is ever needed, the person who approves it is the
**Authority Having Jurisdiction (AHJ)**.

---

## 15. Fire alarm essentials

NFPA 72 numbers show up constantly. The ones the bank repeats:

**Backup (secondary) power:**

- Must carry the system **24 hours** in the quiet (quiescent, non-alarm) state,
  then still sound the alarm for **5 minutes** at the end. (Written "24, 5.")
- Emergency voice/alarm service: 24 hours quiet, then **15 minutes** at full load.
- Backup power must take over automatically within **10 seconds** of a primary
  power failure.

**Trouble and fault signals:**

- An intermittent trouble signal sounds at least once every **10 seconds**, each
  at least **1/2 second** long.
- A fault must be re-annunciated every **24 hours**.

**Notification (getting people's attention):**

- A **visible** (strobe) device is required when ambient sound exceeds
  **105 dBA**.
- Audible alarms in a sleeping area: at least **15 dB above ambient**, or
  **75 dB at the pillow**.
- Strobe mounting height: minimum **80 inches**, maximum **96 inches** off the
  floor. Audible appliances at least **7.5 feet** up.

**Detector placement:**

- Heat detector on a ceiling: keep it at least **4 inches** off the wall.
- Smoke detector on a sidewall: the top within **12 inches** of the ceiling.
- Keep detectors about **3 feet** from a bathroom door and from HVAC supply
  registers.
- One smoke detector covers a maximum of **900 square feet**.
- A smoke detector may sit in airflow up to **300 CFM** unless listed for more.
- Manual pull stations: max travel distance **200 feet** to reach one.

**Testing:** batteries are tested per the manufacturer's recommendation; a smoke
detector's sensitivity is first checked within **1 year**, and a tamper (control
valve) switch is verified within the first **2 turns** of the valve wheel.

---

## 16. Separation and clearance numbers

Low-voltage and communication cabling has to keep its distance from power so
signals stay clean and safe. The recurring figures:

| Situation | Minimum |
|-----------|---------|
| Working space width in front of a panel (≤150 V to ground) | **30 in** (or the equipment width, whichever is greater) |
| Bored hole from the edge of a wood stud | **1-1/4 in** |
| Communications/coax from open light or power conductors (indoors) | **2 in** |
| Communication conductors from Class 1 circuits | **2 in** |
| Any cabling from **lightning** conductors | **6 ft (1.8 m)** |
| Rigid Metal Conduit support spacing | every **10 ft** |
| Max voltage a coax may deliver (transformer-supplied) | **60 volts** |

Where cables pass through a **fire-resistance-rated** wall, floor, or ceiling,
the opening must be **firestopped** with an approved method to keep the rating
intact.

---

## 17. Audio, video, and telecom grab bag

The exam mixes in practical AV and telecom trivia. Quick hits:

- **Balun:** converts between a **bal**anced line (twin-lead) and an
  **un**balanced line (coax). This bank calls it a "balanced transformer."
- **Equalization (EQ):** intentionally altering frequency response / tone.
- **Crossover:** splits audio into frequency bands for the right speaker, done
  by a **frequency-dividing network**.
- **ADC:** Analog-to-Digital Converter (analog going to digital).
- **Coax and connectors:** **RG-59** is a video coax good to about **1000 ft**;
  **RG-6** uses an **F connector**. **BNC** connectors are common on CCTV
  cameras; **ST** is a fiber connector.
- **TV channel bandwidth:** **6 MHz**.
- **Cabling topologies:** star (hub-and-spoke), **bus** (common for cable TV),
  ring, and point-to-point.
- **Copper data cable:** **UTP (Unshielded Twisted Pair)** is the most common for
  desktop data; STP is shielded.
- **Fiber:** **single-mode** goes farther (limited mainly by attenuation);
  **multimode** suffers modal dispersion. **Fusion splicing** joins two clean
  fibers end to end with an electric arc.
- **Antenna wire:** most common gauge is **14 AWG**; a **radial** ground suits a
  vertical antenna. A downside of copper-clad steel core antenna wire is that it
  **kinks and knots easily**.

---

## 18. Cheat sheet

### Formulas

```
Ohm's Law:     V = I × R      I = V / R      R = V / I
Power:         P = V × I      P = I² × R     P = V² / R
Series R:      R_total = R1 + R2 + R3 ...
Parallel R:    1/R_total = 1/R1 + 1/R2 ...  (two only: R1·R2 / (R1+R2))
Scope voltage: divisions × (volts per division)
Scope time:    divisions × (time per division)
```

### Units glossary

| Unit | Symbol | Measures | Meter |
|------|--------|----------|-------|
| Volt | V | electrical pressure | voltmeter |
| Ampere | A | current (flow rate) | ammeter |
| Ohm | Ω | resistance / impedance | ohmmeter |
| Watt | W | power (work done) | (calculated) |
| Hertz | Hz | frequency (cycles/sec) | frequency counter |
| Decibel | dB / dBA | sound level | sound meter |
| Milliamp | mA | 1/1000 of an amp | ammeter |

### Numbers most likely to be tested

| Value | Answer |
|-------|--------|
| Bigger AWG number means | thinner wire |
| Not allowed in wet locations | THHN (no "W") |
| Direct burial cable | USE (or UF) |
| Substitution direction | up the pyramid (Plenum > Riser > general > X) |
| Vertical shaft cable | Riser-rated (e.g. CMR) |
| Plenum cable (comms) | CMP |
| Equipment ground color | green / green-yellow / bare |
| Comms grounding conductor | 14 AWG min |
| CATV bonding jumper | 6 AWG min |
| Separation from lightning conductors | 6 ft (1.8 m) |
| RMC support spacing | every 10 ft |
| Backup power (fire alarm) | 24 hours quiet, then 5 min alarm |
| Backup power transfer time | within 10 seconds |
| Strobe required above | 105 dBA ambient |
| Strobe mounting height | 80 in min, 96 in max |
| Smoke detector max coverage | 900 sq ft |
| Frequency unit / impedance unit | Hertz / ohms |
| Sine wave is also called | sinusoidal waveform |
| TV channel bandwidth | 6 MHz |
| NEC / fire code | NFPA 70 / NFPA 72 |

### The four mental models to carry into the exam

1. **Water in a pipe** for volts/amps/ohms.
2. **VIR triangle** to rearrange Ohm's Law on the fly.
3. **Decode the letters** in cable names (T, H, W, N, and P/R/X).
4. **Substitute up the pyramid**, never down.

Good luck. Now go run the quiz.
