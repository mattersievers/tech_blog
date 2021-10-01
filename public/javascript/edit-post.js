async function editFormHandler(event) {
    event.preventDefault();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];
    const blog_title = document.querySelector('input[name="blog-title"]').value.trim();
    const blog_text = document.querySelector('textarea[name="blog-text"]').value.trim();

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            blog_title,
            blog_text
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.replace('/dashboard/');
    }
    else {
        alert(response.statusText);
    }
    
  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);