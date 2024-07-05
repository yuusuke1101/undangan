// script.js

document.addEventListener('DOMContentLoaded', function() {
  const commentForm = document.getElementById('comment-form');
  const commentList = document.getElementById('comment-list');

  // Mengambil semua komentar dari backend saat halaman dimuat
  fetch('http://https://yuusuke1101.github.io/undangan')
    .then(response => response.json())
    .then(comments => {
      comments.forEach(comment => {
        const commentElement = createCommentElement(comment.text, comment.author);
        commentList.appendChild(commentElement);
      });
    })
    .catch(error => console.error('Error fetching comments:', error));

  commentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const commentText = document.getElementById('comment-text').value;
    const commentAuthor = document.getElementById('comment-author').value;

    if (commentText.trim() === '') {
      alert('Harap isi kolom komentar.');
      return;
    }

    if (commentAuthor.trim() === '') {
      alert('Harap isi kolom nama Anda.');
      return;
    }

    // Mengirim data komentar baru ke backend
    fetch('https://yuusuke1101.github.io/undangan/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: commentText, author: commentAuthor })
    })
    .then(response => response.json())
    .then(newComment => {
      const commentElement = createCommentElement(newComment.text, newComment.author);
      commentList.appendChild(commentElement);
      // Reset form fields
      document.getElementById('comment-text').value = '';
      document.getElementById('comment-author').value = '';
    })
    .catch(error => console.error('Error adding comment:', error));
  });

  // Fungsi untuk membuat elemen komentar
  function createCommentElement(text, author) {
    const comment = document.createElement('div');
    comment.classList.add('comment');
    
    comment.innerHTML = `
      <p>${text}</p>
      <p class="author">– ${author}</p>
    `;
    
    return comment;
  }
});
