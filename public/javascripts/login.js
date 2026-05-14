document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
            if (data.roleId === 1) {
                window.location.href = '/admin.html';
            } else if (data.roleId === 2) {
                window.location.href = '/mahasiswa.html';
            } else if (data.roleId === 3) {
                window.location.href = '/wd2.html';
            }
        } else {
            errorMessage.textContent = data.message;
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        errorMessage.textContent = "Terjadi kesalahan pada server.";
        errorMessage.style.display = 'block';
    }
});

document.getElementById('togglePassword').addEventListener('click', function() {
    const input = document.getElementById('password');
    const icon = document.getElementById('toggleIcon');
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    icon.className = isHidden ? 'ph ph-eye-slash' : 'ph ph-eye';
});