import flask
import flask_cors
from textblob import TextBlob
from newspaper import Article

app = flask.Flask(__name__)
flask_cors.CORS(app)

# =================== sentiment analysis ===================
def analyze_sentiment(text):
    analysis = TextBlob(text)
    polarity = analysis.polarity
    sentiment = "Positive" if polarity > 0 else "Negative" if polarity < 0 else "Neutral"
    return polarity, sentiment

# =================== news summarization ===================
def analyze_article_sentiment(url):
    article = Article(url)
    article.download()
    article.parse()
    article.nlp()
    polarity, sentiment = analyze_sentiment(article.text)
    return polarity, sentiment, article.title, article.authors, article.publish_date, article.summary

# =================== ===================
@app.route("/", methods=["GET"])
def index():
    return "Hello, World!"

@app.route("/sentimentAnalysis", methods=["POST"])
def sentiment_analysis():
    text = flask.request.json["text"]
    polarity, sentiment = analyze_sentiment(text)
    return {"sentimentScore": {"polarity": polarity, "sentiment": sentiment}}

@app.route("/analyzeUrl", methods=["POST"])
def analyze_url():
    url = flask.request.json["url"]
    polarity, sentiment, title, authors, publish_date, summary = analyze_article_sentiment(url)
    response = {
        "polarity": polarity,
        "sentiment": sentiment,
        "title": title,
        "authors": authors,
        "publish_date": publish_date,
        "summary": summary
    }
    return response

@app.route("/ping", methods=["GET"])
def ping():
    return "Server is up and running!"

if __name__ == "__main__":
    app.run(port=5000, host="0.0.0.0")