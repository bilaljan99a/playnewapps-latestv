import json

with open('data/stores.json', 'r', encoding='utf-8') as f:
    stores = json.load(f)

for s in stores:
    if s.get('id') == 'applicantally':
        s['name'] = "ApplicantAlly"
        s['icon'] = "psychology"
        s['logo'] = "/assets/images/brands/applicantally-icon.svg"
        s['website'] = "https://applicantally.com"
        s['storeUrl'] = "/applicantally-coupons.html"
        s['affiliateLink'] = "https://xqjeo.com/g/p8sdxttwkob68b264a7630360631df/"
        s['rating'] = 4.9
        s['votes'] = 3120
        s['seoTitle'] = "ApplicantAlly Promo Codes, Coupon Codes & Discounts (2026)"
        s['seoDescription'] = "Save on ApplicantAlly AI live interview copilot with verified 2026 promo codes for 30 free bonus minutes, 15 free trial mins, and up to 35% OFF time packs."
        s['about'] = "ApplicantAlly is an AI-powered desktop live interview copilot for Windows and macOS offering stealth screen overlay, sub-second latency, system audio loopback, STAR resume RAG, and Screen OCR vision capture."
        s['categories'] = ["AI Software", "Career & Education", "Interview Assistance"]
        s['whyShop'] = [
            "100% OS Stealth Overlay (Invisible on Zoom, Teams, and Meet screen sharing)",
            "Native Audio Loopback (Captures interviewer audio directly without joining bots)",
            "STAR Methodology & Personalized Resume RAG Indexing",
            "Pay-As-You-Go Time Packs with Permanent Minute Rollover & No Expiration"
        ]
        s['shoppingTips'] = [
            "Click Show Code at checkout to reveal the verified promo code and claim 30 bonus free minutes on any order.",
            "Sign up for a free account to automatically claim 15 free trial minutes with zero credit card needed.",
            "Choose the 9-Hour Value Pack ($58.00) to get the lowest rate ($6.44/hr) and save 35%.",
            "Pause tracking during waiting rooms or casual intro talk to maximize your minute balance."
        ]
        s['faqs'] = [
            {
                "question": "What is the official ApplicantAlly promo code for 2026?",
                "answer": "Click the Show Code button on the top verified coupon card to reveal and copy the official promo code for 30 free bonus minutes."
            },
            {
                "question": "Does ApplicantAlly offer a free trial?",
                "answer": "Yes! Every new account automatically receives 15 free live interview minutes upon registration with zero credit card required."
            },
            {
                "question": "Do ApplicantAlly time pack minutes expire?",
                "answer": "No. ApplicantAlly operates on a Pay-As-You-Go model. Minutes are deducted strictly during active interview tracking and unused minutes never expire."
            },
            {
                "question": "Is ApplicantAlly invisible on Zoom, Teams, and Google Meet?",
                "answer": "Yes! ApplicantAlly utilizes native OS window flags (NSWindowSharingTypeNone on macOS and SetWindowDisplayAffinity on Windows 10/11) to hide the floating overlay window from screen capture."
            }
        ]

        # Remove review-type fields that cause page type confusion
        s.pop('detailedOverview', None)
        s.pop('extraSections', None)
        s.pop('banners', None)
        s.pop('title', None)

with open('data/stores.json', 'w', encoding='utf-8') as f:
    json.dump(stores, f, indent=2, ensure_ascii=False)

print("Updated ApplicantAlly entry in data/stores.json cleanly!")
