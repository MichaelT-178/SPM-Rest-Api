import json
from app import create_app
from models import Review
from db import db

def load_reviews():

    with open('review-data/GoogleReviews.json', 'r') as file:
        contents = file.read()
        data = json.loads(contents)
        reviews = data['Reviews']

        print(db)
        

        for review in reviews:
            review = Review(
                name=review['name'],
                stars=review['rating'],
                text_review=review['reviewText'],
                editable=review['editable']
            )

            db.session.add(review)

        db.session.commit()

if __name__ == "__main__":
    app = create_app()
    
    with app.app_context():
        load_reviews()

print("\033[92m" + "Reviews table successfully populated!" + "\033[0m")