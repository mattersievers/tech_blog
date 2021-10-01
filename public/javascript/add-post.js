async function newFormHandler(event) {
    event.preventDefault();

    const blog_title = document.querySelector('input[name="blog-title"]').value;
    const blog_text = document.querySelector('textarea[name="blog-text"]').value.trim();
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            blog_title,
            blog_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);