import json
import random
import uuid
import time

def generate_tweet_data():
    # --- Data Source ---
    
    users = [
        "@rohit_cricket", "@NewsMumbai", "@generic_user_99", "@priya_sharma", "@mumbai_foodie",
        "@traffic_woes", "@bollywood_buzz", "@tech_guru_raj", "@sneha_k", "@amit_patel_123",
        "@mumbaikar_joe", "@city_lights", "@chai_lover", "@ipl_fanatic", "@movie_buff_22",
        "@local_train_hero", "@monsoon_mood", "@finance_wiz", "@student_life", "@coding_ninja"
    ]

    # Noise Templates (80%)
    noise_templates = {
        "cricket": [
            "Kohli is definitely scoring a century today! #IPL #RCB",
            "Mumbai Indians need to change their bowling strategy. #MIvCSK",
            "What a catch by Jadeja! Unbelievable! 🏏",
            "IPL tickets are so expensive this year, yaar.",
            "Watching the match with chai and pakodas. Perfect Sunday."
        ],
        "bollywood": [
            "Just watched the new SRK movie. It's a blockbuster! #Pathaan",
            "Deepika's look in the new song is stunning. 😍",
            "Can't wait for the next season of Family Man.",
            "Bollywood music these days is just remixes. Miss the 90s.",
            "Who is winning the Filmfare award this year?"
        ],
        "food": [
            "Nothing beats a hot Vada Pav in this weather. 😋 #MumbaiFood",
            "Craving butter chicken and naan right now.",
            "Best place for pav bhaji in Dadar? Suggestions pls.",
            "My mom made gajar ka halwa! Heaven.",
            "Chai is not a drink, it's an emotion. ☕"
        ],
        "traffic": [
            "Stuck at Silk Board... oh wait, wrong city. Stuck at WEH! 🚗",
            "Why is there so much traffic at 2 PM? #MumbaiTraffic",
            "Auto driver refused to go to Bandra. Standard story.",
            "Local trains are delayed by 10 mins. Typical.",
            "Finally reached office after 2 hours. Exhausted."
        ],
        "weather_generic": [
            "Nice weather today, finally some breeze.",
            "It's raining a bit, hope it doesn't spoil my plans.",
            "Love the smell of wet earth. Petrichor ❤️",
            "Is it going to rain all day? #MumbaiRains",
            "Cloudy skies, perfect for a long drive."
        ],
        "random": [
            "Just finished my assignment. So relieved.",
            "Looking for a flatmate in Andheri. DM if interested.",
            "My cat is sleeping in the weirdest position. 😂",
            "Anyone up for a game of Valorant?",
            "Monday blues hitting hard."
        ]
    }

    # Crisis Templates (20%) - Categorized by Phase
    crisis_templates = {
        "Set A: Early Morning": [
            {"text": "Water starting to accumulate near Hindmata. Avoid if possible. #MumbaiRains", "type": "true"},
            {"text": "Heard rumors about a dam crack? Is it true? #scary", "type": "rumor"},
            {"text": "Heavy rains predicted for the next 4 hours. Stay safe everyone.", "type": "true"},
            {"text": "My building basement is getting flooded. Help!", "type": "true"},
            {"text": "WhatsApp forward says North Mumbai dam is unstable. Fake news?", "type": "rumor"},
            {"text": "Andheri subway might close soon. Water rising fast.", "type": "true"},
            {"text": "Why is the BMC not pumping out water? #MumbaiFloods", "type": "true"},
            {"text": "Just saw a video of a car floating in Malad. Be careful!", "type": "true"},
            {"text": "Is the dam story real? My aunt called me panicking.", "type": "rumor"},
            {"text": "Traffic halted at Sion due to waterlogging.", "type": "true"}
        ],
        "Set B: Peak Crisis": [
            {"text": "BREAKING: Dam burst in North Mumbai! Run for your lives! #DamBurst", "type": "rumor"},
            {"text": "Water level is neck deep in Kurla! We are stuck on the first floor.", "type": "true"},
            {"text": "PLEASE HELP. Grandparents stuck in ground floor flat in Kalina. DM for address.", "type": "true"},
            {"text": "Do NOT believe the dam rumors! BMC has confirmed it's safe. #FakeNews", "type": "true"},
            {"text": "Electricity cut off in our area for 3 hours. Mobile battery dying.", "type": "true"},
            {"text": "The dam has definitely cracked, I saw it on TV! (It was a movie clip)", "type": "rumor"},
            {"text": "Western Express Highway is a river now. Avoid at all costs.", "type": "true"},
            {"text": "Emergency numbers are busy. What to do? #MumbaiEmergency", "type": "true"},
            {"text": "Guys, the dam burst news is spreading like fire. Is it legit?", "type": "rumor"},
            {"text": "Rescue boats needed in Milan Subway area immediately!", "type": "true"}
        ],
        "Set C: Aftermath": [
            {"text": "Water finally receding in Dadar. What a nightmare.", "type": "true"},
            {"text": "So the dam thing was a hoax? People are stupid. #MumbaiRains", "type": "true"},
            {"text": "Look at the garbage left behind by the flood. Disgusting.", "type": "true"},
            {"text": "Still no electricity in my area. When will it be back?", "type": "true"},
            {"text": "Thank you Mumbai Police for the help yesterday. Real heroes.", "type": "true"},
            {"text": "My car is fully damaged. Insurance claim going to be a headache.", "type": "true"},
            {"text": "Can we please arrest the people who started the dam rumor?", "type": "true"},
            {"text": "Trains are running slowly but running. Back to work.", "type": "true"},
            {"text": "Lost my wallet in the flood yesterday. If found pls DM.", "type": "true"},
            {"text": "The city spirit is unbreakable. We move on. #MumbaiSpirit", "type": "true"}
        ]
    }

    sets = ["Set A: Early Morning", "Set B: Peak Crisis", "Set C: Aftermath"]
    
    for set_name in sets:
        tweets = []
        
        # We need 50 tweets total.
        # 20% Crisis = 10 tweets.
        # 80% Noise = 40 tweets.
        
        # Prepare the pools
        crisis_pool = crisis_templates[set_name]
        # Ensure we have enough crisis tweets, duplicate if needed or sample
        # The templates have exactly 10, so we can just use them all.
        # If we want randomness, we can shuffle them.
        random.shuffle(crisis_pool)
        
        # Generate 40 noise tweets
        noise_pool = []
        keys = list(noise_templates.keys())
        for _ in range(40):
            category = random.choice(keys)
            template = random.choice(noise_templates[category])
            noise_pool.append(template)
        
        # Logic to bury crisis tweets: "Between 4-5 normal tweets"
        # Pattern: N N N N C N N N N C ...
        # 50 slots. 10 Crisis.
        # Ideally: Crisis at indices 4, 9, 14, 19... (approx)
        
        # Let's construct the list by interleaving.
        # We have 40 N and 10 C.
        # We can create chunks of (4 Normal + 1 Crisis) or (3 Normal + 1 Crisis) etc.
        # 40 / 10 = 4. So exactly 4 Normal for every 1 Crisis works perfectly.
        # Sequence: N N N N C, N N N N C ...
        
        final_sequence = []
        n_idx = 0
        c_idx = 0
        
        for _ in range(10):
            # Add 4 noise
            for _ in range(4):
                final_sequence.append({
                    "text": noise_pool[n_idx],
                    "is_crisis": False
                })
                n_idx += 1
            # Add 1 crisis
            final_sequence.append({
                "text": crisis_pool[c_idx]["text"],
                "is_crisis": True,
                "type": crisis_pool[c_idx]["type"]
            })
            c_idx += 1
            
        # Add timestamps (relative)
        # Set A: 10m ago to 1m ago
        # Set B: 10m ago to 1m ago
        # Set C: 1h ago to 10m ago
        
        for i, item in enumerate(final_sequence):
            is_crisis = item["is_crisis"]
            
            # Metrics
            if is_crisis:
                likes = random.randint(100, 5000)
                retweets = random.randint(50, 2000)
            else:
                likes = random.randint(0, 50)
                retweets = random.randint(0, 5)
                
            # Generate Random Post Date (June-Oct 2025)
            month = random.randint(6, 10)
            day = random.randint(1, 28) # Safe for all months
            hour = random.randint(0, 23)
            minute = random.randint(0, 59)
            second = random.randint(0, 59)
            
            # Create datetime object
            from datetime import datetime
            dt = datetime(2025, month, day, hour, minute, second)
            # Format: Thu, 27 Nov 2025 13:52:00 GMT
            post_date = dt.strftime("%a, %d %b %Y %H:%M:%S GMT")

            tweet = {
                "id": str(uuid.uuid4()),
                "text": item["text"],
                "user": random.choice(users),
                "timestamp": f"{random.randint(1, 60)}m ago", # Simplified
                "post_date": post_date,
                "metrics": {
                    "likes": likes,
                    "retweets": retweets
                },
                "image_url": None,
                "is_crisis_ground_truth": is_crisis
            }
            tweets.append(tweet)
            
        # Save to file
        filename = f"twitter_feed_{set_name.split(':')[0].lower().replace(' ', '_')}.json"
        # Clean filename: "Set A" -> "twitter_feed_set_a.json"
        filename = filename.replace("set_a", "set_a").replace("set_b", "set_b").replace("set_c", "set_c") 
        # Actually the split logic above might be slightly off, let's just map it manually for safety
        file_map = {
            "Set A: Early Morning": "twitter_feed_set_a.json",
            "Set B: Peak Crisis": "twitter_feed_set_b.json",
            "Set C: Aftermath": "twitter_feed_set_c.json"
        }
        
        out_path = f"c:/Codes/Mumbai Hacks/Mumbai_Hacks/Data/{file_map[set_name]}"
        
        with open(out_path, "w") as f:
            json.dump(tweets, f, indent=4)
        
        print(f"Generated {out_path}")

if __name__ == "__main__":
    generate_tweet_data()
