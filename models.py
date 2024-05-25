from db import db


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    text_review = db.Column(db.String(300), nullable=False)
    editable = db.Column(db.Boolean, default=True, nullable=False)

    def __repr__(self):
        return f'Review {self.name}'