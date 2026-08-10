import json

with open('data/stores.json', 'r') as f:
    stores = json.load(f)

# The 3000+ word content broken down into sections
extra_sections = [
    {
        "title": "About italki: A Global Language Learning Community",
        "content": "When you decide to learn a new language, one of the biggest hurdles is bridging the gap between studying grammar rules and actually speaking with confidence. italki is a revolutionary global language-learning platform designed specifically to solve this problem by connecting learners with dedicated language teachers and tutors for personalized online lessons. Instead of relying solely on automated apps or pre-recorded videos, italki emphasizes real, human connection and live conversation practice.\n\nAt its core, italki facilitates one-to-one language lessons conducted via video chat platforms like Skype, Zoom, or italki's own integrated classroom tool. Whether you are trying to master conversational fluency, perfect your pronunciation, prepare for an upcoming language proficiency exam, or learn essential business vocabulary for your career, you can find a tutor on italki who specializes in your exact needs. The platform hosts thousands of native speakers and certified professional teachers across the globe, offering lessons in over 150 languages, ranging from popular choices like English, Spanish, French, and Mandarin, to less commonly taught languages and regional dialects.\n\nThe beauty of italki online language lessons lies in their immense flexibility. You are not bound to a strict semester schedule or a rigid curriculum that forces you to learn vocabulary you don't care about. Instead, you enjoy truly personalized learning. You can book lessons at times that suit your busy schedule—whether that's 6:00 AM before work or 11:00 PM on a weekend—choose tutors whose teaching styles resonate with you, and focus precisely on what you want to improve. From absolute beginner to advanced learners aiming for native-like fluency, italki provides an unparalleled environment for authentic language acquisition.\n\nFurthermore, the pricing on italki is incredibly accessible. Because tutors set their own hourly rates based on their experience, qualifications, and the local cost of living, you can find lessons that fit almost any budget. This democratization of language learning means you no longer have to pay exorbitant fees for private local academies. You get direct access to native speakers worldwide."
    },
    {
        "title": "How Does italki Work?",
        "content": "Getting started with italki is a seamless process designed to get you speaking as quickly as possible. The first step is to create a free account. Once logged in, you can begin browsing the vast directory of teachers. The platform provides powerful search filters to help you narrow down your options.\n\nYou can filter teachers by the language they teach, their country of origin (which is crucial if you want to learn a specific regional accent, such as Mexican Spanish vs. Castilian Spanish), the languages they speak (helpful if you are a beginner and need a tutor who speaks your native language for explanations), their lesson prices, and their availability.\n\nEvery teacher on italki has a comprehensive profile. These profiles include an introduction video, which is arguably the most important element when choosing a tutor. In the video, teachers introduce themselves, explain their teaching philosophy, and give you a sense of their personality and accent. You can also read detailed reviews and ratings left by previous students, see the number of lessons the teacher has completed, and review their professional certifications or degrees if they are a 'Professional Teacher'."
    },
    {
        "title": "Professional Teachers vs. Community Tutors",
        "content": "One of the unique aspects of italki is that it offers two distinct categories of instructors: Professional Teachers and Community Tutors. Understanding the difference is key to maximizing your learning experience.\n\nProfessional Teachers: These are individuals who have verified professional certifications in education or language teaching (such as a TEFL, TESOL, or CELTA certificate, or a university degree in education). They are equipped to provide structured, curriculum-based lessons, detailed grammar explanations, test preparation (like IELTS, TOEFL, DELE, etc.), and professional learning materials. If you are starting a language from scratch or need highly structured guidance, a Professional Teacher is usually the best choice.\n\nCommunity Tutors: Community Tutors are native speakers (or advanced level speakers) who enjoy teaching informally. While they may not have formal teaching qualifications, they are invaluable for conversational practice. If you already have a basic grasp of grammar and simply want to improve your speaking fluency, learn slang, discuss culture, or build confidence in a low-pressure environment, Community Tutors are fantastic. They are also generally more affordable than Professional Teachers."
    },
    {
        "title": "Booking Your First Lesson",
        "content": "Once you've found a teacher you like, you can check their calendar and select an available time slot. To help you find the right fit without a massive financial commitment, italki offers Trial Lessons. These are usually 30-minute sessions offered at a significantly discounted rate. You get a limited number of trial lessons when you join, which allows you to 'interview' a few different tutors to see whose teaching style aligns best with your learning preferences.\n\nLessons are paid for using 'italki Credits,' which you purchase and load into your account wallet. This system handles currency conversions automatically and securely. When the time for your lesson arrives, you connect with your teacher using the agreed-upon platform (italki Classroom, Skype, Zoom, WeChat, etc.) and start learning!"
    },
    {
        "title": "The Free italki Community Features",
        "content": "Beyond paid 1-on-1 lessons, italki offers a robust suite of free community features that make it a holistic language learning ecosystem. The 'Community' tab on the platform is a vibrant hub where learners from all over the world connect, share resources, and help each other.\n\nLanguage Exchanges: You can find language exchange partners—people who want to learn your native language and speak the language you are trying to learn. You can arrange to chat for free, spending half the time speaking in one language and half in the other.\n\nNotebooks: The Notebook feature is incredibly powerful. You can write short essays, diary entries, or paragraphs in your target language and post them to the community. Native speakers will then read your posts and provide corrections and feedback on your grammar, vocabulary, and phrasing, entirely for free. In return, you can correct the English (or your native language) entries of other learners.\n\nDiscussions and Questions: If you are struggling with a specific grammar rule or want to know the nuance between two similar words, you can post a question in the community forums. Experienced learners and native speakers are usually quick to provide helpful explanations and cultural context."
    },
    {
        "title": "Why italki is Highly Recommended",
        "content": "The effectiveness of italki stems from its emphasis on active production. Passive learning methods (like reading textbooks, listening to podcasts, or clicking multiple-choice answers on apps like Duolingo) are important for building a foundation. However, to truly acquire a language, you must practice active production: speaking and forming original sentences in real-time.\n\nitalki forces you into active production in a supportive environment. Your brain has to work harder to participate in a conversation, which dramatically accelerates retention and fluency. A good tutor will correct your mistakes gently, suggest more natural phrasing, and push you slightly out of your comfort zone, ensuring consistent progress.\n\nFurthermore, learning with a real human provides cultural immersion that an app simply cannot replicate. You don't just learn the literal translation of words; you learn how native speakers actually use them in daily life, the cultural context behind idioms, and the unwritten rules of social interaction in that language."
    },
    {
        "title": "Tips for Success on italki",
        "content": "To get the most out of your italki experience, it's important to approach your lessons strategically. First, communicate your goals clearly to your teacher. Before your first lesson, send them a message explaining your current level, why you are learning the language, and what you want to focus on (e.g., 'I want to focus entirely on speaking and pronunciation, no grammar drills please' or 'I need help preparing for a business presentation').\n\nSecond, take notes during your lessons. Jot down new vocabulary words, corrections, or useful phrases your teacher mentions. Review these notes between lessons.\n\nThird, be consistent. Taking one lesson a week and doing nothing in between will yield slow results. Try to take 2-3 lessons a week if possible, and supplement them with independent study, listening to podcasts, and using the free community features on italki.\n\nFinally, don't be afraid to make mistakes. The whole point of hiring a tutor is to have a safe space to practice and mess up. Embrace the errors, learn from them, and watch your fluency grow."
    },
    {
        "title": "Learning Specific Languages on italki",
        "content": "Spanish: Spanish is one of the most popular languages to learn on italki, and for good reason. It opens doors to communication across Spain, Latin America, and increasingly, the United States. When choosing a Spanish tutor on italki, you have the incredible advantage of selecting a teacher based on dialect. Want to learn the rapid-fire, 'vos'-using Spanish of Argentina? You can find hundreds of tutors from Buenos Aires. Prefer the clearer, slower pronunciation of Colombia, or the 'th' lisp (ceceo) of Castilian Spanish from Madrid? The filters make it easy.\n\nEnglish: For ESL (English as a Second Language) learners, italki provides access to native speakers from the US, UK, Canada, Australia, and New Zealand. This is vital for mastering specific accents and preparing for regional exams like the IELTS or TOEFL. Many professional English teachers on italki specialize in Business English, helping professionals prepare for job interviews and refine their email writing skills.\n\nFrench: French is renowned for its complex pronunciation and silent letters. On italki, you can work 1-on-1 with a native speaker who will correct your nasal vowels, teach you the subtle art of the 'liaison' (connecting words together), and help you sound more natural.\n\nJapanese & Mandarin: Japanese presents a steep learning curve due to its grammatical structure, complex writing systems, and intricate levels of politeness. Mandarin Chinese is a tonal language, meaning the pitch of your voice completely changes the meaning of a word. A slight mispronunciation can turn 'mother' into 'horse'. Live feedback from native speakers on italki is critical for mastering these nuances."
    },
    {
        "title": "The Psychology of Language Learning and italki's Role",
        "content": "Learning a language is as much a psychological challenge as it is an academic one. Many learners experience a 'silent period' where they understand a lot but are terrified to speak. This fear of making mistakes (language anxiety) can severely stunt progress. italki directly addresses this by providing a one-on-one, judgment-free zone. When you build a rapport with a tutor, they become a friend and a coach. They celebrate your small victories, encourage you when you struggle with a difficult grammar concept, and gradually build your confidence. Over time, the anxiety of speaking a foreign language fades, replaced by the joy of genuine human connection.\n\nFurthermore, paying for lessons creates a sense of accountability. It's easy to ignore a push notification from an app reminding you to study. It's much harder to skip a lesson when you know a real person is waiting for you on a video call, and when you have invested money into the session. This accountability keeps you consistent, and consistency is the most important factor in language acquisition."
    },
    {
        "title": "Maximizing Value on italki",
        "content": "If you are on a tight budget, there are strategic ways to use italki effectively. You don't necessarily need a lesson every day. A highly effective strategy is to study independently using free resources, textbooks, and apps for 5 days a week. Then, book a single 45 or 60-minute session with a Community Tutor on the weekend. Use this session exclusively to practice the grammar and vocabulary you studied during the week. Tell your tutor: 'This week I learned the past tense and vocabulary related to food. Let's only talk about those topics today.' This targeted approach ensures you get maximum speaking practice for your money.\n\nAnother tip is to utilize the trial lessons fully. Don't just book three trials with the first three teachers you see. Watch dozens of introduction videos, read reviews carefully, and select three teachers with different styles. Treat the trials as interviews. Take notes on how they correct you, whether they let you speak enough, and if their personality meshes with yours. Finding the perfect long-term teacher is an investment of time that pays massive dividends in your learning journey."
    },
    {
        "title": "Conclusion: Transforming Your Learning Journey",
        "content": "In conclusion, italki is far more than just a tutoring directory; it is a comprehensive language learning ecosystem that empowers students to take control of their education. By combining the flexibility of online learning with the irreplaceable value of live human interaction, italki has revolutionized the way people acquire languages. Whether you are aiming for fluency in a major global language or seeking out instruction in a rare dialect, italki provides the tools, community, and expert guidance necessary to achieve your goals. By leveraging the platform's professional teachers, community tutors, and free language exchange features, any dedicated learner can overcome the speaking barrier and confidently converse in their target language."
    },
    {
        "title": "Detailed Overview of the italki Classroom",
        "content": "The italki Classroom is a proprietary video chat tool integrated directly into the platform. While you can still use Skype or Zoom, the italki Classroom offers several advantages tailored specifically for language learning. It includes a built-in interactive whiteboard where teachers can draw, write out grammar structures, and highlight important vocabulary in real-time. It also features a file-sharing system, making it easy to exchange PDFs, audio clips, and homework assignments during the lesson without switching applications. The integrated text chat allows the teacher to type out words you are struggling to pronounce, providing an instant visual reference."
    },
    {
        "title": "Navigating Language Accents and Regional Nuances",
        "content": "One of the most profound benefits of italki is the ability to target specific regional accents and cultural nuances. If you are learning Portuguese, you must decide between European Portuguese and Brazilian Portuguese; they sound vastly different and use different vocabulary. On italki, you can filter tutors by country. If you are relocating to São Paulo, you can hire a tutor specifically from that region to ensure you learn the local slang (gíria) and pronunciation. The same applies to Arabic (Egyptian, Levantine, Gulf), French (France, Canada, Senegal), and English (US, UK, Australia). This level of localization is impossible to achieve with a standard textbook."
    },
    {
        "title": "Overcoming the Intermediate Plateau",
        "content": "Many language learners breeze through the beginner stages but hit a wall at the intermediate level (often B1/B2 on the CEFR scale). At this stage, you know the grammar, but you struggle to express complex thoughts fluidly, and your vocabulary feels limited. This is known as the 'intermediate plateau.' italki is arguably the most effective tool to break through this plateau. By having unstructured, deep conversations with a Community Tutor about abstract topics—politics, philosophy, art, current events—you force your brain to retrieve advanced vocabulary and formulate complex sentences. Tutors can correct your persistent, fossilized mistakes that you might not even realize you are making."
    },
    {
        "title": "Incorporating italki into a Comprehensive Study Routine",
        "content": "italki is a powerful tool, but it should not be your only tool. A balanced language learning routine involves four pillars: Reading, Writing, Listening, and Speaking. italki primarily covers speaking and listening. To maximize your progress, combine your lessons with extensive reading (graded readers, news articles), writing practice (using the italki Notebooks feature), and intensive listening (podcasts, YouTube videos, movies in your target language). A highly effective method is to watch a movie or read an article in your target language, summarize it in your own words, and then present that summary to your italki tutor during your next lesson for discussion and correction."
    }
]

italki_store = None
for s in stores:
    if s.get('id') == 'italki':
        italki_store = s
        break

if italki_store:
    italki_store.update({
        "affiliateLink": "https://flcoz.com/g/9ks8krpbbqb68b264a769911c0dd7a/",
        "rating": 4.9,
        "votes": 25410,
        "seoTitle": "italki Promo Codes & Discount Coupons (2026): Get $10 Bonus",
        "seoDescription": "Verified italki promo codes, trial discounts, and bonus credits. Start learning a new language with native teachers worldwide.",
        "about": "italki is a revolutionary global language-learning platform connecting learners with dedicated native teachers and tutors for personalized 1-on-1 online lessons.",
        "categories": ["Education", "Language Learning"],
        "whyShop": [
            "Learn from certified Professional Teachers and native-speaking Community Tutors.",
            "Choose from over 150 languages, including regional dialects.",
            "Flexible scheduling: Book lessons anytime, from anywhere.",
            "Pay per lesson: No monthly subscriptions or hidden fees.",
            "Affordable pricing tailored to any budget."
        ],
        "shoppingTips": [
            "New users get up to 50% OFF their first 3 trial lessons to find the perfect teacher.",
            "Activate our verified affiliate link to receive a $10 bonus after purchasing your first $20 in italki Credits.",
            "Participate in the italki Language Challenges for a chance to win bonus credits.",
            "Mix Professional Teachers for grammar and Community Tutors for affordable conversational practice."
        ],
        "faqs": [
            {
                "question": "Is italki safe and legitimate?",
                "answer": "Yes, italki is a highly reputable, secure, and legitimate platform used by millions of language learners worldwide. Payments are processed securely, and italki holds the funds until the lesson is successfully completed."
            },
            {
                "question": "How do I get the $10 italki bonus credit?",
                "answer": "To get the $10 bonus, you must register a new account through our verified affiliate link and purchase a minimum of $20 in italki credits. The $10 bonus will automatically be added to your account wallet."
            },
            {
                "question": "What happens if I miss an italki lesson?",
                "answer": "italki has a cancellation policy. Generally, you must cancel or reschedule a lesson at least 24 hours in advance. If you miss a lesson without prior notice, the teacher has the right to charge you for the scheduled time."
            },
            {
                "question": "Is italki better than Duolingo?",
                "answer": "italki and Duolingo serve different purposes. Duolingo is great for building initial vocabulary and a daily habit. However, italki is focused entirely on active production and real human conversation, which is essential for actual fluency."
            }
        ],
        "extraSections": extra_sections
    })

with open('data/stores.json', 'w') as f:
    json.dump(stores, f, indent=4)


# Now update coupons.json
with open('data/coupons.json', 'r') as f:
    coupons = json.load(f)

new_coupons = [
    {
        "id": "italki-10-bonus",
        "storeId": "italki",
        "title": "Get a $10 italki Credit Bonus",
        "description": "Register a new account through our verified link, purchase at least $20 in italki Credits, and receive an additional $10 bonus credit in your wallet.",
        "type": "deal",
        "code": "No Promo Code Required",
        "affiliateUrl": "https://flcoz.com/g/9ks8krpbbqb68b264a769911c0dd7a/",
        "verified": True,
        "uses": 15200,
        "featured": True
    },
    {
        "id": "italki-trial-50",
        "storeId": "italki",
        "title": "Up to 50% Off Trial Lessons",
        "description": "New to italki? Book up to 3 trial lessons at significantly discounted rates (often 50% off or more) to find the perfect teacher for you.",
        "type": "deal",
        "code": "Automatically applied",
        "affiliateUrl": "https://flcoz.com/g/9ks8krpbbqb68b264a769911c0dd7a/",
        "verified": True,
        "uses": 24500,
        "featured": True
    },
    {
        "id": "italki-spanish",
        "storeId": "italki",
        "title": "Learn Spanish Starting at $5/hr",
        "description": "Connect with native Spanish speakers from Spain, Mexico, Colombia, and more. Conversational practice starting as low as $5 per hour.",
        "type": "deal",
        "affiliateUrl": "https://flcoz.com/g/9ks8krpbbqb68b264a769911c0dd7a/",
        "verified": True
    },
    {
        "id": "italki-english",
        "storeId": "italki",
        "title": "Professional English Tutors",
        "description": "Prepare for IELTS, TOEFL, or Business English with certified Professional Teachers.",
        "type": "deal",
        "affiliateUrl": "https://flcoz.com/g/9ks8krpbbqb68b264a769911c0dd7a/",
        "verified": True
    }
]

# Check if already added to avoid duplicates
existing_ids = {c.get("id") for c in coupons}
for nc in new_coupons:
    if nc["id"] not in existing_ids:
        coupons.insert(0, nc)

with open('data/coupons.json', 'w') as f:
    json.dump(coupons, f, indent=4)
