# SPM Api
This is the Rest Api I use for the Reviews in the SPM app. Note that this api has a landing page. However, to show that this is a Python Flask Api I left the HTML, CSS, and JavaScript out of the language stats calculation by using a .gitattributes file.

## How to Setup This Project

Clone this repo 
```
git clone https://github.com/MichaelT-178/SPM-Rest-Api.git
```

Install this library. (Note: Creating a virtual environment is optional)
```
pip3 install virtualenv
```

Start the Virtual Environment and Install project dependencies
```
cd spm-rest-api
virtualenv venv
pip3 install -r requirements.txt
```

Run your api
```
cd spm-rest-api
source venv/bin/activate
flask run
```
The Api should be running on this link. Copy and paste it into the browser to see the UI.
```
http://127.0.0.1:5000
```

## Technologies Used
- Python
- Flask
- SQLite3
- Petite-Vue
- Vanilla HTML, CSS, and JavaScript

## How to See the UI
First run your server
```
cd spm-rest-api
source venv/bin/activate
flask run
```

Paste this link into your browser to see the UI.
```
http://127.0.0.1:5000
```

## How to Call this Api
#### You can ping these endpoints by using [Postman](https://marketplace.visualstudio.com/items?itemName=Postman.postman-for-vscode), Thunder Client, cURL, or the UI.

Get All Reviews
```
GET /reviews
```

Get Review by ID
```
GET /reviews/<int:review_id>
```

Add a Review
```
POST /reviews

{
  "name": "John Doe",
  "stars": 5,
  "text_review": "This is an amazing product!",
  "editable": false
}
```

Edit a Review
```
PUT /reviews/<int:review_id>

{
  "name": "John Doe",
  "rating": 4
  "text_review": "I edited the text review and star rating",
  "editable": false
}
```

Delete a Review
```
DELETE /reviews/<int:review_id>;
```

## Examples using cURL

Example of how to ping using curl in your terminal
```
curl -X GET http://127.0.0.1:5000/reviews/1
```

You can install the jq library to format the JSON output
```
brew install jq
curl -X GET http://127.0.0.1:5000/reviews | jq
```


