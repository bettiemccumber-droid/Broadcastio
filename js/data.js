/**
 * @typedef {Object} ArticleBlock
 * @property {"p"|"h2"|"ul"|"quote"|"image"|"product"} type
 * @property {string} [text]
 * @property {string[]} [items]
 * @property {string} [cite]
 * @property {string} [src]
 * @property {string} [alt]
 * @property {string} [caption]
 * @property {string} [id]
 */

/**
 * @typedef {Object} Article
 * @property {string} id
 * @property {string} title
 * @property {string} dek
 * @property {string} category
 * @property {string} date
 * @property {number} minutes
 * @property {string} image
 * @property {string} imageAlt
 * @property {string} role
 * @property {string[]} tags
 * @property {string} excerpt
 * @property {string[]} productIds
 * @property {ArticleBlock[]} body
 */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {string} price
 * @property {number} rating
 * @property {string} verdict
 * @property {string} bestFor
 * @property {string} image
 * @property {string} imageAlt
 * @property {string} summary
 * @property {string[]} description
 * @property {{label: string, value: string}[]} specs
 * @property {{label: string, value: number}[]} scores
 * @property {string[]} pros
 * @property {string[]} cons
 * @property {string} articleId
 * @property {string} tested
 */

/** @type {{ categories: {name: string, blurb: string}[], articles: Article[], products: Product[] }} */
window.BROADCASTIO = {
  categories: [
    { name: "Product Reviews", blurb: "Gear that stayed on the desk after the session, not just the unboxing." },
    { name: "Platform Guides", blurb: "Where a show should live, and which door actually lets someone finish it." },
    { name: "Studio Craft", blurb: "Light, desks, and rooms that were never built to be studios." },
    { name: "Creator Tools", blurb: "The quiet software between a take and a file you can publish." },
    { name: "Industry", blurb: "What the feed changed, and what the microphone still refuses to forgive." }
  ],
  products: [
    {
      id: "northline-at44",
      name: "Northline AT-44",
      category: "Microphones",
      price: "$249",
      rating: 4.7,
      verdict: "Desk pick",
      bestFor: "Spoken word in an ordinary room",
      image: "assets/images/mic.jpg",
      imageAlt: "A black microphone with a foam windscreen, mounted on a boom arm",
      summary: "A dynamic cardioid that leaves the bus outside and keeps the voice close.",
      description: [
        "The AT-44 is the microphone we left on the boom. It is a dynamic cardioid with a foam windscreen, which is a plain way of saying it listens to the mouth in front of it and loses interest in the rest of the room.",
        "In a bedroom with a rug, a bookcase, and a window toward a bus stop, that habit mattered more than a sensitivity number. It asked the Harbor-style interface for real gain. Fed properly, the noise floor sat under the voice instead of weaving through it.",
        "It is a speech microphone. Quiet, airy reads and a guitar in the corner went dull. If the room is already quiet, look at the Room Air C-12. If the room is a room, start here."
      ],
      specs: [
        { label: "Type", value: "Dynamic" },
        { label: "Pattern", value: "Cardioid" },
        { label: "Mount", value: "Boom arm and foam windscreen" },
        { label: "Connection", value: "XLR" },
        { label: "Weight", value: "680 g" }
      ],
      scores: [
        { label: "Voice", value: 9 },
        { label: "Room rejection", value: 9 },
        { label: "Value", value: 8 }
      ],
      pros: [
        "Ignores more of a live room than the condenser beside it",
        "Foam and boom make a weeknight setup fast",
        "Speech stays close without sounding boxed-in"
      ],
      cons: [
        "Hungry for clean gain",
        "A poor match for airy, quiet reads",
        "Acoustic instruments turn to wool"
      ],
      articleId: "bedroom-mics",
      tested: "2026-02-12"
    },
    {
      id: "room-air-c12",
      name: "Room Air C-12",
      category: "Microphones",
      price: "$199",
      rating: 4.2,
      verdict: "Quiet rooms only",
      bestFor: "A treated closet or a still house",
      image: "assets/images/stand.jpg",
      imageAlt: "A silver condenser microphone in a shock mount, with a pop filter in front",
      summary: "A condenser with a shock mount and pop filter, for rooms that are already quiet.",
      description: [
        "The C-12 is the microphone the bedroom sent back. In a shock mount, with a pop filter, it looks like the picture people expect. It also heard the bus, the chair, and the reflective corner we had not noticed.",
        "Moved into a still room — door shut, computer fan out of the pattern — the top of the voice opened up. Breath sounded like breath. The AT-44 could not do that, and we stopped asking it to.",
        "Buy it when the room is the quiet part of the chain. Buying it to fix a lively room just turns the room up."
      ],
      specs: [
        { label: "Type", value: "Condenser" },
        { label: "Pattern", value: "Cardioid" },
        { label: "Includes", value: "Shock mount and pop filter" },
        { label: "Connection", value: "XLR" },
        { label: "Power", value: "Phantom" }
      ],
      scores: [
        { label: "Detail", value: 8 },
        { label: "Room rejection", value: 5 },
        { label: "Value", value: 7 }
      ],
      pros: [
        "Air and breath when the room allows them",
        "Mount and filter are already in the picture",
        "A fair price if you do not also need treatment"
      ],
      cons: [
        "Reports every hard surface",
        "Needs phantom power and a quiet gain stage",
        "Easy to overbuy for a lively bedroom"
      ],
      articleId: "bedroom-mics",
      tested: "2026-02-12"
    },
    {
      id: "hearth-closed",
      name: "Hearth Closed-Back",
      category: "Headphones",
      price: "$169",
      rating: 4.6,
      verdict: "Take check",
      bestFor: "Hearing a take before anyone else does",
      image: "assets/images/headphones.jpg",
      imageAlt: "Black over-ear headphones photographed on a yellow background",
      summary: "Closed over-ear headphones for the unglamorous job of checking a take.",
      description: [
        "These are not a mixing prize. They are the headphones we put on before a file is allowed to leave. Closed-back, over-ear, and dull enough in the bass that a rumble does not masquerade as warmth.",
        "On a desk they tell you if the chair squeaked. On a louder afternoon they keep the room out of the judgment. We do not grade a mix on them. We decide whether the take is usable.",
        "If you already love an open pair in a quiet room, keep it for the edit. Use a closed pair when the question is simpler: did we actually get it?"
      ],
      specs: [
        { label: "Style", value: "Over-ear, closed-back" },
        { label: "Job", value: "Take check, not a final mix" },
        { label: "Cable", value: "Detachable" },
        { label: "Isolation", value: "Enough for a shared room" }
      ],
      scores: [
        { label: "Honesty", value: 9 },
        { label: "Comfort", value: 8 },
        { label: "Isolation", value: 8 }
      ],
      pros: [
        "Makes rumble and squeaks obvious",
        "Usable while someone else is in the room",
        "Light enough for a full read-through"
      ],
      cons: [
        "Too closed to judge space in a mix",
        "The headband warms up on long grades",
        "Not a fashionable object, which we count as a feature"
      ],
      articleId: "monitor-cans",
      tested: "2025-06-16"
    },
    {
      id: "frame-wide",
      name: "Frame Wide",
      category: "Displays",
      price: "$879",
      rating: 4.5,
      verdict: "Edit pick",
      bestFor: "A timeline that has to live next to a window",
      image: "assets/images/desk.jpg",
      imageAlt: "A wide monitor and a laptop on a wooden desk beside a window, with hands on a keyboard",
      summary: "A wide panel that sits beside the laptop and stays readable in daylight.",
      description: [
        "The Frame Wide is the panel in the photograph: on the desk, window to the side, laptop still open for notes. We stopped editing on the laptop glass because the room kept sitting on top of the picture.",
        "The wide layout holds a timeline without stacking every panel into a postage stamp. Text at arm's length stayed calm. We did not buy it to game, and nothing here will impress a refresh-rate conversation.",
        "Keep the laptop for the notes and the bag. Give the long edit a panel that can survive a window."
      ],
      specs: [
        { label: "Role", value: "Edit panel beside a laptop" },
        { label: "Placement", value: "Desk, window at the side" },
        { label: "Surface", value: "Lower glare than laptop glass" },
        { label: "Work", value: "Timelines and still grades" }
      ],
      scores: [
        { label: "Daylight", value: 9 },
        { label: "Workspace", value: 9 },
        { label: "Value", value: 7 }
      ],
      pros: [
        "The room stops reflecting across the cut",
        "Notes can stay on the laptop",
        "A calmer size for a full afternoon"
      ],
      cons: [
        "Too wide for a tiny table",
        "Useless if the work never leaves a phone",
        "You will notice a bad source more clearly"
      ],
      articleId: "wide-display",
      tested: "2025-12-04"
    },
    {
      id: "lumen-soft",
      name: "Lumen Soft Kit",
      category: "Lighting",
      price: "$320",
      rating: 4.4,
      verdict: "Two-source kit",
      bestFor: "A face, a dull background, and no second guess",
      image: "assets/images/lights.jpg",
      imageAlt: "Softboxes and overhead studio lights aimed at a white backdrop",
      summary: "Two diffused sources and a background that is not trying to be interesting.",
      description: [
        "The photograph is a full sweep: softboxes, a grid, a white cove. Almost nobody publishing from home needs that room. The idea inside it is smaller, and it is the whole kit.",
        "Two diffused sources, one for the face and one to lift a shoulder off the wall, plus a background you are willing to make dull. Bi-color mattered once the afternoon went warm and the hallway bulb did not.",
        "A ring sitting on the lens is faster and worse. Turn the chair, kill the glossy frame behind you, and then decide if you need the second source. Most weeknights, two is the whole plot."
      ],
      specs: [
        { label: "Sources", value: "Two diffused lights" },
        { label: "Color", value: "Daylight to tungsten" },
        { label: "Background", value: "Lit separately, or not at all" },
        { label: "Mount", value: "Stands, not the camera" }
      ],
      scores: [
        { label: "Face", value: 9 },
        { label: "Control", value: 8 },
        { label: "Simplicity", value: 8 }
      ],
      pros: [
        "The face stops borrowing the wall color",
        "Diffusion is kinder than a bare panel",
        "The plot fits in a sentence"
      ],
      cons: [
        "Stands take floor space",
        "A glossy background still wins if you refuse to move it",
        "Overkill for a bright window and a short clip"
      ],
      articleId: "face-light",
      tested: "2025-11-11"
    }
  ],
  articles: [
    {
      id: "bedroom-mics",
      title: "Five Mics, One Untreated Bedroom",
      dek: "We stopped scoring microphones from the product photo and started scoring them from a Tuesday-night record.",
      category: "Product Reviews",
      date: "2026-02-12",
      minutes: 9,
      image: "assets/images/mic.jpg",
      imageAlt: "A black microphone with a foam windscreen, mounted on a boom arm",
      role: "Reviews Desk",
      tags: ["microphones", "home studio", "product recommendation", "dynamic mic"],
      excerpt: "In a room with a rug and a bookshelf, the Northline AT-44 was the microphone that stayed on the boom.",
      productIds: ["northline-at44", "room-air-c12"],
      body: [
        { type: "p", text: "Most microphone roundups end where the unboxing ends. The foam comes off, the gain knob moves, and a verdict arrives before anyone has talked for ten unbroken minutes. We did the dull version. Five microphones, one script, one bedroom with a rug, a bookcase, and a window that faces a bus stop." },
        { type: "p", text: "The Northline AT-44 is the one that stayed. It is a dynamic cardioid on a boom, with a foam windscreen already doing a job. It pays attention to the mouth in front of it and less attention to the bus. That is the difference between a voice that sounds close and a voice that sounds like a kitchen, because it was a kitchen-sized room." },
        { type: "h2", text: "How the session was set" },
        { type: "ul", items: [
          "The same 180-word script, once at a fist's distance and once at a relaxed lean",
          "A ten-minute conversation after the script, so breath and chair noise counted",
          "48 kHz, no noise removal on the way in",
          "A pop filter added only for the second pass"
        ] },
        { type: "p", text: "The AT-44 wanted more gain than the condenser beside it. Given clean gain, the noise floor sat under the voice. If your interface hisses when you turn it up, this microphone will tell on you. Fed properly, plosives stayed polite as long as we did not eat the foam." },
        { type: "image", src: "assets/images/stand.jpg", alt: "A silver condenser microphone in a shock mount with a pop filter", caption: "The Room Air C-12, shock mount and pop filter in place. It wanted a quieter room than we had." },
        { type: "h2", text: "What we would not use it for" },
        { type: "p", text: "Quiet, airy reads still belong on a condenser in a quieter space. That is the Room Air C-12: more detail, and more of the room riding along with it. Acoustic guitar in the corner of this bedroom turned to wool on the dynamic. The AT-44 is a speech microphone. We are not going to stretch it into a studio mascot." },
        { type: "quote", text: "In an ordinary room, the useful microphone is the one that leaves the bus outside.", cite: "Reviews Desk" },
        { type: "product", id: "northline-at44" },
        { type: "p", text: "The spec sheet is short on purpose. If the show is spoken word and the room is a room, start with the dynamic. If you have already built a quiet closet, spend the money on the closet's microphone instead." }
      ]
    },
    {
      id: "where-to-publish",
      title: "Where a Weekly Show Should Live in 2026",
      dek: "We published one essay three ways and watched where people actually finished it.",
      category: "Platform Guides",
      date: "2026-01-18",
      minutes: 8,
      image: "assets/images/streaming.jpg",
      imageAlt: "A small room arranged as a streaming desk, with a monitor, a chair, and colored light",
      role: "Platform Desk",
      tags: ["platforms", "youtube", "newsletter", "podcast", "platform recommendation"],
      excerpt: "The same nine-minute essay went to a video page, a podcast feed, and a Sunday letter. Each door finished a different job.",
      productIds: [],
      body: [
        { type: "p", text: "A platform recommendation that starts with “it depends” is usually hiding. So we picked one piece — a nine-minute desk essay — and put it in three places in the same week: a video page, a podcast feed, and a Sunday letter. Same spine. Different doors." },
        { type: "p", text: "The room in the photograph is the video version of that choice. A chair, a monitor, a light someone cared about. It is a real place to demonstrate a thing. It is a poor place to ask for a reply you can use on Thursday." },
        { type: "h2", text: "What changed when the door changed" },
        { type: "p", text: "The video page rewarded the first thirty seconds and punished a muddy middle. People arrived from subscriptions and from search. Search wanted a sentence they could quote. Subscribers wanted a face and a reason to stay. We gave the cold open one job: say the point before any logo." },
        { type: "p", text: "The podcast feed was kinder to the middle. Listeners who pressed play tended to reach the last minute. Chapters mattered more than artwork. We added four chapter marks, and the support mail mentioned them, which almost never happens." },
        { type: "p", text: "The letter did the thing the other two could not. People replied. Not many, and not with applause. They replied with the name of a room they hated. That is a better note than a view count, and it is why the letter is still on the schedule." },
        { type: "quote", text: "Views told us who paused. Replies told us who was recording the next day.", cite: "Platform Desk" },
        { type: "h2", text: "A split, not a manifesto" },
        { type: "ul", items: [
          "Put the argument in the letter if you want a reply you can use",
          "Put the demonstration on video when the point is a light, a screen, or a desk",
          "Put the long conversation in the feed if it survives without a picture",
          "Do not paste the same opening line in all three and call it a strategy"
        ] },
        { type: "p", text: "We are not retiring any of the three. We are retiring the habit of choosing a platform because a slide said it was growing. The weekly show lives where the episode's actual job can finish." }
      ]
    },
    {
      id: "wide-display",
      title: "The Wide Panel Beside the Laptop",
      dek: "We stopped editing on the laptop glass and moved the timeline to a panel that can live next to a window.",
      category: "Product Reviews",
      date: "2025-12-04",
      minutes: 7,
      image: "assets/images/desk.jpg",
      imageAlt: "A wide monitor and a laptop on a wooden desk beside a window",
      role: "Reviews Desk",
      tags: ["monitor", "editing", "product recommendation", "desk"],
      excerpt: "A wide panel by the window took the timeline. The laptop went back to notes. The afternoon got quieter.",
      productIds: ["frame-wide"],
      body: [
        { type: "p", text: "Laptop screens are fine until you have been looking at a timeline since lunch. By four, the gloss had become a second window, and that window had the actual window in it. We moved the long edit to a wide panel and left the laptop open for notes." },
        { type: "p", text: "The photograph is the layout, not a render. Wood desk, plants, daylight from the side, a wide panel, and the machine you can still close and carry. That split is the review." },
        { type: "h2", text: "What calmer actually means" },
        { type: "p", text: "The panel does not make the cut better. It stops the room from sitting on top of the picture. Skin in a talking-head shot stopped drifting toward whatever the wall was doing. Text at arm's length stayed sharp enough that we stopped leaning in, which is a health intervention disguised as a purchase." },
        { type: "ul", items: [
          "Two weeks of ordinary episodes, plus a still grade on the laptop screen for comparison",
          "Brightness set once, then left alone",
          "No stacked “creator” presets",
          "The window stayed uncovered. If a panel only works with the blind down, it failed"
        ] },
        { type: "image", src: "assets/images/monitor.jpg", alt: "A glossy all-in-one computer on a white desk", caption: "A glossy all-in-one we already had. Fine in a dark room. Busy beside a window." },
        { type: "product", id: "frame-wide" },
        { type: "p", text: "If the work is mostly a phone, skip this and fix the light. If the work is a timeline you see most days, a wide panel beside the notes machine is the least glamorous upgrade we would repeat." }
      ]
    },
    {
      id: "face-light",
      title: "Light the Face, Not the Whole Room",
      dek: "A full studio plot, reduced to the two ideas a small room can actually use.",
      category: "Studio Craft",
      date: "2025-11-11",
      minutes: 8,
      image: "assets/images/lights.jpg",
      imageAlt: "Softboxes and overhead lights aimed at a white studio backdrop",
      role: "Studio Desk",
      tags: ["lighting", "studio craft", "product recommendation", "small room"],
      excerpt: "You do not need the cove in the photograph. You need two diffused sources and a background willing to be dull.",
      productIds: ["lumen-soft"],
      body: [
        { type: "p", text: "The photograph is more studio than anyone on a weeknight is going to rent. Softboxes, a grid, a white sweep, stands everywhere. We are showing it because the plot inside it is simple, and the simple part is the part worth copying." },
        { type: "p", text: "A face light. A second source so a shoulder does not glue itself to the wall. A background that is not a glossy print of your own face. That is the Lumen Soft Kit as we actually run it, even when the room is an office and not a cove." },
        { type: "h2", text: "Placement before brightness" },
        { type: "p", text: "The face source sits just off the lens, a little above the eyes, and it is diffused. Bare light is faster and crueler. Bi-color mattered because the afternoon went warm and the hallway bulb did not follow. We matched the face and let the hallway be the hallway. Chasing the whole apartment to one color is how small studios start to look like waiting rooms." },
        { type: "quote", text: "Turn the chair before you buy a third light.", cite: "Studio Desk" },
        { type: "ul", items: [
          "One source for the face, diffused",
          "A second source only if the shoulder disappears",
          "Background dimmer than the face, and not shiny",
          "No ring parked on the lens if you can reach a stand"
        ] },
        { type: "product", id: "lumen-soft" },
        { type: "p", text: "At the shutter speeds we use for short clips, the sources stayed steady. No bands in the frame. One honest source and a dull wall will beat a ring light. The second source is for separation, not for drama." }
      ]
    },
    {
      id: "sunday-letter",
      title: "The Sunday Letter Still Beats the Feed",
      dek: "The letter lost on reach. It won the only count we could use the next morning.",
      category: "Platform Guides",
      date: "2025-10-07",
      minutes: 7,
      image: "assets/images/writing.jpg",
      imageAlt: "A fountain pen writing a line on paper",
      role: "Platform Desk",
      tags: ["newsletter", "platform recommendation", "email", "publishing"],
      excerpt: "A Sunday letter will not win a reach chart. It still produces the replies that change the next episode.",
      productIds: [],
      body: [
        { type: "p", text: "The feed is a fine place to be interrupted. It is a poor place to finish a thought you will need on Thursday. For a season we kept a Sunday letter beside the same essays on the social feed. The letter lost on reach. It won on replies that changed the next episode." },
        { type: "p", text: "A pen on paper is an old picture for a new habit, and we are keeping it because the habit is old on purpose. One argument. One link we will stand next to. A question a person can answer without performing." },
        { type: "h2", text: "What the letter is for" },
        { type: "ul", items: [
          "Send it on a day you can also read the replies",
          "One link, not a pile you are apologizing for",
          "An archive that can be read without an account",
          "No sponsor block you would skip if you were the reader"
        ] },
        { type: "p", text: "We stopped embedding three videos at the top. The people who wanted the picture already knew the door. The letter's job was the sentence and the way back. Platform guides love a chart. The chart we trust is smaller: did a stranger finish, and did they have a way to say what we missed?" },
        { type: "quote", text: "Reach is a weather report. A reply is a note you can act on.", cite: "Platform Desk" },
        { type: "p", text: "If you publish in only one place this month and you want the work to talk back, make it the letter. Leave the feed for the clip that has to be seen to be understood." }
      ]
    },
    {
      id: "vertical-audio",
      title: "Vertical Video Grew Up. The Audio Did Not.",
      dek: "The crop got serious. The microphone was still an arm's length from the mouth, pointed at a keyboard.",
      category: "Industry",
      date: "2025-08-22",
      minutes: 8,
      image: "assets/images/phone.jpg",
      imageAlt: "A smartphone home screen filled with social and messaging apps",
      role: "Industry Desk",
      tags: ["vertical video", "audio", "short form", "industry"],
      excerpt: "A month of short clips had the same boring pattern: a careful frame, and a voice fighting a collar and a music bed.",
      productIds: ["northline-at44"],
      body: [
        { type: "p", text: "The picture in a vertical clip got serious. The audio often did not. We watched a month of our own short clips, on the same glass everyone else watches them on, and the pattern was boring: a careful frame, a lav rubbing a collar, music ducked so hard the room tone pumped." },
        { type: "p", text: "The phone in the photograph is the whole distribution plan for a lot of shows now. Messages, photos, the feed, the tube. None of those icons change the distance between a mouth and a microphone." },
        { type: "h2", text: "The frame changed. The physics did not." },
        { type: "p", text: "A phone camera forgives a messy shelf. A microphone an arm's length from a mouth, aimed past a keyboard, does not. Vertical is not new physics. It is a tighter crop on the same mistakes. We started treating the short clip like a radio hit with a picture attached: write the first line, record the voice close, then shoot the hands." },
        { type: "ul", items: [
          "Record the voice closer than the camera makes you think",
          "Lose the music bed you would talk over in person",
          "Captions are not a substitute for a take you can understand with the sound on",
          "If the room is loud, a dynamic mic still earns its keep"
        ] },
        { type: "p", text: "Music under a technical explanation made the voice work harder. We took it out of the explainers and left it on the titles. The words got easier to hear on a phone speaker, which is the speaker that actually plays the clip." },
        { type: "quote", text: "Say the thing, record it close, and do not bury it.", cite: "Industry Desk" },
        { type: "p", text: "The industry conversation is about length, ads, and who owns the viewer. Fine. The piece you can make this week is quieter than that argument. The bedroom microphone test is the practical half, if the room is not on your side." }
      ]
    },
    {
      id: "monitor-cans",
      title: "Headphones That Tell the Truth About a Take",
      dek: "We did not buy a new mix. We bought a way to know the chair squeaked before a listener did.",
      category: "Product Reviews",
      date: "2025-06-16",
      minutes: 7,
      image: "assets/images/headphones.jpg",
      imageAlt: "Black over-ear headphones on a yellow background",
      role: "Reviews Desk",
      tags: ["headphones", "monitoring", "product recommendation", "editing"],
      excerpt: "Closed-back headphones are a dull purchase. They are also how a bad take gets caught on the desk instead of in the replies.",
      productIds: ["hearth-closed"],
      body: [
        { type: "p", text: "There is a glamorous version of a headphone review, and it involves a dark room and a record you already love. This is the other version. We needed to know, before a file left, whether the take contained a chair, a fan, or a mouth that was too far away." },
        { type: "p", text: "The Hearth Closed-Back is an over-ear, closed pair. The yellow in the product photograph is the backdrop, not a feature. On a head they disappear, which is what you want from a tool that has to survive a full read." },
        { type: "h2", text: "The job we hired them for" },
        { type: "p", text: "Open headphones are lovely in a quiet room and useless as a verdict when the room is not quiet. They mix the desk back into the take. The closed pair keeps that mix out. A rumble stays a rumble. We stopped calling low-end problems “warmth” after the first afternoon." },
        { type: "ul", items: [
          "Check every take with the headphones on, not after the guest has left",
          "Do not set a final music balance on a closed pair",
          "If the headband is hot, the session is already too long",
          "Keep them on the desk, not in a bag across the room"
        ] },
        { type: "quote", text: "If you did not hear it on headphones, you did not record it.", cite: "Reviews Desk" },
        { type: "product", id: "hearth-closed" },
        { type: "p", text: "They will not make a thin recording rich. They will stop you from publishing the thin one by accident. That is the whole recommendation." }
      ]
    },
    {
      id: "human-captions",
      title: "Captions That Sound Like a Person",
      dek: "Automatic captions are a decent first pass and a bad final one. We timed the human pass.",
      category: "Creator Tools",
      date: "2025-05-03",
      minutes: 8,
      image: "assets/images/video.jpg",
      imageAlt: "A close view of a video editing timeline with picture and audio tracks",
      role: "Tools Desk",
      tags: ["captions", "workflow", "creator tools", "editing"],
      excerpt: "A nine-minute essay took twenty-two minutes to caption once the names were in a list. It took forty when they were not.",
      productIds: [],
      body: [
        { type: "p", text: "Automatic captions hear “dynamic” as a person's name and punctuate like they are late for a bus. They are a decent first pass. They are a bad final one, especially on a timeline where the audio track is doing as much work as the picture." },
        { type: "p", text: "We timed a week of episodes to see what a human pass actually costs. The number is small enough to schedule and large enough to miss if you pretend the export button is the editor." },
        { type: "h2", text: "A pass that stays human" },
        { type: "p", text: "Generate the transcript, then fix it in one pass with the audio playing, not in silence. Silence invites you to tidy the speaker into someone else. Playing the take keeps the breath, and it shows you which false start was a joke and which one was only nerves." },
        { type: "image", src: "assets/images/laptop.jpg", alt: "Hands typing on a laptop with a document open on the screen", caption: "The pass happens in a document, with the take playing. Silence makes the wording too tidy." },
        { type: "ul", items: [
          "Names and product titles in a list before you start",
          "One sentence per line on a vertical clip",
          "Punctuation you would say out loud",
          "A second pair of eyes only for numbers, names, and words that change a verdict",
          "Do not auto-translate an episode you have not read in the original"
        ] },
        { type: "quote", text: "A caption track is part of the mix. Treat it like one.", cite: "Tools Desk" },
        { type: "p", text: "On a nine-minute desk essay the correction took twenty-two minutes when the glossary was ready, and closer to forty when it was not. Tools move the cursor. They do not know that a pause was the point. If you publish one improvement this month, read the captions with the sound on before the episode leaves." }
      ]
    },
    {
      id: "podcast-hosts",
      title: "Podcast Hosts for People Who Hate Dashboards",
      dek: "The product is a file that arrives, with chapters, in an app the listener already has.",
      category: "Platform Guides",
      date: "2025-03-19",
      minutes: 8,
      image: "assets/images/podcast.jpg",
      imageAlt: "A studio microphone and headphones in front of a screen showing audio waveforms",
      role: "Platform Desk",
      tags: ["podcast", "hosting", "platform recommendation", "rss"],
      excerpt: "We sorted hosts by the job they finish: a clean episode, a network console, or a bare feed you have to house yourself.",
      productIds: ["hearth-closed"],
      body: [
        { type: "p", text: "Podcast hosting reviews love a pricing table. The table goes stale, and it pretends the dashboard is the product. The product is a file that arrives, with chapters, in an app a listener already opens. The microphone and the waveform in the photograph are the part you can hear. The host is the part that has to get out of the way." },
        { type: "h2", text: "Three kinds of host" },
        { type: "p", text: "The creator host wants you to upload, mark chapters, and leave. The site it makes is plain. Plain is a compliment. Show notes stayed on the episode instead of falling into a template from another decade." },
        { type: "p", text: "The network host is built for several shows and for ads you may not want yet. The tools are deep. The first afternoon is also deep, in the way a basement is deep. One show and no ad operation means you will pay in clicks for a future you have not scheduled." },
        { type: "p", text: "The bare host stores the file and hands you a feed. You bring the website. That is the right answer if you already like your site, and a lonely answer if you do not." },
        { type: "ul", items: [
          "Chapters and a working feed matter more than a theme gallery",
          "Stats are for a question you already have, not for a mood",
          "Download the archive before you need it",
          "A dashboard that hides the feed link has misunderstood the job"
        ] },
        { type: "quote", text: "Pick the host that lets the episode leave this week.", cite: "Platform Desk" },
        { type: "p", text: "Listen back on closed headphones before you blame the host for a dull file. Distribution cannot repair a take you never checked. After that, pick the creator host if you want the show out now, the bare feed if the website is already home, and the network console only when a Friday traffic department actually exists." }
      ]
    },
    {
      id: "weeknight-desk",
      title: "A Broadcast Desk Without a Renovation",
      dek: "No new walls. A boom that parks, headphones that stay out, and cables the lens cannot see.",
      category: "Studio Craft",
      date: "2025-02-08",
      minutes: 8,
      image: "assets/images/mixer.jpg",
      imageAlt: "A studio bench with a microphone, headphones, a keyboard, and outboard gear",
      role: "Studio Desk",
      tags: ["desk", "studio craft", "setup", "weeknight"],
      excerpt: "The bench in the photograph is busier than a weeknight desk. The rule is the same: every tool has a place it returns to.",
      productIds: ["northline-at44", "hearth-closed", "frame-wide", "lumen-soft"],
      body: [
        { type: "p", text: "We wanted a desk that could record on a weeknight without a contractor. That ruled out new walls. It left furniture, a cable sleeve, and a promise that the microphone would not live in a drawer." },
        { type: "p", text: "The bench in the photograph is a working music room, busier than the desk we actually sit at. It still shows the only layout that survived contact with a calendar: the microphone stays on a boom, the headphones stay on the surface, and the keys stay where a hand already is." },
        { type: "h2", text: "The surface" },
        { type: "p", text: "Monitor centered when the edit is long. Interface, or whatever gives the microphone its gain, on the side you can reach with the hand that is not on the mouse. The boom swings in for the take and parks out of the camera. Headphones do not go in a bag across the room, because a bag across the room is how a squeak gets published." },
        { type: "ul", items: [
          "Northline AT-44 on the boom, because the room is ordinary",
          "Hearth headphones on the desk, because the check happens every take",
          "Frame Wide only when the edit runs long; the laptop when it does not",
          "Lumen soft sources for the face, not a ring on the lens",
          "One sleeve for the cables the camera can see"
        ] },
        { type: "quote", text: "A broadcast-ready desk means you can hit record on a Tuesday without apologizing to the room.", cite: "Studio Desk" },
        { type: "p", text: "Nothing here is built into the wall. All of it leaves if we move. The sleeve is cosmetic and also the reason the shot looks finished when we forget to clean. A renovation would have hidden the cables inside the plaster. The sleeve hid them from the lens, which was the actual requirement." }
      ]
    }
  ]
};
