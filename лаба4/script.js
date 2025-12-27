// script.js

async function fetchPosts() {
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const postsElement = document.getElementById('posts');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        loadingElement.style.display = 'none';
        
        data.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';
            
            const title = document.createElement('h2');
            title.textContent = post.title;
            
            const body = document.createElement('p');
            body.textContent = post.body;
            
            postDiv.appendChild(title);
            postDiv.appendChild(body);
            postsElement.appendChild(postDiv);
        });
    } catch (error) {
        loadingElement.style.display = 'none';
        errorElement.textContent = `Error fetching posts: ${error.message}`;
        errorElement.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', fetchPosts);