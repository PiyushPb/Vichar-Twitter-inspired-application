from textblob import TextBlob
from newspaper import Article
# import nltk
# nltk.download('punkt')

# url = 'https://www.bnnbloomberg.ca/risk-addicted-wall-street-funds-are-shaken-as-bad-news-piles-up-1.2058627'
# article = Article(url)

# article.download()
# article.parse()
# article.nlp()

# text = article.summary
text = "I am sad."
print(text)


blob = TextBlob(text)
sentiment = blob.sentiment.polarity # -1= negative , 0 = neutral  and  1 = positive
print(sentiment)