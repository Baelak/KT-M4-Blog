document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('blogForm');
    const errorMessage = document.getElementById('errorMessage');
    const modeToggle = document.getElementById('modeToggle');

    // Check for saved mode preference in localStorage
    const currentMode = localStorage.getItem('mode');
    if (currentMode) {
        document.body.classList.add(currentMode);
        applyDarkModeToInputs(currentMode === 'dark-mode');
    }

    // Toggle between dark mode and light mode
    modeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        applyDarkModeToInputs(isDarkMode);

        // Save mode preference to localStorage
        const mode = isDarkMode ? 'dark-mode' : '';
        localStorage.setItem('mode', mode);
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();

        if (username === '' || title === '' || content === '') {
            errorMessage.style.display = 'block';
            return;
        }

        errorMessage.style.display = 'none';

        const post = {
            username,
            title,
            content
        };

        savePostToLocalStorage(post);
        form.reset();
        window.location.href = 'blog.html';
    });

    function savePostToLocalStorage(post) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    function applyDarkModeToInputs(isDarkMode) {
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (isDarkMode) {
                input.classList.add('dark-mode');
            } else {
                input.classList.remove('dark-mode');
            }
        });
    }
});

function goBack() {
    window.history.back();
}
