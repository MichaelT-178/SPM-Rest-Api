from flask import Blueprint, request, jsonify
from models import Review
from db import db

routes_blueprint = Blueprint('routes', __name__)

@routes_blueprint.route('/reviews', methods=['GET'])
def get_all_reviews():
    reviews = Review.query.all()

    all_reviews = [{'id': r.id,
                    'name': r.name, 
                    'stars': r.stars, 
                    'text_review': r.text_review, 
                    'editable': r.editable} for r in reviews]
    
    return jsonify(all_reviews), 200

@routes_blueprint.route('/reviews', methods=['POST'])
def add_review():
    data = request.get_json()
    review = Review(name=data['name'], stars=data['stars'], text_review=data['text_review'], editable=data.get('editable', True))
    db.session.add(review)
    db.session.commit()

    new_review = {
        'name': review.name, 
        'stars': review.stars, 
        'text_review': review.text_review, 
        'editable': review.editable
    }

    return jsonify(new_review), 201

@routes_blueprint.route('/reviews/<int:review_id>', methods=['PUT'])
def edit_review(review_id):
    review = Review.query.get_or_404(review_id)
    data = request.get_json()

    if 'name' in data:
        review.name = data['name']
    if 'stars' in data:
        review.stars = data['stars']
    if 'text_review' in data:
        review.text_review = data['text_review']
    if 'editable' in data:
        review.editable = data['editable']
    
    db.session.commit()
    
    edited_review = {
        'name': review.name, 
        'stars': review.stars, 
        'text_review': review.text_review, 
        'editable': review.editable
    }
    
    return jsonify(edited_review), 200


@routes_blueprint.route('/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    review = Review.query.get_or_404(review_id)
    db.session.delete(review)
    db.session.commit()

    return jsonify({'message': f'Review with ID {review_id} has been deleted successfully.'}), 200