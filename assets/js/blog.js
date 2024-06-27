document.addEventListener('DOMContentLoaded', function () {
    const modeToggle = document.getElementById('modeToggle');
    const backButton = document.getElementById('backButton');
    const container = document.querySelector('.container');
    const buttons = document.querySelectorAll('button');

    // Function to apply or remove dark mode class
    function applyDarkMode(isDarkMode) {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            container.classList.add('dark-mode');
            buttons.forEach(button => button.classList.add('dark-mode'));
            document.querySelectorAll('.post').forEach(post => post.classList.add('dark-mode'));
        } else {
            document.body.classList.remove('dark-mode');
            container.classList.remove('dark-mode');
            buttons.forEach(button => button.classList.remove('dark-mode'));
            document.querySelectorAll('.post').forEach(post => post.classList.remove('dark-mode'));
        }
    }

    // Check for saved mode preference in localStorage
    const currentMode = localStorage.getItem('mode');
    const isDarkMode = currentMode === 'dark-mode';
    applyDarkMode(isDarkMode);

    // Toggle between dark mode and light mode
    modeToggle.addEventListener('click', function () {
        const isDarkMode = !document.body.classList.contains('dark-mode');
        applyDarkMode(isDarkMode);

        // Save mode preference to localStorage
        const mode = isDarkMode ? 'dark-mode' : '';
        localStorage.setItem('mode', mode);
    });

    backButton.addEventListener('click', function () {
        window.history.back();
    });

    loadPosts();

    function loadPosts() {
        const postsContainer = document.getElementById('postsContainer');
        const posts = JSON.parse(localStorage.getItem('posts')) || [];

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p><strong>${post.username}</strong></p>
                <p>${post.content}</p>
            `;

            postsContainer.appendChild(postElement);

            // Apply dark mode to posts if needed
            if (document.body.classList.contains('dark-mode')) {
                postElement.classList.add('dark-mode');
            }
        });
    }
});
