from textblob import TextBlob
from newspaper import Article
import nltk
# nltk.download('punkt')
url = 'https://www.barandbench.com/news/k-kavitha-seeks-bail-cbi-case-arrest-before-lok-sabha-elections-not-coincidence'

article = Article(url)
article.download()
article.parse()

article.nlp()

print(f'title:- {article.title}')
print(f'authors:- {article.authors}')
print(f'published date:- {article.publish_date}')
print(f'summery:- {article.summary}')

analysis = TextBlob(article.text)
print(analysis.polarity)
print(f'sentiment: {"Positive" if analysis.polarity >0 else "negative" if analysis.polarity <0 else "neutral"}')
