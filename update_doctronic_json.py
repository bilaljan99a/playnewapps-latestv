import json

affiliate_url = "https://tsygg.com/g/7r1pt1n1fob68b264a76abb0242f2d/"

# 1. Update stores.json
with open('data/stores.json', 'r', encoding='utf-8') as f:
    stores = json.load(f)

# Check if doctronic-us exists, if so update, else prepend/append
doctronic_store = {
    "id": "doctronic-us",
    "name": "Doctronic US",
    "icon": "health_and_safety",
    "logo": "/assets/images/brands/doctronic.svg",
    "website": "https://www.doctronic.ai/",
    "storeUrl": "/doctronic-coupons.html",
    "affiliateLink": affiliate_url,
    "rating": 4.9,
    "votes": 12450,
    "seoTitle": "Doctronic Coupon, Offers & Telehealth Guide (2026) | Free AI Consults & $39 Doctor Visits",
    "seoDescription": "Explore verified Doctronic US offers: 24/7 Free AI health consultations, $39 cash-pay telehealth doctor visits, insurance options, prescriptions, and online healthcare guidance.",
    "about": "Doctronic is an AI-powered healthcare platform providing fast, personalized health guidance online. Access free 24/7 AI consultations and connect with licensed U.S. doctors in all 50 states for video visits, prescriptions, and custom treatment plans.",
    "categories": [
        "Healthcare & Medical",
        "Telehealth",
        "AI Health",
        "Virtual Care"
    ],
    "whyShop": [
        "Free AI health consultation available 24/7 with zero subscription fees",
        "Connect with licensed U.S. doctors online for video visits starting at $39",
        "Major health insurance plans accepted for eligible physician consultations",
        "Fast prescriptions, refills, and official doctor's notes delivered electronically"
    ],
    "shoppingTips": [
        "Start with the 100% free Doctronic AI health consultation at any time to receive instant, structured symptom analysis.",
        "Review your personalized AI consultation summary before scheduling a video visit with a licensed U.S. doctor.",
        "If you have health insurance, check if your plan covers telehealth visits for lower out-of-pocket costs.",
        "For urgent, life-threatening medical emergencies, always call 911 or go to the nearest emergency room immediately."
    ],
    "faqs": [
        {
            "question": "Is Doctronic AI consultation really free?",
            "answer": "Yes, Doctronic offers a 100% free 24/7 AI-powered health consultation. You can describe your symptoms and receive personalized health guidance with zero initial payment or subscription requirement."
        },
        {
            "question": "Does Doctronic have a coupon code or discount voucher?",
            "answer": "Currently, there is no active coupon code provided by Doctronic. However, you can access the 24/7 AI consult for free and book licensed doctor telehealth visits starting at $39 or through health insurance."
        },
        {
            "question": "How much does a Doctronic doctor visit cost?",
            "answer": "Doctronic lists cash-pay video visits with licensed U.S. physicians starting at $39. Doctronic also accepts major health insurance plans, which may reduce out-of-pocket patient costs depending on coverage."
        },
        {
            "question": "Can Doctronic doctors provide prescriptions and doctor's notes?",
            "answer": "Yes. When clinically appropriate, licensed U.S. doctors on Doctronic can send prescriptions directly to your local pharmacy and issue official doctor's notes for work or school."
        }
    ]
}

# Remove existing if any, then insert at top
stores = [s for s in stores if s.get('id') not in ('doctronic-us', 'doctronic')]
stores.insert(0, doctronic_store)

with open('data/stores.json', 'w', encoding='utf-8') as f:
    json.dump(stores, f, indent=2)

print("Updated data/stores.json with Doctronic US")

# 2. Update coupons.json
with open('data/coupons.json', 'r', encoding='utf-8') as f:
    coupons = json.load(f)

# Remove old doctronic coupons
coupons = [c for c in coupons if c.get('storeId') not in ('doctronic-us', 'doctronic')]

doctronic_coupons = [
    {
        "id": "doctronic-free-ai-consult",
        "storeId": "doctronic-us",
        "title": "Free AI Health Consult — Available 24/7",
        "description": "Start with Doctronic's AI health consultation at no charge and get personalized health guidance before deciding whether you need a human doctor.",
        "code": "NO CODE NEEDED",
        "discount": "FREE CONSULT",
        "type": "deal",
        "verified": True,
        "isVerified": True,
        "expiry": "2026-12-31",
        "expiryDate": "2026-12-31",
        "affiliateUrl": affiliate_url,
        "url": affiliate_url,
        "store": {
            "id": "doctronic-us",
            "name": "Doctronic US",
            "logo": "/assets/images/brands/doctronic.svg"
        }
    },
    {
        "id": "doctronic-39-doctor-visit",
        "storeId": "doctronic-us",
        "title": "Licensed Doctor Telehealth Visit — $39",
        "description": "When appropriate, connect with a licensed U.S. doctor online. Doctronic's official website currently lists $39 cash-pay video visits, with insurance also accepted.",
        "code": "NO CODE NEEDED",
        "discount": "$39 TELEHEALTH",
        "type": "deal",
        "verified": True,
        "isVerified": True,
        "expiry": "2026-12-31",
        "expiryDate": "2026-12-31",
        "affiliateUrl": affiliate_url,
        "url": affiliate_url,
        "store": {
            "id": "doctronic-us",
            "name": "Doctronic US",
            "logo": "/assets/images/brands/doctronic.svg"
        }
    },
    {
        "id": "doctronic-insurance-accepted",
        "storeId": "doctronic-us",
        "title": "Insurance Accepted for Doctor Visits",
        "description": "Doctronic states that insurance is accepted for eligible human-doctor visits. Exact patient cost depends on your insurance plan.",
        "code": "NO CODE NEEDED",
        "discount": "INSURANCE",
        "type": "deal",
        "verified": True,
        "isVerified": True,
        "expiry": "2026-12-31",
        "expiryDate": "2026-12-31",
        "affiliateUrl": affiliate_url,
        "url": affiliate_url,
        "store": {
            "id": "doctronic-us",
            "name": "Doctronic US",
            "logo": "/assets/images/brands/doctronic.svg"
        }
    },
    {
        "id": "doctronic-247-virtual-care",
        "storeId": "doctronic-us",
        "title": "24/7 Virtual Healthcare Access",
        "description": "Start with the AI health consultation at any time and move to licensed physician care when appropriate across all 50 states.",
        "code": "NO CODE NEEDED",
        "discount": "24/7 ACCESS",
        "type": "deal",
        "verified": True,
        "isVerified": True,
        "expiry": "2026-12-31",
        "expiryDate": "2026-12-31",
        "affiliateUrl": affiliate_url,
        "url": affiliate_url,
        "store": {
            "id": "doctronic-us",
            "name": "Doctronic US",
            "logo": "/assets/images/brands/doctronic.svg"
        }
    },
    {
        "id": "doctronic-prescriptions-refills",
        "storeId": "doctronic-us",
        "title": "Online Prescriptions & Prescription Refills",
        "description": "Connect with licensed U.S. physicians to get appropriate prescriptions sent directly to your preferred local pharmacy.",
        "code": "NO CODE NEEDED",
        "discount": "PRESCRIPTIONS",
        "type": "deal",
        "verified": True,
        "isVerified": True,
        "expiry": "2026-12-31",
        "expiryDate": "2026-12-31",
        "affiliateUrl": affiliate_url,
        "url": affiliate_url,
        "store": {
            "id": "doctronic-us",
            "name": "Doctronic US",
            "logo": "/assets/images/brands/doctronic.svg"
        }
    },
    {
        "id": "doctronic-doctor-notes-treatment",
        "storeId": "doctronic-us",
        "title": "Official Doctor's Notes & Personalized Treatment Plans",
        "description": "Receive official doctor's notes for work or school and custom clinical care plans generated following your virtual visit.",
        "code": "NO CODE NEEDED",
        "discount": "DOCTOR NOTES",
        "type": "deal",
        "verified": True,
        "isVerified": True,
        "expiry": "2026-12-31",
        "expiryDate": "2026-12-31",
        "affiliateUrl": affiliate_url,
        "url": affiliate_url,
        "store": {
            "id": "doctronic-us",
            "name": "Doctronic US",
            "logo": "/assets/images/brands/doctronic.svg"
        }
    }
]

# Insert coupons at top
coupons = doctronic_coupons + coupons

with open('data/coupons.json', 'w', encoding='utf-8') as f:
    json.dump(coupons, f, indent=2)

print("Updated data/coupons.json with Doctronic US offers")
