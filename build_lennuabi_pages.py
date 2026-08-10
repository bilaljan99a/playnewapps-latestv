import os
import json

AFFILIATE_LINK = "https://cafxq.com/g/913bhutj0zb68b264a76a8b9cbb737/"
LOGO_PATH = "/assets/images/brands/lennuabi.svg"

from build_lennuabi_pages_coupons import build_coupons_page

# Write coupons page
with open('lennuabi-coupons.html', 'w', encoding='utf-8') as f:
    f.write(build_coupons_page())

print("Built lennuabi-coupons.html successfully!")

# Update data/stores.json and data/coupons.json
def update_json_catalogs():
    lennuabi_store_data = {
        "id": "lennuabi",
        "name": "Lennuabi",
        "icon": "flight_takeoff",
        "logo": LOGO_PATH,
        "website": "https://www.lennuabi.com/",
        "storeUrl": "/lennuabi-coupons.html",
        "affiliateLink": AFFILIATE_LINK,
        "rating": 4.8,
        "votes": 2890,
        "seoTitle": "Lennuabi Promo Code, Coupon Code & Deals (2026): Flight Compensation",
        "seoDescription": "Claim up to €600 for flight delays or cancellations with Lennuabi. Check verified 2026 Lennuabi deals, no-win-no-fee passenger rights protection, and €75 referral rewards.",
        "about": "Lennuabi is a premier European air passenger rights enforcement company helping travelers claim up to €600 for flight delays, cancellations, overbooking, and missed connections under EU Regulation EC 261/2004.",
        "categories": [
            "Travel & Flight Deals",
            "Passenger Rights",
            "Flight Compensation"
        ],
        "faqs": [
            {
                "question": "Is there an active Lennuabi coupon code?",
                "answer": "No traditional coupon code is required or listed for Lennuabi. Because Lennuabi operates on a 100% No Win, No Fee commission basis with €0 upfront cost, traditional checkout promo codes do not exist. All passengers receive a 100% free flight eligibility check and up to €75 referral rewards."
            },
            {
                "question": "Does Lennuabi charge any upfront fees?",
                "answer": "No, Lennuabi charges zero upfront fees. Checking flight delay eligibility and submitting documents is completely free. You will never pay any out-of-pocket money regardless of claim outcome."
            },
            {
                "question": "How much compensation can I get for a flight delay?",
                "answer": "Under EU Regulation EC 261/2004, statutory cash compensation ranges from €250 for short-haul flights (up to 1,500 km), €400 for medium-haul flights (1,500 km to 3,500 km), up to €600 per passenger for long-haul flights delayed by 4+ hours."
            },
            {
                "question": "How does the No Win, No Fee guarantee work?",
                "answer": "Lennuabi covers all legal, administrative, and court filing expenses required to process your claim. A success commission is deducted strictly from recovered funds if compensation is collected. If the claim is unsuccessful, you pay €0."
            },
            {
                "question": "How does the Lennuabi €75 referral program work?",
                "answer": "You can share your unique referral link with friends or family facing flight disruptions. When a referred passenger successfully receives compensation through Lennuabi, you receive up to a €75 cash bonus."
            },
            {
                "question": "Can Lennuabi help if my flight was cancelled?",
                "answer": "Yes. If your flight was cancelled less than 14 days before departure without extraordinary justification, Lennuabi helps you claim statutory cash compensation (€250–€600) plus ensure you receive your ticket refund or alternative flight re-routing."
            },
            {
                "question": "What documents do I need to submit a claim with Lennuabi?",
                "answer": "You only need basic travel documents: your booking reference number (PNR), e-ticket confirmation or electronic boarding pass, and a valid photo ID."
            },
            {
                "question": "How long does a Lennuabi flight claim take to settle?",
                "answer": "Responsive European airlines settle in 3 to 6 weeks out of court. Uncooperative carriers requiring legal escalation or court proceedings can take 2 to 5 months."
            },
            {
                "question": "Can I claim compensation for an old flight from 2 or 3 years ago?",
                "answer": "Yes. In many European countries, the legal statute of limitations for EC261 claims ranges from 3 to 6 years (e.g., 3 years in Estonia and Germany, 6 years in the UK)."
            },
            {
                "question": "What are extraordinary circumstances in flight delay claims?",
                "answer": "Extraordinary circumstances are unpreventable events outside an airline's control, such as extreme weather, volcanic ash, or air traffic control strikes. Airline technical maintenance issues and crew shortages are NOT extraordinary circumstances."
            },
            {
                "question": "Does Lennuabi handle missed connecting flights?",
                "answer": "Yes. If a minor delay on your first leg causes you to miss a connecting flight under a single ticket, resulting in arriving at your ultimate destination 3+ hours late, Lennuabi enforces compensation for the entire route."
            },
            {
                "question": "What if the airline gave me food vouchers or hotel stays?",
                "answer": "Accepting food or hotel care vouchers represents the airline's statutory duty of care and does NOT forfeit your legal right to monetary EC261 compensation (€250–€600)."
            },
            {
                "question": "Can I claim compensation if I was bumped due to overbooking?",
                "answer": "Yes. Involuntary denied boarding due to overbooking entitles passengers to immediate cash compensation (€250, €400, or €600) plus re-routing or a refund."
            },
            {
                "question": "Is Lennuabi a legitimate passenger rights company?",
                "answer": "Yes. Lennuabi is a legitimate, registered European air passenger rights legal enforcement firm based in Tallinn, Estonia operating under EU consumer laws."
            },
            {
                "question": "How do I receive my money when Lennuabi wins my claim?",
                "answer": "Once the airline remits funds, Lennuabi transfers your net compensation directly to your bank account via SEPA, IBAN, or international bank wire transfer."
            }
        ]
    }

    try:
        with open('data/stores.json', 'r', encoding='utf-8') as f:
            stores = json.load(f)
        
        stores = [s for s in stores if s.get('id') != 'lennuabi']
        stores.insert(0, lennuabi_store_data)

        with open('data/stores.json', 'w', encoding='utf-8') as f:
            json.dump(stores, f, indent=4)
        print("Updated data/stores.json with Lennuabi!")
    except Exception as e:
        print("Error updating stores.json:", e)

    lennuabi_coupons_data = {
        "storeId": "lennuabi",
        "storeName": "Lennuabi",
        "storeLogo": LOGO_PATH,
        "coupons": [
            {
                "id": "lennuabi-free-check",
                "title": "Free Flight Compensation Eligibility Check",
                "description": "Calculate your estimated flight delay compensation (€250 - €600) for free in under 2 minutes.",
                "code": "NO CODE NEEDED",
                "discount": "FREE CHECK",
                "type": "Deal",
                "verified": True,
                "affiliateLink": AFFILIATE_LINK,
                "expiry": "2026-12-31"
            },
            {
                "id": "lennuabi-no-win-no-fee",
                "title": "100% No Win, No Fee Financial Guarantee",
                "description": "Zero upfront costs. Lennuabi covers all legal expenses and only charges if your payout is collected.",
                "code": "NO CODE NEEDED",
                "discount": "0% UPFRONT",
                "type": "Guarantee",
                "verified": True,
                "affiliateLink": AFFILIATE_LINK,
                "expiry": "2026-12-31"
            },
            {
                "id": "lennuabi-referral-75",
                "title": "Earn Up To €75 Per Friend Referral Reward",
                "description": "Invite friends facing flight disruptions and receive up to €75 cash bonus when their claim settles.",
                "code": "NO CODE NEEDED",
                "discount": "€75 BONUS",
                "type": "Referral",
                "verified": True,
                "affiliateLink": AFFILIATE_LINK,
                "expiry": "2026-12-31"
            }
        ]
    }

    try:
        with open('data/coupons.json', 'r', encoding='utf-8') as f:
            coupons_list = json.load(f)
        
        coupons_list = [c for c in coupons_list if c.get('storeId') != 'lennuabi']
        coupons_list.insert(0, lennuabi_coupons_data)

        with open('data/coupons.json', 'w', encoding='utf-8') as f:
            json.dump(coupons_list, f, indent=4)
        print("Updated data/coupons.json with Lennuabi!")
    except Exception as e:
        print("Error updating coupons.json:", e)

update_json_catalogs()
