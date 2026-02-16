document.querySelectorAll('.book-card').forEach(card => {
  const bookKey = card.dataset.book;

  const starElems = card.querySelectorAll('.star');
  const avgRatingElem = card.querySelector('.avg-rating');
  const reviewForm = card.querySelector('.review-form');
  const reviewList = card.querySelector('.review-list');

  // Load saved reviews
  function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem(bookKey)) || [];
    reviewList.innerHTML = '';
    let totalRating = 0;

    reviews.forEach((r, index) => {
      totalRating += r.rating;
      const p = document.createElement('p');
      p.innerHTML = `<strong>${r.name}</strong> (${r.rating}/5): ${r.text}`;
      
      // Delete button
      const delBtn = document.createElement('button');
      delBtn.textContent = 'Delete';
      delBtn.addEventListener('click', () => {
        reviews.splice(index, 1);
        localStorage.setItem(bookKey, JSON.stringify(reviews));
        loadReviews();
      });

      p.appendChild(delBtn);
      reviewList.appendChild(p);
    });

    // Update average rating
    const avg = reviews.length ? (totalRating / reviews.length).toFixed(1) : 0;
    avgRatingElem.textContent = `${avg}/5`;
  }

  loadReviews();

  let selectedRating = 0;
  starElems.forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.dataset.value);
      starElems.forEach(s => s.classList.remove('selected'));
      for (let i = 0; i < selectedRating; i++) {
        starElems[i].classList.add('selected');
      }
    });
  });

  reviewForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = reviewForm.name.value;
    const text = reviewForm.review.value;

    if (selectedRating === 0) {
      alert('Please select a star rating!');
      return;
    }

    const reviews = JSON.parse(localStorage.getItem(bookKey)) || [];
    reviews.push({ name, text, rating: selectedRating });
    localStorage.setItem(bookKey, JSON.stringify(reviews));

    reviewForm.reset();
    selectedRating = 0;
    starElems.forEach(s => s.classList.remove('selected'));
    loadReviews();
  });
});
 