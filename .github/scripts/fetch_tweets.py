import tweepy
import json
import os

# Authenticate to Twitter
client = tweepy.Client(bearer_token=os.environ['TWITTER_BEARER_TOKEN'])

# Replace with your Twitter user ID
user_id = "JulianLBaasch"

# Fetch tweets
tweets = client.get_users_tweets(id=user_id, max_results=5, tweet_fields=['created_at'])

# Format tweets
formatted_tweets = [
    {
        "id": str(tweet.id),
        "text": tweet.text,
        "created_at": tweet.created_at.isoformat()
    }
    for tweet in tweets.data
]

# Write to JSON file
with open('public/tweets.json', 'w', encoding='utf-8') as f:
    json.dump(formatted_tweets, f, ensure_ascii=False, indent=2)