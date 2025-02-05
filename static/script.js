const contentDiv = document.getElementById('content');

document.querySelectorAll('.endpoint-btn').forEach(button => {
    button.addEventListener('click', async () => {
        const section = button.getAttribute('data-section');

        switch (section) {

            // All Reviews Page
            case 'all-reviews':
                contentDiv.innerHTML = '<h2 class="section-title">ALL REVIEWS</h2><p>Loading...</p>';
                try {
                    const response = await fetch('/reviews');
                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }
                    const reviews = await response.json();
                    contentDiv.innerHTML = `
                        <h2 class="section-title">ALL REVIEWS</h2>
                        <ul class="review-list">
                            ${reviews.map(review => 
                                `<li class="review-item">
                                    <strong>${review.name}</strong> (${review.stars} stars)
                                    <br>
                                    <br>
                                    <span>ID: ${review.id}</span>
                                    <p>${review.text_review}</p>
                                </li>`
                            ).join('')}
                        </ul>`;
                } catch (error) {
                    contentDiv.innerHTML = `<p class="error">Failed to load reviews: ${error.message}</p>`;
                }
                break;
            
            // Get Reviews Page
            case 'get-review':
                contentDiv.innerHTML = `
                    <h2 class="section-title">GET REVIEW</h2>
                    <div class="form-group">
                        <label for="review-id">Enter Review ID:</label>
                        <input type="number" id="review-id" class="input-field" placeholder="Enter ID" min="1">
                        <button id="fetch-review" class="fetch-btn">Fetch Review</button>
                    </div>
                    <br>
                    <div id="review-result"></div>
                `;
                document.getElementById('fetch-review').addEventListener('click', async () => {
                    const reviewId = document.getElementById('review-id').value;
                    const resultDiv = document.getElementById('review-result');
                    if (!reviewId) {
                        resultDiv.innerHTML = '<p class="error">Please enter a valid Review ID.</p>';
                        return;
                    }
                    resultDiv.innerHTML = '<p>Loading...</p>';
                    try {
                        const response = await fetch(`/reviews/${reviewId}`);
                        if (!response.ok) {
                            throw new Error(`Error: ${response.statusText}`);
                        }
                        const review = await response.json();
                        resultDiv.innerHTML = `
                            <div class="review-details">
                                <strong>${review.name}</strong> (${review.stars} stars)
                                <p>${review.text_review}</p>
                            </div>
                        `;
                    } catch (error) {
                        resultDiv.innerHTML = `<p class="error">Failed to fetch review: ${error.message}</p>`;
                    }
                });
                break;
              
            // Create Reviews Page
            case 'create-review':
                contentDiv.innerHTML = `
                    <h2 class="section-title">CREATE REVIEW</h2>
                    <div class="mutation-block">
                        <h3>Submit a New Review</h3>
                        <div class="inputs">
                            <label>
                                Name:
                                <input type="text" id="review-name" class="input-field" placeholder="Enter your name">
                            </label>
                            <label>
                                Stars:
                                <input type="number" id="review-stars" class="input-field" placeholder="Rate out of 5" min="1" max="5">
                            </label>
                            <label>
                                Review:
                                <input type="text" id="review-text" class="input-field" placeholder="Write your review">
                            </label>
                            <button id="submit-review" class="endpoint-btn">Submit Review</button>
                        </div>
                        <div id="submit-result"></div>
                    </div>
                `;
                document.getElementById('submit-review').addEventListener('click', async () => {
                    const name = document.getElementById('review-name').value;
                    const stars = document.getElementById('review-stars').value;
                    const textReview = document.getElementById('review-text').value;
                    const resultDiv = document.getElementById('submit-result');
                    if (!name || !stars || !textReview) {
                        resultDiv.innerHTML = '<p class="error">All fields are required!</p>';
                        return;
                    }
                    try {
                        const response = await fetch('/reviews', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name, stars: parseInt(stars, 10), text_review: textReview })
                        });
                        if (!response.ok) {
                            throw new Error(`Error: ${response.statusText}`);
                        }
                        const newReview = await response.json();
                        resultDiv.innerHTML = `
                            <p class="success">Review created successfully!</p>
                            <div class="review-details">
                                <strong>${newReview.name}</strong> (${newReview.stars} stars)
                                <p>${newReview.text_review}</p>
                            </div>
                        `;
                    } catch (error) {
                        resultDiv.innerHTML = `<p class="error">Failed to create review: ${error.message}</p>`;
                    }
                });
                break;
            
            // Modify Review Page
            case 'modify-review':
                contentDiv.innerHTML = `
                    <h2 class="section-title">MODIFY REVIEW</h2>
                    <div class="form-group">
                        <label for="modify-review-id">Enter Review ID:</label>
                        <input type="number" id="modify-review-id" class="input-field" placeholder="Enter ID" min="1">
                        <button id="fetch-review-to-modify" class="fetch-btn">Fetch Review</button>
                    </div>
                    <div id="modify-review-result"></div>
                `;
                document.getElementById('fetch-review-to-modify').addEventListener('click', async () => {
                    const reviewId = document.getElementById('modify-review-id').value;
                    const resultDiv = document.getElementById('modify-review-result');
                    if (!reviewId) {
                        resultDiv.innerHTML = '<p class="error">Please enter a valid Review ID.</p>';
                        return;
                    }
                    resultDiv.innerHTML = '<p>Loading...</p>';
                    try {
                        const response = await fetch(`/reviews/${reviewId}`);
                        if (!response.ok) {
                            throw new Error(`Error: ${response.statusText}`);
                        }
                        const review = await response.json();
                        resultDiv.innerHTML = `
                            <h3 class="section-title">Edit Review</h3>
                            <div class="inputs">
                                <label>
                                    Name:
                                    <input type="text" id="modify-name" class="input-field" value="${review.name}">
                                </label>
                                <label>
                                    Stars:
                                    <input type="number" id="modify-stars" class="input-field" value="${review.stars}" min="1" max="5">
                                </label>
                                <label>
                                    Review:
                                    <input type="text" id="modify-text-review" class="input-field" value="${review.text_review}">
                                </label>
                                <button id="submit-modify" class="endpoint-btn">Submit Review</button>
                            </div>
                            <div id="modify-submit-result"></div>
                        `;

                        document.getElementById('modify-name').addEventListener('input', (e) => {
                            review.name = e.target.value;
                        });
                        document.getElementById('modify-stars').addEventListener('input', (e) => {
                            review.stars = parseInt(e.target.value, 10);
                        });
                        document.getElementById('modify-text-review').addEventListener('input', (e) => {
                            review.text_review = e.target.value;
                        });

                        review.editable = true

                        document.getElementById('submit-modify').addEventListener('click', async () => {
                            const resultDiv = document.getElementById('modify-submit-result');
                            try {
                                const response = await fetch(`/reviews/${reviewId}`, {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        name: review.name,
                                        stars: review.stars,
                                        text_review: review.text_review,
                                        editable: review.editable
                                    })
                                });
                                if (!response.ok) {
                                    throw new Error(`Error: ${response.statusText}`);
                                }
                                const updatedReview = await response.json();
                                resultDiv.innerHTML = `
                                    <p class="success">Review updated successfully!</p>
                                    <div class="review-details">
                                        <strong>${updatedReview.name}</strong> (${updatedReview.stars} stars)
                                        <p>${updatedReview.text_review}</p>
                                    </div>
                                `;
                            } catch (error) {
                                resultDiv.innerHTML = `<p class="error">Failed to update review: ${error.message}</p>`;
                            }
                        });
                    } catch (error) {
                        resultDiv.innerHTML = `<p class="error">Failed to fetch review: ${error.message}</p>`;
                    }
                });
                break;
            
            // Delete Review Page
            case 'delete-review':
                contentDiv.innerHTML = `
                    <h2 class="section-title">DELETE REVIEW</h2>
                    <div class="form-group">
                        <label for="delete-review-id">Enter Review ID:</label>
                        <input type="number" id="delete-review-id" class="input-field" placeholder="Enter ID" min="1">
                        <button id="fetch-review-to-delete" class="fetch-btn">Fetch Review</button>
                    </div>
                    <div id="delete-review-result"></div>
                `;
                document.getElementById('fetch-review-to-delete').addEventListener('click', async () => {
                    const reviewId = document.getElementById('delete-review-id').value;
                    const resultDiv = document.getElementById('delete-review-result');
                    if (!reviewId) {
                        resultDiv.innerHTML = '<p class="error">Please enter a valid Review ID.</p>';
                        return;
                    }
                    resultDiv.innerHTML = '<p>Loading...</p>';
                    try {
                        const response = await fetch(`/reviews/${reviewId}`);
                        if (!response.ok) {
                            throw new Error(`Error: ${response.statusText}`);
                        }
                        const review = await response.json();
                        resultDiv.innerHTML = `
                            <div class="review-details">
                                <br>
                                <h2 class="section-title">FETCHED REVIEW<h2>
                                <strong>${review.name}</strong> (${review.stars} stars)
                                <p>${review.text_review}</p>
                            </div>
                            <button id="confirm-delete" class="endpoint-btn">Delete Review</button>
                        `;
                        document.getElementById('confirm-delete').addEventListener('click', async () => {
                            try {
                                const deleteResponse = await fetch(`/reviews/${reviewId}`, {
                                    method: 'DELETE'
                                });
                                if (!deleteResponse.ok) {
                                    throw new Error(`Error: ${deleteResponse.statusText}`);
                                }
                                resultDiv.innerHTML = `<p class="success">Review with ID ${reviewId} deleted successfully!</p>`;
                            } catch (error) {
                                resultDiv.innerHTML = `<p class="error">Failed to delete review: ${error.message}</p>`;
                            }
                        });
                    } catch (error) {
                        resultDiv.innerHTML = `<p class="error">Failed to fetch review: ${error.message}</p>`;
                    }
                });
                break;
            
            // Go back to docs link
            case 'docs':
                window.location = '/';
                break;

            default:
                contentDiv.innerHTML = '';
                break;
        }
    });
});